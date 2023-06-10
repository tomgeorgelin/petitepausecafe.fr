import { User } from '~/server/models/User.model';

/**
 * @description Get all the users
 */
export default defineEventHandler(async (event) => {
	// get all the users and populate the role_id
	try {
		let users = await User.find().populate('role_id');
		return {
			message: 'ok',
			users,
		};
	} catch (e: any) {
		console.log(e);
		return {
			message: 'ko',
			users: [],
		};
	}
});
