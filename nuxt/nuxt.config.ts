// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				class: 'scroll-smooth ',
			},
			bodyAttrs: {
				style: 'background-color: #F9F9FB;',
			},
			charset: 'utf-16',
			viewport: 'width=500, initial-scale=1',
			title: 'petitepausecafe.fr',
			meta: [
				{
					name: 'description',
					content: 'Des articles concis et clairs !',
				},
			],
			link: [
				{
					rel: 'icon',
					href: '',
				},
			],
		},
	},
	modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
	nitro: {
		plugins: ['~/server/index.ts'],
	},
	auth: {
		// enableGlobalAppMiddleware: true,
	},

	runtimeConfig: {
		mongodbUri: process.env.MONGODB_URI,
	},
});
