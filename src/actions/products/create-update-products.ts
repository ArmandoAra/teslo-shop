'use server';
import { Gender, Size } from "@/generated/prisma";
import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from 'cloudinary';
import { the } from '../../../.next/types/validator';

cloudinary.config(process.env.CLOUDINARY_URL || ''); // Configurar Cloudinary con la variable de entorno

const productSchema = z.object({
    id: z.uuid().optional().nullable(),
    title: z.string().min(3).max(260),
    slug: z.string().min(3).max(260).transform(val => val.toLowerCase().trim()),
    description: z.string(),

    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),

    categoryId: z.uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.enum(Gender)

});

export const createOrUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const parsedData = productSchema.safeParse(data);
    if (!parsedData.success) {
        return {
            ok: false,
            error: parsedData.error
        }
    }
    const product = parsedData.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();
    const { id, ...productData } = product;
    try {
        // Hacemos el envio de los datos con transaction, porque hay mas de una cosa que actualizar
        // y si una de las dos falla, no queremos que se haga la otra
        //Como mandar tambien a guardar las imagenes
        const prismaTx = await prisma.$transaction(async (tx) => {

            let product: Product;
            const tagsArray = productData.tags.split(',').map(tag => tag.trim().toLowerCase()).flatMap(tag => tag.split(' '));

            if (id) { //Update
                product = await tx.product.update({
                    where: { id },
                    // la data se va a quejar porque sizes y tags son arrays y no se pueden actualizar directamente
                    data: {
                        ...productData,
                        sizes: {
                            set: productData.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        },

                    }
                });
            } else { //Create
                product = await tx.product.create({
                    data: {
                        ...productData,
                        sizes: { set: productData.sizes as Size[] },
                        tags: { set: productData.tags ? tagsArray : [] },
                        // El slug debe ser unico
                        slug: productData.slug + '-' + Date.now().toString()
                    }
                });
            }

            // Proceso de las imagenes
            if (formData.getAll('images')) {
                // Array.from(formData.getAll('images')).forEach(image => {
                //     formData.append('images', image);
                // });
                const imgs = formData.getAll('images');
                // Aqui vamos a esperar los urls de las imagenes para guardarlas en la base de datos
                const images = await uploadImages(imgs as File[]);
                if (!images) throw new Error('Error uploading images');
                // Guardar las imagenes en la base de datos
                await tx.productImage.createMany({
                    data: images.map(image => ({
                        url: image,
                        productId: product.id
                    }))
                });
            }

            return { product }
        });

        // Revalidar los paths
        // Path de la pagina de admin de productos
        // Path de la pagina del producto en admin
        // Path de la pagina del producto en tienda
        // Si el slug ha cambiado, revalidar el path antiguo tambien
        if (!prismaTx.product) throw new Error('Product not found');
        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/product/${product.slug}`);


        return {
            ok: true,
            product: prismaTx.product
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: 'Error al crear/actualizar el producto'
        }

    }


    // TODO: revalidar el path


    return {
        ok: true
    }
}

const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                    folder: 'teslo-shop'
                }).then(result =>
                    result.secure_url);

            } catch (error) {
                console.log('Error uploading image:', error);
                return null;
            }
        });

        const imageUrls = await Promise.all(uploadPromises); //Debe retornar un array de strings o null
        return imageUrls.filter(url => url !== null); // Filtrar los nulls por si alguna imagen no se ha podido subir

    } catch (error) {
        console.log(error);
        return null;
    }
}