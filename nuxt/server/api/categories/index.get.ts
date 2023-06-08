import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	try {
		let categories: any = [];
		if (query.all) {
			categories = await Category.find();
		} else {
			categories = await Category.find({ deletedAt: null });
		}
		return { message: 'ok', categories };
	} catch {
		return { message: 'ko', categories: [] };
	}
});
