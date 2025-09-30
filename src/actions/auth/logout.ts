"use server";

import { cookies } from "next/headers";
import { signOut } from "../../auth.config";

export async function logout() {
    // Limpia cookies adicionales si las tienes
    const cookieStore = await cookies();
    cookieStore.delete('session');
    cookieStore.delete('authjs.session-token');

    await signOut({
        redirect: true,
        redirectTo: '/auth/login'
    });
}