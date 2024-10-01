<script lang="ts">
    //Props
    export let for_sale: boolean;
    export let id: string = "default";
    export let name: string;
    export let desc: string;
    export let owner: string;
    export let price: number;
    export let watchers: string[];
    export let img: string;
    console.log(id);
    
  
  
  
  
    import { onDestroy } from 'svelte';
  
  
    async function buy() {
      // const userPrice = prompt("Please enter your selling price:", "");
      // if (userPrice !== null && userPrice.trim() !== "") {
        // price = parseFloat(userPrice);
        // Assuming you have a backend endpoint '/api/sell'
        console.log(id);
        const response = await fetch('https://hack-back.stuckinvim.com/market/buy_card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            user: 'a',
            id: id
  
  
           })
        });
  
        if (response.ok) {
          console.log('Price posted successfully');
          // Destroy the component after successful post
          onDestroy(() => {
            console.log('Component is being destroyed');
          });
        } else {
          console.log('Failed to post price');
        }
      // } 
    }
  </script>
  
  <div class="card bg-black border-white rounded w-96 shadow-xl border-2 my-4">
      <figure>
        <img
                  src="{img}"
          alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{name}</h2>
        <p>{desc}</p>
        <div class="card-actions justify-end">
          <button on:click={buy} class="btn btn-primary">Buy</button>
        </div>
        <b>
  
          <p class="text-right">{price} A$</p>
        </b>
      </div>
    </div>
  