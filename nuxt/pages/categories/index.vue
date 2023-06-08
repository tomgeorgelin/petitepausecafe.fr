<template>
	<Header />
	<CommonCategories :categories="categories" />
	<Footer />
	<div></div>
</template>

<script setup>
const { data, error } = await useFetch('/api/categories', {
	headers: {
		// @ts-ignore
		'x-auth-token': useSession()?.data?.value?.user?.token || '',
	},
});
const { categories } = data.value;
categories.forEach((cat) => categories.push(cat));
</script>
