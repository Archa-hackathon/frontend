export const API_ROOT = 'https://hack-back.stuckinvim.com';

export async function getItems(): Promise<Drinks> {
    const url = `${API_ROOT}/bar/get_items`

    const request = await fetch(url);
    const data = await request.json();
    return data;
}

export type Drink = {
    name: string,
    price: number,
    icon: string,
};
export type Drinks = {
    drinks: Drink[],
    currencySymbol: string,
    currency: string,
};