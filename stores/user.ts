// const database = serviceLayerConfig.database

// A file containing all the functions specifically for the logged in user //
/**
 * TODO: Add email capabilities.
 */
import { defineStore } from "pinia"
// const database = "firestore"
export const useUserStore = defineStore("user", {
	state: () => ({
		user: {} as User,
	}),

	getters: {
		get(state): User {
			return state.user
		},

		id(state): User["id"] {
			return state.user.id
		},

		firstName(state): User["firstName"] {
			return state.user.firstName
		},

		lastName(state): User["lastName"] {
			return state.user.lastName
		},

		email(state): User["email"] {
			return state.user.email
		},

		role(state): User["roles"] {
			return state.user.roles
		},
	},

	actions: {
		async init() {
			if (!import.meta.client) return

			const userCache = localStorage.getItem("$User")
			if (userCache) {
				this.user = JSON.parse(userCache)

				//TODO: Set up firestore db listener to user doc.
			}
		},

		/**Create a new user using email and password. */
		async register(email: string, password: string) {
			const database = useServicesConfig().database

			await $fetch(`/api/${database}/user`, {
				method: "POST",
				body: { email, password },
			})
		},

		/**Log in using email and password. */
		async login(email: string, password: string, remember: boolean = true) {
			const database = useServicesConfig().database

			if (this.user) {
				console.error("[$User] User already logged in.")
			}

			const { data, error } = await $fetch<ServerResponse>(`/api/${database}/user/login`, {
				method: "POST",
				body: { email, password },
			})

			if (error) return error

			if (data) {
				this.user = data
				//TODO: Set up firestore db listener to user doc when logged in.
			}

			if (remember) {
				const userString = JSON.stringify(data)
				localStorage.setItem("$User", userString)
			}
		},

		async addRole(role: string) {
			const database = useServicesConfig().database

			console.log(database)
			await $fetch(`/api/${database}/user/role`, {
				method: "PUT",
				body: {
					id: this.user.id,
					role,
					action: "add",
				},
			})
		},

		async removeRole(role: string) {
			const database = useServicesConfig().database
			await $fetch(`/api/${database}/user/role`, {
				method: "PUT",
				body: {
					id: this.user.id,
					role,
					action: "remove",
				},
			})
		},

		async logout() {
			this.user = {} as User
		},

		async changePassword() {},
		async changeEmail() {},
		async changeAvatar() {},

		/**Sends the user an email. */
		async sendEmail() {},
	},
})
