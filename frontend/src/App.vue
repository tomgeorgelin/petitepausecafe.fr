<template>
	<header>
		<img
			alt="petitepausecafe.fr logo"
			src="./assets/logo.svg"
			width="125"
			height="125"
		/>

		<div class="text-3xl font-bold underline text-white">Hello world!</div>
	</header>

	<main></main>
</template>

<script>
export default {
	name: 'app',
	created() {
		document.title = 'petitepausecafe.fr';
	},
};
</script>
