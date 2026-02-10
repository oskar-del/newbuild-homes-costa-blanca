import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Obszary Costa Blanca | Przewodnik po Regionach',
  description: 'Odkryj różne obszary Costa Blanki. Od słonecznego południa do luksusowej północy - znajdź idealny region dla siebie.',
  openGraph: {
    title: 'Obszary Costa Blanca | Przewodnik po Regionach',
    description: 'Przeglądaj obszary Costa Blanki i dowiedz się o każdym regionie.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/areas',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/areas',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/areas',
      'sv': 'https://newbuildhomescostablanca.com/sv/areas',
      'nl': 'https://newbuildhomescostablanca.com/nl/areas',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/areas',
      'fr': 'https://newbuildhomescostablanca.com/fr/areas',
      'no': 'https://newbuildhomescostablanca.com/no/areas',
      'de': 'https://newbuildhomescostablanca.com/de/areas',
      'pl': 'https://newbuildhomescostablanca.com/pl/areas',
      'ru': 'https://newbuildhomescostablanca.com/ru/areas',
      'x-default': 'https://newbuildhomescostablanca.com/areas',
    },
  },
};

export default function PolishAreasPage() {
  const regions = [
    {
      name: 'Torrevieja',
      price: '150k - 400k EUR',
      description: 'Słoneczne, przystępne ceny, wielokulturowa społeczność, plaże słoneczne przez cały rok.',
      highlights: ['Słone jeziora', 'Port jachtowy', 'Dostępne ceny', 'Polska społeczność'],
      link: '/pl/properties?town=Torrevieja'
    },
    {
      name: 'Jávea',
      price: '500k - 2M+ EUR',
      description: 'Luksusowa, dramatyczne krajobrazy gór, autentyczna hiszpańska atmosfera, piękne plaże.',
      highlights: ['Montgo Park', 'Starówka', 'Prywatne plaże', 'Prestiżowe społeczności'],
      link: '/pl/properties?town=Javea'
    },
    {
      name: 'Moraira',
      price: '600k - 1.5M EUR',
      description: 'Ekskluzywna, elegancka, marina, jachtingowy klub, Michelin restauracje, małe wioski.',
      highlights: ['Marina', 'Jachtingowy klub', 'Fine dining', 'Niska zabudowa'],
      link: '/pl/properties?town=Moraira'
    },
    {
      name: 'Orihuela Costa',
      price: '180k - 500k EUR',
      description: 'Golf, pola golfowe, plaże nagrodzeni, społeczności z dobrą infrastrukturą.',
      highlights: ['5 pól golfowych', 'Plaże nagrodzeni', 'Obiekty sportowe', 'Społeczności'],
      link: '/pl/properties?region=golf'
    },
    {
      name: 'Benidorm',
      price: '200k - 600k EUR',
      description: 'Nowoczesna, ożywiona, plaże, aquaparki, życie nocne, doskonały transport publiczny.',
      highlights: ['Nowoczesne plaże', 'Aquaparki', 'Noc życia', 'Transport publiczny'],
      link: '/pl/properties?town=Benidorm'
    },
    {
      name: 'Rojales',
      price: '150k - 350k EUR',
      description: 'Śródlądowe, autentyczne, piękne krajobrazy, przystępne ceny, wiejska atmosfera.',
      highlights: ['Wiejska atmosfera', 'Autentyczne', 'Krajobrazy', 'Przystępne ceny'],
      link: '/pl/inland'
    }
  ];

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Odkryj Obszary <span className="font-semibold text-accent-400">Costa Blanki</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Od słonecznego południa do luksusowej północy. Każdy region ma inny charakter, ofertę i styl życia.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {regions.map((region, idx) => (
              <Link
                key={idx}
                href={region.link}
                className="group bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all hover:border-accent-300"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">
                    {region.name}
                  </h3>
                  <p className="text-accent-600 font-medium text-sm">{region.price}</p>
                </div>
                <p className="text-warm-600 mb-4">
                  {region.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {region.highlights.map((h, i) => (
                    <span key={i} className="bg-accent-50 text-accent-700 text-xs font-medium px-2.5 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="text-accent-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Przeglądaj Domy
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Północ vs <span className="font-semibold">Południe</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-6">Costa Blanca Południe</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Słone jeziora i natura</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Zagrożone zagranicznej społeczności</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Przystępne ceny</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Dobra infrastruktura</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Pola golfowe</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-6">Costa Blanca Północ</h3>
              <ul className="space-y-3 text-warm-600">
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Dramatyczne górskie krajobrazy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Autentyczna hiszpańska kultura</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Luksusowe wille</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Prestiżowe społeczności</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-600 font-bold">✓</span>
                  <span>Wyższe ceny</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Jak Wybrać Idealny <span className="font-semibold">Obszar?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Budżet</h3>
              <p className="text-warm-600 text-sm">
                Południe oferuje lepsze ceny (150k-400k EUR), Północ jest droższe (500k+). Śródlądzie ma najlepsze wartości.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Klimat Społeczny</h3>
              <p className="text-warm-600 text-sm">
                Szukasz zagranicznej społeczności? Południe. Autentycznej Hiszpanii? Północ. Spokojności? Śródlądzie.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Styl Życia</h3>
              <p className="text-warm-600 text-sm">
                Golf? Orihuela Costa. Plaże? Benidorm. Aktywny wyjazd? Północ. Spokojny? Śródlądzie.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Potrzebujesz Porady na Temat <span className="font-semibold">Wybrania Obszaru?</span>
          </h2>
          <p className="text-warm-300 mb-8">Nasi eksperci mogą pomóc Ci wybrać idealne miejsce na podstawie Twoich potrzeb i budżetu.</p>
          <Link href="/pl/contact" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all">
            Skontaktuj Się z Ekspertem
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
