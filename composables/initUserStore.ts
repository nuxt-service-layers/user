import { useUserStore } from "~/stores/user"
export type UserStore = ReturnType<typeof useUserStore>

/**The global user object. */
let $User: UserStore

export async function initUser() {
	$User = useUserStore()
	$User.init()
}

export { $User }
