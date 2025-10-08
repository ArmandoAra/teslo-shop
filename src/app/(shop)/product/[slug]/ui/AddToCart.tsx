'use client'

import { QuantitySelector, SizeSelector } from "@/components";
import type { ICartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import clsx from "clsx";

import { useState } from "react";

// NO es la interfaz de prisma, es la interfaz que yo le voy a pasar al componente
interface Props {
    product: Product & { ProductImage: { id: number; url: string }[] };
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
            image: product.ProductImage[0].url,
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
                className={
                    clsx("btn-primary mt-4", {
                        'bg-gray-300 hover:bg-gray-300 cursor-not-allowed': product.inStock === 0,
                        'bg-blue-600 hover:bg-blue-700': size,
                    })
                }
                disabled={product.inStock === 0
                }
                onClick={addToCart}
            >
                Add to Cart
            </button></>
    );
}