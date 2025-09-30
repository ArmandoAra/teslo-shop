import { Footer, Sidebar, TopMenu } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
    // Verificando si el usuario esta logueado

    return (
        <main className=" w-full flex flex-col bg-slate-200 ">
            <TopMenu />
            <Sidebar />
            {children}
            {/* <Footer /> */}
            <Footer />
        </main>
    );
}
