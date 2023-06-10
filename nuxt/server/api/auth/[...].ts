import { User } from '~/server/models/User.model';
import { NuxtAuthHandler } from '#auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Role } from '~/server/models/Role.model';
const config = useRuntimeConfig();

/**
 * @description authtication handler
 */
export default NuxtAuthHandler({
	// set the secret key for the JWT
	secret: config.JWT_KEY,
	// set the session max age to 2 hours
	session: {
		maxAge: 2 * 60 * 60,
	},
	pages: {
		// Change the default behavior to use `/login` as the path for the sign-in page
		signIn: '/auth/login',
		signOut: '/auth/login',
	},
	callbacks: {
		// used update the token object
		jwt: async ({ token, user }) => {
			if (user) {
				token.jwt =
					(user as any).token || (user as any).access_token || '';
				token.id = user ? user.id || '' : '';
				token.role = user ? (user as any).role_id || '' : '';
			}
			return Promise.resolve(token);
		},
		// used to add the user id to the session object
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
				// if the email or password is empty, we return null
				if (!(credentials?.email && credentials?.password)) {
					return null;
				}
				// trim and lowercase the email
				credentials.email = credentials.email
					.trim()
					.toLocaleLowerCase();

				let user;
				try {
					// find the user with the email and populate it
					// @ts-ignore
					user = await User.findOne({
						email: credentials.email,
					}).populate({ path: 'role_id', model: Role });
				} catch (e) {
					console.log(e);
				}
				// if the user is found and the password is correct
				if (
					user &&
					(await bcrypt.compare(credentials.password, user.password))
				) {
					// create a token
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
					// return the user
					return user;
				}
				return null;
			},
		}),
	],
});
