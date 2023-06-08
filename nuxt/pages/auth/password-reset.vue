<template>
	<Header />
	<div
		class="bg-white p-10 flex flex-col shadow-xl rounded-xl w-11/12 sm:w-5/6 lg:w-6/12 xl:4/12 mx-auto mt-25"
	>
		<div id="input" class="flex flex-col w-full my-5">
			<label for="password" class="text-gray-500 mb-2"
				>Mot de passe</label
			>
			<input
				type="text"
				id="password"
				placeholder="S'il vous plait insérez votre nouveau mot de passe"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
				v-model="state.password"
			/>
		</div>
		<div id="input" class="flex flex-col w-full my-5">
			<label for="password_check" class="text-gray-500 mb-2"
				>Vérification de mot de passe</label
			>
			<input
				type="text"
				id="password_check"
				placeholder="S'il vous plait insérez votre nouveau mot de passe à nouveau"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
				v-model="state.password_check"
			/>
		</div>
		<button
			@click="handleClick()"
			class="w-full py-4 bg-green-600 rounded-lg text-green-100 my-5"
		>
			Réinitialiser votre mot de passe
		</button>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();

const token = route.query.token;
const state = reactive({ password: '', password_check: '' });

const handleClick = async () => {
	const { data } = await useFetch('/api/auth/password-reset', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		method: 'put',
		body: { password: state.password, token },
	});

	if (data.value?.message === 'ok') {
		navigateTo('/login');
	} else {
		console.log('#TODO MESSAGE ERREUR');
	}
};
</script>
