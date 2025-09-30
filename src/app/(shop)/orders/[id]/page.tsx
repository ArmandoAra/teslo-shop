import { PageTitle } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { IoCardOutline, IoTrashBinOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
    initialData.products[4],
    initialData.products[5],
]

interface Props {
    params: Promise<{ id: string }>
}

export default async function OrderByIdPage({ params }: Props) {
    const { id } = await params;

    // Verificar
    //Redirect

    return (
        <div className="flex flex-col justify-center items-center p-4 mb-20">
            <PageTitle title={`Order N°  ${id}`} />

            <div className="w-full flex flex-col md:grid md:grid-cols-[2fr_1fr] justify-center items-start gap-10">
                {/* Carrito */}
                <div className="flex flex-col items-center mt-10 w-full">
                    <div className={
                        clsx("text-xl font-semibold w-full lg:w-3/4 text-center rounded-lg p-4 mb-4",
                            {
                                "bg-green-400": true,
                                "bg-red-400": false,
                            }
                        )
                    }>
                        <IoCardOutline size={30} className="inline-block mr-2" />
                        <span
                            className="text-md font-semibold mx-2"
                        >
                            Payment Status: {true ? "Paid" : "Pending"}
                        </span>
                    </div>

                    {/* Items */}   {
                        productsInCart.map(product => (
                            <div key={product.slug} className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full lg:w-3/4   gap-4 items-center mb-4   bg-slate-300 rounded p-2 justify-items-center">
                                <div className="grid grid-cols-[64px_1fr] w-full gap-2">
                                    <Image
                                        src={`/products/${product.images[0]}`}
                                        alt={product.title}
                                        className="w-16 h-16 object-cover rounded flex-1"
                                        width={64}
                                        height={64}
                                    />
                                    <h2 className="flex items-center justify-center text-sm w-full ">{product.title}</h2>
                                </div>

                                <div className="grid grid-cols-[64px_1fr_64px]  items-center justify-items-center w-full gap-2">
                                    <div>
                                        <p className="text-lg font-semibold w-full flex items-center justify-start">${product.price}</p>
                                        <p>x <span className="text-md font-medium">{3}</span></p>
                                    </div>
                                    {/* quantity selector */}
                                    <p className="text-lg font-semibold w-full flex items-center justify-center">Subtotal: ${product.price * 3}</p>
                                    <button className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-700 w-10 flex items-center justify-center" title="Remove product">
                                        <IoTrashBinOutline size={20} />
                                    </button>
                                </div>

                            </div>
                        ))}


                </div>

                {/* Cart Summary */}
                <div className="flex flex-col items-center w-3/4 mx-auto md:mx-0 md:w-2/3 mt-10 gap-4">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold w-full bg-slate-300 text-center rounded-lg p-4">Shipping Information</h2>
                        <div className="flex flex-col space-y-2 mt-4 w-full gap-2">
                            <div className="flex flex-col justify-between w-full gap-2">
                                <span className="text-md">Name: <span className="text-md font-semibold">John Doe</span></span>
                                <span className="text-md">Email: <span className="text-md font-semibold">john.doe@example.com</span></span>
                                <span className="text-md">Phone: <span className="text-md font-semibold">+1 (555) 123-4567</span></span>
                                <span className="text-md">Address: <span className="text-md font-semibold">123 Main St, Anytown, USA</span></span>
                            </div>
                            <Link href={"/checkout/address"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 justify-center flex">
                                Edit Address
                            </Link>
                        </div>

                    </div>
                    <h2 className="text-xl font-semibold w-full bg-slate-300 text-center rounded-lg p-4">Cart Summary</h2>
                    <div className="flex flex-col space-y-2 mt-4 w-full">
                        <div className="flex justify-between w-full">
                            <span className="text-md">Subtotal</span>
                            <span className="text-md font-semibold">$123.45</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-md">Shipping</span>
                            <span className="text-md font-semibold">$12.34</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-md">Taxes</span>
                            <span className="text-md font-semibold">$3.00</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-md">Total</span>
                            <span className="text-md font-semibold">$135.79</span>
                        </div>
                    </div>

                    <div className="flex justify-between w-full">
                        <div className={
                            clsx("text-xl font-semibold w-full  text-center rounded-lg p-4 mb-4",
                                {
                                    "bg-green-400": true,
                                    "bg-red-400": false,
                                }
                            )
                        }>
                            <IoCardOutline size={30} className="inline-block mr-2" />
                            <span
                                className="text-md font-semibold mx-2"
                            >
                                Payment Status: {true ? "Paid" : "Pending"}
                            </span>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
}                             