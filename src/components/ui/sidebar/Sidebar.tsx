'use client';
import {
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoSearchOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { clsx } from "clsx";
import { menuItemsGroup1, menuItemsGroup2 } from "@/constants/sidebar";
import { MenuItem } from "@/components/sidebar/MenuItem";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import { logout } from "@/actions/auth/logout";
import { set } from "zod";


export function Sidebar() {
    const { isSideMenuOpen, closeSideMenu, admin, setAdmin, isLoggedIn, setLoggedIn } = useUIStore(state => state);


    const { data: session } = useSession();
    const loggedIn = !!session?.user;
    const isAdmin = session?.user?.role === 'admin';



    useEffect(() => {
        setLoggedIn(loggedIn);
        setAdmin(isAdmin);
    }, [loggedIn, isAdmin, setAdmin, setLoggedIn]);


    return (
        <div>{isSideMenuOpen && (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                <div className="fixed inset-0 backdrop-blur-sm z-40" onClick={() => { closeSideMenu() }}></div>
            </>
        )}
            <aside className={clsx("fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 z-50 transform transition-transform duration-300",
                {
                    'translate-x-0': isSideMenuOpen,
                    'translate-x-full': !isSideMenuOpen,
                }
            )}>
                <IoCloseOutline
                    size={50}
                    className="absolute top-4 right-4 cursor-pointer hover:text-gray-600"
                    onClick={() => { closeSideMenu() }}
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
                {isLoggedIn &&
                    menuItemsGroup1.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                link={item.link}
                                title={item.title}
                                icon={item.icon}
                                closeMenu={closeSideMenu}
                            />
                        )
                    })
                }
                {isLoggedIn ? <LogOutLink closeMenu={closeSideMenu} setLogged={setLoggedIn} setAdmin={setAdmin} /> : <LogInLink closeMenu={closeSideMenu} />}
                {/* Line Separator */}
                <hr className="my-4 border-gray-300" />
                {admin &&
                    menuItemsGroup2.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                link={item.link}
                                title={item.title}
                                icon={item.icon}
                                closeMenu={closeSideMenu}
                            />
                        )
                    })
                }
            </aside>
        </div>
    );
}

const LogInLink = ({ closeMenu }: { closeMenu: () => void }) => {
    const handleClick = async () => {
        closeMenu();
    }
    return (
        <Link
            href="/auth/login"
            className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800"
            onClick={handleClick}
        >
            <IoLogInOutline />
            <span className="ml-2">Log In</span>
        </Link>
    );
}

const LogOutLink = ({ closeMenu, setLogged, setAdmin }: { closeMenu: () => void, setLogged: (value: boolean) => void, setAdmin: (value: false) => void }) => {
    const handleClick = async () => {
        await logout();
        setLogged(false);
        setAdmin(false);
        closeMenu();
    }
    return (
        <Link
            href="/"
            className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800"
            onClick={handleClick}
        >
            <IoLogOutOutline />
            <span className="ml-2">Log Out</span>
        </Link>
    );
}   
