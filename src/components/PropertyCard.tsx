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

// Generate search-query style alt tag for SEO
function getPropertyAlt(property: UnifiedProperty): string {
  const type = (property.propertyType || 'property').toLowerCase();
  const beds = property.bedrooms ? `${property.bedrooms} bedroom ` : '';
  const town = property.town || 'Costa Blanca';
  const priceStr = property.price ? ` €${Math.round(property.price / 1000)}k` : '';
  return `${beds}new build ${type} for sale ${town} Spain${priceStr}`.trim();
}

// Get badge type based on property features - refined colours
function getBadgeType(property: UnifiedProperty): { text: string; className: string } | null {
  if (isKeyReady(property)) {
    return { text: 'Key Ready', className: 'bg-accent-500' };
  }

  if (property.features?.some(f => f.toLowerCase().includes('golf'))) {
    return { text: 'Golf', className: 'bg-success-500' };
  }

  if (property.price >= 800000) {
    return { text: 'Luxury', className: 'bg-primary-900' };
  }

  if (property.features?.some((f: string) => f.toLowerCase().includes('sea'))) {
    return { text: 'Sea View', className: 'bg-primary-700' };
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
      className="block min-w-[300px] max-w-[300px] bg-warm-50 rounded-lg overflow-hidden border border-warm-200 hover:shadow-medium transition-all duration-250 hover:-translate-y-0.5 flex-shrink-0"
    >
      {/* Image */}
      <div className="relative h-[200px]">
        <Image
          src={imageUrl}
          alt={getPropertyAlt(property)}
          fill
          className="object-cover"
          sizes="300px"
          unoptimized
        />
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-medium text-white ${badge.className}`}>
            {badge.text}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location - smaller, muted */}
        <p className="text-xs text-warm-600 uppercase tracking-wide mb-1">
          {property.town}{property.locationDetail ? `, ${property.locationDetail}` : ''}
        </p>

        {/* Title */}
        <h3 className="font-medium text-primary-900 mb-2 leading-tight">
          {getPropertyTitle(property)}
        </h3>

        {/* Specs */}
        <div className="flex gap-4 text-sm text-warm-600 mb-3">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span>{property.builtArea}m²</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-warm-200">
          <span className="text-lg font-semibold text-primary-900">
            {formatPrice(property.price)}
          </span>
          {keyReady && (
            <span className="text-xs text-success-600 font-medium">Key Ready</span>
          )}
        </div>
      </div>
    </Link>
  );
}
