import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/javea`

export const metadata: Metadata = {
  title: 'Jávea - Guide für Immobilienkäufer an der Costa Blanca Nord',
  description: 'Vollständiger Guide zu Jávea: Immobilienpreise, Lifestyle, Strände, Natur und Tipps für deutsche Käufer an der Costa Blanca Nord.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/javea`,
      sv: `${baseUrl}/se/guides/javea`,
      nl: `${baseUrl}/nl/guides/javea`,
      'nl-BE': `${baseUrl}/nl-be/guides/javea`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/javea`,
    },
  },
  openGraph: {
    title: 'Jávea - Guide für Immobilienkäufer und Auswanderer',
    description: 'Vollständiger Guide zu Leben und Immobilienkauf in Jávea',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Jávea', url: currentUrl },
]

const faqs = [
  {
    question: 'Was ist besonders an Jávea?',
    answer: 'Jávea ist eine der exklusivsten Gemeinden an der Costa Blanca, bekannt für atemberaubende Natur, zwei wunderschöne Buchten, hochwertige Restaurants und ein gehobenes Lifestyle. Es zieht wohlhabende Auswanderer und Investoren an.',
  },
  {
    question: 'Wie sind die Immobilienpreise in Jávea?',
    answer: 'Jávea ist teurer als der Süden. Durchschnittliche Preise liegen bei 5.000-7.500 Euro/m² für Neubauten und 4.000-6.000 Euro/m² für Altbauten. Es ist etwa 50% teurer als Torrevieja.',
  },
  {
    question: 'Kann ich in Jávea Geld verdienen durch Vermietung?',
    answer: 'Ja, Jávea bietet gute Mietrenditen von 3-4% pro Jahr durch hochwertige Touristen und Langzeitmieter. Die höheren Preise führen zu besseren Kapitalgewinnen über längere Zeit.',
  },
  {
    question: 'Wie ist der Lebensstil in Jávea?',
    answer: 'Jávea bietet ein gehobenes, entspanntes Mittelmeer-Lifestyle mit ausgezeichneten Restaurants, Wassersport, Wanderungen und Natur. Es ist weniger touristisch als Torrevieja und zieht aktive, wohlhabende Menschen an.',
  },
  {
    question: 'Welche Aktivitäten gibt es in Jávea?',
    answer: 'Wanderungen in Bergen, Segeln und Wassersport, exzellente Restaurants, Tauchen in klarem Wasser, Yoga und Wellness, und zwei atemberaubende Buchten zum Schwimmen. Für aktive Menschen perfekt.',
  },
  {
    question: 'Gibt es Infrastruktur und Services in Jávea?',
    answer: 'Ja, Jávea hat alles, was Sie brauchen: hochwertige private Schulen, englische und deutsche sprechende Ärzte, Restaurants, Cafés, kleine Einkaufszentren und eine kosmopolitische Gemeinschaft.',
  },
  {
    question: 'Wie weit ist Jávea vom Flughafen Alicante?',
    answer: 'Jávea liegt etwa 90-100 km nördlich von Alicante. Die Fahrtzeit beträgt etwa 1,5 Stunden. Es ist weiter als Torrevieja, aber die schöne Fahrt ist es wert.',
  },
  {
    question: 'Ist Jávea gut für Rentner?',
    answer: 'Ja, absolut. Jávea zieht aktive, wohlhabende Rentner an, die Natur und Lifestyle bevorzugen. Die Infrastruktur für ältere Menschen ist ausgezeichnet, mit privaten Sanität und hochwertige Healthcare.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function JavaPage() {
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
            Jávea - Das Juwel der Costa Blanca Nord
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Jávea ist eine der exklusivsten und schönsten Gemeinden an der Costa Blanca. Dieser Leitfaden erzählt Ihnen alles über diese atemberaubende Küstengemeinde: von unberührten Buchten bis zu Immobilienpreisen und Lifestyle.
          </p>
        </div>

        {/* Section: Überblick */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Überblick über Jávea</h2>
          <p className="text-gray-700 mb-6">
            Jávea ist eine kleine, gehobene Gemeinde mit etwa 30.000 Einwohnern, von denen viele internationale Auswanderer sind. Sie ist berühmt für ihre atemberaubende Natur, zwei wunderschöne Buchten und hochwertige Lifestyle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Schnelle Fakten</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Einwohner: etwa 30.000</li>
                <li>Internationale Bewohner: hoch</li>
                <li>Klima: Gemäßigt Mittelmeer</li>
                <li>Sonnentage/Jahr: 2.700-2.800</li>
                <li>Entfernung Alicante: 90-100 km</li>
                <li>Charakter: Exklusiv, gehobener</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Was macht Jávea besonders</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Atemberaubende Buchten und Strände</li>
                <li>Hochwertige Restaurants und Bars</li>
                <li>Naturschönheit und Wanderwege</li>
                <li>Kosmopolitische Gemeinschaft</li>
                <li>Wassersport und Aktivitäten</li>
                <li>Diskrete, exklusive Atmosphäre</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Strände und Natur */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Strände und Natur - Das Juwel</h2>
          <p className="text-gray-700 mb-6">
            Jávea ist berühmt für zwei atemberaubende Buchten mit kristallklarem Wasser und natürlicher Schönheit.
          </p>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Playa de la Granadella</h3>
              <p className="text-gray-700 text-sm mb-3">
                Einer der schönsten Strände der Costa Blanca! Ein kleiner, geschützter Strand mit kristallklarem Wasser, umgeben von Klippen. Perfekt zum Schwimmen und Tauchen. Es gibt kleine Tavernen am Strand.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Nachteil:</strong> Begrenzte Parkplätze, kann überfüllt werden. Am besten früh morgens besuchen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Cala la Barraca</h3>
              <p className="text-gray-700 text-sm mb-3">
                Eine idyllische Bucht mit klarem Wasser und einem kleinen Strand. Weniger touristisch als Granadella, aber genauso wunderschön. Hervorragend für Schnorcheln.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Vorteil:</strong> Ruhiger, mit ausgezeichneten Restaurants am Strand.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Wanderungen und Natur</h3>
              <p className="text-gray-700 mb-3">
                Jávea ist perfekt für Wanderer. Es gibt Wege entlang der Küste mit atemberaubenden Ausblicken.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Camino de Ronda: Pfad entlang der Küste</li>
                <li>Berge hinter der Stadt mit Panoramablick</li>
                <li>Naturpark Sierra de Bernia nahe</li>
              </ul>
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
                  <p className="text-gray-700 font-semibold">Altbauten/Standard:</p>
                  <p className="text-gray-700">4.000-6.000 Euro/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Neubauten / hochwertig:</p>
                  <p className="text-gray-700">5.000-7.500 Euro/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Villen und Luxus:</p>
                  <p className="text-gray-700">7.000-15.000+ Euro/m²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Beispiel-Apartment (100 m², Neubau):</p>
                  <p className="text-gray-700">500.000-750.000 Euro</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Investitionspotenzial</h3>
              <p className="text-gray-700 mb-3">
                <strong>Mietrenditen:</strong> 3-4% pro Jahr durch hochwertige Mieter
              </p>
              <p className="text-gray-700">
                <strong>Kapitalgewinne:</strong> Bessere langfristige Wertentwicklung als Süden. Eigenschaften sind wertstabil und können über 5-10 Jahre deutlich wertvoller werden.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Beliebte Gegenden</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Zentrum (Paseo Marítimo):</strong> Nahe Hafen und Restaurants, höhere Preise</li>
                <li><strong>Granadella Bereich:</strong> Nähe zum Strand Granadella, exklusiv, sehr teuer</li>
                <li><strong>Arenal Gebiet:</strong> Strand mit Promenade, lebhaft</li>
                <li><strong>Hügel (Urbanizaciones):</strong> Villen mit Ausblick, ruhig, gehobener</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Lifestyle und Infrastruktur */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Lifestyle und Infrastruktur</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Restaurants und Gastronomie</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea ist bekannt für ausgezeichnete Restaurants, vom gehobenen bis zum lässigen. Es gibt:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Hochwertige Restaurants mit Meeresblick</li>
                <li>Traditionelle spanische Restaurants</li>
                <li>Internationale Küche (Deutsch, Italienisch, etc.)</li>
                <li>Tavernen am Strand</li>
                <li>Cafés und Bars am Hafen</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Bildung und Schulen</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Private internationale Schulen</li>
                <li>Hochwertige öffentliche Schulen</li>
                <li>Sprach-Schulen (Englisch, Deutsch)</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Gesundheit und Medizin</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Öffentliches Krankenhaus in der Nähe</li>
                <li>Hochwertige private Kliniken</li>
                <li>Deutsche, englische und französische sprechende Ärzte</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Aktivitäten und Sport</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Wassersport (Segeln, Tauchen, Windsurfen)</li>
                <li>Wanderungen und Trekking</li>
                <li>Yoga und Wellness</li>
                <li>Tennis und Padel</li>
                <li>Fahrrad fahren</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Bevölkerung und Gemeinschaft */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Bevölkerung und Gemeinschaft</h2>

          <div className="bg-warm-50 rounded-sm p-6 mb-6">
            <h3 className="font-semibold text-primary-900 mb-3">Wer lebt in Jávea</h3>
            <p className="text-gray-700 mb-3">
              Jávea zieht eine kosmopolitische Bevölkerung an: wohlhabende Unternehmer, Künstler, Rentner, Fachleute. Viele Deutsche, Briten, Skandinavier, Franzosen und Amerikaner.
            </p>
            <p className="text-gray-700 text-sm">
              Die Gemeinschaft ist eher exklusiv und diskret - weniger "Massentourismus" Atmosphäre als im Süden.
            </p>
          </div>

          <div className="border rounded-sm p-6 border-gray-200">
            <h3 className="font-semibold text-primary-900 mb-3">Deutsche Präsenz</h3>
            <p className="text-gray-700 text-sm mb-3">
              Es gibt eine etablierte deutsche Gemeinschaft in Jávea, aber kleiner als im Süden. Deutsche Netzwerke, Clubs und sogar deutsche Restaurants existieren.
            </p>
            <p className="text-gray-700 text-sm">
              Der Ton ist eher gehobener und weniger "Expat-Community"-orientiert.
            </p>
          </div>
        </section>

        {/* Section: Jahreszeiten */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Klima und Jahreszeiten</h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Klima</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea hat ein gemäßigteres Mittelmeerklima als der Süden, mit etwas kälter Winter und mehr Regen.
              </p>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Winter (Jan):</span>
                  <span className="font-semibold">9-16°C</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Sommer (Jul):</span>
                  <span className="font-semibold">22-29°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonnentage/Jahr:</span>
                  <span className="font-semibold">2.700-2.800</span>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Beste Reisezeiten</h3>
              <p className="text-gray-700 text-sm">
                <strong>Mai-Juni:</strong> Perfekt - warm, aber nicht zu heiß
              </p>
              <p className="text-gray-700 text-sm">
                <strong>September-Oktober:</strong> Noch warm, weniger Touristen
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Winter:</strong> Mild, ruhig, perfekt für Wanderungen
              </p>
            </div>
          </div>
        </section>

        {/* Section: Tipps */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Tipps für Käufer in Jávea</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Besichtigung in verschiedenen Jahreszeiten</h3>
              <p className="text-gray-700 text-sm">
                Besuchen Sie Jávea mehrmals - im Sommer und in der Nebensaison, um beide Seiten zu sehen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Lage ist wichtig</h3>
              <p className="text-gray-700 text-sm">
                In Jávea bestimmt die Lage alles. Nähe zu Granadella, zum Zentrum oder zu Bergen macht einen großen Unterschied.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Meerblick lohnt sich</h3>
              <p className="text-gray-700 text-sm">
                Jávea mit Meerblick ist teuer, aber der Blick auf die Buchten ist unbezahlbar. Es lohnt sich für die Lebensqualität.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Wählen Sie qualitativ hochwertig</h3>
              <p className="text-gray-700 text-sm">
                In Jávea gibt es sehr hochwertige neue Projekte. Investieren Sie in bekannte Entwickler und hochwertige Materialien.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Erleben Sie das Leben vor dem Kauf</h3>
              <p className="text-gray-700 text-sm">
                Mieten Sie sich in ein Apartment und verbringen Sie ein paar Wochen. So wissen Sie sicher, ob Jávea zu Ihnen passt.
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
          <h2 className="text-2xl font-light mb-4">Träumen Sie von Jávea?</h2>
          <p className="mb-6 text-gray-100">
            Wir haben eine handverlesene Auswahl an hochwertigen Neubauten in den besten Lagen von Jávea. Lassen Sie uns Ihnen helfen.
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
