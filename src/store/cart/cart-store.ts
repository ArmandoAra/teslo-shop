import { ICartProduct } from "@/interfaces";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    items: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    addProduct: (product: ICartProduct) => void;
    updateProductQuantity: (product: ICartProduct, quantity: number) => void;
    removeProduct: (productId: string, size: string) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            items: [],
            numberOfItems: 0,
            subTotal: 0,
            tax: 0,
            total: 0,

            addProduct: (product: ICartProduct) => {
                const { items } = get();
                const exists = items.some(
                    (item) => item.id === product.id && item.size === product.size
                );

                let newItems;
                if (!exists) {
                    newItems = [...items, product];
                } else {
                    newItems = items.map(item =>
                        item.id === product.id && item.size === product.size
                            ? { ...item, quantity: item.quantity + product.quantity }
                            : item
                    );
                }
                set({ items: newItems, ...calculateSummary(newItems) });
            },

            updateProductQuantity: (product: ICartProduct, quantity: number) => {
                const newItems = get().items.map(item =>
                    item.id === product.id && item.size === product.size
                        ? { ...item, quantity }
                        : item
                );
                set({ items: newItems, ...calculateSummary(newItems) });
            },

            removeProduct: (productId: string, size: string) => {
                const newItems = get().items.filter(
                    item => !(item.id === productId && item.size === size)
                );
                set({ items: newItems, ...calculateSummary(newItems) });
            },
        }),
        { name: "cart-storage" }
    )
);

function calculateSummary(items: ICartProduct[]) {
    const numberOfItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.15;
    const tax = subTotal * taxRate;
    const total = subTotal + tax;
    return { numberOfItems, subTotal, tax, total };
}
