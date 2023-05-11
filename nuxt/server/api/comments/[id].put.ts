import { Comment } from '~/server/models/Comment.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const id = event.context.params.id;
		// delete comment
		try {
			await Comment.findByIdAndUpdate(id, { active: false });
			return { message: 'ok' };
		} catch (e: any) {
			return { message: 'ko' };
		}
	}
});
