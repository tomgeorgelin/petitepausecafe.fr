import { Comment } from '~~/server/models/Comment.model';
import { User } from '~~/server/models/User.model';
/**
 * @description Create a new comment
 */
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	// get the parent, email, body, article_id from the body
	const { parent, email, body, article_id } = bodyReq;
	try {
		// find the user with the email
		const user = await User.findOne({ email });
		// create the comment with the user_id, parent_id, article_id
		const comment = await Comment.create({
			body,
			user_id: user._id,
			parent_id: parent,
			article_id,
			active: user.verified, // if the user is verified, the comment is active
		});
		if (comment) return { message: 'ok', comment };
	} catch {
		return { message: 'ko' };
	}
	return { message: 'ko' };
});
