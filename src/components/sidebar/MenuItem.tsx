import Link from "next/link";
import { ReactNode } from "react";
import { logout } from "@/actions";

interface MenuItemProps {
    link: string;
    title: string;
    icon: ReactNode;
    closeMenu: () => void;
}



export function MenuItem({ link, title, icon, closeMenu }: MenuItemProps) {

    const handleClick = async () => {
        if (title === "Log Out") await logout();

        closeMenu();
    }

    return (
        <Link
            href={link}
            className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800"
            onClick={handleClick}
        >
            {icon}
            <span className="ml-2">{title}</span>
        </Link>
    )
}