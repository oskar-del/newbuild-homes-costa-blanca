'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { formatPrice } from '@/lib/unified-property';

interface VideoCardProps {
  slug: string;
  title: string;
  youtubeId: string;
  description: string;
  category: string;
  duration: string;
  price: number | null;
  variant?: 'card' | 'inline' | 'hero';
}

/**
 * VideoCard — Displays a YouTube video thumbnail with play overlay.
 * Clicking opens the video in a lightbox modal.
 *
 * Variants:
 * - 'card': Grid card with thumbnail, title, description (default)
 * - 'inline': Compact horizontal card for sidebars
 * - 'hero': Large featured video with embed
 */
export default function VideoCard({
  slug,
  title,
  youtubeId,
  description,
  category,
  duration,
  price,
  variant = 'card',
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const thumbnailFallback = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  if (variant === 'hero') {
    return (
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-primary-900">
        {playing ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="relative w-full group cursor-pointer"
            aria-label={`Play video: ${title}`}
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                unoptimized
                onError={(e) => {
                  (e.target as HTMLImageElement).src = thumbnailFallback;
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {duration && (
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {duration}
              </span>
            )}
          </button>
        )}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-warm-300 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={() => setPlaying(true)}
        className="group flex gap-4 items-start w-full text-left hover:bg-warm-100 rounded-lg p-2 transition-colors"
      >
        <div className="relative w-40 flex-shrink-0 rounded overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={thumbnailFallback}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="160px"
                  unoptimized
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {duration && (
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                    {duration}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-accent-600 text-xs font-medium uppercase tracking-wider">{category}</span>
          <h4 className="text-primary-900 font-medium text-sm mt-0.5 line-clamp-2 group-hover:text-accent-600 transition-colors">
            {title}
          </h4>
          {price && (
            <span className="text-warm-500 text-xs mt-1 block">From {formatPrice(price)}</span>
          )}
        </div>
      </button>
    );
  }

  // Default: 'card' variant
  return (
    <div className="group bg-white rounded-lg border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all overflow-hidden">
      <button
        onClick={() => setPlaying(true)}
        className="relative w-full cursor-pointer"
        aria-label={`Play video: ${title}`}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
                onError={(e) => {
                  (e.target as HTMLImageElement).src = thumbnailFallback;
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {duration && (
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                  {duration}
                </span>
              )}
              {price && (
                <span className="absolute top-2 left-2 bg-primary-900/90 text-white text-xs px-2 py-1 rounded-sm font-medium">
                  From {formatPrice(price)}
                </span>
              )}
            </>
          )}
        </div>
      </button>
      <div className="p-4">
        <span className="text-accent-600 text-xs font-medium uppercase tracking-wider">{category}</span>
        <h3 className="text-primary-900 font-semibold mt-1 mb-1 group-hover:text-accent-600 transition-colors line-clamp-2 text-sm">
          {title}
        </h3>
        <p className="text-warm-600 text-xs line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

/**
 * VideoSection — Reusable section for displaying video grids.
 * Drop this into any page to show related videos.
 */
export function VideoSection({
  title,
  subtitle,
  videos,
  columns = 3,
}: {
  title: string;
  subtitle?: string;
  videos: { slug: string; title: string; youtubeId: string; description: string; category: string; duration: string; price: number | null }[];
  columns?: 2 | 3 | 4;
}) {
  if (videos.length === 0) return null;

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-12 bg-warm-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
              Video Tours
            </span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-primary-900">{title}</h2>
          {subtitle && (
            <p className="text-warm-600 mt-2 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className={`grid ${gridCols[columns]} gap-6`}>
          {videos.map((video) => (
            <VideoCard key={video.slug} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
