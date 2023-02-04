import { Schema, model, MongooseError } from 'mongoose';
import { Article } from '~/server/models/Article.model';
import { ArticleSchema } from '~/server/validation';

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const slug = event.context.params.slug;

	// validate
	let { value, error } = ArticleSchema.validate(body, {
		abortEarly: true,
		allowUnknown: true,
	});
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ''),
			statusCode: 400,
			fatal: false,
		});
	}

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
