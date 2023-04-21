import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	const categories = await Category.find();
	return {
		categories,
	};
});
