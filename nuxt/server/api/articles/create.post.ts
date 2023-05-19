import { Article } from '~/server/models/Article.model';
import { User } from '~/server/models/User.model';
import { slug } from '~/server/utils/index';
export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	body.slug = slug(body.title);
	// create article
	try {
		body.user_id = (await User.findOne({ email: body.user_email }))._id;
		await Article.create(body);
		return { message: 'ok' };
	} catch (e: any) {
		console.log(e);
		return { message: 'ko' };
	}
});
