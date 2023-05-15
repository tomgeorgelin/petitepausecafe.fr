import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	try {
		const categories = await Category.find();
		return {
			message: 'ok',
			categories,
		};
	} catch {
		return {
			message: 'ko',
			categories: {},
		};
	}
});
