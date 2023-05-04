import { User } from '../models/User.model';
import bcrypt from 'bcryptjs';
import { slug } from '~/server/utils/index';
import { Role } from '../models/Role.model';
export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	const { user } = body;
	user.email = user.email.trim().toLowerCase();
	user.password = await bcrypt.hash(user.password, 10);
	user.slug = slug(user.name.trim().toLowerCase());
	user.role_id = (await Role.findOne({ slug: 'user' }))._id;
	try {
		await User.create(user);
		return { message: 'ok' };
	} catch (e: any) {
		console.log(e);
		return { message: 'ko' };
	}
});
