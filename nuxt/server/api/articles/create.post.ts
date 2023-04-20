import { Article } from '~/server/models/Article.model';

const slug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');

export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	body.slug = slug(body.title);

	// create article
	try {
		await Article.create(body);
		return { message: 'Article created' };
	} catch (e: any) {
		throw createError({
			message: e.message,
		});
	}
});