<script lang="ts">
	import { onMount } from 'svelte';
	import { API_ROOT } from '$lib/api.js';

	import QRCode from 'qrcode';

	export let data: { secretid: string };

	let orderStatus: boolean | null = null;
	let orderId: number | null = 0;

	let qrImage: string = '';

	let refreshInterval: NodeJS.Timeout;

	onMount(async () => {
		// await update();

		refreshInterval = setInterval(update, 1000);
	});

	async function update() {
		const res = await fetch(`${API_ROOT}/bar/get_order_status?secret_id=${data.secretid}`);
		const response = await res.json();

		orderStatus = response.finished;
		orderId = response.id;

		if (orderStatus === true) {
			const qrData: string = JSON.stringify({ id: orderId, secret_id: data.secretid });
			qrImage = await QRCode.toDataURL(qrData, {
				scale: 16,
  				color: {
					dark: '#ffffff',
					light: '#0e0e0e',
	  			},
			});
			clearTimeout(refreshInterval);
		}
	}
</script>

{#if orderStatus === null}
	<div>Loading...</div>
{:else}
	<div class="flex flex-col justify-center items-center text-xl mt-5 mx-8">
		<span class="text-2xl">Číslo objednávky:</span>
		<div
			class="size-32 text-5xl font-bold rounded-full bg-base-300 text-primary flex items-center justify-center font-mono mt-2"
		>
			{orderId}
		</div>
		{#if orderStatus}
			<div class="text-center mt-2">Vaše objednávka je připravena. Vyzvedněte si ji na baru.</div>
			<img src={qrImage} alt="QR code" class="size-96" />
		{:else}
			<div>Vaše objednávka se připravuje...</div>
		{/if}
	</div>
{/if}
