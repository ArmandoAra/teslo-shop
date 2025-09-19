import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Welcome to Teslo Shop" subtitle="La mejor tienda de tecnología" className="text-center" />
      <ProductGrid products={products} />
    </>
  );
}
