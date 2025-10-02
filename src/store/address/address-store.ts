import { persist } from "zustand/middleware";
import { create } from "zustand/react";

interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
    };

    // Methods
    setAddress: (address: State['address']) => void;

}

const initialData = {
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',

}

export const useAddressStore = create<State>()(
    // El persist guarda el estado en el local storage
    persist(
        (set, get) => ({
            address: initialData,
            // El set es para actualizar el estado
            setAddress: (address) => set({ address })
        }),
        {
            name: 'address-storage', // unique name
        }
    )
)