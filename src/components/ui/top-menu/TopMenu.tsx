'use client';
import { useCartStore, useUIStore } from "@/store";
import { titleFont } from "@/config/fonts";
import Link from "next/link";

import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export function TopMenu() {
    const openMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.numberOfItems);

    // Manejando el problema de la hidratacion
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);


    return (
        <nav className="flex px-5 justify-between sm:items-center w-full bg-gray-800 text-white p-4 ">
            <div>
                <Link href="/" className={`${titleFont.className} antialiased font-bold text-lg md:text-3xl`}>Teslo | Shop</Link>
            </div>
            {/* Centerd menu */}
            <ul className="hidden sm:flex gap-0 md:gap-5 mx-auto">
                <li>
                    <Link href="/gender/men" className="flex items-center justify-center w-16 md:w-24 h-8 transition-all m-2 rounded-md hover:bg-gray-200 hover:text-gray-800">Men</Link>
                </li>
                <li>
                    <Link href="/gender/women" className="flex items-center justify-center w-16 md:w-24 h-8 transition-all m-2 rounded-md hover:bg-gray-200 hover:text-gray-800">Women</Link>
                </li>
                <li>
                    <Link href="/gender/kid" className="flex items-center justify-center w-16 md:w-24 h-8 transition-all m-2 rounded-md hover:bg-gray-200 hover:text-gray-800">Kids</Link>
                </li>
            </ul>

            {/* Search , Cart, Menu  */}
            <div className="flex items-center gap-3">
                <Link href="/search" className="flex items-center justify-center w-8 h-8 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoSearchOutline size={20} />
                </Link>
                <Link href={totalItemsInCart > 0 ? "/cart" : "/empty"} className="flex items-center justify-center w-8 h-8 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <div className="relative">
                        <IoCartOutline size={20} />
                        {loaded && totalItemsInCart > 0 &&
                            <span className="fade-in absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {totalItemsInCart <= 99
                                    ? totalItemsInCart
                                    : '+99'
                                }
                            </span>}
                    </div>
                </Link>
                <button
                    className="m-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all "
                    onClick={() => { openMenu() }}
                >
                    Menu
                </button>
            </div>
        </nav>
    );
}