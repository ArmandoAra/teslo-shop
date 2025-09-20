import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Category } from "@/interfaces";

const seedProducts = initialData.products;

interface Props {
    params: { id: Category };
}

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;


    const products = seedProducts.filter(product => product.gender === id);
    const labels: Record<Category, string> = {
        men: "Men's Clothing",
        women: "Women's Clothing",
        kid: "Kids Clothing",
        unisex: "Unisex Clothing"
    };

    // if (id === "kids") {
    //     notFound();
    // }

    return (
        <div className="bg-blue-200 flex flex-col min-h-screen pt-10 px-5  items-center">
            <Title
                title={" Articles for " + labels[id]}
            />
            <ProductGrid products={products} />
        </div>
    );
}