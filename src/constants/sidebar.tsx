
import {
    IoPeopleOutline,
    IoPersonOutline,
    IoShirtOutline,
    IoTicketOutline
} from "react-icons/io5";


export const menuItemsGroup1 = [
    {
        link: "/profile",
        title: "My Account",
        icon: <IoPersonOutline />,
    },
    {
        link: "/orders",
        title: "Orders",
        icon: <IoTicketOutline />
    },
]

export const menuItemsGroup2 = [
    {
        link: "/",
        title: "Products",
        icon: <IoShirtOutline />
    },
    {
        link: "/",
        title: "Users",
        icon: <IoPeopleOutline />
    },
]
