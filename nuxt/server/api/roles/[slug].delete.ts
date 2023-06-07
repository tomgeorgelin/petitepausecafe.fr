import { Role } from '~/server/models/Role.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const id = event.context.params.slug;
		try {
			let role = await Role.findById(id);
			if (role.deletedAt) {
				role = await Role.findByIdAndUpdate(
					id,
					{
						deletedAt: null,
					},
					{ new: true }
				);
			} else {
				role = await Role.findByIdAndUpdate(
					id,
					{
						deletedAt: new Date(),
					},
					{ new: true }
				);
			}
			return { message: 'ok', role };
		} catch (e: any) {
			return { message: 'ko', role: {} };
		}
	}
});
