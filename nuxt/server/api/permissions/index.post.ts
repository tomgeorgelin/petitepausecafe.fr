import { Permission } from '~/server/models/Permission.model';
import { Role } from '~~/server/models/Role.model';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { object, operation, state, roleSlug } = bodyReq;
	const role = await Role.findOne({ slug: roleSlug });
	if (state) {
		const permission = await Permission.create({
			object,
			operation,
			role_id: role._id,
		});
		if (permission) return { message: 'ok' };
	} else {
		const permission = await Permission.findOneAndDelete({
			object,
			operation,
			role_id: role._id,
		});
		if (permission) return { message: 'ok' };
	}
	return { message: 'ko' };
});
