<template>
	<div class="flex items-center justify-center" ref="dropdown">
		<nav class="nav-menu">
			<div class="relative" v-on:click="toggleOptions()">
				<button
					class="text-gray-900 group p-4 inline-flex items-center rounded-md bg-white text-base font-medium"
					:class="{ 'bg-gray-100': open }"
				>
					<span>{{ title }}</span>
					<svg
						:class="{ 'rotate-[-180deg]': open }"
						class="text-gray-500 ml-2 h-5 w-5 transition-transform"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				<div
					class="absolute right-0 left-auto z-[1000] w-max max-w-[480px] opacity-0 pointer-events-none transition-all duration-200 ease-out bg-white rounded-md shadow-md"
					:class="{ open: open }"
				>
					<div class="overflow-hidden">
						<div class="grid gap-4 px-3 py-2">
							<div
								v-for="(item, index) in items"
								:key="index"
								@click="handleClick(item)"
								class="flex items-center transition-transform p-2 rounded-md hover:bg-gray-300 cursor-pointer"
							>
								<p class="font-medium">
									{{ item.title }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>
<script>
export default {
	props: {
		items: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			open: false,
		};
	},

	mounted() {
		document.addEventListener('click', this.onOutsideClick);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.onOutsideClick);
	},
	methods: {
		onOutsideClick: function (event) {
			if (!this.$refs.dropdown.contains(event.target)) {
				this.open = false;
			}
		},
		toggleOptions: function () {
			this.open = !this.open;
		},
		handleClick: function (item) {
			item.callback();
		},
	},
	setup() {},
};
</script>
<style>
.open {
	opacity: 1;
	pointer-events: auto;
}
</style>
