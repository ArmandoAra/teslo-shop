
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
        link: "/",
        title: "Tickets",
        icon: <IoTicketOutline />,
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
        title: "Orders",
        icon: <IoTicketOutline />
    },
    {
        link: "/",
        title: "Users",
        icon: <IoPeopleOutline />
    },
]
