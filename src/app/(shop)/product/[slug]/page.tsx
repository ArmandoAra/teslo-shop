export const revalidate = 10080; // 7 days// Cada 7 dias se vuelve a generar la pagina con la nueva informacion de la base de datos

import { getProductBySlug } from "@/actions";
import { MobileProductSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import StockLabel from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

type MetadataProps = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug

    // fetch post information
    const product = await getProductBySlug(slug)

    return {
        title: product ? `${product.title} | Teslo Shop` : 'Teslo Shop',
        description: product?.description ?? 'Teslo Shop - The best products',
        openGraph: {
            title: product ? `${product.title} | Teslo Shop` : 'Teslo Shop',
            description: product?.description ?? 'Teslo Shop - The best products',
            //   url: `https://teslo-shop.vercel.app/product/${product?.slug}`, ejemplo, seria el url de produccion
            images: [`/products/${product?.images[1]}`]
        }
    }
}


export default async function ProductPageId({ params }: Props) {
    const { slug } = await params;
    const product = await (await import('@/actions')).getProductBySlug(slug);


    if (!product) {
        notFound();
    }

    return (
        <div className="bg-blue-200 w-full min-h-screen  justify-items-center">
            <div className=" mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-5/6 lg:w-2/3 ">
                {/* Slideshow */}
                <div className="col-span-1 md:col-span-2">
                    {/* Mobile Slideshow */}
                    <MobileProductSlideshow
                        images={product?.images}
                        title={product?.title}
                        className="md:hidden"
                    />

                    {/* Desktop Slideshow  */}
                    <ProductSlideshow
                        images={product?.images}
                        title={product?.title}
                        className="hidden md:block"
                    />


                </div>

                {/* Detalles */}
                <div className="col-span-1 p-4 md:p-0">
                    {/* In Stock */}
                    <StockLabel slug={product?.slug} />
                    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                        {product?.title}
                    </h1>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Price:</span> ${product?.price}</p>
                    {/* Selector de tallas */}
                    <SizeSelector
                        availableSizes={product?.sizes}
                        selectedSize={product?.sizes[0]}
                    />

                    {/* Selector de cantidad */}
                    <QuantitySelector quantity={2} />

                    <button className="btn-primary mt-4 w-full">
                        Add to Cart
                    </button>

                    <h3 className="mt-6 font-semibold">Description</h3>
                    <p className="text-gray-600 font-light">{product?.description}</p>
                </div>
            </div>
        </div>
    );
}