import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	const categories = await Category.find();
	console.log(categories);
	return {
		categories,
	};
});
