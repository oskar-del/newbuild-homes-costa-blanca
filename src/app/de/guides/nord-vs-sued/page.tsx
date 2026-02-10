import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/nord-vs-sued`

export const metadata: Metadata = {
  title: 'Costa Blanca Nord vs. Süd - Vollständiger Vergleich',
  description: 'Vergleich zwischen Costa Blanca Nord (Jávea, Altea) und Süd (Torrevieja, Guardamar). Klima, Preise, Lifestyle und beste Region für Sie.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/north-vs-south`,
      sv: `${baseUrl}/se/guides/north-vs-south`,
      nl: `${baseUrl}/nl/guides/noord-vs-zuid`,
      'nl-BE': `${baseUrl}/nl-be/guides/noord-vs-zuid`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/nord-vs-sor`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/north-vs-south`,
    },
  },
  openGraph: {
    title: 'Costa Blanca Nord vs. Süd - Welche Region für Sie?',
    description: 'Detaillierter Vergleich der beiden Regionen an der Costa Blanca',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Nord vs. Süd', url: currentUrl },
]

const faqs = [
  {
    question: 'Wie ist das Klima im Norden vs. Süden?',
    answer: 'Im Süden (Torrevieja) ist es trockener und wärmer, mit Durchschnittstemperaturen von 17°C im Winter und über 30°C im Sommer. Im Norden (Jávea) ist es etwas gemäßigter mit mehr Grün und gelegentlich etwas Regen. Der Norden hat mehr Nebensaison-Temperaturschwankungen.',
  },
  {
    question: 'Wo sind die Preise günstiger?',
    answer: 'Generell sind die Preise im Süden (Torrevieja) 15-25% günstiger als im Norden (Jávea). Dies liegt an der höheren Nachfrage und dem prestigeträchtigeren Status des Nordens. Die besten Wert findet man oft in Altea und Benidorm.',
  },
  {
    question: 'Welcher Bereich ist für Rentner besser?',
    answer: 'Der Süden (Torrevieja, Guardamar) ist traditionell beliebter bei britischen und deutschen Rentnern mit etablierter Infrastruktur. Der Norden (Jávea, Altea) ist für aktive, jüngere Rentner attraktiver, die Natur und Wandern bevorzugen.',
  },
  {
    question: 'Wo ist die beste Infrastruktur?',
    answer: 'Der Norden (Jávea, Altea) hat bessere private und internationale Schulen, hochwertige Restaurants und ein gehobenes Lifestyle-Angebot. Der Süden hat solide Infrastruktur mit mehr Einkaufszentren und Massentourismus.',
  },
  {
    question: 'Welche Region ist besser für Investitionen?',
    answer: 'Der Norden hat normalerweise bessere Kapitalgewinne und Mietrenditen, da er begehrter ist. Der Süden bietet günstigere Einstiegspreise und solide Mieten für Massentouristen.',
  },
  {
    question: 'Wie ist die Natur und Aktivitäten?',
    answer: 'Der Norden bietet herrliche Küstenwanderungen, Berge und Naturparks. Der Süden ist flacher, aber hat lange Sandstrände. Der Norden ist besser für Aktive, der Süden für Strandliebhaber.',
  },
  {
    question: 'Welche Region ist internationaler?',
    answer: 'Der Norden hat eine kosmopolitischere, gehobene Bevölkerung (Deutsche, Briten, Skandinavier, etc.). Der Süden hat mehr Briten und Massentourismus, aber auch etablierte deutsche und skandinavische Gemeinschaften.',
  },
  {
    question: 'Wo sollte ich leben?',
    answer: 'Das hängt von Ihren Vorlieben ab. Norden: wenn Sie Natur, Qualität und ein gehobenes Lifestyle wünschen. Süden: wenn Sie Budget bevorzugen, Strände lieben und eine etablierte Infrastruktur für Rentner wünschen.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function NordVsSued() {
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
            Costa Blanca Nord vs. Süd - Welche Region ist richtig für Sie?
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die Costa Blanca bietet zwei völlig unterschiedliche Erfahrungen. Dieser Leitfaden vergleicht den Norden (Jávea, Altea) mit dem Süden (Torrevieja, Guardamar) und hilft Ihnen, die beste Region für Ihre Bedürfnisse zu wählen.
          </p>
        </div>

        {/* Section: Überblick */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Geografischer Überblick</h2>
          <p className="text-gray-700 mb-6">
            Die Costa Blanca erstreckt sich über etwa 200 Kilometer entlang der valencianischen Küste. Sie wird oft in zwei Regionen eingeteilt:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Nord (Costa Blanca Nord)</h3>
              <p className="text-gray-700 text-sm mb-4">
                Von Gandía bis Altea, einschließlich Jávea, Dénia, Altea und Benidorm. Bekannt für bergige Landschaft, charmante Bergdörfer und exklusive Küstengemeinden.
              </p>
              <div className="bg-gray-50 rounded-sm p-3">
                <p className="text-gray-700 text-sm font-semibold">Abstand zu Alicante-Flughafen: 60-100 km</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Süd (Costa Blanca Süd)</h3>
              <p className="text-gray-700 text-sm mb-4">
                Von Benidorm bis Pilar de la Horadada, einschließlich Torrevieja, Guardamar, Orihuela und Playa Flamenca. Flache Landschaft mit großen Sandstränden.
              </p>
              <div className="bg-gray-50 rounded-sm p-3">
                <p className="text-gray-700 text-sm font-semibold">Abstand zu Alicante-Flughafen: 40-80 km</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Klima */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klima und Wetter</h2>

          <div className="space-y-6">
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-primary-900">Aspekt</th>
                    <th className="px-4 py-3 font-semibold text-primary-900">Nord (Jávea)</th>
                    <th className="px-4 py-3 font-semibold text-primary-900">Süd (Torrevieja)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">Winter (Durchschnitt)</td>
                    <td className="px-4 py-3">12-16°C</td>
                    <td className="px-4 py-3">14-17°C</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">Sommer (Durchschnitt)</td>
                    <td className="px-4 py-3">26-29°C</td>
                    <td className="px-4 py-3">28-32°C</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">Regentage pro Jahr</td>
                    <td className="px-4 py-3">35-40 Tage</td>
                    <td className="px-4 py-3">25-30 Tage</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold">Sonnenstunden/Jahr</td>
                    <td className="px-4 py-3">2.700-2.800</td>
                    <td className="px-4 py-3">2.800-2.900</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Meerestemperatur</td>
                    <td className="px-4 py-3">13-24°C</td>
                    <td className="px-4 py-3">14-25°C</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Zusammenfassung</h3>
              <p className="text-gray-700">
                Der Norden hat ein gemäßigteres Mittelmeerklima mit etwas kühler Wintern und mehr Regen. Der Süden ist trockener und sonniger mit konsistenteren warmen Temperaturen. Beide Regionen haben über 2.700 Sonnenstunden pro Jahr - ausgezeichnet!
              </p>
            </div>
          </div>
        </section>

        {/* Section: Immobilienpreise */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Immobilienpreise und Wertentwicklung</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Durchschnittliche Preise (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Norden (z.B. Jávea):</p>
                  <p className="text-gray-700">Durchschnitt 4.000-6.000 Euro/m²</p>
                  <p className="text-gray-700 text-sm">Neubauten: 5.000-7.500 Euro/m²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Süden (z.B. Torrevieja):</p>
                  <p className="text-gray-700">Durchschnitt 3.000-4.000 Euro/m²</p>
                  <p className="text-gray-700 text-sm">Neubauten: 3.500-5.000 Euro/m²</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-4 border-t pt-4">
                Der Norden ist etwa 30-50% teurer als der Süden. Dies ist hauptsächlich auf höhere Nachfrage und prestige Ruf zurückzuführen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Wertentwicklung und Investitionen</h3>
              <p className="text-gray-700 mb-3">
                <strong>Norden:</strong> Bessere langfristige Wertentwicklung, stabile Preise, gehobene Investoren. Mietrenditen: 3-4% p.a. Normalerweise gute Kapitalgewinne über 5-10 Jahre.
              </p>
              <p className="text-gray-700">
                <strong>Süden:</strong> Stabilere Einkünfte durch Massentourismus und Rentner. Mietrenditen: 4-6% p.a. Geringere Kapitalgewinne, aber solidere Mieteinnahmen.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Lifestyle und Infrastruktur */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Lifestyle und Infrastruktur</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Norden (Jávea, Altea)</h3>
              <h4 className="font-semibold text-primary-900 text-sm mb-2">Vorteile:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
                <li>Exklusive, gehobene Atmosphäre</li>
                <li>Hochwertige Restaurants und Bars</li>
                <li>Private internationale Schulen</li>
                <li>Naturschönheit und Wanderwege</li>
                <li>Kosmopolitische Bevölkerung</li>
                <li>Marina und Wassersport</li>
              </ul>
              <h4 className="font-semibold text-primary-900 text-sm mb-2">Nachteile:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Höhere Lebenshaltungskosten</li>
                <li>Kleinere Einkaufszentren</li>
                <li>Weniger Massentourismus-Infrastruktur</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Süden (Torrevieja, Guardamar)</h3>
              <h4 className="font-semibold text-primary-900 text-sm mb-2">Vorteile:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
                <li>Günstigere Lebenshaltungskosten</li>
                <li>Große Sandstrände</li>
                <li>Großer Einkaufszentren und Supermärkte</li>
                <li>Etablierte deutsche/britische Gemeinschaft</li>
                <li>Mehr Restaurants und Bars</li>
                <li>Golf und andere Aktivitäten</li>
              </ul>
              <h4 className="font-semibold text-primary-900 text-sm mb-2">Nachteile:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Massiver Tourismus in Hochsaison</li>
                <li>Weniger gehobenes Ambiente</li>
                <li>Weniger Naturschönheit</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Bevölkerung und Gemeinschaft */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Bevölkerung und Gemeinschaft</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Norden</h3>
              <p className="text-gray-700 mb-3">
                Die Bevölkerung ist kosmopolitisch, oft wohlhabend, mit Europäern, Amerikanern und wohlhabenden Spaniern. Viele aktive Unternehmer und Expats mit höherer Bildung. Jävea und Altea sind besonders gehobene Gemeinschaften.
              </p>
              <p className="text-gray-700 text-sm">
                Deutsche Gemeinschaft: Vorhanden, aber kleiner und wohlhabender als im Süden.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Süden</h3>
              <p className="text-gray-700 mb-3">
                Die Bevölkerung ist gemischter, mit vielen Rentnern, britischen Expats und touristischen Arbeitnehmern. Etablierte deutsche Gemeinschaften in Torrevieja und Guardamar mit Vereinen, Clubs und Events.
              </p>
              <p className="text-gray-700 text-sm">
                Deutsche Gemeinschaft: Groß und gut organisiert mit regelmäßigen Treffen und Events.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Aktivitäten und Unterhaltung */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Aktivitäten und Unterhaltung</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Norden</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Wanderungen in Bergen und Naturparks</li>
                <li>Wassersport und Tauchen</li>
                <li>Yoga, Wellness und Meditation</li>
                <li>Kunstgalerien und Kulturveranstaltungen</li>
                <li>Segeln und Marina-Aktivitäten</li>
                <li>Hochwertige Restaurants und Weinbars</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Süden</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Stranden und Schwimmen</li>
                <li>Golf - mehrere große Golfplätze</li>
                <li>Wassersport und Jetski</li>
                <li>Nachtleben und Clubs</li>
                <li>Karaoke und Entertainer Bars</li>
                <li>Tagesausflüge und Bootsfahrten</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Für wen ist jede Region? */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Für wen ist jede Region richtig?</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Wählen Sie den Norden, wenn Sie...</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Natur und schöne Landschaften lieben</li>
                <li>Aktiv sind und wandern, segeln, etc. mögen</li>
                <li>Hohe Qualität und gehobenes Lifestyle wünschen</li>
                <li>Kosmopolitische Umgebung bevorzugen</li>
                <li>Langfristige Kapitalgewinne wichtig sind</li>
                <li>Ruhigere, weniger touristische Bereiche mögen</li>
                <li>Budget keine Primärrolle spielt</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Wählen Sie den Süden, wenn Sie...</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Strände und Wasser lieben</li>
                <li>Budget eine wichtige Rolle spielen</li>
                <li>Etablierte Rentner-Infrastruktur wünschen</li>
                <li>Eine deutsche oder britische Gemeinschaft suchen</li>
                <li>Sichere Mieteinnahmen bevorzugen</li>
                <li>Golf und andere Golfaktivitäten interessieren</li>
                <li>Nähe zu Alicante-Flughafen wichtig ist</li>
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
          <h2 className="text-2xl font-light mb-4">Interessiert an einer Region?</h2>
          <p className="mb-6 text-gray-100">
            Lassen Sie sich von unserem Team beraten, welche Region am besten zu Ihnen passt.
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
