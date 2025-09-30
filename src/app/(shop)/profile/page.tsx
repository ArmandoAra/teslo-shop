import { PageTitle } from "@/components";
import { auth } from "../../../auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 h-screen">
            <PageTitle title="Profile" subtitle="Manage your profile information" />
            {
                session?.user ? (
                    <div className="mt-8">
                        <p className="text-lg">Name: {session.user.name}</p>
                        <p className="text-lg">Email: {session.user.email}</p>
                        <p className="text-lg">Role: {session.user.role}</p>
                    </div>
                ) : (
                    <p className="mt-8 text-lg">No user data available.</p>
                )
            }
        </div>
    );
}