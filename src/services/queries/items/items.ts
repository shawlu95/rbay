import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { itemKey } from '$services/keys';
import { serialize } from './serialize';
import { genId } from '$services/utils';

export const getItem = async (id: string) => {};

export const getItems = async (ids: string[]) => {};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();
	const serialized = serialize(attrs);
	console.log('cache item', id, serialized);
	await client.hSet(itemKey(id), serialized);
	return id;
};
