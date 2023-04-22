import { Article } from '~/server/models/Article.model';
export default defineEventHandler(async (event) => {
	let articles;
	const query = getQuery(event);
	if (query.latest) {
		articles = await Article.find()
			.sort({ created_at: -1 })
			.limit(10)
			.populate('user_id')
			.populate('category_id');
	} else {
		articles = await Article.find();
	}
	return {
		articles,
	};
});
