import { getOrderById } from "@/actions";
import { PageTitle } from "@/components";
import Link from "next/link";

import { ShippingAndSummary } from "./ui/ShippingAndSummary";
import ProductsToPay from "./ui/ProductsToPay";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>
}

export default async function OrderByIdPage({ params }: Props) {
    const { id } = await params;

    // Server action
    const { ok, order, } = await getOrderById(id);
    const { orderItems } = order
    const { OrderAddress: orderAddress } = order

    if (!ok) {
        redirect("/")
    }


    return (
        <div className="flex flex-col justify-center items-center p-4 mb-20 h-auto">
            <PageTitle title={`Order N°  ${id.split('-')[1]}`} />

            <div className="w-full flex flex-col md:grid md:grid-cols-[2fr_1fr] justify-center items-start gap-2">
                <ProductsToPay productsInCart={orderItems} isPaid={order.isPaid} />
                {/* Cart Summary */}
                <div className="flex flex-col items-center w-full mx-auto md:mx-0  mt-10 gap-4">
                    <ShippingAndSummary order={order} orderAddress={orderAddress!} />
                </div>
            </div >
        </div>
    );
}

