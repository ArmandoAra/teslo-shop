'use client'

import { loginAfterRegister, registerUser } from "@/actions";
import clsx from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setError(null);
        const { name, email, password, confirmPassword } = data;


        // Server action to create a new user would go here
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const result = await registerUser(
            name,
            email.toLowerCase(),
            password
        );
        if (!result.ok) {
            setError(result.message);
            return;
        }
        // Aqui sabemos que todo ha ido bien y logueamos el usuario despues de creado
        const loginResult = await loginAfterRegister(email.toLowerCase(), password);
        if (!loginResult.ok) {
            setError(loginResult.message);
            return;
        }
        // Redirigir a la pagina de perfil o a la home usando el replace de window.location
        //  para recargar toda la app y que next-auth cargue el nuevo estado del usuario
        window.location.replace('/')
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="name">Name</label>
            <input
                autoFocus
                placeholder='John Doe'
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        { 'border-red-500': errors.name })
                }
                type="text"
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Email</label>
            <input
                placeholder='example@correo.com'
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        { 'border-red-500': errors.email })
                }
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />


            <label htmlFor="password">Password</label>
            <input
                placeholder='********'
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        { 'border-red-500': errors.password })
                }
                type="password"
                {...register('password', { required: true })}
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
                placeholder='********'
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        { 'border-red-500': errors.confirmPassword })
                }
                type="password"
                {...register('confirmPassword', { required: true })}
            />

            {
                error &&
                <p className="text-red-500 mb-5">{error}</p>
            }

            <button
                type="submit"
                className="btn-primary">
                Create
            </button>



        </form>
    )
}

