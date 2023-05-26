import { User } from '../models/User.model';
import bcrypt from 'bcryptjs';
import { slug } from '~/server/utils/index';
import { Role } from '../models/Role.model';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	const { user } = body;
	user.email = user.email.trim().toLowerCase();
	user.password = await bcrypt.hash(user.password, 10);
	user.slug = slug(user.name.trim().toLowerCase());
	user.role_id = (await Role.findOne({ slug: 'user' }))._id;
	try {
		await User.create(user);
		// @ts-ignore
		var transporter = nodemailer.createTransport({
			host: config.MAIL_HOST,
			port: 587,
			secure: false,
			auth: {
				user: config.MAIL_AUTH_USER,
				pass: config.MAIL_AUTH_PASS,
			},
		});
		const token = jwt.sign({ email: user.email }, config.JWT_KEY, {
			expiresIn: 180,
		});
		const link = 'https://petitepausecafe.fr/auth/verify?token=' + token;
		let message = {
			from: config.MAIL_AUTH_USER,
			to: user.email,
			subject: 'Vérifiez votre compte',
			html:
				'<h1>Vérification de compte</h1>' +
				'<div><p>Si vous voulez vérifier votre compte cliquez sur ce lien : ' +
				'<a href="' +
				link +
				'" target="_blank">' +
				link +
				'</a></p><p>Ce lien est valable 3 minutes.</p></div>',
		};
		transporter.sendMail(message, (err: any, info: any) => {
			if (err) {
				console.log(err);
				return { message: 'ko' };
			} else {
				console.log(info, 'email sent');
				return { message: 'ok' };
			}
		});
	} catch (e: any) {
		console.log(e);
		return { message: 'ko' };
	}
});
