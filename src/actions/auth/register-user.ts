'use server'


import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const registerUser = async (name: string, email: string, password: string) => {
    console.log({ name, email, password });
    // Here would be the logic to register the user, e.g., calling an API or database operation
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password),
            },
            // En realidad solo necesitamos el id porque el nombre y el email ya los tenemos en el formulario
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        return {
            ok: true,
            user,
            message: 'User registered successfully'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error registering user'
        }

    }
}