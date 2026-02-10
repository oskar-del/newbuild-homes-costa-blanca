import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/no/guides/javea`

export const metadata: Metadata = {
  title: 'Jávea - Guide for norske kjøpere i nord Costa Blanca',
  description: 'Fullstendig guide til Jávea: boligpriser, strendene, luksusmarkedet, natur og tips for norske investorer.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/javea`,
      sv: `${baseUrl}/se/guides/javea`,
      nl: `${baseUrl}/nl/guides/javea`,
      'nl-BE': `${baseUrl}/nl-be/guides/javea`,
      fr: `${baseUrl}/fr/guides`,
      no: currentUrl,
      de: `${baseUrl}/de/guides/javea`,
      pl: `${baseUrl}/pl/guides/javea`,
      ru: `${baseUrl}/ru/guides/javea`,
      'x-default': `${baseUrl}/guides/javea`,
    },
  },
  openGraph: {
    title: 'Jávea - Guide for norske boligkjøpere',
    description: 'Fullstendig guide til luksusboliger og investeringer i Jávea',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'nb_NO',
  },
}

const breadcrumbs = [
  { name: 'Hjem', url: `${baseUrl}/no` },
  { name: 'Guider', url: `${baseUrl}/no/guides` },
  { name: 'Jávea', url: currentUrl },
]

const faqs = [
  {
    question: 'Hvorfor er Jávea dyrere enn Torrevieja?',
    answer: 'Jávea er eksklusive område med vakre strender, luksusmarked og høyere levekvalitet. Det tiltrekker seg rikere kjøpere og internasjonale investerorer. Etterspørselen er større, hvilket drives prisene opp.',
  },
  {
    question: 'Hva er gjennomsnittlige boligpriser i Jávea?',
    answer: 'Jávea er signifikant dyrere. Gjennomsnittlige priser ligger på 5.000-7.000 euro/m² for brukte eiendommer og 6.000-9.000 euro/m² for nybygg. Luksuseiendommer kan være dobbelt så dyre.',
  },
  {
    question: 'Er Jávea et godt investeringssted?',
    answer: 'Ja, hvis du søker stabilitet og luksus. Boligprisene stiger sakte men sikkert. Leieutbyttene er lavere (2-4%) men eiendommene er stabile verdier for pensjonister og velstående investorer.',
  },
  {
    question: 'Finnes det norsk samfunn i Jávea?',
    answer: 'Ja, det finnes nordmenn i Jávea, men færre enn i Torrevieja. Det er mer internasjonalt sammensatt med skandinavisk, britisk og hollandsk nærvær. Mange søker stillhet fremfor sosialt samfunn.',
  },
  {
    question: 'Hva er det spesielt med Jávea?',
    answer: 'Jávea ligger på en vakker halvøy med tre fantastiske strander: Playa del Arenal, Cala de Finestrat og Arenal Bol Nou. Naturen er intakt med fjell og naturreservater. Det er rolig og eksklusive sammenlignet med Torrevieja.',
  },
  {
    question: 'Kan jeg få god leieinntekt fra en Jávea eiendom?',
    answer: 'Mulig, men lavere enn Torrevieja. Leieutbyttene er vanligvis 2-4% årlig da det er mindre turisme og flere långsiktige utleiere. Det best for personlig bruk eller langsiktige investeringer.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function JavaPageNO() {
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
            Jávea - Ekslusiv guide for norske investorer
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Jávea er hjemmet til Nordeuropas velstående og de som søker luksus på Costa Blanca. Denne guiden utforsker hvorfor Jávea er så attraktivt, boligprisene, og hvordan du investerer her som norsk kjøper.
          </p>
        </div>

        {/* Section: Oversikt */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Oversikt over Jávea</h2>
          <p className="text-gray-700 mb-6">
            Jávea (Xàbia) er en ekslusiv kystby i nord Costa Blanca med omkring 28.000 innbyggere. Det er et populært destinasjon for nordeuropeere som søker luksusboliger, naturskjønne strander og et ruhtviskere liv.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Rask Fakta</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Innbyggere: omkring 28.000</li>
                <li>Type: Ekslusiv kystby</li>
                <li>Klima: Middelhav, mildt</li>
                <li>Solskinnsdager/år: omkring 290</li>
                <li>Avstand til Alicante: 105 km</li>
                <li>Strand: 3 vakre strander</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Høydepunkter</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Luksusmarked</li>
                <li>Vakker natur og fjell</li>
                <li>Skandinavisk miljø</li>
                <li>Roligt og eksklusive</li>
                <li>Gode investisjoner</li>
                <li>Vakre strander</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Klima */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klima og Miljø</h2>
          <p className="text-gray-700 mb-6">
            Jávea ligger på en vakker halvøy med godt klima og beskyttet av fjell. Det er litt kjøligere enn Torrevieja men fortsatt mildt året rundt.
          </p>

          <div className="space-y-4">
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

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Naturskjønn:</strong> Jávea er omgitt av naturell skjønnhet med fjell, pinieskogen og klart blått vann. Ideelt for naturelsker.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Boligpriser */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Boligpriser og Luksusmarked</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Gjennomsnittlige Priser (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Brukteiendommer:</p>
                  <p className="text-gray-700">5.000-7.000 euro/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Nybygg/Luksus:</p>
                  <p className="text-gray-700">6.000-9.000 euro/m²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Eksempel Villa (300 m²):</p>
                  <p className="text-gray-700">1.800.000-2.700.000 euro (luksus lokalisering)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Luksusmarkedet</h3>
              <p className="text-gray-700 mb-3">
                Jávea har en blomstrende luksusmarked. Eiendommer over 1 million euro er vanlige, spesielt i premium områder som Port, Mediterraneo og Pinaret.
              </p>
              <p className="text-gray-700 text-sm">
                Skandinaverne og nordeuropeerne dominerer kjøpegruppen, som gjør det til et internasjonalt og stabil marked.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Populære Områder</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Port:</strong> Havneområdet, promenaden, dyrest</li>
                <li><strong>Arenal:</strong> Hjemmet til hovedstranden, familievennlig</li>
                <li><strong>Pinaret og Granadella:</strong> Luksus boligfelt, villa dominert</li>
                <li><strong>Espanyolet:</strong> Middelklasse område, mer rimelig</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Strander og Natur */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Strander og Naturskjønnhet</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Hovedstrandene</h3>
              <p className="text-gray-700 mb-3">
                Jávea har tre hovedstrander som alle er vakre og velopprettholdt:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Playa del Arenal:</strong> Vakrest og største stranden, familiepreg</li>
                <li><strong>Cala de Finestrat:</strong> Liten og intim, stor naturskjønnhet</li>
                <li><strong>Arenal Bol Nou:</strong> Fredelig og ruhtviskere, nord for byen</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Naturskjønnhet og Aktiviteter</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fjellvandringer med utsikt over middelhavet</li>
                <li>Snorkling og dyking langs stranden</li>
                <li>Seilbåt og vannaktiviteter</li>
                <li>Naturreservat med sjeldne planter</li>
                <li>Promenader langs stranden</li>
                <li>Kulturelle arrangementer hele året</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Skandinavisk Miljø */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Skandinavisk Miljø</h2>
          <p className="text-gray-700 mb-6">
            Jávea er populært blant skandinaviere, noe som gjør det til en veldig internasjonalt miljø. Mange nordmenn, svensker, danske og hollendere lever her.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Samfunn og Nettverk</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Skandinaviske restauranter og kafeer</li>
                <li>Internasjonale klubber og foreninger</li>
                <li>Engelsk- og skandinavisk talende tjenester</li>
                <li>Internasjonale skoler</li>
                <li>Kulturell mangfold og fellesskap</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Levekvalitet</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea tilbyr en eksklusiv og rolig livsstil. Det er mindre turist-orientert enn Torrevieja men med høyere standard og service. Ideelt for pensjonister og velstående familier.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Investeringer */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Investeringer og Leieinntekter</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Leiepotensial</h3>
              <p className="text-gray-700 mb-3">
                Leieinntektene i Jávea er lavere enn Torrevieja da det er mindre turismeorientert. Vanligvis 2-4% årlig:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Hovedstuen leiligheter: 2-3% leieutbytte</li>
                <li>Luksusvillaer: 2-4% leieutbytte</li>
                <li>Best for personlig bruk eller langsiktig verdiøkning</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Prisutvikling</h3>
              <p className="text-gray-700">
                Boligprisene i Jávea har hatt stabil vekst over årene. Det er en sikker investering for langsiktig kapitaløkning, spesielt i luksussegmentet som fortsetter å være etterspurt blant rike nordeuropeere.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Tips */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Tips for Kjøpere</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Planlegg For Luksus</h3>
              <p className="text-gray-700 text-sm">
                Jávea er Premium. Sett av en større budget. Luksuseiendommer krever vedlikehold og høyere eiendomsskatt (IBI).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Velg Lokalisering Nøye</h3>
              <p className="text-gray-700 text-sm">
                Område avgjør verdi. Investering i Port eller strandsiden har høyere verdi enn inneland områder.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Bruk Lokale Eksperter</h3>
              <p className="text-gray-700 text-sm">
                Arbeid med erfarne eiendomsmeglere som kjenner Jávea markedet. De kan hjelpe med beste kjøp.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Planlegg Skatt</h3>
              <p className="text-gray-700 text-sm">
                Jávea har høyere eiendomsskatt. Planlegg skatteplikt til Norge og Spania med en skatterådgiver.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Besøk Flere Ganger</h3>
              <p className="text-gray-700 text-sm">
                Før du investerer storpenger, besøk Jávea flere ganger for å sikre at det er rett for deg.
              </p>
            </div>
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
          <h2 className="text-2xl font-light mb-4">Interessert i Luksuseiendommer i Jávea?</h2>
          <p className="mb-6 text-gray-100">
            Vi spesialiserer oss i eksklusiv nybygg og luksuseiendommer i Jávea. Kontakt oss for å finne ditt drømmehjem.
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
