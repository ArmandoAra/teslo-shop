'use server';

import { auth } from "@/auth.config";
import type { AddressData, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productsToOrder: ProductToOrder[], address: AddressData) => {
    // Para guardar en base de datos necesitamos el userId y no lo vamos a tener en el cliente, lo vamos a sacar del auth auth.config
    const session = await auth();
    if (!session?.user) {
        // realizando verificaciones extras
        throw new Error('User not authenticated');
    }

    // Obtener los productos
    //Nota: Pueden haber dos productos iguales pero de distinto tamaño (mismo productId pero distinto size)
    const products = await prisma.product.findMany({
        // Buscar en db los productos que esten en el carrito por el id
        where: {
            id: { in: productsToOrder.map(p => p.productId) }
        }
    });

    // Cantidad de productos
    const numberOfItems = productsToOrder.reduce((prev, current) => current.quantity + prev, 0);

    // Calcular los montos  
    const { subTotal, tax, total } = productsToOrder.reduce((prev, current) => {
        const product = products.find(p => p.id === current.productId);
        const productQuantity = current.quantity;
        if (!product) {
            throw new Error('Product not found: ' + current.productId);
        }

        const currentTotal = product.price * productQuantity;

        prev.subTotal += currentTotal;
        prev.tax = Math.round(prev.subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0));
        prev.total = prev.subTotal + prev.tax;

        return prev;
    }, { subTotal: 0, tax: 0, total: 0 });
    try {
        //Crear la transaccion a la base de datos(Se graban las inserciones en tres tablas)
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. Actualizar el stock de los productos
            const updatedProductsPromises = productsToOrder.map(async (p) => {
                // Acumular la cantidad de productos
                const productQuantity = products.filter(
                    prod =>
                        prod.id === p.productId).reduce(
                            (prev, current) =>
                                prev + current.inStock, 0);
                if (productQuantity === 0) {
                    throw new Error('Product Id has not quantity');
                }


                // Actualizar el stock
                return await tx.product.update({
                    where: { id: p.productId },
                    // Disminuir el stock que esta en la base de datos
                    data: {
                        inStock: {
                            decrement: p.quantity
                        }
                    }
                });
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);
            // Validar que ningun producto se haya quedado sin stock
            updatedProducts.forEach(p => {
                if (p.inStock < 0) {
                    throw new Error(`Product ${p.title} is out of stock`);
                }
            });



            //2. Crear la orden _ Encabezado _ Detalle
            const order = await tx.order.create({
                data: {
                    userId: session.user.id,
                    itemsInOrder: numberOfItems,
                    subTotal,
                    tax,
                    total,
                    orderItems: {
                        createMany: {
                            data: productsToOrder.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(prod => prod.id === p.productId)?.price || 0,
                            }))
                        }
                    },
                }
            });

            // Validar que el price no sea cero
            const orderItemsWithPriceZero = await tx.orderItem.findMany({
                where: {
                    orderId: order.id,
                    price: 0,
                }
            });
            if (orderItemsWithPriceZero.length > 0) {
                throw new Error('One or more items have price zero');
            }


            // 3. Crear la direccion de la orden
            const { country, ...addressWithoutCountry } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...addressWithoutCountry,
                    countryId: country,
                    orderId: order.id,
                }
            });


            return {
                order,
                updatedProducts,
                orderAddress
            }
        });
        return {
            ok: true,
            message: 'Order placed successfully',
            orderId: prismaTx.order.id,
            prismaTx
        }
    } catch (error) {
        return {
            ok: false,
            message: (error as { message: string }).message || 'Error placing order'
        }
    }
}


// NOTA: Aqui vamos a hacer Transacciones multiples inserciones en distintas tablas y si una falla: se revierte todo ejemplo:
//Cuando se hace una orden el producto tiene un stock de 10 y se venden 3, entonces el stock queda en 7, pero si ya otro usuario compro
//y el producto se acabo, entonces la orden no se puede completar y se revierte todo.
// Todo lo que hagamos dentro de la transaccion si algo falla se revierte todo.