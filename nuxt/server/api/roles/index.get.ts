import { Role } from '~/server/models/Role.model';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	try {
		let roles: any = [];
		if (query.all) {
			roles = await Role.find();
		} else {
			roles = await Role.find({ deletedAt: null });
		}
		return { message: 'ok', roles };
	} catch {
		return { message: 'ko', roles: [] };
	}
});
