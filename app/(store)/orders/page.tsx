import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import Link from "next/link";
import OrdersList from "@/components/OrdersList";

async function Orders() {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-xl tracking-wide font-bold text-gray-900">My Orders</h1>
                        <p className="text-sm text-gray-600">View your order history and track shipments</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Package className="h-6 w-6 text-green-600" />
                        <span className="text-sm font-medium">{orders.length} orders</span>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No orders yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Your order history will appear here once you make a purchase
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <OrdersList orders={orders} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders