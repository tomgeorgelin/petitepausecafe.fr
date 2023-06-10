import { Permission } from '~/server/models/Permission.model';
import { Role } from '~/server/models/Role.model';

/**
 * @description Get the permissions of the role
 */
export default defineEventHandler(async (event) => {
	// check if the event has a context and params
	if (event.context && event.context.params) {
		// get the slug from the params
		const roleName = event.context.params.role;
		// find the role with the slug
		const role = await Role.findOne({ slug: roleName });

		try {
			// get the permissions of the role
			const permissions = await Permission.aggregate([
				{
					$match: {
						role_id: role._id,
					},
				},
				{
					$group: {
						_id: '$object',
						operations: {
							$push: {
								name: '$operation',
							},
						},
					},
				},
				{
					$project: {
						_id: 0,
						name: '$_id',
						role: role.name,
						operations: 1,
					},
				},
			]);
			return { message: 'ok', permissions };
		} catch (e: any) {
			return { message: 'ko', permissions: [] };
		}
	}
});
