'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PropertyFiltersProps {
  towns: string[];
  types: string[];
  bedOptions: number[];
}

export default function PropertyFilters({ towns, types, bedOptions }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentTown = searchParams.get('town') || '';
  const currentBeds = searchParams.get('beds') || '';
  const currentType = searchParams.get('type') || '';
  
  const hasFilters = currentTown || currentBeds || currentType;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[150px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
        <select
          value={currentTown}
          onChange={(e) => updateFilter('town', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Locations ({towns.length})</option>
          {towns.map(town => (
            <option key={town} value={town}>{town}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[120px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Bedrooms</label>
        <select
          value={currentBeds}
          onChange={(e) => updateFilter('beds', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Bedrooms</option>
          {bedOptions.map(beds => (
            <option key={beds} value={beds}>{beds} Bedroom{beds > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[120px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Property Type</label>
        <select
          value={currentType}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <Link
          href="/properties"
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium hover:bg-red-50 rounded-lg transition-colors"
        >
          ✕ Clear
        </Link>
      )}
    </div>
  );
}
