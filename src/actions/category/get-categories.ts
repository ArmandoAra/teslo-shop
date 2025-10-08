'use server';

import { auth } from '@/auth.config';
import { Category } from '@/interfaces';
import prisma from '@/lib/prisma';


export const getCategories = async () => {
    const session = auth();
    if (!session) {
        return [];
    }

    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });

        return categories.map(category => ({
            id: category.id,
            name: category.name
        }));

    } catch (error) {
        throw new Error("Failed to fetch categories");
    }

};