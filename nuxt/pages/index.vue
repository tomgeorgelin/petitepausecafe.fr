<template>
	<h2 class="underline">Home</h2>
	<div v-if="data">{{ data.api }}</div>
	<div v-else>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit.
			Accusantium eaque voluptate veritatis dignissimos velit pariatur?
			Impedit dolorem optio rerum quo ad maiores, eaque cupiditate nisi
			amet reprehenderit, quaerat eius numquam!
		</p>
	</div>
</template>

<script setup>
const { data, pending, error, refresh } = await useFetch('/api/hello');
</script>

<style lang="scss" scoped></style>
