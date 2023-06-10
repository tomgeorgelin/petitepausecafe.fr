import { Article } from '~/server/models/Article.model';

/**
 * @description Delete an article
 */
export default defineEventHandler(async (event) => {
	// check if the event has a context and params
	if (event.context && event.context.params) {
		// get the slug from the params
		const slug = event.context.params.slug;

		try {
			// find the article with the slug and delete it
			await Article.findOneAndDelete({ slug: slug });
			return { message: 'ko' };
		} catch (e: any) {
			console.log(e);
			return { message: 'ok' };
		}
	}
});
