<template>
	<div v-if="articles.value != null">{{ articles }}</div>
</template>
<script>
const { data: articles } = await useFetch('localhost:3000/api');
export default {};
</script>
