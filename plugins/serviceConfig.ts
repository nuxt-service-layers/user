import servicesConfig from "../services.config"

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("servicesConfig", servicesConfig)
})
