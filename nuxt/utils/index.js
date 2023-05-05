const REGEX_PASSWORD = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

export const checkAuthorization = async (object, operation) => {
	const sessionData = useSession().data.value;
	if (sessionData && sessionData.user) {
		const userRole = sessionData.user.role._id;
		const { data, error } = await useFetch('/api/checkAuthorization', {
			query: { object, operation, role: userRole },
		});
		if (data.value) {
			return data.value.res;
		}
	}
	return false;
};

export const checkPasswords = (password1, password2) =>
	password1 === password2 && password1 !== '' && password2 !== '';

export const checkPassword = (password) => REGEX_PASSWORD.test(password);
