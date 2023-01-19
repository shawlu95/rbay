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

export const saveSession = async (session: Session) => {};


const deserialize = (id: string, session: {[key: string]: string}) {
  return {
    id,
    userId: session.userId,
    username: session.username
  }
}