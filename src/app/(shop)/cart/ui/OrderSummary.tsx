'use client';

import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormatter } from "@/utils";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";



export default function OrderSummary() {
    // const getSummaryInformation = useCartStore(state => state.getSummaryInformation);
    // const { numberOfItems, subTotal, tax, total } = getSummaryInformation();

    const { numberOfItems, subTotal, tax, total } = useCartStore();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);



    return (
        <>
            <div className="flex flex-col items-center w-full lg:w-2/3 mx-auto md:mx-0  mt-10 bg-slate-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold w-full bg-slate-300 text-center rounded-lg p-4">Cart Summary</h2>
                <div className="flex flex-col space-y-2 mt-4 w-full">

                    <div className="flex justify-between w-full">
                        <span className="text-md">No. of Items</span>
                        <span className="text-md font-semibold">{loaded ? numberOfItems : "Loading..."}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span className="text-md">Subtotal</span>
                        <span className="text-md font-semibold">{loaded ? currencyFormatter(subTotal) : "Loading..."}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span className="text-md">Taxes</span>
                        <span className="text-md font-semibold">{loaded ? currencyFormatter(tax) : "Loading..."}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span className="text-md">Total</span>
                        <span className="text-md font-semibold">{loaded ? currencyFormatter(total) : "Loading..."}</span>
                    </div>
                </div>

                <Link href="/checkout/address" className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900">
                    Proceed to Checkout
                </Link>
            </div>
        </>
    );
}