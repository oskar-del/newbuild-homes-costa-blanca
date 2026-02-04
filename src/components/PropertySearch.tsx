'use client';

import { useRouter } from 'next/navigation';

interface PropertySearchProps {
  towns: string[];
  types: string[];
  bedOptions: number[];
}

export default function PropertySearch({ towns, types, bedOptions }: PropertySearchProps) {
  const router = useRouter();

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

  return (
    <div className="bg-white rounded-2xl p-4 shadow-xl max-w-2xl mx-auto">
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
