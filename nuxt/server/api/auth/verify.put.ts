import jwt, { JwtPayload, decode } from 'jsonwebtoken';
import { User } from '~~/server/models/User.model';
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);

	let decoded: jwt.JwtPayload;
	try {
		decoded = jwt.verify(body.token, config.JWT_KEY) as JwtPayload;
	} catch (err) {
		console.error(err);
		return {
			message: 'ko',
		};
	}

	if (decoded) {
		try {
			const user = await User.findOneAndUpdate(
				{ email: decoded.email },
				{ verified: true }
			);
			user.save();
		} catch {
			return {
				message: 'ko',
			};
		}
	} else {
		return {
			message: 'ko',
		};
	}
	return {
		message: 'ok',
	};
});
