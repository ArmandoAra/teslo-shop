'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils";
import { clsx } from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { $Enums } from "@/generated/prisma";

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

    if (!loaded) return <></>;

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
                <div className={
                    clsx("text-xl font-semibold w-full lg:w-3/4 text-center rounded-lg p-4 mb-4",
                        {
                            "bg-green-400": isPaid,
                            "bg-red-400": !isPaid,
                        }
                    )
                }>
                    <IoCardOutline size={30} className="inline-block mr-2" />
                    <span
                        className="text-md font-semibold mx-2"
                    >
                        Payment Status: {isPaid ? "Paid" : "Pending"}
                    </span>
                </div>
                <div className="flex flex-col items-center w-full  gap-4">
                    {
                        productsInCart.map((item, index) => (
                            <div
                                key={item.size + index}
                                className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full lg:w-3/4   gap-4 justify-around  mb-4   bg-slate-300 rounded p-2 ">
                                <div className="grid grid-cols-[64px_1fr] w-full gap-2">
                                    <Image
                                        src={`/products/${item.product.ProductImage[0].url}`}
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