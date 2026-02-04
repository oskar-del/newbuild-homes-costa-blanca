'use client';

import Image from 'next/image';
import { StockImage, getImageUrl } from '@/data/stock-images';

interface SectionImageProps {
  image: StockImage;
  width?: number;
  height?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Renders a stock image with optional overlay for use in section backgrounds
 */
export function SectionImage({
  image,
  width = 1200,
  height,
  className = '',
  overlay = false,
  overlayOpacity = 40,
  priority = false,
  fill = false,
}: SectionImageProps) {
  const imageUrl = getImageUrl(image, width);

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={imageUrl}
          alt={image.alt}
          fill
          className="object-cover"
          priority={priority}
          unoptimized
        />
        {overlay && (
          <div
            className="absolute inset-0 bg-primary-900"
            style={{ opacity: overlayOpacity / 100 }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={image.alt}
        width={width}
        height={height || Math.round(width * 0.6)}
        className="object-cover w-full h-full"
        priority={priority}
        unoptimized
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-primary-900"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}
    </div>
  );
}

interface SectionCardImageProps {
  image: StockImage;
  title: string;
  subtitle?: string;
  className?: string;
  height?: string;
}

/**
 * Image card with title overlay - great for category cards
 */
export function SectionCardImage({
  image,
  title,
  subtitle,
  className = '',
  height = 'h-48',
}: SectionCardImageProps) {
  return (
    <div className={`relative ${height} rounded-xl overflow-hidden group ${className}`}>
      <Image
        src={getImageUrl(image, 800)}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}

interface LifestyleBannerProps {
  image: StockImage;
  title: string;
  description: string;
  cta?: { text: string; href: string };
  alignment?: 'left' | 'center' | 'right';
}

/**
 * Full-width banner with lifestyle imagery
 */
export function LifestyleBanner({
  image,
  title,
  description,
  cta,
  alignment = 'left',
}: LifestyleBannerProps) {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <div className="relative min-h-[400px] flex items-center">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(image, 1920)}
          alt={image.alt}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/50" />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-6 py-16 w-full flex flex-col ${alignmentClasses[alignment]}`}>
        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
          {title}
        </h2>
        <p className="text-warm-300 text-lg max-w-2xl mb-6">
          {description}
        </p>
        {cta && (
          <a
            href={cta.href}
            className="inline-flex bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {cta.text}
          </a>
        )}
      </div>
    </div>
  );
}

interface ImageGridProps {
  images: StockImage[];
  columns?: 2 | 3 | 4;
  gap?: string;
  className?: string;
}

/**
 * Grid of images for lifestyle showcases
 */
export function ImageGrid({
  images,
  columns = 3,
  gap = 'gap-4',
  className = '',
}: ImageGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gap} ${className}`}>
      {images.map((image, index) => (
        <div key={image.id} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
          <Image
            src={getImageUrl(image, 600)}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          {/* Optional: show photographer credit on hover */}
          {image.photographer && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white/80 text-xs">📷 {image.photographer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
