'use client'

import { Product } from "@/sanity.types"
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps{
    product: Product;
    disabled?: boolean;
}

function QuantityStepper({ product, disabled }: AddToBasketButtonProps) {

    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product._id);

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if(!isClient){
        return null;
    }

    return (
        <div className="inline-flex items-center rounded-xl border bg-background">
            <button
                onClick={() => removeItem(product._id)}
                className={`px-3 py-2 text-sm disabled:opacity-50 ${
                    itemCount === 0
                        ? "cursor-not-allowed"
                        : "hover:text-green-600 cursor-pointer"
                }`}
                disabled={itemCount === 0 || disabled}
            >
                <span className={`${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>
                    -
                </span>
            </button>
            <div className="min-w-10 text-center text-sm font-medium">{itemCount}</div>
            <button
                onClick={() => addItem(product)}
                className={`px-3 py-2 text-sm disabled:opacity-50 ${
                    disabled
                        ? "cursor-not-allowed"
                        : "hover:text-green-600 cursor-pointer"
                }`}
                disabled={disabled}
            >
                <span className="">+</span>
            </button>
        </div>
    )
}

export default QuantityStepper