export const revalidate = 3600;

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllDevelopments,
  getDevelopmentStats,
  getAllBuilders,
  Development,
} from '@/lib/development-service';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';
import { getCardImages } from '@/lib/image-categorization';

export const metadata: Metadata = {
  title: 'Nieuwbouw Costa Blanca | Vind Je Droomhuis in Spanje',
  description: 'Verken nieuwbouw over heel Costa Blanca en Costa Calida. Kant-en-klare huizen, golfwoningen en strandnabije wonen. Belgische expertise, Nederlands service.',
  openGraph: {
    title: 'Nieuwbouw Costa Blanca | Nederlands Service',
    description: 'Verken nieuwbouw over heel Costa Blanca. Kant-en-klare huizen van vertrouwde bouwers.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl-be/developments',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nieuwbouw Costa Blanca | Je Nieuw Huis Wacht',
    description: 'Verken nieuwbouw over heel Costa Blanca. Kant-en-klare huizen, golfwoningen en strandnabije wonen.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/developments',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/developments',
      'nl': 'https://newbuildhomescostablanca.com/nl/developments',
      'nl-be': 'https://newbuildhomescostablanca.com/nl-be/developments',
    },
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function DevelopmentCard({ dev, variant = 'default' }: { dev: Development; variant?: 'default' | 'featured' }) {
  const isFeatured = variant === 'featured';
  const cardImages = getCardImages(dev.images || [], dev.name, dev.town);
  const hasMultipleImages = cardImages.secondary.length >= 2;
  const hasRealImages = dev.images && dev.images.length > 0 && !dev.images[0]?.includes('placeholder');

  return (
    <Link
      href={`/nl-be/developments/${dev.slug}`}
      className={`group block overflow-hidden rounded-sm transition-all duration-300 ${
        isFeatured
          ? 'bg-primary-800/50 hover:bg-primary-800'
          : 'bg-white border border-warm-200 hover:shadow-xl hover:border-accent-500'
      }`}
    >
      <div className="relative">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={cardImages.main.url}
            alt={cardImages.main.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3">
            {dev.status === 'key-ready' && (
              <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Kant en klaar
              </span>
            )}
            {dev.status === 'under-construction' && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                In bouw
              </span>
            )}
            {dev.status === 'off-plan' && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Off-plan
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-sm">
              {dev.totalUnits} eenheden
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white">
              <h3 className="font-semibold text-sm leading-tight mb-0.5 group-hover:text-accent-300 transition-colors">
                {dev.name}
              </h3>
              <p className="text-warm-300 text-xs">{dev.town}</p>
            </div>
          </div>
        </div>

        {hasMultipleImages && (
          <div className="grid grid-cols-2 gap-0.5 mt-0.5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cardImages.secondary[0].url}
                alt={cardImages.secondary[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 25vw, 15vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cardImages.secondary[1]?.url || cardImages.secondary[0].url}
                alt={cardImages.secondary[1]?.alt || cardImages.secondary[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 25vw, 15vw"
              />
              {dev.images && dev.images.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">+{dev.images.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function BEDevelopmentsPage() {
  const allDevs = await getAllDevelopments();
  const stats = await getDevelopmentStats();
  const builders = await getAllBuilders();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be/' },
    { name: 'Projecten', url: 'https://newbuildhomescostablanca.com/nl-be/developments/' },
  ]);

  const collectionSchema = collectionPageSchema({
    name: 'Nieuwbouw Costa Blanca',
    description: 'Verken nieuwbouw projecten op Costa Blanca en Costa Calida',
    url: 'https://newbuildhomescostablanca.com/nl-be/developments/',
    items: allDevs.slice(0, 20).map(d => ({
      name: d.name,
      url: `https://newbuildhomescostablanca.com/nl-be/developments/${d.slug}/`,
    })),
  });

  const featured = allDevs.slice(0, 6);
  const topBuilders = builders.slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-primary-900 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
                Nieuwbouw <span className="font-semibold">Projecten</span>
              </h1>
              <p className="text-warm-300 text-lg max-w-2xl mx-auto">
                Ontdek alle nieuwbouwprojecten op Costa Blanca en Costa Calida. Van directinzetbaar tot off-plan.
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">{allDevs.length}</div>
                <div className="text-warm-300">Projecten</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">{stats.totalUnits}</div>
                <div className="text-warm-300">Eenheden</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">{builders.length}</div>
                <div className="text-warm-300">Bouwers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-8">
              Aanbevolen <span className="font-semibold">Projecten</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(dev => (
                <DevelopmentCard key={dev.slug} dev={dev} />
              ))}
            </div>
          </div>
        </section>

        {/* All Projects */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-8">
              Alle <span className="font-semibold">Projecten</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allDevs.map(dev => (
                <DevelopmentCard key={dev.slug} dev={dev} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-light text-white mb-4">
              Klaar om je <span className="font-semibold">droomhuis te vinden?</span>
            </h2>
            <p className="text-warm-300 mb-8">Neem contact op voor persoonlijk advies over de beste projecten voor jou.</p>
            <Link
              href="/nl-be/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
            >
              Neem Contact Op
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
