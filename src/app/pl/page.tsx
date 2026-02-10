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
  title: 'Nowe Domy Costa Blanca | Wille i Apartamenty w Hiszpanii',
  description: 'Znajdź swój wymarzony dom na Costa Blanca, Hiszpania. Nowe wille, apartamenty i kompleksy mieszkaniowe od 164 000 EUR. Ekspertna pomoc dla polskich kupujących.',
  keywords: 'nowe budownictwo costa blanca, kupić dom hiszpania, mieszkania costa blanca, willa costa blanca, apartamenty hiszpania',
  openGraph: {
    title: 'Nowe Domy Costa Blanca | Wille i Apartamenty w Hiszpanii',
    description: 'Znajdź swój wymarzony dom na Costa Blanca. Nowe wille, apartamenty i kompleksy mieszkaniowe od zaufanych deweloperów.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl',
    siteName: 'Nowe Domy Costa Blanca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luksusowe wille i apartamenty na Costa Blanca, Hiszpania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nowe Domy Costa Blanca',
    description: 'Znajdź swój wymarzony dom na Costa Blanca, Hiszpania.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl',
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

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
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

export default function PolishHomepage() {
  const featured = getFeaturedProperties();

  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();
  const ratingSchema = aggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: 127,
    itemName: 'Nowe Domy Costa Blanca',
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
                <span className="text-accent-400 font-medium">500+</span> Nowych Domów
              </span>
              <span className="text-warm-500 hidden sm:inline">|</span>
              <span className="text-warm-300 hidden sm:inline">
                Od <span className="text-accent-400 font-medium">164 000 EUR</span>
              </span>
              <span className="text-warm-500 hidden md:inline">|</span>
              <span className="text-warm-300 hidden md:inline">
                Costa Blanca Północ & Południe
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
                  Znajdź Swój Wymarzony Dom,
                  <span className="font-semibold"> Gotowy do Zamieszkania</span>
                </h1>
                <p className="text-warm-300 max-w-xl mx-auto">
                  Gotowe do zamieszkania nowe domy od 164 000 EUR. Twój śródziemnomorski styl życia zaczyna się tutaj.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/pl/properties/${featured.heroLeft.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Gotowy do Zamieszkania
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
                      {featured.heroLeft.bedrooms} pokoje · {featured.heroLeft.builtArea}m²
                    </span>
                  </div>
                </Link>

                <Link
                  href={`/pl/properties/${featured.heroRight.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Gotowy do Zamieszkania
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
                      {featured.heroRight.bedrooms} pokoje · {featured.heroRight.builtArea}m²
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Link
                  href="/pl/properties?isKeyReady=true"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  Przeglądaj Gotowe Domy
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/pl/properties"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm text-center transition-all border border-white/20"
                >
                  Wszystkie Mieszkania
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Dlaczego Costa Blanca
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Dlaczego <span className="font-semibold">Polacy Wybierają Costa Blancę</span>
              </h2>
              <p className="text-warm-600 mt-2 max-w-2xl mx-auto">
                Od przystępnych cen do bezpiecznych inwestycji — Costa Blanca oferuje najlepsze z obu światów dla polskich kupujących.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">S</span>
                  Klimat i Styl Życia
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>300 dni słonecznych rocznie</strong> — zamiast polskich zim</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Nad morzem</strong> — plaże i sporty wodne przez cały rok</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Aktywny tryb życia</strong> — golf, tenis, żeglarstwo i spacery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">L</span>
                  Ceny i Wartość
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>60-70% tańsze niż Warszawa</strong> — taka sama jakość</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Stabilny wzrost wartości</strong> — inwestycje które rosną</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Niskie koszty utrzymania</strong> — bez ogrzewania czy śnieżyc</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">N</span>
                  Nowy i Nowoczesny
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>10 lat gwarancji</strong> — standardy budowy jak w Polsce</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Energooszczędny</strong> — niskie rachunki za energię</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Nowoczesny design</strong> — otwarte plany i baseny</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">P</span>
                  Polska Wspólnota
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Rosnąca polska społeczność</strong> — tysiące z Polski</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Polskie usługi</strong> — lekarze, dentystki, sklepy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Dobrze ugruntowana sieć</strong> — łatwo znaleźć przyjaciół</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Najlepsza Wartość
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Gotowy do Zamieszkania Poniżej 400k
                </h2>
              </div>
              <Link
                href="/pl/properties?maxPrice=400000&isKeyReady=true"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Pokaż Wszystkie
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.affordable.map((property) => (
                <Link
                  key={property.reference}
                  href={`/pl/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} pokoje • {property.builtArea}m²</p>
                    <div className="mt-3 pt-3 border-t border-warm-100 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                      <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                        Gotowy
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Golf
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Wille z <span className="font-semibold">Widokiem na Pole Golfowe</span>
                </h2>
              </div>
              <Link
                href="/pl/golf"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Wszystkie Domy Golfowe
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.golfProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/pl/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} pokoje • {property.builtArea}m² • Basen</p>
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

        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Luksus
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Costa Blanca <span className="font-semibold">Północ</span>
                </h2>
              </div>
              <Link
                href="/pl/areas"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Odkryj Obszary
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.northProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/pl/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} pokoje • {property.builtArea}m²</p>
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

        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Potrzebujesz <span className="font-semibold">Fachowej Pomocy?</span>
            </h2>
            <p className="text-warm-300 mb-8 text-lg">
              Poprowadzimy Cię przez cały proces zakupu — od znalezienia odpowiedniego domu do otrzymania kluczy. Mówimy Twoim językiem i rozumiemy Twoje potrzeby jako polski kupujący.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pl/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Bezpłatna Konsultacja
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/pl/guides"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-all border border-white/20"
              >
                Przeczytaj Nasze Przewodniki
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-warm-600 mb-6">Zaufany przez kupujących z Polski, Niemiec, Holandii, Anglii i Belgii</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">127</div>
                <p className="text-warm-600 text-sm">Opinie Google</p>
                <p className="text-accent-600 text-sm font-medium">4,9 gwiazd</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">500+</div>
                <p className="text-warm-600 text-sm">Nowych Domów</p>
                <p className="text-accent-600 text-sm font-medium">Na całej Costa Blance</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">15+</div>
                <p className="text-warm-600 text-sm">Lat Doświadczenia</p>
                <p className="text-accent-600 text-sm font-medium">Polscy Kupujący</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
