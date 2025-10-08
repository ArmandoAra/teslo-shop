
export default async function AdminLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <div className="flex  w-full justify-center min-h-screen bg-gray-100">
            {children}
        </div>
    );
}