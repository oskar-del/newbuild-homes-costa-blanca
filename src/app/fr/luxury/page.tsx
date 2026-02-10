import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Villas de Luxe Costa Blanca | Propriétés Premium',
  description: 'Découvrez les villas de luxe neuves les plus prestigieuses de la Costa Blanca avec vue mer, piscines privées et design architectural de pointe.',
  openGraph: {
    title: 'Villas de Luxe Costa Blanca | Propriétés Premium Exclusives',
    description: 'Les plus belles villas neuves de la Costa Blanca avec tous les équipements de luxe.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/luxury',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

export default function FRLuxuryPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Luxe', url: 'https://newbuildhomescostablanca.com/fr/luxury/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Villas de <span className="font-semibold">Luxe</span> Costa Blanca
              </h1>
              <p className="text-warm-300 text-lg">
                Découvrez les propriétés les plus prestigieuses de la Costa Blanca avec design architectural de pointe et équipements incomparables.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-8">
              Caractéristiques des Villas de <span className="font-semibold">Luxe</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Vue Panoramique Mer</h3>
                <p className="text-warm-600">Perspectives spectaculaires sur la Méditerranée depuis les terrasses principales et les suites principales.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Piscines Privées</h3>
                <p className="text-warm-600">Piscines infinies, spa privés, systèmes de chauffage haut de gamme et aménagements aquatiques sur mesure.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Domotique Premium</h3>
                <p className="text-warm-600">Systèmes de contrôle intelligents pour éclairage, climatisation, sécurité et divertissement.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Finitions Haut de Gamme</h3>
                <p className="text-warm-600">Matériaux premium — marbre naturel, bois exotique, accessoires de luxe et équipements de designer.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Cuisines Gourmet</h3>
                <p className="text-warm-600">Cuisines professionnelles avec équipements Miele ou Gaggenau, îlots centraux et cave à vin climatisée.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Salle de Cinéma</h3>
                <p className="text-warm-600">Salles multimédias avec acoustique professionnelle, projection 4K et systèmes audio immersifs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-8">
              Lieux de Prestige <span className="font-semibold">Costa Blanca Nord</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Jávea</h3>
                <p className="text-warm-600 mb-4">
                  La capitale du luxe côtier avec falaises dramatiques, baies privées et communauté internationale exclusive.
                </p>
                <p className="text-sm text-accent-600 font-medium">De €800k à €3M+</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Moraira</h3>
                <p className="text-warm-600 mb-4">
                  Enclave de luxe ultra-exclusive avec construction limitée, restaurants Michelin et vie privée assurée.
                </p>
                <p className="text-sm text-accent-600 font-medium">De €1M à €4M+</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Altea</h3>
                <p className="text-warm-600 mb-4">
                  Destination bohème de luxe avec galeries d'art, vue sur le cap blanc et infrastructure raffinée.
                </p>
                <p className="text-sm text-accent-600 font-medium">De €600k à €2M</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Cumbre del Sol</h3>
                <p className="text-warm-600 mb-4">
                  Resort fermé ultra-sécurisé avec accès privé à la plage et architecture méditerranéenne exquise.
                </p>
                <p className="text-sm text-accent-600 font-medium">De €700k à €2.5M</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-6">
              Portefeuille de Propriétés <span className="font-semibold">Exclusives</span>
            </h2>
            <p className="text-warm-600 mb-8 text-lg">
              Nous avons accès à des villas haut de gamme non listées publiquement. Contactez notre équipe pour découvrir notre collection privée.
            </p>
            <Link
              href="/fr/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
            >
              Demander une Liste Privée
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
