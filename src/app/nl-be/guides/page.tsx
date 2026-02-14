import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Koopgidsen | Belgische Kopers Gids voor Spaans Onroerend Goed | Costa Blanca 2026',
  description: 'Omvattende gidsen voor Belgische kopers van nieuwbouw in Spanje. NIE-nummer, hypotheek, kosten en het koopproces uitgelegd voor Vlaamse en Waalse kopers.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides',
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
    title: 'Het Koopproces',
    slug: 'koopproces',
    description: 'Stap-voor-stap gids voor het kopen van nieuwbouw in Spanje. Van reservering tot sleuteloverdracht.',
    icon: '📋',
    readTime: '12 min lezen',
    category: 'Essentieel',
  },
  {
    title: 'NIE-nummer Gids',
    slug: 'nie-nummer',
    description: 'Hoe u uw NIE-nummer krijgt — verplicht voor vastgoedaankoop in Spanje.',
    icon: '🪪',
    readTime: '8 min lezen',
    category: 'Essentieel',
  },
  {
    title: 'Kosten & Belastingen',
    slug: 'kosten-belasting',
    description: 'Volledige uitsplitsing van aankoop kosten, belastingen en lopende uitgaven voor vastgoed eigenaren.',
    icon: '💰',
    readTime: '10 min lezen',
    category: 'Essentieel',
  },
  {
    title: 'Hypotheken voor Buitenlanders',
    slug: 'hypotheek',
    description: 'Hoe u een hypotheek in Spanje krijgt als Belgische koper. Eisen en stap-voor-stap proces.',
    icon: '🏦',
    readTime: '10 min lezen',
    category: 'Essentieel',
  },
];

const decisionGuides = [
  {
    title: 'Waarom Nieuwbouw Kopen?',
    slug: 'waarom-nieuwbouw',
    description: 'Voordelen van nieuwbouw boven resale — garanties, energieefficiëntie en modern design.',
    icon: '🏗️',
    readTime: '6 min lezen',
    category: 'Besluit',
  },
  {
    title: 'Kant-en-klaar vs Op Ritning',
    slug: 'kant-en-klaar-vs-ritning',
    description: 'Koopt u kant-en-klaar of op tekening? Voor- en nadelen voor Belgische kopers.',
    icon: '🔑',
    readTime: '8 min lezen',
    category: 'Besluit',
  },
  {
    title: 'Noord vs Zuid Costa Blanca',
    slug: 'noord-vs-zuid',
    description: 'Vergelijk de twee gebieden — exclusieve noorden vs betaalbare zuiden. Vind uw perfecte locatie.',
    icon: '🗺️',
    readTime: '10 min lezen',
    category: 'Besluit',
  },
  {
    title: 'Toeristische Verhuurlicentie',
    slug: 'tourist-rental-license',
    description: 'Alles over vakantieverhuurlicenties in de Valencia Gemeenschap — vereisten, proces en inkomstpotentieel.',
    icon: '📜',
    readTime: '8 min lezen',
    category: 'Investering',
  },
];

const destinationGuides = [
  {
    title: 'Torrevieja',
    description: '7 wijken met drone fotografie. De definitieve Costa Blanca Zuid gids.',
    href: '/nl-be/guides/torrevieja',
    icon: '🏖️',
    badges: ['104+ foto\'s', '7 zones'],
  },
  {
    title: 'Jávea',
    description: '4 wijken van Arenal strand naar Montgó berg. Premium Noordkust wonen.',
    href: '/nl-be/guides/javea',
    icon: '⛵',
    badges: ['4 wijken', '7 stranden'],
  },
  {
    title: 'Costa Blanca Noord',
    description: '6 steden vergeleken — Jávea, Moraira, Altea, Calpe, Dénia & Benissa met drone fotografie.',
    href: '/nl-be/guides/costa-blanca-noord',
    icon: '🏔️',
    badges: ['6 steden', 'Regiogids'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Golfparadijs met La Zenia, Villamartin, Cabo Roig & meer. Betaalbaar Zuidkust wonen.',
    href: '/nl-be/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 gebieden', 'Golfgericht'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Spanje\'s meest dynamische kuststad — stranden, nachtleven en verrassende investeringspotentieel.',
    href: '/nl-be/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 zones', 'Stadsgids'],
  },
];

export default function BelgianGuidesPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Expertgidsen</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Koopgidsen</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Alles wat u moet weten over het kopen van nieuwbouw in Costa Blanca.
            Expertgidsen geschreven voor Belgische kopers.
          </p>
          <p className="text-warm-300">
            Van NIE-nummer tot hypotheek, we leiden u door elke stap van het proces.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Moet Lezen</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Essentiële Kopergidsen</h2>
            <p className="text-warm-600 max-w-xl mx-auto">De vier gidsen die elke koper moet lezen voordat ze in Spanje kopen</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/nl-be/guides/${guide.slug}`}>
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
                      Lees
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
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Verken Gebieden</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Bestemmingsgidsen</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Diepgaande gidsen voor de beste gebieden op Costa Blanca</p>
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
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Planning</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Beslissingsgidsen</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Maak geïnformeerde keuzes over locatie, eigendomstype en investeringsstrategie</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/nl-be/guides/${guide.slug}`}>
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
                      Lees
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
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Financiering & Hypotheken</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Klaar om Hypotheekrentals te Vergelijken?</h2>
              <p className="text-warm-200 mb-6">
                Vergelijk tarieven van 15+ Spaanse banken, zie huidige marktgegevens en verken financieringsopties
                voor zowel standaard als luxe eigenschappen.
              </p>
              <Link
                href="/nl-be/guides/hypotheek"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Vergelijk Hypotheken &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Gemiddeld vast tarief</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">Niet-inwonerslening</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Vergeleken banken</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">&euro;800k+</div>
                <div className="text-warm-300 text-sm mt-1">Luxe opties</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Waarom Onze Gidsen Vertrouwen?</h2>
            <p className="text-warm-600">Deskundige kennis gecombineerd met internationaal begrip</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Lokale Expertise</h3>
              <p className="text-warm-600">Gevestigd op Costa Blanca met jaren ervaring in het helpen van Belgische kopers door de Spaanse vastgoedmarkt navigeren.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Bijgewerkte Informatie</h3>
              <p className="text-warm-600">Regelmatig bijgewerkt om huidige Spaanse vastgoedwetten, belastingvoorschriften en marktvoorwaarden weer te geven.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Internationale Focus</h3>
              <p className="text-warm-600">Speciaal geschreven voor internationale kopers — behandeling van unieke uitdagingen zoals NIE-nummers, buitenlandse hypotheken en niet-inwonerbelastingen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Heeft u Vragen?</h2>
          <p className="text-xl text-white/90 mb-8">
            Ons team is hier om u door het koopproces te begeleiden. Contacteer ons voor persoonlijk advies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nl-be/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Neem Contact Op
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
            Snel antwoord binnen 24 uur — vaak veel sneller
          </p>
        </div>
      </section>
    </main>
  );
}
