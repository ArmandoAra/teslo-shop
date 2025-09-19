import { Sidebar, TopMenu } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className=" w-full flex flex-col">
            <TopMenu />
            <Sidebar />
            {children}
        </main>
    );
}
