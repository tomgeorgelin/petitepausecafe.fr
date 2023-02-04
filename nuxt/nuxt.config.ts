// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-16',
			viewport: 'width=500, initial-scale=1',
			title: 'petitepausecafe.fr',
			meta: [
				{
					name: 'description',
					content: 'Des articles concis et clairs !',
				},
			],
		},
	},
	modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
	nitro: {
		plugins: ['~/server/index.ts'],
	},

	runtimeConfig: {
		mongodbUri: process.env.MONGODB_URI,
	},
});
