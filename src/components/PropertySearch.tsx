'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PropertySearchProps {
  towns: string[];
  types: string[];
  bedOptions: number[];
}

export default function PropertySearch({ towns, types, bedOptions }: PropertySearchProps) {
  const router = useRouter();
  const [refInput, setRefInput] = useState('');
  const [refError, setRefError] = useState('');

  const handleLocationChange = (value: string) => {
    if (value) {
      router.push(`/properties?town=${encodeURIComponent(value)}`);
    }
  };

  const handleTypeChange = (value: string) => {
    if (value) {
      router.push(`/properties?type=${encodeURIComponent(value)}`);
    }
  };

  const handleBedsChange = (value: string) => {
    if (value) {
      router.push(`/properties?beds=${value}`);
    }
  };

  const handleRefSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = refInput.trim();
    if (!ref) return;

    setRefError('');
    // Navigate directly to the property page — if it doesn't exist, the page handles 404
    router.push(`/properties/${encodeURIComponent(ref)}`);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-xl max-w-2xl mx-auto">
      {/* Reference Search */}
      <form onSubmit={handleRefSearch} className="mb-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={refInput}
              onChange={(e) => { setRefInput(e.target.value); setRefError(''); }}
              placeholder="Search by reference (e.g. N5876, BP-12345)"
              className="w-full border border-warm-200 rounded-lg pl-10 pr-4 py-2.5 text-primary-900 placeholder-warm-400 text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
            />
          </div>
          <button
            type="submit"
            className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
          >
            Find
          </button>
        </div>
        {refError && (
          <p className="text-red-500 text-xs mt-1 pl-1">{refError}</p>
        )}
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-warm-200" />
        <span className="text-warm-400 text-xs">or filter by</span>
        <div className="flex-1 h-px bg-warm-200" />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid sm:grid-cols-3 gap-4">
        <select
          className="w-full border border-warm-200 rounded-lg px-4 py-3 text-primary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          onChange={(e) => handleLocationChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Select Location</option>
          {towns.map(town => (
            <option key={town} value={town}>{town}</option>
          ))}
        </select>
        <select
          className="w-full border border-warm-200 rounded-lg px-4 py-3 text-primary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          onChange={(e) => handleTypeChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Property Type</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          className="w-full border border-warm-200 rounded-lg px-4 py-3 text-primary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          onChange={(e) => handleBedsChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Bedrooms</option>
          {bedOptions.map(beds => (
            <option key={beds} value={beds}>{beds}+ Bedrooms</option>
          ))}
        </select>
      </div>
    </div>
  );
}
