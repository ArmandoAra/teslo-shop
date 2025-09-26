import type { Metadata } from "next";

import "@/styles/globals.css";
import { inter } from "@/config/fonts";


// El template va a definir como queremos que se vea una parte de todas nuestras rutas
export const metadata: Metadata = {
  title: {
    default: "Teslo Shop",
    template: "%s | Teslo Shop",
  },
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
