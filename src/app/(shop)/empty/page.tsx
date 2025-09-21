import Link from "next/dist/client/link";
import { IoCartOutline } from "react-icons/io5";



export default function EmptyPage() {

    return (
        <div className="flex flex-col items-center justify-center h-[800px]">
            <IoCartOutline size={100} />
            <h1 className="text-3xl font-bold mt-4">Your cart is empty</h1>
            <p className="text-lg mt-2">Add some products to your cart to see them here.</p>
            <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Shop
            </Link>
        </div>
    );
}