import { Article } from '~/server/models/Article.model';
import { slug as slugFunction } from '../../utils/index';

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	if (event.context && event.context.params) {
		const slug = event.context.params.slug;
		body.slug = slugFunction(body.title);
		// Update article
		try {
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
