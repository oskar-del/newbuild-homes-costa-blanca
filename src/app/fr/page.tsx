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
  title: 'Maisons Neuves Costa Blanca | Villas & Appartements en Espagne',
  description: 'Trouvez votre maison de rêve sur la Costa Blanca en Espagne. Villas et appartements neufs à partir de 164 000 €. Conseil expert pour les acheteurs français.',
  keywords: 'maison Costa Blanca, villa neuve Espagne, apartement Costa Blanca, acheter maison Espagne, immobilier Costa Blanca',
  openGraph: {
    title: 'Maisons Neuves Costa Blanca | Villas & Appartements en Espagne',
    description: 'Découvrez des villas et appartements neufs sur la Costa Blanca à partir de 164 000 €.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr',
    siteName: 'Maisons Neuves Costa Blanca',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Villas de luxe et appartements sur la Costa Blanca, Espagne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maisons Neuves Costa Blanca',
    description: 'Trouvez votre maison de rêve sur la Costa Blanca, Espagne.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'nl': 'https://newbuildhomescostablanca.com/nl',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be',
      'fr': 'https://newbuildhomescostablanca.com/fr',
      'no': 'https://newbuildhomescostablanca.com/no',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
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

export default function FrenchHomepage() {
  const featured = getFeaturedProperties();

  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();
  const ratingSchema = aggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: 127,
    itemName: 'Maisons Neuves Costa Blanca',
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
                <span className="text-accent-400 font-medium">500+</span> Maisons neuves
              </span>
              <span className="text-warm-500 hidden sm:inline">|</span>
              <span className="text-warm-300 hidden sm:inline">
                À partir de <span className="text-accent-400 font-medium">164 000 €</span>
              </span>
              <span className="text-warm-500 hidden md:inline">|</span>
              <span className="text-warm-300 hidden md:inline">
                Costa Blanca Nord & Sud
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
                  Trouvez Votre Maison,
                  <span className="font-semibold"> Prête à Emménager</span>
                </h1>
                <p className="text-warm-300 max-w-xl mx-auto">
                  Maisons prêtes à emménager à partir de 164 000 €. Votre style de vie méditerranéen commence ici.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/fr/properties/${featured.heroLeft.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Prêt à Emménager
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
                      {featured.heroLeft.bedrooms} pièces · {featured.heroLeft.builtArea}m²
                    </span>
                  </div>
                </Link>

                <Link
                  href={`/fr/properties/${featured.heroRight.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Prêt à Emménager
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
                      {featured.heroRight.bedrooms} pièces · {featured.heroRight.builtArea}m²
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Link
                  href="/fr/properties?isKeyReady=true"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  Maisons Prêtes à Emménager
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/fr/properties"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm text-center transition-all border border-white/20"
                >
                  Toutes les Maisons
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* WHY FRENCH CHOOSE COSTA BLANCA */}
        {/* ============================================ */}
        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Pourquoi la Costa Blanca
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Pourquoi les <span className="font-semibold">Français choisissent Costa Blanca</span>
              </h2>
              <p className="text-warm-600 mt-2 max-w-2xl mx-auto">
                Du luxe abordable aux investissements sûrs — la Costa Blanca offre le meilleur des deux mondes pour les acheteurs français.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">300</span>
                  Jours de Soleil
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Climat méditerranéen</strong> — contrairement aux hivers français</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Styles de vie actifs</strong> — golf, voile, randonnée toute l'année</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Retraite parfaite</strong> — pour profiter de la vie en plein air</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">60%</span>
                  Moins Cher
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Paris €10 000/m² vs Costa Blanca €1 500-2 500/m²</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Croissance stable</strong> — rendements annuels de 3-6%</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Faibles frais</strong> — pas de chauffage, pas de neige</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Moderne</span>
                  & Sûr
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Garantie 10 ans</strong> — normes de construction françaises</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Efficacité énergétique</strong> — factures d'électricité basses</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Design contemporain</strong> — plans ouverts, piscines privées</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Établie</span>
                  Communauté Française
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>20 000+ Français</strong> — surtout au nord (Dénia, Jávea)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Services français</strong> — médecins, notaires, magasins</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Aucune barrière d'entrée</strong> — zone Schengen, pas de visas</span>
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
                    Meilleure Valeur
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Prêtes à Emménager Sous 400k
                </h2>
              </div>
              <Link
                href="/fr/properties?maxPrice=400000&isKeyReady=true"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Voir Tous
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.affordable.map((property) => (
                <Link
                  key={property.reference}
                  href={`/fr/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} pièces • {property.builtArea}m²</p>
                    <div className="mt-3 pt-3 border-t border-warm-100 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                      <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                        Prêt à Emménager
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
                    Golf
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Villas Avec <span className="font-semibold">Vues de Golf</span>
                </h2>
              </div>
              <Link
                href="/fr/golf"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Voir Tous les Terrains de Golf
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.golfProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/fr/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} pièces • {property.builtArea}m² • Piscine</p>
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
                    Prestige
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Costa Blanca <span className="font-semibold">Nord</span>
                </h2>
              </div>
              <Link
                href="/fr/areas"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Explorer les Régions
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.northProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/fr/properties/${property.reference}`}
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
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} pièces • {property.builtArea}m²</p>
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
        {/* CTA SECTION - Expert Help */}
        {/* ============================================ */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Vous parlons <span className="font-semibold">le français ?</span>
            </h2>
            <p className="text-warm-300 mb-8 text-lg">
              Nous vous guidons à travers tout le processus d'achat — du choix de la propriété à la signature de l'acte notarié. Nous parlons votre langue et comprenons vos besoins de acheteur français.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fr/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Demander une Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/fr/guides"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-all border border-white/20"
              >
                Lire Nos Guides
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SOCIAL PROOF */}
        {/* ============================================ */}
        <section className="py-12 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-warm-600 mb-6">Faites confiance à des acheteurs de France, Belgique, Suisse et Angleterre</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">127</div>
                <p className="text-warm-600 text-sm">Avis Google</p>
                <p className="text-accent-600 text-sm font-medium">4,9★</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">500+</div>
                <p className="text-warm-600 text-sm">Maisons Neuves</p>
                <p className="text-accent-600 text-sm font-medium">Toute la Costa Blanca</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">15+</div>
                <p className="text-warm-600 text-sm">Années d'Expérience</p>
                <p className="text-accent-600 text-sm font-medium">Acheteurs Français</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
