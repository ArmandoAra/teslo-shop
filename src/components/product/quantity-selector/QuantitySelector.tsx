'use client';
interface Props {
    quantity: number;
    stock?: number;
    onQuantityChange?: (quantity: number) => void;
}

export function QuantitySelector({ quantity, stock, onQuantityChange }: Props) {

    return (
        <div className="flex items-center">
            <button onClick={() => {
                if (quantity > 1) onQuantityChange?.(quantity - 1)
            }} className="btn-secondary">-</button>
            <span className="mx-2">{quantity}</span>
            <button onClick={() => {
                if (quantity < (stock ?? 1)) onQuantityChange?.(quantity + 1)
            }} className="btn-secondary">+</button>
        </div>
    );
}