'use client'

import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types"
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import AddToBasketButton from "./AddToBasketButton";

function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <div className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full relative">
            {/* Product Image */}
            <Link href={`/product/${product.slug?.current}`} className={`block ${isOutOfStock ? 'opacity-50' : ''}`}>
                <div className="relative aspect-square w-full overflow-hidden">
                    {product.image && (
                        <Image
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            src={imageUrl(product.image).url()}
                            alt={product.name || "Product image"}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    )}

                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <span className="text-white font-bold text-sm px-2 py-1 bg-red-500 rounded-md">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/product/${product.slug?.current}`}>
                    <h2 className="text-sm tracking-wide font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                    </h2>
                    <p className="text-gray-500 text-xs mb-1 line-clamp-2 truncate">
                        {product.description
                            ?.map((block) =>
                                block._type === "block"
                                    ? block.children?.map((child) => child.text).join("")
                                    : ""
                            )
                            .join(" ") || "No description available"}
                    </p>
                </Link>

                <div className="mt-auto flex items-end justify-between">
                    <p className="text-md font-bold text-gray-500">
                        £{product.price?.toFixed(2)}
                    </p>

                    {/* Cart Popover */}
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full bg-green-400 hover:bg-green-200"
                                disabled={isOutOfStock}
                            >
                                    <ShoppingCart className="h-4 w-4 text-gray-700" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-4" align="end" sideOffset={10}>
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-900">Add to Cart</h3>
                                <AddToBasketButton product={product} disabled={isOutOfStock} onAddToCart={() => setPopoverOpen(false)} />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default ProductThumb