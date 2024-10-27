import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import bcrypt from "bcryptjs"

export default eventHandler(async (event) => {
	console.log("herer")
	const db = event.context.db
	const { email, password } = await readBody(event)
	let response: ServerResponse = { data: null, error: null }

	console.log(email, password)

	if (!email || !password) {
		throw createError({
			statusCode: 400,
			statusMessage: "user is undefined. Please send `user`.",
		})
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const userColRef = collection(db, "users")
	const q = query(userColRef, where("email", "==", email))

	const querySnapshot = await getDocs(q)

	if (!querySnapshot.empty) {
		response.error = "Email already in use"
		return response
	}

	try {
		await addDoc(userColRef, { email, hashedPassword })
	} catch (error) {
		throw createError({ statusCode: 500, statusMessage: `Error adding user to db: ${error}` })
	}
})
