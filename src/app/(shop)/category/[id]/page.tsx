import { initialData } from "@/seed/seed";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Category } from "@/interfaces";

// constants
import { labels } from "@/constants/categories";

const seedProducts = initialData.products;

interface Props {
    params: { id: Category };
}

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;

    const products = seedProducts.filter(product => product.gender === id);

    return (
        <div className="bg-blue-200 flex flex-col min-h-screen pt-10 px-5  items-center">
            <Title
                title={" Articles for " + labels[id]}
            />
            <ProductGrid products={products} />
        </div>
    );
}