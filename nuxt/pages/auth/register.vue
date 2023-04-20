<template>
	<div
		class="bg-white p-10 flex flex-col shadow-xl rounded-xl w-11/12 sm:w-5/6 lg:w-6/12 xl:4/12 mx-auto mt-25"
		v-if="useSession().status.value === 'unauthenticated'"
	>
		<h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
			Créer un compte
		</h2>
		<form action="" class="w-full" @submit.prevent="handleClick()">
			<div id="input" class="flex flex-col w-full my-5">
				<label for="email" class="text-gray-500 mb-2"
					>Adresse mail</label
				>
				<input
					type="text"
					id="email"
					@input="handleEmailCheck()"
					placeholder="S'il vous plait insérez votre email"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
					v-model="email"
				/>
				<div
					v-if="!check_email"
					id="check_email"
					class="text-center text-orange-400"
				>
					⚠️ L'adresse mail n'est pas valide ⚠️
				</div>
			</div>
			<div id="input" class="flex flex-col w-full my-5">
				<label for="username" class="text-gray-500 mb-2"
					>Nom d'utilisateur</label
				>
				<input
					type="text"
					id="username"
					placeholder="S'il vous plait insérez votre nom d'utilisateur"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
					v-model="username"
				/>
			</div>
			<div id="input" class="flex flex-col w-full my-5">
				<label for="password" class="text-gray-500 mb-2"
					>Mot de passe</label
				>
				<div class="relative">
					<input
						@input="
							handlePassword();
							handlePasswordCheck();
						"
						:type="show_passwords ? 'text' : 'password'"
						id="password"
						@copy.prevent
						@paste.prevent
						placeholder="S'il vous plait insérez votre mot de passe"
						class="w-full text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
						v-model="password"
					/>
					<div
						class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
						@click="handleShowPassword()"
					>
						<svg
							:class="{
								hidden: !show_passwords,
								block: show_passwords,
							}"
							class="h-6 text-gray-700"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							viewbox="0 0 576 512"
						>
							<path
								fill="currentColor"
								d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
							></path>
						</svg>

						<svg
							:class="{
								hidden: show_passwords,
								block: !show_passwords,
							}"
							class="h-6 text-gray-700"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							viewbox="0 0 640 512"
						>
							<path
								fill="currentColor"
								d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
							></path>
						</svg>
					</div>
				</div>

				<div
					v-if="!check_passowrds"
					id="check_passowrds"
					class="text-center text-orange-400"
				>
					⚠️ Le mot de passe doit contenir au moins 8 caractères, une
					majuscule, une minuscule, un chiffre et un caractère spécial
					⚠️
				</div>
			</div>
			<div id="input" class="flex flex-col w-full my-5">
				<label for="confirm_password" class="text-gray-500 mb-2"
					>Confirmer votre mot de passe</label
				>
				<input
					@input="handlePassword()"
					:type="show_passwords ? 'text' : 'password'"
					id="confirm_password"
					@copy.prevent
					@paste.prevent
					placeholder="S'il vous plait confirmez votre mot de passe"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
					v-model="confirm_password"
				/>
				<div
					v-if="!same_passowrds"
					id="same_passowrds"
					class="text-center text-red-700"
				>
					⚠️ Les mots de passe ne correspondent pas ⚠️
				</div>
			</div>
			<div v-if="error" id="error" class="text-center text-red-700">
				Il semblerait qu'il y a une erreur dans vos identifiants
			</div>
			<div id="button" class="flex flex-col w-full my-5">
				<button
					type="submit"
					class="w-full py-4 bg-green-600 rounded-lg text-green-100"
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
						href="/auth/login"
						class="w-full text-right font-medium text-gray-500 hover:underline"
						>Déjà un compte ? Se connecter</NuxtLink
					>
				</div>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
definePageMeta({ auth: false });
const regPassword = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'
);

const regEmail = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}');
export default {
	data() {
		return {
			email: '',
			username: '',
			password: '',
			confirm_password: '',
			error: false,
			same_passowrds: true,
			check_passowrds: false,
			check_email: false,
			show_passwords: false,
		};
	},
	methods: {
		async handleClick() {
			if (
				this.email !== '' &&
				this.username !== '' &&
				this.same_passowrds &&
				this.check_passowrds
			) {
				const user = {
					email: this.email,
					password: this.password,
					username: this.username,
				};
				const { data, error } = useFetch('/api/register', {
					method: 'post',
					body: { user },
				});
				if (error.value) {
					this.error = true;
				} else {
					this.error = false;
					navigateTo('/auth/login', { external: true });
				}
			}
		},
		handlePassword() {
			if (
				this.password !== this.confirm_password &&
				this.password !== '' &&
				this.confirm_password !== ''
			) {
				this.same_passowrds = false;
			} else {
				this.same_passowrds = true;
			}
		},
		handlePasswordCheck() {
			if (regPassword.test(this.password)) {
				this.check_passowrds = true;
			} else {
				this.check_passowrds = false;
			}
		},
		handleShowPassword() {
			this.show_passwords = !this.show_passwords;
		},
		handleEmailCheck() {
			if (regEmail.test(this.email)) {
				this.check_email = true;
			} else {
				this.check_email = false;
			}
		},
	},
};
</script>
