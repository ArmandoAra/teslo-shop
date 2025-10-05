import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

export default function PaymentStatus({ isPaid }: { isPaid: boolean }) {
    return (
        <div className={
            clsx("text-xl font-semibold w-full text-center rounded-lg p-4 mb-4",
                {
                    "bg-green-400": isPaid,
                    "bg-red-400": !isPaid,
                }
            )
        }>
            <IoCardOutline size={30} className="inline-block mr-2" />
            <span
                className="text-md font-semibold mx-2"
            >
                Payment Status: {isPaid ? "Paid" : "Pending"}
            </span>
        </div>
    );
}