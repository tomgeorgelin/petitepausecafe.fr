import { User } from '~/server/models/User.model';
import bcrypt from 'bcryptjs';

/**
 * @description Update the password of the user
 */
export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);
	// get the old password, the new password and the email
	const { oldPassword, newPassword, email } = body;
	// find the user with the email
	// @ts-ignore
	const user = await User.findOne({
		email: email,
	});
	// if the user exists and the old password is correct, we update the password
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
