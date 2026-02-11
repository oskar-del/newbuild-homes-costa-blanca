import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Bo i Torrevieja 2026 — Komplett Guide for Svenska Köpare',
  description: 'Allt du behöver veta om att bo i Torrevieja. 7 stadsdelar, stränder, fastighetspriser, svensk community och praktiska tips för svenskar som vill flytta till Costa Blanca.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/guides/torrevieja',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/torrevieja',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/torrevieja',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/torrevieja',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-BE/guides/torrevieja',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/torrevieja',
      'no': 'https://newbuildhomescostablanca.com/no/guides/torrevieja',
      'x-default': 'https://newbuildhomescostablanca.com/guides/torrevieja',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const neighborhoods = [
  { name: 'La Mata', description: 'Naturreservat, lång sandstrand, lokalt spanskt liv. Populärt bland skandinaver som vill ha lugn och natur.', priceFrom: '€130,000', vibe: 'Lugnt & genuint' },
  { name: 'Los Balcones / Aguas Nuevas', description: 'Modern stadsdel med nybyggda lägenheter och villor. Nära köpcentrum och golfbanor. Stort skandinaviskt community.', priceFrom: '€150,000', vibe: 'Modernt & bekvämt' },
  { name: 'Torrevieja Centrum', description: 'Havsfront, promenaden, marknader och restauranger. Som att bo mitt i stan med havet som granne.', priceFrom: '€120,000', vibe: 'Urbant & levande' },
  { name: 'Cabo Cervera / La Veleta', description: 'Klippkust med spektakulär havsutsikt. Lugnare bostadsområde med premiumkänsla.', priceFrom: '€180,000', vibe: 'Premium & lugnt' },
  { name: 'Los Altos / Punta Prima', description: 'Gränsar mot Orihuela Costa. Populärt bland skandinaviska familjer. Nära La Zenia Boulevard.', priceFrom: '€140,000', vibe: 'Familjevänligt' },
  { name: 'Torreta / Playa Flamenca sidan', description: 'Budget-vänligt med bra tillgång till stränder och butiker. Stort internationellt community.', priceFrom: '€100,000', vibe: 'Prisvärt & socialt' },
  { name: 'El Chaparral', description: 'Inlandsområde med större tomter och villor. Nära golfbanor och naturområden.', priceFrom: '€160,000', vibe: 'Rymligt & grönt' },
];

export default function TorreviejaSvGuide() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hem', url: 'https://newbuildhomescostablanca.com/sv' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/sv/guides' },
    { name: 'Torrevieja', url: 'https://newbuildhomescostablanca.com/sv/guides/torrevieja' },
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
              <span className="text-white">Torrevieja</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Områdesguide</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light mb-6">
              Bo i <span className="font-semibold">Torrevieja</span> — Guide 2026
            </h1>

            <p className="text-warm-200 text-lg max-w-3xl leading-relaxed mb-8">
              Torrevieja är det mest populära området på Costa Blanca Söder bland skandinaver. Med 25,000+ svenskar
              och norrmän i regionen hittar du ett etablerat community, Svenska kyrkan, skandinaviska skolor och
              restauranger med svensk meny. Här är din kompletta guide.
            </p>

            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-3xl font-semibold">80,000+</div>
                <div className="text-warm-400 text-sm">Invånare</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">7</div>
                <div className="text-warm-400 text-sm">Stadsdelar</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">300+</div>
                <div className="text-warm-400 text-sm">Soldagar/år</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">Från €100k</div>
                <div className="text-warm-400 text-sm">Nybyggen</div>
              </div>
            </div>
          </div>
        </section>

        {/* Swedish Community Highlight */}
        <section className="py-12 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-warm-50 rounded-lg p-8 border border-warm-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">Svenska i Torrevieja</span>
              </div>
              <h2 className="text-2xl font-light text-primary-900 mb-4">Varför Svenskar Väljer Torrevieja</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Svenska Kyrkan</h3>
                  <p className="text-warm-600 text-sm">Aktiv svensk församling med gudstjänster, Lucia-firande, midsommar på stranden och sociala aktiviteter året runt.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">SIS Skandinavisk Skola</h3>
                  <p className="text-warm-600 text-sm">Scandinavian International School i Torrevieja erbjuder undervisning på svenska och norska från förskola till gymnasium.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Svensktalande Service</h3>
                  <p className="text-warm-600 text-sm">Läkare, tandläkare, advokater och mäklare som talar svenska. Du behöver aldrig känna dig vilse.</p>
                </div>
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
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">7 Stadsdelar i Torrevieja</h2>
              <p className="text-warm-600 mt-2 max-w-2xl mx-auto">Varje stadsdel har sin egen karaktär och prisbild. Här är en översikt för att hjälpa dig välja rätt.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map((area) => (
                <div key={area.name} className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-primary-900">{area.name}</h3>
                    <span className="text-xs bg-warm-100 text-warm-600 px-2 py-1 rounded">{area.vibe}</span>
                  </div>
                  <p className="text-warm-600 text-sm mb-4">{area.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-warm-100">
                    <span className="text-accent-600 font-semibold">Från {area.priceFrom}</span>
                    <Link href="/sv/properties?town=Torrevieja" className="text-accent-600 text-sm font-medium hover:text-accent-700">
                      Se bostäder
                      <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Priser: Torrevieja vs Stockholm</h2>
              <p className="text-warm-600 mt-2">Vad får du för pengarna jämfört med Sverige?</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-warm-50 rounded-lg p-6 border border-warm-200 text-center">
                <div className="text-warm-500 text-sm mb-2">Stockholm — 2:a Södermalm</div>
                <div className="text-2xl font-bold text-primary-900 mb-1">~4,500,000 kr</div>
                <div className="text-warm-400 text-xs mb-4">55 m², ingen balkong</div>
                <div className="w-full h-px bg-warm-200 mb-4" />
                <div className="text-accent-600 text-sm font-medium">Samma pengar i Torrevieja:</div>
                <div className="text-primary-900 font-semibold mt-1">3-rums villa med pool, 100 m²</div>
              </div>
              <div className="bg-warm-50 rounded-lg p-6 border border-warm-200 text-center">
                <div className="text-warm-500 text-sm mb-2">Göteborg — 3:a Majorna</div>
                <div className="text-2xl font-bold text-primary-900 mb-1">~3,200,000 kr</div>
                <div className="text-warm-400 text-xs mb-4">72 m², bostadsrätt</div>
                <div className="w-full h-px bg-warm-200 mb-4" />
                <div className="text-accent-600 text-sm font-medium">Samma pengar i Torrevieja:</div>
                <div className="text-primary-900 font-semibold mt-1">2-rums lägenhet med havsutsikt, pool</div>
              </div>
              <div className="bg-warm-50 rounded-lg p-6 border border-warm-200 text-center">
                <div className="text-warm-500 text-sm mb-2">Malmö — Villa Limhamn</div>
                <div className="text-2xl font-bold text-primary-900 mb-1">~6,500,000 kr</div>
                <div className="text-warm-400 text-xs mb-4">130 m², liten tomt</div>
                <div className="w-full h-px bg-warm-200 mb-4" />
                <div className="text-accent-600 text-sm font-medium">Samma pengar i Torrevieja:</div>
                <div className="text-primary-900 font-semibold mt-1">Lyxvilla 4 rum, pool, 300 m² tomt</div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Guide CTA */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Fullständig Guide</span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Utforska Vår Kompletta Torrevieja-Guide
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Vår engelskspråkiga guide innehåller exklusiva drönarbilde, detaljerade kartor och djupgående analys av alla 7 stadsdelar.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/sv/guides/torrevieja"
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
            <h2 className="text-2xl font-light text-primary-900 mb-8 text-center">Köpguider för Torrevieja</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/sv/guides/kopprocessen" className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all group">
                <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 mb-2">Köpprocessen</h3>
                <p className="text-warm-600 text-sm">Steg-för-steg från Sverige till nyckelöverlämning i Torrevieja.</p>
              </Link>
              <Link href="/sv/guides/kostnader-skatter" className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all group">
                <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 mb-2">Kostnader & Skatter</h3>
                <p className="text-warm-600 text-sm">Vad kostar det egentligen att köpa i Spanien? Komplett uppdelning.</p>
              </Link>
              <Link href="/sv/guides/bolan-spanien" className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all group">
                <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 mb-2">Bolån i Spanien</h3>
                <p className="text-warm-600 text-sm">Hur du finansierar ditt köp som svensk. Banker och räntor.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-light text-primary-900 mb-4">Intresserad av Torrevieja?</h2>
            <p className="text-warm-600 mb-6">Vi hjälper dig hitta rätt bostad i rätt stadsdel. Kontakta oss på svenska.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                WhatsApp
              </a>
              <Link href="/sv/contact" className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                Kontakta Oss
              </Link>
              <Link href="/sv/properties?town=Torrevieja" className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                Se Bostäder i Torrevieja
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
