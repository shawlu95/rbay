import { client } from '$services/redis';
import { sessionKey } from '$services/keys';
import type { Session } from '$services/types';

export const getSession = async (id: string) => {
	const session = await client.hGetAll(sessionKey(id));
	if (Object.keys(session).length === 0) {
		console.log('session not found for user', id);
		return null;
	}
	console.log('retrieve session from cache', id, session);
	return deserialize(id, session);
};

export const saveSession = async (session: Session) => {
	console.log('cache session', session);
	await client.hSet(sessionKey(session.id), serialize(session));
};

const serialize = (session: Session) => {
	return {
		userId: session.userId,
		username: session.username
	};
};

const deserialize = (id: string, session: { [key: string]: string }) => {
	return {
		id,
		userId: session.userId,
		username: session.username
	};
};
