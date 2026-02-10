import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import carouselData from '@/content/homepage-carousels.json';

export const metadata: Metadata = {
  title: 'Inland Costa Blanca | Ländliche Immobilien & Dörfer',
  description: 'Entdecken Sie charmante Inland-Immobilien an der Costa Blanca. Authentische spanische Dörfer, ruhiges Leben, beste Werte.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/inland',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/inland',
      'sv': 'https://newbuildhomescostablanca.com/sv/inland',
      'nl': 'https://newbuildhomescostablanca.com/nl/inland',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/inland',
      'fr': 'https://newbuildhomescostablanca.com/fr/inland',
      'no': 'https://newbuildhomescostablanca.com/no/inland',
      'de': 'https://newbuildhomescostablanca.com/de/inland',
      'pl': 'https://newbuildhomescostablanca.com/pl/inland',
      'ru': 'https://newbuildhomescostablanca.com/ru/inland',
      'x-default': 'https://newbuildhomescostablanca.com/inland',
    },
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

const inlandTowns = [
  {
    name: 'Algorfa',
    description: 'Ruhiges ländliches Dorf in den Höhen. Perfekt für Ruhestand und Natur-Liebhaber.',
    highlights: ['Ruhige Gemeinde', 'Ländliche Landschaft', 'Budgetfreundlich', '30 Min. bis zum Strand'],
  },
  {
    name: 'Rojales',
    description: 'Charmantes spanisches Dorf mit eigener Persönlichkeit. Auswahl an lokalen Restaurants und Kultur.',
    highlights: ['Alte Stadt Charme', 'Lokale Kultur', 'Gute Werte', 'Nähe zu Golf'],
  },
  {
    name: 'Ciudad Quesada',
    description: 'Geplante Gemeinschaft mit ausgezeichneten Annehmlichkeiten. Deutsche und britannische Schulen.',
    highlights: ['Deutsche Schulen', 'Gemeinschaftsanlagen', 'Sicherheit', 'Familienfreundlich'],
  },
  {
    name: 'Benijofar',
    description: 'Kleine ländliche Stadt mit hohem Freizeitwert. Orangenhaine und ländliches Leben.',
    highlights: ['Agrarproduzenten', 'Ländliches Leben', 'Budgetfreundlich', 'Authentisch'],
  },
];

export default function InlandPage() {
  const featured = carouselData.carousels['south-under400k'].properties.slice(0, 6);

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Inland Costa Blanca | Authentische <span className="font-semibold">Dörfer</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Weg von der Küste. Ruhige spanische Dörfer mit authentischer Kultur, bester Wert und ländlichem Leben.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10">Beliebte Inland-Gemeinden</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {inlandTowns.map((town) => (
              <div key={town.name} className="bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-light text-primary-900 mb-2">{town.name}</h3>
                <p className="text-warm-700 mb-4">{town.description}</p>
                <div className="mb-4">
                  <p className="text-xs text-accent-600 font-semibold uppercase tracking-wide mb-2">Merkmale</p>
                  <ul className="space-y-1">
                    {town.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-warm-700">
                        <span className="text-accent-500">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/de/properties?town=${encodeURIComponent(town.name)}`}
                  className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium text-sm"
                >
                  Immobilien Ansehen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10">
            Inland Immobilien zum <span className="font-semibold">Verkauf</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <Link
                key={property.reference}
                href={`/de/properties/${property.reference}`}
                className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
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
                  <h3 className="text-primary-900 font-semibold mt-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-warm-600 text-sm mt-1">{property.bedrooms} Zimmer • {property.builtArea}m²</p>
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

      <section className="py-16 bg-white border-t border-warm-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-8 text-center">
            Warum <span className="font-semibold">Inland?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary-900">Wirtschaftliche Vorteile</h3>
              <ul className="space-y-2 text-warm-700">
                <li className="flex gap-3">
                  <span className="text-accent-600">✓</span>
                  30-50% günstiger als Küste
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600">✓</span>
                  Gutes Mietrendite-Potenzial
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600">✓</span>
                  Niedrige laufende Kosten
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary-900">Lebensstil Vorteile</h3>
              <ul className="space-y-2 text-warm-700">
                <li className="flex gap-3">
                  <span className="text-accent-600">✓</span>
                  Authentisches spanisches Leben
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600">✓</span>
                  Ruhige, friedliche Gemeinden
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600">✓</span>
                  30-40 Min. zum Strand
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Möchten Sie <span className="font-semibold">Inland erkunden?</span>
          </h2>
          <p className="text-warm-300 mb-8">Unsere Experten kennen jeden Ort und können Ihnen die beste Übereinstimmung finden.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-block"
          >
            Jetzt Konsultieren
          </Link>
        </div>
      </section>
    </main>
  );
}
