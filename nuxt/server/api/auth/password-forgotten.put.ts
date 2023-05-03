import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
	// Get data form body
	const body: any = await readBody(event);

	var transporter = nodemailer.createTransport({
		host: 'node96-eu.n0c.com',
		port: 587,
		secure: false,
		auth: {
			user: 'motdepasseoublie@petitepausecafe.fr',
			pass: 'g/nR/.g~~63!.Vn83!',
		},
	});
	const token = jwt.sign({ email: body.email }, config.JWT_KEY ?? '', {
		expiresIn: 180,
	});
	const link =
		'https://petitepausecafe.fr/auth/password-reset?token=' +
		token +
		'&email=' +
		body.email;
	let message = {
		from: 'motdepasseoublie@petitepausecafe.fr',
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
	transporter.sendMail(message, (err: any, info: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info, 'ok');
		}
	});
	return {
		hello: 'you',
	};
});
