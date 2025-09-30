import { redirect } from "next/navigation";
import { auth } from "../../auth.config";


export default async function AuthLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();
    if (session?.user) {
        //Redireccionar a la pagina principal
        redirect('/');
    }

    return (
        <main className=" w-full h-screen flex justify-center items-center">
            {children}
        </main>
    );
}
