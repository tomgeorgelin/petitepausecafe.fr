import { User } from '~~/server/models/User.model';
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	const { description, email, image, role_id, name, twitter_link } = bodyReq;
	try {
		console.log(twitter_link);
		const user = await User.findOneAndUpdate(
			{ email },
			{
				name,
				description,
				image,
				twitter_link,
				role_id,
			},
			{
				new: true,
			}
		);
		if (!user) {
			return { message: 'ko' };
		}
		console.log(user);
		return { message: 'ok' };
	} catch {
		return { message: 'ko' };
	}
});
