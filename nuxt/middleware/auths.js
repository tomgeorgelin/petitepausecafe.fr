const rolesEquivalent = {
	none: 0,
	user: 1,
	writer: 2,
	admin: 3,
};

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { status, signIn, data } = useSession();
	if (status.value === 'authenticated') {
		if (data.value.expires < new Date().toISOString())
			return signIn(undefined, { callbackUrl: to.path });
		if (
			to.meta.meta.authority <=
			rolesEquivalent[data.value?.user.role.slug]
		) {
			if (to.meta.meta.right) {
				if (
					(await checkAuthorization(
						to.meta.meta.right.object,
						to.meta.meta.right.operation
					)) === true
				) {
					return;
				}
				return signIn(undefined, { callbackUrl: to.path });
			}
			return;
		}
		return signIn(undefined, { callbackUrl: to.path });
	}

	return signIn(undefined, { callbackUrl: to.path });
});
