import { Permission } from '~/server/models/Permission.model';
import { Role } from '~/server/models/Role.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const roleName = event.context.params.slug;
		try {
			const role = await Role.findOne({ slug: roleName });
			return { message: 'ok', role };
		} catch (e: any) {
			return { message: 'ko', role: {} };
		}
	}
});
