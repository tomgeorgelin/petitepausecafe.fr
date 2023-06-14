/**
 * regex for password validation
 */
const REGEX_PASSWORD = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

/**
 *
 * @param object - object to check authorization
 * @param operation - operation to check authorization
 * @returns boolean - true if user is authorized to perform operation on object
 */
export const checkAuthorization = async (object, operation) => {
	const sessionData = useSession().data.value;
	if (sessionData && sessionData.user) {
		const userRole = sessionData.user.role._id;
		const { data, error } = await useFetch('/api/checkAuthorization', {
			headers: {
				// @ts-ignore
				'x-auth-token': useSession()?.data?.value?.user?.token || '',
			},
			query: { object, operation, role: userRole },
		});
		if (data.value) {
			return data.value.res;
		}
	}
	return false;
};

/**
 *
 * @param password1 - first password to check
 * @param password2 - second password to check
 * @returns boolean - true if passwords are equal and not empty
 */
export const checkPasswords = (password1, password2) =>
	password1 === password2 && password1 !== '' && password2 !== '';

/**
 *
 * @param password - password to check
 * @returns boolean - true if password is valid
 */
export const checkPassword = (password) => REGEX_PASSWORD.test(password);
