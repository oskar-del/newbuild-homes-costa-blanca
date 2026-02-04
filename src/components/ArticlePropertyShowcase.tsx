'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Property interface matching the content structure
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
  image?: string;
  features?: string[];
  status?: 'key-ready' | 'off-plan' | 'under-construction';
  badge?: string;
}

interface PropertyShowcaseProps {
  title: string;
  subtitle?: string;
  properties: Property[];
  variant: 'carousel' | 'grid-3x3' | 'grid-2x2' | 'featured-single' | 'split-highlight' | 'comparison';
  ctaText?: string;
  ctaLink?: string;
  theme?: 'light' | 'dark' | 'accent';
}

// Format price with euro symbol
const formatPrice = (price: number, priceFrom?: boolean) => {
  const formatted = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
  return priceFrom ? `From ${formatted}` : formatted;
};

// Property Card Component
function PropertyCard({ property, size = 'medium' }: { property: Property; size?: 'small' | 'medium' | 'large' }) {
  const statusColors = {
    'key-ready': 'bg-success-500',
    'off-plan': 'bg-accent-500',
    'under-construction': 'bg-amber-500',
  };

  const sizeClasses = {
    small: 'h-48',
    medium: 'h-56',
    large: 'h-72',
  };

  return (
    <Link
      href={`/properties/${property.reference}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className={`relative ${sizeClasses[size]} bg-gradient-to-br from-warm-200 to-warm-300`}>
        {property.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-warm-400 text-4xl font-light">NBH</span>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-semibold text-sm">
            {formatPrice(property.price, property.priceFrom)}
          </span>
        </div>

        {/* Status Badge */}
        {property.status && (
          <div className="absolute top-4 right-4">
            <span className={`${statusColors[property.status]} text-white px-2.5 py-1 rounded text-xs font-medium`}>
              {property.status === 'key-ready' ? 'Key Ready' :
               property.status === 'off-plan' ? 'Off Plan' : 'Building'}
            </span>
          </div>
        )}

        {/* Custom Badge */}
        {property.badge && !property.status && (
          <div className="absolute top-4 right-4">
            <span className="bg-accent-500 text-white px-2.5 py-1 rounded text-xs font-medium">
              {property.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors line-clamp-1 mb-1">
          {property.title}
        </h4>
        <p className="text-warm-500 text-sm mb-3">{property.location}</p>

        {/* Features */}
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
          {property.builtArea && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.builtArea}m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// Carousel Variant
function CarouselVariant({ title, subtitle, properties, ctaText, ctaLink }: Omit<PropertyShowcaseProps, 'variant'>) {
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

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="my-12 -mx-6 md:mx-0">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-6 md:px-0">
        <div>
          <h3 className="text-2xl font-semibold text-primary-900">{title}</h3>
          {subtitle && <p className="text-warm-600 mt-1">{subtitle}</p>}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="p-2 rounded-full border border-warm-300 hover:bg-warm-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="p-2 rounded-full border border-warm-300 hover:bg-warm-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-6 md:px-0 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {properties.map((property) => (
          <div key={property.reference} className="flex-none w-[300px] snap-start">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      {/* CTA */}
      {ctaText && ctaLink && (
        <div className="text-center mt-6 px-6 md:px-0">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

// 3x3 Grid Variant
function Grid3x3Variant({ title, subtitle, properties, ctaText, ctaLink, theme = 'light' }: Omit<PropertyShowcaseProps, 'variant'>) {
  const bgClass = theme === 'dark' ? 'bg-primary-900' : theme === 'accent' ? 'bg-accent-50' : 'bg-warm-50';
  const textClass = theme === 'dark' ? 'text-white' : 'text-primary-900';
  const subtitleClass = theme === 'dark' ? 'text-warm-300' : 'text-warm-600';

  return (
    <div className={`my-12 -mx-6 md:mx-0 ${bgClass} md:rounded-2xl p-6 md:p-10`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className={`text-2xl md:text-3xl font-semibold ${textClass}`}>{title}</h3>
        {subtitle && <p className={`${subtitleClass} mt-2 max-w-2xl mx-auto`}>{subtitle}</p>}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.slice(0, 9).map((property) => (
          <PropertyCard key={property.reference} property={property} />
        ))}
      </div>

      {/* CTA */}
      {ctaText && ctaLink && (
        <div className="text-center mt-8">
          <Link
            href={ctaLink}
            className={`inline-flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-accent-500 hover:bg-accent-600 text-white'
                : 'bg-primary-900 hover:bg-primary-800 text-white'
            } px-6 py-3 rounded-lg font-medium transition-colors`}
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

// 2x2 Grid Variant
function Grid2x2Variant({ title, subtitle, properties, ctaText, ctaLink }: Omit<PropertyShowcaseProps, 'variant'>) {
  return (
    <div className="my-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-primary-900">{title}</h3>
          {subtitle && <p className="text-warm-600 mt-1">{subtitle}</p>}
        </div>
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="hidden md:inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {properties.slice(0, 4).map((property) => (
          <PropertyCard key={property.reference} property={property} size="large" />
        ))}
      </div>

      {/* Mobile CTA */}
      {ctaText && ctaLink && (
        <div className="text-center mt-6 md:hidden">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

// Featured Single Property Variant
function FeaturedSingleVariant({ title, subtitle, properties }: Omit<PropertyShowcaseProps, 'variant'>) {
  const property = properties[0];
  if (!property) return null;

  return (
    <div className="my-12 bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 md:h-auto bg-gradient-to-br from-warm-200 to-warm-300">
          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-warm-400 text-6xl font-light">NBH</span>
            </div>
          )}
          {property.status && (
            <div className="absolute top-4 left-4">
              <span className="bg-success-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                {property.status === 'key-ready' ? 'Key Ready' :
                 property.status === 'off-plan' ? 'Off Plan' : 'Building'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="text-accent-400 text-sm font-medium mb-2">{title}</div>
          {subtitle && <p className="text-warm-400 text-sm mb-4">{subtitle}</p>}

          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            {property.title}
          </h3>
          <p className="text-warm-300 mb-4">{property.location}</p>

          <div className="text-3xl font-bold text-accent-400 mb-6">
            {formatPrice(property.price, property.priceFrom)}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-4 text-white/80 mb-6">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.bedrooms} Bedrooms
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {property.bathrooms} Bathrooms
            </span>
            {property.builtArea && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {property.builtArea}m² Built
              </span>
            )}
          </div>

          {/* Property Features */}
          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {property.features.slice(0, 4).map((feature) => (
                <span key={feature} className="bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/properties/${property.reference}`}
              className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Property
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=34634044970&text=Hi!%20I'm%20interested%20in%20this%20property"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Split Highlight Variant (1 large + 2 small)
function SplitHighlightVariant({ title, subtitle, properties, ctaText, ctaLink }: Omit<PropertyShowcaseProps, 'variant'>) {
  if (properties.length < 3) return null;

  return (
    <div className="my-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary-900">{title}</h3>
        {subtitle && <p className="text-warm-600 mt-2">{subtitle}</p>}
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Large Property */}
        <div className="md:row-span-2">
          <PropertyCard property={properties[0]} size="large" />
        </div>

        {/* Smaller Properties */}
        <PropertyCard property={properties[1]} />
        <PropertyCard property={properties[2]} />
      </div>

      {/* CTA */}
      {ctaText && ctaLink && (
        <div className="text-center mt-8">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

// Main Export Component
export default function ArticlePropertyShowcase(props: PropertyShowcaseProps) {
  const { variant, ...rest } = props;

  switch (variant) {
    case 'carousel':
      return <CarouselVariant {...rest} />;
    case 'grid-3x3':
      return <Grid3x3Variant {...rest} />;
    case 'grid-2x2':
      return <Grid2x2Variant {...rest} />;
    case 'featured-single':
      return <FeaturedSingleVariant {...rest} />;
    case 'split-highlight':
      return <SplitHighlightVariant {...rest} />;
    default:
      return <CarouselVariant {...rest} />;
  }
}

// Export individual variants for direct use
export { CarouselVariant, Grid3x3Variant, Grid2x2Variant, FeaturedSingleVariant, SplitHighlightVariant };
