import { Article } from '~/server/models/Article.model';

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const slug = event.context.params.slug;

	// Update article
	try {
		await Article.findOneAndUpdate({ slug: slug }, body);
		return { message: 'Article updated' };
	} catch (e: any) {
		throw createError({
			message: e.message,
		});
	}
});