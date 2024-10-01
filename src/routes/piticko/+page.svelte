<script lang="ts">
	import { API_ROOT, getItems, type Drinks, type Order } from '$lib/api.js';
	import ItemCard from '$lib/ItemCard.svelte';

	import { onMount, afterUpdate } from 'svelte';

	//import drinks from '../../drinks.json';

	let drinks: Drinks = { drinks: [], currencySymbol: 'Kč', currency: 'CZK' };
	let currencySymbol = 'Kč';
    let quantities: number[] = []

    let submitButton: HTMLButtonElement;

	onMount(async () => {
		drinks = await getItems();
		currencySymbol = drinks.currencySymbol;
        quantities = Array(drinks.drinks.length).fill(0);
	});

    afterUpdate(() => {
        if (submitButton) {
            submitButton.disabled = !isValid();
        }
    });

	

    function isValid() {
        for (let i = 0; i < drinks.drinks.length; i++) {
            if (quantities[i] > 0) {
                return true;
            }
        }
        return false;
    }

	async function placeOrder() {
		const url = `${API_ROOT}/bar/create_order`;

        if (!isValid()) {
            alert("Objednávka nesmí být prázdná!");
            return;
        }

        const orderItems: OrderItem[] = [];
        for (let i = 0; i < drinks.drinks.length; i++) {
            if (quantities[i] > 0) {
                orderItems.push({name: drinks.drinks[i].name, quantity: quantities[i]});
            }
        }

        const order: Order = {
            order: orderItems,
            user: "idk"
        };

        const orderString = JSON.stringify(order);
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: orderString
        });
        const response = await request.json();
        if (!response.success) {
            alert("Objednávka se nezdařila!");
            return;
        }
        const secretid = response.secret_id;

        window.location.href = `/piticko/order/${secretid}`;
	}
</script>

{#if drinks.drinks.length === 0}
	<p>Loading...</p>
{:else}
	<div class="flex flex-col item-center justify-center content-center w-screen">
		<div class="w-screen self-center mt-6 justify-self-center">
			{#each drinks.drinks as drink}
				<ItemCard name={drink.name} price={drink.price} icon={drink.icon} currencySymbol={currencySymbol} bind:quantity={quantities[drinks.drinks.indexOf(drink)]} />
			{/each}
		</div>
	</div>
    <button class="btn btn-primary" bind:this={submitButton} on:click={placeOrder}>Objednat</button>
{/if}
