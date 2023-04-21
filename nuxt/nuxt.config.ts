// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				class: 'scroll-smooth',
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
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png',
				},
				{ rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
				{ rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
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
