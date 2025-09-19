import { titleFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}


export default function PageTitle({ title, subtitle, className }: Props) {
    return (
        <div className={`mt-3 ${className}`}>
            <h1 className={`text-4xl font-bold antialiased my-10 ${titleFont.className}`}>{title}</h1>
            {subtitle && <h2 className="text-lg text-gray-600">{subtitle}</h2>}
        </div>
    );
}