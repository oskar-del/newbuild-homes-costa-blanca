import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Neubau Entwicklungen Costa Blanca | Architekten & Projekte',
  description: 'Entdecken Sie erstklassige Neubauentwicklungen an der Costa Blanca. Direkt von den Top-Bauträgern: Moderne Komplexe mit Pools, Garten und Gemeinschaften.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/developments',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/developments',
      'sv': 'https://newbuildhomescostablanca.com/sv/developments',
      'nl': 'https://newbuildhomescostablanca.com/nl/developments',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/developments',
      'fr': 'https://newbuildhomescostablanca.com/fr/developments',
      'no': 'https://newbuildhomescostablanca.com/no/developments',
      'de': 'https://newbuildhomescostablanca.com/de/developments',
      'pl': 'https://newbuildhomescostablanca.com/pl/developments',
      'ru': 'https://newbuildhomescostablanca.com/ru/developments',
      'x-default': 'https://newbuildhomescostablanca.com/developments',
    },
  },
};

const developments = [
  {
    slug: 'coastal-luxury-complex',
    name: 'Küsten Luxus Komplex',
    developer: 'Premium Developers Costa Blanca',
    town: 'Moraira',
    status: 'Im Bau',
    totalUnits: 24,
    priceFrom: 850000,
    priceTo: 2500000,
    description: 'Exklusives Luxuskomplex mit 24 Villen direkt am Meer. Privater Strand, Concierge-Service, 24-Stunden-Sicherheit.',
  },
  {
    slug: 'northern-heights',
    name: 'Nördliche Höhen',
    developer: 'Nordic Homes',
    town: 'Javea',
    status: 'Bauabschnitt 2',
    totalUnits: 42,
    priceFrom: 450000,
    priceTo: 1200000,
    description: 'Moderne Villen mit Bergblick in der Nähe von Javea. Gemeinschaftspool, Fitnessstudio, Concierge.',
  },
  {
    slug: 'golf-villa-estates',
    name: 'Golf Villa Landgüter',
    developer: 'Golf Communities Global',
    town: 'Villamartin',
    status: 'Sofort verfügbar',
    totalUnits: 18,
    priceFrom: 380000,
    priceTo: 890000,
    description: 'Premium Golfplatz Immobilien. Direkt neben drei Championship-Golfplätzen mit Clubhouse-Zugang.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function DevelopmentsPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Neue Entwicklungen an der <span className="font-semibold">Costa Blanca</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Entdecken Sie die neuesten Neubau-Projekte von führenden Bauträgern. Moderne Architektur, erstklassige Ausstattung, perfekte Lagen.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {developments.map((dev) => (
              <div key={dev.slug} className="bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:shadow-lg transition-all">
                <div className="relative h-64 bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl font-light mb-2">{dev.totalUnits}</div>
                    <p className="text-warm-300">Einheiten</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-light text-primary-900 mb-1">{dev.name}</h3>
                      <p className="text-accent-600 font-medium">{dev.town}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-sm">
                      {dev.status}
                    </span>
                  </div>
                  <p className="text-warm-700 mb-4">{dev.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <p><span className="font-semibold text-primary-900">Bauträger:</span> {dev.developer}</p>
                    <p><span className="font-semibold text-primary-900">Preis:</span> {formatPrice(dev.priceFrom)} - {formatPrice(dev.priceTo)}</p>
                  </div>
                  <Link
                    href={`/de/properties?development=${dev.slug}`}
                    className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-all"
                  >
                    Einheiten Ansehen
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Möchten Sie eine <span className="font-semibold">bestimmte Entwicklung</span> erforschen?
          </h2>
          <p className="text-warm-300 mb-8">Kontaktieren Sie uns für detaillierte Informationen über Baupläne, Finanzierung und Zeitpläne.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
          >
            Jetzt Kontaktieren
          </Link>
        </div>
      </section>
    </main>
  );
}
