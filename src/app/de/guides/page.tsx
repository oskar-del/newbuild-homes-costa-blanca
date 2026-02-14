import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kaufleitfäden | Hauskauf an der Costa Blanca | 2026',
  description: 'Umfassende Leitfäden für deutschen Hauskäufer. NIE-Nummer, Steuern, Hypotheken, Kaufprozess und Regionen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const essentialGuides = [
  {
    title: 'Der Kaufprozess',
    slug: 'kaufprozess',
    description: 'Schritt-für-Schritt Anleitung zum Kauf von Neubau in Spanien. Von Reservierung bis Schlüsselübergabe.',
    icon: '📋',
    readTime: '12 min Lesen',
    category: 'Essentiell',
  },
  {
    title: 'NIE-Nummer Guide',
    slug: 'nie-nummer',
    description: 'Wie du deine NIE-Nummer bekommst — erforderlich für den Grundstückskauf in Spanien.',
    icon: '🪪',
    readTime: '8 min Lesen',
    category: 'Essentiell',
  },
  {
    title: 'Kosten & Steuern',
    slug: 'kosten-steuern',
    description: 'Vollständige Aufschlüsselung der Kaufnebenkosten, Steuern und laufenden Ausgaben für Immobilienbesitzer.',
    icon: '💰',
    readTime: '10 min Lesen',
    category: 'Essentiell',
  },
  {
    title: 'Hypotheken für Ausländer',
    slug: 'hypothek',
    description: 'Wie du als deutscher Käufer in Spanien eine Hypothek bekommst. Anforderungen und Prozess.',
    icon: '🏦',
    readTime: '10 min Lesen',
    category: 'Essentiell',
  },
];

const decisionGuides = [
  {
    title: 'Warum Neubau Kaufen?',
    slug: 'warum-neubau',
    description: 'Vorteile von Neubau gegenüber Bestandimmobilien — Garantien, Energieeffizienz und modernes Design.',
    icon: '🏗️',
    readTime: '6 min Lesen',
    category: 'Entscheidung',
  },
  {
    title: 'Schlüsselfertig vs. Planverkauf',
    slug: 'schluesselfertig-vs-planverkauf',
    description: 'Soll ich ein schlüsselfertiges Haus oder off-plan kaufen? Vor- und Nachteile für deutsche Käufer.',
    icon: '🔑',
    readTime: '8 min Lesen',
    category: 'Entscheidung',
  },
  {
    title: 'Nord vs. Süd Costa Blanca',
    slug: 'nord-vs-sued',
    description: 'Vergleich der beiden Regionen — exklusiver Norden vs. erschwinglicher Süden. Finde deine perfekte Lage.',
    icon: '🗺️',
    readTime: '10 min Lesen',
    category: 'Entscheidung',
  },
  {
    title: 'Touristisches Mietrecht',
    slug: 'tourist-rental-license',
    description: 'Alles über Touristenmietzertifikate in der Valencianischen Gemeinschaft — Anforderungen, Verfahren und Potenzial.',
    icon: '📜',
    readTime: '8 min Lesen',
    category: 'Investition',
  },
];

const destinationGuides = [
  {
    title: 'Torrevieja',
    description: '7 Stadtteile mit Drohnen fotografie. Der komplette Costa Blanca Süd Guide.',
    href: '/de/guides/torrevieja',
    icon: '🏖️',
    badges: ['100+ Fotos', '7 Zonen'],
  },
  {
    title: 'Jávea',
    description: '4 Stadtteile von Arenal Strand bis Montgó Berg. Premium Nordküstenleben.',
    href: '/de/guides/javea',
    icon: '⛵',
    badges: ['4 Stadtteile', '7 Strände'],
  },
  {
    title: 'Costa Blanca Nord',
    description: '6 Städte verglichen — Jávea, Moraira, Altea, Calpe, Dénia & Benissa mit Drohnen fotografie.',
    href: '/de/guides/costa-blanca-nord',
    icon: '🏔️',
    badges: ['6 Städte', 'Regionguide'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Golfparadies mit La Zenia, Villamartin, Cabo Roig und mehr. Erschwingliches Südküstenleben.',
    href: '/de/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 Gebiete', 'Golfausrichtung'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Spaniens dynamischste Küstenstadt — Strände, Nachtleben und überraschendpotenzial für Investitionen.',
    href: '/de/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 Zonen', 'Stadtguide'],
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Expert Leitfäden</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Kaufleitfäden</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Alles, was Sie über den Kauf von Neubau in Costa Blanca wissen müssen.
            Expert Leitfäden geschrieben für deutsche Käufer.
          </p>
          <p className="text-warm-300">
            Von NIE-Nummer bis Hypothek, wir führen Sie durch jeden Schritt des Prozesses.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Muss Lesen</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Essenzielle Käuferleitfäden</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Die vier Leitfäden, die jeder Käufer vor dem Kauf in Spanien lesen sollte</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/de/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-accent-500 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-accent-500 text-sm font-semibold flex items-center gap-1">
                      Lesen
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Destination Guides */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Gebiete Erkunden</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Destinationsleitfäden</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Umfassende Leitfäden für die besten Gebiete an der Costa Blanca</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinationGuides.map((dest) => (
              <Link key={dest.href} href={dest.href}>
                <div className="bg-primary-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow h-full group">
                  <div className="h-32 bg-gradient-to-br from-accent-500/30 to-primary-800 flex items-center justify-center">
                    <span className="text-5xl">{dest.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-warm-300 text-sm mb-3">{dest.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.badges.map((badge, i) => (
                        <span key={i} className="text-xs bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decision & Planning Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Planung</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Entscheidungsleitfäden</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Treffen Sie informierte Entscheidungen über Standort, Immobilientyp und Anlagestrategie</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/de/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-primary-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-primary-600 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                      Lesen
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Finance CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Finanzierung & Hypotheken</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Bereit, Hypothekenzinssätze zu vergleichen?</h2>
              <p className="text-warm-200 mb-6">
                Vergleichen Sie Zinssätze von über 15 spanischen Banken, siehe aktuelle Marktdaten und erkunden Sie Finanzierungsoptionen
                für Standard- und Luxusimmobilien.
              </p>
              <Link
                href="/de/guides/hypothek"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Hypotheken Vergleichen &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Durchschnittlicher Festzins</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">Nicht-Resident LTV</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Vergleichbare Banken</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">&euro;800k+</div>
                <div className="text-warm-300 text-sm mt-1">Luxusoptionen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Warum Unseren Leitfäden Vertrauen?</h2>
            <p className="text-warm-600">Lokale Expertise kombiniert mit internationalem Verständnis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Lokale Expertise</h3>
              <p className="text-warm-600">Ansässig an der Costa Blanca mit jahrelanger Erfahrung bei der Unterstützung deutscher Käufer durch den spanischen Immobilienmarkt.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Aktualisierte Informationen</h3>
              <p className="text-warm-600">Regelmäßig aktualisiert, um aktuelle spanische Immobilienzahlen, Steuervorschriften und Marktbedingungen widerzuspiegeln.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Internationaler Fokus</h3>
              <p className="text-warm-600">Speziell für internationale Käufer geschrieben — Behandlung einzigartiger Herausforderungen wie NIE-Nummern, Auslandshypotheken und Nicht-Residenten-Steuern.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Haben Sie Fragen?</h2>
          <p className="text-xl text-white/90 mb-8">
            Unser Team ist hier, um Sie durch den Kaufprozess zu führen. Kontaktieren Sie uns für persönliche Beratung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/de/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Kontaktieren Sie Uns
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Schnelle Antwort innerhalb von 24 Stunden — oft viel schneller
          </p>
        </div>
      </section>
    </main>
  );
}
