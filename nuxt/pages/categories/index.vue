<template>
	<Header />
	<CommonCategories :categories="categories" />
	<Footer />
	<div></div>
</template>

<script setup>
const { data, error } = await useFetch('/api/categories');
const { categories } = data.value;
categories.forEach((cat) => categories.push(cat));
</script>
