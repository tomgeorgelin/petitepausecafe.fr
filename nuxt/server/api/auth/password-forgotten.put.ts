import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// used to get the secrets key
const config = useRuntimeConfig();
/**
 * @description Send an email to the user with a link to reset his password
 */
export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);
	// create the transporter
	var transporter = nodemailer.createTransport({
		// @ts-ignore
		host: config.MAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: config.MAIL_AUTH_USER,
			pass: config.MAIL_AUTH_PASS,
		},
	});
	// create the token
	const token = jwt.sign({ email: body.email }, config.JWT_KEY, {
		expiresIn: 180,
	});
	// create the link
	const link =
		'https://www.petitepausecafe.fr/auth/password-reset?token=' + token;
	// create the message
	let message = {
		from: config.MAIL_HOST,
		to: body.email,
		subject: 'Vous avez perdu votre mot de passe ?',
		html:
			'<h1>Oubli de mot de passe</h1>' +
			'<div><p>Si vous avez demander une réinitialisation de mot de passe cliquez sur ce lien : ' +
			'<a href="' +
			link +
			'" target="_blank">' +
			link +
			'</a></p><p>Ce lien est valable 3 minutes.</p></div>',
	};
	// send the email
	transporter.sendMail(message, (err: any, info: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info, 'ok');
		}
	});
	return {
		message: 'ok',
	};
});
