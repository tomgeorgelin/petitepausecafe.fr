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
					href: 'data:image/svg+xml,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve"> <style type="text/css"> .st0{display:none;} .st1{fill:none;stroke:#000000;stroke-miterlimit:10;} .st2{fill:none;stroke:#000000;stroke-linecap:round;stroke-miterlimit:10;} </style> <g id="Calque_1" class="st0"> <image style="display:inline;overflow:visible;" width="1024" height="1024" xlink:href="MidPastaelom_one_line_art_coffee_cup_white_background_isolated__2e93e736-a60d-4794-80c0-6629ef56e025.png"  transform="matrix(0.8507 0 0 0.8507 64.4368 64.4368)"> </image> </g> <g id="Calque_2"> <path class="st1" d="M756.52,348.95c-47.28,39.74-331.97,29.32-331.97,29.32c-277.12,6.63-281.37-29.32-281.37-29.32 c14.65-27.42,311.63-25.53,311.63-25.53C688.42,322.47,756.52,348.95,756.52,348.95z"/> </g> <g id="Calque_3"> <path class="st1" d="M714.64,641.09c-0.02,0.02-0.02,0.02-0.02,0.02c-4.25,12.01-8.94,23.52-14.11,34.34 c-8.15,17.07-17.48,32.4-28.16,45.21c0,0-5.63,16.9-31.48,34.14c-19.08,12.73-49.2,25.64-96.2,32.07c0,0-188.53,29.1-278.49-29.43 h-0.02c-17.59-11.45-31.41-26.27-39.3-45.3c0,0-97.42-182.53-83.69-363.19c0,0,4.25,35.95,281.37,29.32 c0,0,284.69,10.42,331.97-29.32C756.52,348.95,757.72,519.62,714.64,641.09z"/> </g> <g id="Calque_4"> <path class="st1" d="M714.62,641.11c0,0,148.78-44.35,166.75-143.66c0,0,6.52-47.79-41.28-66.08c-11.51-4.4-23.91-5.92-36.21-4.99 c-17.38,1.32-47.52,4.23-50.98,8.8"/> </g> <g id="Calque_5"> <path class="st1" d="M755.31,396.23c0,0,118.35-28.37,148.3,49.97c0.88,2.31,1.84,4.6,2.88,6.84 c6.17,13.24,26.55,70.65-42.14,141.83c0,0-84.68,76.72-147.56,83.95c-1.86,0.21-3.72,0.17-5.57-0.1c-2.77-0.4-6.85-1.28-10.72-3.27 "/> </g> <g id="Calque_6"> <path class="st1" d="M640.86,754.79c0,0,108.1,2.75,144.98,16.94c0,0,65.26,15.13,0,33.1c0,0-124.85,24.59-287.53,23.65 c0,0-245.57,1.6-299.75-9.91c-8.91-1.89-17.97-2.94-27.08-3.36c-20.21-0.94-54.42-5.29-83.87-22.53c-1.29-0.76-2.01-2.27-1.67-3.73 c1.76-7.36,18.61-27.2,148.49-29.51l31.74-2"/> </g> <g id="Calque_7"> <path class="st1" d="M454.78,295.54c0,0,22.23-22.83,2.76-46.82s4.17-77.27,4.17-77.27"/> </g> <g id="Calque_8"> <path class="st2" d="M212.37,360.54c116.77-9.09,120.01-5.71,213.99-2.52c92.6,3.14,232.87,13.92,256.35,2.52"/> </g> </svg>',
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
