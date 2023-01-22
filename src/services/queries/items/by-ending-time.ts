import { client } from '$services/redis';
import { itemByEndingAtKey } from '$services/keys';
import { getItems } from './items';

export const itemsByEndingTime = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	const ids = await client.zRange(itemByEndingAtKey(), Date.now(), '+inf', {
		BY: 'SCORE',
		LIMIT: {
			offset,
			count
		}
	});
	return await getItems(ids);
};
