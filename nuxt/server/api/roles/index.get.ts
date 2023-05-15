import { Role } from '~/server/models/Role.model';

export default defineEventHandler(async (event) => {
	const roles = await Role.find();
	return { message: 'ok', roles };
});
