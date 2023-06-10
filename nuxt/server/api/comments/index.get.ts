import { Comment } from '~/server/models/Comment.model';

/**
 * @description Get all the comments sorted by createdAt (descending)
 */
export default defineEventHandler(async (event) => {
	try {
		// get all the comments sorted by createdAt (descending) and populate the user_id, parent_id and article_id
		const comments = await Comment.find()
			.sort({ createdAt: -1 })
			.populate('user_id parent_id article_id');
		return {
			message: 'ok',
			comments,
		};
	} catch {
		return {
			message: 'ko',
			comments: {},
		};
	}
});
