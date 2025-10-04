'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByUser = async () => {

    const session = await auth();

    if (!session) return { ok: false, message: 'You must be logged in to view your orders.', order: null };

    const userId = session.user.id;
    try {
        const order = await prisma.order.findMany({
            where: {
                userId
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


