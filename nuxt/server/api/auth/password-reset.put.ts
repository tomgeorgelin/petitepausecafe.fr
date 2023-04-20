import jwt from 'jsonwebtoken';
import { User } from '~~/server/models/User.model';
import bcrypt from 'bcrypt';
export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);

	let decoded;
	try {
		decoded = jwt.verify(body.token, process.env.JWT_KEY);
	} catch (err) {
		console.error(err);
		return {
			message: 'ko',
		};
	}

	if (decoded) {
		const password = await bcrypt.hash(body.password, 10);
		const user = await User.findOneAndUpdate(
			{ email: 'coucou@gmail.com' },
			{ password }
		);
		user.save();
	} else {
		return {
			message: 'ko',
		};
	}
	return {
		message: 'ok',
	};
});
