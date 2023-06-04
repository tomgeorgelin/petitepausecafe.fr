<template>
	<button
		class="bg-white rounded-lg px-4 py-3 shadow-sm"
		@click="handleGoBack()"
	>
		&#x3008; Retour
	</button>
</template>

<script setup lang="ts">
const route = useRouter();

const handleGoBack = () => {
	route.back();
};
</script>
