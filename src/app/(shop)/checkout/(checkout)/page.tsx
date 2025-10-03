import { PageTitle } from "@/components";

import ProductsInCart from "./ui/ProductsInCart";
import PlaceOrder from "./ui/PlaceOrder";

export default function CheckOutPage() {
    return (
        <div className="flex flex-col justify-center items-center p-4 mb-20">
            <PageTitle title="Verify Order" />

            <div className="w-full flex flex-col md:grid md:grid-cols-[2fr_1fr] justify-center items-start gap-10">
                {/* Carrito */}
                <ProductsInCart />

                <PlaceOrder />
            </div >
        </div >
    );
}                             