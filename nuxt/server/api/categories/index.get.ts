import { Category } from '~/server/models/Category.model';

/**
 * @description Get all the categories
 */
export default defineEventHandler(async (event) => {
	// get the query from the event
	const query = getQuery(event);

	try {
		let categories: any = [];
		// if the query has all=true, get all the categories
		if (query.all) {
			categories = await Category.find();
		} else {
			// else get all the categories that are not deleted
			categories = await Category.find({ deletedAt: null });
		}
		return { message: 'ok', categories };
	} catch {
		return { message: 'ko', categories: [] };
	}
});
