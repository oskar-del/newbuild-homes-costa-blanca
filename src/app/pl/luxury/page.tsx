import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Luksusowe Domy Costa Blanca | Wille Premium',
  description: 'Luksusowe wille i apartamenty na Costa Blance. Nowe premium nieruchomości od 750k EUR z wyjątkowymi udogodnieniami.',
  openGraph: {
    title: 'Luksusowe Domy Costa Blanca | Wille Premium',
    description: 'Nowe luksusowe nieruchomości na Costa Blance od 750k EUR.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/luxury',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'de': 'https://newbuildhomescostablanca.com/de/luxury',
      'pl': 'https://newbuildhomescostablanca.com/pl/luxury',
      'ru': 'https://newbuildhomescostablanca.com/ru/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

export default function PolishLuxuryPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Nowe Luksusowe <span className="font-semibold text-accent-400">Wille</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Najwyższej klasy nieruchomości na Costa Blance. Wille z wyjątkowymi widokami, materiałami premium i najnowszą technologią.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Co Definiuje <span className="font-semibold">Luksusową Willę?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Architektura i Design</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Autorski projekt, czasem od międzynarodowych architektów</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Premium materiały: marmur, drewno, naturalne kamienie</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Drogi sprzęt kuchenny i łazienkowy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Systemy domotyki i automatyki domu</span>
                </li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Udogodnienia</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Prywatne baseny i spa</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Terasytarasami panoramicznych widoków</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Garaż dla wielu samochodów</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Media pokoje i siłownie domowe</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-900 rounded-sm p-8 text-center">
            <h3 className="text-2xl font-light text-white mb-4">
              Cenowe Zakresy <span className="font-semibold">Luksusowych Willi</span>
            </h3>

            <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
              <div className="bg-white/10 rounded-sm p-6">
                <div className="text-2xl font-bold text-accent-400 mb-2">750k - 1.2M EUR</div>
                <h4 className="font-semibold text-white mb-2">Premium Wille</h4>
                <p className="text-warm-300 text-sm">Duże wille z basenami, garażami i nowoczesnym designem.</p>
              </div>

              <div className="bg-white/10 rounded-sm p-6">
                <div className="text-2xl font-bold text-accent-400 mb-2">1.2M - 2M EUR</div>
                <h4 className="font-semibold text-white mb-2">Luxury Wille</h4>
                <p className="text-warm-300 text-sm">Spektakularne wille z widokami, infrastrukturą i technologią.</p>
              </div>

              <div className="bg-white/10 rounded-sm p-6">
                <div className="text-2xl font-bold text-accent-400 mb-2">2M+ EUR</div>
                <h4 className="font-semibold text-white mb-2">Ultra-Luxury</h4>
                <p className="text-warm-300 text-sm">Ekskluzyjna oferta z unikalnymi cechami i lokalizacją.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Luksusowe Lokalizacje
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Jávea</h3>
              <p className="text-warm-600 mb-4">
                Najbardziej prestiżowe miejsce na Costa Blance. Wille z widokami na morze, zagwarantowany wzrost wartości.
              </p>
              <Link href="/pl/properties?town=javea" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Wille Jávea
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Moraira</h3>
              <p className="text-warm-600 mb-4">
                Ekskluzywna marina, eleganckie restauracje. Prywatne plaże i jachtingowe społeczności.
              </p>
              <Link href="/pl/properties?town=moraira" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Wille Moraira
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Altea</h3>
              <p className="text-warm-600 mb-4">
                Artystyczna społeczność, piękne krajobrazy. Nowoczesne wille z kulturalnym otoczeniem.
              </p>
              <Link href="/pl/properties?town=altea" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Wille Altea
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Cumbre del Sol</h3>
              <p className="text-warm-600 mb-4">
                Gated community na wzgórzach. Niska zabudowa, naturalne krajobrazy, ekskluzyjna społeczność.
              </p>
              <Link href="/pl/properties?region=north" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Wille Północy
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-900 rounded-sm p-8 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Gotów na Luksusowy <span className="font-semibold">Styl Życia?</span>
            </h2>
            <p className="text-warm-300 mb-8">Nasi specjaliści mogą pomóc Ci znaleźć wymarzony dom na Costa Blance.</p>
            <Link href="/pl/contact" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all">
              Zaplanuj Konsultację
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
