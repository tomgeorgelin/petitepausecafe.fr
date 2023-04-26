import { Article } from '~/server/models/Article.model';
import { Comment } from '~/server/models/Comment.model';

export default defineEventHandler(async (event) => {
	let articleTmp = await Article.findOne({
		slug: event.context.params.slug,
	})
		.populate('category_id')
		.populate('user_id');
	const comments = await Comment.find({ article_id: articleTmp._id })
		.sort({ createdAt: -1 })
		.populate('parent_id')
		.populate('user_id');

	return {
		article: articleTmp,
		comments,
	};
});
