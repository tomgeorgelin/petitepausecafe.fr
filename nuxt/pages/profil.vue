<template>
	<Header />
	<section
		class="flex flex-col md:flex-row gap-5 w-[95%] md:w-[70%] mx-auto px-3 py-5 bg-white rounded-md"
	>
		<ul class="mr-4 flex list-none flex-col flex-wrap pl-0 basis-1/4">
			<li class="text-center cursor-pointer" @click="handleTabs(0)">
				<a
					:class="{
						'border-b-2 border-solid border-tint':
							state.currentTab === 0,
						'border-b-2 border-solid border-transparent':
							state.currentTab !== 0,
					}"
					class="transition-colors duration-300 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary"
					>Mes données</a
				>
			</li>
			<li class="text-center cursor-pointer" @click="handleTabs(1)">
				<a
					:class="{
						'border-b-2 border-solid border-tint':
							state.currentTab === 1,
						'border-b-2 border-solid border-transparent':
							state.currentTab !== 1,
					}"
					class="transition-colors duration-300 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary"
					>Changer mon mot de passe</a
				>
			</li>
			<li class="text-center cursor-pointer" @click="handleTabs(2)">
				<a
					:class="{
						'border-b-2 border-solid border-tint':
							state.currentTab === 2,
						'border-b-2 border-solid border-transparent':
							state.currentTab !== 2,
					}"
					class="transition-colors duration-300 my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary"
					>Supprimer mon compte</a
				>
			</li>
		</ul>
		<div class="basis-3/4">
			<div v-if="state.currentTab === 0">
				<div>
					Profil vérifé ? {{ state.user.verified ? '✅' : '❌' }}
				</div>
				<div id="input" class="flex flex-col w-full my-5">
					<label for="role" class="text-gray-500 mb-2">Role</label>
					<div
						type="text"
						id="role"
						class="text-gray-400 bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					>
						{{ state.user.role_id.name }}
					</div>
				</div>
				<div id="input" class="flex flex-col w-full my-5">
					<label for="username" class="text-gray-500 mb-2"
						>Nom d'utilisateur</label
					>
					<div
						type="text"
						id="username"
						placeholder="Nom d'utilisateur"
						class="text-gray-400 bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					>
						{{ state.user.name }}
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
						v-model="state.user.description"
						placeholder="La description de votre profil"
						class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
						>{{ state.user.description }}</textarea
					>
				</div>
				<div id="input" class="flex flex-col w-full my-5">
					<label for="image" class="text-gray-500 mb-2"
						>Photo de profil
					</label>
					<input
						type="text"
						id="image"
						v-model="state.user.image"
						placeholder="https://exemple.fr/photo.jpg"
						class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					/>
				</div>
				<div id="button" class="flex flex-col w-full my-5">
					<button
						@click="handleSubmitUpdate()"
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
							<div class="font-bold">Enregistrer</div>
						</div>
					</button>
				</div>
			</div>
			<div class="" v-if="state.currentTab === 1">
				<div id="input" class="flex flex-col w-full my-5">
					<label for="old" class="text-gray-500 mb-2"
						>Ancien mot de passe
					</label>
					<input
						type="password"
						id="old"
						v-model="state.oldPassword"
						class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					/>
				</div>
				<div id="input" class="flex flex-col w-full my-5">
					<label for="newPassword" class="text-gray-500 mb-2"
						>Nouveau mot de passe
					</label>
					<input
						@input="handleInputPasswords"
						type="password"
						id="newPassword"
						v-model="state.newPassword"
						class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					/>
				</div>
				<div id="input" class="flex flex-col w-full my-5">
					<label for="newPasswordCheck" class="text-gray-500 mb-2"
						>Confirmation nouveau mot de passe
					</label>
					<input
						@input="handleInputPasswords"
						type="password"
						id="newPasswordCheck"
						v-model="state.newPasswordCheck"
						class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
					/>
				</div>
				<div
					v-if="state.error"
					id="error"
					class="text-center text-red-700"
				>
					Il semblerait qu'il y a une erreur dans vos données
				</div>
				<div id="button" class="flex flex-col w-full my-5">
					<button
						@click="handleSubmitPasswordUpdate()"
						v-bind:disabled="
							!(
								checkPasswords(
									state.newPassword,
									state.newPasswordCheck
								) && checkPassword(state.newPassword)
							)
								? true
								: undefined
						"
						class="w-full py-4 disabled:bg-gray-500 disabled:cursor-not-allowed bg-tint rounded-lg text-white"
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
							<div class="font-bold">
								Mettre à jour votre mot de passe
							</div>
						</div>
					</button>
				</div>
			</div>
			<div class="" v-if="state.currentTab === 2">
				<div class="flex flex-col w-full my-5">
					<div class="text-tint text-sm my-3">
						<div>
							Attention, toute suppression est définitive. Vous
							allez perdre l'accès à votre compte, vos articles
							(si vous en avez) seront supprimés ainsi que leurs
							commentaires associés.
						</div>
						<div>
							Les commentaires que vous avez fait sur d'autres
							articles resteront mais ne porteront plus votre nom.
						</div>
					</div>
					<button
						@click="
							{
								{
									$modal.show({
										type: 'danger',
										title: 'Attention vous allez supprimer votre compte',
										body: 'Attention, toute suppression est définitive. Vous allez perdre l\'accès à votre compte, vos articles (si vous en avez) seront supprimés ainsi que leurs commentaires associés.\nLes commentaires que vous avez fait sur d\'autres articles resteront mais ne porteront plus votre nom.',
										primary: {
											label: 'Supprimer',
											theme: 'red',
											action: () =>
												handleDeleteEverything(),
										},
										secondary: {
											label: 'Annuler',
											theme: 'white',
											action: () => $toast.show('Annulé'),
										},
									});
								}
							}
						"
						class="w-full py-4 hover:bg-tint transition-colors duration-300 bg-gray-500 disabled:cursor-not-allowed rounded-lg text-white"
					>
						Supprimer votre compte
					</button>
				</div>
			</div>
		</div>
	</section>
	<Footer />
</template>
<script lang="ts" setup>
const { $toast, $modal } = useNuxtApp();
import { checkPasswords, checkPassword } from '~/utils/index';
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 1,
	},
});
const { data, error } = await useFetch(
	'/api/users/' + useSession().data.value?.user?.email,
	{
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
	}
);
const state = reactive<{
	currentTab: number;
	oldPassword: string;
	newPassword: string;
	newPasswordCheck: string;
	error: boolean;
	user: {
		description: string;
		email: string;
		name: string;
		verified: string;
		_id: string;
		image: string;
		role_id: {
			_id: string;
			name: string;
		};
	};
}>({
	currentTab: 0,
	oldPassword: '',
	newPassword: '',
	error: false,
	newPasswordCheck: '',
	// @ts-ignore
	user: data.value.user,
});
const handleTabs = (i: number) => {
	state.currentTab = i;
};
const handleSubmitUpdate = () => {
	const { data, error } = useFetch('/api/users/', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},

		method: 'put',
		body: {
			email: state.user.email,
			description: state.user.description,
			image: state.user.image,
		},
	});
	if (data.value && data.value.message && data.value.message === 'ko') {
		$toast.show({
			title: 'Erreur lors de la mise à jour',
			type: 'danger',
			timeout: 10,
			pauseOnHover: true,
		});
	} else {
		$toast.show({
			title: 'Profil mis à jour',
			type: 'success',
			timeout: 10,
			pauseOnHover: true,
		});
	}
};
const handleInputPasswords = () => {
	if (!checkPasswords(state.newPassword, state.newPasswordCheck)) {
		console.log('password different');
	}
	if (!checkPassword(state.newPassword)) {
		console.log('password 8 char etc');
	}
};
const handleSubmitPasswordUpdate = async () => {
	const { data, error } = await useFetch('/api/users/update-password', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},

		method: 'put',
		body: {
			email: state.user.email,
			oldPassword: state.oldPassword,
			newPassword: state.newPassword,
		},
	});
	if (data.value && data.value.message && data.value.message === 'ko') {
		$toast.show({
			title: 'Erreur lors de la mise à jour',
			type: 'danger',
			timeout: 10,
			pauseOnHover: true,
		});
	} else {
		$toast.show({
			title: 'Profil mis à jour',
			type: 'success',
			timeout: 10,
			pauseOnHover: true,
		});
	}
};

const handleDeleteEverything = async () => {
	const { data } = await useFetch('/api/users/delete', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},

		method: 'delete',
		body: {
			email: state.user.email,
		},
	});
	if (data.value && data.value.message && data.value.message === 'ko') {
		$toast.show({
			title: 'Erreur lors de la suppression du compte',
			type: 'danger',
			timeout: 10,
			pauseOnHover: true,
		});
	} else {
		useSession().signOut();
		navigateTo('/');
	}
};
</script>
