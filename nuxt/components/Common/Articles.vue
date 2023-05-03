<template>
	<NuxtLink
		v-for="(article, index) in articles"
		:key="index"
		:to="{ path: '/articles/' + article.slug }"
		class="bg-[#F9F9FB] w-full rounded-md flex flex-row h-[250px] shadow-sm"
	>
		<div class="flex flex-col gap-3 basis-1/2 px-8 py-5">
			<div class="font-semibold text-xl">
				{{ index > 9 ? index + 1 : '0' + (index + 1) }}
			</div>
			<div class="font-semibold text-xl">
				{{ article.title }}
			</div>
			<div class="text-gray-500 text-sm">
				{{ article.description }}
			</div>
		</div>
		<div class="basis-1/2 w-full">
			<img
				class="h-full w-full overflow-hidden object-cover object-bottom rounded-tr-md rounded-br-md"
				:src="article.image"
				alt=""
			/>
		</div>
	</NuxtLink>
</template>

<script>
export default {
	props: {
		articles: {
			type: Array,
			required: true,
		},
	},
};
</script>
