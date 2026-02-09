'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import carouselData from '@/content/homepage-carousels.json';
import svTranslations from '@/i18n/locales/sv.json';
import {
  organizationSchema,
  websiteSchema,
  aggregateRatingSchema,
  toJsonLd,
} from '@/lib/schema';

// Export metadata for Swedish homepage
export const metadata: Metadata = {
  title: 'Nybyggda Bostäder Costa Blanca | Villor & Lägenheter i Spanien',
  description: 'Hitta din drömbostad på Costa Blanca, Spanien. Nybyggda villor, lägenheter och radhus från €164.000. Experthjälp för svenska köpare.',
  keywords: 'nybygge Costa Blanca, köpa hus Spanien, bostad Costa Blanca, villa Costa Blanca, lägenheter Spanien',
  openGraph: {
    title: 'Nybyggda Bostäder Costa Blanca | Villor & Lägenheter i Spanien',
    description: 'Hitta din drömbostad på Costa Blanca. Nybyggda villor, lägenheter och radhus från pålitliga byggherrar.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/sv',
    siteName: 'Nybyggen Costa Blanca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lyxvillor och lägenheter på Costa Blanca, Spanien',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nybyggda Bostäder Costa Blanca',
    description: 'Hitta din drömbostad på Costa Blanca, Spanien.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

// Helper to format price in Swedish locale
function formatPrice(price: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Get featured properties from carousels
function getFeaturedProperties() {
  const { carousels } = carouselData;
  return {
    heroLeft: carousels['south-under400k'].properties[2],
    heroRight: carousels['south-under400k'].properties[0],
    affordable: carousels['south-under400k'].properties.slice(0, 6),
    golfProperties: carousels['south-golf'].properties.slice(0, 3),
    northProperties: carousels['north-luxury'].properties.slice(0, 3),
  };
}

export default function SvenskaHomepage() {
  const featured = getFeaturedProperties();

  // Schema markup
  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();
  const ratingSchema = aggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: 127,
    itemName: 'Nybyggen Costa Blanca',
    itemType: 'RealEstateAgent',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(siteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(ratingSchema) }} />

      <main className="min-h-screen bg-warm-50">
        {/* ============================================ */}
        {/* HERO INTRO BAR */}
        {/* ============================================ */}
        <section className="bg-primary-900 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="text-warm-300">
                <span className="text-accent-400 font-medium">500+</span> Nybyggda Bostäder
              </span>
              <span className="text-warm-500 hidden sm:inline">|</span>
              <span className="text-warm-300 hidden sm:inline">
                Från <span className="text-accent-400 font-medium">€164.000</span>
              </span>
              <span className="text-warm-500 hidden md:inline">|</span>
              <span className="text-warm-300 hidden md:inline">
                Costa Blanca Norr & Söder
              </span>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* HERO SECTION - Dual Property Layout */}
        {/* ============================================ */}
        <section className="relative h-[65vh] min-h-[450px] max-h-[600px]">
          {/* Two Properties Side by Side */}
          <div className="grid md:grid-cols-2 h-full">
            {/* Left Property */}
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

            {/* Right Property */}
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

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto px-6 pb-6 md:pb-10 w-full">
              {/* Main Headline */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2 leading-[1.1]">
                  Hitta Din Drömbostad,
                  <span className="font-semibold"> Inflyttningsklart</span>
                </h1>
                <p className="text-warm-300 max-w-xl mx-auto">
                  Inflyttningsklara bostäder från €164.000. Din mediterran livsstil börjar här.
                </p>
              </div>

              {/* Two Property Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Left Property Card */}
                <Link
                  href={`/sv/properties/${featured.heroLeft.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Inflyttningsklart
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
                      {featured.heroLeft.bedrooms} sovrum · {featured.heroLeft.builtArea}m²
                    </span>
                  </div>
                </Link>

                {/* Right Property Card */}
                <Link
                  href={`/sv/properties/${featured.heroRight.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Inflyttningsklart
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
                      {featured.heroRight.bedrooms} sovrum · {featured.heroRight.builtArea}m²
                    </span>
                  </div>
                </Link>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Link
                  href="/sv/properties?isKeyReady=true"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  Se Inflyttningsklara Bostäder
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/sv/properties"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm text-center transition-all border border-white/20"
                >
                  Bläddra Alla Bostäder
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* WHY SWEDES CHOOSE COSTA BLANCA */}
        {/* ============================================ */}
        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Varför Välja Costa Blanca
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Varför <span className="font-semibold">Svenskar Väljer Costa Blanca</span>
              </h2>
              <p className="text-warm-600 mt-2 max-w-2xl mx-auto">
                Från 300 solkiga dagar per år till stabila fastighetsvärdena — Costa Blanca erbjuder det bästa av båda världarna för svenska köpare.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Comparison Card 1 */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">☀️</span>
                  Klimat & Livsstil
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>300 soldagar per år</strong> — motsatt av svenska vintrar</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Havsnära läge</strong> — strander och vattenaktiviteter året runt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Utomhuslivet</strong> — golf, tennis, båtar och wandringar</span>
                  </li>
                </ul>
              </div>

              {/* Comparison Card 2 */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💶</span>
                  Priser & Värde
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>50-70% billigare än Stockholm</strong> — samma standard</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Stabil värdeutveckling</strong> — investeringar som växer</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Låga driftskostnader</strong> — ingen golvvärme eller snöröjning</span>
                  </li>
                </ul>
              </div>

              {/* Comparison Card 3 */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏠</span>
                  Nya & Moderna Hem
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>10-årig garanti</strong> — byggnormer motsvarar Sverige</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Energieffektiva</strong> — låga el- och värmekostnader</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Moderna designval</strong> — öppna planlösningar och pooler</span>
                  </li>
                </ul>
              </div>

              {/* Comparison Card 4 */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Svenska Gemenskapen
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Etablerad svensk community</strong> — tusentals skandinaver här</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Svensktalande tjänster</strong> — läkare, tandläkare, affärer</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Väl etablerat nätverk</strong> — enkelt att komma in i gemenskapen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* AFFORDABLE KEY-READY SECTION */}
        {/* ============================================ */}
        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Bäst Värde
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Inflyttningsklara Under €400k
                </h2>
              </div>
              <Link
                href="/sv/properties?maxPrice=400000&isKeyReady=true"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Se Alla
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Property Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.affordable.map((property) => (
                <Link
                  key={property.reference}
                  href={`/sv/properties/${property.reference}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} sovrum • {property.builtArea}m²</p>
                    <div className="mt-3 pt-3 border-t border-warm-100 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                      <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                        Inflyttningsklart
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* GOLF PROPERTIES SECTION */}
        {/* ============================================ */}
        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Golffokus
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Villor Med <span className="font-semibold">Golffältutsikt</span>
                </h2>
              </div>
              <Link
                href="/sv/golf"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Se Alla Golfbostäder
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.golfProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/sv/properties/${property.reference}`}
                  className="group bg-warm-50 rounded-sm overflow-hidden hover:shadow-lg transition-all border border-warm-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                        Golffält
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} sovrum • {property.builtArea}m² • Pool</p>
                    <div className="mt-3 pt-3 border-t border-warm-100">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* COSTA BLANCA NORTH SECTION */}
        {/* ============================================ */}
        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Lyxkategori
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Costa Blanca <span className="font-semibold">Norr</span>
                </h2>
              </div>
              <Link
                href="/sv/areas"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Utforska Områden
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.northProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/sv/properties/${property.reference}`}
                  className="group relative bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} sovrum • {property.builtArea}m²</p>
                    <div className="mt-3 pt-3 border-t border-warm-100">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CTA SECTION - Buyers Guide */}
        {/* ============================================ */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Behöver Du <span className="font-semibold">Experthjälp?</span>
            </h2>
            <p className="text-warm-300 mb-8 text-lg">
              Vi guidar dig genom hela köpprocessen — från att hitta rätt bostad till att få dina nycklar. Vi talar ditt språk och förstår dina behov som svensk köpare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sv/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Boka Gratis Rådgivning
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/sv/guides"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-all border border-white/20"
              >
                Läs Våra Guider
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SOCIAL PROOF - Trust Indicators */}
        {/* ============================================ */}
        <section className="py-12 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-warm-600 mb-6">Betrott av köpare från Sverige, Norge, Danmark & England</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">127</div>
                <p className="text-warm-600 text-sm">Google-recensioner</p>
                <p className="text-accent-600 text-sm font-medium">4,9★</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">500+</div>
                <p className="text-warm-600 text-sm">Nybyggda Bostäder</p>
                <p className="text-accent-600 text-sm font-medium">I hela Costa Blanca</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">15+</div>
                <p className="text-warm-600 text-sm">År av Erfarenhet</p>
                <p className="text-accent-600 text-sm font-medium">Svenska Köpare</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
