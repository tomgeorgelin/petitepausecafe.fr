import { Article } from '~/server/models/Article.model';
import { Comment } from '~/server/models/Comment.model';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
	// delete user
	try {
		if (event.context && event.context.params) {
			console.log(event.context.params.email);
			const user = await User.findOne({
				email: event.context.params.email,
			});

			const articles = await Article.find({ user_id: user._id });
			articles.forEach((article) => {
				Comment.deleteMany({ article_id: article._id });
				article.delete();
			});
			await Comment.updateMany({ user_id: user._id }, { user_id: null });

			await user.delete();
			return { message: 'ok' };
		}
	} catch (e: any) {
		return { message: 'ko' };
	}
	return { message: 'ko' };
});
