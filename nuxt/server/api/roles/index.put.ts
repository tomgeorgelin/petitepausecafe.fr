import { Role } from '~~/server/models/Role.model';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { name, slug } = bodyReq;
	try {
		await Role.findOneAndUpdate(
			{ slug },
			{
				name,
			}
		);
		return { message: 'ok' };
	} catch {
		return { message: 'ko' };
	}
});
