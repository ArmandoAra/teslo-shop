'use client';
import { authenticate } from '@/actions/auth/login';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { IoInformationOutline } from 'react-icons/io5';



export default function LoginForm() {
    const router = useRouter();
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);


    useEffect(() => {
        if (errorMessage === "success") {
            window.location.replace('/')
            // router.replace('/')
        }

        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [errorMessage, router]);

    return (
        <form action={formAction} className="flex flex-col">

            <label htmlFor="email">Email</label>
            <input
                placeholder='example@correo.com'
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name='email'
                required
            />


            <label htmlFor="password">Password</label>
            <input
                placeholder='********'
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name='password'
                required
            />
            <div
                className="flex h-8 items-end space-x-1 mb-4"
                aria-live="polite"
                aria-atomic="true"
            >
                {(errorMessage && errorMessage !== "success") && (
                    <>
                        <IoInformationOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>

            <PendingButton pending={isPending} />


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Create new account
            </Link>


        </form>
    );
}

// Manejo del estado pendiente en el botón de envío
function PendingButton({ pending }: { pending: boolean }) {
    return (
        <button
            type='submit'
            className={clsx({
                'btn-primary': !pending,
                'btn-disabled': pending,
            }
            )}
            disabled={pending}
        >
            {pending ? 'Logging in...' : 'Login'}
        </button>
    );
}