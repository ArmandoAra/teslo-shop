import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default function CategoryPage({ params }: Props) {
    const { id } = params;
    if (id === "kids") {
        notFound();
    }

    return (
        <div className="bg-blue-200">
            <h1>Category Page por id: {id}</h1>
        </div>
    );
}