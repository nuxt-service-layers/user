<template>
	<button @click="$User.login('codypwakeford@gmail.com', 'hello123')">Login</button>
	<button @click="$User.logout">Logout</button>
	<input
		type="text"
		v-model="roleInput"
	/>
	<button @click="$User.addRole(roleInput)">Add Role</button>
	<pre>{{ user }}</pre>
</template>

<script setup lang="ts">
const roleInput = ref("")

const user = computed(() => {
	return $User.get
})
</script>
