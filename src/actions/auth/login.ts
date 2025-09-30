'use server';

import { signIn } from '../../auth.config';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            redirect: false,
            ...Object.fromEntries(formData),
        });
        return "success";

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CallbackRouteError':
                    return 'Invalid credentials.';
                case 'CredentialsSignin':
                    return 'Error signing in with credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

// Creando otro server action para registrar el usuario despues de creado en register-user.ts
export async function loginAfterRegister(email: string, password: string) {
    try {
        await signIn('credentials', {
            email,
            password,
        });
        return {
            ok: true,
            message: 'User logged in successfully'
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CallbackRouteError':
                    return { ok: false, message: 'Invalid credentials.' };
                case 'CredentialsSignin':
                    return { ok: false, message: 'Error signing in with credentials.' };
                default:
                    return { ok: false, message: 'Something went wrong.' };
            }
        }
        throw error;
    }
}