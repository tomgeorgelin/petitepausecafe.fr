import { Role } from '~~/server/models/Role.model';

/**
 * @description Create a new role
 */
export default defineEventHandler(async (event) => {
	// get the name from the body
	const { name } = await readBody(event);
	try {
		// create the role
		const role = await Role.create({ name, slug: slug(name) });
		return { message: 'ok', role };
	} catch {
		return { message: 'ko', role: {} };
	}
});
