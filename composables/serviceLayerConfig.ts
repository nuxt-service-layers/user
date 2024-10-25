export function useServicesConfig(): ServiceLayerConfig {
	const nuxtApp = useNuxtApp()
	const $servicesConfig = nuxtApp.$servicesConfig
	return $servicesConfig as ServiceLayerConfig
}
