<script lang="ts">
  //Props
  let for_sale: boolean;
  let id: string;
  let name: string;
  let desc: string;
  let owner: string;
  let price: number;
  let watchers: string[];




  import { onDestroy } from 'svelte';


  async function sell() {
    const userPrice = prompt("Please enter your selling price:", "");
    if (userPrice !== null && userPrice.trim() !== "") {
      price = parseFloat(userPrice);
      // Assuming you have a backend endpoint '/api/sell'
      const response = await fetch('/api/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          price: price,
          user: 'a',
          id: 'item-id'


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
    } else {
      console.log('No price entered');
    }
  }
</script>

<div class="card bg-black border-white rounded w-96 shadow-xl border-2">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">card.name</h2>
      <p>card.desc</p>
      <div class="card-actions justify-end">
        <button on:click={sell} class="btn btn-primary">Sell</button>
      </div>
    </div>
  </div>
