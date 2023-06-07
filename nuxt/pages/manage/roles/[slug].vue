<template>
	<Header />
	<section class="my-10 w-[95%] md:w-[70%] xl:w-[50%] mx-auto">
		<CommonGoBack />
		<div
			id="input"
			class="flex flex-col w-full my-5"
			v-if="slug != 'create'"
		>
			<label for="slug" class="text-gray-500 mb-2">Slug</label>
			<div
				id="slug"
				class="text-gray-400 bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
			>
				{{ state.role.slug }}
			</div>
		</div>
		<div id="input" class="flex flex-col w-full my-5">
			<label for="name" class="text-gray-500 mb-2">Nom</label>
			<input
				id="name"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.role.name"
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
		right: { object: 'roles', operation: 'update' },
	},
});
const { $toast, $modal } = useNuxtApp();

const route = useRoute();
let role = { slug: '', name: '', _id: '' };
const slug = route.params.slug;
if (slug != 'create') {
	const { data } = await useFetch('/api/roles/' + slug, {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
	});
	// @ts-ignore
	if (data.value && data.value.role) {
		// @ts-ignore
		role = data.value.role;
	}
}
const state: {
	role: { slug: string; name: string; _id: string };
} = reactive({
	role: role,
});

const handleSubmitUpdate = async () => {
	if (slug != 'create') {
		const { data, error } = await useFetch('/api/roles/', {
			headers: {
				// @ts-ignore
				'x-auth-token': useSession()?.data?.value?.user?.token || '',
			},

			method: 'put',
			body: {
				slug: state.role.slug,
				name: state.role.name,
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
	} else {
		const { data } = await useFetch('/api/roles/create', {
			headers: {
				// @ts-ignore
				'x-auth-token': useSession()?.data?.value?.user?.token || '',
			},

			method: 'post',
			body: {
				name: state.role.name,
			},
		});
		if (data.value && data.value.message && data.value.message === 'ok') {
			$toast.show({
				title: 'Rôle créé',
				type: 'success',
				timeout: 10,
				pauseOnHover: true,
			});
		} else {
			$toast.show({
				title: 'Erreur lors de la création',
				type: 'danger',
				timeout: 10,
				pauseOnHover: true,
			});
		}
	}
};

const props = defineProps({
	role: {
		type: Object,
		required: true,
	},
});
const searchValue = ref('');
const handleUpdate = (item: any) => {};
</script>
