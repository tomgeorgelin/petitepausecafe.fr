<template>
	<Header />
	<div
		class="bg-white p-10 flex flex-col shadow-xl rounded-xl w-11/12 sm:w-5/6 lg:w-6/12 xl:4/12 mx-auto mt-25"
		v-if="useSession().status.value === 'unauthenticated'"
	>
		<h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
			Se connecter
		</h2>
		<form action="" class="w-full" @submit.prevent="handleClick()">
			<div id="input" class="flex flex-col w-full my-5">
				<label for="username" class="text-gray-500 mb-2"
					>Adresse mail</label
				>
				<input
					type="email"
					id="username"
					placeholder="S'il vous plait insérez votre email"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					v-model="email"
				/>
			</div>
			<div id="input" class="flex flex-col w-full my-5">
				<label for="password" class="text-gray-500 mb-2"
					>Mot de passe</label
				>
				<input
					type="password"
					id="password"
					placeholder="S'il vous plait insérez votre mot de passe"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					v-model="password"
				/>
			</div>
			<div v-if="error" id="error" class="text-center text-red-700">
				Il semblerait qu'il y a une erreur dans vos identifiants
			</div>
			<div id="button" class="flex flex-col w-full my-5">
				<button
					type="submit"
					class="w-full py-4 bg-tint rounded-lg text-white"
				>
					<div class="flex flex-row items-center justify-center">
						<div class="mr-2">
							<svg
								class="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
								></path>
							</svg>
						</div>
						<div class="font-bold">Se connecter</div>
					</div>
				</button>
				<div class="flex justify-evenly mt-5">
					<NuxtLink
						href="/auth/password-forgotten"
						class="w-full text-center font-medium text-gray-500 hover:underline"
						>Mot de passe oublié ?</NuxtLink
					>
					<NuxtLink
						href="/auth/register"
						class="w-full text-center font-medium text-gray-500 hover:underline"
						>Créer un compte</NuxtLink
					>
				</div>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
definePageMeta({ auth: false });
export default {
	data() {
		return {
			email: '',
			password: '',
			error: false,
		};
	},
	setup() {
		if (useSession().status.value === 'authenticated') {
			navigateTo('/');
		}
	},
	methods: {
		async handleClick() {
			const user = {
				email: this.email,
				password: this.password,
				redirect: false,
				callbackUrl: '/',
			};
			if (this.email !== '' && this.password !== '') {
				const { error, url } = await useSession().signIn(
					'credentials',
					user
				);
				if (error) {
					this.error = true;
				} else {
					return navigateTo(url, { external: true });
				}
			}
		},
	},
};
</script>
