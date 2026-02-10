import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Domy Golfowe Costa Blanca | Wille Nad Polami Golfowymi',
  description: 'Luksusowe domy golfowe na Costa Blance. Wille nad polami golfowymi w Villamartín, Las Colinas i Las Ramblas.',
  openGraph: {
    title: 'Domy Golfowe Costa Blanca | Wille Nad Polami Golfowymi',
    description: 'Nowe domy golfowe na Costa Blance od 250k EUR.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/golf',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/golf',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/golf',
      'sv': 'https://newbuildhomescostablanca.com/sv/golf',
      'nl': 'https://newbuildhomescostablanca.com/nl/golf',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/golf',
      'fr': 'https://newbuildhomescostablanca.com/fr/golf',
      'no': 'https://newbuildhomescostablanca.com/no/golf',
      'de': 'https://newbuildhomescostablanca.com/de/golf',
      'pl': 'https://newbuildhomescostablanca.com/pl/golf',
      'ru': 'https://newbuildhomescostablanca.com/ru/golf',
      'x-default': 'https://newbuildhomescostablanca.com/golf',
    },
  },
};

export default function PolishGolfPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Luksusowe Domy <span className="font-semibold text-accent-400">Golfowe</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Nowe wille zbudowane nad lub przy polach golfowych. Idealne dla golfistów szukających luksusowego stylu życia.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Pola Golfowe na <span className="font-semibold">Costa Blance</span>
            </h2>
            <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
              Costa Blanca ma ponad 20 pól golfowych, głównie na południu. Idealna destynacja dla golfistów.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Villamartín Golf</h3>
              <p className="text-warm-600 mb-4">
                Jedno z najtarszych i najbardziej prestiżowych pól golfowych na Costa Blance. 18 dołków, klub z tradycjami.
              </p>
              <Link href="/pl/properties?town=villamartin" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Domy Villamartín
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Las Colinas Golf</h3>
              <p className="text-warm-600 mb-4">
                Nowoczesne pole golfowe z widokami na góry. Ostatnie lata obserwuje duży wzrost zainteresowania.
              </p>
              <Link href="/pl/properties?region=golf" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Domy Golfowe
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Campoamor Golf</h3>
              <p className="text-warm-600 mb-4">
                Tradycyjne pole golfowe z 18 dołkami. Położone nad morzem z widokami na morze.
              </p>
              <Link href="/pl/properties?region=golf" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Domy
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Las Ramblas Golf</h3>
              <p className="text-warm-600 mb-4">
                Nowe pole golfowe z kompleksową infrastrukturą. Nowoczesne obiekty i zaawansowane udogodnienia.
              </p>
              <Link href="/pl/properties?region=golf" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Domy Las Ramblas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-primary-900 rounded-sm p-8 text-center mb-12">
            <h3 className="text-2xl font-light text-white mb-4">
              Korzyści <span className="font-semibold">Domów Golfowych</span>
            </h3>
            <p className="text-warm-300 mb-6 max-w-2xl mx-auto">
              Mieszkanie nad polem golfowym oferuje wiele korzyści dla golfistów i ich rodzin.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Dostęp do Golfa</h4>
                <p className="text-warm-300 text-sm">Bezpośredni dostęp do pola golfowego. Możliwość codziennej gry.</p>
              </div>
              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Społeczność Golfowa</h4>
                <p className="text-warm-300 text-sm">Zapoznaj się z innymi golfistami. Turnieje i imprezy społeczne.</p>
              </div>
              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Potencjał Wynajmu</h4>
                <p className="text-warm-300 text-sm">Nieruchomości golfowe są popularne dla wynajmu. Dobry dochód.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Cenowe Zakresy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Budżetowe</h3>
              <div className="text-2xl font-bold text-accent-600 mb-4">250k - 400k EUR</div>
              <p className="text-warm-600 text-sm">Apartamenty i mniejsze wille w kompleksach golfowych.</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Średnie</h3>
              <div className="text-2xl font-bold text-accent-600 mb-4">400k - 750k EUR</div>
              <p className="text-warm-600 text-sm">Nowoczesne wille z basenami nad polami golfowymi.</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Luksus</h3>
              <div className="text-2xl font-bold text-accent-600 mb-4">750k+ EUR</div>
              <p className="text-warm-600 text-sm">Ekskluzywne wille z prywatnym dostępem do pola golfowego.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Gotów na <span className="font-semibold">Golfowy Styl Życia?</span>
          </h2>
          <p className="text-warm-300 mb-8">Zobacz nasze dostępne domy golfowe i zaloguj się do życia marzeń.</p>
          <Link href="/pl/properties?region=golf" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all">
            Przeglądaj Domy Golfowe
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
