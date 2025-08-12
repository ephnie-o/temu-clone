'use client'

import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession"
import Loader from "@/components/Loader"
import { imageUrl } from "@/lib/imageUrl"
import useBasketStore from "@/store/store"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import QuantityStepper from "@/components/QuantityStepper"

const brandButton = 'bg-green-600 hover:bg-green-700 text-white'

function formatGBP(value: number) {
    try {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value)
    } catch {
        return `£${value.toFixed(2)}`
    }
}


function BasketPage() {

    const groupedItems = useBasketStore((state) => state.getGroupedItems())
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const router = useRouter()

    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const totalPrice = useBasketStore((s) => s.getTotalPrice())

    useEffect(() => {
        setIsClient(true)
    }, [])

    const totals = useMemo(() => {
        const items = (groupedItems as Array<{ quantity: number }>).reduce<number>(
            (sum, item) => sum + item.quantity,
            0
        )

        return {items}
    }, [groupedItems])

    if (!isClient) {
        return <Loader />
    }

    if (groupedItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
                <div className="text-center bg-white rounded-xl shadow-sm p-8">
                    <h1 className="text-xl font-bold tracking-wide text-gray-900 mb-4">Your Shopping Basket</h1>
                    <p className="text-gray-500 mb-6 text-sm">Your basket is currently empty</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="text-sm bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md cursor-pointer hover:bg-green-900 transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        )
    }

    const handleCheckout = async () => {
        if (!isSignedIn) return;
        setIsLoading(true)

        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            }

            const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                toast.error('Could not start checkout. Please try again.')
            }
        } catch (error) {
            console.error("Error creating checkout session:", error)
            toast.error('Checkout failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="flex items-baseline justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Your Basket</h1>
                <Badge variant="secondary" className="text-base">{totals.items} items</Badge>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-4">
                    {groupedItems?.map(item => (
                        <Card key={item.product._id} className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                                        aria-label={`View ${item.product.name}`}
                                    >
                                        {item.product.image && (
                                            <Image
                                                src={imageUrl(item.product.image).url()}
                                                alt={item.product.name ?? 'Product image'}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        )}
                                    </button>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <h2 className="truncate text-base font-semibold leading-6">
                                            {item.product.name}
                                            </h2>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                            Unit: {formatGBP(item.product.price ?? 0)}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Subtotal</p>
                                            <p className="text-lg font-semibold">
                                                {formatGBP((item.product.price ?? 0) * item.quantity)}
                                            </p>
                                        </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between gap-3">
                                            <QuantityStepper product={item.product} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="lg:col-span-4">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">

                        <div className="flex justify-between text-sm">
                            <span>Items</span>
                            <span>{totals.items}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>£{totalPrice.toFixed(2)}</span>
                        </div>

                        <Separator />
                        <div className="flex items-center justify-between text-base font-semibold">
                            <span>Total</span>
                            <span>£{totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Taxes, shipping and discounts calculated at checkout.
                        </p>

                        {isSignedIn ? (
                            <Button
                            className={`w-full ${brandButton}`}
                            size="lg"
                            onClick={handleCheckout}
                            disabled={isLoading || totals.items === 0}
                            >
                            {isLoading ? 'Processing…' : 'Checkout'}
                            </Button>
                        ) : (
                            <SignInButton mode="modal">
                            <Button className={`w-full ${brandButton}`} size="lg">
                                Sign in to checkout
                            </Button>
                            </SignInButton>
                        )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile checkout bar */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <div>
                    <div className="text-xs text-muted-foreground">Total</div>
                    <div className="text-lg font-semibold">£{totalPrice.toFixed(2)}</div>
                </div>
                {isSignedIn ? (
                    <Button className={brandButton} onClick={handleCheckout} disabled={isLoading || totals.items === 0}>
                    {isLoading ? 'Processing…' : 'Checkout'}
                    </Button>
                ) : (
                    <SignInButton mode="modal">
                    <Button className={brandButton}>Sign in</Button>
                    </SignInButton>
                )}
                </div>
            </div>
        </div>
    )
}

export default BasketPage
