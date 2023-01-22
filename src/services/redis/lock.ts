import { client } from '$services/redis';
import { randomBytes } from 'crypto';

export const withLock = async (key: string, callback: () => any) => {
	// initialize a few variables to control retry behavior
	const retryDelayMs = 100;
	let retries = 20;

	// generate a RANDOM value and create the lock key
	const token = randomBytes(6).toString('hex');
	const lockKey = `lock:${key}`;

	while (retries > 0) {
		const locked = await client.set(lockKey, token, {
			NX: true,
			PX: 1000
		});

		if (!locked) {
			await pause(retryDelayMs);
			retries -= 1;
			continue;
		}

		// acquired lock, run the callback
		const result = await callback();
		await client.del(lockKey);
		return result;
	}
};

const buildClientProxy = () => {};

const pause = (duration: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};
