import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		try {
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
