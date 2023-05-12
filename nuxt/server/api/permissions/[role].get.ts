import { Permission } from '~/server/models/Permission.model';
import { Role } from '~/server/models/Role.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const roleName = event.context.params.role;
		const role = await Role.findOne({ slug: roleName });

		try {
			// @ts-ignores
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
