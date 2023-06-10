import { Role } from '~/server/models/Role.model';
/**
 * @description Get the roles
 */
export default defineEventHandler(async (event) => {
	// get the query
	const query = getQuery(event);

	try {
		let roles: any = [];
		// if the query is all, we get all the roles
		if (query.all) {
			roles = await Role.find();
		} else {
			// if the query is not all, we get all the roles that are not soft deleted
			roles = await Role.find({ deletedAt: null });
		}
		return { message: 'ok', roles };
	} catch {
		return { message: 'ko', roles: [] };
	}
});
