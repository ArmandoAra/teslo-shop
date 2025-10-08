'use client';
import { ImagesProps, Product } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";
import ProductImage from "@/components/product/product-image/ProductImge";

interface Props {
    product: Product & { ProductImage: ImagesProps[] };
}

export default function ProductGridItem({ product }: Props) {
    const [displayImage, setDisplayImage] = useState(product.ProductImage[0]?.url);

    return (
        <div className='border p-4 rounded-lg fade-in'>
            <Link href={`/product/${product.slug}`}>
                <div
                    onMouseOver={() => setDisplayImage(product.ProductImage[1]?.url || product.ProductImage[0]?.url)}
                    onMouseOut={() => setDisplayImage(product.ProductImage[0]?.url)}
                >
                    <ProductImage
                        src={displayImage}
                        alt={product.title}
                        className='w-auto h-auto object-contain mb-4 rounded-lg'
                        width={200}
                        height={200}
                    />
                </div>
            </Link>
            <Link href={`/products/${product.slug}`} className="hover:text-blue-600 ">
                <h2 className='text-lg font-semibold'>{product.title}</h2>
                <p className='text-gray-600'>${product.price}</p>
            </Link>
        </div>
    );
}

function useffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
