'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CarouselProperty {
  reference: string;
  title: string;
  development?: string;
  town: string;
  zone?: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  builtArea: number;
  plotArea?: number;
  isKeyReady?: boolean;
  isGolf?: boolean;
  hasPool?: boolean;
  hasSeaview?: boolean;
  features?: string[];
  image?: string;
}

interface PropertyCarouselProps {
  id: string;
  title: string;
  subtitle?: string;
  properties: CarouselProperty[];
  viewAllLink?: string;
  viewAllText?: string;
}

export default function PropertyCarousel({
  id,
  title,
  subtitle,
  properties,
  viewAllLink,
  viewAllText = 'View All'
}: PropertyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-8" id={id}>
      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-4 lg:px-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-900">{title}</h2>
          {subtitle && (
            <p className="text-warm-600 mt-1">{subtitle}</p>
          )}
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1 whitespace-nowrap"
          >
            {viewAllText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-warm-50/95 hover:bg-white shadow-medium rounded-full p-2 transition-all"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-warm-50/95 hover:bg-white shadow-medium rounded-full p-2 transition-all"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 lg:px-0 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {properties.map((property) => (
            <PropertyCard key={property.reference} property={property} formatPrice={formatPrice} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({
  property,
  formatPrice
}: {
  property: CarouselProperty;
  formatPrice: (price: number) => string;
}) {
  const placeholderImage = `https://placehold.co/400x300/F7F5F0/1E2A38?text=${encodeURIComponent(property.propertyType)}`;

  return (
    <Link
      href={`/properties/${property.reference}`}
      className="flex-shrink-0 w-[280px] md:w-[300px] bg-warm-50 rounded-lg border border-warm-200 hover:shadow-medium transition-all duration-250 overflow-hidden group hover:-translate-y-0.5"
    >
      {/* Image Container */}
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={property.image || placeholderImage}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="300px"
          unoptimized
        />

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-soft">
          <span className="text-lg font-semibold text-primary-900">{formatPrice(property.price)}</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.isKeyReady && (
            <span className="bg-accent-500 text-white text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Key Ready
            </span>
          )}
          {property.isGolf && (
            <span className="bg-success-500 text-white text-xs font-medium px-2.5 py-1 rounded">
              Golf
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Property Type & Location */}
        <div className="flex items-center gap-2 text-sm text-warm-500 mb-1">
          <span className="font-medium text-accent-600">{property.propertyType}</span>
          <span>•</span>
          <span>{property.town}</span>
        </div>

        {/* Title */}
        <h3 className="font-medium text-primary-900 mb-2 line-clamp-1 group-hover:text-accent-600 transition-colors">
          {property.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-warm-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.bedrooms} bed
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            {property.bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.builtArea}m²
          </span>
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {property.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs bg-warm-200 text-warm-700 px-2 py-0.5 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
