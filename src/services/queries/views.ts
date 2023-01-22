import { client } from '$services/redis';
import { itemKey, itemByViewKey, itemViewsKey } from '$services/keys';

export const incrementView = async (itemId: string, userId: string) => {
	// use hyperloglog to check whether user has already viewed the item
	// only increment view count if user has not viewed the item
	const inserted = await client.pfAdd(itemViewsKey(itemId), userId);
	if (inserted) {
		await Promise.all([
			await client.hIncrBy(itemKey(itemId), 'views', 1),
			await client.zIncrBy(itemByViewKey(), 1, itemId)
		]);
	}
};
