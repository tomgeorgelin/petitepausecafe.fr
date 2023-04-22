<template>
	<Header />
	<MainHero :articles="articles.slice(0, 4)" />
	<MainCategoriesCarousel />
	<MainPopular />
	<MainRandom />
	<Footer />
</template>

<script setup>
const { data, error } = await useFetch('/api/articles', {
	query: { latest: true },
});
const { articles } = data.value;
</script>
