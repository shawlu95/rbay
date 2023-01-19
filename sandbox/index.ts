import 'dotenv/config';
import { client } from '../src/services/redis';

const runHash = async () => {
	await client.hSet('car', {
		brand: 'vw',
		model: 'tiguan',
		year: 2019,
		owner: undefined || '',
		accident: null || '',
		engine: { cylinders: 8 }
	});

	const car = await client.hGetAll('car');
	console.log(car);

	// always returns an object, even if not exists
	const empty = await client.hGetAll('foo');
	console.log(empty);
	if (Object.keys(empty).length === 0) {
		console.log('not found!');
	}
};

const runPipeline = async () => {
	await client.hSet('user#1', { username: 'alice' });
	await client.hSet('user#2', { username: 'bob' });
	await client.hSet('user#3', { username: 'cindy' });
	const results = await Promise.all([
		client.hGetAll('user#1'),
		client.hGetAll('user#2'),
		client.hGetAll('user#3')
	]);
	console.log(results);
};

runPipeline();
