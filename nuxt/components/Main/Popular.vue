<template>
	<section class="my-10 w-[95%] md:w-[70%] mx-auto flex flex-col gap-5">
		<div class="flex flex-row justify-between items-baseline">
			<div class="text-xl font-semibold" id="populaires">Populaires</div>
			<a href="#todo" class="text-xs text-gray-500 hover:underline"
				>Tout voir</a
			>
		</div>
		<div class="flex flex-col md:flex-row gap-2 md:h-[400px]">
			<div class="md:w-1/2 h-[400px]">
				<img
					class="overflow-hidden object-cover object-center rounded-lg h-full shadow-lg"
					src="https://s3.amazonaws.com/designco-web-assets/uploads/2017/06/designbetter_website_book_assets_illustrations_designleadershiphandbook_cover.png"
					alt=""
				/>
			</div>
			<div class="flex flex-wrap md:w-1/2 h-[400px]">
				<div
					class="w-1/2 p-2"
					v-for="(article, index) in popularArticles"
					:key="index"
				>
					<div
						class="bg-white shadow-lg rounded-lg w-full h-full flex flex-col justify-around px-5"
					>
						<a
							href=""
							class="text-sm hover:underline decoration-[#FF5480] text-gray-500"
							>{{ article.category_id.name.toUpperCase() }}</a
						>
						<div>{{ article.title }}</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		popularArticles: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		console.log(props.popularArticles);
	},
};
</script>
