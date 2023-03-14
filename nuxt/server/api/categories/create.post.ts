import { Category } from '~/server/models/Category.model';

const slug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');

export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	body.slug = slug(body.name);

	// create category
	try {
		await Category.create(body);
		return { message: 'Category created' };
	} catch (e: any) {
		throw createError({
			message: e.message,
		});
	}
});
