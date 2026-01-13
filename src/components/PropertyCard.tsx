'use client';

import Image from 'next/image';
import Link from 'next/link';
import { UnifiedProperty } from '@/lib/unified-property';

interface PropertyCardProps {
  property: UnifiedProperty;
}

// KEY READY PROPERTIES - Add reference numbers here when properties become Key Ready
const KEY_READY_REFERENCES = [
  'N6299',  // La Vista Boulevard - Oct 2024
  'N8535',  // Lomas de Campoamor - Nov 2024
  'N8770',  // Hondon de las Nieves - May 2025
  'N8550',  // Villas Catalina La Finca - Dec 2025
  'N9300',  // La Marina Villas - Nov 2025
  // Add more as they become Key Ready
];

// Check if property is Key Ready
function isKeyReady(property: UnifiedProperty): boolean {
  return KEY_READY_REFERENCES.includes(property.reference);
}

// Format price with euro symbol and thousands separator
function formatPrice(price: number): string {
  return '€' + price.toLocaleString('en-IE');
}

// Generate title from property data
function getPropertyTitle(property: UnifiedProperty): string {
  if (property.aiContent?.title) {
    return property.aiContent.title;
  }
  
  // Fallback: generate from property type, beds, and location
  const type = property.propertyType || 'Property';
  const beds = property.bedrooms ? `${property.bedrooms}-Bed ` : '';
  return `${beds}${type}`;
}

// Get badge type based on property features
function getBadgeType(property: UnifiedProperty): { text: string; className: string } | null {
  if (isKeyReady(property)) {
    return { text: 'Key Ready', className: 'bg-orange-500' };
  }
  
  if (property.features?.some(f => f.toLowerCase().includes('golf'))) {
    return { text: 'Golf', className: 'bg-green-700' };
  }
  
  if (property.price >= 800000) {
    return { text: 'Luxury', className: 'bg-purple-700' };
  }
  
  if (property.features?.some((f: string) => f.toLowerCase().includes('sea'))) {
    return { text: 'Sea View', className: 'bg-blue-600' };
  }
  
  return null;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const badge = getBadgeType(property);
  const keyReady = isKeyReady(property);
  const imageUrl = property.images?.[0]?.url || '/placeholder-property.jpg';
  
  return (
    <Link 
      href={`/properties/${property.reference}`}
      className="block min-w-[300px] max-w-[300px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex-shrink-0"
    >
      {/* Image */}
      <div className="relative h-[200px]">
        <Image
          src={imageUrl}
          alt={getPropertyTitle(property)}
          fill
          className="object-cover"
          sizes="300px"
        />
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white uppercase ${badge.className}`}>
            {badge.text}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="text-xl font-bold text-[#1e3a5f] mb-1">
          
          {formatPrice(property.price)}
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-1">
          {getPropertyTitle(property)}
        </h3>
        
        {/* Location */}
        <p className="text-sm text-gray-500 mb-3">
          {property.town}{property.locationDetail ? `, ${property.locationDetail}` : ''}
        </p>
        
        {/* Specs */}
        <div className="flex gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
          <span className="flex items-center gap-1">
            🛏 {property.bedrooms} beds
          </span>
          <span className="flex items-center gap-1">
            🚿 {property.bathrooms} baths
          </span>
          <span className="flex items-center gap-1">
            📐 {property.builtArea}m²
          </span>
        </div>
        
        {/* Delivery Status */}
        <div className="text-xs mt-2">
          {keyReady && (
            <span className="text-green-600 font-medium">✅ Key Ready</span>
          )}
        </div>
      </div>
    </Link>
  );
}
