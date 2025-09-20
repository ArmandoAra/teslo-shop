import { MobileProductSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: { slug: string };
}


export default async function ProductPageId({ params }: Props) {
    const { slug } = await params;
    const product = initialData.products.find(p => p.slug === slug);

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
                    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product?.title}</h1>
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