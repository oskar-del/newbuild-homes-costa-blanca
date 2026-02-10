import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Costa Blanca Regionen | Orte zum Leben & Investieren',
  description: 'Erkunden Sie alle Costa Blanca Regionen. Von der sonnigen Südküste (Torrevieja) bis zur prestigeträchtigen Nordküste (Javea, Moraira). Finden Sie Ihre perfekte Location.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/areas',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/areas',
      'sv': 'https://newbuildhomescostablanca.com/sv/areas',
      'nl': 'https://newbuildhomescostablanca.com/nl/areas',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/areas',
      'fr': 'https://newbuildhomescostablanca.com/fr/areas',
      'no': 'https://newbuildhomescostablanca.com/no/areas',
      'de': 'https://newbuildhomescostablanca.com/de/areas',
      'pl': 'https://newbuildhomescostablanca.com/pl/areas',
      'ru': 'https://newbuildhomescostablanca.com/ru/areas',
      'x-default': 'https://newbuildhomescostablanca.com/areas',
    },
  },
};

const areas = [
  {
    name: 'Torrevieja',
    region: 'Süd',
    description: 'Die sonnige Südküste mit großer deutscher Gemeinde. Salzige Seen, gebudgetfreundliche Preise, das ganze Jahr lebendig.',
    highlights: ['Deutsche Schule & Kirche', 'Salzwasserseen & Natur', 'Budgetfreundlich', 'Ganzjahresgemeinde'],
  },
  {
    name: 'Javea',
    region: 'Nord',
    description: 'Wo Berge das Mittelmeer treffen. Dramatische Küste, authentische Altstadt, Premium-Immobilien.',
    highlights: ['Penon de Ifach Wahrzeichen', 'Wanderwege & Natur', 'Premiumproperty Markt', 'Authentische Kultur'],
  },
  {
    name: 'Moraira',
    region: 'Nord',
    description: 'Exklusive Küsteneite mit privaten Buchten. Der Lieblingstreffpunkt für wohlhabende Deutsche.',
    highlights: ['Private Buchten', 'Gourmet-Restaurants', 'Makellose Strände', 'Hochklassig'],
  },
  {
    name: 'Calpe',
    region: 'Mitte',
    description: 'Ikonischer Penon de Ifach Felsen. Lebhafte Gemeinde mit zwei Sandstränden und gutem Wert.',
    highlights: ['Penon Wahrzeichen', 'Zwei Strände', 'Lebendiges Zentrum', 'Gutes Wert'],
  },
  {
    name: 'Altea',
    region: 'Mitte',
    description: 'Das Kunstherz der Küste. Weiß getünchte alte Stadt, Kunstgalerien, Kulturveranstaltungen.',
    highlights: ['Kunstgalerien', 'Charmante Altstadt', 'Sonnenuntergänge', 'Kulturelle Szene'],
  },
  {
    name: 'Benidorm',
    region: 'Mitte',
    description: 'Die Hauptstadt der Costa Blanca. Lebhaft, mit ausgezeichneten Stränden und Unterhaltung.',
    highlights: ['Lebhaftes Leben', 'Ausgezeichnete Strände', 'Vergnügungsparks', 'ÖPNV'],
  },
  {
    name: 'Villamartin',
    region: 'Golf',
    description: 'Das Golf-Paradies an der Costa Blanca. Umgeben von Championship-Plätzen.',
    highlights: ['5 Golfplätze', 'Ausgezeichnete Gemeinde', 'Deutsche Schulen', 'Familienfreundlich'],
  },
  {
    name: 'Denia',
    region: 'Nord',
    description: 'Kulturelle Hafenstadt mit Schloss und Strand. Traditioneller spanischer Charme.',
    highlights: ['Historisches Schloss', 'Hafenkultur', 'Reiseverbindungen', 'Naturschutzgebiet'],
  },
];

export default function AreasPage() {
  const regions = {
    'Süd': areas.filter(a => a.region === 'Süd'),
    'Nord': areas.filter(a => a.region === 'Nord'),
    'Mitte': areas.filter(a => a.region === 'Mitte'),
    'Golf': areas.filter(a => a.region === 'Golf'),
  };

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Costa Blanca <span className="font-semibold">Regionen</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Vom sonnigen Süden zur prächtigen Nordküste. Jede Region hat ihren eigenen Charakter und Reiz.
          </p>
        </div>
      </section>

      {Object.entries(regions).map(([region, regionAreas]) => (
        <section key={region} className="py-16 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-10">
              Costa Blanca <span className="font-semibold">{region}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {regionAreas.map((area) => (
                <div key={area.name} className="bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
                  <h3 className="text-2xl font-light text-primary-900 mb-2">{area.name}</h3>
                  <p className="text-warm-700 mb-4">{area.description}</p>
                  <div className="mb-4">
                    <p className="text-xs text-accent-600 font-semibold uppercase tracking-wide mb-3">Highlights</p>
                    <ul className="space-y-1.5">
                      {area.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-sm text-warm-700">
                          <span className="text-accent-500 font-bold mt-0.5">·</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/de/properties?town=${encodeURIComponent(area.name)}`}
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
      ))}

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Unsicher, welche <span className="font-semibold">Region Passt?</span>
          </h2>
          <p className="text-warm-300 mb-8">Lassen Sie uns Ihnen helfen, die perfekte Gegend für Ihre Bedürfnisse zu finden.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
          >
            Kostenlose Beratung
          </Link>
        </div>
      </section>
    </main>
  );
}
