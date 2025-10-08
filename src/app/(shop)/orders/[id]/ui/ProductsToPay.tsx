'use client';
import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils";
import { $Enums } from "@/generated/prisma";
import PaymentStatus from "./PaymentStatus";
import ProductImage from "@/components/product/product-image/ProductImge";

interface ICartProduct {
    product: {
        title: string;
        slug: string;
        ProductImage: {
            url: string;
        }[];
    };
    quantity: number;
    size: $Enums.Size;
    price: number;
}[]


interface ProductsToPayProps {
    // Hacer todas las propiedades opcionales con P
    productsInCart: ICartProduct[] | null;
    isPaid: boolean;
}

export default function ProductsToPay({ productsInCart, isPaid }: ProductsToPayProps) {

    // To avoid hydration error
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    // si no ha cargado vamos a renderizar un esqueleton
    if (!loaded) return (
        <div className="flex flex-col items-center mt-10 w-full">
            <div className="w-full lg:w-3/4 space-y-4">
                <div className="h-20 bg-slate-600 rounded animate-pulse"></div>
                <div className="h-20 bg-slate-400 rounded animate-pulse"></div>
                <div className="h-20 bg-slate-600 rounded animate-pulse"></div>
                <div className="h-20 bg-slate-400 rounded animate-pulse"></div>
            </div>
        </div >
    );

    if (!productsInCart || productsInCart.length === 0) {
        return (
            <div className="flex flex-col items-center mt-10 w-full">
                <h2 className="text-lg font-semibold">No products found</h2>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center mt-10 w-full">
                <div className="flex flex-col items-center w-full md:w-3/4  gap-4">
                    <PaymentStatus isPaid={isPaid} />
                    {
                        productsInCart.map((item, index) => (
                            <div
                                key={item.size + index}
                                className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full    gap-4 justify-around  mb-4   bg-slate-300 rounded p-2 ">
                                <div className="grid grid-cols-[64px_1fr] w-full gap-2">
                                    <ProductImage
                                        src={item.product.ProductImage[0].url}
                                        alt={item.product.title}
                                        className="w-16 h-16 object-cover rounded flex-1"
                                        width={64}
                                        height={64}
                                    />
                                    <span className="flex items-center justify-center text-sm w-full " >
                                        <h2 >{item.product.title}</h2>
                                        <span className="mx-1">|</span>
                                        <span className="bg-blue-500 text-white rounded px-1">{item.size}</span>
                                        <span className="mx-1">{item.quantity}</span>
                                    </span >
                                </div>

                                <div className="flex justify-end pr-2  items-center  w-full gap-2">
                                    <p className="text-lg font-semibold flex ">{currencyFormatter(item.price * item.quantity)}</p>
                                </div>

                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}