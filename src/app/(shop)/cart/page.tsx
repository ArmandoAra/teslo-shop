import PageTitle from "@/components/ui/title-component/Title";
import Link from "next/link";

import ProductsInCart from "./ui/productsInCart";
import OrderSummary from "./ui/OrderSummary";



export default function CartPage() {
    // redirect("/empty");

    return (
        <div className="flex flex-col justify-center items-center p-4 mb-20 ">
            <PageTitle title="Cart" />
            <div className="w-full flex flex-col md:grid md:grid-cols-[2fr_1fr] justify-center items-start gap-10 md:gap-2">
                {/* Carrito */}
                <div className="flex flex-col items-center mt-10 w-full">
                    <ProductsInCart />

                    {/* Items */}
                    <Link href={"/"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Continue Shopping
                    </Link>
                </div>

                {/* Cart Summary */}
                <OrderSummary />
            </div >
        </div >
    );
}                             