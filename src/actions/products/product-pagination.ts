'use server'

import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginatedProductsWithImages = async (
    {
        page = 1,
        take = 12,
        gender
    }: PaginationOptions
) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;

    try {
        // Obtener los productos
        // Es mas conveniente usar un Promise.all para hacer las dos consultas al mismo tiempo
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                        id: true,
                        productId: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
            },
            where: {
                gender: gender,
            },
        });

        //Obtener total de paginas
        const totalCount = await prisma.product.count({
            where: {
                gender: gender,
            },
        })
        const totalPages = Math.ceil(totalCount / take);
        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
            }))
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Could not fetch products');
    }


}