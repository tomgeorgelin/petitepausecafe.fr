export const checkAuthorization = async (object, operation) => {
	const sessionData = useSession().data.value;
	if (sessionData && sessionData.user) {
		const userRole = sessionData.user.role._id;
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
