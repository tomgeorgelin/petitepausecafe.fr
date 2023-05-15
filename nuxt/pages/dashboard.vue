<template>
	<Header />
	<section
		id="dashboard"
		class="flex flex-col md:flex-row gap-5 w-[95%] md:w-[70%] mx-auto px-3 py-5"
	>
		<div class="flex flex-wrap mx-auto">
			<div
				class="w-min-1/4 p-2"
				v-for="(item, index) in state.items.filter((i) => i.display)"
				:key="index"
			>
				<div
					class="bg-white shadow-lg rounded-lg w-full min-h-[150px] flex flex-col justify-between p-5"
				>
					<div class="text-sm text-gray-500">
						{{ item.category }}
					</div>
					<NuxtLink
						:to="{
							path: item.link,
						}"
						target="_blank"
						class="hover:underline"
					>
						{{ item.title }}
					</NuxtLink>
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
		{
			category: 'Gestion',
			title: 'Gestion des permissions',
			link: '/manage/permissions',
			display:
				true || (await checkAuthorization('permissions', 'manage')),
		},
	],
});
</script>
