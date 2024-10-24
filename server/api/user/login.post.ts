import { collection, getDocs, query, where } from "firebase/firestore"
import bcrypt from "bcryptjs"

export default eventHandler(async (event) => {
	const db = event.context.db
	const { email, password } = await readBody(event)

	let response: ServerResponse = { data: null, error: null }

	if (!email || !password) {
		throw createError({
			statusCode: 400,
			statusMessage: "Please supply user and password.",
		})
	}

	const userColRef = collection(db, "users")
	const q = query(userColRef, where("email", "==", email))

	try {
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			throw createError({ statusCode: 404, statusMessage: "Email not found." })
		}

		const doc = querySnapshot.docs[0]
		let user = { id: doc.id, ...doc.data() } as UserServerSide

		const passwordMatch = await bcrypt.compare(password, user.password)

		if (passwordMatch) {
			const { password, ...userWithoutPassword } = user
			response.data = userWithoutPassword as User
			return response
		} else {
			response.error = "Password Incorrect."
			return response
		}
	} catch (error) {
		throw createError({ statusCode: 500, statusMessage: `Error adding user to db: ${error}` })
	}
})
