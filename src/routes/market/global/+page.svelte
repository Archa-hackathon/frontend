<script>
	// @ts-nocheck

	// import MeSelling from "./../MeSelling.svelte";
	// import MySellable from "./../MySellable.svelte";
	import OtherSelling from './OtherSelling.svelte';
	import { onMount } from 'svelte';
	let cards = [];
	import { getUser } from '$lib/localstorage.ts';

	onMount(async () => {
		try {
			const response = await fetch('https://hack-back.stuckinvim.com/market/list_offers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user: getUser()
				})
			});

			if (response.ok) {
				let json = await response.json();
				cards = json.offers;

				// Handle error response
			}
		} catch (error) {
			// Handle network error
		}
	});
</script>

<h1 class="text-3xl text-center py-6">Karty na prodej</h1>
<div class="w-screen flex flex-col items-center">
	{#each cards as card, index}
		<OtherSelling {...card} />
	{/each}
</div>
