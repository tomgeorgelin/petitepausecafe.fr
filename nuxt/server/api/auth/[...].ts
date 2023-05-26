import { User } from '~/server/models/User.model';
import { NuxtAuthHandler } from '#auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Role } from '~/server/models/Role.model';
const config = useRuntimeConfig();

export default NuxtAuthHandler({
	secret: config.JWT_KEY,
	session: {
		maxAge: 2 * 60 * 60, // 2 hours
	},
	pages: {
		// Change the default behavior to use `/login` as the path for the sign-in page
		signIn: '/auth/login',
		signOut: '/auth/login',
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.jwt =
					(user as any).token || (user as any).access_token || '';
				token.id = user ? user.id || '' : '';
				token.role = user ? (user as any).role_id || '' : '';
			}
			return Promise.resolve(token);
		},
		session: async ({ session, token }) => {
			(session as any).user.role = token.role;
			(session as any).user.id = token.id;
			(session as any).user.token = token.jwt;
			return Promise.resolve(session);
		},
	},
	providers: [
		// @ts-ignore
		CredentialsProvider.default({
			async authorize(credentials: { email: string; password: string }) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
				if (!(credentials?.email && credentials?.password)) {
					return null;
				}
				credentials.email = credentials.email
					.trim()
					.toLocaleLowerCase();

				// Validate if user exist in our database
				let user;
				try {
					// @ts-ignore
					user = await User.findOne({
						email: credentials.email,
					}).populate({ path: 'role_id', model: Role });
				} catch (e) {
					console.log(e);
				}

				if (
					user &&
					(await bcrypt.compare(credentials.password, user.password))
				) {
					// Create token
					const token = jwt.sign(
						{ user_id: user._id, email: credentials.email },
						config.JWT_KEY ?? '',
						{
							expiresIn: '60',
						}
					);
					// save user token
					user.token = token;
					user.save();
					// user
					return user;
				}
				return null;
			},
		}),
	],
});
