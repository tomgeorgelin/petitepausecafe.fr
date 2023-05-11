import { User } from '~/server/models/User.model';
export default defineEventHandler(async (event) => {
	let users = await User.find().populate('role_id');
	return {
		users,
	};
});
