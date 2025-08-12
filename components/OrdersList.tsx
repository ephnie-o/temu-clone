'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatCurrency';
import { imageUrl } from '@/lib/imageUrl';
import type { getMyOrders } from '@/sanity/lib/orders/getMyOrders';

type Orders = Awaited<ReturnType<typeof getMyOrders>>;
type Order = Orders[number];

export default function OrdersList({ orders }: { orders: Order[] }) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [orders, page]);

  return (
    <>
      <div className="space-y-6">
        {paged.map((order) => (
          <div
            key={order.orderNumber}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-bold">Order Number</p>
                  <p className="font-mono text-sm text-green-600">{order.orderNumber}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-medium">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center">
                  <span className="text-sm mr-2">Status:</span>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="font-bold text-lg">
                    {formatCurrency(order.totalPrice ?? 0, order.currency)}
                  </p>
                </div>
              </div>

              {order.amountDiscount ? (
                <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                  <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
                    Discount applied:{' '}
                    {formatCurrency(order.amountDiscount, order.currency)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Original Subtotal:{' '}
                    {formatCurrency(
                      (order.totalPrice ?? 0) + order.amountDiscount,
                      order.currency
                    )}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
                Order Items
              </p>

              <div className="space-y-3 sm:space-y-4">
                {order.products?.map((product) => (
                  <div
                    key={product.product?._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {product.product?.image && (
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={imageUrl(product.product.image).url()}
                            alt={product.product?.name ?? ''}
                            className="object-cover"
                            width={96}
                            height={96}
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          {product.product?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {product.quantity ?? 'N/A'}
                        </p>
                      </div>
                    </div>

                    <p className="font-medium text-right">
                      {product.product?.price && product.quantity
                        ? formatCurrency(
                            product.product.price * product.quantity,
                            order.currency
                          )
                        : 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600">
          Page {page} of {totalPages} • Showing{' '}
          {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, orders.length)} of {orders.length} orders
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={i + 1 === page ? 'success' : 'outline'}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
