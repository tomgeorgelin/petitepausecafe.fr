import { Article } from '~/server/models/Article.model';

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	if (event.context && event.context.params) {
		const slug = event.context.params.slug;

		// Update article
		try {
			await Article.findOneAndUpdate({ slug: slug }, body);
			return { message: 'ok' };
		} catch (e: any) {
			return { message: 'ko' };
		}
	}
});
