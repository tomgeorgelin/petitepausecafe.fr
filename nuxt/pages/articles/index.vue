<template>
	<Header />
	<CommonArticles :articles="articles" />
	<Footer />
	<div></div>
</template>

<script setup>
const { data, error } = await useFetch('/api/articles');
const { articles } = data.value;
</script>
