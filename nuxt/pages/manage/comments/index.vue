<template>
	<Header />
	<section class="my-10 w-[95%] md:w-[70%] mx-auto">
		<CommonGoBack />
		<div class="w-full text-right my-5">
			<span>Commentaire recherché : </span>
			<input
				type="text"
				placeholder="Texte"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="searchValue"
			/>
		</div>
		<e-data-table
			class="shadow-md rounded-md"
			:headers="headers"
			:items="items"
			themeColor="#FF5480"
			alternating
			rowsPerPageMessage="Lignes par page"
			rowsOfPageSeparatorMessage="de"
			no-hover
			body-text-direction="center"
			header-text-direction="center"
			table-class-name="customize-table"
			:search-field="searchFields"
			:search-value="searchValue"
		>
			<template #item-user_id.name="item">
				<NuxtLink
					v-if="item.user_id"
					:to="{
						path: '/manage/users/',
						query: { slug: item.user_id.slug },
					}"
					class="hover:underline text-tint cursor-pointer"
				>
					{{ item.user_id.name }}
				</NuxtLink>
			</template>
			<template #item-article_id.title="item">
				<NuxtLink
					v-if="item.article_id"
					:to="{
						path: '/articles/' + item.article_id.slug,
					}"
					target="_blank"
					class="hover:underline text-tint cursor-pointer"
				>
					{{ item.article_id.title }}
				</NuxtLink>
			</template>
			<template #item-parent_id._id="item">
				<div
					v-if="item.parent_id"
					@click="
						() => {
							searchValue = item.parent_id._id;
						}
					"
					class="hover:underline text-tint cursor-pointer"
				>
					{{ item.parent_id._id }}
				</div>
			</template>
			<template #item-operation="item">
				<div
					class="operation-wrapper flex gap-3 flex-row justify-center items-center"
				>
					<div
						@click="handleToggleActivation(item)"
						class="hover:cursor-pointer"
					>
						<span v-if="item.active"> ✅ </span>
						<span v-else> ❌ </span>
					</div>
				</div>
			</template>
		</e-data-table>
	</section>
	<Footer />
</template>

<style>
.customize-table {
	--easy-table-border: 0px solid #445269;
	--easy-table-row-border: 1px solid #e5e7eb;

	--easy-table-header-font-size: 14px;
	--easy-table-header-font-weight: 300;
	--easy-table-header-height: 50px;
	--easy-table-header-font-color: black;
	--easy-table-header-background-color: white;

	--easy-table-header-item-padding: 10px 15px;

	--easy-table-body-even-row-font-color: black;
	--easy-table-body-even-row-background-color: #f3f4f6;

	--easy-table-body-row-font-color: black;
	--easy-table-body-row-background-color: white;
	--easy-table-body-row-height: 50px;
	--easy-table-body-row-font-size: 14px;

	--easy-table-body-row-hover-font-color: white;
	--easy-table-body-row-hover-background-color: lightgray;

	--easy-table-body-item-padding: 10px 15px;

	--easy-table-footer-background-color: white;
	--easy-table-footer-font-color: black;
	--easy-table-footer-font-size: 14px;
	--easy-table-footer-padding: 0px 10px;
	--easy-table-footer-height: 50px;

	--easy-table-rows-per-page-selector-width: 70px;
	--easy-table-rows-per-page-selector-option-padding: 10px;
	--easy-table-rows-per-page-selector-z-index: 1;

	--easy-table-scrollbar-track-color: white;
	--easy-table-scrollbar-color: white;
	--easy-table-scrollbar-thumb-color: #f3f4f6;
	--easy-table-scrollbar-corner-color: white;

	--easy-table-loading-mask-background-color: white;
}
</style>

<script lang="ts" setup>
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 2,
		right: { object: 'comments', operation: 'manage' },
	},
});
import type { Header } from 'vue3-easy-data-table';
let items: any = [];
const { data } = await useFetch('/api/comments');
if (data.value && data.value.comments) {
	items = data.value.comments;
}
const searchValue = ref('');
const searchFields = ['body', '_id'];
const { $toast } = useNuxtApp();
const handleToggleActivation = async (item: any) => {
	const { data } = await useFetch('/api/comments/' + item._id, {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		method: 'put',
	});
	// @ts-ignore
	if (data.value && data.value.message && data.value.message === 'ok') {
		$toast.show({
			title: 'Le commentaire est maintenant affichable',
			type: 'success',
			timeout: 10,
			pauseOnHover: true,
		});
		items.map((el: any) => {
			if (el._id === item._id) {
				el.active = !el.active;
			}
			return el;
		});
		item.active = !item.active;
	} else {
		$toast.show({
			title: 'Erreur lors de la mise à jour du commentaire',
			type: 'danger',
			timeout: 10,
			pauseOnHover: true,
		});
	}
};
const headers: Header[] = [
	{ text: '#', value: '_id' },
	{
		text: 'Commentaire parent',
		value: 'parent_id._id',
		sortable: true,
	},
	{ text: 'Utilisateur', value: 'user_id.name', sortable: true },
	{ text: 'Article', value: 'article_id.title', sortable: true },
	{ text: 'Texte', value: 'body' },
];
if (await checkAuthorization('comments', 'moderate')) {
	headers.push({ text: 'Actions', value: 'operation' });
}
</script>
