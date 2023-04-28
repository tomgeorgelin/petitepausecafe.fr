import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const category = await Category.find({
			slug: event.context.params.slug,
		});

		return {
			category,
		};
	}
});
