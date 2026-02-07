'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Development,
  getDevelopmentsByArea,
  lifestyleLabels,
  LifestyleFit,
  developers,
  getPropertyRefsForDevelopment,
} from '@/data/developments';

interface AreaDevelopmentsProps {
  areaName: string;
  areaSlug: string;
  maxDevelopments?: number;
  showLifestyleGuide?: boolean;
  showPropertyImages?: boolean;
  relatedBlogPosts?: Array<{
    slug: string;
    title: string;
    description?: string;
  }>;
}

// Status badge styles
const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  'selling': { bg: 'bg-green-100', text: 'text-green-700', label: 'Now Selling' },
  'last-units': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Last Units' },
  'coming-soon': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Coming Soon' },
  'sold-out': { bg: 'bg-warm-100', text: 'text-warm-500', label: 'Sold Out' },
};

export default function AreaDevelopments({
  areaName,
  areaSlug,
  maxDevelopments = 6,
  showLifestyleGuide = true,
  showPropertyImages = true,
  relatedBlogPosts = [],
}: AreaDevelopmentsProps) {
  const areaDevelopments = getDevelopmentsByArea(areaSlug);

  // Sort: selling first, then last-units, by price variety
  const sortedDevelopments = [...areaDevelopments]
    .sort((a, b) => {
      const statusOrder = { 'selling': 0, 'last-units': 1, 'coming-soon': 2, 'sold-out': 3 };
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return a.priceFrom - b.priceFrom;
    })
    .slice(0, maxDevelopments);

  // Group by lifestyle for the guide
  const lifestyleGroups: Partial<Record<LifestyleFit, Development[]>> = {};
  areaDevelopments.forEach(dev => {
    dev.idealFor.forEach(lifestyle => {
      if (!lifestyleGroups[lifestyle]) lifestyleGroups[lifestyle] = [];
      lifestyleGroups[lifestyle]!.push(dev);
    });
  });

  // Only show lifestyles with developments
  const activeLifestyles = (Object.keys(lifestyleGroups) as LifestyleFit[])
    .filter(l => lifestyleGroups[l]!.length > 0)
    .slice(0, 4); // Top 4 lifestyles

  if (areaDevelopments.length === 0) {
    return null;
  }

  return (
    <section id="developments" className="py-16 bg-warm-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">
            New Build Developments
          </span>
          <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
            What&apos;s Being Built in <span className="font-semibold">{areaName}</span>
          </h2>
          <p className="text-warm-600 text-lg max-w-3xl">
            {areaDevelopments.length} new build development{areaDevelopments.length !== 1 ? 's' : ''} currently
            available in {areaName}. Each offers quality construction, bank guarantees, and 10-year
            structural warranties.
          </p>
        </div>

        {/* Development Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedDevelopments.map((dev) => {
            const status = statusStyles[dev.status];
            const developer = developers[dev.developerSlug];
            const images = dev.galleryImages || [];
            const heroImage = dev.heroImage || images[0];

            return (
              <div
                key={dev.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                {/* Property Images */}
                {showPropertyImages && (heroImage || images.length > 0) && (
                  <div className="relative">
                    {/* Main Image */}
                    <div className="relative h-48 overflow-hidden">
                      {heroImage ? (
                        <Image
                          src={heroImage}
                          alt={`New build ${dev.propertyTypes?.[0]?.toLowerCase() || 'homes'} for sale ${areaName} Spain ${dev.displayName || dev.name}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                          <span className="text-4xl">🏠</span>
                        </div>
                      )}
                      {/* Status Badge on Image */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${status.bg} ${status.text} shadow-sm`}>
                          {status.label}
                        </span>
                      </div>
                      {/* Price Badge */}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-white/95 backdrop-blur-sm text-accent-600 font-bold text-sm px-3 py-1.5 rounded-full shadow-sm">
                          From €{dev.priceFrom.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Mini Gallery (if multiple images) */}
                    {images.length > 1 && (
                      <div className="flex gap-1 p-1 bg-warm-50">
                        {images.slice(0, 4).map((img, idx) => (
                          <div key={idx} className="relative flex-1 h-12 overflow-hidden rounded">
                            <Image
                              src={img}
                              alt={`${dev.displayName || dev.name} new build ${areaName} Costa Blanca Spain`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                            {idx === 3 && images.length > 4 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">+{images.length - 4}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Header */}
                <div className="p-5 border-b border-warm-100">
                  {/* Show status here only if no images */}
                  {(!showPropertyImages || (!heroImage && images.length === 0)) && (
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className={`inline-block text-xs font-bold px-2 py-1 rounded-full ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                        {dev.phase && (
                          <span className="text-warm-400 text-xs ml-2">{dev.phase}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <h3 className="font-bold text-primary-900 text-xl">
                    {dev.displayName || dev.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/developers/${dev.developerSlug}`}
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      by {developer?.displayName || dev.developer}
                    </Link>
                    {dev.phase && showPropertyImages && (
                      <span className="text-warm-400 text-xs">{dev.phase}</span>
                    )}
                  </div>
                </div>

                {/* Concept & Details */}
                <div className="p-5">
                  <p className="text-accent-600 font-medium text-sm mb-2">
                    &ldquo;{dev.concept}&rdquo;
                  </p>

                  {/* Ideal For Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dev.idealFor.slice(0, 3).map(lifestyle => (
                      <span
                        key={lifestyle}
                        className="bg-warm-50 text-warm-600 text-xs px-2 py-1 rounded-full"
                      >
                        {lifestyleLabels[lifestyle].icon} {lifestyleLabels[lifestyle].name}
                      </span>
                    ))}
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                    <div className="text-center p-2 bg-warm-50 rounded-lg">
                      <p className="text-warm-500 text-xs">Delivery</p>
                      <p className="font-semibold text-primary-900">{dev.deliveryFrom}</p>
                    </div>
                    <div className="text-center p-2 bg-warm-50 rounded-lg">
                      <p className="text-warm-500 text-xs">Type</p>
                      <p className="font-semibold text-primary-900">{dev.propertyTypes[0]}</p>
                    </div>
                    <div className="text-center p-2 bg-warm-50 rounded-lg">
                      <p className="text-warm-500 text-xs">Beds</p>
                      <p className="font-semibold text-primary-900">{dev.bedroomsRange}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="border-t border-warm-100 pt-3">
                    <ul className="text-sm text-warm-600 space-y-1">
                      {dev.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-500">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  <Link
                    href={`/developments/${dev.slug}`}
                    className="block text-center bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    View Development
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lifestyle Guide */}
        {showLifestyleGuide && activeLifestyles.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-primary-900 text-xl mb-4">
              Which Development Suits You?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeLifestyles.map(lifestyle => {
                const info = lifestyleLabels[lifestyle];
                const devs = lifestyleGroups[lifestyle]!;
                return (
                  <div key={lifestyle} className="bg-warm-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{info.icon}</span>
                      <h4 className="font-semibold text-primary-900">{info.name}</h4>
                    </div>
                    <p className="text-warm-500 text-xs mb-3">{info.description}</p>
                    <div className="space-y-1">
                      {devs.slice(0, 2).map(dev => (
                        <Link
                          key={dev.slug}
                          href={`/developments/${dev.slug}`}
                          className="block text-sm text-accent-600 hover:text-accent-700 font-medium"
                        >
                          → {dev.displayName || dev.name}
                        </Link>
                      ))}
                      {devs.length > 2 && (
                        <span className="text-warm-400 text-xs">+{devs.length - 2} more</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Blog Posts */}
        {relatedBlogPosts.length > 0 && (
          <div className="bg-accent-50 rounded-2xl p-6">
            <h3 className="font-bold text-primary-900 text-lg mb-4">
              📖 Learn More About Buying New Build in Spain
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedBlogPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-primary-900 mb-1">{post.title}</h4>
                  {post.description && (
                    <p className="text-warm-500 text-sm line-clamp-2">{post.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* View All Link */}
        {areaDevelopments.length > maxDevelopments && (
          <div className="text-center mt-8">
            <Link
              href={`/developments?area=${areaSlug}`}
              className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-semibold"
            >
              View All {areaDevelopments.length} Developments in {areaName} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
