import type { Metadata } from "next";

import "@/styles/globals.css";
import { inter } from "@/config/fonts";



export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "E-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
