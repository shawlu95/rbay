import { itemByViewKey, itemKey, itemViewsKey } from '$services/keys';
import { createClient, defineScript } from 'redis';

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT)
	},
	password: process.env.REDIS_PW,
	scripts: {
		addOneAndStore: defineScript({
			NUMBER_OF_KEYS: 1,
			SCRIPT: `
				return redis.call('SET', KEYS[1], 1 + tonumber(ARGV[1]))
			`,
			transformArguments(key: string, value: number) {
				// all params to lua must be strings
				return [key, value.toString()];
			},
			transformReply(reply: any) {
				return reply;
			}
		}),
		incrementView: defineScript({
			NUMBER_OF_KEYS: 3,
			SCRIPT: `
				local itemViewsKey = KEYS[1]
				local itemKey = KEYS[2]
				local itemByViewKey = KEYS[3]
				local itemId = ARGV[1]
				local userId = ARGV[2]
				local inserted = redis.call("PFADD", itemViewsKey, userId)
				if inserted == 1 then
					redis.call('HINCRBY', itemKey, 'views', 1)
					redis.call('ZINCRBY', itemByViewKey, 1, itemId)
				end
			`,
			transformArguments(itemId: string, userId: string) {
				return [itemViewsKey(itemId), itemKey(itemId), itemByViewKey(), itemId, userId];
			},
			transformReply(reply) {}
		}),
		unlock: defineScript({
			NUMBER_OF_KEYS: 1,
			SCRIPT: `
				if redis.call('GET', KEYS[1]) == ARGV[1] then
					return redis.call('DEL', KEYS[1])
				end
			`,
			transformArguments(key: string, token: string) {
				return [key, token];
			},
			transformReply(replay) {
				return replay;
			}
		})
	}
});

client.on('error', (err) => console.error(err));
client.connect();

export { client };
