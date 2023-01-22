import { client } from '$services/redis';
import { itemKey, itemByPriceKey } from '$services/keys';
import { deserialize } from './deserialize';

export const itemsByPrice = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	let results: any = await client.sort(itemByPriceKey(), {
		GET: [
			'#',
			`${itemKey('*')}->name`,
			`${itemKey('*')}->views`,
			`${itemKey('*')}->endingAt`,
			`${itemKey('*')}->imageUrl`,
			`${itemKey('*')}->price`
		],
		BY: 'nosort', // use implicit order in sorted set
		DIRECTION: order,
		LIMIT: {
			offset,
			count
		}
	});

	const items = [];
	while (results.length) {
		const [id, name, views, endingAt, imageUrl, price, ...rest] = results;
		const item = deserialize(id, { name, views, endingAt, imageUrl, price });
		items.push(item);
		results = rest;
	}
	return items;
};
