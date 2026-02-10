import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Leitfäden | Hauskauf an der Costa Blanca',
  description: 'Umfassende Leitfäden für deutschen Hauskäufer. NIE-Nummer, Steuern, Hypotheken, Kaufprozess und Regionen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const guides = [
  {
    title: 'Der Kaufprozess in Spanien',
    slug: 'kaufprozess',
    description: 'Schritt-für-Schritt Anleitung: Von der Haussuche bis zur Schlüsselübergabe. Was Sie erwarten können und wann.',
    icon: 'Key',
  },
  {
    title: 'NIE-Nummer für Ausländer',
    slug: 'nie-nummer',
    description: 'Wie bekomme ich eine NIE-Nummer? Erforderliche Dokumente, Schritte und Fristen erklärt.',
    icon: 'ID',
  },
  {
    title: 'Kosten & Steuern',
    slug: 'kosten-steuern',
    description: 'Verstehen Sie alle Steuern, Gebühren und Kosten beim Hauskauf. Deutsche Steuerverpflichtungen inklusive.',
    icon: 'Chart',
  },
  {
    title: 'Hypotheken & Finanzierung',
    slug: 'hypothek',
    description: 'Wie deutsche Käufer in Spanien Hypotheken bekommen. Anforderungen, Banken und Zinssätze.',
    icon: 'Bank',
  },
  {
    title: 'Warum Neubau?',
    slug: 'warum-neubau',
    description: 'Die Vorteile von Neubauten: 10-Jahre-Garantie, energieeffizient, keine versteckten Mängel.',
    icon: 'Home',
  },
  {
    title: 'Schlüsselfertig vs. Planverkauf',
    slug: 'schluesselfertig-vs-planverkauf',
    description: 'Sollten Sie ein schlüsselfertiges Haus oder off-plan kaufen? Vorteile und Nachteile verglichen.',
    icon: 'Hammer',
  },
  {
    title: 'Nord vs. Süd Costa Blanca',
    slug: 'nord-vs-sued',
    description: 'Vergleichen Sie die zwei Seiten der Costa Blanca: Klima, Preise, Lebensstil und Kultur.',
    icon: 'Map',
  },
  {
    title: 'Torrevieja Gebiet Guide',
    slug: 'torrevieja',
    description: 'Alles über Torrevieja: Deutsche Schule, Salzwasserseen, Preiswert, Deutsche Gemeinschaft.',
    icon: 'Sun',
  },
  {
    title: 'Javea Gebiet Guide',
    slug: 'javea',
    description: 'Javea erkunden: Dramatische Küste, Premium-Immobilien, wandern, authentische Stadt.',
    icon: 'Mountain',
  },
  {
    title: 'Costa Blanca Nord Guide',
    slug: 'costa-blanca-nord',
    description: 'Der komplette Guide zur Nordküste: Moraira, Calpe, Altea, Benidorm und mehr.',
    icon: 'Beach',
  },
];

export default function GuidesPage() {
  const categories = {
    'Getting Started': guides.slice(0, 4),
    'Property Types': guides.slice(4, 6),
    'Regions': guides.slice(6, 10),
  };

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Hauskauf Leitfäden | <span className="font-semibold">Costa Blanca</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Alles, was Sie über den Hauskauf in Spanien wissen müssen. Von Steuern bis Hypotheken, wir haben die Antworten.
          </p>
        </div>
      </section>

      {Object.entries(categories).map(([category, categoryGuides]) => (
        <section key={category} className="py-16 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-light text-primary-900 mb-8">{category}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categoryGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/de/guides/${guide.slug}`}
                  className="group bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg hover:bg-white transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">
                      {guide.icon === 'Key' && 'Key'}
                      {guide.icon === 'ID' && 'ID'}
                      {guide.icon === 'Chart' && 'Chart'}
                      {guide.icon === 'Bank' && 'Bank'}
                      {guide.icon === 'Home' && 'Home'}
                      {guide.icon === 'Hammer' && 'Hammer'}
                      {guide.icon === 'Map' && 'Map'}
                      {guide.icon === 'Sun' && 'Sun'}
                      {guide.icon === 'Mountain' && 'Mountain'}
                      {guide.icon === 'Beach' && 'Beach'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-warm-600 text-sm mb-4">
                        {guide.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-accent-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Lesen Sie
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur rounded-sm p-8 border border-white/20">
            <h3 className="text-2xl font-light text-white mb-4">
              Fragen zu <span className="font-semibold">einem bestimmten Leitfaden?</span>
            </h3>
            <p className="text-warm-300 mb-6">
              Unsere Experten sind bereit, Ihnen weitere Informationen zu geben oder spezifische Fragen zu beantworten.
            </p>
            <Link
              href="/de/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-block"
            >
              Fragen Sie Unsere Experten
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light text-primary-900 mb-8 text-center">
            Quick Reference <span className="font-semibold">Checkliste</span>
          </h2>
          <div className="bg-white rounded-sm p-8 border border-warm-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-primary-900 mb-4">Vor dem Kauf</h4>
                <ul className="space-y-2 text-sm text-warm-700">
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    NIE-Nummer beantragen
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    Steuereberater konsultieren
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    Hypothek vorqualifizieren
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    Anwalt beauftragen
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary-900 mb-4">Beim Kauf</h4>
                <ul className="space-y-2 text-sm text-warm-700">
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    Immobilie inspizieren
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    Hypothek sichern
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    Versicherung arrangieren
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600">□</span>
                    Notarielles Verfahren starten
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
