'use client'

import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";
import { Button } from "./ui/button";
import { useState } from 'react';

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // items per page
    const totalPages = Math.ceil(products.length / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

    return (
        <div className="flex flex-col md:flex-row gap-8 py-2">
            {/* Categories Sidebar */}
            <div className="w-full md:w-64 shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                    <h3 className="font-medium text-gray-700 mb-4">Categories</h3>
                    <CategorySelectorComponent categories={categories} />
                </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
                {/* Sorting Controls */}
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-600">
                        Showing {products.length} products
                    </div>
                </div>

                <ProductGrid products={paginatedProducts} />

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                                variant={i + 1 === currentPage ? 'success' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </Button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ProductsView