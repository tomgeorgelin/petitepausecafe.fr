import { Category } from '~~/server/models/Category.model';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { name, slug, image } = bodyReq;
	try {
		await Category.findOneAndUpdate(
			{ slug },
			{
				name,
				image,
			}
		);
		return { message: 'ok' };
	} catch {
		return { message: 'ko' };
	}
});
