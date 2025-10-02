import { PageTitle } from "@/components";
import AddressForm from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";


export default async function AddressPage() {
    const countries = await getCountries();
    const session = await auth();
    if (!session) {
        return (
            <div className="container mx-auto px-4 h-screen">
                <PageTitle title="Address" subtitle="Delivery Address" />
                <p className="mt-8 text-lg">You must be logged in to view this page.</p>
            </div>
        )
    }
    const address = await getUserAddress(session.user.id);


    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left p-0 md:p-4">
                <PageTitle title="Address" subtitle="Delivery Address" />
                <AddressForm countries={countries} userStoredAddress={address} />
            </div>

        </div>
    );
}