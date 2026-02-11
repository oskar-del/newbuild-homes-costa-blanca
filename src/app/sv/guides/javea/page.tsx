import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Bo i Jávea 2026 — Guide för Svenska Köpare',
  description: 'Komplett guide till Jávea på Costa Blanca Nord. 4 stadsdelar, vackra stränder, bergen, vandringsled och varför svenskar älskar denna exklusiva medelhavstad.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/guides/javea',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/javea',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/javea',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/javea',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-BE/guides/javea',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/javea',
      'no': 'https://newbuildhomescostablanca.com/no/guides/javea',
      'x-default': 'https://newbuildhomescostablanca.com/guides/javea',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const neighborhoods = [
  { name: 'Jávea Pueblo', description: 'Gamla staden med charmiga gator, kyrkan och autentic spansk karaktär. Lokala restauranger, barer och marknader. Hjärtat av det verkliga Jávea.', priceFrom: '€250,000', highlight: 'Mest autentisk' },
  { name: 'El Arenal', description: 'Stranden med sand, restaurangstråk och strandpromenaden. Mjuk sand och badmöjligheter året runt. Livligt område med kafé och shoppar.', priceFrom: '€300,000', highlight: 'Bästa stranden' },
  { name: 'Portichol', description: 'Premium område med exklusiva villor och spektakulär utsikt över Medelhavat. Klippstrand och naturreservat. Golfnärhet och avskildhet.', priceFrom: '€500,000', highlight: 'Mest exklusivt' },
  { name: 'Tosalet', description: 'Moderna villor och bostäder med golf-närheten. Lugnt och väl planerat område. Perfekt för familjer som vill ha moderna fastigheterna nära natur.', priceFrom: '€350,000', highlight: 'Modernaste området' },
];

const beaches = [
  { name: 'El Arenal', description: 'Sandstrand med faciliteter, restauranger och livligt strandliv. 800 meter sandstrand.' },
  { name: 'Granadella', description: 'Vacker fjärdstrand med kristallklart vatten. Omgiven av skogar och klippor. Vildare och mer naturlig.' },
  { name: 'La Barraca', description: 'Liten hemlig strand med turkost vatten. Perfekt för snorkling och fredlig miljö.' },
  { name: 'Ambolo', description: 'Naturistrand med enkel tillgång. Kristallklart vatten omgiven av berg.' },
];

export default function JaveaSvGuide() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hem', url: 'https://newbuildhomescostablanca.com/sv' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/sv/guides' },
    { name: 'Jávea', url: 'https://newbuildhomescostablanca.com/sv/guides/javea' },
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
              <span className="text-white">Jávea</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Områdesguide</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light mb-6">
              Bo i <span className="font-semibold">Jávea</span>
            </h1>

            <p className="text-warm-200 text-lg max-w-3xl leading-relaxed mb-8">
              Jávea är en exklusiv medelhavstad på Costa Blanca Nord där berg möter hav. Med autentisk spansk karaktär,
              vackra stränder, vandringsleder i naturen och ett mindre touristiskt intryck än södra Costa Blanca,
              erbjuder det en högre livskvalitet för dem som söker verklig Medelhavslivsstil.
            </p>

            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-3xl font-semibold">4</div>
                <div className="text-warm-400 text-sm">Stadsdelar</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">4</div>
                <div className="text-warm-400 text-sm">Huvudstränder</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">Berg + Hav</div>
                <div className="text-warm-400 text-sm">Naturlandskap</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">Från €250k</div>
                <div className="text-warm-400 text-sm">Nybyggen</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Swedes Choose Jávea */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">Varför Jávea</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Varför Svenskar Älskar Jávea</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Livskvalitet</h3>
                <p className="text-warm-600 text-sm">Mindre trånga än södra Costa Blanca. Fokus på det lokala community och verklig spansk livsstil utan överdriven turism.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Verkligt Spanskt</h3>
                <p className="text-warm-600 text-sm">Gamla staden Jávea Pueblo bevarar autentisk karaktär. Lokala marknader, små restauranger och spansk atmosfär året runt.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Berg och Hav</h3>
                <p className="text-warm-600 text-sm">Montgo berg omger staden. Vackra vandringsleder, naturreservat och berg-till-hav vyer. Unikt landskap.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Medan och Aktiviteter</h3>
                <p className="text-warm-600 text-sm">Aktivt community med vandring, vatten, yoga och wellness. Kulinariska erfarenheter och lokala festivaler.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Mindre Touriserat</h3>
                <p className="text-warm-600 text-sm">Jávea behåller karaktären även under högsäsongen. Inte översvämmat av massturism. Mer avslappnad atmosfär.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Skandinaviskt Community</h3>
                <p className="text-warm-600 text-sm">Växande antal svenska invånare. Nordic expat-nätverk. Stöd och vänskap med likasinnade från hemland.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Stadsdelar</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">4 Huvudstadsdelar i Jávea</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {neighborhoods.map((area) => (
                <div key={area.name} className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-primary-900">{area.name}</h3>
                    <span className="text-xs bg-accent-500/10 text-accent-600 px-2 py-1 rounded font-medium">{area.highlight}</span>
                  </div>
                  <p className="text-warm-600 text-sm mb-4">{area.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-warm-100">
                    <span className="text-accent-600 font-semibold">Från {area.priceFrom}</span>
                    <Link href="/sv/properties?town=Javea" className="text-accent-600 text-sm font-medium hover:text-accent-700">
                      Se bostäder
                      <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beaches */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">Stränder</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Jáveas Vackraste Stränder</h2>
              <p className="text-warm-600 mt-2">Från sandstränder till hemliga klippstränder. Kristallklart vatten året runt.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {beaches.map((beach) => (
                <div key={beach.name} className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-2">{beach.name}</h3>
                  <p className="text-warm-600 text-sm">{beach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-14 bg-warm-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Priser</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Jävea vs Stockholm</h2>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-4">Jávea Medelvärde</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Villa 150m²</span>
                      <span className="font-semibold text-accent-600">€350-500k</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Lägenhet 100m²</span>
                      <span className="font-semibold text-accent-600">€250-350k</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-4">Stockholm Medelvärde</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Villa 150m²</span>
                      <span className="font-semibold text-accent-600">9-15 MSEK</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-warm-200">
                      <span className="text-warm-600">Lägenhet 100m²</span>
                      <span className="font-semibold text-accent-600">5-8 MSEK</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-warm-600 text-sm mt-6 text-center">Jávea kostnar typiskt 60-70% mindre än motsvarande fastighet i Stockholm.</p>
            </div>
          </div>
        </section>

        {/* Full Guide CTA */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Utforska Vår Kompletta Jávea-Guide
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Vår detaljerade engelskspråkiga guide innehåller alla områden, stränder, aktiviteter och praktisk information.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/sv/guides/javea"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                Läs Fullständig Guide (Engelska)
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
            <h2 className="text-2xl font-light text-primary-900 mb-4">Intresserad av Jávea?</h2>
            <p className="text-warm-600 mb-6">Vi hjälper dig hitta rätt bostad i detta vackra område. Kontakta oss på svenska.</p>
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
              <Link href="/sv/properties?town=Javea" className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                Se Bostäder
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
