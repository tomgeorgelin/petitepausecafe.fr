<template>
	<Header />
	<section class="my-10 w-[95%] md:w-[70%] xl:w-[50%] mx-auto">
		<div id="input" class="flex flex-col w-full my-5">
			<label for="slug" class="text-gray-500 mb-2">Slug</label>
			<div
				id="slug"
				class="text-gray-400 bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
			>
				{{ state.category.slug }}
			</div>
		</div>
		<div id="input" class="flex flex-col w-full my-5">
			<label for="name" class="text-gray-500 mb-2">Nom</label>
			<input
				id="name"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.category.name"
			/>
		</div>
		<div id="input" class="flex flex-col w-full my-5">
			<label for="name" class="text-gray-500 mb-2">Image</label>
			<input
				id="name"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.category.image"
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
	</section>
	<Footer />
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 3,
		right: { object: 'categories', operation: 'update' },
	},
});
const { $toast } = useNuxtApp();

const route = useRoute();
const slug = route.params.slug;
let category = { slug: '', name: '', _id: '', image: '' };
const { data } = await useFetch('/api/categories/' + slug);
// @ts-ignore
if (data.value && data.value.category) {
	// @ts-ignore
	category = data.value.category;
}
const state: {
	category: { slug: string; name: string; _id: string; image: string };
} = reactive({
	category,
});
const handleSubmitUpdate = () => {
	const { data, error } = useFetch('/api/categories/', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		method: 'put',
		body: {
			slug: state.category.slug,
			name: state.category.name,
			image: state.category.image,
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
			title: 'Rôle mis à jour',
			type: 'success',
			timeout: 10,
			pauseOnHover: true,
		});
	}
};
</script>
