import { Article } from '~/server/models/Article.model';
import { User } from '~/server/models/User.model';
import { slug } from '~/server/utils/index';
/**
 * @description Create an article
 */
export default defineEventHandler(async (event) => {
	// get the body
	const body: any = await readBody(event);
	// set the slug from the title
	body.slug = slug(body.title);
	try {
		// get the user_id from the user_email
		body.user_id = (await User.findOne({ email: body.user_email }))._id;
		// create the article
		await Article.create(body);
		return { message: 'ok' };
	} catch (e: any) {
		console.log(e);
		return { message: 'ko' };
	}
});
