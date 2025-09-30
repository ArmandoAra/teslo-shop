import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black text-white p-4 text-center flex flex-col md:flex-row justify-center  items-center gap-2">
            <Link href="/">
                <span>Teslo</span>
                <span> | Shop</span>
                <p>© 2024 Teslo Shop. All rights reserved. </p>
                <span>{new Date().getFullYear()}</span>
            </Link>
        </footer>
    );
}