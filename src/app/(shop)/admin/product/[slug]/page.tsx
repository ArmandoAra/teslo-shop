import { getCategories, getProductBySlug } from "@/actions";
import { PageTitle } from "@/components";
import { get } from "http";
import { redirect } from "next/navigation";
import { ProductForm } from "./ProductForm";

interface Props {
    params: {
        slug: string;
    };
}

export default async function AdminProductPage({ params }: Props) {
    const { slug } = await params;


    // hacer las llamadas en paralelo
    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ]);


    // if (!product) {
    //     redirect('/admin/products');
    // }

    // definiendo la tarea que vamos a realizar
    const title = (slug === 'new') ? 'Create Product' : `Edit Product`;

    return (
        <div className="w-full md:w-5/6 p-4 mb-20">
            <PageTitle title={`${title ?? ""}`} />
            <ProductForm product={product ?? {}} categories={categories} />
        </div>
    );
}