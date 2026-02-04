'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Property {
  reference: string;
  title: string;
  price: number;
  priceFrom?: boolean;
  type: string;
  bedrooms: number;
  bathrooms: number;
  builtArea?: number;
  location: string;
  image: string;
  features?: string[];
  status?: 'key-ready' | 'off-plan' | 'under-construction';
  badge?: string;
  slug?: string;
}

interface FullWidthPropertyGridProps {
  title: string;
  subtitle?: string;
  properties: Property[];
  showFilters?: boolean;
  ctaText?: string;
  ctaLink?: string;
  columns?: 2 | 3 | 4;
  theme?: 'light' | 'dark';
}

export default function FullWidthPropertyGrid({
  title,
  subtitle,
  properties,
  showFilters = false,
  ctaText = 'View All Properties',
  ctaLink = '/developments',
  columns = 3,
  theme = 'light',
}: FullWidthPropertyGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const propertyTypes = ['all', ...new Set(properties.map((p) => p.type.toLowerCase()))];

  const filteredProperties =
    activeFilter === 'all'
      ? properties
      : properties.filter((p) => p.type.toLowerCase() === activeFilter);

  const formatPrice = (price: number, from?: boolean) => {
    const formatted = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
    return from ? `From ${formatted}` : formatted;
  };

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const isDark = theme === 'dark';

  return (
    <section className={`py-16 ${isDark ? 'bg-primary-900' : 'bg-warm-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            {subtitle && (
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-px ${isDark ? 'bg-accent-400' : 'bg-accent-500'}`} />
                <span className={`text-xs font-semibold tracking-widest uppercase ${
                  isDark ? 'text-accent-400' : 'text-accent-600'
                }`}>
                  {subtitle}
                </span>
              </div>
            )}
            <h2 className={`text-3xl lg:text-4xl font-light ${
              isDark ? 'text-white' : 'text-primary-900'
            }`}>
              {title}
            </h2>
          </div>

          {/* Filters */}
          {showFilters && propertyTypes.length > 2 && (
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === type
                      ? 'bg-accent-500 text-white'
                      : isDark
                      ? 'bg-white/10 text-white/70 hover:bg-white/20'
                      : 'bg-white text-warm-600 hover:bg-warm-100'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Grid */}
        <div className={`grid gap-6 ${gridCols[columns]}`}>
          {filteredProperties.slice(0, columns * 3).map((property, index) => (
            <Link
              key={property.reference}
              href={property.slug ? `/developments/${property.slug}` : ctaLink}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                  unoptimized
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-70'
                }`} />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  {property.badge && (
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {property.badge}
                    </span>
                  )}
                  {property.status && (
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ml-auto ${
                      property.status === 'key-ready'
                        ? 'bg-green-500 text-white'
                        : property.status === 'off-plan'
                        ? 'bg-blue-500 text-white'
                        : 'bg-orange-500 text-white'
                    }`}>
                      {property.status === 'key-ready' ? 'Key Ready' :
                       property.status === 'off-plan' ? 'Off-Plan' : 'Building'}
                    </span>
                  )}
                </div>

                {/* Bottom Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">{property.location}</p>
                      <h3 className="text-white font-bold text-lg line-clamp-1">
                        {property.title}
                      </h3>
                    </div>
                    <span className="text-white text-xl font-bold whitespace-nowrap ml-4">
                      {formatPrice(property.price, property.priceFrom)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Panel */}
              <div className="p-5">
                <div className="flex items-center gap-4 text-warm-500 text-sm mb-4">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {property.bedrooms} bed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    {property.bathrooms} bath
                  </span>
                  {property.builtArea && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {property.builtArea}m²
                    </span>
                  )}
                  <span className="ml-auto text-warm-400">{property.type}</span>
                </div>

                {/* Features */}
                {property.features && property.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {property.features.slice(0, 4).map((feature, i) => (
                      <span
                        key={i}
                        className="bg-accent-50 text-accent-700 text-xs px-2.5 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover CTA */}
                <div className={`mt-4 pt-4 border-t border-warm-100 transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="text-accent-600 font-semibold flex items-center gap-2">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href={ctaLink}
            className={`inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-lg transition-colors ${
              isDark
                ? 'bg-accent-500 hover:bg-accent-600 text-white'
                : 'bg-primary-900 hover:bg-primary-800 text-white'
            }`}
          >
            {ctaText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
