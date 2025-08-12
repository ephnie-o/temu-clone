'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '@/sanity.types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ClientCategorySelectorProps {
  categories: Category[];
  selectedId: string;
  onSelect: (categoryId: string) => void;
}

export default function ClientCategorySelector({
  categories,
  selectedId,
  onSelect,
}: ClientCategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(selectedId);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Sync internal state when parent changes
  useEffect(() => {
    setValue(selectedId);
  }, [selectedId]);

  const handleItemSelect = (id: string) => {
    setValue(id);
    onSelect(id);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <div className="w-full space-y-2">
        <h3 className="font-medium text-gray-700 px-2">Categories</h3>
        <Command className="rounded-lg border border-gray-200 bg-white">
          <CommandInput placeholder="Search categories..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value=""
                onSelect={() => handleItemSelect('')}
                className="cursor-pointer"
              >
                <span
                  className={cn(
                    'mr-2 h-4 w-4 flex items-center justify-center',
                    value === '' ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <Check className="h-4 w-4" />
                </span>
                All Products
              </CommandItem>
              {categories.map((cat) => (
                <CommandItem
                  key={cat._id}
                  value={cat._id}
                  onSelect={() => handleItemSelect(cat._id)}
                  className="cursor-pointer"
                >
                  <span
                    className={cn(
                      'mr-2 h-4 w-4 flex items-center justify-center',
                      value === cat._id ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  {cat.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-medium text-gray-700"
        >
          {value
            ? categories.find((c) => c._id === value)?.title
            : 'All Products'}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="" onSelect={() => handleItemSelect('')}>
                All Products
                <Check
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === '' ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
              {categories.map((cat) => (
                <CommandItem
                  key={cat._id}
                  value={cat._id}
                  onSelect={() => handleItemSelect(cat._id)}
                >
                  {cat.title}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === cat._id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
