import { User } from '~/server/models/User.model';

/**
 * @description Get the user with the email
 */
export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const email = event.context.params.email;
		try {
			// find the user with the email
			const user = await User.findOne({ email });
			return { message: 'ok', user };
		} catch (e: any) {
			return { message: 'ko', user: {} };
		}
	}
});
