import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import carouselData from '@/content/homepage-carousels.json';
import {
  organizationSchema,
  websiteSchema,
  aggregateRatingSchema,
  toJsonLd,
} from '@/lib/schema';
// TODO: Re-enable SmartSearch once properties page supports advanced filtering
// import SmartSearch from '@/components/search/SmartSearch';

export const metadata: Metadata = {
  title: 'New Build Homes Costa Blanca | Premium Properties in Spain',
  description: 'Discover new build properties in Costa Blanca, Spain. Golf villas, sea view apartments, luxury homes from €164,000. Expert guidance for international buyers.',
  openGraph: {
    title: 'New Build Homes Costa Blanca | Premium Properties in Spain',
    description: 'Discover new build properties in Costa Blanca, Spain. Golf villas, sea view apartments, luxury homes.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com',
    siteName: 'New Build Homes Costa Blanca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury new build villas and apartments in Costa Blanca, Spain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Build Homes Costa Blanca | Premium Properties in Spain',
    description: 'Discover new build properties in Costa Blanca, Spain. Golf villas, sea view apartments, luxury homes from €164,000.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'nl': 'https://newbuildhomescostablanca.com/nl',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be',
      'fr': 'https://newbuildhomescostablanca.com/fr',
      'no': 'https://newbuildhomescostablanca.com/no',
      'de': 'https://newbuildhomescostablanca.com/de',
      'pl': 'https://newbuildhomescostablanca.com/pl',
      'ru': 'https://newbuildhomescostablanca.com/ru',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

// Hansson & Hertzell aggregate rating (parent company reviews)
const HH_RATING = {
  ratingValue: 4.9,
  reviewCount: 127,
  itemName: 'New Build Homes Costa Blanca',
};

// Helper to format price
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Hardcoded Miralbo luxury villas with local images
const miralboVillas = {
  villaAtlantis: {
    slug: 'villa-atlantis',
    title: 'Villa Atlantis',
    town: 'Jávea',
    zone: 'Cap Martí',
    price: 1550000,
    bedrooms: 4,
    bathrooms: 5,
    builtArea: 235,
    plotArea: 1000,
    image: '/images/developments/atlantis.jpeg',
  },
  villaPosidonia: {
    slug: 'villa-posidonia',
    title: 'Villa Posidonia',
    town: 'Jávea',
    zone: 'Monte Olimpo',
    price: 1425000,
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 165,
    plotArea: 1000,
    image: '/images/developments/posidionia.jpg',
  },
  villaMIR0159: {
    slug: 'villa-mir0159',
    title: 'Villa MIR0159',
    town: 'Jávea',
    zone: 'Montgó',
    price: 2565000,
    bedrooms: 4,
    bathrooms: 5,
    builtArea: 280,
    plotArea: 1200,
    image: '/images/developments/miro159.jpg',
  },
};

// Get featured properties from carousels
function getFeaturedProperties() {
  const { carousels } = carouselData;
  return {
    // Hero - show two affordable key-ready properties
    heroLeft: carousels['south-under400k'].properties[2], // Torrevieja
    heroRight: carousels['south-under400k'].properties[0], // Algorfa
    // Affordable showcase
    affordable: carousels['south-under400k'].properties.slice(0, 6),
    // South villas for dual spotlight
    southVilla1: carousels['south-luxury'].properties[1], // Doña Patro
    southVilla2: carousels['south-luxury'].properties[2], // Laguna Azul
    // Inland properties - Pinoso villas OVER €400k
    inland1: carousels['south-inland'].properties[0], // Pinoso Estate Villa €518k
    inland2: carousels['south-inland'].properties[1], // Pinoso Grand Villa €547k
    // Golf properties for dual spotlight
    golf1: carousels['south-golf'].properties[0],
    golf2: carousels['south-golf'].properties[1],
    // North properties
    northProperties: carousels['north-luxury'].properties.slice(0, 4),
    // Bespoke - luxury for bottom
    bespokeLeft: carousels['north-luxury'].properties[0],
    bespokeRight: carousels['north-luxury'].properties[1],
  };
}

export default function HomePage() {
  const featured = getFeaturedProperties();
  const { carousels } = carouselData;

  // Homepage schemas
  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();
  const ratingSchema = aggregateRatingSchema({
    ...HH_RATING,
    itemType: 'RealEstateAgent',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(siteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(ratingSchema) }} />

    <main className="min-h-screen bg-warm-50">
      {/* ============================================ */}
      {/* HERO — Verity-inspired with search bar */}
      {/* ============================================ */}
      <section className="relative h-[80vh] min-h-[560px] max-h-[780px] -mt-16 md:-mt-20">
        {/* Single cinematic background */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Drone 2/Areas & Zones/Torrevieja/Cabo Cervera .jpg"
            alt="Aerial drone view of the Costa Blanca coastline, Spain"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <p className="text-[11px] md:text-xs font-medium tracking-[0.3em] uppercase text-warm-300 mb-4">
            New Build Property Specialists · Costa Blanca
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-4 max-w-3xl">
            Find your home in{' '}
            <span className="italic">the sun</span>
          </h1>

          <p className="text-warm-300 text-base md:text-lg max-w-lg mb-8">
            Key-ready properties from €164,000. Over 500 new builds across Costa Blanca South & North.
          </p>

          {/* Search Bar — Verity-style */}
          <div className="w-full max-w-2xl">
            <Link
              href="/properties"
              className="flex items-center bg-white/95 backdrop-blur-sm overflow-hidden group hover:bg-white transition-colors"
            >
              <div className="flex-1 px-6 py-4 text-left">
                <span className="text-warm-400 text-base">Search by area, town, or property type…</span>
              </div>
              <div className="bg-accent-500 hover:bg-accent-600 px-8 py-4 flex items-center gap-2 transition-colors">
                <span className="text-white text-sm font-medium tracking-wide uppercase hidden sm:inline">Find Your Home</span>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </Link>

            {/* Quick filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[
                { label: 'Key Ready', href: '/properties/key-ready' },
                { label: 'Under €300k', href: '/properties/under-300k' },
                { label: 'Golf Properties', href: '/golf' },
                { label: 'Luxury Villas', href: '/luxury' },
                { label: 'Sea View', href: '/properties?features=sea-view' },
              ].map((pill) => (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className="text-xs tracking-wide text-white/80 hover:text-white border border-white/25 hover:border-white/50 px-3 py-1.5 transition-all hover:bg-white/10"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* EXPLORE — Circular photo grid (Instagram highlights) */}
      {/* ============================================ */}
      <section className="py-10 md:py-14 bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 animate-on-scroll">
            <h2 className="font-display text-2xl md:text-3xl font-light text-primary-900">
              Explore
            </h2>
          </div>

          {/* Circular grid — 6 categories, Verity-style fade-up staggered */}
          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center stagger-children">
            {[
              {
                label: 'Key Ready',
                href: '/properties/key-ready',
                image: 'https://fotos15.apinmo.com/7515/21616952/3-1.jpg',
              },
              {
                label: 'Luxury',
                href: '/luxury',
                image: '/images/developments/atlantis.jpeg',
              },
              {
                label: 'Golf',
                href: '/golf',
                image: 'https://fotos15.apinmo.com/7515/16689067/12-1.jpg',
              },
              {
                label: 'Villas',
                href: '/properties/villas',
                image: '/images/developments/posidionia.jpg',
              },
              {
                label: 'Sea View',
                href: '/properties?features=sea-view',
                image: '/images/Drone 2/Areas & Zones/Torrevieja/La Mata/La Mata .jpg',
              },
              {
                label: 'Areas',
                href: '/areas',
                image: '/images/Drone 2/Areas & Zones/Orihuela Costa/Cala Capitan .jpg',
              },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center gap-2.5 group flex-shrink-0 animate-on-scroll"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-warm-200 group-hover:ring-accent-500 transition-all duration-500 p-[3px] bg-white">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
                <span className="text-xs tracking-wide uppercase text-warm-600 group-hover:text-primary-900 transition-colors font-medium">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DESTINATION GUIDES - Immersive area guides */}
      {/* ============================================ */}
      <section className="py-16 md:py-20 bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 animate-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                Explore Destinations
              </span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Complete <span className="font-semibold">Living Guides</span>
            </h2>
            <p className="text-warm-500 mt-2 max-w-xl mx-auto text-sm">
              The most comprehensive neighborhood guides on the internet — with aerial photography, property prices, and insider tips.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto stagger-children">
            {/* Torrevieja Guide */}
            <Link
              href="/guides/torrevieja"
              className="animate-on-scroll group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src="/images/Drone 2/Areas & Zones/Torrevieja/La Mata/La Mata .jpg"
                  alt="Aerial drone view of Torrevieja coastline and beaches"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
                    Super Guide
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-900 mb-1.5 group-hover:text-accent-600 transition-colors">
                  Living in Torrevieja
                </h3>
                <p className="text-warm-500 text-sm mb-3">
                  7 neighborhoods with helicopter drone photography. Costa Blanca South.
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded">104+ photos</span>
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded">7 zones</span>
                </div>
              </div>
            </Link>

            {/* Jávea Guide */}
            <Link
              href="/guides/javea"
              className="animate-on-scroll group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src="/images/Area canvas/Javea.png"
                  alt="Aerial view of Jávea coastline with Montgó mountain"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
                    Super Guide
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-900 mb-1.5 group-hover:text-accent-600 transition-colors">
                  Living in Jávea
                </h3>
                <p className="text-warm-500 text-sm mb-3">
                  4 neighborhoods beneath Montgó mountain. Costa Blanca North.
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded">4 neighborhoods</span>
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded">7 beaches</span>
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded">20 min</span>
                </div>
              </div>
            </Link>

            {/* Costa Blanca North Guide */}
            <Link
              href="/guides/costa-blanca-north"
              className="animate-on-scroll group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src="/images/Area canvas/Calpe.png"
                  alt="Aerial view of Calpe and Peñón de Ifach"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
                    Region Guide
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-900 mb-1.5 group-hover:text-accent-600 transition-colors">
                  Costa Blanca North
                </h3>
                <p className="text-warm-500 text-sm mb-3">
                  6 towns compared with aerial photography. The complete region overview.
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded">6 towns</span>
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded">Region guide</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-6">
            <Link href="/guides" className="text-accent-600 hover:text-accent-500 text-sm font-medium transition-colors">
              View All Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* AFFORDABLE KEY-READY SECTION — Verity-style */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header — Verity editorial style */}
          <div className="animate-on-scroll mb-10 md:mb-14">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-warm-500 mb-3">
              Homes of the Month
            </p>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl md:text-4xl font-light text-primary-900 leading-tight">
                Key-Ready Under €400k
              </h2>
              <Link
                href="/properties?maxPrice=400000&isKeyReady=true"
                className="hidden md:inline-flex items-center gap-2 text-primary-900 text-sm tracking-wide uppercase hover:text-accent-600 transition-colors group border border-primary-900 px-5 py-2.5 hover:border-accent-600"
              >
                View All
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="w-full h-px bg-warm-200 mt-4" />
          </div>

          {/* Property Grid — Tall vertical cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
            {featured.affordable.slice(0, 3).map((property) => (
              <Link
                key={property.reference}
                href={`/properties/${property.reference}`}
                className="animate-on-scroll group block"
              >
                {/* Tall Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-5">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Heart icon — bottom right (decorative) */}
                  <div
                    className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-sm"
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                </div>

                {/* Card Details — Verity layout */}
                <div className="space-y-2.5">
                  {/* Name + Price row */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-base md:text-lg tracking-wide uppercase text-primary-900 group-hover:text-accent-600 transition-colors leading-tight">
                      {property.title}
                    </h3>
                    <span className="font-display text-lg md:text-xl text-primary-900 whitespace-nowrap">
                      {formatPrice(property.price)}
                    </span>
                  </div>

                  {/* Development + Town */}
                  <p className="text-xs tracking-wide uppercase text-warm-500">
                    {property.development} · {property.town}
                  </p>

                  {/* Beds/Baths + Feature */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-4 text-warm-600">
                      {/* Bed icon */}
                      <span className="flex items-center gap-1.5 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 17V8h2V6a2 2 0 012-2h4a2 2 0 012 2v2h4a2 2 0 012 2v3h2v6h-2v-2H4v2H2zm4-9h4V6H6v2z" />
                        </svg>
                        {property.bedrooms}
                      </span>
                      {/* Bath icon */}
                      <span className="flex items-center gap-1.5 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14a1 1 0 011 1v1a5 5 0 01-3 4.58V20H7v-1.42A5 5 0 014 14v-1a1 1 0 011-1zm1-5a3 3 0 016 0v5" />
                        </svg>
                        {property.bathrooms}
                      </span>
                    </div>
                    {/* Feature highlight */}
                    <span className="text-xs tracking-wider uppercase text-warm-500">
                      {property.features?.[0] || `${property.builtArea}m² Built`}
                    </span>
                  </div>

                  {/* Tag pill */}
                  <div className="pt-1">
                    <span className="inline-block bg-warm-200/80 text-primary-900 text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5">
                      {property.isKeyReady ? 'Key Ready' : 'New Build'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-10 md:hidden text-center">
            <Link
              href="/properties?maxPrice=400000&isKeyReady=true"
              className="inline-flex items-center gap-2 text-primary-900 text-sm tracking-wide uppercase border border-primary-900 px-6 py-3 hover:bg-primary-900 hover:text-white transition-all"
            >
              View All Properties
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DUAL SPOTLIGHT - SOUTH VILLAS */}
      {/* ============================================ */}
      <section className="relative">
        <div className="grid md:grid-cols-2 min-h-[450px]">
          {/* Left Villa - Full Image with Opaque Panel */}
          <Link
            href={`/properties/${featured.southVilla1.reference}`}
            className="group relative h-[350px] md:h-auto overflow-hidden"
          >
            <Image
              src={featured.southVilla1.image}
              alt={featured.southVilla1.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent" />

            {/* Opaque Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                {featured.southVilla1.isKeyReady && (
                  <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                    Key Ready
                  </span>
                )}
                {featured.southVilla1.hasPool && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">
                    Private Pool
                  </span>
                )}
              </div>
              <h3 className="text-xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.southVilla1.title}
              </h3>
              <p className="text-warm-300 text-sm mb-2">{featured.southVilla1.town}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(featured.southVilla1.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {featured.southVilla1.bedrooms} bed · {featured.southVilla1.builtArea}m²
                </span>
              </div>
            </div>
          </Link>

          {/* Right Villa - Full Image with Opaque Panel */}
          <Link
            href={`/properties/${featured.southVilla2.reference}`}
            className="group relative h-[350px] md:h-auto overflow-hidden"
          >
            <Image
              src={featured.southVilla2.image}
              alt={featured.southVilla2.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent" />

            {/* Opaque Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                {featured.southVilla2.isKeyReady && (
                  <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                    Key Ready
                  </span>
                )}
                {featured.southVilla2.hasPool && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">
                    Private Pool
                  </span>
                )}
              </div>
              <h3 className="text-xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.southVilla2.title}
              </h3>
              <p className="text-warm-300 text-sm mb-2">{featured.southVilla2.town}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(featured.southVilla2.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {featured.southVilla2.bedrooms} bed · {featured.southVilla2.builtArea}m²
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Section Label */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-primary-900/80 backdrop-blur-sm px-5 py-2 rounded-sm">
            <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
              South Villas from €449k
            </span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INLAND PROPERTIES - Parallax Style (like Bespoke) */}
      {/* ============================================ */}
      <section className="relative">
        {/* Section Header */}
        <div className="bg-warm-50 py-6 border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-10 h-px bg-warm-400" />
              <span className="text-warm-500 text-xs font-medium tracking-widest uppercase">
                Countryside Living
              </span>
              <div className="w-10 h-px bg-warm-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Pinoso Villas from €518k
            </h2>
            <p className="text-warm-500 mt-2 text-sm">
              Peaceful countryside living with private pools, larger plots, and exceptional value
            </p>
          </div>
        </div>

        {/* Dual Parallax Full-Width */}
        <div className="grid md:grid-cols-2 h-[500px]">
          {/* Left Inland Property */}
          <Link
            href={`/properties/${featured.inland1.reference}`}
            className="group relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url(${featured.inland1.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-900 via-warm-900/40 to-transparent group-hover:via-warm-900/50 transition-all duration-500" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="bg-warm-600/90 text-white text-xs px-2 py-1 rounded-sm">
                  {featured.inland1.zone}
                </span>
                {featured.inland1.isKeyReady && (
                  <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">
                    Key Ready
                  </span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.inland1.title}
              </h3>
              <p className="text-warm-300 text-sm mb-3">{featured.inland1.town}</p>
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(featured.inland1.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {featured.inland1.bedrooms} bed · {featured.inland1.builtArea}m²
                </span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Right Inland Property */}
          <Link
            href={`/properties/${featured.inland2.reference}`}
            className="group relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url(${featured.inland2.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-900 via-warm-900/40 to-transparent group-hover:via-warm-900/50 transition-all duration-500" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="bg-warm-600/90 text-white text-xs px-2 py-1 rounded-sm">
                  {featured.inland2.zone}
                </span>
                {featured.inland2.hasPool && (
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm backdrop-blur-sm">
                    Private Pool
                  </span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.inland2.title}
              </h3>
              <p className="text-warm-300 text-sm mb-3">{featured.inland2.town}</p>
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(featured.inland2.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {featured.inland2.bedrooms} bed · {featured.inland2.builtArea}m²
                </span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* View All Inland Link */}
        <div className="bg-warm-100 py-4 text-center">
          <Link
            href="/properties/inland"
            className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
          >
            Explore All Inland Properties
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY CHOOSE US - A Different Approach */}
      {/* ============================================ */}
      <section className="py-14 md:py-18 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="animate-on-scroll">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Why Us
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-3">
                A Different Approach
              </h2>
              <p className="text-warm-600 leading-relaxed mb-5">
                We work directly with developers, personally vet every property,
                and provide end-to-end support for international buyers.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-900 text-white px-5 py-2.5 rounded-sm font-medium hover:bg-primary-800 transition-colors group text-sm"
              >
                Start a Conversation
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 stagger-children">
              <div className="animate-on-scroll bg-white p-4 rounded-sm border border-warm-200">
                <div className="w-9 h-9 bg-accent-100 rounded-sm flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary-900 mb-1 text-sm">Vetted Developers</h3>
                <p className="text-warm-600 text-xs">Proven track records only.</p>
              </div>

              <div className="animate-on-scroll bg-white p-4 rounded-sm border border-warm-200">
                <div className="w-9 h-9 bg-primary-100 rounded-sm flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary-900 mb-1 text-sm">Multilingual</h3>
                <p className="text-warm-600 text-xs">EN, SE, FR, NL, ES.</p>
              </div>

              <div className="animate-on-scroll bg-white p-4 rounded-sm border border-warm-200">
                <div className="w-9 h-9 bg-success-100 rounded-sm flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary-900 mb-1 text-sm">Mortgage Help</h3>
                <p className="text-warm-600 text-xs">Compare Spanish banks.</p>
              </div>

              <div className="animate-on-scroll bg-white p-4 rounded-sm border border-warm-200">
                <div className="w-9 h-9 bg-warm-100 rounded-sm flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary-900 mb-1 text-sm">Virtual Tours</h3>
                <p className="text-warm-600 text-xs">View from anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GOLF LIFESTYLE SECTION - Course + Property */}
      {/* ============================================ */}
      <section className="relative">
        <div className="grid md:grid-cols-2 min-h-[550px]">
          {/* Left Side: Golf Course Lifestyle */}
          <div className="relative h-[400px] md:h-auto overflow-hidden bg-success-900">
            {/* Background with golf course image */}
            <Image
              src="/images/lifestyle/golf-course-la-finca.jpg"
              alt="La Finca Golf Course with fairways, water features and mountain views"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-success-900/80 via-success-900/60 to-success-900/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                </div>
                <span className="text-success-200 text-xs font-medium tracking-widest uppercase">
                  Golf Living
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
                Wake Up to<br />
                <span className="font-semibold">Fairway Views</span>
              </h2>

              <p className="text-success-100 mb-6 max-w-md leading-relaxed">
                Live on championship courses at La Finca, Lo Romero & Vistabella.
                Year-round sunshine, key-ready villas, and golf on your doorstep.
              </p>

              {/* Golf course stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div>
                  <div className="text-2xl font-semibold text-white">8+</div>
                  <div className="text-success-200 text-xs uppercase tracking-wide">Golf Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">320</div>
                  <div className="text-success-200 text-xs uppercase tracking-wide">Days of Sun</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">€399k</div>
                  <div className="text-success-200 text-xs uppercase tracking-wide">From</div>
                </div>
              </div>

              <Link
                href="/golf"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-300 transition-colors group text-sm w-fit"
              >
                Explore All Golf Properties
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side: Featured Key-Ready Golf Property */}
          <Link
            href={`/properties/${featured.golf1.reference}`}
            className="group relative h-[400px] md:h-auto overflow-hidden"
          >
            <Image
              src={featured.golf1.image}
              alt={featured.golf1.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/30 to-transparent" />

            {/* Featured Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-accent-500 text-white text-xs px-3 py-1.5 rounded-sm font-medium">
                Featured
              </span>
            </div>

            {/* Property Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="3" />
                  </svg>
                  {featured.golf1.zone}
                </span>
                {featured.golf1.isKeyReady && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">
                    Key Ready
                  </span>
                )}
                {featured.golf1.hasPool && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">
                    Private Pool
                  </span>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.golf1.title}
              </h3>
              <p className="text-warm-300 text-sm mb-3">{featured.golf1.town}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold text-white">
                  {formatPrice(featured.golf1.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {featured.golf1.bedrooms} bed · {featured.golf1.builtArea}m²
                </span>
              </div>

              <div className="flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Second Row: Two More Golf Properties */}
        <div className="grid md:grid-cols-2 h-[350px]">
          {/* Golf Property 2 */}
          <Link
            href={`/properties/${featured.golf2.reference}`}
            className="group relative overflow-hidden"
          >
            <Image
              src={featured.golf2.image}
              alt={featured.golf2.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-success-900/90 via-success-900/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-success-500/90 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="3" />
                  </svg>
                  {featured.golf2.zone}
                </span>
                {featured.golf2.isKeyReady && (
                  <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">
                    Key Ready
                  </span>
                )}
              </div>
              <h3 className="text-lg font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.golf2.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-white">
                  {formatPrice(featured.golf2.price)}
                </span>
                <span className="text-warm-200 text-xs">
                  {featured.golf2.bedrooms} bed · {featured.golf2.builtArea}m²
                </span>
              </div>
            </div>
          </Link>

          {/* Golf Property 3 */}
          <Link
            href={`/properties/${carousels['south-golf'].properties[2]?.reference || featured.golf1.reference}`}
            className="group relative overflow-hidden"
          >
            <Image
              src={carousels['south-golf'].properties[2]?.image || featured.golf1.image}
              alt={carousels['south-golf'].properties[2]?.title || featured.golf1.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-success-900/90 via-success-900/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-success-500/90 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="3" />
                  </svg>
                  {carousels['south-golf'].properties[2]?.zone || featured.golf1.zone}
                </span>
                {(carousels['south-golf'].properties[2]?.isKeyReady || featured.golf1.isKeyReady) && (
                  <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">
                    Key Ready
                  </span>
                )}
              </div>
              <h3 className="text-lg font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {carousels['south-golf'].properties[2]?.title || featured.golf1.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-white">
                  {formatPrice(carousels['south-golf'].properties[2]?.price || featured.golf1.price)}
                </span>
                <span className="text-warm-200 text-xs">
                  {carousels['south-golf'].properties[2]?.bedrooms || featured.golf1.bedrooms} bed · {carousels['south-golf'].properties[2]?.builtArea || featured.golf1.builtArea}m²
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* View All Golf Link */}
        <div className="bg-success-800 py-4 text-center">
          <Link
            href="/golf"
            className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-accent-300 transition-colors group"
          >
            View All Golf Properties
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================ */}
      {/* COSTA BLANCA NORTH */}
      {/* ============================================ */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">
                  Premium Region
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Costa Blanca North
              </h2>
              <p className="text-warm-600 mt-1 text-sm">
                Jávea, Moraira, Calpe — dramatic coastlines and exclusive properties.
              </p>
            </div>
            <Link
              href="/properties?region=costa-blanca-north"
              className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
            >
              Explore North
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Quick Links: Budget & Region */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/properties/under-300k" className="text-xs bg-warm-100 hover:bg-accent-100 text-primary-900 hover:text-accent-700 px-3 py-1.5 rounded-full border border-warm-200 hover:border-accent-300 transition-all">
              Under €300k
            </Link>
            <Link href="/developments/costa-blanca-north" className="text-xs bg-warm-100 hover:bg-accent-100 text-primary-900 hover:text-accent-700 px-3 py-1.5 rounded-full border border-warm-200 hover:border-accent-300 transition-all">
              North Developments
            </Link>
            <Link href="/properties/inland" className="text-xs bg-warm-100 hover:bg-accent-100 text-primary-900 hover:text-accent-700 px-3 py-1.5 rounded-full border border-warm-200 hover:border-accent-300 transition-all">
              Inland Properties
            </Link>
            <Link href="/builders" className="text-xs bg-warm-100 hover:bg-accent-100 text-primary-900 hover:text-accent-700 px-3 py-1.5 rounded-full border border-warm-200 hover:border-accent-300 transition-all">
              All Builders
            </Link>
          </div>

          {/* Property Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {featured.northProperties.map((property) => (
              <Link
                key={property.reference}
                href={`/properties/${property.reference}`}
                className="group animate-on-scroll"
              >
                <div className="relative h-64 overflow-hidden rounded-sm mb-3">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-1 text-sm">
                  {property.title}
                </h3>
                <p className="text-sm text-warm-500 mb-1">{property.town}</p>
                <div className="text-lg font-semibold text-primary-900">
                  {formatPrice(property.price)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GUIDES SECTION - With Image Cards */}
      {/* ============================================ */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                Resources
              </span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Buyer&apos;s Guides
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {/* Guide Card 1: Buying Process */}
            <Link
              href="/guides/buying-process"
              className="animate-on-scroll group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
                  alt="Signing property documents in Spain"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
                    Essential
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                  The Buying Process in Spain
                </h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  Step-by-step guide from property search to completion. NIE, lawyers, notary, and key handover.
                </p>
                <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                  Read Guide
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Guide Card 2: Costs & Taxes */}
            <Link
              href="/guides/costs-taxes"
              className="animate-on-scroll group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
                  alt="Calculator and financial documents"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-primary-700 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
                    Money
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                  Costs, Taxes & Fees
                </h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  Full breakdown of purchase costs: IVA, stamp duty, notary fees, and ongoing expenses.
                </p>
                <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                  Read Guide
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Guide Card 3: NIE Number */}
            <Link
              href="/guides/nie-number"
              className="animate-on-scroll group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
                  alt="Spanish NIE number application documents"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-success-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
                    Essential
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                  NIE Number Spain 2026
                </h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  How to apply for your Spanish tax ID. Step-by-step process, documents needed, and costs.
                </p>
                <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                  Read Guide
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* View All Guides Link */}
          <div className="text-center mt-8">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
            >
              View All Buyer Guides
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* EXPLORE AREAS - Internal links for SEO */}
      {/* ============================================ */}
      <section className="py-10 bg-warm-50 border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-light text-primary-900">
                Explore <span className="font-semibold">Costa Blanca Areas</span>
              </h2>
              <p className="text-warm-600 text-sm mt-1">
                From seaside towns to peaceful inland villages — find the perfect location for your new home.
              </p>
            </div>
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 bg-primary-900 text-white px-5 py-2.5 rounded-sm font-medium hover:bg-primary-800 transition-colors group text-sm whitespace-nowrap"
            >
              View All Areas
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Jávea', slug: 'javea', tag: 'North' },
              { name: 'Moraira', slug: 'moraira', tag: 'North' },
              { name: 'Calpe', slug: 'calpe', tag: 'North' },
              { name: 'Torrevieja', slug: 'torrevieja', tag: 'South' },
              { name: 'Aspe', slug: 'aspe', tag: 'Inland' },
              { name: 'Orihuela Costa', slug: 'orihuela-costa', tag: 'South' },
              { name: 'Altea', slug: 'altea', tag: 'North' },
              { name: 'Guardamar', slug: 'guardamar-del-segura', tag: 'South' },
              { name: 'San Miguel', slug: 'san-miguel-de-salinas', tag: 'South' },
              { name: 'Pinoso', slug: 'pinoso', tag: 'Inland' },
              { name: 'Benidorm', slug: 'benidorm', tag: 'North' },
              { name: 'Dénia', slug: 'denia', tag: 'North' },
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group bg-white rounded-sm p-3 border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all text-center"
              >
                <span className="block font-medium text-primary-900 group-hover:text-accent-600 transition-colors text-sm">
                  {area.name}
                </span>
                <span className="text-xs text-warm-500">{area.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FROM THE BLOG - Recent articles for SEO */}
      {/* ============================================ */}
      <section className="py-10 bg-white border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-light text-primary-900">
                From the <span className="font-semibold">Blog</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
            >
              All Articles
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/snagging-inspection-spain-new-build" className="group">
              <div className="bg-warm-50 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all h-full overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Image
                    src="/images/Drone 2/Areas & Zones/Orihuela Costa/La Fuente Center .jpg"
                    alt="Aerial view of new build properties in Costa Blanca"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-sm font-medium w-fit">Buying Guide</span>
                  <h3 className="font-semibold text-primary-900 mt-3 mb-2 group-hover:text-accent-600 transition-colors">
                    Snagging Inspections: What to Check in Your New Build
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    A comprehensive guide to new build snagging inspections in Spain — what to look for, when to do it, and your legal rights.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/blog/torrevieja-property-guide" className="group">
              <div className="bg-warm-50 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all h-full overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Image
                    src="/images/Drone 2/Areas & Zones/Torrevieja/La Mata .jpg"
                    alt="Aerial view of Torrevieja coastline and neighborhoods"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-sm font-medium w-fit">Area Guide</span>
                  <h3 className="font-semibold text-primary-900 mt-3 mb-2 group-hover:text-accent-600 transition-colors">
                    Torrevieja Property Guide 2026
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Everything you need to know about buying property in Torrevieja: neighborhoods, prices, lifestyle, and tips.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/blog/cost-of-living-spain" className="group">
              <div className="bg-warm-50 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all h-full overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Image
                    src="/images/Drone 2/Areas & Zones/Orihuela Costa/Agua Marina .jpg"
                    alt="Aerial view of Costa Blanca coastal living area"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs bg-warm-200 text-warm-700 px-2 py-1 rounded-sm font-medium w-fit">Living in Spain</span>
                  <h3 className="font-semibold text-primary-900 mt-3 mb-2 group-hover:text-accent-600 transition-colors">
                    Cost of Living in Spain 2026
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Monthly costs, utilities, groceries, healthcare — a realistic breakdown for expats on the Costa Blanca.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHO ARE YOU? - Buyer Type Section */}
      {/* ============================================ */}
      <section className="py-12 bg-warm-100 border-y border-warm-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-10 h-px bg-primary-400" />
              <span className="text-primary-600 text-xs font-medium tracking-widest uppercase">
                Tailored Advice
              </span>
              <div className="w-10 h-px bg-primary-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              What Type of <span className="font-semibold">Buyer Are You?</span>
            </h2>
            <p className="text-warm-600 mt-2 max-w-xl mx-auto">
              Different buyers have different needs. Find guides tailored to your situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {/* First Time Buyer - Links to Buying Process Guide */}
            <Link
              href="/guides/buying-process"
              className="animate-on-scroll group bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors">
                <svg className="w-6 h-6 text-accent-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                First Time Buyer in Spain?
              </h3>
              <p className="text-warm-600 text-sm leading-relaxed mb-4">
                Everything you need to know: NIE numbers, the buying process, costs, legal requirements, and step-by-step guidance.
              </p>
              <span className="inline-flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                Read the Complete Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Planning to Rent? - Links to Tourist Rental License Guide */}
            <Link
              href="/guides/tourist-rental-license"
              className="animate-on-scroll group bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-success-500 transition-colors">
                <svg className="w-6 h-6 text-success-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                Planning to Rent Your Property?
              </h3>
              <p className="text-warm-600 text-sm leading-relaxed mb-4">
                Learn about tourist rental licenses in Valencia. New 2025 regulations, requirements, costs, and how we can help.
              </p>
              <span className="inline-flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                Tourist License Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Costa Blanca vs Costa Calida */}
            <Link
              href="/areas/costa-calida"
              className="animate-on-scroll group bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <svg className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                Costa Blanca vs Costa Calida
              </h3>
              <p className="text-warm-600 text-sm leading-relaxed mb-4">
                Not sure which coast? Compare Alicante&apos;s Costa Blanca with Murcia&apos;s Costa Calida - prices, climate, and lifestyle.
              </p>
              <span className="inline-flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                See the Comparison
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BESPOKE / LUXURY VILLAS - Multiple Rows with Miralbo */}
      {/* ============================================ */}
      <section className="relative">
        {/* Section Header */}
        <div className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                Bespoke Collection
              </span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Luxury Villas from €800k+
            </h2>
            <p className="text-warm-500 mt-2 text-sm">
              Handpicked premium properties in Jávea, Moraira & Costa Blanca North
            </p>
          </div>
        </div>

        {/* Row 1: Original Bespoke Properties */}
        <div className="grid md:grid-cols-2 h-[500px]">
          {/* Left Bespoke Villa */}
          <Link
            href={`/properties/${featured.bespokeLeft.reference}`}
            className="group relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url(${featured.bespokeLeft.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">
                  Sea Views
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm backdrop-blur-sm">
                  Private Pool
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.bespokeLeft.title}
              </h3>
              <p className="text-warm-300 text-sm mb-3">{featured.bespokeLeft.town}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(featured.bespokeLeft.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {featured.bespokeLeft.bedrooms} bed · {featured.bespokeLeft.builtArea}m²
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Right Bespoke Villa */}
          <Link
            href={`/properties/${featured.bespokeRight.reference}`}
            className="group relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url(${featured.bespokeRight.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">
                  Premium
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm backdrop-blur-sm">
                  Private Pool
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {featured.bespokeRight.title}
              </h3>
              <p className="text-warm-300 text-sm mb-3">{featured.bespokeRight.town}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(featured.bespokeRight.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {featured.bespokeRight.bedrooms} bed · {featured.bespokeRight.builtArea}m²
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Row 2: Miralbo Villas - Villa MIR0155 & Villa Posidonia */}
        <div className="grid md:grid-cols-2 h-[500px]">
          {/* Villa MIR0155 */}
          <Link
            href={`/developments/${miralboVillas.villaAtlantis.slug}`}
            className="group relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url(${miralboVillas.villaAtlantis.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-700/90 text-white text-xs px-2 py-1 rounded-sm">
                  Miralbo Urbana
                </span>
                <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">
                  {miralboVillas.villaAtlantis.zone}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {miralboVillas.villaAtlantis.title}
              </h3>
              <p className="text-warm-300 text-sm mb-3">{miralboVillas.villaAtlantis.town}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(miralboVillas.villaAtlantis.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {miralboVillas.villaAtlantis.bedrooms} bed · {miralboVillas.villaAtlantis.builtArea}m² · {miralboVillas.villaAtlantis.plotArea}m² plot
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Villa Posidonia */}
          <Link
            href={`/developments/${miralboVillas.villaPosidonia.slug}`}
            className="group relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url(${miralboVillas.villaPosidonia.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-700/90 text-white text-xs px-2 py-1 rounded-sm">
                  Miralbo Urbana
                </span>
                <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">
                  {miralboVillas.villaPosidonia.zone}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">
                {miralboVillas.villaPosidonia.title}
              </h3>
              <p className="text-warm-300 text-sm mb-3">{miralboVillas.villaPosidonia.town}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(miralboVillas.villaPosidonia.price)}
                </span>
                <span className="text-warm-300 text-sm">
                  {miralboVillas.villaPosidonia.bedrooms} bed · {miralboVillas.villaPosidonia.builtArea}m² · {miralboVillas.villaPosidonia.plotArea}m² plot
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Property
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Row 3: Villa Momentum (full-width feature) */}
        <Link
          href={`/developments/${miralboVillas.villaMIR0159.slug}`}
          className="group relative block h-[400px] overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${miralboVillas.villaMIR0159.image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-transparent group-hover:via-primary-900/60 transition-all duration-500" />

          {/* Content Overlay - Left Side */}
          <div className="absolute bottom-0 left-0 right-0 md:right-1/2 p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary-700/90 text-white text-xs px-3 py-1.5 rounded-sm">
                Miralbo Urbana
              </span>
              <span className="bg-accent-500/90 text-white text-xs px-3 py-1.5 rounded-sm">
                {miralboVillas.villaMIR0159.zone}
              </span>
              <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-sm backdrop-blur-sm">
                Sea & Montgó Views
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-accent-300 transition-colors">
              {miralboVillas.villaMIR0159.title}
            </h3>
            <p className="text-warm-300 text-sm mb-4">{miralboVillas.villaMIR0159.town} — Contemporary Mediterranean Living</p>
            <div className="flex items-center gap-6 mb-4">
              <span className="text-2xl font-semibold text-white">
                {formatPrice(miralboVillas.villaMIR0159.price)}
              </span>
              <span className="text-warm-300 text-sm">
                {miralboVillas.villaMIR0159.bedrooms} bed · {miralboVillas.villaMIR0159.bathrooms} bath · {miralboVillas.villaMIR0159.builtArea}m² · {miralboVillas.villaMIR0159.plotArea}m² plot
              </span>
            </div>
            <div className="flex items-center gap-2 text-accent-400 font-medium group-hover:gap-3 transition-all">
              Discover Villa Momentum
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        {/* View Bespoke Collection Link */}
        <div className="bg-white py-4 text-center">
          <Link
            href="/properties?minPrice=800000"
            className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
          >
            Explore Full Bespoke Collection
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONSULTATION CTA SECTION */}
      {/* ============================================ */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 py-14 md:py-18 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-4 leading-tight">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg md:text-xl text-warm-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book a Free 30-Minute Consultation with an experienced real estate agent with over 12 years of experience selling new builds in Costa Blanca. Get honest, personal advice — completely free, no obligation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all duration-300 w-full sm:w-auto text-center"
              >
                Book Free Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-success-500 hover:bg-success-600 text-white font-medium px-8 py-3 rounded-sm transition-all duration-300 w-full sm:w-auto text-center"
              >
                WhatsApp Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
