import { Comment } from '~~/server/models/Comment.model';
import { User } from '~~/server/models/User.model';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { parent, email, body, article_id } = bodyReq;
	const user_id = (await User.findOne({ email }))._id;
	const comment = await Comment.create({
		body,
		user_id,
		parent_id: parent,
		article_id,
	});
	if (comment) return { message: 'ok', comment };
	return { message: 'ko' };
});
