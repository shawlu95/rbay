import type { CreateBidAttrs, Bid } from '$services/types';
import { itemBidKey } from '$services/keys';
import { client } from '$services/redis';
import { DateTime } from 'luxon';

export const createBid = async (attrs: CreateBidAttrs) => {
	const serialized = serializeBid(attrs.amount, attrs.createdAt.toMillis());
	await client.rPush(itemBidKey(attrs.itemId), serialized);
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
