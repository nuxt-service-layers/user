export function useServicesConfig(): ServiceConfig {
	const nuxtApp = useNuxtApp()
	const $servicesConfig = nuxtApp.$servicesConfig
	console.log($servicesConfig)
	return $servicesConfig as ServiceConfig
}
