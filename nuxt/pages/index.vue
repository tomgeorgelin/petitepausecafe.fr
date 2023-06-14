<template>
	<Header />
	<MainHero :articles="articles.slice(0, 4)" />
	<MainCategoriesCarousel :categories="categories" />
	<MainPopular :popularArticles="popularArticles" />
	<MainRandom :article="article" />
	<Footer />
</template>

<script setup>
// get latest articles
const { data: articlesData, error: articlesError } = await useFetch(
	'/api/articles',
	{
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		query: { latest: true },
	}
);
let { articles } = articlesData.value;
// get categories
const { data: categoriesData, error: categoriesError } = await useFetch(
	'/api/categories',
	{
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
	}
);
const { categories } = categoriesData.value;
// get a random article
const { data: articleData, error: articleError } = await useFetch(
	'/api/articles',
	{
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		query: { random: true },
	}
);
const article = articleData.value.articles;
// get popular articles
const { data: popularArticlesData, error: popularArticlesError } =
	await useFetch('/api/articles', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		query: { popular: true },
	});
const popularArticles = popularArticlesData.value.articles;
useSeoMeta({
	title: 'petitepausecafe.fr',
	description:
		"Ici vous pouvez retrouvez plein d'articles sur plein de sujets différents !",
	keywords: "articles, informatique, le temps d'une pause café",
});
</script>
