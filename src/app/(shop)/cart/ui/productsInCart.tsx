'use client';
import Link from "next/link";
import { useCartStore } from "@/store";
import { IoTrashBinOutline } from "react-icons/io5";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { useEffect, useState } from "react";
import ProductImage from "@/components/product/product-image/ProductImge";

export default function ProductsInCart() {
    const productsInCart = useCartStore(state => (state.items));
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);

    // To avoid hydration error
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <></>;

    return (
        <>
            {
                productsInCart.map((product, index) => (
                    <div
                        key={product.slug + index}
                        className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full lg:w-3/4   gap-4 items-center mb-4   bg-slate-300 rounded p-2 justify-items-center">
                        <div className="grid grid-cols-[64px_1fr] w-full gap-2">
                            <ProductImage
                                src={product.image}
                                alt={product.title}
                                className="w-16 h-16 object-cover rounded flex-1"
                                width={64}
                                height={64}
                            />
                            <Link className="flex items-center justify-center text-sm w-full cursor-pointer hover:text-blue-500" href={`/product/${product.slug}`}>
                                <h2 >{product.title}</h2>
                                &nbsp;
                                <span className="bg-blue-500 text-white rounded px-1">{product.size}</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-[64px_1fr_64px]  items-center justify-items-center w-full gap-2">
                            <p className="text-lg font-semibold w-full flex items-center justify-end">${product.price * product.quantity}</p>
                            {/* quantity selector */}
                            <QuantitySelector
                                quantity={product.quantity}
                                stock={10}
                                onQuantityChange={
                                    (quantity) => updateProductQuantity(product, quantity)
                                }
                            />
                            <button
                                className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-700 w-10 flex items-center justify-center"
                                title="Remove product"
                                onClick={() => removeProduct(product.id, product.size)}
                            >
                                <IoTrashBinOutline size={20} />
                            </button>
                        </div>

                    </div>
                ))}</>
    );
}