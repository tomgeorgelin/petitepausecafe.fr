import { User } from '~~/server/models/User.model';

/**
 * @description Update the user
 */
export default defineEventHandler(async (event) => {
	const bodyReq: any = await readBody(event);
	// get description, email, image, role_id, name, twitter_link
	const { description, email, image, role_id, name, twitter_link } = bodyReq;
	try {
		// find the user with the email and update it with the new values
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
		// if the user doesn't exist, we return ko
		if (!user) {
			return { message: 'ko' };
		}
		// if the user exists, we return ok
		return { message: 'ok' };
	} catch {
		return { message: 'ko' };
	}
});
