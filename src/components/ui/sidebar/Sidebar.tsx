'use client';
import {
    IoCloseOutline,
    IoSearchOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { clsx } from "clsx";
import { menuItemsGroup1, menuItemsGroup2 } from "@/constants/sidebar";
import { MenuItem } from "@/components/sidebar/MenuItem";

export function Sidebar() {
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    return (
        <div>{isSideMenuOpen && (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                <div className="fixed inset-0 backdrop-blur-sm z-40" onClick={() => { closeMenu() }}></div>
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
                    onClick={() => { closeMenu() }}
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
                {
                    menuItemsGroup1.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                link={item.link}
                                title={item.title}
                                icon={item.icon}
                            />)
                    })
                }
                {/* Line Separator */}
                <hr className="my-4 border-gray-300" />
                {
                    menuItemsGroup2.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                link={item.link}
                                title={item.title}
                                icon={item.icon}
                            />
                        )
                    })
                }
            </aside>
        </div>
    );
}