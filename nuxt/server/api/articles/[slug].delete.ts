import { Article } from '~/server/models/Article.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const slug = event.context.params.slug;
		// delete article
		try {
			await Article.findOneAndDelete({ slug: slug });
			return { message: 'Article deleted' };
		} catch (e: any) {
			throw createError({
				message: e.message,
			});
		}
	}
});
