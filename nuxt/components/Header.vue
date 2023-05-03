<template>
	<nav class="relative px-2 py-3">
		<div
			class="md:w-[75%] px-4 mx-auto flex flex-wrap items-center justify-between"
		>
			<div
				class="w-full relative flex justify-between md:justify-around px-4 md:w-auto md:static md:block"
			>
				<NuxtLink
					class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
					href="/"
				>
					<img src="~/assets/svg/logo.svg" alt="" />
				</NuxtLink>
				<button
					class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
					type="button"
					v-on:click="toggleNavbar()"
				>
					<svg
						width="20"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 283.426 283.426"
						xml:space="preserve"
					>
						<g>
							<rect
								x="0"
								y="40.84"
								style="fill: #010002"
								width="283.426"
								height="47.735"
							/>
							<rect
								x="0"
								y="117.282"
								style="fill: #010002"
								width="283.426"
								height="47.735"
							/>
							<rect
								x="0"
								y="194.851"
								style="fill: #010002"
								width="283.426"
								height="47.735"
							/>
						</g>
					</svg>
				</button>
			</div>
			<div
				v-bind:class="{ hidden: !state.showMenu, flex: state.showMenu }"
				class="md:flex md:flex-grow items-middle mx-auto text-center"
			>
				<ul
					class="flex flex-col md:flex-row list-none ml-auto items-center"
				>
					<li class="nav-item py-2">
						<NuxtLink
							class="py-2 px-3 bg-[#FF5480] text-white rounded-md"
							href="/#nouveautes"
						>
							Nouveautés
						</NuxtLink>
					</li>
					<li class="nav-item py-2">
						<NuxtLink
							class="py-2 px-3 rounded-md"
							href="/#catégories"
						>
							Catégories
						</NuxtLink>
					</li>
					<li class="nav-item py-2">
						<NuxtLink
							class="py-2 px-3 rounded-md"
							href="/#populaires"
						>
							Populaires
						</NuxtLink>
					</li>
					<li
						v-if="useSession().status.value === 'authenticated'"
						class="nav-item py-2"
					>
						<CommonDropdown
							title="Mon profil"
							:items="state.items"
						/>
					</li>
					<li v-else class="nav-item py-2">
						<NuxtLink
							class="py-2 px-3 rounded-md"
							href="/auth/login"
						>
							Se connecter
						</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { checkAuthorization } from '~~/utils/index';
const toggleNavbar = () => {
	state.showMenu = !state.showMenu;
};
const callback = () => {
	const session = useSession();
	if (session.status.value === 'authenticated') {
		session.signOut();
	} else {
		navigateTo('/auth/login');
	}
};

const state = reactive({
	showMenu: false,
	items: [
		{
			title:
				useSession().status.value === 'authenticated'
					? 'Se déconnecter'
					: 'Se connecter',
			callback: callback,
		},
	],
});

if (useSession().status.value === 'authenticated') {
	if (await checkAuthorization('articles', 'create')) {
		state.items.unshift({
			title: 'Créer un article',
			callback: () => navigateTo('/articles/create'),
		});
	}
}
</script>
