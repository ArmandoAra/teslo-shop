"use client";

import { placeOrder } from "@/actions/order/place-order";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import clsx from "clsx";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function PlaceOrder() {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const products = useCartStore((state) => state.items);
    const [errorMessage, setErrorMessage] = useState('');

    const address = useAddressStore((state) => state.address);
    const { numberOfItems, subTotal, tax, total } = useCartStore();
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        setLoaded(true);
    }, []);
    const onPlaceOrder = async () => {
        // Mandar al backend con un server action
        setIsPlacingOrder(true);
        const productsToOrder = products.map(p => ({
            productId: p.id,
            quantity: p.quantity,
            size: p.size,
        }));
        const resp = await placeOrder(productsToOrder, address);
        if (!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }
        // Cuando llega a este punto ,la orden se creo correctamente
        //  Limpiar el carrito
        router.replace(`/orders/${resp.orderId}`);
        clearCart();
        // Redireccionar a la pagina de ordenes

        setIsPlacingOrder(false);
    }

    //Si no hay direccion o productos, redireccionar
    // useEffect(() => {
    //     if (loaded) {
    //         if (!address || products.length === 0) {
    //             router.replace("/empty");
    //         }
    //     }
    // }, [loaded, address, products, router]);



    if (!loaded) return (<div>Loading...</div>)

    return (
        <div className="flex flex-col items-center w-3/4 mx-auto md:mx-0 md:w-2/3 mt-10 gap-4">
            <div className="w-full">
                <h2 className="text-xl font-semibold w-full bg-slate-300 text-center rounded-lg p-4">Shipping Information</h2>
                <div className="flex flex-col space-y-2 mt-4 w-full gap-2">
                    <div className="flex flex-col justify-between w-full gap-2">
                        <span className="text-md">Name: <span className="text-md font-semibold">{address.firstName} {address.lastName}</span></span>
                        <span className="text-md">Phone: <span className="text-md font-semibold">{address.phone}</span></span>
                        {/* Saltar linea   */}
                        <span className="text-md">Address:
                            <span className="text-md font-semibold">
                                {address.address},
                                <br />
                                {address.address2},
                                {address.city},
                                <br />
                                {address.country},
                                {address.postalCode}
                            </span></span>
                    </div>
                    <Link href={"/checkout/address"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 justify-center flex">
                        Edit Address
                    </Link>
                </div>

            </div>
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

            {/* terminos y condiciones */}
            <div className="flex flex-col  items-center mt-4">
                <div className="flex items-center mt-4"></div>
                <label htmlFor="terms" className="text-sm">I agree to the terms and conditions</label>
                <p className="text-sm text-gray-500">You confirm that you have read and agree to the terms and conditions.</p>
            </div>


            <p className="text-sm text-red-500">{errorMessage}</p>

            <button
                onClick={onPlaceOrder}
                className={
                    clsx(
                        "w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-colors",
                        (isPlacingOrder) && "opacity-50 cursor-not-allowed"
                    )}
            >
                Proceed to Buy
            </button>
        </div>
    )
}