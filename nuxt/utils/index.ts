import { Permission } from '~/server/models/Permission.model';
import { Role } from '~/server/models/Role.model';

export const checkAuthorisation = async (object: string, operation: string) => {
	const sessionData = useSession().data.value;
	if (sessionData && sessionData.user) {
		const userRole = sessionData.user.role;
		const { data, error } = await useFetch('/api/checkAuthorization', {
			method: 'PUT',
			body: { object, operation, role: userRole },
		});
		if (data.value) {
			return data.value.res;
		}
	}
	return false;
};
