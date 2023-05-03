import { Permission } from '../models/Permission.model';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const permission = await Permission.findOne({
		object: query.object,
		operation: query.operation,
		role_id: query.role,
	});
	if (permission) {
		return { res: true };
	}
	return { res: false };
});
