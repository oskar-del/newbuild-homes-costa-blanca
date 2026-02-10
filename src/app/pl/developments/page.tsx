import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nowe Projekty Costa Blanca | Kompleksy Mieszkaniowe',
  description: 'Przeglądaj kompleksy mieszkaniowe i projekty nowych domów na Costa Blance. Luksusowe wille i apartamenty od zaufanych deweloperów.',
  openGraph: {
    title: 'Nowe Projekty Costa Blanca | Kompleksy Mieszkaniowe',
    description: 'Nowe kompleksy mieszkaniowe na Costa Blance od renomowanych deweloperów.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/developments',
    siteName: 'Nowe Domy Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nowe Projekty Costa Blanca',
    description: 'Nowe kompleksy mieszkaniowe na Costa Blance.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/developments',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/developments',
      'sv': 'https://newbuildhomescostablanca.com/sv/developments',
      'nl': 'https://newbuildhomescostablanca.com/nl/developments',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/developments',
      'fr': 'https://newbuildhomescostablanca.com/fr/developments',
      'no': 'https://newbuildhomescostablanca.com/no/developments',
      'de': 'https://newbuildhomescostablanca.com/de/developments',
      'pl': 'https://newbuildhomescostablanca.com/pl/developments',
      'ru': 'https://newbuildhomescostablanca.com/ru/developments',
      'x-default': 'https://newbuildhomescostablanca.com/developments',
    },
  },
};

export default function PolishDevelopmentsPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Nowe Projekty Costa <span className="font-semibold text-accent-400">Blanca</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Odkryj najlepsze nowe kompleksy mieszkaniowe na Costa Blance. Kompleksy budowane przez renomowanych deweloperów z luksusowymi udogodnieniami i gwarantowaną jakością.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                Compleksy Budownictwa
              </span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Odkryj <span className="font-semibold">Projekty Deweloperów</span>
            </h2>
            <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
              Każdy projekt nadzorowany jest przez doświadczonych deweloperów, którzy dbają o najwyższą jakość budowy i wykończenia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-900">Nowoczesny Design</h3>
              </div>
              <p className="text-warm-600">
                Każdy projekt ma nowoczesny design z otwartymi planami, dużymi tarasami i oknami. Architektury odpowiada standardom europejskim i klimatowi śródziemnomorskiemu.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-900">Luksusowe Udogodnienia</h3>
              </div>
              <p className="text-warm-600">
                Baseny, siłownie, parki i obszary wspólne. Niektóre kompleksy mają prywatne kluby, hale sportowe i bezpieczeństwo 24/7.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-900">Gwarancja Jakości</h3>
              </div>
              <p className="text-warm-600">
                Gwarancja 10 lat na strukturę, 3 lata na instalacje i materiały. Inspekcje jakości przed oddaniem do użytku.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 font-bold text-lg">4</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-900">Energooszczędne</h3>
              </div>
              <p className="text-warm-600">
                Wszystkie projekty mają certyfikat energetyczny. Systemy solarnych paneli, izolacja termiczna i nowoczesne systemy ogrzewania.
              </p>
            </div>
          </div>

          <div className="bg-primary-900 rounded-sm p-8 text-center">
            <h3 className="text-2xl font-light text-white mb-4">
              Szukasz Konkretnego Projektu?
            </h3>
            <p className="text-warm-300 mb-6">
              Przejdź do listy wszystkich nieruchomości, aby przeglądać domy w konkretnych projektach i kompleksach.
            </p>
            <Link
              href="/pl/properties"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
            >
              Przeglądaj Nieruchomości
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-10 text-center">
            Projekty Po Regionach
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Costa Blanca Południe</h3>
              <p className="text-warm-600 mb-4">
                Projekty w Torrevieja, Orihuela Costa i Los Montesinos. Przystępne ceny, getyfy wspólnoty i doskonałe udogodnienia.
              </p>
              <Link href="/pl/properties?region=south" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Projekty Południa
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Costa Blanca Północ</h3>
              <p className="text-warm-600 mb-4">
                Luksusowe projekty w Jávea, Moraira i Altea. Dramatyczne krajobrazy, prywatne plaże i ekskluzywe społeczności.
              </p>
              <Link href="/pl/properties?region=north" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Projekty Północy
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Kompleksy Golfowe</h3>
              <p className="text-warm-600 mb-4">
                Projekty z dostępem do pól golfowych w Villamartín, Las Colinas i Las Ramblas. Idealne dla miłośników golfa.
              </p>
              <Link href="/pl/golf" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Domy Golfowe
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Projekty Śródlądowe</h3>
              <p className="text-warm-600 mb-4">
                Autentyczne wioski z przystępnymi cenami. Rojales, Ciudad Quesada i San Fulgencio z charmem i wartością.
              </p>
              <Link href="/pl/inland" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Przeglądaj Tereny Śródlądowe
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Chcesz Dowiedzieć Się Więcej o <span className="font-semibold">Konkretnym Projekcie?</span>
          </h2>
          <p className="text-warm-300 mb-8">Skontaktuj się z nami, a my dostarczymy szczegółowe informacje o wszystkich dostępnych projektach.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pl/contact" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Skontaktuj Się
            </Link>
            <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
