<template>
	<Header />
	<section
		class="container mx-auto w-[95%] md:w-[70%] bg-white p-5 rounded-md shadow-md my-5"
	>
		<CommonGoBack />
		<div class="flex flex-col w-full my-5">
			<label for="categories" class="text-gray-500 mb-2"
				>Catégories</label
			>
			<select
				name="categories"
				id="categories"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.category_id"
			>
				<option
					v-for="cat in categories"
					:key="cat._id"
					:value="cat._id"
					:selected="cat._id === state.category_id"
				>
					{{ cat.name }}
				</option>
			</select>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="title" class="text-gray-500 mb-2">Titre</label>
			<input
				type="text"
				id="title"
				placeholder="Titre de l'article"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.title"
			/>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="description" class="text-gray-500 mb-2"
				>Description</label
			>
			<textarea
				name="description"
				id="description"
				cols="30"
				rows="4"
				placeholder="Votre description"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.description"
			></textarea>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="seo_title" class="text-gray-500 mb-2">Titre SEO</label>
			<input
				type="text"
				id="seo_title"
				placeholder="Titre de l'article SEO"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.seo_title"
			/>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="seo_description" class="text-gray-500 mb-2"
				>Description SEO</label
			>
			<textarea
				name="seo_description"
				id="seo_description"
				cols="30"
				rows="4"
				placeholder="Votre description SEO"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.seo_description"
			></textarea>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="seo_keywords" class="text-gray-500 mb-2"
				>Mots clefs SEO</label
			>
			<input
				type="text"
				id="seo_keywords"
				placeholder="Mots clefs pour le référencement"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.seo_keywords"
			/>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="image" class="text-gray-500 mb-2">Image</label>
			<input
				type="text"
				id="image"
				placeholder="URL pour l'image"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.image"
			/>
		</div>
		<div class="flex flex-row gap-3 items-center my-5">
			<label for="active" class="text-gray-500">Actif ?</label>
			<input
				type="checkbox"
				id="active"
				class="text-black bg-white border-2 border-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tint focus:shadow-lg"
				v-model="state.active"
			/>
		</div>
		<!-- body -->
		<WYSIWYGTipTap :updateBody="updateBody" :body="state.body" />

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

<script setup lang="ts">
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 3,
		right: { object: 'articles', operation: 'create' },
	},
});
const route = useRoute();
const slug = route.query.slug;
const { $toast } = useNuxtApp();
const { data } = await useFetch('/api/categories');
let categories: any = [];
let article: any = {};
if (data.value && data.value.message && data.value.message === 'ok') {
	categories = data.value.categories;
}
if (slug && (await checkAuthorization('articles', 'update'))) {
	const { data } = await useFetch('/api/articles/' + slug);
	// @ts-ignore
	if (data.value && data.value.message && data.value.message === 'ok') {
		// @ts-ignore
		article = data.value.article;
	}
}
const state = reactive({
	slug: article.slug ?? '',
	body: article.body ?? '',
	description: article.description ?? '',
	seo_description: article.seo_description ?? '',
	active: article.active ?? false,
	title: article.title ?? '',
	image: article.image ?? '',
	category_id: article.category_id ? article.category_id._id : '',
	seo_title: article.seo_title ?? '',
	seo_keywords: article.seo_keywords ?? '',
});
const updateBody = (text: string) => {
	state.body = text;
};
const handleSubmitUpdate = async () => {
	if (
		state.body !== '' ||
		state.title !== '' ||
		state.seo_description !== '' ||
		state.seo_title !== '' ||
		state.description !== '' ||
		state.image !== ''
	) {
		if (state.slug != '') {
			const { data } = await useFetch('/api/articles/' + state.slug, {
				headers: {
					// @ts-ignore
					'x-auth-token':
						useSession()?.data?.value?.user?.token || '',
				},

				method: 'put',
				body: {
					body: state.body,
					title: state.title,
					description: state.description,
					seo_title: state.seo_title,
					seo_description: state.seo_description,
					seo_keywords: state.seo_keywords,
					active: state.active,
					image: state.image,
					user_email: useSession().data.value?.user?.email,
					category_id: state.category_id,
				},
			});
			if (
				data.value &&
				data.value.message &&
				data.value.message === 'ok'
			) {
				$toast.show({
					title: 'Article mis à jour',
					type: 'success',
					timeout: 10,
					pauseOnHover: true,
				});
			} else {
				$toast.show({
					title: 'Erreur lors de la mise à jour',
					type: 'danger',
					timeout: 10,
					pauseOnHover: true,
				});
			}
		} else {
			const { data } = await useFetch('/api/articles/create', {
				headers: {
					// @ts-ignore
					'x-auth-token':
						useSession()?.data?.value?.user?.token || '',
				},

				method: 'post',
				body: {
					body: state.body,
					title: state.title,
					description: state.description,
					seo_title: state.seo_title,
					seo_description: state.seo_description,
					seo_keywords: state.seo_keywords,
					active: state.active,
					image: state.image,
					user_email: useSession().data.value?.user?.email,
					category_id: state.category_id,
				},
			});
			if (
				data.value &&
				data.value.message &&
				data.value.message === 'ok'
			) {
				$toast.show({
					title: 'Article enregistré',
					type: 'success',
					timeout: 10,
					pauseOnHover: true,
				});
			} else {
				$toast.show({
					title: "Erreur lors de l'enregistrement",
					type: 'danger',
					timeout: 10,
					pauseOnHover: true,
				});
			}
		}
	} else {
		$toast.show({
			title: 'Tous les champs doivent être remplis',
			type: 'warning',
			timeout: 10,
			pauseOnHover: true,
		});
	}
};
</script>
