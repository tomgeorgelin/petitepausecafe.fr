<template>
	<section
		class="my-10 w-[95%] md:w-[70%] xl:w-[50%] mx-auto flex flex-col gap-5"
	>
		<NuxtLink
			v-for="(article, index) in articles"
			:to="{ path: '/articles/' + article.slug }"
			class="bg-white w-full rounded-md flex flex-row h-[250px]"
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
	</section>
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
