'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface Property {
  reference: string;
  title: string;
  price: number;
  type: string;
  bedrooms: number;
  location: string;
  image: string;
  slug?: string;
}

interface DayInTheLifeProps {
  areaName: string;
  intro: string;
  timeline: TimelineItem[];
  featuredProperty?: Property;
  ctaText?: string;
  ctaLink?: string;
}

export default function DayInTheLife({
  areaName,
  intro,
  timeline,
  featuredProperty,
  ctaText = 'Find Your Home Here',
  ctaLink = '/developments',
}: DayInTheLifeProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
      const viewportCenter = window.innerHeight / 2;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;

        if (Math.abs(itemCenter - viewportCenter) < rect.height) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-600">
              Lifestyle
            </span>
            <div className="w-12 h-px bg-accent-500" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mb-4">
            A Day in <span className="font-semibold">{areaName}</span>
          </h2>
          <p className="text-warm-600 max-w-2xl mx-auto text-lg">
            {intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Timeline */}
          <div ref={timelineRef} className="lg:col-span-2 relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-warm-200" />

            {/* Timeline items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  data-timeline-item
                  className={`relative pl-20 transition-all duration-500 ${
                    activeIndex === index ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {/* Time bubble */}
                  <div
                    className={`absolute left-0 w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
                      activeIndex === index
                        ? 'bg-accent-500 text-white shadow-lg scale-110'
                        : 'bg-warm-100 text-warm-600'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  {/* Content card */}
                  <div
                    className={`bg-warm-50 rounded-xl p-6 transition-all duration-500 ${
                      activeIndex === index
                        ? 'shadow-lg border-l-4 border-accent-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-bold text-lg ${
                        activeIndex === index ? 'text-accent-600' : 'text-warm-500'
                      }`}>
                        {item.time}
                      </span>
                      <span className="text-warm-400">•</span>
                      <h3 className="font-semibold text-primary-900">{item.title}</h3>
                    </div>
                    <p className="text-warm-600 leading-relaxed">{item.description}</p>

                    {/* Optional image */}
                    {item.image && activeIndex === index && (
                      <div className="mt-4 relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Featured Property Card */}
          <div className="lg:sticky lg:top-24">
            {featuredProperty ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-warm-200">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={featuredProperty.image}
                    alt={featuredProperty.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white text-2xl font-bold">
                      {formatPrice(featuredProperty.price)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">
                    Featured Property
                  </span>
                  <h3 className="font-bold text-primary-900 text-xl mt-2 mb-1">
                    {featuredProperty.title}
                  </h3>
                  <p className="text-warm-600 mb-4">{featuredProperty.location}</p>

                  <div className="flex items-center gap-4 text-warm-500 text-sm mb-6">
                    <span>{featuredProperty.type}</span>
                    <span>•</span>
                    <span>{featuredProperty.bedrooms} Bedrooms</span>
                  </div>

                  <Link
                    href={featuredProperty.slug ? `/developments/${featuredProperty.slug}` : ctaLink}
                    className="block w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold text-center py-3 rounded-lg transition-colors"
                  >
                    View Property
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-8 text-white">
                <h3 className="font-bold text-xl mb-4">
                  Ready to Experience {areaName}?
                </h3>
                <p className="text-white/90 mb-6">
                  Discover your perfect property and start living the Mediterranean dream.
                </p>
                <Link
                  href={ctaLink}
                  className="block w-full bg-white text-accent-600 font-semibold text-center py-3 rounded-lg hover:bg-warm-50 transition-colors"
                >
                  {ctaText}
                </Link>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-6 space-y-3">
              <Link
                href="/consultation"
                className="flex items-center gap-3 p-4 bg-warm-50 rounded-xl hover:bg-warm-100 transition-colors"
              >
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold text-primary-900">Book a Viewing</p>
                  <p className="text-warm-500 text-sm">Schedule a property tour</p>
                </div>
              </Link>
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-semibold text-primary-900">WhatsApp Us</p>
                  <p className="text-warm-500 text-sm">Get instant answers</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
