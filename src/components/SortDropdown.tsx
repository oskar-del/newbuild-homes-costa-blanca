'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface SortDropdownProps {
  currentSort: string;
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-warm-500 text-sm hidden sm:inline">Sort by:</span>
      <select
        className="bg-warm-50 border border-warm-200 rounded-md px-3 py-2 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="beds-desc">Bedrooms</option>
        <option value="size-desc">Size</option>
      </select>
    </div>
  );
}
