import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/costa-blanca-nord`

export const metadata: Metadata = {
  title: 'Costa Blanca Nord - Guide für Auswanderer und Investoren',
  description: 'Vollständiger Guide zu Costa Blanca Nord: Regionen, Immobilienpreise, Lifestyle, Natur und Tipps für deutsche Käufer.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/costa-blanca-north`,
      sv: `${baseUrl}/se/guides/costa-blanca-north`,
      nl: `${baseUrl}/nl/guides/costa-blanca-noord`,
      'nl-BE': `${baseUrl}/nl-be/guides/costa-blanca-noord`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/costa-blanca-north`,
    },
  },
  openGraph: {
    title: 'Costa Blanca Nord - Guide für Immobilienkäufer',
    description: 'Vollständiger Guide zu Region, Immobilien und Lebensstil in Costa Blanca Nord',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Costa Blanca Nord', url: currentUrl },
]

const faqs = [
  {
    question: 'Welche Gemeinden gehören zur Costa Blanca Nord?',
    answer: 'Costa Blanca Nord erstreckt sich von Altea bis zu den Bergen nördlich von Benidorm, einschließlich Jávea, Dénia, Altea und Benidorm. Jedes Dorf hat seinen eigenen Charakter.',
  },
  {
    question: 'Wie unterscheidet sich Costa Blanca Nord vom Süden?',
    answer: 'Der Norden hat Berge, Naturschönheit und ein gehobenes Lifestyle. Der Süden ist flacher mit großen Sandstränden und touristischer Infrastruktur. Der Norden ist teurer und exklusiver.',
  },
  {
    question: 'Sind Immobilienpreise im Norden wirklich so viel höher?',
    answer: 'Ja, der Norden ist etwa 30-50% teurer als der Süden. Dies ist aufgrund von höherer Nachfrage, besserer Natur und gehobenerem Lifestyle gerechtfertigt.',
  },
  {
    question: 'Kann ich im Norden gute Investitionen machen?',
    answer: 'Ja, der Norden bietet bessere langfristige Wertentwicklung und Kapitalgewinne. Mietrenditen sind etwas niedriger (3-4%) als im Süden (4-6%), aber der Wert stabil.',
  },
  {
    question: 'Wo sollte ich im Norden kaufen?',
    answer: 'Das hängt von Ihren Prioritäten ab: Jávea für Natur und Exklusivität, Altea für Künstler und Entspannung, Benidorm für urbanes Leben und Aktivitäten, Dénia für Hafenstadt-Charm.',
  },
  {
    question: 'Wie ist das Klima im Norden?',
    answer: 'Das Klima ist gemäßigt mit etwas kälteren Wintern und mehr Regen als der Süden. Winter-Temperatur um 12-16°C, Sommer 26-29°C. Dennoch sehr angenehm ganzjährig.',
  },
  {
    question: 'Gibt es deutsche Gemeinschaften im Norden?',
    answer: 'Ja, aber kleinere und gehobener als im Süden. Jávea und Altea haben deutsche Netzwerke, Restaurants und Dienstleister.',
  },
  {
    question: 'Was sind die Hauptaktivitäten im Norden?',
    answer: 'Wanderungen, Wassersport, Segeln, Tauchen, Yoga, Wellness, hochwertige Restaurants, Kunstgalerien und kulturelle Veranstaltungen. Der Fokus liegt auf Aktivitäten und Natur.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function CostaBlanaN() {
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
            Costa Blanca Nord - Das Juwel der Valencia-Region
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Costa Blanca Nord ist das Zentrum für Natur, Lifestyle und hochwertige Immobilien. Dieser Leitfaden gibt Ihnen einen Überblick über alle Regionen und hilft Ihnen, die beste Gemeinde für Ihre Bedürfnisse zu finden.
          </p>
        </div>

        {/* Section: Überblick */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Überblick Costa Blanca Nord</h2>
          <p className="text-gray-700 mb-6">
            Costa Blanca Nord erstreckt sich über etwa 100 km Küstenlinie und besteht aus mehreren charaktervollen Gemeinden. Diese Region ist berühmt für ihre Naturschönheit, atemberaubende Buchten und gehobenes Lifestyle.
          </p>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Charakteristiken des Nordens</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Bergige Landschaft mit spektakulären Ausblicken</li>
              <li>Kleine, charmante Buchten mit klarem Wasser</li>
              <li>Hochwertige Restaurants und Bars</li>
              <li>Internationale kosmopolitische Bevölkerung</li>
              <li>Weniger Massentourismus als Süden</li>
              <li>Höhere Immobilienpreise</li>
              <li>Bessere langfristige Wertentwicklung</li>
            </ul>
          </div>
        </section>

        {/* Section: Hauptgemeinden */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Die Hauptgemeinden des Nordens</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Jávea (Xàbia)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Die exklusivste Gemeinde des Nordens. Berühmt für die atemberaubende Bucht Granadella, hochwertige Restaurants und gehobenes Lifestyle. Zieht wohlhabende Auswanderer an.
              </p>
              <p className="text-gray-700 text-sm"><strong>Preise:</strong> 5.000-7.500 Euro/m² | <strong>Beste für:</strong> Natur und Exklusivität</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Altea (Altea la Vella)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Ein charmantes Künstlerdorf auf einer Anhöhe mit weiß getünchten Häusern. Bekannt für Kunstgalerien, Antiquitäten und bohemisches Lifestyle. Ruhig und respektvoll gegenüber internationalen Künstlern.
              </p>
              <p className="text-gray-700 text-sm"><strong>Preise:</strong> 4.000-5.500 Euro/m² | <strong>Beste für:</strong> Künstler und Kulturliebhaber</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Dénia</h3>
              <p className="text-gray-700 text-sm mb-3">
                Eine größere Hafenstadt mit traditionellem spanischem Charm. Bekannt für Gourmet-Restaurants und Paella. Bietet gute Balance zwischen Natur und städtischen Annehmlichkeiten.
              </p>
              <p className="text-gray-700 text-sm"><strong>Preise:</strong> 3.500-5.000 Euro/m² | <strong>Beste für:</strong> Kultur und Hafenstadt-Leben</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Benidorm</h3>
              <p className="text-gray-700 text-sm mb-3">
                Die größte Stadt mit modernem urbanen Lifestyle, Hochhäusern und breiten Stränden. Lebhaft mit vielen Aktivitäten, Restaurants und Nachtleben. Weniger "Naturraum", mehr urban.
              </p>
              <p className="text-gray-700 text-sm"><strong>Preise:</strong> 3.000-4.500 Euro/m² | <strong>Beste für:</strong> Aktives urbanes Leben</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Kleinere Perlen: Andreucci, Cala Martin, Pego</h3>
              <p className="text-gray-700 text-sm mb-3">
                Kleine traditionelle Dörfer mit autentischem spanischem Leben. Weniger touristisch, gute Preise, lokale Gemeinschaften. Perfekt für Ruhe Suchende.
              </p>
              <p className="text-gray-700 text-sm"><strong>Preise:</strong> 2.500-3.500 Euro/m² | <strong>Beste für:</strong> Ruhe und autentisches Leben</p>
            </div>
          </div>
        </section>

        {/* Section: Warum der Norden */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Warum Costa Blanca Nord wählen?</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Natur und Umwelt</h3>
              <p className="text-gray-700 mb-3">
                Der Norden bietet spektakuläre Naturschönheit: Berge, Buchten, Wanderwege und Naturparks. Ideal für Menschen, die Natur und Aktivitäten lieben.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Gehobene Lebensqualität</h3>
              <p className="text-gray-700 mb-3">
                Hochwertige Restaurants, Cafés, Kunstgalerien und kulturelle Veranstaltungen. Es gibt ein Gefühl von Raffinement und Geschmack.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Internationale Gemeinschaft</h3>
              <p className="text-gray-700 mb-3">
                Der Norden zieht eine globale, kosmopolitische Bevölkerung an. Es ist leicht, Gleichgesinnte zu finden und internationale Freundschaften zu schließen.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Investitionspotenzial</h3>
              <p className="text-gray-700 mb-3">
                Bessere langfristige Wertentwicklung. Der Norden wird häufig als "Premium"-Standort wahrgenommen und bietet solidere Kapitalgewinne.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Immobilienpreise */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Immobilienpreise und Trends</h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 font-semibold text-primary-900">Gemeinde</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Preisbereich (€/m²)</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Charakter</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Jávea</td>
                  <td className="px-4 py-3">5.000-7.500</td>
                  <td className="px-4 py-3">Exklusiv, Natur</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Altea</td>
                  <td className="px-4 py-3">4.000-5.500</td>
                  <td className="px-4 py-3">Künstler, Kultur</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Dénia</td>
                  <td className="px-4 py-3">3.500-5.000</td>
                  <td className="px-4 py-3">Hafenstadt, Balances</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Benidorm</td>
                  <td className="px-4 py-3">3.000-4.500</td>
                  <td className="px-4 py-3">Urban, Moderne</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Kleinere Dörfer</td>
                  <td className="px-4 py-3">2.500-3.500</td>
                  <td className="px-4 py-3">Autentisch, Ruhig</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border rounded-sm p-6 border-gray-200">
            <h3 className="font-semibold text-primary-900 mb-3">Mietrenditen und Investitionen</h3>
            <p className="text-gray-700 text-sm mb-3">
              <strong>Mietrenditen:</strong> 3-4% pro Jahr (niedriger als Süden, aber stabiler)
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Wertentwicklung:</strong> Bessere langfristige Gewinne. Immobilien im Norden behalten Wert und wachsen über 5-10 Jahre.
            </p>
          </div>
        </section>

        {/* Section: Beste für wen */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Für wen ist Costa Blanca Nord richtig?</h2>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Costa Blanca Nord ist ideal, wenn Sie:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Natur und Outdoor-Aktivitäten lieben</li>
              <li>Hochwertige Restaurants und Lifestyle bevorzugen</li>
              <li>Eine kosmopolitische Gemeinschaft suchen</li>
              <li>Nicht auf Budget fokussieren</li>
              <li>Längerfristig halten und von Wertentwicklung profitieren möchten</li>
              <li>Ruhigere, weniger touristische Orte bevorzugen</li>
              <li>Eine internationale Expat-Gemeinschaft suchen</li>
            </ul>
          </div>
        </section>

        {/* Section: Aktivitäten */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Aktivitäten und Attraktionen</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Outdoor-Aktivitäten</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Wanderungen und Trekking</li>
                <li>Wassersport und Segeln</li>
                <li>Tauchen und Schnorcheln</li>
                <li>Windsurfen und Kiteboarding</li>
                <li>Fahrrad fahren</li>
                <li>Klettern</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Kultur und Freizeit</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Hochwertige Restaurants</li>
                <li>Kunstgalerien und Kunstszene</li>
                <li>Kulturelle Veranstaltungen</li>
                <li>Yoga und Wellness</li>
                <li>Märkte und lokale Produkte</li>
                <li>Museen und Geschichte</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-primary-900 mb-8">Häufig gestellte Fragen</h2>
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
          <h2 className="text-2xl font-light mb-4">Bereit, Costa Blanca Nord zu erkunden?</h2>
          <p className="mb-6 text-gray-100">
            Wir bieten eine große Auswahl an handverlesenen Neubauten in allen Gemeinden des Nordens. Lassen Sie uns Ihnen helfen, Ihr Traumzuhause zu finden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition"
            >
              Per WhatsApp kontaktieren
            </Link>
            <Link
              href="/de/contact"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition"
            >
              Kontaktformular
            </Link>
          </div>
        </section>

        {/* Back to guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/de/guides"
            className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
          >
            Zurück zu allen Ratgebern
          </Link>
        </div>
      </main>
    </div>
  )
}
