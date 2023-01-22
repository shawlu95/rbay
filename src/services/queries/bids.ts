import type { CreateBidAttrs, Bid } from '$services/types';
import { itemBidKey, itemKey, itemPriceKey } from '$services/keys';
import { client } from '$services/redis';
import { DateTime } from 'luxon';
import { getItem } from './items';

export const createBid = async (attrs: CreateBidAttrs) => {
	return client.executeIsolated(async (isolatedClient) => {
		await isolatedClient.watch(itemKey(attrs.itemId));
		const item = await getItem(attrs.itemId);

		if (!item) {
			throw new Error('Item does not exist');
		}

		if (item.price >= attrs.amount) {
			throw new Error('Bid too low');
		}

		if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
			throw new Error('Item closed to bidding');
		}

		const serialized = serializeBid(attrs.amount, attrs.createdAt.toMillis());
		return isolatedClient
			.multi()
			.rPush(itemBidKey(attrs.itemId), serialized)
			.hSet(itemKey(item.id), {
				bids: item.bids + 1,
				price: attrs.amount,
				highestBidUserId: attrs.userId
			})
			.zAdd(itemPriceKey(), {
				value: item.id,
				score: attrs.amount
			})
			.exec();
	});
};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	const start = -1 * offset - count;
	const end = -1 - offset;
	const range = await client.lRange(itemBidKey(itemId), start, end);
	return range.map((bid) => deserializeBid(bid));
};

const serializeBid = (amount: number, createdAt: number) => {
	return `${amount}:${createdAt}`;
};

const deserializeBid = (stored: string) => {
	const [amount, createdAt] = stored.split(':');
	return {
		amount: parseFloat(amount),
		createdAt: DateTime.fromMillis(parseInt(createdAt))
	};
};
