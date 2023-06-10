import { Comment } from '~/server/models/Comment.model';

/**
 * @description update the comment active status
 */
export default defineEventHandler(async (event) => {
	// check if the event has a context and params
	if (event.context && event.context.params) {
		// get the id from the params
		const id = event.context.params.id;
		try {
			// find the comment with the id and update the active status (by toggling it)
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
