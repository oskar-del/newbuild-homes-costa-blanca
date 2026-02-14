import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kjøpeguider | Boligkjøp på Costa Blanca | 2026',
  description: 'Omfattende kjøpeguider for norske boligkjøpere. NIE-nummer, skatter, boliglån, kjøpsprosess og destinasjoner.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides',
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
    title: 'Kjøpsprosessen',
    slug: 'kjopsprosessen',
    description: 'Steg-for-steg veiledning til å kjøpe nybygg i Spania. Fra reservering til nøkkeloverlevering.',
    icon: '📋',
    readTime: '12 min lesing',
    category: 'Essentiell',
  },
  {
    title: 'NIE-nummer Guide',
    slug: 'nie-nummer',
    description: 'Hvordan få ditt NIE-nummer — påkrevd for eiendomskjøp i Spania.',
    icon: '🪪',
    readTime: '8 min lesing',
    category: 'Essentiell',
  },
  {
    title: 'Kostnader & Skatter',
    slug: 'kostnader-skatt',
    description: 'Fullstendig oversikt over kjøpsomkostninger, skatter og løpende utgifter for eiendomseiere.',
    icon: '💰',
    readTime: '10 min lesing',
    category: 'Essentiell',
  },
  {
    title: 'Boliglån for Utlendinger',
    slug: 'boliglan',
    description: 'Hvordan få boliglån som norsk kjøper i Spania. Krav og prosess.',
    icon: '🏦',
    readTime: '10 min lesing',
    category: 'Essentiell',
  },
];

const decisionGuides = [
  {
    title: 'Hvorfor Nybygg?',
    slug: 'hvorfor-nybygg',
    description: 'Fordeler med nybygg sammenlignet med brukt eiendom — garantier, energieffektivitet og moderne design.',
    icon: '🏗️',
    readTime: '6 min lesing',
    category: 'Beslutning',
  },
  {
    title: 'Innflyttingsklar vs Tegning',
    slug: 'innflyttingsklar-tegning',
    description: 'Skal jeg kjøpe innflyttingsklar eller etter tegning? Fordeler og ulemper for norske kjøpere.',
    icon: '🔑',
    readTime: '8 min lesing',
    category: 'Beslutning',
  },
  {
    title: 'Nord vs Sør Costa Blanca',
    slug: 'nord-vs-sor',
    description: 'Sammenligning av de to regionene — eksklusiv nord vs prisvennlig sør. Finn din perfekte lokasjon.',
    icon: '🗺️',
    readTime: '10 min lesing',
    category: 'Beslutning',
  },
  {
    title: 'Turistutleielisens',
    slug: 'tourist-rental-license',
    description: 'Alt om turistutleiesertifikater i Valenciaregionen — krav, prosess og potensial.',
    icon: '📜',
    readTime: '8 min lesing',
    category: 'Investering',
  },
];

const destinationGuides = [
  {
    title: 'Torrevieja',
    description: '7 bydeler med dronefotografi. Den komplette Costa Blanca Sør guide.',
    href: '/no/guides/torrevieja',
    icon: '🏖️',
    badges: ['100+ Bilder', '7 Zoner'],
  },
  {
    title: 'Jávea',
    description: '4 bydeler fra Arenal strand til Montgó fjell. Premium nordkystliv.',
    href: '/no/guides/javea',
    icon: '⛵',
    badges: ['4 Bydeler', '7 Strender'],
  },
  {
    title: 'Costa Blanca Nord',
    description: '6 byer sammenlignet — Jávea, Moraira, Altea, Calpe, Dénia & Benissa med dronefotografi.',
    href: '/no/guides/costa-blanca-nord',
    icon: '🏔️',
    badges: ['6 Byer', 'Regionguide'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Golfparadis med La Zenia, Villamartin, Cabo Roig og mer. Prisvennlig sydkystliv.',
    href: '/no/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 Områder', 'Golffokus'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Spanias mest dynamiske kystby — strender, nattliv og overraskende investeringspotensial.',
    href: '/no/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 Zoner', 'Byguide'],
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
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Ekspertguider</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Kjøpeguider</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Alt du trenger å vite om å kjøpe nybygg på Costa Blanca.
            Ekspertguider skrevet for norske kjøpere.
          </p>
          <p className="text-warm-300">
            Fra NIE-nummer til boliglån, vi veileder deg gjennom hver del av prosessen.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Må lese</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Essensielle Kjøperguider</h2>
            <p className="text-warm-600 max-w-xl mx-auto">De fire guidene som hver kjøper bør lese før kjøp i Spania</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/no/guides/${guide.slug}`}>
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
                      Les
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
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Utforsk Områder</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Destinasjonsguider</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Omfattende guider for de beste områdene på Costa Blanca</p>
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
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Planlegging</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Beslutningsguider</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Ta informerte beslutninger om lokasjon, eiendomstype og investeringsstrategi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/no/guides/${guide.slug}`}>
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
                      Les
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
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Finansiering & Boliglån</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Klar til å sammenligne boliglånsrenter?</h2>
              <p className="text-warm-200 mb-6">
                Sammenlign renter fra over 15 spanske banker, se aktuelle markedsdata og utforsk finansieringsalternativer
                for standard og luksuseiendom.
              </p>
              <Link
                href="/no/guides/boliglan"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Sammenlign Boliglån &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Gjennomsnittlig fast rente</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">Ikke-bosatt LTV</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Sammenlignbare banker</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">€800k+</div>
                <div className="text-warm-300 text-sm mt-1">Luksuealternativer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Hvorfor Stole på Våre Guider?</h2>
            <p className="text-warm-600">Lokal ekspertise kombinert med internasjonalt innsyn</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Lokal Ekspertise</h3>
              <p className="text-warm-600">Bosatt på Costa Blanca med mange års erfaring med å hjelpe norske kjøpere gjennom det spanske eiendomsmarkedet.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Oppdatert Informasjon</h3>
              <p className="text-warm-600">Regelmessig oppdatert for å gjenspeile gjeldende spanske eiendomsmarkedsdata, skatteregler og markedsforhold.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Internasjonalt Fokus</h3>
              <p className="text-warm-600">Skrevet spesielt for internasjonale kjøpere — behandler unike utfordringer som NIE-nummere, utenlandske boliglån og skatter for ikke-bosatte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Har du Spørsmål?</h2>
          <p className="text-xl text-white/90 mb-8">
            Vårt team er her for å veilede deg gjennom kjøpsprosessen. Kontakt oss for personlig rådgivning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/no/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Kontakt Oss
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
            Rask respons innen 24 timer — ofte mye raskere
          </p>
        </div>
      </section>
    </main>
  );
}
