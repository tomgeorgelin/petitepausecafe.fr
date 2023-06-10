import { Article } from '~/server/models/Article.model';
import { Category } from '~/server/models/Category.model';
import { User } from '~/server/models/User.model';

/**
 * @description Get all the articles
 */
export default defineEventHandler(async (event) => {
	let articles;
	// get the query from the event
	const query = getQuery(event);
	// if the query has latest=true, get the latest 10 articles that are active and sort them by created_at
	if (query.latest) {
		articles = await Article.find({ active: true })
			.sort({ created_at: -1 })
			.limit(10)
			.populate('user_id')
			.populate('category_id');
	} else if (query.random) {
		// if the query has random=true, get a random article that is active
		const number = await Article.count();
		var random = Math.floor(Math.random() * number);
		articles = await Article.findOne({ active: true })
			.skip(random)
			.populate('user_id')
			.populate('category_id');
	} else if (query.popular) {
		// if the query has popular=true, get the most popular article that is active
		articles = await Article.find({ active: true })
			.sort({ created_at: -1 })
			.limit(4)
			.populate('user_id')
			.populate('category_id');
	} else if (query.category) {
		// if the query has category, get the 4 articles that are in the category
		const catId = await Category.findOne({ slug: query.category });
		articles = await Article.find({ category_id: catId })
			.sort({ created_at: -1 })
			.limit(4)
			.populate('user_id')
			.populate('category_id');
	} else if (query.author) {
		// if the query has author, get the 4 articles that are written by the author
		const authorId = await User.findOne({ slug: query.author });
		articles = await Article.find({ user_id: authorId })
			.sort({ created_at: -1 })
			.limit(4)
			.populate('user_id')
			.populate('category_id');
	} else if (query.admin) {
		// if the query has admin=true, get all the articles
		articles = await Article.find()
			.sort({ created_at: -1 })
			.populate('user_id')
			.populate('category_id');
	} else {
		// else get the latest 10 articles that are active and sort them by created_at
		articles = await Article.find({ active: true })
			.limit(10)
			.sort({ created_at: -1 })
			.populate('user_id')
			.populate('category_id');
	}
	return {
		articles,
	};
});
