import { Comment } from '~/server/models/Comment.model';

export default defineEventHandler(async (event) => {
	try {
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
