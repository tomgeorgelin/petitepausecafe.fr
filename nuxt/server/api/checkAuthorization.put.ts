import { Role } from '../models/Role.model';
import { Permission } from '../models/Permission.model';

export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);
	const { object, operation, role } = body;
	const permission = await Permission.findOne({
		object,
		operation,
		role_id: role,
	});
	if (permission) {
		return { res: true };
	}
	return { res: false };
});
