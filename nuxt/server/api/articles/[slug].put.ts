import { Article } from '~/server/models/Article.model';
import { slug as slugFunction } from '../../utils/index';

/**
 * @description Update an article
 */
export default defineEventHandler(async (event) => {
	// get the body
	const body = await readBody(event);
	// check if the event has a context and params
	if (event.context && event.context.params) {
		// get the slug from the params
		const slug = event.context.params.slug;
		// set the slug from the title
		body.slug = slugFunction(body.title);

		try {
			// find the article with the slug and update it
			const article = await Article.findOneAndUpdate(
				{ slug: slug },
				body
			);
			return { message: 'ok', article };
		} catch (e: any) {
			return { message: 'ko', article: {} };
		}
	}
});
