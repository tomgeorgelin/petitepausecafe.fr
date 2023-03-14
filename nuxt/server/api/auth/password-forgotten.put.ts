import nodemailer from 'nodemailer';
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
	let message = {
		from: 'motdepasseoublie@petitepausecafe.fr',
		to: body.email,
		subject: 'Vous avez perdu votre mot de passe ?',
		text: 'Ahah',
	};
	transporter.sendMail(message, (err: any, info: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info, 'ok');
		}
	});
	console.log(body.email);
	return {
		hello: 'you',
	};
});
