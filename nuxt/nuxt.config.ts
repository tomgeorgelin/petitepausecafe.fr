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
			],
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@sidebase/nuxt-auth',
		'@tailvue/nuxt',
		'@vite-pwa/nuxt',
	],

	nitro: {
		plugins: ['~/server/index.ts'],

		esbuild: {
			options: {
				target: 'esnext',
			},
		},
	},
	runtimeConfig: {
		mongodbUri: process.env.MONGODB_URI,
		JWT_KEY: process.env.JWT_KEY,
	},
	pwa: {
		registerType: 'autoUpdate',
		registerWebManifestInRouteRules: true,
		manifest: {
			name: 'petitepausecafe.fr',
			start_url: '/',
			short_name: 'petitepausecafe.fr',
			theme_color: '#FF5480',
			description: 'Vous retrouverez ici tous les articles du site !',
			icons: [
				{
					src: 'icons/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: 'icons/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'icons/favicon-16x16.png',
					sizes: '16x16',
					type: 'image/png',
				},
				{
					src: 'icons/favicon-32x32.png',
					sizes: '32x32',
					type: 'image/png',
				},
			],
		},
		devOptions: {
			enabled: true,
			type: 'module',
		},
		workbox: {
			navigateFallback: '/',
		},
	},
	vite: {
		build: {
			target: 'esnext',
		},
		esbuild: {
			supported: {
				'top-level-await': true, //browsers can handle top-level-await features
			},
		},
	},
	telemetry: false,

	auth: { origin: process.env.ORIGIN },
});
