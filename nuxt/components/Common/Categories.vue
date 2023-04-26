<template>
	<section
		class="my-10 mx-auto w-[95%] md:w-[70%] xl:w-[50%] flex flex-row flex-wrap gap-5"
	>
		<NuxtLink
			v-for="(category, index) in categories"
			:href="{
				path: '/articles',
				query: { category: category.slug },
			}"
			class="bg-white rounded-md flex flex-col w-[200px] mx-auto"
		>
			<div class="basis-2/3 w-full">
				<img
					class="h-full w-full overflow-hidden object-cover object-bottom rounded-tr-md rounded-br-md"
					:src="category.image"
					alt=""
				/>
			</div>
			<div class="flex flex-col gap-3 basis-1/3 px-8 py-5">
				<div class="font-semibold text-xl">
					{{ index > 9 ? index + 1 : '0' + (index + 1) }}
				</div>
				<div class="font-semibold text-xl">
					{{ category.name }}
				</div>
			</div>
		</NuxtLink>
	</section>
</template>

<script>
export default {
	props: {
		categories: {
			type: Array,
			required: true,
		},
	},
};
</script>
