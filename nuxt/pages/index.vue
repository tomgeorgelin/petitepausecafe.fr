<template>
	<Header />
	<MainHero :articles="articles.slice(0, 4)" />
	<MainCategoriesCarousel :categories="categories" />
	<MainPopular />
	<MainRandom />
	<Footer />
</template>

<script setup>
const { data: articlesData, articles: error } = await useFetch(
	'/api/articles',
	{
		query: { latest: true },
	}
);
const { articles } = articlesData.value;
const { data: categoriesData, error: categoriesError } = await useFetch(
	'/api/categories'
);
const { categories } = categoriesData.value;
</script>
