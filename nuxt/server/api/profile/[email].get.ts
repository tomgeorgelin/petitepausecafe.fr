import { Role } from '~/server/models/Role.model';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
	try {
		if (event.context && event.context.params) {
			// @ts-ignore
			const user = await User.findOne(
				{
					email: event.context.params.email,
				},
				'email name description image verified twitter_link'
			).populate({ path: 'role_id', model: Role, select: 'name' });
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
