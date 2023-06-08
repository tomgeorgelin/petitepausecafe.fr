import { Category } from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const id = event.context.params.slug;
		try {
			let category = await Category.findById(id);
			if (category.deletedAt) {
				category = await Category.findByIdAndUpdate(
					id,
					{
						deletedAt: null,
					},
					{ new: true }
				);
			} else {
				category = await Category.findByIdAndUpdate(
					id,
					{
						deletedAt: new Date(),
					},
					{ new: true }
				);
			}
			return { message: 'ok', category };
		} catch (e: any) {
			return { message: 'ko', category: {} };
		}
	}
});
