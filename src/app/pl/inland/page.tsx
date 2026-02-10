import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Domy Śródlądowe Costa Blanca | Wille Wewnątrz Lądu',
  description: 'Nowe domy na terenie śródlądowym Costa Blanki. Przystępne ceny, autentyczna Hiszpania, piękne krajobrazy. Od 150k EUR.',
  openGraph: {
    title: 'Domy Śródlądowe Costa Blanca | Wille Wewnątrz Lądu',
    description: 'Nowe domy śródlądowe na Costa Blance od 150k EUR.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/inland',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/inland',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/inland',
      'sv': 'https://newbuildhomescostablanca.com/sv/inland',
      'nl': 'https://newbuildhomescostablanca.com/nl/inland',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/inland',
      'fr': 'https://newbuildhomescostablanca.com/fr/inland',
      'no': 'https://newbuildhomescostablanca.com/no/inland',
      'de': 'https://newbuildhomescostablanca.com/de/inland',
      'pl': 'https://newbuildhomescostablanca.com/pl/inland',
      'ru': 'https://newbuildhomescostablanca.com/ru/inland',
      'x-default': 'https://newbuildhomescostablanca.com/inland',
    },
  },
};

export default function PolishInlandPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Śródlądowe Domy <span className="font-semibold text-accent-400">Costa Blanki</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Autentyczne wioski wewnątrz lądu z pięknymi krajobrazami i przystępnymi cenami. Odkryj prawdziwą Hiszpanię.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Dlaczego Wybrać <span className="font-semibold">Śródlądzie?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Przystępne Ceny</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Od 150k EUR za piękny dom</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Niższe koszty utrzymania</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Lepszy stosunek wartości do ceny</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Potencjał wzrostu wartości</span>
                </li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Autentyczna Atmosfera</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Tradycyjna hiszpańska wioska</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Spokojne, wiejskie otoczenie</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Lokalne restauracje i bary</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Bliscy ludzie, sąsiedzka wspólnota</span>
                </li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Krajobrazy</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Piękne górskie widoki</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Zielone doliny i ogrody</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Spacery i piesze wycieczki</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Bliski kontakt z naturą</span>
                </li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Infrastruktura</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Blisko do supermarketów</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Dostęp do usług medycznych</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Transport publiczny dostępny</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Internet i media nowoczesne</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-900 rounded-sm p-8 text-center">
            <h3 className="text-2xl font-light text-white mb-4">
              Popularne <span className="font-semibold">Śródlądowe Wioski</span>
            </h3>

            <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Rojales</h4>
                <p className="text-warm-300 text-sm">Piękna wioska z widokami na rzekę Segurę. Doskonała restauracje i życie społeczne.</p>
              </div>

              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Ciudad Quesada</h4>
                <p className="text-warm-300 text-sm">Planowana społeczność z infrastrukturą. Międzynarodowe społeczności i udogodnienia.</p>
              </div>

              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">San Fulgencio</h4>
                <p className="text-warm-300 text-sm">Autentyczna wioska rolnicza. Tradycyjne rynki i gościnny klimat.</p>
              </div>

              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Benijofar</h4>
                <p className="text-warm-300 text-sm">Małe wspaniałe wioski z przyjaznymi ludźmi. Bliska polska społeczność.</p>
              </div>

              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Algorfa</h4>
                <p className="text-warm-300 text-sm">Blisko pól golfowych. Mieszanka tradycji i nowoczesności.</p>
              </div>

              <div className="bg-white/10 rounded-sm p-6">
                <h4 className="font-semibold text-white mb-2">Jalon</h4>
                <p className="text-warm-300 text-sm">Góralska wioska z winem. Krajobrazy i kultura agroturystyka.</p>
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
              <div className="text-2xl font-bold text-accent-600 mb-4">150k - 250k EUR</div>
              <p className="text-warm-600 text-sm">Tradycyjne domy i apartamenty w małych wiostkach.</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Średnie</h3>
              <div className="text-2xl font-bold text-accent-600 mb-4">250k - 450k EUR</div>
              <p className="text-warm-600 text-sm">Nowoczesne domy z działkami w wspólnotach.</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Premium</h3>
              <div className="text-2xl font-bold text-accent-600 mb-4">450k+ EUR</div>
              <p className="text-warm-600 text-sm">Luksusowe wille na terenach śródlądowych.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-900 rounded-sm p-8 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Gotów Odkryć <span className="font-semibold">Śródlądzie?</span>
            </h2>
            <p className="text-warm-300 mb-8">Przeglądaj dostępne domy na terenach śródlądowych Costa Blanki.</p>
            <Link href="/pl/inland" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all">
              Przeglądaj Domy Śródlądowe
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
