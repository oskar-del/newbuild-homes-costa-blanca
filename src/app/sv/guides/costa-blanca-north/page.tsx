import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Costa Blanca Nord 2026 — Den Exklusiva Kusten för Svenska Köpare',
  description: 'Komplett guide till Costa Blanca Nord — Jávea, Moraira, Altea, Calpe och Dénia. Autentiska byar, berg, Michelin-restauranger och varför det är klassens finaste område.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/guides/costa-blanca-north',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/costa-blanca-north',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/costa-blanca-noord',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-BE/guides/costa-blanca-noord',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/costa-blanca-nord',
      'no': 'https://newbuildhomescostablanca.com/no/guides/costa-blanca-nord',
      'x-default': 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const towns = [
  {
    name: 'Jávea',
    description: 'Exklusiv medelhavstad med berg och hav. Autentisk gamla stad, vackra stränder och mindre touriserat än södra Costa Blanca. Fokus på livskvalitet.',
    priceFrom: '€250,000',
    highlight: 'Mest exklusivt',
    features: ['Berg och hav', 'Autentisk spansk', 'Wandringsled', 'Mindre trånga'],
  },
  {
    name: 'Moraira',
    description: 'Intim fiskeby med hamn och strandkaraktär. Mindre än Jávea men mycket charmig. Lokala restauranger och fredlig atmosfär. Växande skandinaviskt community.',
    priceFrom: '€300,000',
    highlight: 'Mest charmig',
    features: ['Fiskehamnvägen', 'Fridfullt', 'Lokala', 'Vacker hamn'],
  },
  {
    name: 'Altea',
    description: 'Konstnärstad med vit kyrka på kullen. Gamla stan med konstgallerier och lokala konstärer. Bohemisk atmosfär. Strand och kultur blandat.',
    priceFrom: '€280,000',
    highlight: 'Mest künstlerisk',
    features: ['Konstnärgallerier', 'Vit kyrka', 'Bohemisk känsla', 'Konstscen'],
  },
  {
    name: 'Calpe',
    description: 'Känd för Peñón de Ifach — den ikoniska klippan. Två stränder och aktiv strandpromenad. Mer touriserad men fortfarande autentisk med många lokala.',
    priceFrom: '€200,000',
    highlight: 'Mest ikone',
    features: ['Peñón de Ifach', 'Två stränder', 'Aktiv strand', 'Bästa värde'],
  },
  {
    name: 'Dénia',
    description: 'Gastronomikapitalet på Costa Blanca. Michelin-restauranger och fisk-marknader. Hamn med båtuthyrning. Kulturell stad med historia och mat i fokus.',
    priceFrom: '€220,000',
    highlight: 'Gastronomi',
    features: ['Michelin-mat', 'Fiskmarknad', 'Hamn', 'Kulturell'],
  },
];

const highlights = [
  {
    title: 'Montgo Nationalpark',
    description: 'Spektakulär bergsformation med vandringsleder. Utsikter över kusten. Vandring till toppen på 2 timmar.',
  },
  {
    title: 'Cap de la Nau',
    description: 'Naturreservat med grotta och snorkelplatser. En av Costa Blancas vackraste platser. Mystisk marin flora.',
  },
  {
    title: 'Bernia Mountain',
    description: 'Klassisk vandring med spektakulär utsikt. Startar nära Altea. En av Spaniens bästa bergsvandring.',
  },
  {
    title: 'Denia Hamn',
    description: 'Aktiv hamn med båtuthyrning och båtar till Balearerna. Fiskmottagning och restauranger.',
  },
];

export default function CostaBancaNorthSvGuide() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hem', url: 'https://newbuildhomescostablanca.com/sv' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/sv/guides' },
    { name: 'Costa Blanca Nord', url: 'https://newbuildhomescostablanca.com/sv/guides/costa-blanca-north' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/sv" className="hover:text-white transition-colors">Hem</Link>
              <span className="mx-2">&rsaquo;</span>
              <Link href="/sv/guides" className="hover:text-white transition-colors">Guider</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white">Costa Blanca Nord</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Områdesguide</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light mb-6">
              Costa Blanca Nord — <span className="font-semibold">Den Exklusiva Kusten</span>
            </h1>

            <p className="text-warm-200 text-lg max-w-3xl leading-relaxed mb-8">
              Costa Blanca Nord är klassens finaste område längs Spaniens kust. Från Jáveás berg till Dénias
              Michelin-restauranger erbjuder de fem städerna autentisk spansk karaktär, högre livskvalitet
              och ett mindre touriserat alternativ jämfört med södra Costa Blanca.
            </p>

            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-3xl font-semibold">5</div>
                <div className="text-warm-400 text-sm">Huvudstäder</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">Högre Priser</div>
                <div className="text-warm-400 text-sm">Men bättre karaktär</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">Berg & Natur</div>
                <div className="text-warm-400 text-sm">Montgo & Bernia</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">Från €200k</div>
                <div className="text-warm-400 text-sm">Nybyggen</div>
              </div>
            </div>
          </div>
        </section>

        {/* Nord vs Söder */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">Jämförelse</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Costa Blanca Nord vs Söder</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto text-sm">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-4 font-semibold text-primary-900">Aspekt</th>
                    <th className="text-center py-4 font-semibold text-primary-900">Costa Blanca Nord</th>
                    <th className="text-center py-4 font-semibold text-primary-900">Costa Blanca Söder</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 font-medium text-primary-900">Karaktär</td>
                    <td className="py-3 text-center text-accent-600 font-medium">Autentisk spansk</td>
                    <td className="py-3 text-center text-warm-600">Mer touriserad</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 font-medium text-primary-900">Priser</td>
                    <td className="py-3 text-center text-accent-600 font-medium">€250-500k+</td>
                    <td className="py-3 text-center text-warm-600">€150-300k</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 font-medium text-primary-900">Livskvalitet</td>
                    <td className="py-3 text-center text-accent-600 font-medium">Höga prioriteter</td>
                    <td className="py-3 text-center text-warm-600">Golfcentrisk</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 font-medium text-primary-900">Natur</td>
                    <td className="py-3 text-center text-accent-600 font-medium">Berg & hav</td>
                    <td className="py-3 text-center text-warm-600">Flatt, golfbanor</td>
                  </tr>
                  <tr className="border-b border-warm-100">
                    <td className="py-3 font-medium text-primary-900">Golfbanor</td>
                    <td className="py-3 text-center text-warm-600">Begränsat</td>
                    <td className="py-3 text-center text-accent-600 font-medium">5 banor i området</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-primary-900">Skandinavärer</td>
                    <td className="py-3 text-center text-warm-600">Växande community</td>
                    <td className="py-3 text-center text-accent-600 font-medium">Störta delen av svenskar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The 5 Towns */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Städer</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">5 Städer — 5 Stilar</h2>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {towns.map((town) => (
                <div key={town.name} className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900">{town.name}</h3>
                      <span className="text-xs bg-accent-500/10 text-accent-600 px-2 py-1 rounded font-medium inline-block mt-2">{town.highlight}</span>
                    </div>
                    <span className="text-accent-600 font-semibold text-right">Från {town.priceFrom}</span>
                  </div>
                  <p className="text-warm-600 text-sm mb-4">{town.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {town.features.map((feature) => (
                      <span key={feature} className="text-xs bg-warm-100 text-primary-700 px-3 py-1 rounded-sm">{feature}</span>
                    ))}
                  </div>
                  <Link href={`/sv/guides/${town.name.toLowerCase()}`} className="text-accent-600 text-sm font-medium hover:text-accent-700 inline-flex items-center gap-1 mt-4">
                    Läs mer om {town.name}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Natural Highlights */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">Natur</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Naturhöjdpunkter</h2>
              <p className="text-warm-600 mt-2">Berg, gröttor, nationalparker och spektakulär kustlinje.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-2">{highlight.title}</h3>
                  <p className="text-warm-600 text-sm">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Costa Blanca Nord */}
        <section className="py-14 bg-warm-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Varför Nord</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Varför Välja Costa Blanca Nord?</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Högre Livskvalitet</h3>
                <p className="text-warm-600 text-sm">Fokus på autentisk spansk livsstil snarare än massa-turism. Mindre trångt och mer fredfullt.</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Spektakulär Natur</h3>
                <p className="text-warm-600 text-sm">Berg, nationalparker och vandringsleder. Ett avbrott från flata golfområden i södern.</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Autentiska Städer</h3>
                <p className="text-warm-600 text-sm">Gamla städer med historia, lokala marknader och spansk atmosfär året runt.</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Kulinarisk Glädje</h3>
                <p className="text-warm-600 text-sm">Michelin-restauranger i Dénia. Fiskmarknad och lokal mat. Gastronomi i fokus.</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Växande Skandinavkunskap</h3>
                <p className="text-warm-600 text-sm">Ökat skandinaviskt nätverk och community. Mindre isolerade än andra områden.</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Bättre Värde Long-term</h3>
                <p className="text-warm-600 text-sm">Fastigheter i autentiska områden behåller värdet bättre än massturiserade områden.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-14">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">Priser</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Costa Blanca Nord vs Stockholm</h2>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-4">Costa Blanca Nord</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Premium Villa 200m²</span>
                      <span className="font-semibold text-accent-600">€400-600k</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Modern Lägenhet 120m²</span>
                      <span className="font-semibold text-accent-600">€250-400k</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Townhouse 150m²</span>
                      <span className="font-semibold text-accent-600">€300-450k</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-4">Stockholm</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Premium Villa 200m²</span>
                      <span className="font-semibold text-accent-600">12-20 MSEK</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Modern Lägenhet 120m²</span>
                      <span className="font-semibold text-accent-600">6-10 MSEK</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Townhouse 150m²</span>
                      <span className="font-semibold text-accent-600">8-14 MSEK</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-warm-600 text-sm text-center">Costa Blanca Nord kostnar typiskt 50-70% mindre än motsvarande fastighet i Stockholm.</p>
            </div>
          </div>
        </section>

        {/* Full Guide CTA */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Utforska Detaljerade Guider för Varje Stad
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Vi har kompletta engelskspråkiga guider för var och en av de fem städerna. Läs om områden,
              stränder, livet och all praktisk information.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/guides"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                Se Alla Guider (Engelska)
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-colors border border-white/20"
              >
                Fråga Oss på Svenska
              </a>
            </div>
          </div>
        </section>

        {/* Buyer Guides */}
        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-light text-primary-900 mb-8 text-center">Köpguider</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/sv/guides/kopprocessen" className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all group">
                <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 mb-2">Köpprocessen</h3>
                <p className="text-warm-600 text-sm">Steg-för-steg guide till att köpa bostad i Spanien.</p>
              </Link>
              <Link href="/sv/guides/kostnader-skatter" className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all group">
                <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 mb-2">Kostnader & Skatter</h3>
                <p className="text-warm-600 text-sm">Komplett uppdelning av köpkostnader och löpande utgifter.</p>
              </Link>
              <Link href="/sv/guides/nie-nummer" className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all group">
                <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 mb-2">NIE-nummer</h3>
                <p className="text-warm-600 text-sm">Hur du skaffar ditt NIE-nummer — steg för steg.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-light text-primary-900 mb-4">Pratar Du Om Att Bo i Costa Blanca Nord?</h2>
            <p className="text-warm-600 mb-6">Vi hjälper dig hitta den perfekta hemstad på norr. Kontakta oss på svenska för expert-rådgivning.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-colors"
              >
                WhatsApp
              </a>
              <Link href="/sv/contact" className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                Kontakta Oss
              </Link>
              <Link href="/sv/properties" className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                Se Alla Bostäder
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
