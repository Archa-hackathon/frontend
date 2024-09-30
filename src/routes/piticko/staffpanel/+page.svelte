<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import { API_ROOT, getItems, type Drinks, type Order } from '$lib/api.js';

    import ItemCartViewOnly from '$lib/ItemCardViewOnly.svelte';

    // get items from orders
    let orders: Order[] = [];

    let refreshIntervat: NodeJS.Timeout;

    let items: Drinks;

    async function listOrders() {
        const url = `${API_ROOT}/bar/list_orders`;
        
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
            return data.orders;
        } else {
            return [];
        }
    }

    function getIconFromName(name: string) {
        for (let i = 0; i < items.drinks.length; i++) {
            if (items.drinks[i].name === name) {
                return items.drinks[i].icon;
            }
        }
        return '';
    }

    function getPriceFromName(name: string) {
        for (let i = 0; i < items.drinks.length; i++) {
            if (items.drinks[i].name === name) {
                return items.drinks[i].price;
            }
        }
        return 0;
    }

    function qrScanner() {
        window.location.href = '/piticko/staffpanel/qrscanner';
    }

    onMount(async () => {
        items = await getItems();
        orders = await listOrders();

        refreshIntervat = setInterval(async () => {
            orders = await listOrders();
        }, 1000);
    });

    async function setOrderReady(order: Order) {
        console.log(order);
        const orderId = order.secret_id;
        const url = `${API_ROOT}/bar/finish_order`;
        const body = {
            secret_id: orderId,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (data.success) {
            orders = await listOrders();
        }
    }
</script>

{#if orders.length === 0}
    <div class="flex flex-col justify-center items-center text-xl h-[100svh] w-screen">
        <span class="text-center mt-2 text-3xl">Žádné objednávky.</span>
        <button class="btn btn-primary mt-8 w-10/12" on:click={qrScanner}>QR scanner</button>
    </div>
{:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each orders as order}
            <div class="collapse bg-base-300">
                <input type="radio" name="radio-1" checked={true} />
                <div class="collapse-title flex flex-row justify-between">
                    <div class="text-xl font-medium text-secondary mt-2 text-center">Objednávka číslo {order.id}</div>
                    {#if order.finished}
                        <button class="btn btn-success justify-end self-end">✔️</button>
                    {:else}
                        <button class="btn btn-success justify-end self-end z-10" on:click={async ()=>{await setOrderReady(order)}}>Hotovo</button>
                    {/if}
                </div>
                <div class="collapse-content">
                    {#each order.items as item}
                        <ItemCartViewOnly name={item.name} quantity={item.quantity} price={getPriceFromName(item.name)} icon={getIconFromName(item.name)} />
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <button class="btn btn-primary" on:click={qrScanner}>QR scanner</button>
{/if}