import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
	const config = useRuntimeConfig();
	mongoose.set('strictQuery', false);

	try {
		await mongoose.connect(config.mongodbUri);
		console.log('Connected to MongoDB');
	} catch (e) {
		console.error(e);
	}
};
