import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/pl/guides/javea`

export const metadata: Metadata = {
  title: 'Jávea - Przewodnik dla polskich kupujących na północnej Costa Blanca',
  description: 'Pełny przewodnik po Jávea: ceny nieruchomości, plaże, rynek luksusowy, przyroda i porady dla polskich inwestorów.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/javea`,
      sv: `${baseUrl}/se/guides/javea`,
      nl: `${baseUrl}/nl/guides/javea`,
      'nl-BE': `${baseUrl}/nl-be/guides/javea`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/javea`,
      de: `${baseUrl}/de/guides/javea`,
      pl: currentUrl,
      ru: `${baseUrl}/ru/guides/javea`,
      'x-default': `${baseUrl}/guides/javea`,
    },
  },
  openGraph: {
    title: 'Jávea - Przewodnik dla polskich kupujących domów',
    description: 'Pełny przewodnik do luksusowych nieruchomości i inwestycji w Jávea',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'pl_PL',
  },
}

const breadcrumbs = [
  { name: 'Strona główna', url: `${baseUrl}/pl` },
  { name: 'Przewodniki', url: `${baseUrl}/pl/guides` },
  { name: 'Jávea', url: currentUrl },
]

const faqs = [
  {
    question: 'Dlaczego Jávea jest droższa niż Torrevieja?',
    answer: 'Jávea to ekskluzywny obszar z pięknymi plażami, rynkiem luksusowym i wyższej jakości życiem. Przyciąga bogatszych kupujących i międzynarodowych inwestorów. Popyt jest większy, co podnosi ceny.',
  },
  {
    question: 'Jakie są średnie ceny nieruchomości w Jávea?',
    answer: 'Jávea jest znacznie droższa. Średnie ceny to 5.000-7.000 euro/m² dla istniejących nieruchomości i 6.000-9.000 euro/m² dla nowych budynków. Nieruchomości luksusowe mogą być dwa razy droższe.',
  },
  {
    question: 'Czy Jávea to dobre miejsce inwestycji?',
    answer: 'Tak, jeśli szukasz stabilności i luksusu. Ceny nieruchomości rosną powoli, ale pewnie. Dochody z wynajmu są niższe (2-4%), ale nieruchomości to stabilne wartości dla emerytów i bogatych inwestorów.',
  },
  {
    question: 'Czy jest polska społeczność w Jávea?',
    answer: 'Tak, są Polacy w Jávea, ale mniej niż w Torrevieja. To bardziej międzynarodowe miejsce ze skandynawską, brytyjską i holenderską obecnością. Wielu szuka ciszy zamiast społeczności.',
  },
  {
    question: 'Co jest specjalnego w Jávea?',
    answer: 'Jávea leży na pięknym półwyspie z trzema fantastycznymi plażami: Playa del Arenal, Cala de Finestrat i Arenal Bol Nou. Przyroda jest nienaruszona ze wzgórzami i rezerwatami przyrody. To spokojne i ekskluzywne w porównaniu z Torrevieja.',
  },
  {
    question: 'Czy mogę uzyskać dobry dochód z wynajmu nieruchomości w Jávea?',
    answer: 'Możliwy, ale niższy niż w Torrevieja. Dochody z wynajmu to zwykle 2-4% rocznie, ponieważ jest mniej turystyki i więcej wynajmu długoterminowego. Najlepsze dla osobistego użytku lub inwestycji długoterminowych.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function JavaPagePL() {
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
            Jávea - Ekskluzywy przewodnik dla polskich inwestorów
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Jávea to dom dla zamożnych Europejczyków północnych i tych, którzy szukają luksusu na Costa Blanca. Ten przewodnik odkrywa, dlaczego Jávea jest tak atrakcyjne, ceny nieruchomości i jak inwestować tutaj jako polski kupujący.
          </p>
        </div>

        {/* Section: Przegląd */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Przegląd Jávea</h2>
          <p className="text-gray-700 mb-6">
            Jávea (Xàbia) to ekskluzywne miasteczko przybrzeżne na północnej Costa Blanca z około 28.000 mieszkańcami. To popularny cel dla północnoeuropejczyków szukających luksusowych nieruchomości, pięknych plaż i spokojniejszego życia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Szybkie Fakty</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Mieszkańcy: około 28.000</li>
                <li>Typ: Ekskluzywne miasteczko przybrzeżne</li>
                <li>Klimat: Śródziemnomorski, łagodny</li>
                <li>Dni słoneczne/rok: około 290</li>
                <li>Odległość do Alicante: 105 km</li>
                <li>Plaża: 3 piękne plaże</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Rynek luksusowy</li>
                <li>Piękna przyroda i wzgórza</li>
                <li>Skandynawskie otoczenie</li>
                <li>Spokojne i ekskluzywne</li>
                <li>Dobre inwestycje</li>
                <li>Piękne plaże</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Klima */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klimat i Otoczenie</h2>
          <p className="text-gray-700 mb-6">
            Jávea leży na pięknym półwyspie z dobrym klimatem i chronionym przez wzgórza. Jest nieco chłodniej niż Torrevieja, ale nadal łagodnie przez cały rok.
          </p>

          <div className="space-y-4">
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

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Piękna przyroda:</strong> Jávea jest otoczona naturalnym pięknem ze wzgórzami, sosnowymi lasami i czystą błękitną wodą. Idealne dla kochających przyrodę.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Ceny */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Ceny Nieruchomości i Rynek Luksusowy</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Średnie Ceny (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Istniejące nieruchomości:</p>
                  <p className="text-gray-700">5.000-7.000 euro/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Nowe budynki/Luksus:</p>
                  <p className="text-gray-700">6.000-9.000 euro/m²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Przykład Willi (300 m²):</p>
                  <p className="text-gray-700">1.800.000-2.700.000 euro (lokalizacja luksusowa)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Rynek Luksusowy</h3>
              <p className="text-gray-700 mb-3">
                Jávea ma rozkwitający rynek luksusowy. Nieruchomości powyżej 1 miliona euro są powszechne, szczególnie w obszarach premium takich jak Port, Mediterraneo i Pinaret.
              </p>
              <p className="text-gray-700 text-sm">
                Skandynawowie i północnoeuropejczycy dominują grupę kupujących, co czyni to międzynarodowym i stabilnym rynkiem.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Popularne Obszary</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Port:</strong> Obszar portowy, promenada, najdroższy</li>
                <li><strong>Arenal:</strong> Główna plaża, przyjazne rodzinom</li>
                <li><strong>Pinaret i Granadella:</strong> Luksusowe osiedla, dominowane przez wille</li>
                <li><strong>Espanyolet:</strong> Obszar klasy średniej, bardziej przystępny</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Plaże i Przyroda */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Plaże i Piękno Przyrody</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Główne Plaże</h3>
              <p className="text-gray-700 mb-3">
                Jávea ma trzy główne plaże, które są wszystkie piękne i dobrze utrzymane:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Playa del Arenal:</strong> Najpiększa i największa plaża, rodzinna</li>
                <li><strong>Cala de Finestrat:</strong> Mała i intymna, wielkie piękno przyrody</li>
                <li><strong>Arenal Bol Nou:</strong> Spokojne i bardziej spokojne, na północ od miasta</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Piękno Przyrody i Aktywności</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Piesze wędrówki po wzgórzach z widokami na Morze Śródziemne</li>
                <li>Snorkeling i nurkowanie wzdłuż plaż</li>
                <li>Żeglarstwo i aktywności wodne</li>
                <li>Rezerwat przyrody z rzadkimi roślinami</li>
                <li>Spacery wzdłuż plż</li>
                <li>Imprezy kulturalne przez cały rok</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Otoczenie Skandynawskie */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Otoczenie Skandynawskie</h2>
          <p className="text-gray-700 mb-6">
            Jávea jest popularna wśród Skandynawów, co czyni ją bardzo międzynarodowym otoczeniem. Wielu Polaków, Szwedów, Duńczyków i Holendrów żyje tutaj.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Społeczność i Sieć</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Skandynawskie restauracje i kawiarnie</li>
                <li>Międzynarodowe kluby i organizacje</li>
                <li>Angielsko- i skandynawskojęzyczne usługi</li>
                <li>Międzynarodowe szkoły</li>
                <li>Różnorodność kulturalna i społeczność</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Jakość Życia</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea oferuje ekskluzywy i spokojny styl życia. To mniej nastawione na turystów niż Torrevieja, ale z wyższym standardem i usługą. Idealne dla emerytów i bogatych rodzin.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Inwestycje */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Inwestycje i Dochód z Wynajmu</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Potencjał Wynajmu</h3>
              <p className="text-gray-700 mb-3">
                Dochody z wynajmu w Jávea są niższe niż w Torrevieja, ponieważ jest mniej zorientowane na turyzm. Zwykle 2-4% rocznie:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Apartamenty główne: 2-3% zwrot z wynajmu</li>
                <li>Luksusowe wille: 2-4% zwrot z wynajmu</li>
                <li>Najlepsze dla osobistego użytku lub wzrostu wartości długoterminowej</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Rozwój Ceny</h3>
              <p className="text-gray-700">
                Ceny nieruchomości w Jávea miały stabilny wzrost na przestrzeni lat. To bezpieczna inwestycja dla długoterminowego wzrostu kapitału, zwłaszcza w segmencie luksusowym, który nadal jest poszukiwany przez bogatych Europejczyków północnych.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Porady */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Porady dla Kupujących</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Zaplanuj Luksus</h3>
              <p className="text-gray-700 text-sm">
                Jávea to Premium. Przygotuj większy budżet. Nieruchomości luksusowe wymagają utrzymania i wyższego podatku od nieruchomości (IBI).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Wybierz Lokalizację Ostrożnie</h3>
              <p className="text-gray-700 text-sm">
                Obszar określa wartość. Inwestycje w Port lub pobliżu plaży mają wyższą wartość niż obszary śródlądu.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Użyj Lokalnych Ekspertów</h3>
              <p className="text-gray-700 text-sm">
                Pracuj z doświadczonymi agentami nieruchomości znającymi rynek Jávea. Mogą pomóc w znalezieniu najlepszych ofert.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Planuj Podatki</h3>
              <p className="text-gray-700 text-sm">
                Jávea ma wyższy podatek od nieruchomości. Zaplanuj zobowiązanie podatkowe do Polski i Hiszpanii z doradcą podatkowym.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Odwiedź Wiele Razy</h3>
              <p className="text-gray-700 text-sm">
                Przed zainwestowaniem znacznych pieniędzy odwiedź Jávea kilka razy, aby upewnić się, że to dla ciebie.
              </p>
            </div>
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
          <h2 className="text-2xl font-light mb-4">Zainteresowany Luksusowymi Nieruchomościami w Jávea?</h2>
          <p className="mb-6 text-gray-100">
            Specjalizujemy się w ekskluzynych nowych budynkach i luksusowych nieruchomościach w Jávea. Skontaktuj się, aby znaleźć dom swoich marzeń.
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
