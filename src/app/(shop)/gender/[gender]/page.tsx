export const revalidate = 60; //60 seconds 


import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title-component/Title";

// constants
import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@/generated/prisma";
import Pagination from "@/components/ui/pagination/Pagination";


interface Props {
    params: Promise<{
        gender: string;
    }>;
    searchParams: Promise<{
        page?: string
    }>
}

export default async function CategoryPage({ params, searchParams: sParams }: Props) {
    const { gender } = await params;

    const searchParams = await sParams
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

    if (products.length === 0) {
        redirect(`/gender/${gender}`)
    }

    const labels: Record<string, string> = {
        men: "Men's",
        women: "Women's",
        kid: "Kids'",
        unisex: "Unisex"
    };

    return (
        <div className="bg-blue-200 flex flex-col min-h-screen pt-10 px-5  items-center">
            <Title
                title={" Articles for " + labels[gender]}
            />
            <ProductGrid products={products} />
            <Pagination
                totalPages={totalPages}
            />
        </div>
    );
}