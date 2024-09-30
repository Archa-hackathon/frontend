<script lang="ts">
	import { onMount } from 'svelte';
	import { API_ROOT } from '$lib/api.js';
	
	import QRCode from 'qrcode'

	export let data: {secretid: string};

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
			const qrData: string = JSON.stringify({id: orderId, secret_id: data.secretid});
			qrImage = await QRCode.toDataURL(qrData);
			clearTimeout(refreshInterval);
		}
	}
</script>

{#if orderStatus === null}
	<div>Loading...</div>
{:else}
	{#if orderStatus}
		<div>Objednávka {orderId} byla dokončena.</div>
		<img src={qrImage} alt="QR code" class="invert"/>
	{:else}
		<div>Objednávka {orderId} ještě nebyla dokončena.</div>
	{/if}
{/if}