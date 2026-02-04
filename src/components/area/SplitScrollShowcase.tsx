'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface NarrativeBlock {
  icon?: string;
  title: string;
  content: string;
}

interface SplitScrollShowcaseProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  narrativeBlocks: NarrativeBlock[];
  properties: Property[];
  layout?: 'narrative-left' | 'narrative-right';
  ctaText?: string;
  ctaLink?: string;
}

export default function SplitScrollShowcase({
  sectionTitle,
  sectionSubtitle,
  narrativeBlocks,
  properties,
  layout = 'narrative-left',
  ctaText = 'Explore All Options',
  ctaLink = '/developments',
}: SplitScrollShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const cards = container.querySelectorAll('[data-property-card]');
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;

        if (Math.abs(cardCenter - viewportCenter) < cardRect.height / 2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price: number, from?: boolean) => {
    const formatted = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
    return from ? `From ${formatted}` : formatted;
  };

  const isLeft = layout === 'narrative-left';

  return (
    <section ref={containerRef} className="relative bg-warm-50">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row ${!isLeft ? 'lg:flex-row-reverse' : ''}`}>
          {/* Sticky Narrative Side */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex items-center">
            <div className="p-8 lg:p-12 xl:p-16">
              {sectionSubtitle && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-accent-500" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent-600">
                    {sectionSubtitle}
                  </span>
                </div>
              )}

              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mb-8">
                {sectionTitle}
              </h2>

              <div className="space-y-6">
                {narrativeBlocks.map((block, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl transition-all duration-500 ${
                      activeIndex === index
                        ? 'bg-white shadow-lg border-l-4 border-accent-500'
                        : 'bg-transparent opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {block.icon && (
                        <span className="text-2xl flex-shrink-0">{block.icon}</span>
                      )}
                      <div>
                        <h3 className="font-semibold text-primary-900 mb-2">
                          {block.title}
                        </h3>
                        <p className="text-warm-600 text-sm leading-relaxed">
                          {block.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 mt-8 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {ctaText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scrolling Properties Side */}
          <div className="lg:w-1/2 py-12 lg:py-24 px-6 lg:px-12">
            <div className="space-y-8">
              {properties.map((property, index) => (
                <Link
                  key={property.reference}
                  href={property.slug ? `/developments/${property.slug}` : ctaLink}
                  data-property-card
                  className={`block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                    activeIndex === index
                      ? 'scale-100 opacity-100'
                      : 'scale-95 opacity-70'
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />

                    {/* Overlay badges */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="flex justify-between">
                        {property.badge && (
                          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {property.badge}
                          </span>
                        )}
                        {property.status && (
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
                            property.status === 'key-ready'
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {property.status === 'key-ready' ? 'Key Ready' : 'Off-Plan'}
                          </span>
                        )}
                      </div>

                      <div className="bg-gradient-to-t from-black/70 to-transparent -mx-4 -mb-4 p-4 pt-12">
                        <span className="text-white text-2xl font-bold">
                          {formatPrice(property.price, property.priceFrom)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-primary-900 text-xl mb-1">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 mb-4">{property.location}</p>

                    <div className="flex items-center gap-6 text-warm-500 mb-4">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium">{property.bedrooms} Bedrooms</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span className="font-medium">{property.bathrooms} Bathrooms</span>
                      </span>
                      {property.builtArea && (
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          <span className="font-medium">{property.builtArea}m²</span>
                        </span>
                      )}
                    </div>

                    {property.features && property.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, i) => (
                          <span
                            key={i}
                            className="bg-accent-50 text-accent-700 text-sm px-3 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
