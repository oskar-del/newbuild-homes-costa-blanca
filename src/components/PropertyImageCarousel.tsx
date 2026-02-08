'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PropertyImageCarouselProps {
  images: { url: string; caption?: string }[];
  alt: string;
  height?: string;
  sizes?: string;
}

export default function PropertyImageCarousel({
  images,
  alt,
  height = 'h-64',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: PropertyImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const safeImages = images?.filter(img => img?.url) || [];

  if (safeImages.length === 0) {
    return (
      <div className={`relative ${height} overflow-hidden`}>
        <Image
          src="/images/placeholder-property.jpg"
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          unoptimized
        />
      </div>
    );
  }

  const hasMultiple = safeImages.length > 1;

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`relative ${height} overflow-hidden group/carousel`}>
      <Image
        src={safeImages[currentImageIndex].url}
        alt={currentImageIndex === 0 ? alt : `${alt} photo ${currentImageIndex + 1}`}
        fill
        className="object-cover"
        sizes={sizes}
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {hasMultiple && (
        <>
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-primary-900 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 shadow-sm z-10"
            aria-label="Previous photo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-primary-900 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 shadow-sm z-10"
            aria-label="Next photo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Photo counter */}
          <span className="absolute top-3 right-3 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded z-10">
            {currentImageIndex + 1}/{safeImages.length}
          </span>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {safeImages.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImageIndex(idx); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
            {safeImages.length > 5 && (
              <span className="text-white text-[10px] leading-none ml-0.5">+{safeImages.length - 5}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
