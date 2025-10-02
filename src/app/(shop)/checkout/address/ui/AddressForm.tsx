'use client';
import { deleteUserAddress, setUserAddress } from '@/actions';
import { Country } from '@/interfaces';
import { useAddressStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface AddressFormData {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
}

interface Props {
    countries: Country[];
    userStoredAddress?: Partial<AddressFormData>; //El Partial es para que todas las propiedades sean opcionales
}

export default function AddressForm({ countries, userStoredAddress }: Props) {
    const router = useRouter();
    // El reset es para resetear el formulario(Puede ser util para cargar datos guardados)
    const { register, handleSubmit, formState: { isValid }, reset } = useForm<AddressFormData>({
        // Se utiliza para establecer los valores predeterminados del formulario(register)
        defaultValues: {
            // viene de la base de datos
            ...userStoredAddress,
            rememberAddress: false
        }
    });
    // Obteniendo el Id de la sesion
    const { data: session } = useSession({
        required: true, //Por si no hay sesion, redirigir al login
        onUnauthenticated() {
            //Redirigir al login
            window.location.href = '/auth/login?p=/checkout/address';
        }
    });

    // Utilizando Zustand
    const { setAddress } = useAddressStore(); //Escribir la direccion en el store
    const address = useAddressStore(state => state.address); //Leer la direccion del store

    useEffect(() => {
        // Si tenemos datos en el store, los cargamos en el formulario
        if (address.firstName) {
            reset({
                ...address, rememberAddress: false
            });
        }
    }, [address, reset]);


    const onSubmit = async (data: AddressFormData) => {
        console.log(data);

        setAddress(data);
        const { rememberAddress, ...address } = data;

        if (data.rememberAddress && session?.user) {
            // Guardar en la base de datos
            await setUserAddress(session.user.id, address);
        } else {
            // eliminar de la base de datos si existe
            await deleteUserAddress(session!.user.id);
        }

        router.push('/checkout')
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>Name</span>
                <input
                    type="text"
                    placeholder='Name'
                    autoFocus

                    {...register("firstName", { required: true, minLength: 2 })}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Surname</span>
                <input
                    type="text"
                    placeholder='Surname'
                    {...register("lastName", { required: true, minLength: 2 })}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Address</span>
                <input
                    type="text"
                    placeholder='Street Address'
                    {...register("address", { required: true, minLength: 5 })}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Address 2 (optional)</span>
                <input
                    type="text"
                    placeholder='Apartment, suite, etc. (optional)'
                    {...register("address2")}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                />
            </div>


            <div className="flex flex-col mb-2">
                <span>Postal Code</span>
                <input
                    type="text"
                    placeholder='Postal Code'
                    {...register("postalCode", { required: true, minLength: 5 })}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>City</span>
                <input
                    type="text"
                    placeholder='City'
                    {...register("city", { required: true, minLength: 2 })}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Country</span>
                <select
                    title='Country'
                    {...register("country", { required: true })}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                >
                    <option value="">[ Seleccione ]</option>
                    {countries.map((country) => (
                        <option
                            key={country.id}
                            value={country.id}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col mb-2">
                <span>Tel.</span>
                <input
                    type="tel"
                    placeholder='Phone'
                    {...register("phone", { required: true, minLength: 8, pattern: /^[0-9]+$/ })}
                    className="p-2 border rounded-md bg-gray-200 border-blue-400"
                />
            </div>

            <div className="inline-flex items-center mb-10">
                <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox"
                >
                    <input
                        type="checkbox"
                        placeholder='Save my address'
                        {...register("rememberAddress")}
                        className="border-blue-400 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        id="checkbox"
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </label>
                <span>Remember my address</span>
            </div>


            <div className="flex flex-col mb-2 sm:mt-10 items-end">

                <button
                    type="submit"
                    className={
                        clsx(
                            "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed",
                            { 'opacity-50 cursor-not-allowed': !isValid }
                        )
                    }
                    disabled={!isValid}>
                    Siguiente
                </button>
            </div>
        </form>
    );
}