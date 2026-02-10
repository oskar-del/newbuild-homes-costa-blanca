import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/pl/guides/costa-blanca-polnoc`

export const metadata: Metadata = {
  title: 'Costa Blanca Północ - Przewodnik dla polskich kupujących',
  description: 'Pełny przewodnik po Północnej Costa Blanca: Jávea, Altea, Benidorm. Ceny mieszkań, klimat, jakość życia i porady dla polskich inwestorów.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/costa-blanca-north`,
      sv: `${baseUrl}/se/guides/costa-blanca-north`,
      nl: `${baseUrl}/nl/guides/costa-blanca-noord`,
      'nl-BE': `${baseUrl}/nl-be/guides/costa-blanca-noord`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/costa-blanca-nord`,
      de: `${baseUrl}/de/guides/costa-blanca-nord`,
      pl: currentUrl,
      ru: `${baseUrl}/ru/guides/costa-blanca-sever`,
      'x-default': `${baseUrl}/guides/costa-blanca-north`,
    },
  },
  openGraph: {
    title: 'Costa Blanca Północ - Przewodnik dla polskich kupujących domów',
    description: 'Pełny przewodnik po Północnej Costa Blanca i jej pięknych miastach',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'pl_PL',
  },
}

const breadcrumbs = [
  { name: 'Strona główna', url: `${baseUrl}/pl` },
  { name: 'Przewodniki', url: `${baseUrl}/pl/guides` },
  { name: 'Costa Blanca Północ', url: currentUrl },
]

const faqs = [
  {
    question: 'Jaka jest różnica między Północą a Południem Costa Blanca?',
    answer: 'Północ jest bardziej ekskluzywna, droższa i mniej turystyczna niż Południe. Północ ma piękne obszary naturalne i lepszą infrastrukturę. Południe jest tańsze, bardziej turystyczne i ma większą polską społeczność.',
  },
  {
    question: 'Które miasta są w Północnej Costa Blanca?',
    answer: 'Główne miasta to Jávea, Moraira, Calpe, Altea, Benidorm, Denia i Teulada. Każde ma swój własny charakter i apel do różnych typów kupujących.',
  },
  {
    question: 'Jakie są ceny nieruchomości na Północy?',
    answer: 'Północ jest generalnie droższa niż Południe. Ceny wahają się od 4.000-7.000 euro/m² dla zwykłych domów i wyżej dla nieruchomości luksusowych. Jávea i Moraira są najdroższe.',
  },
  {
    question: 'Czy Północna Costa Blanca jest dobra dla inwestycji?',
    answer: 'Tak, Północ jest stabilna dla długoterminowych inwestycji. Ceny rosną powoli, ale pewnie. Dochody z wynajmu wynoszą 2-4% rocznie. Najlepsze dla emerytów lub bogatych inwestorów.',
  },
  {
    question: 'Czy jest polska społeczność na Północy?',
    answer: 'Tak, ale mniej niż na Południu. Polacy są we wszystkich miastach północy, szczególnie w Jávea i Benidorm. Otoczenie jest bardziej międzynarodowe ogólnie.',
  },
  {
    question: 'Jaki jest klimat na Północnej Costa Blanca?',
    answer: 'Łagodny przez cały rok z około 290 dni słonecznych. Nieco chłodniejsze zimy niż Południe (8-15°C w styczniu), ale piękniejsze lata. Wzgórza chronią przed zimnym wiatrem.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function CostaBlancaPolnocPagePL() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <div key={crumb.url} className="flex items-center">
                {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-primary-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-accent-500 hover:text-accent-600">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-primary-900 mb-4 leading-tight">
            Costa Blanca Północ - Pełny przewodnik dla polskich kupujących
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Północna Costa Blanca jest domem dla niektórych z najpiękniejszych i najbardziej ekskluzywnych miast przybrzeżnych Hiszpanii. Ten przewodnik odkrywa każde miasto, ceny nieruchomości i dlaczego północ przyciąga Polaków szukających luksusu i stabilności.
          </p>
        </div>

        {/* Section: Przegląd */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Przegląd Północnej Costa Blanca</h2>
          <p className="text-gray-700 mb-6">
            Północna Costa Blanca rozciąga się od Denii na północy do Altei na południu. Region słynie z pięknych krajobrazów wzgórz, krystalicznie czystej wody, mniej turyzmu niż Południe i bardziej zintegrowanej społeczności skandynawskiej i międzynarodowej.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Cechy</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Ekskluzywne i piękne</li>
                <li>Wyższe ceny nieruchomości</li>
                <li>Mniej turystyczne</li>
                <li>Piękna przyroda i wzgórza</li>
                <li>Otoczenie skandynawskie</li>
                <li>Stabilne i luksusowe</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Główne Miasta</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Jávea - Ekskluzywne i piękne</li>
                <li>Moraira - Luksusowe i intymne</li>
                <li>Calpe - Miasto rodzinne</li>
                <li>Altea - Artyści i kultura</li>
                <li>Benidorm - Duże i żywe</li>
                <li>Denia - Tradycyjna przystań</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Główne Miasta */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Główne Miasta na Północnej Costa Blanca</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Jávea - Ekskluzywne i Piękne</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea to najekskluzywniejsze miasto. Piękne plaże, nienaruszona przyroda, rynek luksusowy. Populacja około 28.000. Ceny nieruchomości 5.000-7.000 euro/m². Otoczenie skandynawskie.
              </p>
              <p className="text-gray-700 text-sm">Najlepsze dla: Zamożnych emerytów i rodzin szukających luksusu i ciszy.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Moraira - Luksusowe i Intymne</h3>
              <p className="text-gray-700 text-sm mb-3">
                Moraira to małe, luksusowe miasto z około 6.000 mieszkańcami. Jeszcze bardziej ekskluzywne niż Jávea. Ceny nieruchomości 6.000-8.000 euro/m². Spokojne i klasyczne.
              </p>
              <p className="text-gray-700 text-sm">Najlepsze dla: Osób szukających dodatkowej prywatności i spokoju.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Calpe - Rodziny i Spektakularna Geografia</h3>
              <p className="text-gray-700 text-sm mb-3">
                Calpe słynie z ikonicznego formowania skały (Peñón de Ifach). Populacja około 25.000. Ceny nieruchomości 4.000-6.000 euro/m². Przyjazne rodzinom.
              </p>
              <p className="text-gray-700 text-sm">Najlepsze dla: Rodzin i miłośników przyrody.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Altea - Artyści i Kultura</h3>
              <p className="text-gray-700 text-sm mb-3">
                Altea słynie z otoczenia artystów i kultury. Populacja około 6.000. Ceny nieruchomości 4.000-5.500 euro/m². Malownicze stare miasto. Międzynarodowe otoczenie.
              </p>
              <p className="text-gray-700 text-sm">Najlepsze dla: Artystów, emerytów i zainteresowanych kulturą.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Benidorm - Duże Miasto i Życie</h3>
              <p className="text-gray-700 text-sm mb-3">
                Benidorm jest większe i bardziej dynamiczne. Populacja około 72.000. Ceny nieruchomości 3.500-5.000 euro/m². Aktywne życie nocne i turyzm. Więcej Polaków tutaj.
              </p>
              <p className="text-gray-700 text-sm">Najlepsze dla: Rodzin szukających aktywności i polskiej społeczności.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Denia - Tradycyjna Przystań</h3>
              <p className="text-gray-700 text-sm mb-3">
                Denia to tradycyjna przystań na północy. Populacja około 42.000. Ceny nieruchomości 3.500-4.500 euro/m². Mniej turystyczne, bardziej lokalne. Dobra scena kulinarna.
              </p>
              <p className="text-gray-700 text-sm">Najlepsze dla: Szukających autentycznej Hiszpanii z infrastrukturą północną.</p>
            </div>
          </div>
        </section>

        {/* Section: Klima */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klimat i Pogoda</h2>
          <p className="text-gray-700 mb-6">
            Północna Costa Blanca ma łagodny klimat przez cały rok. Jest nieco chłodniej niż Południe, ale nadal przyjemnie. Około 290 dni słonecznych rocznie.
          </p>

          <div className="bg-gray-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Średnie Temperatury</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Styczeń</span>
                <span className="font-semibold">8-15°C</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Kwiecień</span>
                <span className="font-semibold">12-21°C</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Lipiec</span>
                <span className="font-semibold">21-29°C</span>
              </div>
              <div className="flex justify-between">
                <span>Październik</span>
                <span className="font-semibold">15-25°C</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Ceny i Inwestycje */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Ceny Nieruchomości i Inwestycje</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Przegląd Cen Według Miasta (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Jávea: 5.000-7.000 euro/m²</p>
                  <p>Najdrożej, ekskluzywne</p>
                </div>
                <div>
                  <p className="font-semibold">Moraira: 6.000-8.000 euro/m²</p>
                  <p>Ultra-ekskluzywne, małe</p>
                </div>
                <div>
                  <p className="font-semibold">Calpe: 4.000-6.000 euro/m²</p>
                  <p>Przyjazne rodzinom</p>
                </div>
                <div>
                  <p className="font-semibold">Altea: 4.000-5.500 euro/m²</p>
                  <p>Kultura i artyści</p>
                </div>
                <div>
                  <p className="font-semibold">Benidorm: 3.500-5.000 euro/m²</p>
                  <p>Bardziej przystępne, aktywne</p>
                </div>
                <div>
                  <p className="font-semibold">Denia: 3.500-4.500 euro/m²</p>
                  <p>Tradycyjne i przystępne</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Dochód z Wynajmu</h3>
              <p className="text-gray-700 text-sm mb-3">
                Ogólnie niższy dochód z wynajmu na Północy niż na Południu:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Jávea, Moraira: 2-3% rocznie</li>
                <li>Calpe, Altea: 2.5-3.5% rocznie</li>
                <li>Benidorm: 3-4% rocznie (więcej turyzmu)</li>
                <li>Denia: 2-3% rocznie</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Strategia Inwestycji</h3>
              <p className="text-gray-700 text-sm">
                Północna Costa Blanca jest najlepsza dla długoterminowych inwestycji lub osobistego użytku. Ceny rosną powoli, ale pewnie. Podatek od nieruchomości (IBI) jest wyższy niż na Południu. Zaplanuj na stabilność zamiast wysokiego zwrotu.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Infrastruktura */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastruktura i Usługi</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Transport i Loty</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Lotnisko Alicante: 100-120 km na południe</li>
                <li>Lotnisko Walencji: 140 km na północ</li>
                <li>Autostrada do obu lotnisk</li>
                <li>Autobusy i usługi między miastami</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Usługi</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Międzynarodowe szkoły we wszystkich miastach</li>
                <li>Publiczne i prywatne szpitale</li>
                <li>Angielsko- i polskojęzyczni lekarze</li>
                <li>Dobra infrastruktura centrum handlowego</li>
                <li>Restauracje dla wszystkich preferencji</li>
                <li>Kluby i organizacje</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Aktywności */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Aktywności i Czas Wolny</h2>

          <div className="border rounded-sm p-6 border-gray-200">
            <h3 className="font-semibold text-primary-900 mb-3">Plenerowe Zajęcia i Piękno Przyrody</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Plaża i aktywności wodne</li>
              <li>Piesze wędrówki i rezerwaty przyrody</li>
              <li>Żeglarstwo i fotografia wodna</li>
              <li>Nurkowanie i snorkeling</li>
              <li>Golf i aktywności sportowe</li>
              <li>Muzea sztuki i imprezy kulturalne</li>
            </ul>
          </div>
        </section>

        {/* Section: Północ vs Południe */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Północ vs Południe - Jaka jest Różnica?</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-3 text-left font-semibold text-primary-900">Aspekt</th>
                  <th className="border p-3 text-left font-semibold text-primary-900">Północ</th>
                  <th className="border p-3 text-left font-semibold text-primary-900">Południe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Cena Nieruchomości</td>
                  <td className="border p-3">Droga (4.000-8.000 euro/m²)</td>
                  <td className="border p-3">Tańsza (2.500-4.000 euro/m²)</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Dochód z Wynajmu</td>
                  <td className="border p-3">Niski (2-3%)</td>
                  <td className="border p-3">Wysoki (4-6%)</td>
                </tr>
                <tr>
                  <td className="border p-3">Orientacja Turystyczna</td>
                  <td className="border p-3">Mniej turystyczne</td>
                  <td className="border p-3">Bardzo turystyczne</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Polska Społeczność</td>
                  <td className="border p-3">Otoczenie skandynawskie</td>
                  <td className="border p-3">Duża polska społeczność</td>
                </tr>
                <tr>
                  <td className="border p-3">Klimat</td>
                  <td className="border p-3">Łagodny (lekko chłodny)</td>
                  <td className="border p-3">Ciepły przez cały rok</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Piękno Przyrody</td>
                  <td className="border p-3">Piękne wzgórza i plaże</td>
                  <td className="border p-3">Płaskie, wydmy</td>
                </tr>
                <tr>
                  <td className="border p-3">Najlepsze Dla</td>
                  <td className="border p-3">Luksus, spokój, inwestycja</td>
                  <td className="border p-3">Turyzm, dochód</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-primary-900 mb-8">Często Zadawane Pytania</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border rounded-sm p-6 border-gray-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white rounded-sm p-8 mt-12">
          <h2 className="text-2xl font-light mb-4">Zainteresowany Nieruchomościami na Północnej Costa Blanca?</h2>
          <p className="mb-6 text-gray-100">
            Mamy eksklusywne nowe budynki i nieruchomości w całych miastach północy. Skontaktuj się, aby znaleźć idealne miejsce zamieszkania.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition"
            >
              Skontaktuj się przez WhatsApp
            </Link>
            <Link
              href="/pl/contact"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition"
            >
              Formularz Kontaktowy
            </Link>
          </div>
        </section>

        {/* Back to guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/pl/guides"
            className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
          >
            Wróć do wszystkich przewodników
          </Link>
        </div>
      </main>
    </div>
  )
}
