'use client';
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearch, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

export function Sidebar() {
    return (
        <div>
            {/* Black background */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            {/* Blur */}
            <div className="fixed inset-0 backdrop-blur-sm z-40"></div>
            {/* Sidebar */}
            <aside className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-4">
                <IoCloseOutline
                    size={50}
                    className="absolute top-4 right-4 cursor-pointer hover:text-gray-600"
                    onClick={() => { }}
                />

                {/* Search input */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute left-2 top-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Menu items */}
                <Link href="/" className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoPersonOutline />
                    <span className="ml-2">My Account</span>
                </Link>

                <Link href="/" className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoTicketOutline />
                    <span className="ml-2">My Tickets</span>
                </Link>

                <Link href="/" className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoLogInOutline />
                    <span className="ml-2">Log In</span>
                </Link>
                <Link href="/" className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoLogOutOutline />
                    <span className="ml-2">Log Out</span>
                </Link>

                {/* Line Separator */}
                <hr className="my-4 border-gray-300" />

                <Link href="/" className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoShirtOutline />
                    <span className="ml-2">Products</span>
                </Link>

                <Link href="/" className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoTicketOutline />
                    <span className="ml-2">Orders</span>
                </Link>

                <Link href="/" className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
                    <IoPeopleOutline />
                    <span className="ml-2">Usuarios</span>
                </Link>


            </aside>
        </div>
    );
}