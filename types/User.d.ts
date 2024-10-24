export {}

declare global {
	interface User {
		id: string
		firstName: string
		lastName: string
		email: string
		roles: string[]
	}

	interface UserServerSide {
		id: string
		password: string
		firstName: string
		lastName: string
		email: string
		role: string
	}
}
