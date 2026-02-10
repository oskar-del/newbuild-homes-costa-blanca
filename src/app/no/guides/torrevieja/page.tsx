import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/no/guides/torrevieja`

export const metadata: Metadata = {
  title: 'Torrevieja - Guide for norske kjøpere og bosettere',
  description: 'Fullstendig guide til Torrevieja: boligpriser, klima, infrastruktur, norsk samfunn og tips for norske kjøpere.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/torrevieja`,
      sv: `${baseUrl}/se/guides/torrevieja`,
      nl: `${baseUrl}/nl/guides/torrevieja`,
      'nl-BE': `${baseUrl}/nl-be/guides/torrevieja`,
      fr: `${baseUrl}/fr/guides`,
      no: currentUrl,
      de: `${baseUrl}/de/guides/torrevieja`,
      pl: `${baseUrl}/pl/guides/torrevieja`,
      ru: `${baseUrl}/ru/guides/torrevieja`,
      'x-default': `${baseUrl}/guides/torrevieja`,
    },
  },
  openGraph: {
    title: 'Torrevieja - Guide for norske boligkjøpere',
    description: 'Fullstendig guide til å leve og kjøpe bolig i Torrevieja',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'nb_NO',
  },
}

const breadcrumbs = [
  { name: 'Hjem', url: `${baseUrl}/no` },
  { name: 'Guider', url: `${baseUrl}/no/guides` },
  { name: 'Torrevieja', url: currentUrl },
]

const faqs = [
  {
    question: 'Hvorfor er Torrevieja populært blandt norske kjøpere?',
    answer: 'Torrevieja er populært blant nordmenn på grunn av lave priser, stort norsk samfunn, godt tilrettelegging for pensjonister, vakre strander og nær Alicante lufthavn. Det er ideelt for nordmenn som søker et attraktivt tilflyttingssted.',
  },
  {
    question: 'Hva er gjennomsnittlige boligpriser i Torrevieja?',
    answer: 'Torrevieja er rimeligere enn nord. Gjennomsnittlige priser ligger på 3.000-4.000 euro/m² for brukteiendommer og 3.500-5.000 euro/m² for nybygg. Dette er cirka 30-40% billigere enn Jávea eller Altea.',
  },
  {
    question: 'Hva er klimaet som i Torrevieja?',
    answer: 'Torrevieja har over 300 solskinnsdager per år, tørt middelhavsklima med vintertemperaturer omkring 16°C og sommertemperaturer over 30°C. Det er ett av de solrikeste stedene på Costa Blanca.',
  },
  {
    question: 'Finnes det et norsk samfunn i Torrevieja?',
    answer: 'Ja, svært aktivt! Torrevieja har ett av de største norske samfunnene på Costa Blanca med klubber, restauranter, arrangementer og foreninger. Du finner lett andre nordmenn her.',
  },
  {
    question: 'Hva er skatteavtalen mellom Norge og Spania?',
    answer: 'Norge har en skatteavtale med Spania som sikrer at du ikke betaler dobbel skatt. Du må rapportere utenlandsk formue til norske myndigheter. En skatterådgiver kan hjelpe med planlegging.',
  },
  {
    question: 'Kan jeg få god leierutbytte i Torrevieja?',
    answer: 'Ja, Torrevieja gir vanligvis godt leierutbytte på 4-6% årlig gjennom turister og pensjonister. Det er populært ferieleiested, spesielt på sommeren.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function TorreviejaPageNO() {
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
            Torrevieja - Komplett guide for norske bosettere
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Torrevieja er ett av de mest populære destinasjonene for norske bosettere på Costa Blanca. Denne guiden gir deg all informasjon om denne sjarmerende havnebyen: fra boligpriser til lokale kultur og samfunn.
          </p>
        </div>

        {/* Section: Oversikt */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Oversikt over Torrevieja</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja er en levende havneby i sør Costa Blanca med omkring 80.000 innbyggere, hvorav omkring 3.000-4.000 er nordmenn. Byen er kjent for vakre strander, aktivt nattliv og ett stort, etablert norsk samfunn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Rask Fakta</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Innbyggere: omkring 80.000</li>
                <li>Norske innbyggere: omkring 3.000-4.000</li>
                <li>Klima: Middelhav, tørt</li>
                <li>Solskinnsdager/år: over 300</li>
                <li>Avstand til Alicante: 50-60 km</li>
                <li>Strand: Lange sandstrander</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Høydepunkter</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Stort norsk samfunn</li>
                <li>Rimelige boligpriser</li>
                <li>God infrastruktur</li>
                <li>Aktivt nattliv</li>
                <li>Vannaktiviteter</li>
                <li>Gode leieutbytter</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Klima */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klima og Vær</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja har ett av de beste klimaene på Costa Blanca med over 300 solskinnsdager per år.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Gjennomsnittlige Temperaturer</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Januar</span>
                  <span className="font-semibold">9-16°C</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>April</span>
                  <span className="font-semibold">13-22°C</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Juli</span>
                  <span className="font-semibold">22-31°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Oktober</span>
                  <span className="font-semibold">16-26°C</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Ideelt:</strong> Året rundt er været mildt og behagelig. Frost er praktisk ukjent, og somrene er varme men ikke overopphetet.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Boligpriser */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Boligpriser og Investeringer</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Gjennomsnittlige Priser (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Brukteiendommer:</p>
                  <p className="text-gray-700">2.500-3.500 euro/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Nybygg:</p>
                  <p className="text-gray-700">3.500-5.000 euro/m²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Eksempel Leilighet (80 m²):</p>
                  <p className="text-gray-700">200.000-400.000 euro (nye til høy standard)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Leieutbytte</h3>
              <p className="text-gray-700 mb-3">
                Torrevieja gir attraktive leieutbytter på 4-6% per år. Dette er høyere enn gjennomsnittet på Costa Blanca da Torrevieja er populær feriedestinasjon.
              </p>
              <p className="text-gray-700 text-sm">
                En investering på 250.000 euro kunne generere årlige leieinntekter på 10.000-15.000 euro (med riktig styring og booking).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Populære Områder for Kjøpere</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Sentrum (Paseo Maritimo):</strong> Nær strand og havn, leivet, høyere priser</li>
                <li><strong>La Mata:</strong> Roligere strandby, 5 km nord, familievennlig</li>
                <li><strong>El Remo:</strong> Boligområde, middelpriser, god infrastruktur</li>
                <li><strong>Punta Prima:</strong> Sør, residensialområde, moderne, høyere priser</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Norsk Samfunn */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Norsk Samfunn i Torrevieja</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja har ett meget aktivt og etablert norsk samfunn, noe som gjør det til et perfekt mål for norske bosettere.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Norsk Infrastruktur</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Norske leger og tannleger (norsktalende)</li>
                <li>Norske restauranter og kaféer</li>
                <li>Norske klubber og foreninger (klubber, sjakk, vandring, osv.)</li>
                <li>Norsk kirke og religiøse fellesskap</li>
                <li>Norske eiendomsmeglere</li>
                <li>Norske skatterådgivere og advokater</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Norske Arrangementer</h3>
              <p className="text-gray-700 text-sm mb-3">
                Året rundt er det norske arrangementer:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Norsk Rødt Kors arrangement</li>
                <li>Nasjonaldags-feiring (17. mai)</li>
                <li>Julebazarer og høytidsmarkeringer</li>
                <li>Klubbmøter og sosiale arrangement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Infrastruktur */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastruktur og Tjenester</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Helse og Leger</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Offentlig sykehus</li>
                <li>Mange private leger og klinikker</li>
                <li>Norsk- og engelsktalende leger</li>
                <li>Apotek på hver hjørne</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Kjøping og Forsyning</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Stort kjøpesenter (Castel Marques)</li>
                <li>Supermarkeder (Mercadona, Carrefour, osv.)</li>
                <li>Markeder (torsdagmarked)</li>
                <li>Restauranter og barer overalt</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Utdanning</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Offentlige spanske skoler</li>
                <li>Private internasjonale skoler</li>
                <li>Norskundervisning tilgjengelig</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Transport</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Busforbindelser overalt</li>
                <li>Taxistander i nærheten</li>
                <li>Tog til Alicante lufthavn</li>
                <li>God veiforbindelse</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Aktiviteter */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Strander, Aktiviteter og Fritid</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Strander</h3>
              <p className="text-gray-700 mb-3">
                Torrevieja er kjent for vakre, brede sandstrander. Hovedstrandene er:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Playa del Centro:</strong> Hovedstrand med promenade, leivet</li>
                <li><strong>Playa La Mata:</strong> Rolig strand, 5 km nord</li>
                <li><strong>Playa Flamenca:</strong> Sør, rolig, mindre turistisk</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Aktiviteter</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vannaktiviteter (jetski, seiling, surfing)</li>
                <li>Golf - flere golfbaner i nærheten</li>
                <li>Båtture og utflukter</li>
                <li>Nattliv og diskoteker</li>
                <li>Vandring i omegnen</li>
                <li>Naturreservat Laguna Rosa</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Nattliv</h3>
              <p className="text-gray-700">
                Torrevieja er kjent for aktivt nattliv med mange barer, klubber og diskoteker. Det er noe for alle: fra tradisjonelle barer til moderne klubber med DJ. Nattlivet er spesielt aktivt sommermånedene.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Levekostnader */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Levekostnader i Torrevieja</h2>

          <div className="bg-gray-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Månedlige Kostnader Eksempel (for par)</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Husleie (gjennomsnittlig leilighet)</span>
                <span className="font-semibold">600-800 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Nebenkosten (vann, strøm, gass)</span>
                <span className="font-semibold">80-120 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Mat og Spising</span>
                <span className="font-semibold">300-400 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Bil og Transport</span>
                <span className="font-semibold">150-200 euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Forsikring og Helse</span>
                <span className="font-semibold">100-150 euro</span>
              </div>
              <div className="flex justify-between">
                <span>Fritid og Underholdning</span>
                <span className="font-semibold">150-250 euro</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Samlet Budsjett (månedlig)</span>
                <span>1.400-1.900 euro</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-4">
              Dette er billigere enn i Norge og gir et godt liv med komfort.
            </p>
          </div>
        </section>

        {/* Section: Tips */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Tips for Nykommere</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Registrer deg hos myndighetene</h3>
              <p className="text-gray-700 text-sm">
                Registrer deg hos Ayuntamiento (kommunen), få NIE-nummer og registrer deg hos skattekontoret.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Koble deg til det norske samfunnet</h3>
              <p className="text-gray-700 text-sm">
                Besøk norske klubber og arrangementer. Nettverket vil hjelpe deg med å innarbeide deg.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Åpne en bankkonto</h3>
              <p className="text-gray-700 text-sm">
                Åpne en spansk bankkonto. DNB og Nordea har også filial i Spania. Dette er nødvendig for alle økonomiske transaksjoner.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Lær grunnleggende spansk</h3>
              <p className="text-gray-700 text-sm">
                Mens mange snakker engelsk, blir spansk påskjønnet og hjelper til med integrasjon.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Utforsk omegnen</h3>
              <p className="text-gray-700 text-sm">
                Besøk nærliggende landsbyer og severdigheter. La Mata, Guardamar og Elche er alle interessante.
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
          <h2 className="text-2xl font-light mb-4">Interessert i Eiendommer i Torrevieja?</h2>
          <p className="mb-6 text-gray-100">
            Vi har et stort utvalg av høykvalitets nybygg i Torrevieja og La Mata. Kontakt oss for mer informasjon.
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
