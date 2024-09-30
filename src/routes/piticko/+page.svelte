<script lang="ts">
    import { API_ROOT } from '$lib/api.js';

    import drinks from '../../drinks.json';



    type OrderItem = {
        name: string,
        quantity: number,
    }

    type Order = {
        order: OrderItem[],
        user: String,
    }
    
    const currencySymbol = drinks.currencySymbol;

    function placeOrder(items: OrderItem[]) {
        const url = `${API_ROOT}/bar/place_order`;
    }
</script>

{#each drinks.drinks as drink}
    {drink.name} - {drink.price} {currencySymbol}<br>
{/each}

<style>

</style>