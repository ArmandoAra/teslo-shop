export const revalidate = 60; //60 seconds (esto es para que next haga revalidacion cada 60 segundos y no en cada peticion)

import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { PageTitle } from "@/components";
import Pagination from "@/components/ui/pagination/Pagination";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {

  const params = await searchParams
  const page = params.page ? parseInt(params.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <PageTitle title="Welcome to Teslo Shop" subtitle="La mejor tienda de tecnología" className="text-center" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
