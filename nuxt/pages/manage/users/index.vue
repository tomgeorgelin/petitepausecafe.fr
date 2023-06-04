<template>
	<Header />
	<section class="my-10 w-[95%] md:w-[70%] xl:w-[50%] mx-auto">
		<div class="w-full text-right my-5">
			<span>Personne recherchée : </span>
			<input
				type="text"
				placeholder="Nom"
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
			show-index
		>
			<template #item-operation="item">
				<div
					class="operation-wrapper flex gap-3 flex-row justify-center items-center"
				>
					<div @click="handleEdit(item)">
						<svg
							fill="#000000"
							class="hover:fill-tint cursor-pointer"
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							width="20px"
							height="20px"
							viewBox="0 0 348.882 348.882"
							xml:space="preserve"
						>
							<g>
								<path
									d="M333.988,11.758l-0.42-0.383C325.538,4.04,315.129,0,304.258,0c-12.187,0-23.888,5.159-32.104,14.153L116.803,184.231
		c-1.416,1.55-2.49,3.379-3.154,5.37l-18.267,54.762c-2.112,6.331-1.052,13.333,2.835,18.729c3.918,5.438,10.23,8.685,16.886,8.685
		c0,0,0.001,0,0.001,0c2.879,0,5.693-0.592,8.362-1.76l52.89-23.138c1.923-0.841,3.648-2.076,5.063-3.626L336.771,73.176
		C352.937,55.479,351.69,27.929,333.988,11.758z M130.381,234.247l10.719-32.134l0.904-0.99l20.316,18.556l-0.904,0.99
		L130.381,234.247z M314.621,52.943L182.553,197.53l-20.316-18.556L294.305,34.386c2.583-2.828,6.118-4.386,9.954-4.386
		c3.365,0,6.588,1.252,9.082,3.53l0.419,0.383C319.244,38.922,319.63,47.459,314.621,52.943z"
								/>
								<path
									d="M303.85,138.388c-8.284,0-15,6.716-15,15v127.347c0,21.034-17.113,38.147-38.147,38.147H68.904
		c-21.035,0-38.147-17.113-38.147-38.147V100.413c0-21.034,17.113-38.147,38.147-38.147h131.587c8.284,0,15-6.716,15-15
		s-6.716-15-15-15H68.904c-37.577,0-68.147,30.571-68.147,68.147v180.321c0,37.576,30.571,68.147,68.147,68.147h181.798
		c37.576,0,68.147-30.571,68.147-68.147V153.388C318.85,145.104,312.134,138.388,303.85,138.388z"
								/>
							</g>
						</svg>
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
const route = useRoute();
const slug = route.query.slug;
const searchFields = ['name', 'slug'];
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 3,
		right: { object: 'users', operation: 'manage' },
	},
});
import type { Header, Item } from 'vue3-easy-data-table';
let items: any = [];
const { data } = await useFetch('/api/users', {
	headers: {
		// @ts-ignore
		'x-auth-token': useSession()?.data?.value?.user?.token || '',
	},
});
if (data.value && data.value.users) {
	items = data.value.users;
}
const searchValue = ref(slug ?? '');
const handleEdit = (item: any) => {
	navigateTo('/manage/users/' + item.email);
};
const headers: Header[] = [
	{ text: 'Nom', value: 'name', sortable: true },
	{ text: 'Email', value: 'email', sortable: true },
	{ text: 'Rôle', value: 'role_id.name', sortable: true },
	{ text: 'Description', value: 'description', sortable: true },
	{ text: 'Actions', value: 'operation' },
];
</script>
