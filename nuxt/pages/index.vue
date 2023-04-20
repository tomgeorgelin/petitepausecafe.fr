<template>
	<Header />
	<MainHero />
	<MainCategoriesCarousel />
	<MainPopular />
	<MainRandom />
	<Footer />
	<div v-if="data === 2">
		<p>{{ data.api }}</p>
	</div>
	<div v-else></div>
</template>

<script setup>
// definePageMeta({ middleware: 'auth' });
const { data, pending, error, refresh } = await useFetch('/api/hello');
</script>
