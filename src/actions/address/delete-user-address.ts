'use server'

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {
        await prisma.userAddress.delete({
            where: { userId }
        });
    } catch (e) {
        // Al no haber serleccionado para salvar la direccion, puede que no exista ninguna direccion para eliminar y eso genera un error
        return {
            ok: false,
            message: 'Error deleting address' + e
        }
    }
}