'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersPagination = async () => {

    const session = await auth();

    if (session?.user.role !== 'admin') return { ok: false, message: 'You must be Admin.', order: null };

    try {
        const order = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return { ok: true, order };
    } catch (error) {
        console.error('Error fetching order by user:', error);
        return { ok: false, order: null };
    }
};


