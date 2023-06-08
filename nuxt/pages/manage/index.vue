<template>
	<Header />
	<section
		id="dashboard"
		class="flex flex-col gap-5 w-[95%] md:w-[70%] mx-auto px-3 py-5"
	>
		<div>
			<div class="text-lg font-bold">Quelques chiffres</div>
			<div class="flex flex-col md:flex-row gap-2">
				<div class="mt-4 w-full px-5">
					<div
						class="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-md"
					>
						<div class="flex-auto p-4">
							<div class="flex flex-wrap">
								<div
									class="relative w-full pr-4 max-w-full flex-grow flex-1"
								>
									<h5
										class="text-blueGray-400 uppercase font-bold text-xs"
									>
										Mes articles
									</h5>
									<span
										class="font-semibold text-xl text-blueGray-700"
										>{{ state.data.nbArticles }}</span
									>
								</div>
								<div class="relative w-auto pl-4 flex-initial">
									<div
										class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-md rounded-full bg-pink-500"
									>
										Art
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-4 w-full px-5">
					<div
						class="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-md"
					>
						<div class="flex-auto p-4">
							<div class="flex flex-wrap">
								<div
									class="relative w-full pr-4 max-w-full flex-grow flex-1"
								>
									<h5
										class="text-blueGray-400 uppercase font-bold text-xs"
									>
										Les catégories
									</h5>
									<span
										class="font-semibold text-xl text-blueGray-700"
										>{{ state.data.nbCategories }}</span
									>
								</div>
								<div class="relative w-auto pl-4 flex-initial">
									<div
										class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-md rounded-full bg-blue-500"
									>
										Cat
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-4 w-full px-5">
					<div
						class="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-md"
					>
						<div class="flex-auto p-4">
							<div class="flex flex-wrap">
								<div
									class="relative w-full pr-4 max-w-full flex-grow flex-1"
								>
									<h5
										class="text-blueGray-400 uppercase font-bold text-xs"
									>
										Les commentaires
									</h5>
									<span
										class="font-semibold text-xl text-blueGray-700"
										>{{ state.data.nbComments }}</span
									>
								</div>
								<div class="relative w-auto pl-4 flex-initial">
									<div
										class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-md rounded-full bg-green-500"
									>
										Com
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="text-lg font-bold">Modification des données</div>
			<div class="flex flex-wrap mx-auto">
				<div
					class="w-min-1/4 p-2"
					v-for="(item, index) in state.items.filter(
						(i) => i.display
					)"
					:key="index"
				>
					<div
						class="bg-white shadow-md rounded-lg w-full min-h-[150px] flex flex-col justify-between p-5"
					>
						<div class="text-sm text-gray-500">
							{{ item.category }}
						</div>
						<NuxtLink
							:to="{
								path: item.link,
							}"
							class="hover:underline"
						>
							{{ item.title }}
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</section>
	<Footer />
</template>

<script lang="ts" setup>
import { checkAuthorization } from '~~/utils/index';
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 2,
		right: {
			operation: 'manage',
			object: 'dashboard',
		},
	},
});
const state = reactive({
	items: [
		{
			category: 'Gestion',
			title: 'Gestion des rôles',
			link: '/manage/roles',
			display: await checkAuthorization('roles', 'manage'),
		},
		{
			category: 'Gestion',
			title: 'Gestion des utilisateurs',
			link: '/manage/users',
			display: await checkAuthorization('users', 'manage'),
		},
		{
			category: 'Gestion',
			title: 'Gestion des catégories',
			link: '/manage/categories',
			display: await checkAuthorization('categories', 'manage'),
		},
		{
			category: 'Gestion',
			title: 'Gestion des articles',
			link: '/manage/articles',
			display: await checkAuthorization('articles', 'manage'),
		},
		{
			category: 'Gestion',
			title: 'Gestion des commentaires',
			link: '/manage/comments',
			display: await checkAuthorization('comments', 'manage'),
		},
	],
	data: {
		nbArticles: 0,
		nbComments: 0,
		nbCategories: 0,
	},
});
state.items = state.items.sort((a, b) => {
	// @ts-ignore
	const lastWordA = a.title.split(' ').pop().toLowerCase();
	// @ts-ignore
	const lastWordB = b.title.split(' ').pop().toLowerCase();
	return lastWordA.localeCompare(lastWordB);
});
const { data } = await useFetch('/api/widgets', {
	headers: {
		// @ts-ignore
		'x-auth-token': useSession()?.data?.value?.user?.token || '',
	},
	// @ts-ignore
	params: { user_id: useSession()?.data?.value?.user?.id || '' },
});
if (data.value && data.value.message && data.value.message === 'ok') {
	console.log(data.value.data);
	// @ts-ignore
	state.data = data.value.data;
}
</script>
