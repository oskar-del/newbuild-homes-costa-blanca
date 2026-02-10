import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Golf på Costa Blanca | Golfboliger & Baner',
  description: 'Finn nye villaer nær 22 golfbaner på Costa Blanca. Golf året rundt i Spania — €40-80 green fee vs 1000-2000 NOK i Norge.',
  openGraph: {
    title: 'Golf på Costa Blanca | Nye villaer ved golfbaner',
    description: 'Nye boliger ved golfbaner på Costa Blanca fra €150.000.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/golf',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/golf',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/golf',
      'no': 'https://newbuildhomescostablanca.com/no/golf',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

export default function NOGolfPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Golf', url: 'https://newbuildhomescostablanca.com/no/golf/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-600/10 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/no" className="hover:text-white transition-colors">Hjem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Golf</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Golflivsstil</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Lev <span className="font-semibold">golfdrømmen</span> i Spania
              </h1>

              <p className="text-warm-200 text-lg leading-relaxed mb-8">
                Vakn til fairway-utsikter, spill verdensklasse baner og nyt årlig middelhavssol. Golf året rundt på Costa Blanca.
              </p>

              <div className="flex flex-wrap gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">€40-80</div>
                  <div className="text-warm-400 text-sm">Green fee per runde</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1000-2000 NOK</div>
                  <div className="text-warm-400 text-sm">I Norge koster det...</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-warm-400 text-sm">Spilledager/år</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Spørr om golfvillaer
                </a>
                <Link href="/no/contact" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  Se Villaer
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Golf Properties */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-900" />
                <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                  Hvorfor golfeiendommer?
                </span>
                <div className="w-10 h-px bg-primary-900" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Hvorfor kjøpe ved en golfbane?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Langt utover livsstilen tilbyr golfeiendommer overbevisende investeringsfordeler.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-warm-50 rounded-xl p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Stark Verdistigning</h3>
                <p className="text-warm-600 text-sm">
                  Golfeiendommer oppnår bedre markedskraft. Begrenset tilgang på etablerte baner driver verdiøkning over gjennomsnitt.
                </p>
              </div>

              <div className="bg-warm-50 rounded-xl p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Høy Leieintekt</h3>
                <p className="text-warm-600 text-sm">
                  Golftourister søker kvalitetsbolig nær baner. Lang sesong (sep-jun) gir 4-6% avkastning.
                </p>
              </div>

              <div className="bg-warm-50 rounded-xl p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Høykvalitet Miljø</h3>
                <p className="text-warm-600 text-sm">
                  Golfresorts vedlikeholdes etter høye standarder. Landskapsarkitektur, sikkerhet og fasiliteter utmerket.
                </p>
              </div>

              <div className="bg-warm-50 rounded-xl p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Golfsamfunn</h3>
                <p className="text-warm-600 text-sm">
                  Golfresorts attraherer likesinnet internasjonale innbyggere. Golf, klubber og arrangementer skaper vennskap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Klar til å <span className="font-semibold">slå slag?</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Vi hjelper deg med å finne den perfekte golfvilla på Costa Blanca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/no/properties?region=golf"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Se Golfvillaer
              </Link>
              <Link
                href="/no/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-all border border-white/20"
              >
                Kontakt Oss
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
