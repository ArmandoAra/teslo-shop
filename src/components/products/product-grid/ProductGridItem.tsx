'use client';
import { Product } from "@/interfaces/product.interface";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Props {
    product: Product;
}

export default function ProductGridItem({ product }: Props) {
    const [displayImage, setDisplayImage] = useState(product.images[0]);

    return (
        <div className='border p-4 rounded-lg fade-in'>
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className='w-full object-contain mb-4 rounded-lg'
                    width={500}
                    height={500}
                    onMouseOver={() => setDisplayImage(product.images[1] || product.images[0])}
                    onMouseOut={() => setDisplayImage(product.images[0])}
                />
            </Link>
            <Link href={`/products/${product.slug}`} className="hover:text-blue-600 ">
                <h2 className='text-lg font-semibold'>{product.title}</h2>
                <p className='text-gray-600'>${product.price}</p>
            </Link>
        </div>
    );
}