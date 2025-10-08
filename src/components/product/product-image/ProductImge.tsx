import Image from "next/image";
import React from "react";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className']; //Ayuda con las clases de tailwind
    width: number;
    height: number;
}

// Componente para mostrar la imagen del producto en todos los productos de la app
export default function ProductImage({ src, alt, className, width, height }: Props) {

    const customSrc = (src)
        ? src.startsWith('http') // url completa de imagen
            ? src
            : `/products/${src}`
        : '/imgs/placeholder.jpg';

    return (
        <Image
            src={customSrc}
            alt={alt}
            width={width}
            height={height}
            className={`rounded-md w-20 h-20 object-cover ${className}`}
            priority
        />
    );
}