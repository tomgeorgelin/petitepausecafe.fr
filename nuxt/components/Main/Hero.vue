<template>
	<section class="my-10" id="nouveautes" v-if="articles.length > 0">
		<div class="flex flex-col md:flex-row gap-5 w-[95%] md:w-[70%] mx-auto">
			<div class="relative rounded-lg overflow-hidden md:w-[70%]">
				<img
					src="https://s3.amazonaws.com/designco-web-assets/uploads/2017/06/designbetter_website_book_assets_illustrations_designleadershiphandbook_cover.png"
					alt=""
					class="object-cover md:h-full"
				/>
				<div
					class="absolute h-full py-8 px-10 top-0 inset-x-0 text-white bg-[#1B0042]/[85%]"
				>
					<p class="text-xs leading-6">
						PAR
						<NuxtLink
							:to="{
								path: '/articles/',
								query: {
									author: articles[state.currentArticle]
										.user_id.slug,
								},
							}"
							class="hover:underline"
							target="_blank"
						>
							{{
								articles[
									state.currentArticle
								].user_id.name.toUpperCase()
							}}
						</NuxtLink>
						DANS
						<NuxtLink
							:to="{
								path: '/articles/',
								query: {
									category:
										articles[state.currentArticle]
											.category_id.slug,
								},
							}"
							class="hover:underline"
							target="_blank"
						>
							{{
								articles[
									state.currentArticle
								].category_id.name.toUpperCase()
							}}
						</NuxtLink>
					</p>
					<NuxtLink
						:to="{
							path:
								'/articles/' +
								articles[state.currentArticle].slug,
						}"
						class="hover:underline text-2xl leading-10"
						target="_blank"
					>
						{{ articles[state.currentArticle].title }}
					</NuxtLink>
					<p class="text-xs leading-6">
						{{ articles[state.currentArticle].description }}
					</p>
				</div>
			</div>
			<div class="md:w-[30%] w-[95%]">
				<div class="flex justify-between items-baseline">
					<p class="text-lg font-semibold">Dernières sorties</p>
					<NuxtLink
						:to="{ path: '/articles' }"
						class="text-xs text-gray-500 hover:underline"
						>Tout voir</NuxtLink
					>
				</div>
				<hr class="w-full mt-4 mb-5 h-px border-0 bg-gray-200" />
				<div class="flex flex-col gap-7">
					<div
						class=""
						v-for="(article, index) in articles"
						:key="index"
					>
						<p class="text-xs text-gray-500">
							{{
								new Date(article.createdAt)
									.toLocaleDateString('fr-FR', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})
									.replace(/(^|\s)\S/g, (l) =>
										l.toLocaleUpperCase()
									)
									.toUpperCase()
							}}
						</p>
						<p
							class="transition-colors duration-1000"
							:class="{
								'text-[#FF5480]':
									state.currentArticle === index,
							}"
						>
							{{ article.title }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section v-else>Aucun articles pour le moment</section>
</template>

<script>
export default {
	props: {
		articles: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const state = reactive({ currentArticle: 0 });
		setInterval(() => {
			state.currentArticle =
				++state.currentArticle % props.articles.length;
		}, 5000);
		return {
			state,
		};
	},
};
</script>
