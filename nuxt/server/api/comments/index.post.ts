import { Comment } from '~~/server/models/Comment.model';
import { User } from '~~/server/models/User.model';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { parent, email, body, article_id } = bodyReq;
	const user = await User.findOne({ email });
	const comment = await Comment.create({
		body,
		user_id: user._id,
		parent_id: parent,
		article_id,
		active: user.verified,
	});
	if (comment) return { message: 'ok', comment };
	return { message: 'ko' };
});
