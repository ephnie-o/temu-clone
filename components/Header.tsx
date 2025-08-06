'use client'

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Form from "next/form"
import { PackageIcon } from "@sanity/icons"
import useBasketStore from "@/store/store"
import { SearchIcon, ShoppingCartIcon } from "lucide-react"
import Image from "next/image"


function Header() {
    const { user } = useUser()
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    )

    const createClerkPasskey = async () => {
        try {
            const response = await user?.createPasskey();
            console.log(response)
        } catch (err) {
            console.error("Error:", JSON.stringify(err, null, 2))
        }
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-3 md:py-4">
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <Image src="/logo.jpg" alt="Stereda Pharmacy" width={40} height={40} />
                    </Link>

                    <button className="md:hidden p-2 text-gray-500">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute inset-y-0 left-3 flex items-center">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Form
                                action='/search'
                            >
                                <input
                                    type="text"
                                    name="query"
                                    placeholder="Search for products"
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-full
                                        py-2
                                        pl-10
                                        pr-4
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-green-400
                                    "
                                />
                            </Form>
                        </div>
                    </button>

                    <div className="hidden md:flex items-center space-x-4">
                        <ClerkLoaded>
                            <SignedIn>
                                <Link
                                    href="/orders"
                                    className="hidden lg:flex items-center space-x-1 text-gray-600 hover:text-green-600"
                                >
                                    <PackageIcon className="w-5 h-5" />
                                    <span className="text-sm">Orders</span>
                                </Link>
                            </SignedIn>

                            {user ? (
                                <div className="flex items-center space-x-2">
                                    <UserButton />

                                    <div className="hidden lg:block text-xs text-gray-600">
                                        <p className="font-bold">Hi, {user.fullName}!</p>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="hidden lg:block text-sm text-gray-600 hover:text-green-600">
                                        Sign In
                                    </button>
                                </SignInButton>
                            )}

                            {user?.passkeys.length === 0 && (
                                <button
                                    onClick={createClerkPasskey}
                                    className="bg-white hover:bg-green-600 hover:text-white text-green-500 font-semibold py-1 px-3 rounded-full border border-green-300 animate-pulse text-xs"
                                >
                                    Create passkey
                                </button>
                            )}
                        </ClerkLoaded>
                        <Link
                            href="/basket"
                            className="relative p-1"
                        >
                            <ShoppingCartIcon className="w-6 h-6 text-gray-600 hover:text-green-600" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <div className="hidden md:block pb-3 md:pb-4">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-3 flex items-center">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <Form
                            action='/search'
                        >
                            <input
                                type="text"
                                name="query"
                                placeholder="Search for products"
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-full
                                    py-2
                                    pl-10
                                    pr-4
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-400
                                "
                            />
                        </Form>
                    </div>
                </div>
                <div className="md:hidden flex items-center justify-between pb-3 space-x-4">
                    <ClerkLoaded>
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <UserButton />

                                <span className="text-sm font-bold text-gray-600 truncate max-w-[120px]">
                                    Hi, {user.firstName}!
                                </span>
                            </div>
                        ) : (
                            <SignInButton mode="modal">
                                <button className="text-sm text-green-600 font-medium">
                                    Sign In
                                </button>
                            </SignInButton>
                        )}

                        {user?.passkeys.length === 0 && (
                                <button
                                    onClick={createClerkPasskey}
                                    className="bg-white hover:bg-green-600 hover:text-white text-green-500 font-semibold py-1 px-3 rounded-full border border-green-300 animate-pulse text-xs"
                                >
                                    Create passkey
                                </button>
                            )}
                    </ClerkLoaded>

                    <div className="flex items-center space-x-4">
                        <SignedIn>
                            <Link
                                href="/orders"
                                className="text-gray-600 flex items-center"
                            >
                                <PackageIcon className="w-5 h-5" />
                                <span className="text-sm">Orders</span>
                            </Link>
                        </SignedIn>
                        <Link
                            href="/basket"
                            className="relative"
                        >
                            <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header