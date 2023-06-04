import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
	if (event.context && event.context.params) {
		const email = event.context.params.email;
		try {
			const user = await User.findOne({ email });
			return { message: 'ok', user };
		} catch (e: any) {
			return { message: 'ko', user: {} };
		}
	}
});
