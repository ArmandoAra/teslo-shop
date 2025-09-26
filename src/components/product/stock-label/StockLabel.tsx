'use client'; //Porque cada vez que se carge quiero pedir el stock
import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import { get } from "http";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

// Recibir el slug para buscar el producto
// Hacer fetch al endpoint que creamos para traer el stock
// Mostrar el stock

export default function StockLabel({ slug }: Props) {
    const [stock, setStock] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getStock();
    }, [slug]);

    const getStock = async () => {
        const data = await getStockBySlug(slug);
        setStock(data);
        setLoading(false);
    }



    return (
        <>
            <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                Stock: {loading ? 'Loading...' : stock > 0 ? `${stock}` : 'Out of stock'}
            </h1>
        </>
    );
}


