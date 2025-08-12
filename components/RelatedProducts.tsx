'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/sanity.types';
import ProductThumb from '@/components/ProductThumb';
import { createClient, type SanityClient } from 'next-sanity';

const client: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  useCdn: true,
})

type CategoryIdRef = { _id?: string; _ref?: string };
type MinimalProduct = Pick<Product, '_id' | 'name' | 'slug' | 'image' | 'price' | 'stock'> & {
  categories?: CategoryIdRef[];
};

const getCategoryId = (c: CategoryIdRef | null | undefined): string | null =>
  c?._id ?? c?._ref ?? null;

const isNonNullString = (x: string | null): x is string => x !== null;

export default function RelatedProducts({
  current,
  pool,
  limit = 4,
}: {
  current: MinimalProduct;
  pool?: MinimalProduct[];
  limit?: number;
}) {
  const [all, setAll] = useState<MinimalProduct[] | null>(pool ?? null);

  // Optional client-side fetch if no pool was provided
  useEffect(() => {
    if (!all && client) {
      client
        .fetch<MinimalProduct[]>(
          `*[_type=="product"]{
            _id, name, slug, image, price, stock,
            "categories": categories[]->{_id}
          }`
        )
        .then(setAll)
        .catch(() => setAll([]));
    }
  }, [all]);

  const related = useMemo(() => {
    if (!all) return [];
    const curIds = new Set(
      (current.categories ?? [])
        .map(getCategoryId)
        .filter(isNonNullString)
    );

    // Score by category overlap, then randomize
    const scored = all
      .filter((p) => p._id !== current._id)
      .map((p) => {
        const ids = (p.categories ?? [])
          .map(getCategoryId)
          .filter(isNonNullString);
        const overlap = ids.reduce<number>((acc, id) => acc + (curIds.has(id) ? 1 : 0), 0);
        return { p, overlap };
      })
      .sort((a, b) => (b.overlap - a.overlap) || (Math.random() - 0.5));

    // Take a slightly larger top slice, shuffle again, then keep `limit`
    return scored
      .slice(0, Math.max(limit * 2, limit))
      .sort(() => Math.random() - 0.5)
      .slice(0, limit)
      .map((s) => s.p);
  }, [all, current._id, current.categories, limit]);

  if (!related.length) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Customers also bought</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((p) => (
          <ProductThumb key={p._id} product={p as Product} />
        ))}
      </div>
    </section>
  );
}
