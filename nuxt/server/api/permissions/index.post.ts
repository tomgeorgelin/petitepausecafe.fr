import { Permission } from '~/server/models/Permission.model';
import { Role } from '~~/server/models/Role.model';

/**
 * @description Create a new permission
 */
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	// get the object, operation, state and roleSlug from the body
	const { object, operation, state, roleSlug } = bodyReq;
	// find the role with the slug
	const role = await Role.findOne({ slug: roleSlug });

	try {
		// if the state is true, we create the permission
		if (state) {
			// create the permission
			const permission = await Permission.create({
				object,
				operation,
				role_id: role._id,
			});
			// if the permission is created, we return ok
			if (permission) return { message: 'ok' };
		} else {
			// if the state is false, we delete the permission
			const permission = await Permission.findOneAndDelete({
				object,
				operation,
				role_id: role._id,
			});
			// if the permission is deleted, we return ok
			if (permission) return { message: 'ok' };
		}
	} catch {
		// if there is an error, we return ko
		return { message: 'ko' };
	}
	return { message: 'ko' };
});
