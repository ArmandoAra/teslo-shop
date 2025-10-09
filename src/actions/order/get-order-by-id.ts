'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


export const getOrderById = async (orderId: string) => {

    const session = await auth();

    try {
        if (!session) {
            throw new Error('You must be logged in to view your orders.');
        }
        // Siguiendo el orden de relaciones de la base de datos
        // 1. Order
        // 2. OrderAddress
        // 3. orderItems
        // 4. product
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                OrderAddress: true,
                orderItems: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: { select: { url: true }, take: 1 },
                            }
                        }
                    },
                },
            },
        });

        if (!order) {
            throw new Error('Order not found.');
        }

        if (session.user.role === 'user') {
            if (session.user.id !== order.userId) {
                throw new Error('You do not have permission to view this order.');
            }
        }


        return {
            ok: true,
            order,
        }

    } catch (error) {
        console.log(error);
        redirect('/');
    }
















}