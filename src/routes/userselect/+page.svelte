<script lang="ts">
	import { usernames, getUser, storeUser, type User } from '$lib/localstorage.js';
	import { onMount } from 'svelte';

	let currentUsername: User = '';

	onMount(() => {
		currentUsername = getUser();
	});

	function updateUser(event: any) {
		const username = event.target.value;
		storeUser(username);
		window.location.reload();
	}
</script>

<h1>Aktuálně jsi {currentUsername}</h1>

<select class="select select-bordered w-full max-w-xs" on:change={updateUser}>
	<option disabled selected>Vyber nového usera</option>
	{#each usernames as username}
		<option>{username}</option>
	{/each}
</select>
