<template>
	<header>
		<img
			alt="petitepausecafe.fr logo"
			class="logo"
			src="./assets/logo.svg"
			width="125"
			height="125"
		/>

		<div class="wrapper"></div>
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
