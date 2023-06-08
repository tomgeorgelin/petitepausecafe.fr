<template>
	<Header />
	<div
		class="bg-white p-10 flex flex-col shadow-xl rounded-xl w-11/12 sm:w-5/6 lg:w-6/12 xl:4/12 mx-auto mt-25"
	>
		<button
			@click="handleClick()"
			class="w-full py-4 bg-green-600 rounded-lg text-green-100 my-5"
		>
			Vérifier votre compte
		</button>
	</div>
</template>

<script lang="ts" setup>
const { $toast } = useNuxtApp();
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 0,
	},
});
const route = useRoute();

const token = route.query.token;

const handleClick = async () => {
	const { data } = await useFetch('/api/auth/verify', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		method: 'put',
		body: { token },
	});

	if (data.value?.message === 'ok') {
		navigateTo('/');
	} else {
		$toast.show({
			title: 'Erreur lors de la vérification',
			type: 'danger',
			timeout: 10,
			pauseOnHover: true,
		});
	}
};
</script>
