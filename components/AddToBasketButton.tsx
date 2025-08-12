'use client'

import { Product } from "@/sanity.types"
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

interface AddToBasketButtonProps{
    product: Product;
    disabled?: boolean;
    onAddToCart?: () => void;
}

function AddToBasketButton({ product, disabled, onAddToCart }: AddToBasketButtonProps) {

    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product._id);
    const [quantity, setQuantity] = useState(() => (itemCount > 0 ? itemCount : 1));

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (itemCount > 0) {
            setQuantity(itemCount);
        }
    }, [itemCount]);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        toast.success(`${quantity} × ${product.name} added to cart`, {
            toastId: `add-${product._id}`,
        });
        onAddToCart?.();
    };

    const handleRemoveFromCart = () => {
        for (let i = 0; i < quantity; i++) {
            removeItem(product._id);
        }
        toast.info(`${quantity} × ${product.name ?? 'item'} removed from your cart`, {
            autoClose: 2000,
        });
        onAddToCart?.();
    };

    if(!isClient){
        return null;
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-100 rounded-full p-1">
                <button
                    onClick={decrement}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        quantity <= 1 || itemCount > 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-200"
                    }`}
                    disabled={quantity <= 1 || itemCount > 0}
                >
                    <span className="text-xl font-bold">-</span>
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                    onClick={increment}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        itemCount > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'
                    }`}
                    disabled={itemCount > 0}
                >
                    <span className="text-xl font-bold">+</span>
                </button>
            </div>

            {itemCount > 0 ? (
                <Button
                    onClick={handleRemoveFromCart}
                    disabled={disabled}
                    className="bg-red-500 hover:bg-red-600 text-white w-full"
                >
                    Remove from Cart
                </Button>
            ) : (
                <Button
                    onClick={handleAddToCart}
                    disabled={disabled}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                >
                    Add to Cart
                </Button>
            )}
        </div>
    )
}

export default AddToBasketButton