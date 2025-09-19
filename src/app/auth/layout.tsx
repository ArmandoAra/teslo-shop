

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-red-500 w-full h-full">
            <h1>Auth Layout</h1>
            {children}
        </main>
    );
}
