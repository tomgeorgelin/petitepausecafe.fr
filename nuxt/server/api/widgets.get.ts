import { Permission } from '../models/Permission.model';
import { Article } from '../models/Article.model';
import { Comment } from '../models/Comment.model';
import { User } from '../models/User.model';
import { Category } from '../models/Category.model';
/**
 * @description this route give data for the widgets
 */
export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	try {
		let nbComments = 0,
			nbCategories = 0;
		// we get the number of comments on user's articles
		await User.findById(query.user_id)
			.then((user) => {
				if (user) {
					// Récupération des articles de l'utilisateur
					return Article.find({ user_id: user._id });
				} else {
					throw new Error('Utilisateur non trouvé');
				}
			})
			.then((articles) => {
				// Récupération des commentaires des articles de l'utilisateur
				const articleIds = articles.map((article) => article._id);
				return Comment.find({ article_id: { $in: articleIds } });
			})
			.then((comments) => {
				nbComments = comments.length;
			})
			.catch((error) => {
				console.error(error);
			});

		// we get the number of articles of the user
		const nbArticles = await Article.find({
			user_id: query.user_id,
		}).count();
		// we get the number of usable categories
		nbCategories = await Category.find({ deletedAt: null }).count();
		// we return the data and the message 'ok'
		return {
			message: 'ok',
			data: { nbArticles, nbComments, nbCategories },
		};
	} catch (e: any) {
		console.log(e);
		// we return the message 'ko' and an empty data
		return { message: 'ko', data: {} };
	}
});
