import { User } from '~/server/models/User.model';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);
	const { oldPassword, newPassword, email } = body;
	// @ts-ignore
	const user = await User.findOne({
		email: email,
	});
	if (user && (await bcrypt.compare(oldPassword, user.password))) {
		user.password = await bcrypt.hash(newPassword, 10);
		user.save();
		return {
			message: 'ok',
		};
	} else {
		return {
			message: 'ko',
		};
	}
});
