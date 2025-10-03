'use server';

import prisma from "@/lib/prisma";

interface AddressFormData {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
}

const emptyData: AddressFormData = {
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
    rememberAddress: false
};


export const getUserAddress = async (userId: string) => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: { userId }
        });

        if (!address) return emptyData //Devuelve un objeto vacio para no tener problemas con el tipado
        const { address2, countryId, ...rest } = address;

        return {
            ...rest,
            country: countryId,
            address2: address2 ? address2 : ""
        };
    } catch (error) {
        console.log(error);
    }
}