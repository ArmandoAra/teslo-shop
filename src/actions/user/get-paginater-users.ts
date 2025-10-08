'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ok } from "assert";


export const getPaginaterUsers = async () => {
    const session = await auth();
    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Unauthorized'
        }
    }

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return {
        ok: true,
        users
    }

}