import Link from "next/link";
import { ReactNode } from "react";

interface MenuItemProps {
    link: string;
    title: string;
    icon: ReactNode
}



export function MenuItem({ link, title, icon }: MenuItemProps) {
    return (
        <Link
            href={link}
            className="flex items-center w-full h-10 mt-4 transition-all rounded-md hover:bg-gray-200 hover:text-gray-800">
            {icon}
            <span className="ml-2">{title}</span>
        </Link>
    )
}