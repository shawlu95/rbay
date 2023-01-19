import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
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
};

run();
