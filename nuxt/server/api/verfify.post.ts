import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	const { email } = body;
	try {
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
		const token = jwt.sign({ email }, config.JWT_KEY, {
			expiresIn: 180,
		});
		const link = 'https://petitepausecafe.fr/auth/verify?token=' + token;
		let message = {
			from: config.MAIL_AUTH_USER,
			to: email,
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
			} else {
				console.log(info, 'email sent');
			}
		});
		return { message: 'ok' };
	} catch (e: any) {
		console.log(e);
		return { message: 'ko' };
	}
});
