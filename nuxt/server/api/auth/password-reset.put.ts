import jwt, { JwtPayload, decode } from 'jsonwebtoken';
import { User } from '~~/server/models/User.model';
import bcrypt from 'bcryptjs';
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);

	let decoded: jwt.JwtPayload;
	try {
		decoded = jwt.verify(body.token, config.JWT_KEY || '') as JwtPayload;
	} catch (err) {
		console.error(err);
		return {
			message: 'ko',
		};
	}

	if (decoded) {
		const password = await bcrypt.hash(body.password, 10);
		const user = await User.findOneAndUpdate(
			{ email: decoded.email },
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
