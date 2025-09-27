import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes?: Size[];
    onSelectedSize?: (size: Size) => void;
}

export function SizeSelector({ selectedSize, availableSizes, onSelectedSize }: Props) {


    return (
        <div className="my-5">
            <h3 className="font-semibold mb-2">Available Sizes</h3>
            <div id="size" className="mt-1 flex ">
                {availableSizes?.map(size => (
                    <button
                        className={
                            clsx(
                                "h-10 w-10 rounded-md border mr-1  hover:bg-blue-500 hover:text-white transition",
                                { "bg-blue-500 text-white": selectedSize === size },
                                { "bg-transparent text-black": selectedSize !== size }
                            )
                        }
                        key={size}
                        value={size}
                        onClick={() => onSelectedSize?.(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}