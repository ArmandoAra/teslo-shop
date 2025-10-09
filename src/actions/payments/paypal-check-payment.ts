'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function paypalChekPayment(transactionId: string) {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';
    const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

    const body = new URLSearchParams('grant_type=client_credentials');

    // Obtener el access token
    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        cache: 'no-store', // Evitar cache
        method: 'POST',
        headers: {
            Authorization: `Basic ${base64Token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });
    if (!tokenRes.ok) {
        return {
            success: false,
            message: 'Error al obtener el token de PayPal',
        };
    }
    const { access_token } = await tokenRes.json();

    // Verificar el pago
    const orderRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${transactionId}`, {
        cache: 'no-store', // Evitar cache
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    if (!orderRes.ok) {
        return {
            success: false,
            message: 'Error al obtener la orden de PayPal',
        };
    }
    const { status, purchase_units } = await orderRes.json();
    const orderId = purchase_units[0].invoice_id; //Esta viene del invoice_id que enviamos a paypal al crear la orden

    // Verificar que la orden de paypal coincida con la orden de nuestra base de datos

    if (status !== 'COMPLETED') {
        return {
            success: false,
            message: 'La orden no está completada',
        };
    }

    // Ralizar las acciones necesarias en la base de datos
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { isPaid: true, paidAt: new Date() },

        });

        // Revalidar un Path (para asegurarnos que next se entere de los cambios)
        revalidatePath('/orders/' + orderId);
        return {
            success: true,
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Error al actualizar la orden en la base de datos'
        };
    }

}