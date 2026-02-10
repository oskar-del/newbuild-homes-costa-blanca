import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDevelopments, Development } from '@/lib/development-service';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Promotions Immobilières | Costa Blanca Nouvelles Constructions',
  description: 'Découvrez les meilleurs projets de construction neuve sur la Costa Blanca. Promotions résidentielles, complexes de luxe et développements durables.',
  openGraph: {
    title: 'Promotions Immobilières Costa Blanca',
    description: 'Projets neufs triés sur le volet avec les meilleures promoteurs.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/developments',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/developments',
    languages: {
      en: 'https://newbuildhomescostablanca.com/developments',
      fr: 'https://newbuildhomescostablanca.com/fr/developments',
    },
  },
};

export default async function FRDevelopmentsPage() {
  const developments = await getAllDevelopments();
  const sortedDevs = developments.sort((a, b) => (b.status === 'key-ready' ? 1 : -1));

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Promotions', url: 'https://newbuildhomescostablanca.com/fr/developments/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Promotions Immobilières <span className="font-semibold">Costa Blanca</span>
              </h1>
              <p className="text-warm-300 text-lg">
                Découvrez les meilleurs projets de construction neuve sélectionnés par nos experts
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDevs.map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/fr/developments/${dev.slug}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-200"
                >
                  {dev.mainImage && (
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={dev.mainImage}
                        alt={dev.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                      {dev.status === 'key-ready' && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            En Vedette
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">
                      {dev.name}
                    </h3>
                    <p className="text-warm-600 text-sm mb-3 line-clamp-2">
                      {dev.description || 'Projet de construction neuve de qualité'}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-warm-500">{dev.town}</span>
                      <span className="text-accent-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Découvrir
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {sortedDevs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-warm-600">Aucun projet disponible pour le moment. Veuillez vérifier à nouveau bientôt.</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Vous ne Trouvez Pas Ce <span className="font-semibold">Que Vous Cherchez?</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Nous avons accès à des projets exclusifs et des opportunités pré-lancement. Contactez-nous pour découvrir ce qui n'est pas encore public.
            </p>
            <Link
              href="/fr/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
            >
              Contactez-Nous
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
