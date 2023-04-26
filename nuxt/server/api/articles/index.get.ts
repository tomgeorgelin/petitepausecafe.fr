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
	} else if (query.random) {
		const number = await Article.count();
		var random = Math.floor(Math.random() * number);
		articles = await Article.findOne()
			.skip(random)
			.populate('user_id')
			.populate('category_id');
	} else if (query.popular) {
		articles = await Article.find()
			.sort({ created_at: -1 })
			.limit(4)
			.populate('user_id')
			.populate('category_id');
	} else {
		articles = await Article.find({})
			.limit(10)
			.sort({ created_at: -1 })
			.populate('user_id')
			.populate('category_id');
	}
	return {
		articles,
	};
});
