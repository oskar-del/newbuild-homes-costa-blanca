import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'O Nas | Nowe Domy Costa Blanca',
  description: 'Dowiedz się więcej o naszej firmie. 15+ lat doświadczenia w sprzedaży nowych domów na Costa Blance dla kupujących z Polski.',
  openGraph: {
    title: 'O Nas | Nowe Domy Costa Blanca',
    description: 'Poznaj nasz zespół i naszą misję.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/about',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/about',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/about',
      'sv': 'https://newbuildhomescostablanca.com/sv/about',
      'nl': 'https://newbuildhomescostablanca.com/nl/about',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/about',
      'fr': 'https://newbuildhomescostablanca.com/fr/about',
      'no': 'https://newbuildhomescostablanca.com/no/about',
      'de': 'https://newbuildhomescostablanca.com/de/about',
      'pl': 'https://newbuildhomescostablanca.com/pl/about',
      'ru': 'https://newbuildhomescostablanca.com/ru/about',
      'x-default': 'https://newbuildhomescostablanca.com/about',
    },
  },
};

export default function PolishAboutPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-light text-white mb-6">
            O Nas
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Spełniamy marzenia o domu na Costa Blance od ponad 15 lat.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-light text-primary-900 mb-6">
                Nasza <span className="font-semibold">Historia</span>
              </h2>
              <p className="text-warm-600 mb-4">
                Nasza firma została założona przez zespół specjalistów ds. nieruchomości z doświadczeniem na rynku Costa Blanki. Od samego początku naszą misją jest pomóc kupującym z Polski, Niemiec, Holandii i całej Europy znaleźć swój wymarzony dom.
              </p>
              <p className="text-warm-600 mb-4">
                W ciągu lat, obsługiliśmy ponad 500 rodzin, wspierając je w każdym kroku procesu kupna - od wstępnych konsultacji, aż do otrzymania kluczy.
              </p>
              <p className="text-warm-600">
                Dziś jesteśmy jedną z wiodących firm nieruchomościowych specialista Costa Blance dla kupujących z północy Europy.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-accent-600 mb-1">15+</div>
                  <p className="text-warm-600">Lat Doświadczenia</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent-600 mb-1">500+</div>
                  <p className="text-warm-600">Zadowolonych Klientów</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent-600 mb-1">500+</div>
                  <p className="text-warm-600">Nowych Domów Sprzedanych</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent-600 mb-1">4.9</div>
                  <p className="text-warm-600">Ocena Google (127 opinii)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Nasze <span className="font-semibold">Wartości</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Przejrzystość</h3>
              <p className="text-warm-600">
                Brak ukrytych opłat. Wszystkie ceny i koszty są jasne od samego początku. Kompletna informacja o procesie.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Doświadczenie</h3>
              <p className="text-warm-600">
                Nasz zespół zna każdy zakątek Costa Blanki. Biegłość w polskim, angielskim, holenderskim i hiszpańskim.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Wsparcie</h3>
              <p className="text-warm-600">
                Wspieramy naszych klientów przed, podczas i po zakupie. Jesteśmy zawsze dostępni przez telefon lub WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Co Mówią o Nas <span className="font-semibold">Nasi Klienci</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-sm p-6 border border-warm-200 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-accent-600">★★★★★</span>
              </div>
              <p className="text-warm-600 text-sm mb-4">
                Zachwyceni! Cały proces kupna był płynny i bezproblemowy. Zespół mówiący po polsku, pomocny i profesjonalny.
              </p>
              <p className="font-semibold text-primary-900 text-sm">Pani Beata, Warszawa</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-accent-600">★★★★★</span>
              </div>
              <p className="text-warm-600 text-sm mb-4">
                Polecam każdemu, kto szuka domu na Costa Blance. Od pierwszego wariantu do kluczy - wszystko było perfekcyjne.
              </p>
              <p className="font-semibold text-primary-900 text-sm">Pan Henryk, Kraków</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-accent-600">★★★★★</span>
              </div>
              <p className="text-warm-600 text-sm mb-4">
                Fantastyczne wsparcie i pomoc. Wszystko wyjaśnione krok po kroku. Dziękujemy za kompleksową obsługę!
              </p>
              <p className="font-semibold text-primary-900 text-sm">Pani Zofia, Gdańsk</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Nasz <span className="font-semibold">Zespół</span>
            </h2>
            <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
              Profesjonalni doradcy z głębokim zrozumieniem rynku Costa Blanki i potrzeb polskich kupujących.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Doradcy ds. Nieruchomości</h3>
              <p className="text-warm-600 text-sm mb-4">
                Nasi doradcy przeszli gruntowne szkolenie dotyczące rynku Costa Blanki. Znają każdą nieruchomość i każdy region.
              </p>
              <p className="text-warm-600 text-sm">
                Dostępni przez telefon, email, WhatsApp i wiele innych kanałów komunikacji.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Specjaliści Prawni</h3>
              <p className="text-warm-600 text-sm mb-4">
                Współpracujemy z najlepszymi adwokatami na Costa Blance mówiącymi po polsku.
              </p>
              <p className="text-warm-600 text-sm">
                Gwarantujemy bezpieczny proces zakupu z pełnym wsparciem prawnym.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Gotów Znaleźć Swój <span className="font-semibold">Wymarzony Dom?</span>
          </h2>
          <p className="text-warm-300 mb-8">Skontaktuj się z nami, aby zaplanować bezpłatną konsultację.</p>
          <Link href="/pl/contact" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all">
            Skontaktuj Się z Nami
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
