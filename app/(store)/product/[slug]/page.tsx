import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft} from "lucide-react";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductThumb from "@/components/ProductThumb";

export const dynamic = "force-static";
export const revalidate = 60;

function sample<T>(arr: T[], n: number): T[] {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    const allProducts = await getAllProducts();
    const candidates = allProducts.filter((p) => p._id !== product._id);
    const alsoBought = candidates.length <= 4 ? candidates : sample(candidates, 4);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center text-sm text-gray-600 mb-6">
                    <Link href="/products" className="hover:text-green-600 flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Products
                    </Link>
                </div>

                {/* Product Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                        {/* Product Image */}
                        <div className="space-y-4">
                            <div className={`relative aspect-square w-full rounded-lg overflow-hidden ${isOutOfStock ? 'opacity-70' : ''}`}>
                                {product.image && (
                                    <Image
                                        src={imageUrl(product.image).url()}
                                        alt={product.name ?? "Product image"}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                )}
                                {isOutOfStock && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <span className="text-white font-bold px-4 py-2 bg-red-500 rounded-md">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    {product.name || "Medication"}
                                </span>
                            </div>

                            <h1 className="text-xl font-bold text-gray-900 mb-3">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">(24 reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="text-xl font-bold text-green-600 mb-6">
                                £{product.price?.toFixed(2)}
                            </div>

                            {/* Description */}
                            <div className="prose max-w-none text-gray-700 mb-8">
                                {Array.isArray(product.description) && (
                                    <PortableText value={product.description} />
                                )}
                            </div>

                            {/* Add to Cart */}
                            <div className="mt-auto">
                                <AddToBasketButton
                                    product={product}
                                    disabled={isOutOfStock}
                                />
                                {isOutOfStock && (
                                    <p className="text-sm text-gray-500 mt-3">
                                        Get notified when this product is back in stock
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Sections */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex">
                                <span className="font-medium w-32">SKU:</span>
                                <span>{product._id.slice(0, 8)}</span>
                            </div>
                            <div className="flex">
                                <span className="font-medium w-32">Dosage:</span>
                                <span>As prescribed</span>
                            </div>
                            <div className="flex">
                                <span className="font-medium w-32">Storage:</span>
                                <span>Store in cool, dry place</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Info</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Same-day dispatch if ordered before 2pm</span>
                            </div>
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span>Free delivery on orders over £50</span>
                            </div>
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span>Discreet packaging for all orders</span>
                            </div>
                        </div>
                    </div>
                </div>
                {alsoBought.length > 0 && (
                    <section className="mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Customers also bought</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {alsoBought.map((p) => (
                                <ProductThumb key={p._id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default ProductPage