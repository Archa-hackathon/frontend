<script lang="ts">
    import QrScanner from '$lib/QrScanner.svelte';
    import { API_ROOT } from '$lib/api.js';

    class Failed {}

    let order: Object | null | Failed = null;

    async function validateOrder(secret_id: string, id: number): Promise<{exists: boolean, validated?: boolean, order?: Object}> {
        const url = `${API_ROOT}/bar/pickup_order`;
        const body = {
            secret_id: secret_id,
        }
        const reponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await reponse.json();
        if (!data.exists) {
            return {exists: false};
        }

        return {exists: true, validated: data.order.id === id, order: data.order};
    }

    async function qrScannedHandler(event: any) {
        const data = event.detail.data;
        const j = JSON.parse(data);
        const validated = await validateOrder(j.secret_id, j.id);
        
        if (validated.exists && validated.validated) {
            order = validated.order!;
        } else {
            order = Failed;
        }
    }

    function onEnd() {
        const url = `${API_ROOT}/bar/delete_order`;
        const data = {
            secret_id: order!.secret_id,
        }
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        order = null;
    }

    function exitToStaffpanel() {
        window.location.href = '/piticko/staffpanel';
    }

</script>

{#if order === null}
    <div class="flex flex-col justify-center items-center text-xl h-[100svh] w-screen">
        <span class="text-center mt-2 text-3xl">Naskenujte QR kód objednávky.</span>
        <QrScanner on:qrScanned={qrScannedHandler} className="size-96 mt-8 rounded-xl border-secondary border-8"/>
        <button class="btn btn-primary w-11/12 mt-8" on:click={exitToStaffpanel}>Zpátky</button>
    </div>
{:else if order === Failed}
<div class="flex flex-col justify-center items-center text-xl mt-5 mx-8 h-[100svh] w-screen">
    <span class="text-center mt-2 text-3xl text-error">Objednávka nenalezena!</span>
</div>
{:else}
    <div class="flex flex-col justify-center items-center text-xl h-[100svh]">
        <span class="text-2xl">Objednávka ověřena!</span>
        <span class="text-2xl">Číslo objednávky:</span>
        <div
            class="size-32 text-5xl font-bold rounded-full bg-base-300 text-primary flex items-center justify-center font-mono mt-2"
        >
            {order.id}
        </div>
        <div class="text-center mt-2"></div>
        <button class="btn btn-primary w-5/6 mt-16" on:click={onEnd}>Smazat objednávku a ukončit</button>
    </div>
{/if}
