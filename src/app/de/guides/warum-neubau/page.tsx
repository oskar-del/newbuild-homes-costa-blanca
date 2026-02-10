import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/warum-neubau`

export const metadata: Metadata = {
  title: 'Warum Neubau? - Vorteile von Neubauten in Spanien',
  description: 'Erfahren Sie die Vorteile von Neubauten in Spanien gegenüber Altbauten: Qualität, Energieeffizienz, moderne Standards und finanzielle Vorteile.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/why-new-build`,
      sv: `${baseUrl}/se/guides/why-new-build`,
      nl: `${baseUrl}/nl/guides/waarom-nieuwbouw`,
      'nl-BE': `${baseUrl}/nl-be/guides/waarom-nieuwbouw`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/hvorfor-nybygg`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/why-new-build`,
    },
  },
  openGraph: {
    title: 'Warum Neubau? - Vorteile von Neubauten in Spanien',
    description: 'Vollständiger Guide zu den Vorteilen von Neubauten gegenüber Altbauten',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Warum Neubau?', url: currentUrl },
]

const faqs = [
  {
    question: 'Was ist der Unterschied zwischen Neubau und Altbau?',
    answer: 'Neubauten sind neu errichtete Immobilien, die noch nie bewohnt wurden oder gerade fertiggestellt wurden. Altbauten sind bereits älter und wurden bewohnt. Der Unterschied liegt in Qualität, Garantien, modernen Standards und oft auch im Preis.',
  },
  {
    question: 'Sind Neubauten teurer als Altbauten?',
    answer: 'Nicht unbedingt. Während der Kaufpreis ähnlich sein kann, sind Neubauten oft günstiger bei den Nebenkosten (keine Sanierungen nötig, bessere Energieeffizienz). Über die Jahre können Sie mehr sparen durch niedrigere Betriebskosten.',
  },
  {
    question: 'Wie lange ist die Garantie für Neubauten?',
    answer: 'In Spanien haben Neubauten normalerweise eine 10-Jahres-Strukturgarantie (Garantía de Defectos de Construcción). Dies deckt schwerwiegende Baumängel ab. Es gibt auch kürzere Garantien für Materialien und Ausführung.',
  },
  {
    question: 'Sind Neubauten energieeffizienter?',
    answer: 'Ja, Neubauten erfüllen moderne Energiestandards (insbesondere nach EU-Richtlinien). Sie sind mit effizienten Heizungen, Isolierungen und modernen Klimaanlagen ausgestattet, was bedeutend niedrigere Energierechnungen bedeutet.',
  },
  {
    question: 'Brauche ich bei einem Neubau Renovierungen?',
    answer: 'Üblicherweise nicht. Neubauten sind bezugsfertig oder können nach Ihren Wünschen personalisiert werden, bevor Sie einziehen. Das spart Zeit und Geld im Vergleich zu Sanierungen bei Altbauten.',
  },
  {
    question: 'Gibt es Unterschiede in den Steuern zwischen Neubau und Altbau?',
    answer: 'Ja. Neubauten unterliegen der VAT (10%), Altbauten der Grunderwerbsteuer (6-10%). Die VAT auf Neubauten ist oft günstiger. Dies sollte in Ihre finanzielle Planung eingehen.',
  },
  {
    question: 'Wie sicher ist es, einen Neubau zu kaufen?',
    answer: 'Sehr sicher. Neubauten haben Strukturgarantien und werden von autorisierten Bauunternehmen errichtet. Sie müssen keine versteckten Mängel befürchten, da alles neu und überprüft ist.',
  },
  {
    question: 'Kann ich einen Neubau anpassen, bevor ich einziehe?',
    answer: 'Oft ja. Bei "Key Ready" oder "Ready to Move" Eigenschaften können Sie normalerweise noch Anpassungen vornehmen. Bei "Off Plan" Käufen können Sie größere Anpassungen während der Konstruktion vornehmen.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function WarumNeubauPage() {
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
            Warum Neubau? Vorteile von Neubauten in Spanien
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Immer mehr internationale Käufer wählen Neubauten in Spanien. Dieser Guide erklärt, warum Neubauten eine intelligente Wahl sind und welche Vorteile sie gegenüber älteren Immobilien bieten.
          </p>
        </div>

        {/* Section: Qualität und Sicherheit */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Qualität und Sicherheit</h2>
          <p className="text-gray-700 mb-6">
            Neubauten sind mit modernen Baumaterialien und Standards errichtet, was garantiert beste Qualität und Langlebigkeit.
          </p>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Strukturgarantie</h3>
              <p className="text-gray-700 mb-3">
                In Spanien haben Neubauten eine gesetzliche 10-Jahres-Strukturgarantie (Garantía Decenal). Dies ist ein großes Sicherheitsnetz für den Käufer. Die Garantie deckt:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Strukturelle Defekte (Risse, Senkungen)</li>
                <li>Dachkonstruktion und Wasserdichtheit</li>
                <li>Fundament und Tragwerk</li>
                <li>Größere Mängel in Baumaterialien</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-3">
                <strong>Wichtig:</strong> Diese Garantie ist nicht optional - sie ist gesetzlich vorgeschrieben und wird normalerweise durch eine Versicherung gedeckt.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Energieeffizienz */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Energieeffizienz und moderne Ausrüstung</h2>
          <p className="text-gray-700 mb-6">
            Neubauten erfüllen die neuesten EU-Energieeffizienzstandards und sind daher wesentlich günstiger zu betreiben.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Typische Einsparungen</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>30-50% niedrigere Heizkosten</li>
                <li>40-60% niedrigere Kühlkosten</li>
                <li>Solar- und Wärmepumpen</li>
                <li>LED-Beleuchtung überall</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Moderne Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Doppelverglasung und Wärmeschutz</li>
                <li>Effiziente Luftsysteme</li>
                <li>Intelligente Hausautomation</li>
                <li>Moderne Sanitäranlagen</li>
              </ul>
            </div>
          </div>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Langfristige Kostenersparnis</h3>
            <p className="text-gray-700">
              Während Sie möglicherweise etwas mehr für den Neubau zahlen, sparen Sie signifikant bei den laufenden Betriebskosten. Ein Neubau mit guter Energieeffizienz kann Ihnen über 20 Jahre tausende Euro sparen.
            </p>
          </div>
        </section>

        {/* Section: Keine Renovierungen */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Keine notwendigen Renovierungen</h2>
          <p className="text-gray-700 mb-6">
            Bei älteren Immobilien sind Renovierungen oft notwendig - und teuer. Neubauten sind bezugsfertig und sparen Ihnen Zeit und Geld.
          </p>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">Typische Kosten bei Altbauten</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Dacharbeiten: 5.000-15.000 Euro</li>
                <li>Elektrik modernisieren: 3.000-8.000 Euro</li>
                <li>Wasserleitungen: 2.000-5.000 Euro</li>
                <li>Fachwerk/Struktur: 10.000-50.000+ Euro</li>
                <li>Fenster und Türen: 3.000-10.000 Euro</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                Bei größeren älteren Immobilien können Renovierungen leicht 20-50% des Kaufpreises übersteigen. Mit einem Neubau vermeiden Sie alle diese Überraschungen.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Finanzielle Vorteile */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Finanzielle Vorteile</h2>
          <p className="text-gray-700 mb-6">
            Neubauten bieten mehrere finanzielle Vorteile gegenüber Altbauten.
          </p>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Steuern und Gebühren</h3>
              <p className="text-gray-700 mb-3">
                <strong>VAT vs. Grunderwerbsteuer:</strong> Neubauten unterliegen der VAT (10%), während Altbauten der höheren Grunderwerbsteuer (6-10%) unterliegen. In vielen Fällen ist VAT günstiger und Sie können unter bestimmten Bedingungen Befreiungen erhalten.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Hypotheken</h3>
              <p className="text-gray-700 mb-3">
                Banken bieten oft bessere Konditionen für Neubauten. Das Kreditrisiko ist geringer, da die Immobilie neu und wertstabil ist.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Wertentwicklung</h3>
              <p className="text-gray-700 mb-3">
                Neubauten in beliebten Lagen halten ihren Wert besser. Sie müssen nicht mit Altersabschreibungen rechnen, die bei älteren Immobilien eintreten.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Versicherung und Garantie</h3>
              <p className="text-gray-700 mb-3">
                Versicherungsprämien für Neubauten sind oft niedrig, da das Risiko geringer ist. Die 10-Jahres-Strukturgarantie ist im Kaufpreis enthalten.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Moderne Ausstattung */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Moderne Ausstattung und Design</h2>
          <p className="text-gray-700 mb-6">
            Neubauten sind mit aktuellen Designs, Materialien und Ausstattungen ausgestattet.
          </p>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">Standards beim Neubau</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Moderne Küchen mit hochwertigen Geräten</li>
                <li>Zeitgenössisches Bad-Design</li>
                <li>Offene, helle Grundrisse</li>
                <li>Hochwertige Bodenbeläge und Finish</li>
                <li>Klimatisierung und Heizung integriert</li>
                <li>Smart-Home-Vorbereitung</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                Neubauten reflektieren aktuelle internationale Designtrends und entsprechen modernen Lebensstilen. Altbauten müssen oft grundlegend umgestaltet werden, um modern zu wirken.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Anpassungsmöglichkeiten */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Anpassungsmöglichkeiten und Flexibilität</h2>
          <p className="text-gray-700 mb-6">
            Bei Neubau-Projekten haben Sie oft die Möglichkeit, die Immobilie nach Ihren Wünschen anzupassen.
          </p>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Off-Plan Käufe</h3>
              <p className="text-gray-700 mb-3">
                Wenn Sie "Off-Plan" (noch nicht fertig) kaufen, können Sie oft:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Bodenlayout-Optionen wählen</li>
                <li>Materialien und Farben auswählen</li>
                <li>Zusatzausstattungen hinzufügen</li>
                <li>Besondere Anforderungen einbringen</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Schlüsselfertige Immobilien</h3>
              <p className="text-gray-700 mb-3">
                Auch bei fertigen Immobilien können Sie oft noch kosmetische Anpassungen vornehmen. Dies ist flexibler als bei Altbauten mit fester Struktur.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Umwelt und Nachhaltigkeit */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Umwelt und Nachhaltigkeit</h2>
          <p className="text-gray-700 mb-6">
            Neubauten erfüllen hohe Umweltstandards und sind nachhaltiger.
          </p>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">Nachhaltige Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Solar-Panels und erneuerbare Energien</li>
                <li>Regenwassersammelsysteme</li>
                <li>Natürliche Materialien und Ressourceneffizienz</li>
                <li>Effiziente Wassertechnologie</li>
                <li>Niedrige CO2-Emissionen</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                Wenn Ihnen Nachhaltigkeit wichtig ist, sind Neubauten die bessere Wahl. Sie können stolz sein, in einer energieeffizienten und umweltfreundlichen Immobilie zu leben.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Vergleich */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Neubau vs. Altbau - Vergleich</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 font-semibold text-primary-900">Aspekt</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Neubau</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Altbau</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Qualität</td>
                  <td className="px-4 py-3">Garantiert modern</td>
                  <td className="px-4 py-3">Variabel, oft älter</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Garantie</td>
                  <td className="px-4 py-3">10 Jahre Struktur</td>
                  <td className="px-4 py-3">Keine Garantie</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Energieverbrauch</td>
                  <td className="px-4 py-3">Effizient, niedrig</td>
                  <td className="px-4 py-3">Oft hoch</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Renovierungen</td>
                  <td className="px-4 py-3">Keine erforderlich</td>
                  <td className="px-4 py-3">Oft notwendig</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Steuern</td>
                  <td className="px-4 py-3">VAT 10%</td>
                  <td className="px-4 py-3">ITP 6-10%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Wertentwicklung</td>
                  <td className="px-4 py-3">Stabil, wertsicher</td>
                  <td className="px-4 py-3">Älter = weniger Wert</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Design</td>
                  <td className="px-4 py-3">Modern, aktuell</td>
                  <td className="px-4 py-3">Veraltet, änderbar</td>
                </tr>
              </tbody>
            </table>
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
          <h2 className="text-2xl font-light mb-4">Interessiert an Neubauten an der Costa Blanca?</h2>
          <p className="mb-6 text-gray-100">
            Wir haben eine große Auswahl an hochwertigen Neubauten. Kontaktieren Sie uns, um mehr zu erfahren.
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
