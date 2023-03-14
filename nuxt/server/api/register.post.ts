import { User } from '../models/User.model';
import bcrypt from 'bcrypt';
export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	const { user } = body;
	user.email = user.email.trim().toLowerCase();
	user.password = await bcrypt.hash(user.password, 10);
	user.username = user.username.trim().toLowerCase();
	try {
		await User.create(user);
		return { message: 'User created' };
	} catch (e: any) {
		console.log(e);
		throw createError({
			message: e.message,
		});
	}
	return true;
});
