import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/pl/guides/torrevieja`

export const metadata: Metadata = {
  title: 'Torrevieja - Przewodnik dla polskich kupujących i osób się osiedlających',
  description: 'Pełny przewodnik po Torrevieja: ceny mieszkań, klimat, infrastruktura, społeczność polska i porady dla polskich kupujących.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/torrevieja`,
      sv: `${baseUrl}/se/guides/torrevieja`,
      nl: `${baseUrl}/nl/guides/torrevieja`,
      'nl-BE': `${baseUrl}/nl-be/guides/torrevieja`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/torrevieja`,
      de: `${baseUrl}/de/guides/torrevieja`,
      pl: currentUrl,
      ru: `${baseUrl}/ru/guides/torrevieja`,
      'x-default': `${baseUrl}/guides/torrevieja`,
    },
  },
  openGraph: {
    title: 'Torrevieja - Przewodnik dla polskich kupujących domów',
    description: 'Pełny przewodnik do życia i kupowania domów w Torrevieja',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'pl_PL',
  },
}

const breadcrumbs = [
  { name: 'Strona główna', url: `${baseUrl}/pl` },
  { name: 'Przewodniki', url: `${baseUrl}/pl/guides` },
  { name: 'Torrevieja', url: currentUrl },
]

const faqs = [
  {
    question: 'Dlaczego Torrevieja jest popularna wśród polskich kupujących?',
    answer: 'Torrevieja jest popularna ze względu na niskie ceny, dużą społeczność polską, dobrą infrastrukturę dla emerytów, piękne plaże i bliską odległość do lotniska Alicante. To idealne miejsce dla Polaków szukających siedziby za granicą.',
  },
  {
    question: 'Jakie są średnie ceny mieszkań w Torrevieja?',
    answer: 'Torrevieja jest tańsza niż północ. Średnie ceny to 3.000-4.000 euro/m² dla istniejących nieruchomości i 3.500-5.000 euro/m² dla nowych budynków. To jest około 30-40% tańsze niż Jávea lub Altea.',
  },
  {
    question: 'Jaki jest klimat w Torrevieja?',
    answer: 'Torrevieja ma ponad 300 dni słonecznych rocznie i suchy klimat śródziemnomorski z temperaturą zimy około 16°C i lata powyżej 30°C. To jedno z najsłoneczniejszych miejsc na Costa Blanca.',
  },
  {
    question: 'Czy jest polska społeczność w Torrevieja?',
    answer: 'Tak, bardzo aktywna! Torrevieja ma jedną z największych polskich społeczności na Costa Blanca z klubami, restauracjami, imprezami i organizacjami. Łatwo będziesz się integrować z innymi Polakami.',
  },
  {
    question: 'Jakie są dokumenty potrzebne do zakupu jako Polak?',
    answer: 'Będziesz potrzebować: numerem NIE (numer identyfikacyjny cudzoziemca), otwartego rachunku bankowego, zatrudnienia adwokata, i ubezpieczenia. PKO BP i mBank oferują konta dla Polaków kupujących w Hiszpanii.',
  },
  {
    question: 'Czy mogę uzyskać dobre dochody z wynajmu?',
    answer: 'Tak, Torrevieja zwykle oferuje dobre zyski z wynajmu na poziomie 4-6% rocznie dzięki turystom i emerytom. To popularny cel na wakacje, szczególnie latem.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function TorreviejaPagePL() {
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
            Torrevieja - Pełny przewodnik dla polskich osób się osiedlających
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Torrevieja to jeden z najpopularniejszych celów dla polskich osób się osiedlających na Costa Blanca. Ten przewodnik zawiera wszystkie informacje o tym czarującym mieście portowym: od cen mieszkań po infrastrukturę i społeczność.
          </p>
        </div>

        {/* Section: Przegląd */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Przegląd Torrevieja</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja to żywe miasto portowe w południowej Costa Blanca z około 80.000 mieszkańcami, z czego około 3.000-4.000 to Polacy. Miasto słynie z pięknych plaż, aktywnego życia nocnego i ustanowionej polskiej społeczności.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Szybkie Fakty</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Mieszkańcy: około 80.000</li>
                <li>Polskie mieszkańcy: około 3.000-4.000</li>
                <li>Klimat: Śródziemnomorski, suchy</li>
                <li>Dni słoneczne/rok: ponad 300</li>
                <li>Odległość do Alicante: 50-60 km</li>
                <li>Plaża: Długie plaże piaszczyste</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Destacadas</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Duża polska społeczność</li>
                <li>Niedrogie ceny nieruchomości</li>
                <li>Dobra infrastruktura</li>
                <li>Żywe życie nocne</li>
                <li>Aktywności wodne</li>
                <li>Dobre dochody z wynajmu</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Klimat */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klimat i Pogoda</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja ma jeden z najlepszych klimatów na Costa Blanca z ponad 300 dni słonecznych rocznie.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Średnie Temperatury</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Styczeń</span>
                  <span className="font-semibold">9-16°C</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Kwiecień</span>
                  <span className="font-semibold">13-22°C</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Lipiec</span>
                  <span className="font-semibold">22-31°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Październik</span>
                  <span className="font-semibold">16-26°C</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Idealne:</strong> Przez całą rok pogoda jest łagodna i przyjemna. Mróz jest praktycznie nieznany, a lata są ciepłe, ale nie przegrzane.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Ceny Nieruchomości */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Ceny Nieruchomości i Inwestycje</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Średnie Ceny (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Istniejące nieruchomości:</p>
                  <p className="text-gray-700">2.500-3.500 euro/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Nowe budynki:</p>
                  <p className="text-gray-700">3.500-5.000 euro/m²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Przykład Apartamentu (80 m²):</p>
                  <p className="text-gray-700">200.000-400.000 euro (nowe do premium lokalizacji)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Dochód z Wynajmu</h3>
              <p className="text-gray-700 mb-3">
                Torrevieja oferuje atrakcyjne dochody z wynajmu na poziomie 4-6% rocznie. To jest wyższe niż średnia na Costa Blanca, ponieważ Torrevieja jest popularnym celem wakacji.
              </p>
              <p className="text-gray-700 text-sm">
                Inwestycja o wartości 250.000 euro może generować roczny dochód z wynajmu na poziomie 10.000-15.000 euro (z prawidłowym zarządzaniem i rezerwacjami).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Popularne Dzielnice dla Kupujących</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Centrum (Paseo Maritimo):</strong> Blisko plaży i portu, żywe, wyższe ceny</li>
                <li><strong>La Mata:</strong> Spokojne miasteczko plażowe, 5 km na północ, przyjazne rodzinom</li>
                <li><strong>El Remo:</strong> Dzielnica mieszkalna, ceny średnie, dobra infrastruktura</li>
                <li><strong>Punta Prima:</strong> Na południu, dzielnica rezydencjonalna, nowoczesna, wyższe ceny</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Społeczność Polska */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Polska Społeczność w Torrevieja</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja ma bardzo aktywną i ustanowioną polską społeczność, co czyni ją doskonałym celem dla polskich osób się osiedlających.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Polska Infrastruktura</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Polscy lekarze i dentyści (polskojęzyczni)</li>
                <li>Polskie restauracje i kawiarnie</li>
                <li>Polskie kluby i organizacje</li>
                <li>Polska kaplica i społeczności religijne</li>
                <li>Polscy pośrednicy nieruchomości</li>
                <li>Polscy doradcy podatkowi i prawnicy</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Polskie Imprezy</h3>
              <p className="text-gray-700 text-sm mb-3">
                Przez cały rok odbywają się polskie imprezy:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Obchód Dnia Niepodległości (11 listopada)</li>
                <li>Polskie Bożonarodzeniowe targi</li>
                <li>Spotkania klubu i imprezy społeczne</li>
                <li>Imprezy kulturalne</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Infrastruktura */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastruktura i Usługi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Zdrowie i Lekarze</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Publiczny szpital</li>
                <li>Wielu prywatnych lekarzy i klinik</li>
                <li>Polskojęzyczni lekarze</li>
                <li>Apteki na każdym rogu</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Zakupy i Zaopatrywanie</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Duże centrum handlowe (Castel Marques)</li>
                <li>Supermarkety (Mercadona, Carrefour, itd.)</li>
                <li>Targi (targ w czwartek)</li>
                <li>Restauracje i bary wszędzie</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Edukacja</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Publiczne szkoły hiszpańskie</li>
                <li>Prywatne szkoły międzynarodowe</li>
                <li>Polskie lekcje dostępne</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Transport</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Połączenia autobusowe wszędzie</li>
                <li>Postoje taksówek w pobliżu</li>
                <li>Kolej do lotniska Alicante</li>
                <li>Dobre połączenia drogowe</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Aktywności */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Plaże, Aktywności i Czas Wolny</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Plaże</h3>
              <p className="text-gray-700 mb-3">
                Torrevieja słynie z pięknych, szerokich plaż piaszczystych. Główne plaże to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Playa del Centro:</strong> Główna plaża z promenadą, żywa</li>
                <li><strong>Playa La Mata:</strong> Spokojna plaża, 5 km na północ</li>
                <li><strong>Playa Flamenca:</strong> Na południu, spokojna, mniej turystyczna</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Aktywności</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Aktywności wodne (jet ski, żeglarstwo, surfing)</li>
                <li>Golf - kilka pól golfowych w pobliżu</li>
                <li>Rejsy i wycieczki</li>
                <li>Życie nocne i dyskoteki</li>
                <li>Piesze wędrówki w okolicy</li>
                <li>Rezerwat przyrody Laguna Rosa</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Życie Nocne</h3>
              <p className="text-gray-700">
                Torrevieja słynie z żywego życia nocnego z wieloma barami, klubami i dyskotekami. Jest coś dla każdego: od tradycyjnych barów do nowoczesnych klubów z DJ. Życie nocne jest szczególnie aktywne w letnich miesiącach.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Koszty Utrzymania */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Koszt Życia w Torrevieja</h2>

          <div className="bg-gray-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Miesięczne Koszty Przykład (dla pary)</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Czynsz (przeciętny apartament)</span>
                <span className="font-semibold">600-800 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Media (woda, elektryczność, gaz)</span>
                <span className="font-semibold">80-120 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Jedzenie i Jedzenie</span>
                <span className="font-semibold">300-400 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Samochód i Transport</span>
                <span className="font-semibold">150-200 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Ubezpieczenia i Zdrowie</span>
                <span className="font-semibold">100-150 euro</span>
              </div>
              <div className="flex justify-between">
                <span>Czas Wolny i Rozrywka</span>
                <span className="font-semibold">150-250 euro</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Całkowity Budżet (miesięcznie)</span>
                <span>1.400-1.900 euro</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-4">
              To jest tańsze niż w Polsce i pozwala na dobre życie z komfortem.
            </p>
          </div>
        </section>

        {/* Section: Porady */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Porady dla Przybyszy</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Zarejestruj się u władz</h3>
              <p className="text-gray-700 text-sm">
                Zarejestruj się w Ayuntamiento (gmina), uzyskaj numer NIE i zarejestruj się w urzędzie podatkowym.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Połącz się z polską społecznością</h3>
              <p className="text-gray-700 text-sm">
                Odwiedź polskie kluby i imprezy. Sieć pomoże ci się zaaklimatyzować.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Otwórz konto bankowe</h3>
              <p className="text-gray-700 text-sm">
                Otwórz hiszpańskie konto bankowe. PKO BP i mBank mają też oddziały w Hiszpanii. Jest to niezbędne dla wszystkich transakcji finansowych.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Naucz się podstawowego hiszpańskiego</h3>
              <p className="text-gray-700 text-sm">
                Choć wiele osób mówi po angielsku, hiszpański jest doceniany i pomaga w integracji.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Poznaj okolicę</h3>
              <p className="text-gray-700 text-sm">
                Odwiedź pobliskie wsie i atrakcje. La Mata, Guardamar i Elche to wszystkie interesujące miejsca.
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
          <h2 className="text-2xl font-light mb-4">Zainteresowany Nieruchomościami w Torrevieja?</h2>
          <p className="mb-6 text-gray-100">
            Mamy duży wybór wysokiej jakości nowych budynków w Torrevieja i La Mata. Skontaktuj się z nami po więcej informacji.
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
