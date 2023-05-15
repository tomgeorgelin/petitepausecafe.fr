<template>
	<Header />
	<section class="my-10 w-[95%] md:w-[70%] xl:w-[50%] mx-auto">
		<div class="w-full text-right my-5">
			<span>Rôle recherchée : </span>
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
			:search-field="'name'"
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
					<div
						@click="
							navigateTo('/manage/permissions?role=' + item.slug)
						"
					>
						<svg
							version="1.0"
							class="hover:fill-tint cursor-pointer"
							xmlns="http://www.w3.org/2000/svg"
							width="25px"
							height="25px"
							viewBox="0 0 877.000000 1280.000000"
							preserveAspectRatio="xMidYMid meet"
						>
							<g
								transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
							>
								<path
									d="M4115 12785 c-659 -72 -1254 -378 -1775 -911 -310 -318 -530 -633 -745 -1069 -329 -667 -501 -1379 -522 -2158 l-6 -239 -26 -10 c-240 -98 -472 -258 -624 -432 -231 -265 -363 -559 -406 -906 -8 -57 -11 -746 -11 -2090 0 -2181 -1 -2123 56 -2378 81 -363 250 -703 508 -1026 97 -122 337 -365 463 -468 654 -540 1524 -902 2493 -1037 320 -45 480 -55 865 -55 385 0 545 10 865 55 969 135 1839 497 2493 1037 126 103 366 346 463 468 258 323 427 663 508 1026 57 255 56 197 56 2378 0 1344 -3 2033 -11 2090 -43 347 -175 641 -406 906 -152 174 -384 334 -624 432 l-26 10 -6 239 c-15 565 -111 1096 -290 1608 -151 433 -378 871 -627 1210 -219 299 -515 595 -805 805 -550 398 -1224 584 -1860 515z m582 -1544 c392 -83 720 -294 994 -638 208 -261 392 -636 495 -1012 85 -309 129 -595 142 -920 l7 -161 -1950 0 -1950 0 7 161 c22 547 142 1046 353 1474 321 651 796 1033 1385 1115 109 15 411 4 517 -19z m-105 -5116 c383 -67 704 -297 887 -637 85 -156 124 -287 143 -477 42 -416 -147 -840 -489 -1097 l-73 -55 0 -570 0 -569 -675 0 -675 0 0 569 0 570 -73 55 c-489 368 -636 1037 -346 1574 181 337 501 568 881 637 100 18 317 18 420 0z"
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
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 3,
		right: { object: 'roles', operation: 'manage' },
	},
});
import type { Header, Item } from 'vue3-easy-data-table';
let items: any = [];
const { data } = await useFetch('/api/roles');
if (data.value && data.value.roles) {
	items = data.value.roles;
}
const searchValue = ref('');
const handleEdit = (item: any) => {
	navigateTo('/manage/roles/' + item.slug);
};
const headers: Header[] = [
	{ text: 'Nom', value: 'name', sortable: true },
	{ text: 'Slug', value: 'slug', sortable: true },
	{ text: 'Actions', value: 'operation' },
];
</script>
