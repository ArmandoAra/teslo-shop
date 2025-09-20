'use client';
import { useState } from 'react';
interface Props {
    quantity: number;
}

export function QuantitySelector({ quantity }: Props) {
    const [count, setCount] = useState(quantity);

    const increment = () => {
        setCount(prev => Math.min(prev + 1, 5));
    };

    const decrement = () => {
        setCount(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="flex items-center">
            <button onClick={decrement} className="btn-secondary">-</button>
            <span className="mx-2">{count}</span>
            <button onClick={increment} className="btn-secondary">+</button>
        </div>
    );
}