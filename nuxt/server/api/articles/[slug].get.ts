import { Article } from '~/server/models/Article.model';
import { Comment } from '~/server/models/Comment.model';

/**
 * @description Get the article with the slug
 */
export default defineEventHandler(async (event) => {
	let articleTmp = [];
	let comments: any[] = [];
	try {
		// check if the event has a context and params
		if (event.context && event.context.params) {
			// get the article from the slug and populate the category_id and user_id
			articleTmp = await Article.findOne({
				slug: event.context.params.slug,
			})
				.populate('category_id')
				.populate('user_id');
			// get the comments from the article and populate the parent_id and user_id
			comments = await Comment.find({
				article_id: articleTmp._id,
				active: true,
			})
				.sort({ createdAt: -1 })
				.populate('parent_id')
				.populate('user_id');
		}
		// return the article and comments linked to the article
		return {
			article: articleTmp,
			comments,
			message: 'ok',
		};
	} catch {
		return {
			message: 'ko',
		};
	}
});
