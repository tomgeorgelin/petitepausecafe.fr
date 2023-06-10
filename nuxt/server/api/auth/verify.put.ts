import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '~~/server/models/User.model';
const config = useRuntimeConfig();
/**
 * @description Verify the user
 */
export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);

	let decoded: jwt.JwtPayload;
	try {
		// verify the token
		decoded = jwt.verify(body.token, config.JWT_KEY) as JwtPayload;
	} catch (err) {
		console.error(err);
		return {
			message: 'ko',
		};
	}
	// if the token is valid, we update the user
	if (decoded) {
		try {
			// find the user with the email and update the verified field to true
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
