<template>
	<Header />
	<section v-if="articles.length > 0">
		<section class="my-10 w-[95%] md:w-[70%] xl:w-[50%] mx-auto">
			<div v-if="articles.length > 0" class="bg-white rounded-md">
				<div
					v-if="category"
					class="flex flex-col sm:flex-row sm:gap-5 sm:h-[150px] w-full"
				>
					<div class="h-[150px] sm:h-full mx-auto flex items-center">
						<img
							:src="articles[0].category_id.image"
							alt=""
							class="h-3/4 sm:h-2/3 overflow-hidden object-cover object-bottom rounded-md"
						/>
					</div>
					<div
						class="my-auto flex flex-col gap-3 p-5 text-center sm:text-left"
					>
						<div>
							{{ articles[0].category_id.name }}
						</div>
						<div class="text-sm text-gray-500">
							Sur cette page vous retrouverez tous les articles en
							lien avec cette catégorie.
						</div>
					</div>
				</div>
				<div
					v-if="author"
					class="flex flex-col sm:flex-row sm:gap-5 w-full"
				>
					<div
						class="h-[150px] mx-auto flex justify-center items-center w-full"
					>
						<img
							:src="articles[0].user_id.image"
							alt=""
							class="h-3/4 sm:h-2/3 overflow-hidden object-cover object-bottom rounded-md"
						/>
					</div>
					<div
						class="my-auto flex flex-col gap-3 p-5 text-center sm:text-left"
					>
						<div>
							{{ articles[0].user_id.name }}
						</div>
						<div class="text-sm text-gray-500">
							{{ articles[0].user_id.description }}
						</div>
					</div>
				</div>
			</div>
			<div v-else>Aucun article n'a été trouvé</div>
		</section>
		<section class="bg-white">
			<div
				class="mt-10 w-[95%] md:w-[70%] xl:w-[50%] py-5 mx-auto flex flex-col gap-5"
			>
				<CommonArticles :articles="articles" />
			</div>
		</section>
	</section>
	<section v-else>Aucun article pour le moment</section>

	<Footer />
	<div></div>
</template>

<script setup>
const route = useRoute();
const category = route.query.category;
const author = route.query.author;
const { data, error } = await useFetch('/api/articles', {
	query: { category, author },
});
const { articles } = data.value;
</script>
