import { Role } from '~/server/models/Role.model';

/**
 * @description Soft delete the role with the slug
 */
export default defineEventHandler(async (event) => {
	// check if the event has a context and params
	if (event.context && event.context.params) {
		// get the slug from the params
		const id = event.context.params.id;
		try {
			// find the role with the id
			let role = await Role.findById(id);
			// if the role is already soft deleted, we restore it
			if (role.deletedAt) {
				// to restore it we set the deletedAt to null
				role = await Role.findByIdAndUpdate(
					id,
					{
						deletedAt: null,
					},
					{ new: true }
				);
			} else {
				// if the role is not soft deleted, we soft delete it by setting the deletedAt to the current date
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
