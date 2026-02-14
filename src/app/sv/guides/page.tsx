import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Köpguider | Svenska Köpares Guide till Spansk Fastighet | Costa Blanca 2026',
  description: 'Komprehensiva guider för svenska köpare av nybygge i Spanien. NIE-nummer, bolån, kostnader, och köpprocessen förklarad.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/guides',
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
    title: 'Köpprocessen',
    slug: 'kopprocessen',
    description: 'Steg-för-steg guide till att köpa nybygge i Spanien. Från reservation till slutbesiktning.',
    icon: '📋',
    readTime: '12 min läsning',
    category: 'Essentiell',
  },
  {
    title: 'NIE-nummer Guide',
    slug: 'nie-nummer',
    description: 'Hur du skaffar ditt NIE-nummer — obligatoriskt för fastighetsköp i Spanien.',
    icon: '🪪',
    readTime: '8 min läsning',
    category: 'Essentiell',
  },
  {
    title: 'Kostnader & Skatter',
    slug: 'kostnader-skatter',
    description: 'Komplett uppdelning av köpkostnader, skatter och löpande utgifter för fastighetsägare.',
    icon: '💰',
    readTime: '10 min läsning',
    category: 'Essentiell',
  },
  {
    title: 'Bolån för Utländska Köpare',
    slug: 'bolan-spanien',
    description: 'Hur du får bolån i Spanien som svensk. SBAB, Skandia och spanska banker.',
    icon: '🏦',
    readTime: '10 min läsning',
    category: 'Essentiell',
  },
];

const decisionGuides = [
  {
    title: 'Varför Köpa Nybygge?',
    slug: 'why-new-build',
    description: 'Fördelarna med nybygge framför begagnad fastighet — garantier, energieffektivitet och modern design.',
    icon: '🏗️',
    readTime: '6 min läsning',
    category: 'Beslut',
  },
  {
    title: 'Inflyttningsklart vs Ritning',
    slug: 'key-ready-vs-off-plan',
    description: 'Skal du köpa färdigt eller på ritning? Fördelar och nackdelar för svenska köpare.',
    icon: '🔑',
    readTime: '8 min läsning',
    category: 'Beslut',
  },
  {
    title: 'Norr vs Söder Costa Blanca',
    slug: 'north-vs-south',
    description: 'Jämför de två regionerna — exklusiva norr mot prisvärda söder. Hitta din perfekta plats.',
    icon: '🗺️',
    readTime: '10 min läsning',
    category: 'Beslut',
  },
  {
    title: 'Turistuthyrningslicens',
    slug: 'tourist-rental-license',
    description: 'Allt om semesteruthyrningslicenser i Valenciaregionen — krav, process och inkomstpotential.',
    icon: '📜',
    readTime: '8 min läsning',
    category: 'Investering',
  },
];

const destinationGuides = [
  {
    title: 'Torrevieja',
    description: '7 stadsdelar med drönarvideo. Den kompletta Costa Blanca Söder-guiden.',
    href: '/sv/guides/torrevieja',
    icon: '🏖️',
    badges: ['100+ foton', '7 zoner'],
  },
  {
    title: 'Jávea',
    description: '4 stadsdelar från Arenal-stranden till Montgó-berget. Premiumkustliv.',
    href: '/sv/guides/javea',
    icon: '⛵',
    badges: ['4 stadsdelar', '7 stränder'],
  },
  {
    title: 'Costa Blanca Nord',
    description: '6 städer jämförda — Jávea, Moraira, Altea, Calpe, Dénia & Benissa med drönarvideo.',
    href: '/sv/guides/costa-blanca-north',
    icon: '🏔️',
    badges: ['6 städer', 'Regionguide'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Golfparadis med La Zenia, Villamartin, Cabo Roig och mera. Prisvärt kustliv.',
    href: '/sv/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 områden', 'Golfkälla'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Spaniens mest dynamiska kuststad — stränder, nattliv och överraskande investeringspotential.',
    href: '/sv/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 zoner', 'Stadguide'],
  },
];

export default function SwedishGuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Expertguider</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Köpguider</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Allt du behöver veta för att köpa nybygge i Costa Blanca.
            Expertguider skrivna speciellt för svenska köpare.
          </p>
          <p className="text-warm-300">
            Från NIE-nummer till bolån, vi guidar dig genom varje steg av processen.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Måste Läsa</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Essentiella Köparguider</h2>
            <p className="text-warm-600 max-w-xl mx-auto">De fyra guider varje köpare måste läsa innan köp i Spanien</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/sv/guides/${guide.slug}`}>
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
                      Läs
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
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Utforska Områden</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Destinationsguider</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Djupgående guider till de bästa områdena på Costa Blanca</p>
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
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Planering</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Beslutsguider</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Fatta informerade val om plats, fastighetstyp och investeringsstrategi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/sv/guides/${guide.slug}`}>
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
                      Läs
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
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Finansiering & Bolån</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Redo att Jämföra Bolåneräntor?</h2>
              <p className="text-warm-200 mb-6">
                Jämför räntor från 15+ spanska banker, se aktuell marknadsdata och utforska finansieringsalternativ
                för både vanliga och lyxfastigheter.
              </p>
              <Link
                href="/sv/guides/bolan-spanien"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Jämför Bolån &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Genomsnittlig fast räntesats</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">Icke-invånare LTV</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Banker jämförda</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">&euro;800k+</div>
                <div className="text-warm-300 text-sm mt-1">Lyxalternativ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Varför Lita på Våra Guider?</h2>
            <p className="text-warm-600">Expertkunskap kombinerad med internationell förståelse</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Lokal Expertis</h3>
              <p className="text-warm-600">Etablerade på Costa Blanca med årens erfarenhet av att hjälpa svenska köpare navigera den spanska fastighetsmarknaden.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Uppdaterad Information</h3>
              <p className="text-warm-600">Regelbundet uppdaterad för att spegla aktuella spanska fastighetslagstiftningar, skatteregleringar och marknadsförhållanden.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Internationell Fokus</h3>
              <p className="text-warm-600">Skrivna specifikt för internationella köpare — täcker unika utmaningar som NIE-nummer, utländska bolån och skatter för icke-invånare.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Har Du Frågor?</h2>
          <p className="text-xl text-white/90 mb-8">
            Vårt team är här för att vägleda dig genom köpprocessen. Kontakta oss för personlig rådgivning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sv/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Kontakta Oss
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
            Snabbt svar inom 24 timmar — ofta mycket snabbare
          </p>
        </div>
      </section>
    </main>
  );
}
