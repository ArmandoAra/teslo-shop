'use client'

import { QuantitySelector, SizeSelector } from "@/components";
import type { ICartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

import { useState } from "react";

// NO es la interfaz de prisma, es la interfaz que yo le voy a pasar al componente
interface Props {
    product: Product
}

export default function AddToCart({ product }: Props) {
    // Zustand
    const { addProduct } = useCartStore();

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState(1);
    const [posted, setPosted] = useState(false);


    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        const productToAdd: ICartProduct = {
            id: product.id,
            image: product.images[0],
            price: product.price,
            quantity,
            size,
            slug: product.slug,
            title: product.title,
        };

        addProduct(productToAdd);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>
            {(posted && !size) && <span className="text-red-500 font-medium absolute -mt-2">
                Select a size!
            </span>}
            {/* Selector de tallas */}
            <SizeSelector
                availableSizes={product?.sizes}
                selectedSize={size}
                onSelectedSize={setSize}
            />

            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                stock={product?.inStock}
            />

            <button
                className="btn-primary mt-4 w-full"
                onClick={addToCart}
            >
                Add to Cart
            </button></>
    );
}