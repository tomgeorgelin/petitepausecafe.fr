const rolesEquivalent = {
	none: 0,
	user: 1,
	author: 2,
	admin: 3,
};

export default defineNuxtRouteMiddleware((to, from) => {
	const { status, signIn, data } = useSession();
	if (status.value === 'authenticated') {
		if (to.meta.meta.authority <= rolesEquivalent[data.value?.user.role]) {
			return;
		} else {
			return navigateTo('/', { replace: true });
		}
	}

	return signIn(undefined, { callbackUrl: to.path });
});
