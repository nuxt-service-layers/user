import { arrayRemove, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
	const db = event.context.db

	const { id, role, action } = await readBody(event)

	const userColRef = collection(db, "users")
	const userDocRef = doc(userColRef, id)

	try {
		if (action === "add") {
			await updateDoc(userDocRef, { roles: arrayUnion(role) })
		} else if (action === "remove") {
			await updateDoc(userDocRef, { roles: arrayRemove(role) })
		}
	} catch (error) {
		throw createError({ statusCode: 500, statusMessage: `Error updating user role: ${error}` })
	}
})
