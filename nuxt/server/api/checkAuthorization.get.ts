import { Permission } from '../models/Permission.model';

/**
 * @description Check if the user has the right to access the route
 */
export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	// finding the permission
	const permission = await Permission.findOne({
		object: query.object,
		operation: query.operation,
		role_id: query.role,
	});
	// if the permission exists, we return true
	if (permission) {
		return { res: true };
	}
	// if the permission doesn't exist, we return false
	return { res: false };
});
