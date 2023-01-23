import { client } from '$services/redis';
import { randomBytes } from 'crypto';

export const withLock = async (key: string, callback: (signal: any) => any) => {
	// initialize a few variables to control retry behavior
	const retryDelayMs = 100;
	const timeout = 1000;
	let retries = 20;

	// generate a RANDOM value and create the lock key
	const token = randomBytes(6).toString('hex');
	const lockKey = `lock:${key}`;

	while (retries > 0) {
		const locked = await client.set(lockKey, token, {
			NX: true,
			PX: timeout
		});

		if (!locked) {
			await pause(retryDelayMs);
			retries -= 1;
			continue;
		}

		// acquired lock, run the callback
		try {
			const signal = { expired: false };
			setTimeout(() => {
				signal.expired = true;
			}, timeout);
			const result = await callback(signal);
			return result;
		} finally {
			await client.unlock(lockKey, token);
		}
	}
};

const buildClientProxy = () => {};

const pause = (duration: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};
