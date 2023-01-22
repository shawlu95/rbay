import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { itemKey, itemByViewKey, itemByEndingAtKey } from '$services/keys';
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

export const getItems = async (ids: string[]) => {
	const cmds = ids.map((id) => client.hGetAll(itemKey(id)));
	const items = await Promise.all(cmds);
	console.log('fetch items from cache', items);
	return items.map((item, i) => {
		if (Object.keys(item).length === 0) {
			return null;
		}
		return deserialize(ids[i], item);
	});
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();
	const serialized = serialize(attrs);
	console.log('cache item', id, serialized);

	await Promise.all([
		client.hSet(itemKey(id), serialized),
		client.zAdd(itemByViewKey(), {
			value: id,
			score: 0
		}),
		client.zAdd(itemByEndingAtKey(), {
			value: id,
			score: attrs.endingAt.toMillis()
		})
	]);

	return id;
};
