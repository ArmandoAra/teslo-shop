'use client'

import { currencyFormatter } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCardOutline } from "react-icons/io5";
import clsx from "clsx";


interface Data {
    id: string;
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    address: string;
    address2: string | null;
    postalCode: string;
    phone: string;
    city: string;
    countryId: string;
}

interface Order {
    subTotal: number;
    tax: number;
    total: number;
    id: string;
    itemsInOrder: number;
    isPaid: boolean;
    paidAt: Date | null;
    userId: string;
    userAddressId: string | null;
}

interface ShippingAndSummaryProps {
    order: Order;
    orderAddress: Data;

}

export const ShippingAndSummary = ({ order, orderAddress }: ShippingAndSummaryProps) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);
    const { subTotal, tax, total, itemsInOrder } = order;


    return (
        <div className="flex flex-col items-center w-full  mx-auto md:mx-0  gap-4">
            <div className="w-full">
                <h2 className="text-xl font-semibold w-full bg-slate-300 text-center rounded-lg p-4">Shipping Information</h2>
                <div className="flex flex-col space-y-2 mt-4 w-full gap-2">
                    <div className="flex flex-col justify-between w-full gap-2">
                        <span className="text-md">Name: <span className="text-md font-semibold">{orderAddress.firstName} {orderAddress.lastName}</span></span>
                        <span className="text-md">Phone: <span className="text-md font-semibold">{orderAddress.phone}</span></span>
                        {/* Saltar linea   */}
                        <span className="text-md">Address:
                            <span className="text-md font-semibold">
                                {orderAddress.address},
                                <br />
                                {orderAddress.address2},
                                {orderAddress.city},
                                <br />
                                {orderAddress.countryId},
                                {orderAddress.postalCode}
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
                    <span className="text-md font-semibold">{loaded ? itemsInOrder : "Loading..."}</span>
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

            <div className="flex justify-between w-full">
                <div className={
                    clsx("text-xl font-semibold w-full  text-center rounded-lg p-4 mb-4",
                        {
                            "bg-green-400": order.isPaid,
                            "bg-red-400": !order.isPaid,
                        }
                    )
                }>
                    <IoCardOutline size={30} className="inline-block mr-2" />
                    <span
                        className="text-md font-semibold mx-2"
                    >
                        Payment Status: {order.isPaid ? "Paid" : "Pending"}
                    </span>
                </div>
            </div>
        </div>
    )

}