import { Category } from '~/server/models/Category.model';

/**
 * @description Get a category
 */
export default defineEventHandler(async (event) => {
	// check if the event has a context and params
	if (event.context && event.context.params) {
		try {
			// find the category with the slug
			const category = await Category.findOne({
				slug: event.context.params.slug,
			});
			return {
				message: 'ok',
				category,
			};
		} catch {
			return {
				message: 'ko',
				category: {},
			};
		}
	}
});
