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

// Export metadata for Flemish Dutch homepage
export const metadata: Metadata = {
  title: 'Nieuwbouw Costa Blanca | Villa\'s & Appartementen in Spanje',
  description: 'Vind uw droomwoning op Costa Blanca, Spanje. Nieuwbouw villa\'s, appartementen en rijtjeshuizen vanaf €164.000. Deskundig advies voor Belgische kopers.',
  keywords: 'nieuwbouw Costa Blanca, huizen kopen Spanje, woning Costa Blanca, villa Costa Blanca, appartementen Spanje',
  openGraph: {
    title: 'Nieuwbouw Costa Blanca | Villa\'s & Appartementen in Spanje',
    description: 'Vind uw droomwoning op Costa Blanca. Nieuwbouw villa\'s, appartementen en rijtjeshuizen van betrouwbare bouwers.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl-be',
    siteName: 'Nieuwbouw Costa Blanca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe villa\'s en appartementen op Costa Blanca, Spanje',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nieuwbouw Costa Blanca',
    description: 'Vind uw droomwoning op Costa Blanca, Spanje.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'nl': 'https://newbuildhomescostablanca.com/nl',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-BE',
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
  itemName: 'Nieuwbouw Costa Blanca',
};

// Helper to format price in Belgian Dutch locale
function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-BE', {
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
    heroLeft: carousels['south-under400k'].properties[2],
    heroRight: carousels['south-under400k'].properties[0],
    affordable: carousels['south-under400k'].properties.slice(0, 6),
    southVilla1: carousels['south-luxury'].properties[1],
    southVilla2: carousels['south-luxury'].properties[2],
    inland1: carousels['south-inland'].properties[0],
    inland2: carousels['south-inland'].properties[1],
    golf1: carousels['south-golf'].properties[0],
    golf2: carousels['south-golf'].properties[1],
    northProperties: carousels['north-luxury'].properties.slice(0, 4),
    bespokeLeft: carousels['north-luxury'].properties[0],
    bespokeRight: carousels['north-luxury'].properties[1],
  };
}

export default function FlemishHomepage() {
  const featured = getFeaturedProperties();
  const { carousels } = carouselData;

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
        <section className="bg-primary-900 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="text-warm-300">
                <span className="text-accent-400 font-medium">500+</span> Nieuwbouwoningen
              </span>
              <span className="text-warm-500 hidden sm:inline">|</span>
              <span className="text-warm-300 hidden sm:inline">
                Vanaf <span className="text-accent-400 font-medium">€164.000</span>
              </span>
              <span className="text-warm-500 hidden md:inline">|</span>
              <span className="text-warm-300 hidden md:inline">
                Costa Blanca Noord & Zuid
              </span>
            </div>
          </div>
        </section>

        <section className="relative h-[65vh] min-h-[450px] max-h-[600px]">
          <div className="grid md:grid-cols-2 h-full">
            <div className="relative overflow-hidden">
              <Image
                src={featured.heroLeft.image}
                alt={featured.heroLeft.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-primary-900/20" />
            </div>

            <div className="relative overflow-hidden hidden md:block">
              <Image
                src={featured.heroRight.image}
                alt={featured.heroRight.title}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-primary-900/20" />
            </div>
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto px-6 pb-6 md:pb-10 w-full">
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2 leading-[1.1]">
                  Vind Uw Droomwoning,
                  <span className="font-semibold"> Direct Beschikbaar</span>
                </h1>
                <p className="text-warm-300 max-w-xl mx-auto">
                  Direct beschikbare woningen vanaf €164.000. Uw mediterrane levensstijl begint hier.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/nl-be/properties/${featured.heroLeft.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Direct Beschikbaar
                    </span>
                    <span className="text-warm-300 text-xs">{featured.heroLeft.town}</span>
                  </div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-accent-300 transition-colors">
                    {featured.heroLeft.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-white">
                      {formatPrice(featured.heroLeft.price)}
                    </span>
                    <span className="text-warm-300 text-sm">
                      {featured.heroLeft.bedrooms} slaapkamers · {featured.heroLeft.builtArea}m²
                    </span>
                  </div>
                </Link>

                <Link
                  href={`/nl-be/properties/${featured.heroRight.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Direct Beschikbaar
                    </span>
                    <span className="text-warm-300 text-xs">{featured.heroRight.town}</span>
                  </div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-accent-300 transition-colors">
                    {featured.heroRight.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-white">
                      {formatPrice(featured.heroRight.price)}
                    </span>
                    <span className="text-warm-300 text-sm">
                      {featured.heroRight.bedrooms} slaapkamers · {featured.heroRight.builtArea}m²
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Link
                  href="/nl-be/properties?isKeyReady=true"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  Bekijk Direct Beschikbare Woningen
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/nl-be/properties"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm text-center transition-all border border-white/20"
                >
                  Bekijk Alle Woningen
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Begin hier
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Nieuw op <span className="font-semibold">Costa Blanca?</span>
              </h2>
              <p className="text-warm-600 mt-2 max-w-xl mx-auto">
                Essentiële gidsen om u goed geïnformeerde beslissingen te helpen nemen over huizen kopen in Spanje.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/nl-be/guides/why-new-build" className="group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" alt="Modern nieuwbouw villainterieur met open indeling" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Gids</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Waarom Nieuwbouw Kopen?</h3>
                  <p className="text-warm-600 text-sm leading-relaxed">10-jarige garantie, energiezuinig, geen makelaar, modern design - ontdek de voordelen van nieuwbouw.</p>
                  <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Lees Gids <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                </div>
              </Link>

              <Link href="/nl-be/guides/north-vs-south" className="group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" alt="Costa Blanca kustlijn met blauw water en witte gebouwen" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Gids</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Noord vs Zuid Costa Blanca</h3>
                  <p className="text-warm-600 text-sm leading-relaxed">Klimaat, prijzen, expatgemeenschappen, luchthavens - welk gebied past beter bij uw levensstijl?</p>
                  <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Lees Gids <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                </div>
              </Link>

              <Link href="/nl-be/guides/key-ready-vs-off-plan" className="group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Nieuwbouwontwikkeling in aanbouw op Costa Blanca" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Gids</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Direct Beschikbaar vs Uit Blauwdruk</h3>
                  <p className="text-warm-600 text-sm leading-relaxed">Nu verhuizen of geld besparen? Vergelijk voordelen, nadelen en betalingsopties.</p>
                  <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Lees Gids <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Ontdek Bestemmingen</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white">Uitgebreide <span className="font-semibold">Woongidsen</span></h2>
              <p className="text-warm-300 mt-2 max-w-xl mx-auto text-sm">De meest uitgebreide stadsgidsen op het internet — met dronefotografie, vastgoedprijzen en insider-tips.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              <Link href="/nl-be/guides/torrevieja" className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent-500/50 hover:bg-white/10 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src="/images/Drone 2/Areas & Zones/Torrevieja/La Mata/La Mata ( 1) .jpg" alt="Luchtfoto van Torreviejas kustlijn en stranden" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Supergids</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-accent-400 transition-colors">Wonen in Torrevieja</h3>
                  <p className="text-warm-300 text-sm mb-3">7 wijken met helikopter-dronefotografie. Costa Blanca Zuid.</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">104+ foto's</span>
                    <span className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">7 zones</span>
                  </div>
                </div>
              </Link>

              <Link href="/nl-be/guides/javea" className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent-500/50 hover:bg-white/10 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src="/images/Area canvas/Javea.png" alt="Luchtfoto van Jáveakust met Montgóberg" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Supergids</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-accent-400 transition-colors">Wonen in Jávea</h3>
                  <p className="text-warm-300 text-sm mb-3">4 wijken onder de Montgóberg. Costa Blanca Noord.</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">4 wijken</span>
                    <span className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">7 stranden</span>
                    <span className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">20 min</span>
                  </div>
                </div>
              </Link>

              <Link href="/nl-be/guides/costa-blanca-north" className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent-500/50 hover:bg-white/10 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src="/images/Area canvas/Calpe.png" alt="Luchtfoto van Calpe en Peñón de Ifach" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Regiogids</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-accent-400 transition-colors">Costa Blanca Noord</h3>
                  <p className="text-warm-300 text-sm mb-3">6 steden vergeleken met dronefotografie. Volledig regio-overzicht.</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">6 steden</span>
                    <span className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">Regiogids</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center mt-6">
              <Link href="/nl-be/guides" className="text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors">
                Bekijk Alle Gidsen →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">Beste Waarde</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">Direct Beschikbaar Onder €400k</h2>
              </div>
              <Link href="/nl-be/properties?maxPrice=400000&isKeyReady=true" className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm">
                Bekijk Alle
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.affordable.map((property) => (
                <Link key={property.reference} href={`/nl-be/properties/${property.reference}`} className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-100">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={property.image} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">Direct Beschikbaar</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="text-xl font-semibold text-white">{formatPrice(property.price)}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">{property.title}</h3>
                    <p className="text-sm text-warm-500 mb-2">{property.town}</p>
                    <div className="flex items-center gap-3 text-sm text-warm-600">
                      <span>{property.bedrooms} slaapkamers</span>
                      <span className="text-warm-300">•</span>
                      <span>{property.bathrooms} badkamers</span>
                      <span className="text-warm-300">•</span>
                      <span>{property.builtArea}m²</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="grid md:grid-cols-2 min-h-[450px]">
            <Link href={`/nl-be/properties/${featured.southVilla1.reference}`} className="group relative h-[350px] md:h-auto overflow-hidden">
              <Image src={featured.southVilla1.image} alt={featured.southVilla1.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  {featured.southVilla1.isKeyReady && <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">Direct Beschikbaar</span>}
                  {featured.southVilla1.hasPool && <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">Privé Zwembad</span>}
                </div>
                <h3 className="text-xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.southVilla1.title}</h3>
                <p className="text-warm-300 text-sm mb-2">{featured.southVilla1.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(featured.southVilla1.price)}</span>
                  <span className="text-warm-300 text-sm">{featured.southVilla1.bedrooms} slaapkamers · {featured.southVilla1.builtArea}m²</span>
                </div>
              </div>
            </Link>

            <Link href={`/nl-be/properties/${featured.southVilla2.reference}`} className="group relative h-[350px] md:h-auto overflow-hidden">
              <Image src={featured.southVilla2.image} alt={featured.southVilla2.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  {featured.southVilla2.isKeyReady && <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">Direct Beschikbaar</span>}
                  {featured.southVilla2.hasPool && <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">Privé Zwembad</span>}
                </div>
                <h3 className="text-xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.southVilla2.title}</h3>
                <p className="text-warm-300 text-sm mb-2">{featured.southVilla2.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(featured.southVilla2.price)}</span>
                  <span className="text-warm-300 text-sm">{featured.southVilla2.bedrooms} slaapkamers · {featured.southVilla2.builtArea}m²</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-primary-900/80 backdrop-blur-sm px-5 py-2 rounded-sm">
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Villa's vanaf €449k</span>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="bg-warm-800 py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-warm-400" />
                <span className="text-warm-300 text-xs font-medium tracking-widest uppercase">🏔️ Plattelandsleven</span>
                <div className="w-10 h-px bg-warm-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white">Pinoso Villa's vanaf €518k</h2>
              <p className="text-warm-400 mt-2 text-sm">Rustig plattelandsleven met privé zwembaden, grotere percelen en uitzonderlijke waarde</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 h-[500px]">
            <Link href={`/nl-be/properties/${featured.inland1.reference}`} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${featured.inland1.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-900 via-warm-900/40 to-transparent group-hover:via-warm-900/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-warm-600/90 text-white text-xs px-2 py-1 rounded-sm">{featured.inland1.zone}</span>
                  {featured.inland1.isKeyReady && <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">Direct Beschikbaar</span>}
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.inland1.title}</h3>
                <p className="text-warm-300 text-sm mb-3">{featured.inland1.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(featured.inland1.price)}</span>
                  <span className="text-warm-300 text-sm">{featured.inland1.bedrooms} slaapkamers · {featured.inland1.builtArea}m²</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Bekijk Woning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href={`/nl-be/properties/${featured.inland2.reference}`} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${featured.inland2.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-900 via-warm-900/40 to-transparent group-hover:via-warm-900/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-warm-600/90 text-white text-xs px-2 py-1 rounded-sm">{featured.inland2.zone}</span>
                  {featured.inland2.hasPool && <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm backdrop-blur-sm">Privé Zwembad</span>}
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.inland2.title}</h3>
                <p className="text-warm-300 text-sm mb-3">{featured.inland2.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(featured.inland2.price)}</span>
                  <span className="text-warm-300 text-sm">{featured.inland2.bedrooms} slaapkamers · {featured.inland2.builtArea}m²</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Bekijk Woning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-warm-800 py-4 text-center">
            <Link href="/nl-be/inland" className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-400 transition-colors group text-sm">
              Ontdek Alle Plattelandswoningen
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="py-14 md:py-18 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">Waarom Wij</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-3">Een Ander Aanpak</h2>
                <p className="text-warm-600 leading-relaxed mb-5">
                  We werken direct met ontwikkelaars, controleren persoonlijk elk pand,
                  en bieden volledig ondersteuning voor internationale kopers.
                </p>
                <Link href="/nl-be/contact" className="inline-flex items-center gap-2 bg-primary-900 text-white px-5 py-2.5 rounded-sm font-medium hover:bg-primary-800 transition-colors group text-sm">
                  Begin een Gesprek
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-sm border border-warm-200">
                  <div className="w-9 h-9 bg-accent-100 rounded-sm flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 text-sm">Geverifieerde Ontwikkelaars</h3>
                  <p className="text-warm-600 text-xs">Alleen bewezen track record.</p>
                </div>

                <div className="bg-white p-4 rounded-sm border border-warm-200">
                  <div className="w-9 h-9 bg-primary-100 rounded-sm flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 text-sm">Meertalig</h3>
                  <p className="text-warm-600 text-xs">NL, EN, FR, SV, ES.</p>
                </div>

                <div className="bg-white p-4 rounded-sm border border-warm-200">
                  <div className="w-9 h-9 bg-success-100 rounded-sm flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 text-sm">Hypotheekondersteuning</h3>
                  <p className="text-warm-600 text-xs">Vergelijk Spaanse banken.</p>
                </div>

                <div className="bg-white p-4 rounded-sm border border-warm-200">
                  <div className="w-9 h-9 bg-warm-100 rounded-sm flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 text-sm">Virtuele Rondleidingen</h3>
                  <p className="text-warm-600 text-xs">Bekijk van overal.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="grid md:grid-cols-2 min-h-[550px]">
            <div className="relative h-[400px] md:h-auto overflow-hidden bg-success-900">
              <Image src="/images/lifestyle/golf-course-la-finca.jpg" alt="La Finca golfbaan met fairways, waterfonteinen en bergzicht" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-success-900/80 via-success-900/60 to-success-900/40" />

              <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" strokeWidth={2} />
                    </svg>
                  </div>
                  <span className="text-success-200 text-xs font-medium tracking-widest uppercase">Golflevensstijl</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
                  Wakker Worden Naar<br />
                  <span className="font-semibold">Golfbaanuitzicht</span>
                </h2>

                <p className="text-success-100 mb-6 max-w-md leading-relaxed">
                  Wonen op kampioenschapsbanen bij La Finca, Lo Romero & Vistabella.
                  Het hele jaar zon, direct beschikbare villa's en golf op de drempel.
                </p>

                <div className="flex flex-wrap gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-semibold text-white">8+</div>
                    <div className="text-success-200 text-xs uppercase tracking-wide">Golfbanen</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">320</div>
                    <div className="text-success-200 text-xs uppercase tracking-wide">Zonnedagen</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">€399k</div>
                    <div className="text-success-200 text-xs uppercase tracking-wide">Vanaf</div>
                  </div>
                </div>

                <Link href="/nl-be/golf" className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-300 transition-colors group text-sm w-fit">
                  Ontdek Alle Golfwoningen
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <Link href={`/nl-be/properties/${featured.golf1.reference}`} className="group relative h-[400px] md:h-auto overflow-hidden">
              <Image src={featured.golf1.image} alt={featured.golf1.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/30 to-transparent" />

              <div className="absolute top-4 right-4">
                <span className="bg-accent-500 text-white text-xs px-3 py-1.5 rounded-sm font-medium">Uitgelicht</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                    {featured.golf1.zone}
                  </span>
                  {featured.golf1.isKeyReady && <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">Direct Beschikbaar</span>}
                  {featured.golf1.hasPool && <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">Privé Zwembad</span>}
                </div>

                <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.golf1.title}</h3>
                <p className="text-warm-300 text-sm mb-3">{featured.golf1.town}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-semibold text-white">{formatPrice(featured.golf1.price)}</span>
                  <span className="text-warm-300 text-sm">{featured.golf1.bedrooms} slaapkamers · {featured.golf1.builtArea}m²</span>
                </div>

                <div className="flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Bekijk Woning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 h-[350px]">
            <Link href={`/nl-be/properties/${featured.golf2.reference}`} className="group relative overflow-hidden">
              <Image src={featured.golf2.image} alt={featured.golf2.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-success-900/90 via-success-900/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-success-500/90 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                    {featured.golf2.zone}
                  </span>
                  {featured.golf2.isKeyReady && <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">Direct Beschikbaar</span>}
                </div>
                <h3 className="text-lg font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.golf2.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">{formatPrice(featured.golf2.price)}</span>
                  <span className="text-warm-200 text-xs">{featured.golf2.bedrooms} slaapkamers · {featured.golf2.builtArea}m²</span>
                </div>
              </div>
            </Link>

            <Link href={`/nl-be/properties/${carousels['south-golf'].properties[2]?.reference || featured.golf1.reference}`} className="group relative overflow-hidden">
              <Image src={carousels['south-golf'].properties[2]?.image || featured.golf1.image} alt={carousels['south-golf'].properties[2]?.title || featured.golf1.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-success-900/90 via-success-900/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-success-500/90 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                    {carousels['south-golf'].properties[2]?.zone || featured.golf1.zone}
                  </span>
                  {(carousels['south-golf'].properties[2]?.isKeyReady || featured.golf1.isKeyReady) && <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">Direct Beschikbaar</span>}
                </div>
                <h3 className="text-lg font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{carousels['south-golf'].properties[2]?.title || featured.golf1.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">{formatPrice(carousels['south-golf'].properties[2]?.price || featured.golf1.price)}</span>
                  <span className="text-warm-200 text-xs">{carousels['south-golf'].properties[2]?.bedrooms || featured.golf1.bedrooms} slaapkamers · {carousels['south-golf'].properties[2]?.builtArea || featured.golf1.builtArea}m²</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-success-800 py-4 text-center">
            <Link href="/nl-be/golf" className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-accent-300 transition-colors group">
              Bekijk Alle Golfwoningen
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="py-14 md:py-18 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-primary-700" />
                  <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Premiumregio</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">Costa Blanca Noord</h2>
                <p className="text-warm-600 mt-1 text-sm">Jávea, Moraira, Calpe — dramatische kusten en exclusieve woningen.</p>
              </div>
              <Link href="/nl-be/properties?region=costa-blanca-north" className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm">
                Ontdek Noord
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.northProperties.map((property) => (
                <Link key={property.reference} href={`/nl-be/properties/${property.reference}`} className="group">
                  <div className="relative h-64 overflow-hidden rounded-sm mb-3">
                    <Image src={property.image} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-1 text-sm">{property.title}</h3>
                  <p className="text-sm text-warm-500 mb-1">{property.town}</p>
                  <div className="text-lg font-semibold text-primary-900">{formatPrice(property.price)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">Bronnen</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Kopershandleiding</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/nl-be/guides/kopproces" className="group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" alt="Ondertekening van huisbezitdocumenten in Spanje" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Essentieel</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Kopproces in Spanje</h3>
                  <p className="text-warm-600 text-sm leading-relaxed">Stap-voor-staphandleiding van huiszoeking tot sluiting. NIE, advocaten, registratie en sleuteloverdracht.</p>
                  <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Lees Gids <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                </div>
              </Link>

              <Link href="/nl-be/guides/kosten-belastingen" className="group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" alt="Rekenmachine en financiële documenten" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-primary-700 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Geld</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Kosten, Belastingen & Vergoedingen</h3>
                  <p className="text-warm-600 text-sm leading-relaxed">Volledig overzicht van koopkosten: IVA, stempel, registratiekosten en lopende uitgaven.</p>
                  <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Lees Gids <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                </div>
              </Link>

              <Link href="/nl-be/guides/hypotheken-spanje" className="group relative bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" alt="Huissleutel en hypotheekdocumenten" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-success-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Financiering</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Spaanse Hypotheken voor Buitenlanders</h3>
                  <p className="text-warm-600 text-sm leading-relaxed">Hoe krijgt u een hypotheek in Spanje. Eisen, rentetarieven en hoeveel u kunt lenen.</p>
                  <div className="mt-4 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Lees Gids <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                </div>
              </Link>
            </div>

            <div className="text-center mt-8">
              <Link href="/nl-be/guides" className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm">
                Bekijk Alle Kopershandleidingen
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-warm-100 border-y border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-primary-400" />
                <span className="text-primary-600 text-xs font-medium tracking-widest uppercase">Op Maat Advies</span>
                <div className="w-10 h-px bg-primary-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Welk Type <span className="font-semibold">Koper Bent U?</span>
              </h2>
              <p className="text-warm-600 mt-2 max-w-xl mx-auto">
                Verschillende kopers hebben verschillende behoeften. Vind gidsen aangepast aan uw situatie.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/nl-be/guides/kopproces" className="group bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors">
                  <svg className="w-6 h-6 text-accent-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Eerste Koper in Spanje?</h3>
                <p className="text-warm-600 text-sm leading-relaxed mb-4">Alles wat u moet weten: NIE-nummer, kopproces, kosten, juridische vereisten en stap-voor-stap begeleiding.</p>
                <span className="inline-flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Lees Volledige Gids <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
              </Link>

              <Link href="/nl-be/guides/torrevieja" className="group bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-success-500 transition-colors">
                  <svg className="w-6 h-6 text-success-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Plant u om uw woning te verhuren?</h3>
                <p className="text-warm-600 text-sm leading-relaxed mb-4">Leer over toeristenverhuringvergunningen in Valencia. Nieuwe 2025-regels, vereisten, kosten en hoe wij kunnen helpen.</p>
                <span className="inline-flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Gids voor Toeristenverhuring <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
              </Link>

              <Link href="/nl-be/areas" className="group bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <svg className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Costa Blanca vs Costa Cálida</h3>
                <p className="text-warm-600 text-sm leading-relaxed mb-4">Onzeker welke kust? Vergelijk Alicantes Costa Blanca met Murcias Costa Cálida - prijzen, klimaat en levensstijl.</p>
                <span className="inline-flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">Bekijk Vergelijking <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="bg-primary-900 py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">Op Maat Collectie</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white">Luxe Villa's vanaf €800k+</h2>
              <p className="text-warm-400 mt-2 text-sm">Handgelezen premium woningen in Jávea, Moraira & Costa Blanca Noord</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 h-[500px]">
            <Link href={`/nl-be/properties/${featured.bespokeLeft.reference}`} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${featured.bespokeLeft.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">Zeezicht</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm backdrop-blur-sm">Privé Zwembad</span>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.bespokeLeft.title}</h3>
                <p className="text-warm-300 text-sm mb-3">{featured.bespokeLeft.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(featured.bespokeLeft.price)}</span>
                  <span className="text-warm-300 text-sm">{featured.bespokeLeft.bedrooms} slaapkamers · {featured.bespokeLeft.builtArea}m²</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Bekijk Woning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href={`/nl-be/properties/${featured.bespokeRight.reference}`} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${featured.bespokeRight.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">Premium</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-sm backdrop-blur-sm">Privé Zwembad</span>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{featured.bespokeRight.title}</h3>
                <p className="text-warm-300 text-sm mb-3">{featured.bespokeRight.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(featured.bespokeRight.price)}</span>
                  <span className="text-warm-300 text-sm">{featured.bespokeRight.bedrooms} slaapkamers · {featured.bespokeRight.builtArea}m²</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Bekijk Woning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 h-[500px]">
            <Link href={`/nl-be/developments/${miralboVillas.villaAtlantis.slug}`} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${miralboVillas.villaAtlantis.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary-700/90 text-white text-xs px-2 py-1 rounded-sm">Miralbo Urbana</span>
                  <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">{miralboVillas.villaAtlantis.zone}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{miralboVillas.villaAtlantis.title}</h3>
                <p className="text-warm-300 text-sm mb-3">{miralboVillas.villaAtlantis.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(miralboVillas.villaAtlantis.price)}</span>
                  <span className="text-warm-300 text-sm">{miralboVillas.villaAtlantis.bedrooms} slaapkamers · {miralboVillas.villaAtlantis.builtArea}m² · {miralboVillas.villaAtlantis.plotArea}m² perceel</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Bekijk Woning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href={`/nl-be/developments/${miralboVillas.villaPosidonia.slug}`} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${miralboVillas.villaPosidonia.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary-700/90 text-white text-xs px-2 py-1 rounded-sm">Miralbo Urbana</span>
                  <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">{miralboVillas.villaPosidonia.zone}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{miralboVillas.villaPosidonia.title}</h3>
                <p className="text-warm-300 text-sm mb-3">{miralboVillas.villaPosidonia.town}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{formatPrice(miralboVillas.villaPosidonia.price)}</span>
                  <span className="text-warm-300 text-sm">{miralboVillas.villaPosidonia.bedrooms} slaapkamers · {miralboVillas.villaPosidonia.builtArea}m² · {miralboVillas.villaPosidonia.plotArea}m² perceel</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Bekijk Woning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <Link href={`/nl-be/developments/${miralboVillas.villaMIR0159.slug}`} className="group relative block h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${miralboVillas.villaMIR0159.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-transparent group-hover:via-primary-900/60 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 md:right-1/2 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary-700/90 text-white text-xs px-3 py-1.5 rounded-sm">Miralbo Urbana</span>
                <span className="bg-accent-500/90 text-white text-xs px-3 py-1.5 rounded-sm">{miralboVillas.villaMIR0159.zone}</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-sm backdrop-blur-sm">Zee & Montgó Uitzicht</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-accent-300 transition-colors">{miralboVillas.villaMIR0159.title}</h3>
              <p className="text-warm-300 text-sm mb-4">{miralboVillas.villaMIR0159.town} — Hedendaagse Middellandse Zee Woning</p>
              <div className="flex items-center gap-6 mb-4">
                <span className="text-2xl font-semibold text-white">{formatPrice(miralboVillas.villaMIR0159.price)}</span>
                <span className="text-warm-300 text-sm">
                  {miralboVillas.villaMIR0159.bedrooms} slaapkamers · {miralboVillas.villaMIR0159.bathrooms} badkamers · {miralboVillas.villaMIR0159.builtArea}m² · {miralboVillas.villaMIR0159.plotArea}m² perceel
                </span>
              </div>
              <div className="flex items-center gap-2 text-accent-400 font-medium group-hover:gap-3 transition-all">
                Ontdek Villa MIR0159
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <div className="bg-primary-900 py-4 text-center">
            <Link href="/nl-be/properties?minPrice=800000" className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-400 transition-colors group text-sm">
              Ontdek Volledige Op Maat Collectie
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
