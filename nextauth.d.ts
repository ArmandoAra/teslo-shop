// Archivo de definiciones de tipos personalizado para NextAuth, Este archivo extiende los tipos predeterminados de NextAuth para incluir el campo 'role' en el objeto 'user' dentro de la sesión.
import { DefaultSession } from 'next-auth';


declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified?: boolean | Date | null;
            role: 'admin' | 'user';
            image?: string;
        } & DefaultSession['user'];
    }
}