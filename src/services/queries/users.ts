import { client } from '$services/redis';
import { userKey } from '$services/keys';
import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {};

export const createUser = async (attrs: CreateUserAttrs) => {
	const id = genId();
	await client.hSet(userKey(id), serialize(attrs));
	return id;
};

const serialize = (user: CreateUserAttrs) => {
	return {
		username: user.username,
		password: user.password
	};
};
