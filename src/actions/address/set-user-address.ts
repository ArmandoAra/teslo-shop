'use server';

import type { AddressData } from "@/interfaces";
import prisma from "@/lib/prisma";

// La relacion es de uno a uno , si tenemos un registro lo vamos a actualizar
// Si no tenemos ningun registro lo vamos a crear
export const setUserAddress = async (
    userId: string,
    address: AddressData
) => {

    try {
        const newAddress = await createOrReplaceUserAddress(userId, address);
        return {
            ok: true,
            address: newAddress
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error saving address'
        }
    }
}


const createOrReplaceUserAddress = async (
    userId: string,
    address: AddressData) => {
    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: { userId }
        })

        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city
        }

        if (!storedAddress) {
            // Crear
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })
            return newAddress;
        } else {
            // Actualizar
            const updatedAddress = await prisma.userAddress.update({
                where: { userId },
                data: addressToSave
            })
            return updatedAddress;
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error saving address'
        }

    }


}
