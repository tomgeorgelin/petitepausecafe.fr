import { Role } from '~~/server/models/Role.model';
export default defineEventHandler(async (event) => {
	const { name } = await readBody(event);
	try {
		const role = await Role.create({ name, slug: slug(name) });
		return { message: 'ok', role };
	} catch {
		return { message: 'ko', role: {} };
	}
});
