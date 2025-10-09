'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

export async function deleteProductImage(imageId: number, imageUrl: string) {
    if (!imageId || !imageUrl) {
        return {
            ok: false,
            message: "Could not delete the image"
        };
    }
    // Obtenemos el nombre de la imagen a partir de la URL
    const imageName = imageUrl.split('/').pop()?.split('.')[0];
    if (!imageName) {
        return {
            ok: false,
            message: "Could not delete the image"
        };
    }

    // Usamos la conexion que tiene la imagen con el producto para obtener el productId y revalidar las rutas necesarias
    try {

        try {
            await cloudinary.uploader.destroy(`teslo-shop/${imageName}`)
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
        }

        // Borramos la imagen de la base de datos
        await prisma.productImage.delete({
            where: { id: imageId },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        }).then((slug) => {
            // Revalidamos las rutas necesarias usando el slug
            revalidatePath(`/admin/product/${slug}`);
            revalidatePath('/admin/products');
            revalidatePath(`/product/${slug}`);
        });


        return {
            ok: true,
            message: "Image deleted successfully"
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: "Could not delete the image"
        };
    }
}

