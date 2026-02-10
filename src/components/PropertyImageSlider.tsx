'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface PropertyImageSliderProps {
  images: string[];
  alt: string;
  keyReady: boolean;
  propertyType: string;
  price: number | null;
  displayTown: string;
}

function formatPrice(price: number): string {
  return '€' + price.toLocaleString('en-IE');
}

export default function PropertyImageSlider({
  images,
  alt,
  keyReady,
  propertyType,
  price,
  displayTown,
}: PropertyImageSliderProps) {
  const imageCount = images.length;
  const hasMultiple = imageCount > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex] || '/images/placeholder-property.jpg';

  const goToPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? imageCount - 1 : prev - 1));
  }, [imageCount]);

  const goToNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(prev => (prev === imageCount - 1 ? 0 : prev + 1));
  }, [imageCount]);

  return (
    <div className="relative h-72 overflow-hidden group/slider">
      <Image
        src={currentImage}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Navigation arrows - visible on hover */}
      {hasMultiple && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary-900 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 shadow-md z-20"
            aria-label="Previous photo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary-900 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 shadow-md z-20"
            aria-label="Next photo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Top badges row */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
        <div className="flex flex-wrap gap-2">
          <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
            New Build
          </span>
          {keyReady && (
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Key Ready
            </span>
          )}
          {propertyType && (
            <span className="bg-white/95 backdrop-blur-sm text-primary-900 text-xs font-medium px-3 py-1.5 rounded-full">
              {propertyType}
            </span>
          )}
        </div>
        {hasMultiple && (
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
            {currentIndex + 1}/{imageCount}
          </span>
        )}
      </div>

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.slice(0, 7).map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(idx); }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
          {imageCount > 7 && (
            <span className="text-white/70 text-[10px] leading-none ml-0.5 self-center">+{imageCount - 7}</span>
          )}
        </div>
      )}

      {/* Bottom overlay with price and location */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {price && price > 0 ? formatPrice(price) : 'Price on Request'}
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {displayTown}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
