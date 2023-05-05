import { Article } from '~/server/models/Article.model';
import { Comment } from '~/server/models/Comment.model';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
	const body: any = await readBody(event);
	const { email } = body;

	// delete user
	try {
		const user = await User.findOne({ email });

		const articles = await Article.find({ user_id: user._id });
		articles.forEach((article) => {
			Comment.deleteMany({ article_id: article._id });
			article.delete();
		});
		await Comment.updateMany({ user_id: user._id }, { user_id: null });

		user.delete();
		return { message: 'ok' };
	} catch (e: any) {
		return { message: 'ko' };
	}
});
