<template>
	<Header />
	<MainHero :articles="articles.slice(0, 4)" />
	<MainCategoriesCarousel :categories="categories" />
	<MainPopular :popularArticles="popularArticles" />
	<MainRandom :article="article" />
	<Footer />
</template>

<script setup>
const { data: articlesData, error: articlesError } = await useFetch(
	'/api/articles',
	{
		query: { latest: true },
	}
);
let { articles } = articlesData.value;
const { data: categoriesData, error: categoriesError } = await useFetch(
	'/api/categories'
);
const { categories } = categoriesData.value;
const { data: articleData, error: articleError } = await useFetch(
	'/api/articles',
	{
		query: { random: true },
	}
);
const article = articleData.value.articles;

const { data: popularArticlesData, error: popularArticlesError } =
	await useFetch('/api/articles', {
		query: { popular: true },
	});
const popularArticles = popularArticlesData.value.articles;
</script>
