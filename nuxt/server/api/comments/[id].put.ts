import { Comment } from '~/server/models/Comment.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const id = event.context.params.id;
		try {
			let comment = await Comment.findById(id);
			comment = await Comment.findByIdAndUpdate(id, {
				active: !comment.active,
			});
			return { message: 'ok' };
		} catch (e: any) {
			return { message: 'ko' };
		}
	}
});
