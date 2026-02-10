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

export const metadata: Metadata = {
  title: 'Nybygget Boliger Costa Blanca | Villaer & Leiligheter i Spania',
  description: 'Finn drømmeboligen på Costa Blanca, Spania. Nybyggede villaer, leiligheter og rekkehus fra €164.000. Eksperthjælp for norske kjøpere.',
  keywords: 'nybygg Costa Blanca, kjøpe hus Spania, bolig Costa Blanca, villa Costa Blanca, leiligheter Spania, norsk community Alfaz del Pi',
  openGraph: {
    title: 'Nybygget Boliger Costa Blanca | Villaer & Leiligheter i Spania',
    description: 'Finn drømmeboligen på Costa Blanca. Nybyggede villaer, leiligheter og rekkehus fra pålitelige byggeherrer.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no',
    siteName: 'Nybygg Costa Blanca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luksusvillaer og leiligheter på Costa Blanca, Spania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nybygget Boliger Costa Blanca',
    description: 'Finn drømmeboligen på Costa Blanca, Spania.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'nl': 'https://newbuildhomescostablanca.com/nl',
      'nl-be': 'https://newbuildhomescostablanca.com/nl-be',
      'fr': 'https://newbuildhomescostablanca.com/fr',
      'no': 'https://newbuildhomescostablanca.com/no',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

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

export default function NorwegianHomepage() {
  const featured = getFeaturedProperties();

  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();
  const ratingSchema = aggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: 127,
    itemName: 'Nybygg Costa Blanca',
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
                <span className="text-accent-400 font-medium">500+</span> Nybyggede Boliger
              </span>
              <span className="text-warm-500 hidden sm:inline">|</span>
              <span className="text-warm-300 hidden sm:inline">
                Fra <span className="text-accent-400 font-medium">€164.000</span>
              </span>
              <span className="text-warm-500 hidden md:inline">|</span>
              <span className="text-warm-300 hidden md:inline">
                Costa Blanca Nord & Sør
              </span>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* HERO SECTION - Dual Property Layout */}
        {/* ============================================ */}
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
                  Finn Din Drømmebolig,
                  <span className="font-semibold"> Innflyttingsklar</span>
                </h1>
                <p className="text-warm-300 max-w-xl mx-auto">
                  Innflyttingsklare boliger fra €164.000. Din mediterrane livsstil starter her.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/no/properties/${featured.heroLeft.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Innflyttingsklar
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
                      {featured.heroLeft.bedrooms} soverom · {featured.heroLeft.builtArea}m²
                    </span>
                  </div>
                </Link>

                <Link
                  href={`/no/properties/${featured.heroRight.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Innflyttingsklar
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
                      {featured.heroRight.bedrooms} soverom · {featured.heroRight.builtArea}m²
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Link
                  href="/no/properties?isKeyReady=true"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  Se Innflyttingsklare Boliger
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/no/properties"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm text-center transition-all border border-white/20"
                >
                  Se Alle Boliger
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* WHY NORWEGIANS CHOOSE COSTA BLANCA */}
        {/* ============================================ */}
        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Hvorfor Velge Costa Blanca
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Hvorfor <span className="font-semibold">Nordmenn Velger Costa Blanca</span>
              </h2>
              <p className="text-warm-600 mt-2 max-w-2xl mx-auto">
                Fra 300 soldager i året til stabil verdistigning — Costa Blanca tilbyr det beste fra begge verdener for norske kjøpere.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Price Comparison */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Dramtisk Prisforskjell
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Oslo vestside: €8.000-12.000/m²</strong> vs Costa Blanca: €2.500-4.000/m²</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>50-70% billigere</strong> enn tilsvarende kvalitet i Norge</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Lavere driftskostnader</strong> — ingen varme eller snørydding</span>
                  </li>
                </ul>
              </div>

              {/* Alfaz del Pi Community */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Stor Norsk Befolkning
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Alfaz del Pi</strong> — Over 30% norske innbyggere, eget norsk kultursentrum</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Norsk skole & kirke</strong> — Den norske sjømannskirken siden 1960</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Norske butikker & tjenester</strong> — Meny, apotek, lege som snakker norsk</span>
                  </li>
                </ul>
              </div>

              {/* Climate & Lifestyle */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Klima & Livsstil
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>300+ soldager i året</strong> — Sommer hele året rundt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Strandig tilgang</strong> — Golf, båter, vannaktiviteter året rundt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Moderne mediterran arkitektur</strong> — Basseng, solterasser, åpne planlösninger</span>
                  </li>
                </ul>
              </div>

              {/* Direct Flights */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Lett Tilgang Fra Norge
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Direkteflyvninger</strong> — Norwegian Air, SAS fra Oslo, Bergen, Stavanger</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>3,5 timer flytid</strong> til Alicante lufthavn</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Billige billetter</strong> — Ofte fra 50-80 EUR per vei</span>
                  </li>
                </ul>
              </div>

              {/* Investment Value */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Investeringsverdi
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Stabil verdistigning</strong> — 3-6% årlig de siste årene</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Leieinntekter</strong> — 5-8% avkastning for ferieutleie</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>10-årig garanti</strong> — Nordiske byggstandarder garantert</span>
                  </li>
                </ul>
              </div>

              {/* Banking & Financing */}
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Banking & Finansiering
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Norske banker</strong> — DNB, Nordea, SpareBank 1, Handelsbanken</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Spanske boliglån</strong> — 60-70% finansiering tilgjengelig</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Rimelige renter</strong> — Fra 3-4% med norsk bank</span>
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
                    Best Verdi
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Innflyttingsklare Under €400k
                </h2>
              </div>
              <Link
                href="/no/properties?maxPrice=400000&isKeyReady=true"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Se Alle
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.affordable.map((property) => (
                <Link
                  key={property.reference}
                  href={`/no/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} soverom • {property.builtArea}m²</p>
                    <div className="mt-3 pt-3 border-t border-warm-100 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                      <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                        Innflyttingsklar
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
                  Villaer Med <span className="font-semibold">Golfbanutsikt</span>
                </h2>
              </div>
              <Link
                href="/no/golf"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Se Alle Golfvillaer
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.golfProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/no/properties/${property.reference}`}
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
                        Golf
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} soverom • {property.builtArea}m² • Basseng</p>
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
                    Luksuskategori
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Costa Blanca <span className="font-semibold">Nord</span>
                </h2>
              </div>
              <Link
                href="/no/areas"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Utforsk Områder
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.northProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/no/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} soverom • {property.builtArea}m²</p>
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
              Trenger Du <span className="font-semibold">Eksperthjælp?</span>
            </h2>
            <p className="text-warm-300 mb-8 text-lg">
              Vi guidar deg gjennom hele kjøpsprosessen — fra å finne riktig bolig til å få nøklene dine. Vi snakker norsk og forstår dine behov som norsk kjøper.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/no/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Book Gratis Rådgivning
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/no/guides"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-all border border-white/20"
              >
                Les Våre Guider
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
              <p className="text-warm-600 mb-6">Betrodd av kjøpere fra Norge, Sverige, Danmark og England</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">127</div>
                <p className="text-warm-600 text-sm">Google-anmeldelser</p>
                <p className="text-accent-600 text-sm font-medium">4,9★</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">500+</div>
                <p className="text-warm-600 text-sm">Nybyggede Boliger</p>
                <p className="text-accent-600 text-sm font-medium">I hele Costa Blanca</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">15+</div>
                <p className="text-warm-600 text-sm">År med Erfaring</p>
                <p className="text-accent-600 text-sm font-medium">Norske Kjøpere</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
