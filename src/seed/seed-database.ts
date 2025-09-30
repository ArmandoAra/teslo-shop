import { initialData } from './seed.js';
import prisma from '../lib/prisma';

//Run: npx tsx src/seed/seed-database.ts
// Script to seed the database with initial data
//Reconstruye la base de datos desde cero en modo de  desarrollo
//Elimina todos los datos y los vuelve a crear
async function main() {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('No se puede ejecutar en producción');
    }

    await Promise.all([
        // Seccion de usuarios
        await prisma.user.deleteMany(),
        // Seccion de productos
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany(),
    ])

    const { categories, products, users } = initialData;

    const categoriesData = categories.map(category => ({
        name: category,
    }))

    // Users
    await prisma.user.createMany({
        data: users
    });

    // Categories
    await prisma.category.createMany({
        data: categoriesData
    })

    // //Obtengo las categorias de la base de datos
    const dbCategories = await prisma.category.findMany();

    // // Formateo las categorias en un mapa con el nombre y el id
    const categoriesMap = dbCategories.reduce((
        mapa: {
            [key: string]: string
        },
        category: {
            id: string;
            name: string
        }) => {
        mapa[category.name.toLowerCase()] = category.id;
        return mapa;
    }, {} as Record<string, string>);

    // Products
    products.forEach(async product => {
        const { type, images, ...rest } = product;
        const createdProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            }
        })

        //Images
        const imagesData = images.map(image => ({
            url: image,
            productId: createdProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });
    })
    console.log('Database seeded successfully');
}

// Funcion anonima autoejecutable
(() => {
    main();
})();