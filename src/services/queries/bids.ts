import type { CreateBidAttrs, Bid } from '$services/types';

export const createBid = async (attrs: CreateBidAttrs) => {};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	return [];
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
