<script lang="ts">
	//Props
	// export let for_sale: boolean;
	export let id: string = 'default';
	export let name: string;
	export let owner: string;
	export let price: number;
	// export let watchers: string[];
	export let img: string;
	export let desc: string;
	console.log(id);

	import { getUser } from '$lib/localstorage.js';

	import { onDestroy } from 'svelte';

	async function sell() {
		const userPrice = prompt('Please enter your selling price:', '');
		if (userPrice !== null && userPrice.trim() !== '') {
			price = parseFloat(userPrice);
			// Assuming you have a backend endpoint '/api/sell'
			console.log(id);
			const response = await fetch('https://hack-back.stuckinvim.com/market/set_offer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					price: price,
					user: getUser(),
					id: id
				})
			});

			if (response.ok) {
				console.log('Price posted successfully');
				location.reload();
				onDestroy(() => {
					console.log('Component is being destroyed');
				});
			} else {
				console.log('Failed to post price');
			}
		} else {
			console.log('No price entered');
		}
	}
</script>

<div
	class="card bg-black border-white rounded-xl w-[90%] shadow-xl border-2 my-4 aspect-card flex flex-col items-center"
>
	<img class="rounded-3xl mx-2 mb-0 mt-3 w-[90%]" src={img} alt="Shoes" />

	<!-- Bottom div -->
	<div class="w-full flex flex-col px-6">
		<p class="w-full mt-2">@{owner}</p>
		<div class="w-full flex flex-row mt-4">
			<!-- Left half -->
			<div class="flex flex-col w-1/2">
				<h2 class="card-title">{name}</h2>
				<p>{desc}</p>
			</div>
			<!-- Right half -->
			<div class="flex flex-col w-1/2">
				<p></p>
				<button on:click={sell} class="btn btn-primary">Sell</button>
			</div>
		</div>
	</div>
</div>
