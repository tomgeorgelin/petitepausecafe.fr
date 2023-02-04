import { Schema, model, MongooseError } from 'mongoose';
import { Article } from '~/server/models/Article.model';
import { ArticleSchema } from '~/server/validation';

const slug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');

export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);

	body.slug = slug(body.title);

	// validate
	let { value, error } = ArticleSchema.validate(body);

	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ''),
			statusCode: 400,
			fatal: false,
		});
	}

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
