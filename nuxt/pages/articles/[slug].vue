<template>
	<Header />
	<section
		id="article_header"
		class="flex flex-col md:flex-row gap-5 w-[95%] md:w-[70%] mx-auto px-3 py-5"
	>
		<div
			class="rounded-l-lg px-5 w-full h-full flex flex-col justify-around gap-4"
		>
			<div class="text-4xl leading-10">
				{{ article.title }}
			</div>
			<p class="text-md text-gray-700 leading-6">
				{{ article.description }}
			</p>
			<p class="text-xs text-gray-500 leading-6">
				PAR
				<NuxtLink
					:to="{
						path: '/articles/',

						query: {
							author: article.user_id.slug,
						},
					}"
					target="_blank"
					class="hover:underline decoration-tint"
				>
					{{ article.user_id.name }}</NuxtLink
				>
				DANS
				<NuxtLink
					:to="{
						path: '/articles/',
						query: {
							category: article.category_id.slug,
						},
					}"
					target="_blank"
					class="z-20 hover:underline decoration-tint"
				>
					{{ article.category_id.name }}</NuxtLink
				>
			</p>
		</div>
	</section>
	<div class="w-full bg-white">
		<div
			class="flex flex-col md:flex-col gap-5 w-[95%] md:w-[70%] mx-auto py-5"
		>
			<div id="fil_ariane" class="text-gray-400">
				<NuxtLink
					:to="{ path: '/articles' }"
					class="hover:underline text-sm"
					>Articles</NuxtLink
				>
				—
				<NuxtLink
					:to="{
						path: '/articles/',

						query: {
							category: article.category_id.slug,
						},
					}"
					class="hover:underline text-sm"
					>{{ article.category_id.name }}</NuxtLink
				>
				—
				<span class="text-sm text-gray-500">{{ article.title }}</span>
			</div>
			<div class="px-3 mx-auto">
				<img
					:src="article.image"
					alt=""
					class="mb-10 rounded-lg w-full"
				/>
				<div v-html="article.body"></div>
			</div>
			<CommonComments :comments="comments" :article_id="article._id" />
		</div>
	</div>
	<Footer />
</template>

<script setup>
const route = useRoute();
const { data, error } = await useFetch('/api/articles/' + route.params.slug, {
	headers: {
		// @ts-ignore
		'x-auth-token': useSession()?.data?.value?.user?.token || '',
	},
});
const { article, comments } = data.value;
</script>
