// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@pinia/nuxt"],

	// Extend from the nuxt service layer. Provide your firebase config in the .env file //
	extends: [["../database-layer", { install: true }]],
})
