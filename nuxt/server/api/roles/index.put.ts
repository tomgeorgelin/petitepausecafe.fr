import { Role } from '~~/server/models/Role.model';
import { slug as slugFunction } from '../../utils/index';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { name, slug } = bodyReq;
	try {
		await Role.findOneAndUpdate(
			{ slug },
			{
				name,

				slug: slugFunction(name),
			}
		);
		return { message: 'ok' };
	} catch {
		return { message: 'ko' };
	}
});
