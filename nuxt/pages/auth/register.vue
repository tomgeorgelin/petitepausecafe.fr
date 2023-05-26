<template>
	<Header />
	<section
		class="bg-white p-10 flex flex-col shadow-xl rounded-xl w-11/12 sm:w-5/6 lg:w-6/12 xl:4/12 mx-auto my-5"
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
					type="email"
					id="email"
					@input="handleEmailCheck()"
					placeholder="Adresse mail"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
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
					placeholder="Nom d'utilisateur"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
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
						placeholder="Mot de passe"
						class="w-full text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
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
							class="text-gray-700"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							width="40px"
							height="20px"
							viewBox="0 0 30 25"
						>
							<path
								style="
									stroke: none;
									fill-rule: nonzero;
									fill: rgb(0%, 0%, 0%);
									fill-opacity: 1;
								"
								d="M 29.820312 12.574219 C 26.996094 7.0625 21.402344 3.332031 15 3.332031 C 8.597656 3.332031 3.003906 7.066406 0.179688 12.574219 C -0.0585938 13.050781 -0.0585938 13.617188 0.179688 14.09375 C 3.003906 19.605469 8.597656 23.332031 15 23.332031 C 21.402344 23.332031 26.996094 19.601562 29.820312 14.09375 C 30.058594 13.617188 30.058594 13.050781 29.820312 12.574219 Z M 15 20.832031 C 10.859375 20.832031 7.5 17.476562 7.5 13.332031 C 7.5 9.191406 10.859375 5.832031 15 5.832031 C 19.140625 5.832031 22.5 9.191406 22.5 13.332031 C 22.503906 17.476562 19.144531 20.835938 15 20.832031 Z M 15 8.332031 C 14.554688 8.339844 14.109375 8.40625 13.683594 8.53125 C 14.410156 9.523438 14.308594 10.898438 13.4375 11.769531 C 12.566406 12.640625 11.1875 12.746094 10.199219 12.015625 C 9.636719 14.082031 10.457031 16.273438 12.234375 17.464844 C 14.007812 18.65625 16.347656 18.582031 18.046875 17.28125 C 19.746094 15.980469 20.421875 13.738281 19.734375 11.714844 C 19.042969 9.6875 17.140625 8.328125 15 8.332031 Z M 15 8.332031 "
							/>
						</svg>

						<svg
							:class="{
								hidden: show_passwords,
								block: !show_passwords,
							}"
							class="text-gray-700"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							width="40px"
							height="20px"
							viewBox="0 0 25 20"
						>
							<path
								style="
									stroke: none;
									fill-rule: nonzero;
									fill: rgb(0%, 0%, 0%);
									fill-opacity: 1;
								"
								d="M 12.519531 15.65625 C 9.550781 15.65625 7.148438 13.359375 6.929688 10.445312 L 2.824219 7.273438 C 2.285156 7.949219 1.789062 8.664062 1.386719 9.449219 C 1.207031 9.808594 1.207031 10.230469 1.386719 10.589844 C 3.511719 14.730469 7.710938 17.535156 12.519531 17.535156 C 13.574219 17.535156 14.589844 17.378906 15.566406 17.125 L 13.535156 15.554688 C 13.203125 15.617188 12.859375 15.652344 12.519531 15.65625 Z M 24.796875 17.929688 L 20.472656 14.585938 C 21.785156 13.476562 22.867188 12.121094 23.652344 10.589844 C 23.832031 10.230469 23.832031 9.808594 23.652344 9.449219 C 21.53125 5.308594 17.328125 2.503906 12.519531 2.503906 C 10.503906 2.507812 8.523438 3.015625 6.757812 3.980469 L 1.777344 0.132812 C 1.503906 -0.0820312 1.113281 -0.03125 0.898438 0.242188 L 0.132812 1.230469 C -0.0820312 1.503906 -0.03125 1.898438 0.242188 2.109375 L 23.261719 19.90625 C 23.535156 20.121094 23.925781 20.070312 24.140625 19.796875 L 24.90625 18.808594 C 25.121094 18.535156 25.070312 18.140625 24.796875 17.929688 Z M 17.609375 12.371094 L 16.070312 11.183594 C 16.203125 10.808594 16.269531 10.414062 16.277344 10.019531 C 16.289062 8.84375 15.746094 7.730469 14.8125 7.019531 C 13.875 6.304688 12.65625 6.082031 11.53125 6.410156 C 11.765625 6.730469 11.894531 7.117188 11.894531 7.515625 C 11.886719 7.648438 11.867188 7.777344 11.832031 7.90625 L 8.953125 5.679688 C 9.953125 4.84375 11.214844 4.382812 12.519531 4.382812 C 14.015625 4.382812 15.449219 4.976562 16.503906 6.035156 C 17.5625 7.089844 18.152344 8.523438 18.152344 10.019531 C 18.152344 10.867188 17.945312 11.65625 17.609375 12.371094 Z M 17.609375 12.371094 "
							/>
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
					placeholder="Confirmez votre mot de passe"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
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
			<div id="input" class="flex flex-col w-full my-5">
				<label for="description" class="text-gray-500 mb-2"
					>Description
				</label>
				<textarea
					name="description"
					id="description"
					rows="3"
					v-model="description"
					placeholder="La description de votre profil"
					class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				>
				</textarea>
			</div>
			<div v-if="error" id="error" class="text-center text-red-700">
				Il semblerait qu'il y a une erreur dans vos données
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
						<div class="font-bold">S'enregistrer</div>
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
	</section>
	<Footer />
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
			description: '',
			error: false,
			same_passowrds: true,
			check_passowrds: false,
			check_email: true,
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
					name: this.username,
					description: this.description,
				};
				const { data, error } = await useFetch('/api/register', {
					method: 'post',
					body: { user },
				});
				if (
					data.value &&
					data.value.message &&
					data.value?.message === 'ko'
				) {
					this.error = true;
				} else {
					this.error = false;
					navigateTo('/auth/login');
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
			if (this.email !== '') {
				this.check_email = regEmail.test(this.email);
			} else {
				this.check_email = true;
			}
		},
	},
};
</script>
