<template>
	<Header />
	<div
		class="bg-white p-10 flex flex-col shadow-xl rounded-xl w-11/12 sm:w-5/6 lg:w-6/12 xl:4/12 mx-auto mt-25"
	>
		<div id="input" class="flex flex-col w-full my-5">
			<label for="username" class="text-gray-500 mb-2"
				>Adresse mail</label
			>
			<input
				type="text"
				id="username"
				placeholder="S'il vous plait insérez votre email"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
				v-model="email"
			/>
		</div>
		<button
			@click="handleClick()"
			class="w-full py-4 bg-green-600 rounded-lg text-green-100 my-5"
		>
			Obtenir le mail de récupération
		</button>
	</div>
</template>

<script lang="ts">
definePageMeta({ auth: false });
export default {
	data() {
		return {
			email: '',
		};
	},
	methods: {
		async handleClick() {
			const { data } = await useFetch('/api/auth/password-forgotten', {
				method: 'put',
				body: { email: this.email },
			});
		},
	},
};
</script>
