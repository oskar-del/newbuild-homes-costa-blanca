'use client';

/**
 * Property Page Client Component
 * ==============================
 * All interactive UI for property detail pages.
 * 
 * Layout (top to bottom):
 * 1. Breadcrumb
 * 2. Image Gallery + Lightbox
 * 3. Title + Location (Google Maps → town, not exact) + Price
 * 4. Last Updated + Share Buttons (WhatsApp, Facebook, X, Copy)
 * 5. Quick Stats + Feature Chips
 * 6. Nearby Amenities (beach, supermarket, hospital, schools, golf, airport)
 * 7. Main Description
 * 8. Area Section (sky blue - geography, climate, transport)
 * 9. Lifestyle Section (amber - daily life, beaches, healthcare, expat community)
 * 10. Investment Section (emerald + charts + rental income)
 * 11. "Why Buy This Property?" (10 points, BLUE)
 * 12. Features List
 * 13. Helpful Resources
 * 14. FAQ Accordion
 * 15. Bottom CTA (earthy amber/stone)
 * 16. Similar Properties
 * 17. View All Properties CTA
 * 
 * Sidebar: Agent Card (stars + reviews), Contact, Lead Form, Mortgage, Video/Floorplan
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UnifiedProperty } from '@/lib/unified-property';
import { PropertyContent } from '@/lib/property-content-generator';

// ====================
// CONSTANTS
// ====================

const WHATSAPP_URL = 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0';
const PHONE_NUMBER = '+34 634 044 970';
const PHONE_TEL = 'tel:+34634044970';
const HABENO_URL = 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e';
const AGENT_PHOTO = 'https://hanssonhertzell.se/media/images/teams/thumbnails/o_1gq9nqdtl3ck2h01r4ur931q12c_400x400.png';

// Brand Colors now use Tailwind design system classes:
// primary-900 (#1E2A38), accent-500 (#B39960), etc.

// ====================
// INTERFACES
// ====================

interface PropertyPageClientProps {
  property: UnifiedProperty;
  content: PropertyContent;
  similarProperties: UnifiedProperty[];
}

// ====================
// HELPER FUNCTIONS
// ====================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function getGoogleMapsUrl(property: UnifiedProperty): string {
  // Show town/area instead of exact location - users should contact for exact address
  const town = property.town || 'Costa Blanca';
  const region = property.region || 'Alicante';
  return `https://www.google.com/maps/search/${encodeURIComponent(town + ', ' + region + ', Spain')}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Estimated distances by town (km) - these are typical for each area
const TOWN_AMENITIES: Record<string, { beach: string; airport: string; hospital: string; supermarket: string; golf: string; school: string }> = {
  'torrevieja': { beach: '0.5-3', airport: '50', hospital: '2', supermarket: '0.5', golf: '10', school: '2' },
  'orihuela costa': { beach: '0.5-2', airport: '55', hospital: '15', supermarket: '1', golf: '5', school: '3' },
  'guardamar': { beach: '1-3', airport: '45', hospital: '20', supermarket: '1', golf: '10', school: '2' },
  'algorfa': { beach: '15', airport: '40', hospital: '20', supermarket: '4', golf: '2', school: '5' },
  'villamartin': { beach: '8', airport: '50', hospital: '15', supermarket: '2', golf: '1', school: '5' },
  'javea': { beach: '2-5', airport: '90', hospital: '5', supermarket: '1', golf: '15', school: '3' },
  'moraira': { beach: '1-3', airport: '95', hospital: '15', supermarket: '1', golf: '10', school: '5' },
  'calpe': { beach: '0.5-2', airport: '80', hospital: '10', supermarket: '0.5', golf: '15', school: '2' },
  'benidorm': { beach: '0.5-2', airport: '55', hospital: '3', supermarket: '0.5', golf: '10', school: '1' },
  'altea': { beach: '1-3', airport: '65', hospital: '15', supermarket: '1', golf: '12', school: '2' },
  'denia': { beach: '1-5', airport: '100', hospital: '5', supermarket: '1', golf: '20', school: '2' },
};

function getAmenityDistances(town: string): { beach: string; airport: string; hospital: string; supermarket: string; golf: string; school: string } {
  const normalizedTown = town.toLowerCase().trim();
  
  // Try exact match
  if (TOWN_AMENITIES[normalizedTown]) {
    return TOWN_AMENITIES[normalizedTown];
  }
  
  // Try partial match
  for (const [key, data] of Object.entries(TOWN_AMENITIES)) {
    if (normalizedTown.includes(key) || key.includes(normalizedTown)) {
      return data;
    }
  }
  
  // Default distances for Costa Blanca
  return { beach: '5-15', airport: '50-70', hospital: '10-20', supermarket: '2-5', golf: '10-20', school: '5-10' };
}

// ====================
// SUB-COMPONENTS
// ====================

// Price Growth Chart (Bar Chart)
function PriceGrowthChart({ data }: { data: { year: string; price: number }[] }) {
  const maxPrice = Math.max(...data.map((d) => d.price));
  
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-primary-900 mb-4">Costa Blanca Price Growth (€/m²)</h4>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.year} className="flex items-center gap-3">
            <span className="w-12 text-sm text-warm-600">{item.year}</span>
            <div className="flex-1 bg-warm-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(item.price / maxPrice) * 100}%` }}
              >
                <span className="text-xs text-white font-medium">€{item.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Rental Yield Comparison Chart
function RentalYieldChart({ data }: { data: { area: string; yield: number; color: string }[] }) {
  const maxYield = Math.max(...data.map((d) => d.yield));
  
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-primary-900 mb-4">Rental Yield by Area (%)</h4>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.area} className="flex items-center gap-3">
            <span className="w-28 text-sm text-warm-600 truncate">{item.area}</span>
            <div className="flex-1 bg-warm-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end pr-2"
                style={{ 
                  width: `${(item.yield / maxYield) * 100}%`,
                  backgroundColor: item.color 
                }}
              >
                <span className="text-xs text-white font-medium">{item.yield}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Accordion Item
function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void
}) {
  return (
    <div className="border-b border-warm-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left hover:text-accent-600 transition-colors"
      >
        <span className="font-medium text-primary-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-accent-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-warm-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

// Property Card for Similar Properties
function PropertyCard({ property }: { property: UnifiedProperty }) {
  const imageUrl = property.images?.[0]?.url || '/placeholder-property.jpg';

  return (
    <Link
      href={`/properties/${property.reference || property.id}`}
      className="block bg-warm-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-warm-200"
    >
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={`${property.propertyType} in ${property.town}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {property.price && (
          <div className="absolute bottom-3 left-3 bg-primary-900/90 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            {formatPrice(property.price)}
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-primary-900 mb-1 line-clamp-1">
          {property.propertyType} in {property.town}
        </h4>
        <div className="flex items-center gap-3 text-sm text-warm-600">
          <span>{property.bedrooms} beds</span>
          <span>•</span>
          <span>{property.bathrooms} baths</span>
          {property.builtArea > 0 && (
            <>
              <span>•</span>
              <span>{property.builtArea}m²</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// ====================
// MAIN COMPONENT
// ====================

export default function PropertyPageClient({ property, content, similarProperties }: PropertyPageClientProps) {
  // State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in this ${property.propertyType?.toLowerCase() || 'property'} (Ref: ${property.reference || property.id})`,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Data
  const images = property.images || [];
  const mainImage = images[0]?.url || '/placeholder-property.jpg';
  const thumbnails = images.slice(1, 5);
  const mapsUrl = getGoogleMapsUrl(property);
  const townSlug = slugify(property.town || 'costa-blanca');
  
  // Handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => setLightboxOpen(false);
  
  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const nextImage = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to Netlify Forms or API
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen bg-warm-50">
      {/* ==================== LIGHTBOX ==================== */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-accent-400 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-accent-400 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="max-w-5xl max-h-[85vh] relative">
            <Image
              src={images[lightboxIndex]?.url || mainImage}
              alt={content.imageAltTags[lightboxIndex] || `Property image ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh]"
              priority
            />
          </div>
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-accent-400 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ==================== BREADCRUMB ==================== */}
        <nav className="flex items-center gap-2 text-sm text-warm-500 mb-6">
          <Link href="/" className="hover:text-accent-600">Home</Link>
          <span>›</span>
          <Link href="/properties" className="hover:text-accent-600">Properties</Link>
          <span>›</span>
          <span className="text-warm-700">{property.reference || property.id}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== MAIN CONTENT ==================== */}
          <div className="lg:col-span-2 space-y-8">
            {/* ==================== IMAGE GALLERY ==================== */}
            <div className="space-y-3">
              {/* Main Image */}
              <div 
                className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={mainImage}
                  alt={content.imageAltTags[0] || content.seoTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 right-4 bg-primary-900/80 text-white px-3 py-1 rounded-lg text-sm">
                  Click to view all {images.length} photos
                </div>
              </div>
              
              {/* Thumbnails */}
              {thumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {thumbnails.map((img, i) => (
                    <div
                      key={i}
                      className="relative h-20 md:h-24 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(i + 1)}
                    >
                      <Image
                        src={img.url}
                        alt={content.imageAltTags[i + 1] || `Property image ${i + 2}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 25vw, 15vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ==================== TITLE + LOCATION + PRICE ==================== */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 mb-3">
                {content.seoTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-warm-600 mb-4">
                <span className="font-medium">{property.town}, {property.province || 'Alicante'}</span>
                <span className="text-warm-300">•</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">
                  {property.propertyType || 'Property'}
                </span>
                <span className="text-warm-300">•</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                >
                  View on Map
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              {property.price && (
                <div>
                  <div className="text-3xl font-bold text-primary-900">
                    {formatPrice(property.price)}
                  </div>
                  {content.priceContext && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-warm-600">
                        EUR {content.priceContext.pricePerSqm.toLocaleString()}/m²
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        content.priceContext.percentageDiff < -5
                          ? 'bg-success-100 text-success-700'
                          : content.priceContext.percentageDiff > 10
                            ? 'bg-accent-100 text-accent-700'
                            : 'bg-warm-100 text-warm-600'
                      }`}>
                        {content.priceContext.comparisonText}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Last Updated Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-warm-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Last updated: {content.lastUpdated}</span>
                <span className="text-success-600">• Price verified</span>
              </div>
              
              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-warm-500 hidden sm:inline">Share:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this property in ${property.town}: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-success-500 hover:bg-success-600 rounded-full flex items-center justify-center transition-colors"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${property.propertyType} in ${property.town}`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
                  title="Share on X"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: content.seoTitle,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="w-8 h-8 bg-warm-200 hover:bg-warm-300 rounded-full flex items-center justify-center transition-colors"
                  title="Copy link"
                >
                  <svg className="w-4 h-4 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ==================== QUICK STATS ==================== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.bedrooms || 0}</div>
                <div className="text-sm text-warm-500">Bedrooms</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.bathrooms || 0}</div>
                <div className="text-sm text-warm-500">Bathrooms</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.builtArea || 0}</div>
                <div className="text-sm text-warm-500">m² Built</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.plotArea || 0}</div>
                <div className="text-sm text-warm-500">m² Plot</div>
              </div>
            </div>

            {/* ==================== FEATURE CHIPS ==================== */}
            <div className="flex flex-wrap gap-2">
              {property.hasPool && (
                <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Pool
                </span>
              )}
              {property.hasSeaview && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Sea View
                </span>
              )}
              {property.hasGolfview && (
                <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Golf View
                </span>
              )}
              {property.hasGarden && (
                <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Garden
                </span>
              )}
              {property.hasTerrace && (
                <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Terrace
                </span>
              )}
              {property.hasParking && (
                <span className="bg-warm-100 text-warm-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Parking
                </span>
              )}
            </div>

            {/* ==================== NEARBY AMENITIES ==================== */}
            {(() => {
              const amenities = getAmenityDistances(property.town || 'Costa Blanca');
              return (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
                  <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Nearby Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16" transform="rotate(45 12 12)" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">Beach</div>
                        <div className="text-sm text-warm-500">{amenities.beach} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
                      <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">Supermarket</div>
                        <div className="text-sm text-warm-500">{amenities.supermarket} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">Hospital</div>
                        <div className="text-sm text-warm-500">{amenities.hospital} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent-50 rounded-lg">
                      <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">Schools</div>
                        <div className="text-sm text-warm-500">{amenities.school} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
                      <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">Golf Course</div>
                        <div className="text-sm text-warm-500">{amenities.golf} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">Airport</div>
                        <div className="text-sm text-warm-500">{amenities.airport} km</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-warm-400 mt-4 text-center">
                    Approximate distances. Contact us for exact property location.
                  </p>
                </div>
              );
            })()}

            {/* ==================== MAIN DESCRIPTION ==================== */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
              <h2 className="text-xl font-bold text-primary-900 mb-4">About This Property</h2>
              <div className="prose prose-warm max-w-none">
                {content.mainDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-warm-600 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* ==================== AREA SECTION ==================== */}
            {content.areaSection && (
              <div className="bg-gradient-to-br from-primary-50 to-warm-100 border border-primary-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  About {property.town || 'This Location'}
                </h2>
                <div className="text-warm-600 leading-relaxed">
                  {content.areaSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
                {property.town && (
                  <Link
                    href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 mt-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Explore {property.town} Area Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            )}

            {/* ==================== LIFESTYLE SECTION ==================== */}
            <div className="bg-gradient-to-br from-accent-50 to-warm-100 border border-accent-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Life in {property.town || 'Costa Blanca'}
              </h2>
              <div className="text-warm-600 leading-relaxed">
                {content.lifestyleSection.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* ==================== INVESTMENT SECTION ==================== */}
            <div className="bg-gradient-to-br from-success-50 to-warm-100 border border-success-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Investment Potential
              </h2>

              <div className="text-warm-600 leading-relaxed mb-6">
                {content.investmentSection.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>

              {/* Rental Income Estimate */}
              <div className="bg-white/70 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-primary-900 mb-3">Estimated Rental Income</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-success-600">
                      {formatPrice(content.rentalIncomeEstimate.annual)}
                    </div>
                    <div className="text-sm text-warm-500">Annual</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-success-600">
                      {formatPrice(content.rentalIncomeEstimate.monthly)}
                    </div>
                    <div className="text-sm text-warm-500">Monthly</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-success-600">
                      {formatPrice(content.rentalIncomeEstimate.weekly)}
                    </div>
                    <div className="text-sm text-warm-500">Weekly (peak)</div>
                  </div>
                </div>
                <p className="text-xs text-warm-400 mt-2 text-center">
                  Based on {content.rentalIncomeEstimate.occupancyRate}% occupancy rate
                </p>
              </div>
              
              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <PriceGrowthChart data={content.priceChartData} />
                <RentalYieldChart data={content.rentalYieldData} />
              </div>
              
              {/* Habeno CTA */}
              <div className="mt-6 p-4 bg-white/70 rounded-lg">
                <p className="text-warm-600 mb-3">
                  <strong>Need financing?</strong> We work with Habeno, a mortgage aggregator who compares offers from multiple Spanish banks.
                </p>
                <a
                  href={HABENO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-success-700 hover:text-success-800 font-semibold"
                >
                  Start Your Mortgage Application
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ==================== WHY BUY THIS PROPERTY ==================== */}
            <div className="bg-gradient-to-br from-primary-50 to-warm-100 border border-primary-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why Buy This Property?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.sellingPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-primary-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-warm-600 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== FEATURES LIST ==================== */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
                <h2 className="text-xl font-bold text-primary-900 mb-4">All Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-warm-600">
                      <svg className="w-4 h-4 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== HELPFUL RESOURCES ==================== */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Helpful Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/guides/buying-process" className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">Buying Process Guide</div>
                    <div className="text-sm text-warm-500">Step-by-step guide for foreign buyers</div>
                  </div>
                </Link>

                <Link href="/guides/nie-number" className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">NIE Number Guide</div>
                    <div className="text-sm text-warm-500">How to get your Spanish tax ID</div>
                  </div>
                </Link>

                <Link href="/guides/mortgages" className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">Mortgage Guide</div>
                    <div className="text-sm text-warm-500">Financing options for non-residents</div>
                  </div>
                </Link>

                <Link href={`/areas/${townSlug}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">Area Guide: {property.town || 'Costa Blanca'}</div>
                    <div className="text-sm text-warm-500">Discover the local lifestyle</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* ==================== FAQ ACCORDION ==================== */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Frequently Asked Questions</h2>
              <div className="divide-y divide-warm-200">
                {content.faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqIndex === i}
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  />
                ))}
              </div>
            </div>

            {/* ==================== BOTTOM CTA ==================== */}
            <div className="bg-gradient-to-br from-accent-50 via-warm-100 to-accent-100 rounded-xl p-6 border border-accent-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900">This Won't Last Long</h3>
              </div>
              <p className="text-warm-600 mb-4">
                Quality properties in {property.town} are selling fast. Secure your viewing before someone else does.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-success-600 hover:bg-success-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Now
                </a>
                <a
                  href={PHONE_TEL}
                  className="bg-primary-700 hover:bg-primary-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>

            {/* ==================== SIMILAR PROPERTIES ==================== */}
            {similarProperties.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-4">Similar Properties</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {similarProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            )}

            {/* ==================== VIEW ALL PROPERTIES CTA ==================== */}
            <div className="text-center">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                View All Properties
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ==================== SIDEBAR ==================== */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-warm-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={AGENT_PHOTO}
                      alt="Oskar Peterson - Property Specialist"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900">Oskar Peterson</h4>
                    <p className="text-sm text-warm-500">Property Specialist</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-warm-400 ml-1">(50+ reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-warm-600">
                  I help international buyers find their perfect home in Costa Blanca. I speak English, Swedish, and Spanish.
                </p>
              </div>

              {/* Video Tour CTA */}
              <div className="rounded-xl p-5 shadow-sm bg-primary-900">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-xl">📹</span>
                  Request Video Tour
                </h4>
                <p className="text-sm text-primary-200 mb-4">
                  Cannot visit in person? Request a live video walkthrough of this property.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Request Video Tour
                </a>
              </div>

              {/* Contact Card */}
              <div id="lead-form-section" className="bg-gradient-to-br from-accent-50 to-warm-100 rounded-xl p-5 shadow-sm">
                {property.price && (
                  <div className="text-center mb-4 pb-4 border-b border-warm-200">
                    <div className="text-3xl font-bold text-primary-900">
                      {formatPrice(property.price)}
                    </div>
                    <p className="text-sm text-warm-500">Guide price</p>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-success-600 hover:bg-success-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                  
                  <a
                    href={PHONE_TEL}
                    className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call: {PHONE_NUMBER}
                  </a>
                </div>

                {/* Lead Form */}
                {formSubmitted ? (
                  <div className="bg-success-50 border border-success-200 rounded-lg p-4 text-center">
                    <svg className="w-10 h-10 mx-auto text-success-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-success-800 font-medium">Thank you!</p>
                    <p className="text-sm text-success-600">We'll be in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                    />
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Request Information
                    </button>
                  </form>
                )}
              </div>

              {/* Mortgage CTA */}
              <div className="bg-gradient-to-br from-success-50 to-warm-100 border border-success-200 rounded-xl p-5">
                <h4 className="font-bold text-primary-900 mb-2">Need Financing?</h4>
                <p className="text-sm text-warm-600 mb-3">
                  Get mortgage quotes from multiple Spanish banks with our partner Habeno.
                </p>
                <a
                  href={HABENO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-success-600 hover:bg-success-700 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Get Mortgage Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Video Visit Box */}
              <div className="bg-primary-900 text-white rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Book a Video Visit</h4>
                    <p className="text-xs text-primary-300">See the property from anywhere</p>
                  </div>
                </div>
                <p className="text-sm text-primary-200 mb-3">
                  Can't visit in person? Schedule a live video tour with our team.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Schedule Video Call
                </a>
              </div>

              {/* Floorplan Box */}
              <div className="bg-gradient-to-br from-warm-100 to-warm-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900">Request Floor Plans</h4>
                    <p className="text-xs text-warm-500">Get detailed layouts</p>
                  </div>
                </div>
                <p className="text-sm text-warm-600 mb-3">
                  Get floor plans and full specifications for this property.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary-700 hover:bg-primary-800 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Request Floor Plans
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
