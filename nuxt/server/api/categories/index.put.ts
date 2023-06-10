import { Category } from '~~/server/models/Category.model';
import { slug as slugFunction } from '../../utils/index';

/**
 * @description Update a category
 */
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	// get the name, slug, image from the body
	const { name, slug, image } = bodyReq;
	try {
		// find the category with the slug and update it with the new values
		await Category.findOneAndUpdate(
			{ slug },
			{
				name,
				slug: slugFunction(name),
				image,
			}
		);
		return { message: 'ok' };
	} catch (e: any) {
		console.log(e);
		return { message: 'ko' };
	}
});
