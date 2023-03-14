import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	const category = await Category.find({ slug: event.context.params.slug });

	return {
		category,
	};
});
