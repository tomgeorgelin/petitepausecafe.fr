import { Category } from '~/server/models/Category.model';
import { slug } from '../../utils/index';
export default defineEventHandler(async (event) => {
	// Get data form body
	const { name, image } = await readBody(event);

	// create category
	try {
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
