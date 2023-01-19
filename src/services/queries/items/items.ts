import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { itemKey } from '$services/keys';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => {
	const item = await client.hGetAll(itemKey(id));
	if (Object.keys(item).length === 0) {
		return null;
	}
	console.log('fetch item from cache', item);
	return deserialize(id, item);
};

export const getItems = async (ids: string[]) => {};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();
	const serialized = serialize(attrs);
	console.log('cache item', id, serialized);
	await client.hSet(itemKey(id), serialized);
	return id;
};
