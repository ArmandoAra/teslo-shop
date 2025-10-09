'use server';

import prisma from "@/lib/prisma";


export const setTransactionId = async (orderId: string, transactionId: string) => {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { transactionId },
        });

        return {
            success: true,
            message: 'TransactionId saved successfully',
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Error saving transactionId'
        }
    }
}