'use client';

import React, { useState, useMemo } from 'react';
import type { Category, Product } from '@/sanity.types';
import ProductGrid from './ProductGrid';
import { Button } from './ui/button';
import ClientCategorySelector from './ClientCategorySelector';

interface ClientProductsViewProps {
  products: Product[];
  categories: Category[];
}

export default function ClientProductsView({ products, categories }: ClientProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 12;

  // Filter products by selected category
  const filtered = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) =>
      Array.isArray(p.categories) &&
      p.categories.some((c) => c._ref === selectedCategory)
    );
  }, [products, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4 space-y-4">
          <div>
            <ClientCategorySelector
              categories={categories}
              selectedId={selectedCategory}
              onSelect={(id) => {
                setSelectedCategory(id);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <ProductGrid products={paginated} />

        {/* Pagination */}
        <div className="mt-8 flex justify-center space-x-2">
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
              variant={i + 1 === currentPage ? 'default' : 'outline'}
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
        </div>
      </div>
    </div>
  );
}
