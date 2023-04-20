import { RouteLocationNormalized } from 'vue-router';

const rolesEquivalent: { [name: string]: number } = {
	none: 0,
	user: 1,
	author: 2,
	admin: 3,
};

export default defineNuxtRouteMiddleware(
	(to: RouteLocationNormalized, from: RouteLocationNormalized) => {
		const { status, signIn, data } = useSession();
		if (status.value === 'authenticated') {
			if (
				to.meta.meta.authority <= rolesEquivalent[data.value?.user.role]
			) {
				return 0;
			}
		}

		return signIn(undefined, { callbackUrl: to.path }) as ReturnType<
			typeof navigateTo
		>;
	}
);
