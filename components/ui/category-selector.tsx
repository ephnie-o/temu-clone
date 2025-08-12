'use client'

import { Category } from "@/sanity.types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelectorComponent({
    categories,
}: CategorySelectorProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>("")
    const router = useRouter();
    const pathname = usePathname();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (pathname.startsWith('/categories/')) {
            const categorySlug = pathname.split('/categories/')[1];
            const currentCategory = categories.find(c => c.slug?.current === categorySlug);
            if (currentCategory) {
                setValue(currentCategory._id);
            }
        } else {
            setValue("");
        }
    }, [pathname, categories]);

    useEffect(() => {
        if (isDesktop) {
            setOpen(false);
        }
    }, [isDesktop]);

    const handleSelect = (categoryId: string, slug?: string) => {
        setValue(categoryId);
        if (slug) {
            router.push(`/categories/${slug}`);
        } else {
            router.push("/products");
        }
        if (!isDesktop) {
            setOpen(false);
        }
    };

    if (isDesktop) {
        return (
            <div className="w-full space-y-2">
                <h3 className="md:hidden font-medium text-gray-700 px-2">Categories</h3>
                <Command className="rounded-lg border border-gray-200 bg-white">
                    <CommandInput
                        placeholder="Search health categories..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                value="all"
                                onSelect={() => handleSelect("", "")}
                                className="cursor-pointer"
                            >
                                <span className={cn(
                                    "mr-2 h-4 w-4 flex items-center justify-center",
                                    value === "" ? "opacity-100" : "opacity-0"
                                )}>
                                    <Check className="h-4 w-4" />
                                </span>
                                All Products
                            </CommandItem>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title || ""}
                                    onSelect={() => handleSelect(category._id, category.slug?.current)}
                                    className="cursor-pointer"
                                >
                                    <span className={cn(
                                        "mr-2 h-4 w-4 flex items-center justify-center",
                                        value === category._id ? "opacity-100" : "opacity-0"
                                    )}>
                                        <Check className="h-4 w-4" />
                                    </span>
                                    {category.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>
        );
    }

    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "All Products"
                    }

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                value="all"
                                onSelect={() => handleSelect("", "")}
                            >
                                All Products
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === "" ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title || ""}
                                    onSelect={() => handleSelect(category._id, category.slug?.current)}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
