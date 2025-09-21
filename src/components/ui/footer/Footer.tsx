import Link from "next/link";




export function Footer() {
    return (
        <footer className="bg-black text-white p-4 text-center flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
            <Link href="/">
                <span>Teslo</span>
                <span> | Shop</span>
                <p>© 2024 Teslo Shop. All rights reserved. </p>
                <span>{new Date().getFullYear()}</span>
            </Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
        </footer>
    );
}