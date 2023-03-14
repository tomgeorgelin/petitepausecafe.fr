<template>
	<nav class="relative px-2 py-3">
		<div
			class="md:w-[75%] px-4 mx-auto flex flex-wrap items-center justify-between"
		>
			<div
				class="w-full relative flex justify-between md:justify-around px-4 md:w-auto md:static md:block"
			>
				<a
					class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
					href="#nouveautés"
				>
					<img src="~/assets/svg/logo.svg" alt="" />
				</a>
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
				v-bind:class="{ hidden: !showMenu, flex: showMenu }"
				class="md:flex md:flex-grow items-middle mx-auto text-center"
			>
				<ul class="flex flex-col md:flex-row list-none ml-auto">
					<li class="nav-item py-2">
						<a
							class="py-2 px-3 bg-[#FF5480] text-white rounded-md"
							href="#nouveautés"
						>
							Nouveautés
						</a>
					</li>
					<li class="nav-item py-2">
						<a class="py-2 px-3 rounded-md" href="#catégories">
							Catégories
						</a>
					</li>
					<li class="nav-item py-2">
						<a class="py-2 px-3 rounded-md" href="#populaires">
							Populaires
						</a>
					</li>
					<li class="nav-item py-2">
						<a
							class="py-2 px-3 rounded-md"
							v-if="statusVal === 'unauthenticated'"
							href="/auth/login"
						>
							Se connecter
						</a>
						<a
							class="py-2 px-3 rounded-md"
							v-else
							@click="signOut({ callback: '/' })"
						>
							Se déconnecter
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			showMenu: false,
		};
	},
	methods: {
		toggleNavbar: function () {
			this.showMenu = !this.showMenu;
		},
	},
};
</script>

<script setup>
definePageMeta({ middleware: 'auth' });
const { signOut, status } = useSession();
const statusVal = status.value;
let show = false;
</script>
