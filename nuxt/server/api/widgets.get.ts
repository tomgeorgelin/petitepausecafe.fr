import { Permission } from '../models/Permission.model';
import { Article } from '../models/Article.model';
import { Comment } from '../models/Comment.model';
import { User } from '../models/User.model';
import { Category } from '../models/Category.model';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	try {
		let nbComments = 0,
			nbCategories = 0;
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
		const nbArticles = await Article.find({
			user_id: query.user_id,
		}).count();
		nbCategories = await Category.find({ deletedAt: null }).count();
		return {
			message: 'ok',
			data: { nbArticles, nbComments, nbCategories },
		};
	} catch (e: any) {
		console.log(e);
		return { message: 'ko', data: {} };
	}
});
