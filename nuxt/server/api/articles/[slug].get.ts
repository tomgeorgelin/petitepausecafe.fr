import { Article } from '~/server/models/Article.model';
import { Comment } from '~/server/models/Comment.model';

export default defineEventHandler(async (event) => {
	let articleTmp = [];
	let comments: any[] = [];
	if (event.context && event.context.params) {
		articleTmp = await Article.findOne({
			slug: event.context.params.slug,
		})
			.populate('category_id')
			.populate('user_id');
		comments = await Comment.find({
			article_id: articleTmp._id,
			active: true,
		})
			.sort({ createdAt: -1 })
			.populate('parent_id')
			.populate('user_id');
	}
	return {
		article: articleTmp,
		comments,
	};
});
