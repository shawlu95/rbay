import { client } from '$services/redis';
import { deserialize } from './deserialize';
import { itemIndexKey } from '$services/keys';

export const searchItems = async (term: string, size: number = 5) => {
	const cleaned = term
		.replaceAll(/[^a-zA-Z0-9 ]/g, '')
		.trim()
		.split(' ')
		.map((w) => (w ? `%${w}%` : ''))
		.join(' ');
	if (cleaned === '') {
		return [];
	}

	console.log('redisearch query:', cleaned);
	// automatically search all fields marked as text
	const { total, documents } = await client.ft.search(itemIndexKey(), cleaned, {
		LIMIT: {
			from: 0,
			size
		}
	});

	return documents.map(({ id, value }) => deserialize(id, value as any));
};
