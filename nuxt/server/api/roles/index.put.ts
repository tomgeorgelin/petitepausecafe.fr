import { Role } from '~~/server/models/Role.model';
import { slug as slugFunction } from '../../utils/index';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { name, slug } = bodyReq;
	// find the role with the slug and update it with the new values
	try {
		await Role.findOneAndUpdate(
			{ slug },
			{
				name,
				// never forget to update the slug
				slug: slugFunction(name),
			}
		);
		return { message: 'ok' };
	} catch {
		return { message: 'ko' };
	}
});
