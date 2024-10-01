<script>
	// @ts-nocheck

	import MeSelling from './MeSelling.svelte';
	import MySellable from './MySellable.svelte';
	import { onMount } from 'svelte';
	let cards = [];

	import { getUser } from '$lib/localstorage.ts';

	onMount(async () => {
		try {
			const response = await fetch('https://hack-back.stuckinvim.com/market/my_collection', {
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
				cards = json.cards;

				// Handle error response
			}
		} catch (error) {
			// Handle network error
		}
	});
</script>

<nav class="z-[8] fixed top-0 left-0 w-full bg-stone-800 py-4 px-6">
    <div class="flex items-center justify-between">
        <ul class="flex space-x-4 flex-row justify-between w-full">
            <li class="text-primary">Moje Karty</li>
            <a href="/market/global" class="text-white">Market</a>
        </ul>
    </div>
</nav>


<div class="w-screen flex flex-col items-center mt-16">
	{#each cards as card, index}
		{#if card.for_sale}
			<MeSelling {...card} />
		{/if}
	{/each}

	{#each cards as card, index}
		{#if !card.for_sale}
			<MySellable {...card} />
		{/if}
	{/each}
</div>
