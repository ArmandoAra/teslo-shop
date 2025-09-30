import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import { auth } from "../../../auth.config";



export default async function CheckoutLayout({
    children
}: { children: React.ReactNode }) {

    return (
        <>
            {children}
        </>
    );
}