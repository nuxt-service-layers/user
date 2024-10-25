export {}

declare global {
	interface ServiceLayerConfig {
		database: "firestore" | "postgres" | "mongo" | "sqlite"
	}
}
