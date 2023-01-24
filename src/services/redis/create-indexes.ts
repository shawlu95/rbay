import { client } from './client';
import { itemIndexKey, itemKey } from '$services/keys';
import { SchemaFieldTypes } from 'redis';

export const createIndexes = async () => {
	console.log(typeof client);
	const indices = await client.ft._list();
	const exists = indices.find((idx) => idx === itemIndexKey());
	if (exists) {
		console.log('index exists. Skip', itemIndexKey());
		return;
	}

	console.log('create index', itemIndexKey());
	await client.ft.create(
		itemIndexKey(),
		{
			name: {
				type: SchemaFieldTypes.TEXT
			},
			description: {
				type: SchemaFieldTypes.TEXT
			}
		},
		{
			ON: 'HASH',
			PREFIX: itemKey('')
		}
	);
};
