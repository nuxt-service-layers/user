// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@pinia/nuxt"],

	extends: [
		// DB interface layer
		["../database", { install: true }],

		// Globals layer
		["../base", { install: true }],
		["../emails", { install: true }],
	],
})
