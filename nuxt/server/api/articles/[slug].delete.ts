import { Schema, model, MongooseError } from 'mongoose';
import { Article } from '~/server/models/Article.model';
import { ArticleSchema } from '~/server/validation';

export default defineEventHandler(async (event) => {
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
});
