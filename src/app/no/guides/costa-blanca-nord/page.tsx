import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/no/guides/costa-blanca-nord`

export const metadata: Metadata = {
  title: 'Costa Blanca Nord - Guide for norske kjøpere',
  description: 'Fullstendig guide til Nord Costa Blanca: Jávea, Altea, Benidorm. Boligpriser, klima, levekvalitet og tips for norske investorer.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/costa-blanca-north`,
      sv: `${baseUrl}/se/guides/costa-blanca-north`,
      nl: `${baseUrl}/nl/guides/costa-blanca-noord`,
      'nl-BE': `${baseUrl}/nl-be/guides/costa-blanca-noord`,
      fr: `${baseUrl}/fr/guides`,
      no: currentUrl,
      de: `${baseUrl}/de/guides/costa-blanca-nord`,
      pl: `${baseUrl}/pl/guides/costa-blanca-polnoc`,
      ru: `${baseUrl}/ru/guides/costa-blanca-sever`,
      'x-default': `${baseUrl}/guides/costa-blanca-north`,
    },
  },
  openGraph: {
    title: 'Costa Blanca Nord - Guide for norske boligkjøpere',
    description: 'Fullstendig guide til Nord Costa Blanca og dets vakre byer',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'nb_NO',
  },
}

const breadcrumbs = [
  { name: 'Hjem', url: `${baseUrl}/no` },
  { name: 'Guider', url: `${baseUrl}/no/guides` },
  { name: 'Costa Blanca Nord', url: currentUrl },
]

const faqs = [
  {
    question: 'Hva er forskjellen mellom Nord og Sør Costa Blanca?',
    answer: 'Nord er mer eksklusive, dyrer og mindre turistisk enn Sør. Nord har vakre naturområder og bedre infrastruktur. Sør er billigere, mer turistisk og har et større nordisk samfunn.',
  },
  {
    question: 'Hvilke byer er i Nord Costa Blanca?',
    answer: 'Hovedbyene er Jávea, Moraira, Calpe, Altea, Benidorm, Denia og Teulada. Hver har sitt eget karakter og appell til forskellige kjøpertyper.',
  },
  {
    question: 'Hva er boligprisene i Nord?',
    answer: 'Nord er generelt dyrere enn Sør. Prisene ligger fra 4.000-7.000 euro/m² for ordinære boliger og oppover for luksuseiendommer. Jávea og Moraira er dyreste.',
  },
  {
    question: 'Er Nord Costa Blanca godt for investeringer?',
    answer: 'Ja, Nord er stabil for langsiktige investeringer. Prisene stiger langsomt men sikkert. Leieinntektene er 2-4% årlig. Best for pensjonister eller velstående investorer.',
  },
  {
    question: 'Finnes det norsk samfunn i Nord?',
    answer: 'Ja, men mindre enn i Sør. Du finner nordmenn i alle nord byer, spesielt i Jávea og Benidorm. Det er mer internasjonalt miljø generelt.',
  },
  {
    question: 'Hva er klimaet i Nord Costa Blanca?',
    answer: 'Mildt året rundt med omkring 290 solskinnsdager. Litt kjøligere vintre enn Sør (8-15°C i januar) men finere somre. Fjellene beskytter fra kalde vinder.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function CostaBlancaNordPageNO() {
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
            Costa Blanca Nord - Komplett Guide for norske kjøpere
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nord Costa Blanca er hjemmet til noen av Spanias mest eksklusive og vakre kystbyer. Denne guiden utforsker hver by, boligprisene, og hvorfor nord attraherer nordmenn som søker luksus og stabilitet.
          </p>
        </div>

        {/* Section: Oversikt */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Oversikt over Costa Blanca Nord</h2>
          <p className="text-gray-700 mb-6">
            Nord Costa Blanca spenner fra Denia i nord til Altea i sør. Området er kjent for vakre fjelllandskap, krystalklart vann, mindre turismelokalisering enn Sør og et mer integrert skandinavisk og internasjonalt samfunn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Karakteristikk</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Eksklusive og vakre</li>
                <li>Høyere boligpriser</li>
                <li>Mindre turistelokalisering</li>
                <li>Naturskjønn og fjell</li>
                <li>Skandinavisk miljø</li>
                <li>Stabil og luksuriøs</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Hovedbyer</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Jávea - Ekslusiv og vakrest</li>
                <li>Moraira - Luksus og intim</li>
                <li>Calpe - Familiebyen</li>
                <li>Altea - Kunstner og kultur</li>
                <li>Benidorm - Stor og leivet</li>
                <li>Denia - Tradisjonell havneby</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Hovedbyene */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Hovedbyene i Nord Costa Blanca</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Jávea - Eksklusive og Vakrest</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea er den mest eksklusive byen. Vakre strander, intakte natur, luksusmarked. Befolkning omkring 28.000. Boligpriser 5.000-7.000 euro/m². Skandinavisk miljø.
              </p>
              <p className="text-gray-700 text-sm">Best for: Velstående pensjonister og familier som søker luksus og ro.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Moraira - Luksuriøs og Intim</h3>
              <p className="text-gray-700 text-sm mb-3">
                Moraira er en liten, luksuriøs by med omkring 6.000 innbyggere. Den er enda mer eksklusiv enn Jávea. Boligpriser 6.000-8.000 euro/m². Fredelig og klassisk.
              </p>
              <p className="text-gray-700 text-sm">Best for: Deler som søker ekstra privatliv og stilhet.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Calpe - Familiene og Spektakulær Geografi</h3>
              <p className="text-gray-700 text-sm mb-3">
                Calpe er berømt for sin ikoniske fjellformation (Peñón de Ifach). Befolkning omkring 25.000. Boligpriser 4.000-6.000 euro/m². Familievennlig.
              </p>
              <p className="text-gray-700 text-sm">Best for: Familier og natur entusiaster.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Altea - Kunstner og Kultur</h3>
              <p className="text-gray-700 text-sm mb-3">
                Altea er kjent for sitt kunstner- og kulturmiljø. Befolkning omkring 6.000. Boligpriser 4.000-5.500 euro/m². Pittoresk old town. Internasjonalt miljø.
              </p>
              <p className="text-gray-700 text-sm">Best for: Kunstnere, pensjonister og kulturinteresserte.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Benidorm - Stor By og Liv</h3>
              <p className="text-gray-700 text-sm mb-3">
                Benidorm er større og mer dynamisk. Befolkning omkring 72.000. Boligpriser 3.500-5.000 euro/m². Aktivt nattliv og turisme. Flere nordmenn her.
              </p>
              <p className="text-gray-700 text-sm">Best for: Familier som søker aktivitet og nordisk samfunn.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Denia - Tradisjonell Havneby</h3>
              <p className="text-gray-700 text-sm mb-3">
                Denia er en tradisjonell havneby i nord. Befolkning omkring 42.000. Boligpriser 3.500-4.500 euro/m². Mindre turist, mer lokalt. God mat scene.
              </p>
              <p className="text-gray-700 text-sm">Best for: De som søker autentisk Spania med nordisk infrastruktur.</p>
            </div>
          </div>
        </section>

        {/* Section: Klima */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klima og Vær</h2>
          <p className="text-gray-700 mb-6">
            Nord Costa Blanca har mildt klima året rundt. Det er litt kjøligere enn Sør men fortsatt behageligt. Omkring 290 solskinnsdager per år.
          </p>

          <div className="bg-gray-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Gjennomsnittlige Temperaturer</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Januar</span>
                <span className="font-semibold">8-15°C</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>April</span>
                <span className="font-semibold">12-21°C</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Juli</span>
                <span className="font-semibold">21-29°C</span>
              </div>
              <div className="flex justify-between">
                <span>Oktober</span>
                <span className="font-semibold">15-25°C</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Boligpriser */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Boligpriser og Investeringer</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Prisoversikt etter By (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Jávea: 5.000-7.000 euro/m²</p>
                  <p>Dyrest, eksklusive</p>
                </div>
                <div>
                  <p className="font-semibold">Moraira: 6.000-8.000 euro/m²</p>
                  <p>Ultra-eksklusive, liten</p>
                </div>
                <div>
                  <p className="font-semibold">Calpe: 4.000-6.000 euro/m²</p>
                  <p>Familievennlig</p>
                </div>
                <div>
                  <p className="font-semibold">Altea: 4.000-5.500 euro/m²</p>
                  <p>Kultur og kunstner</p>
                </div>
                <div>
                  <p className="font-semibold">Benidorm: 3.500-5.000 euro/m²</p>
                  <p>Mer rimelig, aktivt</p>
                </div>
                <div>
                  <p className="font-semibold">Denia: 3.500-4.500 euro/m²</p>
                  <p>Tradisjonell og rimelig</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Leieutbytte</h3>
              <p className="text-gray-700 text-sm mb-3">
                Generelt lavere leieutbytte i Nord enn Sør:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Jávea, Moraira: 2-3% årlig</li>
                <li>Calpe, Altea: 2.5-3.5% årlig</li>
                <li>Benidorm: 3-4% årlig (mer turisme)</li>
                <li>Denia: 2-3% årlig</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Investering Strategi</h3>
              <p className="text-gray-700 text-sm">
                Nord Costa Blanca er best for langsiktige investeringer eller personlig bruk. Prisene stiger langsomt men sikkert. Eiendomsskatt (IBI) er høyere enn Sør. Planlegg for stabilitet fremfor høyt utbytte.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Infrastruktur */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastruktur og Tjenester</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Transport og Flyging</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Alicante lufthavn: 100-120 km sør</li>
                <li>Valencias lufthavn: 140 km nord</li>
                <li>Motorvei til både lufthavner</li>
                <li>Busser og tjenester mellom byer</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Tjenester</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Internasjonale skoler i alle byer</li>
                <li>Offentlige og private sykehus</li>
                <li>Engelsk- og norsktalende leger</li>
                <li>Godt kjøpsenter infrastruktur</li>
                <li>Restauranter for alle preferanser</li>
                <li>Klubber og foreninger</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Aktiviteter */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Aktiviteter og Fritid</h2>

          <div className="border rounded-sm p-6 border-gray-200">
            <h3 className="font-semibold text-primary-900 mb-3">Friluftsliv og Naturskjønnhet</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Strandliv og vannaktiviteter</li>
              <li>Fjellvandringer og naturreservater</li>
              <li>Seilbåt og vannfotografering</li>
              <li>Dyking og snorkling</li>
              <li>Golf og sportsaktiviteter</li>
              <li>Kunstmuseer og kulturelle arrangementer</li>
            </ul>
          </div>
        </section>

        {/* Section: Nord vs Sør */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Nord vs Sør - Hva er Forskjellen?</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-3 text-left font-semibold text-primary-900">Aspekt</th>
                  <th className="border p-3 text-left font-semibold text-primary-900">Nord</th>
                  <th className="border p-3 text-left font-semibold text-primary-900">Sør</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Boligpris</td>
                  <td className="border p-3">Dyre (4.000-8.000 euro/m²)</td>
                  <td className="border p-3">Rimelige (2.500-4.000 euro/m²)</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Leieutbytte</td>
                  <td className="border p-3">Lav (2-3%)</td>
                  <td className="border p-3">Høy (4-6%)</td>
                </tr>
                <tr>
                  <td className="border p-3">Turismelokalisering</td>
                  <td className="border p-3">Mindre turist</td>
                  <td className="border p-3">Sehr touristisch</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Nordisk Samfunn</td>
                  <td className="border p-3">Skandinavisk miljø</td>
                  <td className="border p-3">Stort nordisk samfunn</td>
                </tr>
                <tr>
                  <td className="border p-3">Klima</td>
                  <td className="border p-3">Mildt (litt kjølt)</td>
                  <td className="border p-3">Varmere hele året</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Naturskjønnhet</td>
                  <td className="border p-3">Vakre fjell og strander</td>
                  <td className="border p-3">Flatt, dyner</td>
                </tr>
                <tr>
                  <td className="border p-3">Beste For</td>
                  <td className="border p-3">Luksus, ro, investering</td>
                  <td className="border p-3">Turisme, inntekter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-primary-900 mb-8">Ofte Stilte Spørsmål</h2>
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
          <h2 className="text-2xl font-light mb-4">Interessert i Eiendommer i Nord Costa Blanca?</h2>
          <p className="mb-6 text-gray-100">
            Vi har eksklusiv nybygg og eiendommer gjennom alle nord byer. Kontakt oss for å finne ditt ideelle hjem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition"
            >
              Kontakt via WhatsApp
            </Link>
            <Link
              href="/no/contact"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition"
            >
              Kontaktskjema
            </Link>
          </div>
        </section>

        {/* Back to guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/no/guides"
            className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
          >
            Tilbake til alle guider
          </Link>
        </div>
      </main>
    </div>
  )
}
