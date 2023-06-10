import { Role } from '~/server/models/Role.model';
import { User } from '~/server/models/User.model';
/**
 * @description Get the user with the email
 */
export default defineEventHandler(async (event) => {
	try {
		// check if there is a context and params
		if (event.context && event.context.params) {
			// find the user with the email
			// @ts-ignore
			const user = await User.findOne(
				{
					email: event.context.params.email,
				}, // select the fields we want to return
				'email name description image verified twitter_link'
			).populate({ path: 'role_id', model: Role, select: 'name' }); // populate the role_id
			return {
				user,
				message: 'ok',
			};
		}
	} catch {
		return {
			user: {},
			message: 'ko',
		};
	}
});
