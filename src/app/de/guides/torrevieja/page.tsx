import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/torrevieja`

export const metadata: Metadata = {
  title: 'Torrevieja - Guide für Auswanderer und Immobilienkäufer',
  description: 'Vollständiger Guide zu Torrevieja: Immobilienpreise, Klima, Infrastruktur, Deutsche Gemeinschaft und Tipps für deutsche Käufer.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/torrevieja`,
      sv: `${baseUrl}/se/guides/torrevieja`,
      nl: `${baseUrl}/nl/guides/torrevieja`,
      'nl-BE': `${baseUrl}/nl-be/guides/torrevieja`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/torrevieja`,
    },
  },
  openGraph: {
    title: 'Torrevieja - Leitfaden für deutsche Immobilienkäufer',
    description: 'Vollständiger Guide zu Leben und Immobilienkauf in Torrevieja',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Torrevieja', url: currentUrl },
]

const faqs = [
  {
    question: 'Warum ist Torrevieja beliebt bei deutschen Käufern?',
    answer: 'Torrevieja ist beliebt wegen günstiger Preise, großer deutscher Gemeinschaft, etablierter Infrastruktur für Rentner, schöner Strände und guter Verbindungen zu Alicante. Es ist ideal für Auswanderer, die ein "ganz in einem" Erlebnis suchen.',
  },
  {
    question: 'Wie sind die Immobilienpreise in Torrevieja?',
    answer: 'Torrevieja ist günstiger als der Norden. Durchschnittliche Preise liegen bei 3.000-4.000 Euro/m² für Altbauten und 3.500-5.000 Euro/m² für Neubauten. Dies ist etwa 30-40% günstiger als Jávea oder Altea.',
  },
  {
    question: 'Wie ist das Klima in Torrevieja?',
    answer: 'Torrevieja hat über 300 Sonnentage pro Jahr, trockenes Mittelmeerklima mit Wintertemperaturen um 16°C und Sommern über 30°C. Es ist eine der sonnigsten Gegenden an der Costa Blanca.',
  },
  {
    question: 'Gibt es eine Deutsche Gemeinschaft in Torrevieja?',
    answer: 'Ja, sehr aktiv! Torrevieja hat eine der größten deutschen Gemeinschaften an der Costa Blanca mit Clubs, Restaurants, Festen und Vereinen. Sie werden leicht andere Deutsche finden.',
  },
  {
    question: 'Welche Infrastruktur gibt es in Torrevieja?',
    answer: 'Torrevieja hat Supermärkte, Ärzte, Apotheken, Banken, Restaurants, Bars, Golfplätze und Einkaufszentren. Die Infrastruktur für Rentner ist ausgezeichnet mit vielen Services in Deutsch.',
  },
  {
    question: 'Kann ich eine gute Mietrendite in Torrevieja erzielen?',
    answer: 'Ja, Torrevieja bietet normalerweise gute Mietrenditen von 4-6% pro Jahr durch Touristen und Rentner. Es ist ein beliebtes Ferienvermietziel, besonders im Sommer.',
  },
  {
    question: 'Wie weit ist Torrevieja vom Flughafen Alicante entfernt?',
    answer: 'Torrevieja liegt etwa 50-60 km südlich von Alicante. Die Fahrtzeit beträgt etwa 45-60 Minuten, abhängig von Verkehr. Es ist sehr nah zum Flughafen im Vergleich zu anderen Küstenorten.',
  },
  {
    question: 'Was sind die wichtigsten Attraktionen in Torrevieja?',
    answer: 'Hauptattraktionen sind die Sandstrände, der Hafen, das Castel Marques Shopping Center, das natürliche Salzseenreservat (Laguna Rosa), Wassersport und ein aktives Nachtleben. Es ist lebendig und touristisch.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function TorreviejaPage() {
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
            Torrevieja - Der komplette Guide für deutsche Auswanderer
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Torrevieja ist eines der beliebtesten Ziele für deutsche Auswanderer an der Costa Blanca. Dieser Leitfaden gibt Ihnen alle Informationen über diese charmante Hafenstadt: von Immobilienpreisen bis zur lokalen Kultur.
          </p>
        </div>

        {/* Section: Übersicht */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Überblick über Torrevieja</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja ist eine lebendige Hafenstadt in der südlichen Costa Blanca mit etwa 80.000 Einwohnern, von denen etwa 15.000 Deutsche sind. Die Stadt ist berühmt für ihre schönen Strände, das aktive Nachtleben und die etablierte deutsche Gemeinschaft.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Schnelle Fakten</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Einwohner: etwa 80.000</li>
                <li>Deutsche Einwohner: etwa 15.000</li>
                <li>Klima: Mittelmeer, trocken</li>
                <li>Sonnentage/Jahr: über 300</li>
                <li>Entfernung Alicante: 50-60 km</li>
                <li>Strand: Lange Sandstrände</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Deutsche Gemeinschaft sehr aktiv</li>
                <li>Günstige Immobilienpreise</li>
                <li>Vielfältige Infrastruktur</li>
                <li>Aktives Nachtleben</li>
                <li>Wassersport-Möglichkeiten</li>
                <li>Gute Mietrenditen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Klima */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klima und Wetter</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja hat eines der besten Klimate der Costa Blanca mit über 300 Sonnentagen pro Jahr.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Temperaturen durchschnittlich</h3>
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
                <strong>Perfekt:</strong> Das ganze Jahr über ist das Wetter mild und angenehm. Frost ist praktisch unbekannt, und die Sommer sind warm aber nicht überhitzt.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Immobilienpreise */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Immobilienpreise und Investitionen</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Durchschnittliche Preise (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Altbauten:</p>
                  <p className="text-gray-700">2.500-3.500 Euro/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Neubauten:</p>
                  <p className="text-gray-700">3.500-5.000 Euro/m²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Beispiel-Apartement (80 m²):</p>
                  <p className="text-gray-700">200.000-400.000 Euro (neue bis hochwertige Lagen)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Mietrenditen</h3>
              <p className="text-gray-700 mb-3">
                Torrevieja bietet attraktive Mietrenditen von 4-6% pro Jahr. Dies ist höher als der Durchschnitt an der Costa Blanca, da Torrevieja ein beliebtes Ferienziel ist.
              </p>
              <p className="text-gray-700 text-sm">
                Eine Investition von 250.000 Euro könnte jährlich 10.000-15.000 Euro Mieteinnahmen generieren (bei korrekter Verwaltung und Buchung).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Beliebte Viertels für Käufer</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Zentrum (Paseo Maritimo):</strong> Nahe Strand und Hafen, lebhaft, höhere Preise</li>
                <li><strong>La Mata:</strong> Ruhigeres Stranddorf, 5 km nördlich, familienfreundlich</li>
                <li><strong>El Remo:</strong> Wohngebiet, mittelpreisig, gute Infrastruktur</li>
                <li><strong>Punta Prima:</strong> Südlicher, Residenzviertel, moderner, höhere Preise</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Deutsche Gemeinschaft */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Deutsche Gemeinschaft in Torrevieja</h2>
          <p className="text-gray-700 mb-6">
            Torrevieja hat eine sehr aktive und etablierte deutsche Gemeinschaft, was es zu einem perfekten Ziel für deutsche Auswanderer macht.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Deutsche Infrastruktur</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Deutsche Ärzte und Zahnärzte (mit Deutsch sprechend Deutsch)</li>
                <li>Deutsche Restaurants und Cafés</li>
                <li>Deutsche Clubs und Vereine (Clubs, Schachs, Wandern, etc.)</li>
                <li>Deutsche Kirche und religiöse Gemeinschaften</li>
                <li>Deutsche Makler und Immobilienbüros</li>
                <li>Deutsche Steuerberater und Rechtsanwälte</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Deutsche Veranstaltungen</h3>
              <p className="text-gray-700 text-sm mb-3">
                Das ganze Jahr über gibt es deutsche Veranstaltungen:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Oktoberfest (großes Fest im September)</li>
                <li>Deutsche Weihnachtsmärkte</li>
                <li>Club-Treffen und gesellschaftliche Ereignisse</li>
                <li>Kulturelle Veranstaltungen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Infrastruktur und Services */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastruktur und Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Gesundheit und Ärzte</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Öffentliche Krankenhaus (Hospital)</li>
                <li>Viele private Ärzte und Kliniken</li>
                <li>Deutsche und englische sprechende Ärzte</li>
                <li>Apotheken an jeder Ecke</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Einkaufen und Versorgen</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Großes Einkaufszentrum (Castel Marques)</li>
                <li>Supermarkets (Mercadona, Carrefour, etc.)</li>
                <li>Märkte (Wochenmarkt am Samstag)</li>
                <li>Restaurants und Bars überall</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Bildung</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Öffentliche spanische Schulen</li>
                <li>Private internationale Schulen</li>
                <li>Deutsche Schulangebote vorhanden</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Transportieren</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Busverbindungen überall</li>
                <li>Nahegelegene Taxistände</li>
                <li>Eisenbahn zum Flughafen</li>
                <li>Gute Straßenanbindung</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Aktivitäten und Strände */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Strände, Aktivitäten und Freizeit</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Strände</h3>
              <p className="text-gray-700 mb-3">
                Torrevieja ist bekannt für seine schönen, breiten Sandstrände. Die Hauptstrände sind:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Playa del Centro:</strong> Hauptstrand mit Promenade, lebhaft</li>
                <li><strong>Playa La Mata:</strong> Ruhiger Strand, 5 km nördlich</li>
                <li><strong>Playa Flamenca:</strong> Süd, ruhiger, weniger touristisch</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Aktivitäten</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Wassersport (Jet Ski, Segeln, Surfen)</li>
                <li>Golf - mehrere nahegelegene Golfplätze</li>
                <li>Bootsfahrten und Ausflüge</li>
                <li>Nachtleben und Diskotheken</li>
                <li>Wandern in der Umgebung</li>
                <li>Naturschutzgebiet Laguna Rosa besuchen</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Nachtleben</h3>
              <p className="text-gray-700">
                Torrevieja ist bekannt für aktives Nachtleben mit vielen Bars, Clubs und Diskotheken. Es gibt für jeden Geschmack etwas: von traditionellen Bars bis zu modernen Clubs mit DJ. Das Nachtleben ist besonders in den Sommermonaten lebendig.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Kostenbeispiel */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Lebenshaltungskosten in Torrevieja</h2>

          <div className="bg-gray-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Monatliche Kosten-Beispiel (für ein Paar)</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Miete (mittelwertiges Apartment)</span>
                <span className="font-semibold">600-800 Euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Nebenkosten (Wasser, Strom, Gas)</span>
                <span className="font-semibold">80-120 Euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Lebensmittel und Essen</span>
                <span className="font-semibold">300-400 Euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Auto und Transport</span>
                <span className="font-semibold">150-200 Euro</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Versicherungen und Gesundheit</span>
                <span className="font-semibold">100-150 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Freizeit und Unterhaltung</span>
                <span className="font-semibold">150-250 Euro</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Gesamtbudget (monatlich)</span>
                <span>1.400-1.900 Euro</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-4">
              Dies ist günstiger als in Deutschland und ermöglicht ein gutes Leben mit Komfort.
            </p>
          </div>
        </section>

        {/* Section: Tipps für Ankommer */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Tipps für Neuankommer</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Registrieren Sie sich bei den Behörden</h3>
              <p className="text-gray-700 text-sm">
                Melden Sie sich beim Ayuntamiento (Gemeinde) an, besorgen Sie sich NIE-Nummer und registrieren Sie sich beim Finanzamt.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Verbinden Sie sich mit der deutschen Gemeinschaft</h3>
              <p className="text-gray-700 text-sm">
                Besuchen Sie deutsche Clubs und Veranstaltungen. Das Netzwerk wird Ihnen helfen, sich einzuleben.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Eröffnen Sie ein Bankkonto</h3>
              <p className="text-gray-700 text-sm">
                Eröffnen Sie ein Spanisches Bankkonto. Dies ist notwendig für alle finanziellen Transaktionen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Lernen Sie grundlegende Spanisch</h3>
              <p className="text-gray-700 text-sm">
                Während viele Menschen Englisch sprechen, wird Spanisch geschätzt und hilft bei Integrationen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Erkunden Sie die Umgebung</h3>
              <p className="text-gray-700 text-sm">
                Besuchen Sie nahegelegene Dörfer und Sehenswürdigkeiten. La Mata, Guardamar und Elche sind alle interessant.
              </p>
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
          <h2 className="text-2xl font-light mb-4">Interessiert an Immobilien in Torrevieja?</h2>
          <p className="mb-6 text-gray-100">
            Wir haben eine große Auswahl an hochwertigen Neubauten in Torrevieja und La Mata. Kontaktieren Sie uns für mehr Informationen.
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
