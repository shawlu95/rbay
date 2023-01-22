import { client } from '$services/redis';
import { itemKey, itemByViewKey } from '$services/keys';

export const incrementView = async (itemId: string, userId: string) => {
	await Promise.all([
		await client.hIncrBy(itemKey(itemId), 'views', 1),
		await client.zIncrBy(itemByViewKey(), 1, itemId)
	]);
};
