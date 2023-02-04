import { Article } from '~/server/models/Article.model';

export default defineEventHandler(async (event) => {
	const article = await Article.find({ slug: event.context.params.slug });

	return {
		article,
	};
});
