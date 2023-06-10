import { Category } from '~/server/models/Category.model';

/**
 * @description Delete a category
 */
export default defineEventHandler(async (event) => {
	// check if the event has a context and params
	if (event.context && event.context.params) {
		// get the id from the params
		const id = event.context.params.slug;
		try {
			// find the category with the id and update the deletedAt status
			let category = await Category.findById(id);
			if (category.deletedAt) {
				category = await Category.findByIdAndUpdate(
					id,
					{
						deletedAt: null,
					},
					{ new: true }
				);
			} else {
				category = await Category.findByIdAndUpdate(
					id,
					{
						deletedAt: new Date(),
					},
					{ new: true }
				);
			}
			return { message: 'ok', category };
		} catch (e: any) {
			return { message: 'ko', category: {} };
		}
	}
});
