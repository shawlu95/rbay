import { client } from '$services/redis';
import { userKey, usernamesKey, usernamesUniqueKey } from '$services/keys';
import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';

// a sorted set stores username, and id as score
export const getUserByUsername = async (username: string) => {
	// use the username arg to lookup the person's user id from the sorted set
	const decimalId = await client.zScore(usernamesKey(), username);

	// makesure we actually got an id
	if (!decimalId) {
		throw new Error('User does not exist');
	}

	// convert the id back to hex
	const id = decimalId.toString(16);
	console.log('converted username ', username, ' to id ', id);

	// use the id to look up user's hash
	return await getUserById(id);
};

export const getUserById = async (id: string) => {
	const user = await client.hGetAll(userKey(id));
	console.log('retrieve user from cache', id, user);
	return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
	// this does not guard against concurrent registration of username
	const exists = await client.sIsMember(usernamesUniqueKey(), attrs.username);
	if (exists) {
		throw new Error('Username already exists.');
	}

	const id = genId();
	await client.hSet(userKey(id), serialize(attrs));
	await client.sAdd(usernamesUniqueKey(), attrs.username);
	await client.zAdd(usernamesKey(), {
		value: attrs.username,
		score: parseInt(id, 16)
	});
	console.log('cache user', id, attrs);
	return id;
};

const serialize = (user: CreateUserAttrs) => {
	return {
		username: user.username,
		password: user.password
	};
};

const deserialize = (id: string, user: { [key: string]: string }) => {
	return {
		id,
		username: user.username,
		password: user.password
	};
};
