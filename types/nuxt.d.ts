// types/nuxt.d.ts

declare module "#app" {
	interface NuxtApp {
		$servicesConfig: ServiceLayerConfig
	}
}

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$servicesConfig: ServiceLayerConfig
	}
}
