import { Article } from '~/server/models/Article.model';

export default defineEventHandler(async (event) => {
	const articles = await Article.find();
	return {
		articles,
	};
});
