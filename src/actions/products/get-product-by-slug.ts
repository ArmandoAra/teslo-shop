'use server';

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            },
            where: { slug }
        });
        if (!product) return null;

        const { ProductImage, ...rest } = product; //Exclude ProductImage from the rest of the product fields


        return {
            ...rest,
            images: ProductImage.map(img => img.url)
        }
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        throw new Error("Could not fetch product");
    }
}