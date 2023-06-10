import { Category } from '~/server/models/Category.model';
import { slug } from '../../utils/index';

/**
 * @description Create a category
 */
export default defineEventHandler(async (event) => {
	// get the name and image from the body
	const { name, image } = await readBody(event);

	try {
		// create the category with the name, image and slug
		const category = await Category.create({
			name,
			image,
			slug: slug(name),
		});
		return { message: 'ok', category };
	} catch (e: any) {
		console.log(e);
		return { message: 'ko', category: {} };
	}
});
