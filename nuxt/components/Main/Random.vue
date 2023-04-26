<template>
	<section class="my-10 w-[95%] md:w-[70%] mx-auto flex flex-col gap-5">
		<div class="flex flex-row justify-between items-baseline">
			<div class="text-xl font-semibold" id="random">
				Article au hasard
			</div>
			<NuxtLink
				:to="{ path: '/articles' }"
				class="text-xs text-gray-500 hover:underline"
				>Tout voir</NuxtLink
			>
		</div>
		<div
			class="flex flex-col gap-0 md:flex-row md:h-[300px] shadow-lg rounded-lg"
		>
			<div class="md:w-1/2 h-[300px]">
				<div class="h-full ‹">
					<div
						class="rounded-l-lg px-5 w-full h-full flex flex-col justify-around bg-white"
					>
						<p class="text-xs text-gray-600 leading-6">
							PAR
							<NuxtLink
								:to="{
									path: '/articles/',

									query: {
										author: article.user_id.slug,
									},
								}"
								target="_blank"
								class="hover:underline decoration-[#FF5480]"
							>
								{{ article.user_id.name }}</NuxtLink
							>
							DANS
							<NuxtLink
								:to="{
									path:
										'/categories/' +
										article.category_id.slug,
								}"
								target="_blank"
								class="z-20 hover:underline decoration-[#FF5480]"
							>
								{{ article.category_id.name }}</NuxtLink
							>
						</p>
						<NuxtLink
							:to="{ path: '/articles/' + article.slug }"
							class="text-2xl leading-10 hover:underline duration-1000"
						>
							{{ article.title }}
						</NuxtLink>
						<p class="text-xs text-gray-500 leading-6">
							{{ article.description }}
						</p>
					</div>
				</div>
			</div>
			<div class="md:w-1/2 h-[300px]">
				<img
					class="overflow-hidden object-cover object-center w-full h-full rounded-r-lg"
					src="https://s3.amazonaws.com/designco-web-assets/uploads/2017/06/designbetter_website_book_assets_illustrations_designleadershiphandbook_cover.png"
					alt=""
				/>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
};
</script>
