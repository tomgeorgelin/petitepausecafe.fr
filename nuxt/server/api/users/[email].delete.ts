import { Article } from '~/server/models/Article.model';
import { Comment } from '~/server/models/Comment.model';
import { User } from '~/server/models/User.model';

/**
 * @description Delete the user with the email
 */
export default defineEventHandler(async (event) => {
	try {
		// if there is a context and a params
		if (event.context && event.context.params) {
			// find the user with the email
			const user = await User.findOne({
				email: event.context.params.email,
			});
			// find all the articles of the user and delete them
			const articles = await Article.find({ user_id: user._id });
			articles.forEach((article) => {
				Comment.deleteMany({ article_id: article._id });
				article.delete();
			});
			// find all the comments of the user and update them (set the user_id to null)
			await Comment.updateMany({ user_id: user._id }, { user_id: null });

			// delete the user
			await user.delete();
			return { message: 'ok' };
		}
	} catch (e: any) {
		return { message: 'ko' };
	}
	return { message: 'ko' };
});
