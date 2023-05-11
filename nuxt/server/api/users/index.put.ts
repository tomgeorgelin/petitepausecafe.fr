import { User } from '~~/server/models/User.model';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { description, email, image } = bodyReq;
	await User.findOneAndUpdate(
		{ email },
		{
			description,
			image,
		}
	);
	return { message: 'ok' };
});
