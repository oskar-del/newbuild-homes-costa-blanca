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

interface ParallaxPropertySectionProps {
  title: string;
  subtitle?: string;
  narrative: string;
  backgroundImage: string;
  properties: Property[];
  ctaText?: string;
  ctaLink?: string;
  theme?: 'dark' | 'light';
}

export default function ParallaxPropertySection({
  title,
  subtitle,
  narrative,
  backgroundImage,
  properties,
  ctaText = 'View All Properties',
  ctaLink = '/developments',
  theme = 'dark',
}: ParallaxPropertySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      const progress = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / (windowHeight + sectionHeight)
      ));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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

  const isDark = theme === 'dark';

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          transform: `translateY(${scrollProgress * 40}px)`,
        }}
      >
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900'
            : 'bg-gradient-to-br from-warm-100 via-white to-accent-50'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          {subtitle && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-12 h-px ${isDark ? 'bg-accent-400' : 'bg-accent-500'}`} />
              <span className={`text-xs font-semibold tracking-widest uppercase ${
                isDark ? 'text-accent-400' : 'text-accent-600'
              }`}>
                {subtitle}
              </span>
              <div className={`w-12 h-px ${isDark ? 'bg-accent-400' : 'bg-accent-500'}`} />
            </div>
          )}

          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-6 ${
            isDark ? 'text-white' : 'text-primary-900'
          }`}>
            {title}
          </h2>

          <div className={`prose prose-lg max-w-3xl mx-auto ${
            isDark ? 'text-warm-300' : 'text-warm-700'
          }`}>
            {narrative.split('\n\n').map((para, i) => (
              <p key={i} className="leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Property Grid - Clean 3 Column Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {properties.slice(0, 3).map((property, index) => (
            <Link
              key={property.reference}
              href={property.slug ? `/developments/${property.slug}` : ctaLink}
              className="group"
              style={{
                opacity: 0.6 + scrollProgress * 0.4,
                transform: `translateY(${(1 - scrollProgress) * (20 + index * 10)}px)`,
              }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-warm-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
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
                         property.status === 'off-plan' ? 'Off-Plan' : 'Under Construction'}
                      </span>
                    )}
                  </div>
                  {/* Price Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="text-white text-2xl font-bold">
                      {formatPrice(property.price, property.priceFrom)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-bold text-primary-900 text-lg mb-1 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{property.location}</p>

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
                  </div>

                  {/* Features */}
                  {property.features && property.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {property.features.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="bg-warm-100 text-warm-700 text-xs px-2.5 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={ctaLink}
            className={`inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-lg transition-all ${
              isDark
                ? 'bg-accent-500 hover:bg-accent-600 text-white'
                : 'bg-accent-500 hover:bg-accent-600 text-white'
            }`}
          >
            {ctaText}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
