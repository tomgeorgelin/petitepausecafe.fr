import { Permission } from '~/server/models/Permission.model';
import { Role } from '~/server/models/Role.model';

/**
 * @description Get the role with the slug
 */
export default defineEventHandler(async (event) => {
	// check if the event has a context and params
	if (event.context && event.context.params) {
		// get the slug from the params
		const roleName = event.context.params.slug;
		try {
			// find the role with the slug
			const role = await Role.findOne({ slug: roleName });
			return { message: 'ok', role };
		} catch (e: any) {
			return { message: 'ko', role: {} };
		}
	}
});
