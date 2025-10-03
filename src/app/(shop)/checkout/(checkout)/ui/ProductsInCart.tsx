'use client';
import { useCartStore } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils";

export default function ProductsInCart() {
    const productsInCart = useCartStore(state => (state.items));

    // To avoid hydration error
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <></>;

    return (
        <div className="flex flex-col items-center w-full  gap-4">
            {
                productsInCart.map((product, index) => (
                    <div
                        key={product.slug + index}
                        className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full lg:w-3/4   gap-4 justify-around  mb-4   bg-slate-300 rounded p-2 ">
                        <div className="grid grid-cols-[64px_1fr] w-full gap-2">
                            <Image
                                src={`/products/${product.image}`}
                                alt={product.title}
                                className="w-16 h-16 object-cover rounded flex-1"
                                width={64}
                                height={64}
                            />
                            <span className="flex items-center justify-center text-sm w-full " >
                                <h2 >{product.title}</h2>
                                <span className="mx-1">|</span>
                                <span className="bg-blue-500 text-white rounded px-1">{product.size}</span>
                                <span className="mx-1">{product.quantity}</span>
                            </span >
                        </div>

                        <div className="flex justify-end pr-2  items-center  w-full gap-2">
                            <p className="text-lg font-semibold flex ">{currencyFormatter(product.price * product.quantity)}</p>
                        </div>

                    </div>
                ))}</div>
    );
}