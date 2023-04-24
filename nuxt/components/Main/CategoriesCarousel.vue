<template>
	<section
		class="my-10 w-[95%] md:w-[70%] mx-auto flex flex-col gap-5"
		id="catégories"
	>
		<div class="flex flex-row justify-between items-baseline">
			<div class="text-xl font-semibold">Catégories</div>
			<NuxtLink
				:to="{ path: '/categories' }"
				class="text-xs text-gray-500 hover:underline"
				>Tout voir</NuxtLink
			>
		</div>
		<div class="flex flex-row gap-2">
			<div
				class="overflow-x-auto scroll-smooth snap-x snap-mandatory w-full flex flex-row gap-2"
				id="scroller"
			>
				<NuxtLink
					:to="{
						path: '/categories/' + category.slug,
					}"
					class="w-[200px] h-[300px] flex flex-col gap-3 flex-shrink-0 snap-center"
					target="_blank"
					v-for="(category, index) in categories"
				>
					<img
						class="h-[250px] overflow-hidden object-cover object-center rounded-lg"
						src="https://cdn.dribbble.com/users/63407/screenshots/5720287/dribbble_balloon_man_4x.png"
						alt=""
					/>
					<div class="text-center font-semibold">
						{{ category.name }}
					</div>
				</NuxtLink>
			</div>
			<div
				class="shadow-md p-3 h-[250px] flex flex-col justify-center cursor-pointer transition-all duration-1000"
				@click="handlescroll"
			>
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					id="scrollImg"
				>
					<rect width="32" height="32" fill="url(#pattern0)" />
					<defs>
						<pattern
							id="pattern0"
							patternContentUnits="objectBoundingBox"
							width="1"
							height="1"
						>
							<use
								xlink:href="#image0_0_2335"
								transform="scale(0.03125)"
							/>
						</pattern>
						<image
							id="image0_0_2335"
							width="32"
							height="32"
							xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAA0mlDQ1BJQ0MgUHJvZmlsZQAAGJVjYGCsSCwoyGESYGDIzSspcg9yjIyIjFJgv8rAzsDIAAaJycUFjgEBPgw4wbdrELWXdUFm4VaHFbCkpBYnA+ktQFyaXFBUwsDAqANkq5eXFIDYIUC2SHZIkDOQnQFk80HVg4C0c2JOZlJRYklqioJ7UWKlgnN+Tn5RcUFiciqJriAClKRWlIBo5/yCyqLM9IwSBUegb1OBduYWlJakFukoeOYl6zEwgMIPouNzIDhcGMXOJJcWlUGNYWQyZmAAABFdNMUdedORAAAAfElEQVRIDc2VMQ6AIBAEF5/ghyhsVPA9/sXCd2qlhR0kFMwW0hGyk+Vg7yT7GjUpEOqhR6eGfkTURRHzLxALd2FArNyFAZF000c1IDJ3YUBs3MWH2MuQgdSVqPYeXgEWEcrhR4JyGCYohw0FymFfhnI8WPBow8O1ncrq9AUer0zvbSvSzgAAAABJRU5ErkJggg=="
						/>
					</defs>
				</svg>
			</div>
		</div>
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
	mounted() {
		document.getElementById('scroller').addEventListener('scroll', () => {
			if (
				document.getElementById('scroller').scrollLeft <
				document.getElementById('scroller').scrollWidth -
					document.getElementById('scroller').clientWidth
			) {
				if (
					document.getElementById('scroller').scrollLeft + 200 >=
					document.getElementById('scroller').scrollWidth -
						document.getElementById('scroller').clientWidth
				)
					document.getElementById('scrollImg').style.transform =
						'rotate(0deg)';
			} else {
				document.getElementById('scrollImg').style.transform =
					'rotate(180deg)';
			}
		});
	},
	methods: {
		handlescroll() {
			if (
				document.getElementById('scroller').scrollLeft <
				document.getElementById('scroller').scrollWidth -
					document.getElementById('scroller').clientWidth
			) {
				document.getElementById('scroller').scrollLeft += 200;
			} else {
				document.getElementById('scroller').scrollLeft = 0;
			}
		},
	},
};
</script>
