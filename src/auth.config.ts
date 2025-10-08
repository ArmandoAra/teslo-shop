import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { z } from 'zod';

const authenticatedRoutes = ['/checkout/address', '/checkout/summary', '/orders', '/profile'];// ejemplo de rutas que requieren autenticación
const adminRoutes = ['/admin/users', '/admin', '/admin/orders', '/admin/products', '/admin/products/[slug]'];// ejemplo de rutas que requieren autenticación

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    // Usamos los callbacks para modificar el JWT y la session (params),Cuando iniciamos session el jwt recibe por parametros el token 
    // y el user que viene de providers y debemos pasar el user al token para que este disponible en la session
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = authenticatedRoutes.includes(nextUrl.pathname);
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                // return Response.redirect('/auth/login?callbackUrl=' + encodeURIComponent(nextUrl.pathname));
                // Redirect unauthenticated users to login page
                return Response.redirect(new URL('/auth/login?callbackUrl=' + encodeURIComponent(nextUrl.pathname), nextUrl));
            } else if (isLoggedIn) {
                if (adminRoutes.includes(nextUrl.pathname) && auth?.user.role !== 'admin') {
                    return Response.redirect(new URL('/', nextUrl));
                }
                // return Response.redirect(new URL('/checkout/address', nextUrl));
                return true
            }
            return true;
        },

        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },

        session({ session, token }) {
            session.user = token.data as typeof session.user;
            return session;
        }
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    throw new Error('Invalid credentials');
                }

                const { email, password } = parsedCredentials.data;

                //   Buscar el correo 
                const user = await prisma.user.findUnique({
                    where: { email: email.toLowerCase() }
                });

                if (!user) return null; //No existe el usuario
                if (!bcrypt.compareSync(password, user.password)) return null; //Contraseña incorrecta

                //Retornar el usuario
                const { password: _unused, ...userWithoutPassword } = user;
                return userWithoutPassword;
            },
        }),
    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth({
    ...authConfig,
    events: {
        signOut: async () => {
            (await cookies()).delete('authjs.session-token');
            (await cookies()).delete('authjs.csrf-token');
            (await cookies()).delete('__next_hmr_refresh_hash__');
            (await cookies()).delete('authjs.callback-url');

        }
    }
});
//Los handles van a tener los metodos para manejar las peticiones get y post
// /api/auth/[...nextauth]/route.ts