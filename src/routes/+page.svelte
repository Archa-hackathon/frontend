<script lang="ts">
	function clickHandler(event: any) {
		const url = event.target.closest('button').querySelector('a').href;
		window.location.href = url;
	}
</script>

<div class="flex flex-col gap-5 justify-center content-center h-[100svh]">
	<button class="btn btn-primary text-white h-16 text-lg mx-5" on:click={clickHandler}>
		<a href="/piticko">Pitíčko</a>
	</button>

	<button class="btn btn-primary text-white h-16 text-lg mx-5" on:click={clickHandler}>
		<a href="/piticko/staffpanel">Pitíčko staff</a>
	</button>

	<button class="btn btn-primary text-white h-16 text-lg mx-5" on:click={clickHandler}>
		<a href="/market">Moje Karty</a>
	</button>

	<button class="btn btn-primary text-white h-16 text-lg mx-5" on:click={clickHandler}>
		<a href="/market/global">Market</a>
	</button>

	<button class="btn btn-primary text-white h-16 text-lg mx-5" on:click={clickHandler}>
		<a href="/otazky">Otazky</a>
	</button>

	<button class="btn btn-primary text-white h-16 text-lg mx-5" on:click={clickHandler}>
		<a href="/userselect">Vybrat usera</a>
	</button>
</div>
