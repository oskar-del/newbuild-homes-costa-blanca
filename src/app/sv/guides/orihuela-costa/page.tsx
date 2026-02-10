import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Bo i Orihuela Costa 2026 — Guide for Svenska Köpare',
  description: 'Komplett guide till Orihuela Costa for svenskar. 6 stadsdelar, golfbanor, stränder, fastighetspriser och varför det är Costa Blancas mest populära område for nybyggen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/guides/orihuela-costa',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/orihuela-costa',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/orihuela-costa',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const neighborhoods = [
  { name: 'Villamartin', description: 'Hjärtat av Orihuela Costa med den berömda Villamartin Plaza. Golfbana, restauranger, och levande socialt liv. Stort skandinaviskt community.', priceFrom: '€180,000', highlight: 'Bäst sociala livet' },
  { name: 'Punta Prima', description: 'Strandnära med fantastisk promenad längs havet. Moderna nybyggen med havsutsikt. Nära Torrevieja centrum.', priceFrom: '€200,000', highlight: 'Bästa strandläge' },
  { name: 'La Zenia', description: 'Centrum för shopping med La Zenia Boulevard, Spaniens största köpcentrum. Fin strand, restauranger och bra infrastruktur.', priceFrom: '€200,000', highlight: 'Bäst bekvämligheter' },
  { name: 'Cabo Roig', description: 'Charmig hamn, klippstränder och restaurangstråk. Traditionell medelhavskänsla med modern standard.', priceFrom: '€220,000', highlight: 'Mest karaktär' },
  { name: 'Campoamor', description: 'Lugnare och mer exklusivt. Golfbana, bra stränder och premiumkänsla. Populärt bland par och pensionärer.', priceFrom: '€250,000', highlight: 'Mest exklusivt' },
  { name: 'Playa Flamenca', description: 'Prisvärda alternativ med bra tillgång till stränder och service. Lördagsmarknad och livligt gatliv.', priceFrom: '€150,000', highlight: 'Bästa värdet' },
];

const golfCourses = [
  { name: 'Villamartin Golf', holes: 18, greenFee: '€50-70', note: 'Mest populär bland skandinaver' },
  { name: 'Las Colinas Golf', holes: 18, greenFee: '€60-90', note: 'Prisbelönt championship-bana' },
  { name: 'Campoamor Golf', holes: 18, greenFee: '€45-65', note: 'Vacker kuststräcka' },
  { name: 'Lo Romero Golf', holes: 18, greenFee: '€35-55', note: 'Bra värde, modern design' },
  { name: 'Las Ramblas Golf', holes: 18, greenFee: '€45-65', note: 'Kuperad och utmanande' },
];

export default function OrihuelaCostaSvGuide() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hem', url: 'https://newbuildhomescostablanca.com/sv' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/sv/guides' },
    { name: 'Orihuela Costa', url: 'https://newbuildhomescostablanca.com/sv/guides/orihuela-costa' },
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
              <span className="text-white">Orihuela Costa</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Områdesguide</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light mb-6">
              Bo i <span className="font-semibold">Orihuela Costa</span>
            </h1>

            <p className="text-warm-200 text-lg max-w-3xl leading-relaxed mb-8">
              Orihuela Costa sträcker sig 16 km längs kusten söder om Torrevieja och är det mest populära
              området för nybyggen på hela Costa Blanca. Med 5 golfbanor, fantastiska stränder och
              det enorma köpcentrumet La Zenia Boulevard erbjuder det en komplett livsstil.
            </p>

            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-3xl font-semibold">16 km</div>
                <div className="text-warm-400 text-sm">Kustlinje</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">6</div>
                <div className="text-warm-400 text-sm">Stadsdelar</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">5</div>
                <div className="text-warm-400 text-sm">Golfbanor</div>
              </div>
              <div>
                <div className="text-3xl font-semibold">Från €150k</div>
                <div className="text-warm-400 text-sm">Nybyggen</div>
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
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">6 Områden i Orihuela Costa</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map((area) => (
                <div key={area.name} className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-primary-900">{area.name}</h3>
                    <span className="text-xs bg-accent-500/10 text-accent-600 px-2 py-1 rounded font-medium">{area.highlight}</span>
                  </div>
                  <p className="text-warm-600 text-sm mb-4">{area.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-warm-100">
                    <span className="text-accent-600 font-semibold">Från {area.priceFrom}</span>
                    <Link href="/sv/properties?town=Orihuela+Costa" className="text-accent-600 text-sm font-medium hover:text-accent-700">
                      Se bostäder
                      <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Golf Section */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">Golf</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">5 Golfbanor i Orihuela Costa</h2>
              <p className="text-warm-600 mt-2">Spela golf året runt — green fees från €35. Jämfört med Bro Hof Slott (2,000 kr/runda) sparar du tusentals kronor.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-3xl mx-auto text-sm">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 font-semibold text-primary-900">Bana</th>
                    <th className="text-center py-3 font-semibold text-primary-900">Hål</th>
                    <th className="text-center py-3 font-semibold text-primary-900">Green Fee</th>
                    <th className="text-left py-3 font-semibold text-primary-900">Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  {golfCourses.map((course) => (
                    <tr key={course.name} className="border-b border-warm-100">
                      <td className="py-3 font-medium text-primary-900">{course.name}</td>
                      <td className="py-3 text-center text-warm-600">{course.holes}</td>
                      <td className="py-3 text-center text-accent-600 font-medium">{course.greenFee}</td>
                      <td className="py-3 text-warm-600">{course.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/sv/golf"
                className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700"
              >
                Se alla golfbanor på Costa Blanca
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Full Guide CTA */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Utforska Vår Kompletta Orihuela Costa-Guide
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Vår detaljerade engelskspråkiga guide innehåller alla stadsdelar, stränder, golfbanor och praktisk information.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/guides/orihuela-costa"
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
            <h2 className="text-2xl font-light text-primary-900 mb-4">Intresserad av Orihuela Costa?</h2>
            <p className="text-warm-600 mb-6">Vi hjälper dig hitta rätt bostad. Kontakta oss på svenska.</p>
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
              <Link href="/sv/properties?town=Orihuela+Costa" className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                Se Bostäder
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
