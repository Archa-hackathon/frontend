<script lang="ts">
	export let name = 'Loading...';
	export let price = 0;
    export let icon;
	export let currencySymbol = 'Kč';

	export let quantity = 0;
</script>

<div class="card lg:card-side bg-base-100 shadow-xl flex flex-row">
	<!-- <figure> -->
	<img
		class="size-32"
		src={icon}
		alt="Album"
	/>
	<!-- </figure> -->
	<div class="card-body">
		<h2 class="card-title">{name} - {price} {currencySymbol}</h2>

		<div class="join text-2xl">
			<button class="btn join-item">{quantity}</button>
		</div>
	</div>
</div>
