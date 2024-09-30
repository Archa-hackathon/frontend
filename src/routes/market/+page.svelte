<script>
// @ts-nocheck

    import MeSelling from "./MeSelling.svelte";
    import MySellable from "./MySellable.svelte";
    import { onMount } from 'svelte';
    let cards = [];

    onMount(async () => {
        try {
            const response = await fetch('https://hack-back.stuckinvim.com/market/my_collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    
                    
                    "user": "a"
                    
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


<h1>Selling</h1>
{#each cards as card, index}
    {#if card.for_sale}
    <MeSelling ...card />
    {/if}
    

{/each}



<h1>Not for sale</h1>


{#each cards as card, index}
    {#if !card.for_sale}
    <MySellable ...card />
    {/if}
    

{/each}

