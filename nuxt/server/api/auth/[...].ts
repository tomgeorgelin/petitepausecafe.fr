import { User } from '~/server/models/User.model';
import { NuxtAuthHandler } from '#auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NuxtAuthHandler({
	secret: process.env.JWT_KEY,

	pages: {
		// Change the default behavior to use `/login` as the path for the sign-in page
		signIn: '/auth/login',
		signOut: '/auth/login',
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
				const user = await User.findOne({ email: credentials.email });

				if (
					user &&
					(await bcrypt.compare(credentials.password, user.password))
				) {
					// Create token
					const token = jwt.sign(
						{ user_id: user._id, email: credentials.email },
						process.env.JWT_KEY ?? '',
						{
							expiresIn: '2h',
						}
					);
					// save user token
					user.token = token;
					user.save();
					console.log(user);

					// user
					return user;
				}
				return null;
			},
		}),
	],
});
