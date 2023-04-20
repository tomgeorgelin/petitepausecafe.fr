<template>
	<Header />
	<section
		class="container mx-auto w-[95%] md:w-[70%] bg-white p-5 rounded-md shadow-md my-5"
	>
		<div class="flex flex-col w-full my-5">
			<label for="title" class="text-gray-500 mb-2">Titre</label>
			<input
				type="text"
				id="title"
				placeholder="Titre de l'article"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5480] focus:shadow-lg"
				v-model="title"
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
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5480] focus:shadow-lg"
				>{{ description }}</textarea
			>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="seo_title" class="text-gray-500 mb-2">Titre SEO</label>
			<input
				type="text"
				id="seo_title"
				placeholder="Titre de l'article"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5480] focus:shadow-lg"
				v-model="seo_title"
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
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5480] focus:shadow-lg"
				>{{ description }}</textarea
			>
		</div>
		<div class="flex flex-col w-full my-5">
			<label for="seo_keywords" class="text-gray-500 mb-2"
				>Mots clefs SEO</label
			>
			<input
				type="text"
				id="seo_keywords"
				placeholder="Titre de l'article"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5480] focus:shadow-lg"
				v-model="seo_keywords"
			/>
		</div>
		<div class="flex flex-col my-5">
			<label for="active" class="text-gray-500 mb-2">Actif ?</label>
			<input
				type="checkbox"
				id="active"
				class="text-black bg-white appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5480] focus:shadow-lg"
				v-model="active"
			/>
		</div>
		<!-- body -->
		<WYSIWYGTipTap />
	</section>
	<Footer />
</template>

<script>
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 3,
	},
});

export default {
	data() {
		return {
			html: '',
			description: '',
			seo_description: '',
			active: false,
			title: '',
			seo_title: '',
			seo_keywords: '',
		};
	},
};
</script>
