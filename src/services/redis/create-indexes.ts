import { client } from '$services/redis';
import { itemIndexKey, itemKey } from '$services/keys';
import { SchemaFieldTypes } from 'redis';

export const createIndexes = async () => {
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
