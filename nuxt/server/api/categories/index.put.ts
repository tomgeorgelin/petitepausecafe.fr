import { Category } from '~~/server/models/Category.model';
import { slug as slugFunction } from '../../utils/index';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { name, slug, image } = bodyReq;
	try {
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
