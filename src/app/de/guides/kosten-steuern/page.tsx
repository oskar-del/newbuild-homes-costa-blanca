import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/kosten-steuern`

export const metadata: Metadata = {
  title: 'Immobilien Kosten & Steuern Spanien - Vollständiger Guide',
  description: 'Umfassender Leitfaden zu Immobiliensteuern in Spanien: Erwerbsteuer, IVA, Grundsteuer, Steuererklärungen und Tipps zur Steueroptimierung.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/costs-taxes`,
      sv: `${baseUrl}/se/guides/kostnader-skatter`,
      nl: `${baseUrl}/nl/guides/kosten-belasting`,
      'nl-BE': `${baseUrl}/nl-be/guides/kosten-belasting`,
      fr: `${baseUrl}/fr/guides/frais-impots`,
      no: `${baseUrl}/no/guides/kostnader-skatt`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/costs-taxes`,
    },
  },
  openGraph: {
    title: 'Immobilien Kosten & Steuern Spanien',
    description: 'Vollständiger Guide zu Immobiliensteuern und Kosten beim Kauf in Spanien',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Kosten & Steuern', url: currentUrl },
]

const faqs = [
  {
    question: 'Wie viel kostet ein Immobilienkauf in Spanien zusätzlich zum Kaufpreis?',
    answer: 'Die Nebenkosten betragen normalerweise 8-15% des Kaufpreises. Dies umfasst Notarkosten (1,5-2%), Grunderwerbsteuer (6-10%), Grundbuchgebühren (0,1-0,2%) und Maklergebühren. Für Neubauten kommt zusätzlich die VAT (10%) hinzu.',
  },
  {
    question: 'Wer zahlt die Grunderwerbsteuer in Spanien?',
    answer: 'Der Käufer zahlt die Grunderwerbsteuer (Impuesto de Transmisiones Patrimoniales - ITP). Diese beträgt 6-10% des Kaufpreises und variiert je nach Region. In Andalusien sind es z.B. 7%, in Valencia 7-8%. Für Neubauten zahlt der Käufer stattdessen VAT (10%).',
  },
  {
    question: 'Was ist der Unterschied zwischen ITP und IVA?',
    answer: 'ITP (Grunderwerbsteuer) gilt für gebrauchte Immobilien und wird vom Käufer bezahlt (6-10%). IVA (Mehrwertsteuer) gilt für Neubauten und beträgt 10%. Bei Neubauten besteht die Möglichkeit, von der IVA befreit zu sein, wenn bestimmte Bedingungen erfüllt sind.',
  },
  {
    question: 'Muss ich jedes Jahr Steuern auf meine Immobilie zahlen?',
    answer: 'Ja, Sie müssen jährlich die Vermögenssteuer (Impuesto sobre Bienes Inmuebles - IBI) zahlen, die etwa 0,4-1,1% des Katasterwertes beträgt. Dies ist ähnlich wie die deutsche Grundsteuer. Zusätzlich müssen Sie eine Immobilieneinkommensteuer zahlen, wenn Sie die Immobilie vermieten.',
  },
  {
    question: 'Wie funktioniert das Doppelbesteuerungsabkommen zwischen Deutschland und Spanien?',
    answer: 'Das Abkommen verhindert, dass Sie doppelt besteuert werden. Einnahmen aus spanischen Immobilien (Mieteinnahmen) werden in Spanien besteuert. Deutschland befreit diese Einkünfte normalerweise, kann sich aber eine Steuergutschrift anrechnen lassen. Kapitalgewinne fallen üblicherweise im Land der Immobilie an.',
  },
  {
    question: 'Was kostet es, eine Immobilie in Spanien zu verkaufen?',
    answer: 'Der Verkauf kostet normalerweise 5-8% des Verkaufspreises, einschließlich Notarkosten, Grundbuchgebühren und Maklergebühren. Der Verkäufer zahlt auch Einkommensteuer auf den Kapitalgewinn (19-45%, je nach Ertrag), wenn die Immobilie nicht Ihr Hauptwohnsitz ist.',
  },
  {
    question: 'Kann ich Maklergebühren beim Hauskauf in Spanien sparen?',
    answer: 'Ja, Sie können verhandeln. In Spanien sind Maklergebühren nicht gesetzlich festgelegt. Sie liegen normalerweise bei 3-5%, können aber verhandelt werden. Für Some Properties ist auch ein direkter Verkauf (ohne Makler) möglich, was Gebühren spart.',
  },
  {
    question: 'Welche laufenden Ausgaben hat eine Immobilie in Spanien?',
    answer: 'Zu den laufenden Ausgaben gehören: die jährliche IBI-Steuer (0,4-1,1%), Gemeindegebühren (für Wohnkomplexe, 0-500+ Euro/Jahr), Versicherungen (200-500+ Euro/Jahr), Instandhaltung und Reparaturen (1-2% des Wertes pro Jahr). Bei Vermietung kommt noch die Einkommensteuer hinzu.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function KostenSteuern() {
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
            Immobilien Kosten und Steuern in Spanien
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Der Kauf einer Immobilie in Spanien bringt bedeutende Zusatzkosten mit sich. Dieser umfassende Leitfaden erklärt alle Steuern, Gebühren und laufenden Ausgaben, die Sie als deutscher Käufer wissen müssen.
          </p>
        </div>

        {/* Section: Kosten beim Kauf */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Kosten beim Immobilienkauf</h2>
          <p className="text-gray-700 mb-6">
            Wenn Sie eine Immobilie in Spanien kaufen, müssen Sie neben dem Kaufpreis verschiedene Nebenkosten einkalkulieren. Die Gesamtkosten liegen normalerweise bei 8-15% des Kaufpreises zusätzlich.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 font-semibold text-primary-900">Kostenart</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Prozentsatz/Betrag</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Zahler</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Grunderwerbsteuer (ITP)</td>
                  <td className="px-4 py-3">6-10%</td>
                  <td className="px-4 py-3">Käufer</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">VAT (IVA) - nur Neubauten</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Käufer</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Notarkosten</td>
                  <td className="px-4 py-3">1,5-2%</td>
                  <td className="px-4 py-3">Käufer (normalerweise)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Grundbuchgebühren</td>
                  <td className="px-4 py-3">0,1-0,2%</td>
                  <td className="px-4 py-3">Käufer</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Maklergebühren</td>
                  <td className="px-4 py-3">3-5%</td>
                  <td className="px-4 py-3">Käufer oder Verkäufer</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Rechtsanwaltsgebühren</td>
                  <td className="px-4 py-3">0,5-1,5%</td>
                  <td className="px-4 py-3">Käufer</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Beispielrechnung für 300.000 Euro Kaufpreis (gebrauchte Immobilie):</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Kaufpreis</span>
                <span className="font-semibold">300.000 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Grunderwerbsteuer (7%)</span>
                <span className="font-semibold">21.000 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Notarkosten (1,5%)</span>
                <span className="font-semibold">4.500 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Grundbuchgebühren (0,1%)</span>
                <span className="font-semibold">300 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Maklergebühren (3%)</span>
                <span className="font-semibold">9.000 Euro</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                <span>Gesamtnebenkosten</span>
                <span>34.800 Euro (11,6%)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Grunderwerbsteuer */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Grunderwerbsteuer (Impuesto de Transmisiones Patrimoniales)</h2>
          <p className="text-gray-700 mb-6">
            Die Grunderwerbsteuer ist die größte Steuer beim Immobilienkauf. Sie wird auf den Kaufpreis erhoben und variiert je nach Region Spaniens.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Steuersätze nach Region</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Valencia (Costa Blanca)</span>
                  <span className="font-semibold">7% / 8%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Andalusien (Costa del Sol)</span>
                  <span className="font-semibold">7% / 8%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Madrid</span>
                  <span className="font-semibold">6% / 7%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Katalonien</span>
                  <span className="font-semibold">8% / 9%</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-3">
                *Die Sätze sind staffelweise: niedrigerer Satz für die erste Tranche, höherer für zusätzliche Tranchen.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-3">
                <strong>Wichtig:</strong> Die Grunderwerbsteuer wird auf der Grundlage des höheren Wertes berechnet: entweder der tatsächliche Kaufpreis oder der geschätzte Katasterwert der Immobilie.
              </p>
            </div>
          </div>
        </section>

        {/* Section: VAT auf Neubauten */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">VAT (IVA) auf Neubauten</h2>
          <p className="text-gray-700 mb-6">
            Für neue Immobilien zahlen Sie statt der Grunderwerbsteuer die Mehrwertsteuer (VAT/IVA) von 10%.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Was ist eine "neue" Immobilie?</h3>
              <p className="text-gray-700 mb-3">
                Immobilien gelten als neu, wenn:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Sie weniger als 2 Jahre fertiggestellt sind</li>
                <li>Noch nie verkauft wurden oder vom Erbauer selbst verkauft werden</li>
                <li>Vom ursprünglichen Besitzer (Entwickler) zum Verkauf angeboten werden</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Befreiung:</strong> In bestimmten Fällen können Sie von der VAT befreit werden, z.B. wenn Sie die Immobilie als Hauptwohnsitz nutzen. Dies muss mit Ihrem Anwalt geklärt werden.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Jährliche Steuern */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Jährliche Immobiliensteuern</h2>
          <p className="text-gray-700 mb-6">
            Nachdem Sie eine Immobilie gekauft haben, müssen Sie mehrere jährliche Steuern bezahlen.
          </p>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Immobiliensteuer (Impuesto sobre Bienes Inmuebles - IBI)</h3>
              <p className="text-gray-700 mb-3">
                Die IBI ist eine jährliche Grundsteuer, ähnlich wie die deutsche Grundsteuer. Sie beträgt etwa 0,4-1,1% des Katasterwertes der Immobilie pro Jahr.
              </p>
              <div className="bg-gray-50 rounded-sm p-4">
                <p className="text-gray-700 text-sm">
                  <strong>Beispiel:</strong> Bei einer Immobilie mit Katasterwert von 250.000 Euro und Satz von 0,7% betragen die jährlichen Steuern etwa 1.750 Euro.
                </p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Vermögenssteuer (Impuesto sobre el Patrimonio)</h3>
              <p className="text-gray-700 mb-3">
                Diese Steuer gilt für Personen mit hohem Vermögen (Schwelle: ca. 600.000 Euro in Spanien). Der Steuersatz beträgt 0,2-2,5% je nach Vermögen. Viele deutsche Auswanderer müssen diese Steuer nicht zahlen, da sie unter der Schwelle liegen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Einkommensteuer auf Mieteinnahmen</h3>
              <p className="text-gray-700 mb-3">
                Wenn Sie die Immobilie vermieten, müssen Sie Einkommensteuer auf die Mieteinnahmen zahlen. Der Steuersatz ist progressiv: 19% auf die ersten 6.000 Euro, danach bis 45% für höhere Einkommen.
              </p>
              <p className="text-gray-700 text-sm">
                Sie können jedoch Betriebsausgaben (Hypotheken, Instandhaltung, Versicherungen) abziehen.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Laufende Betriebskosten */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Laufende Betriebskosten</h2>
          <p className="text-gray-700 mb-6">
            Zusätzlich zu den Steuern gibt es weitere regelmäßige Kosten für die Verwaltung einer Immobilie.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 font-semibold text-primary-900">Kostenart</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Geschätzter Betrag</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Häufigkeit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">IBI Grundsteuer</td>
                  <td className="px-4 py-3">0,4-1,1% des Wertes</td>
                  <td className="px-4 py-3">Jährlich</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Gemeinschaftsgebühren (bei Wohnkomplexen)</td>
                  <td className="px-4 py-3">0-500+ Euro/Jahr</td>
                  <td className="px-4 py-3">Monatlich/Jährlich</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Versicherung</td>
                  <td className="px-4 py-3">200-500+ Euro/Jahr</td>
                  <td className="px-4 py-3">Jährlich</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Instandhaltung</td>
                  <td className="px-4 py-3">1-2% des Wertes/Jahr</td>
                  <td className="px-4 py-3">Nach Bedarf</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Nebenkosten (Wasser, Strom)</td>
                  <td className="px-4 py-3">100-300 Euro/Monat</td>
                  <td className="px-4 py-3">Monatlich</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Verwaltungskosten</td>
                  <td className="px-4 py-3">50-150 Euro/Monat</td>
                  <td className="px-4 py-3">Monatlich</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Doppelbesteuerungsabkommen */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Doppelbesteuerungsabkommen Deutschland-Spanien</h2>
          <p className="text-gray-700 mb-6">
            Für deutsche Resident sind das Doppelbesteuerungsabkommen zwischen Deutschland und Spanien entscheidend.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Besteuerung von Einkünften</h3>
              <p className="text-gray-700 mb-3">
                Einkünfte aus spanischen Immobilien (z.B. Mieteinnahmen) werden in Spanien besteuert. Deutschland erkennt diese Besteuerung an und befreit normalerweise diese Einkünfte von deutscher Besteuerung. Dies erfolgt durch die "Anrechnung" als Steuergutschrift.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Kapitalgewinne und Verkauf</h3>
              <p className="text-gray-700 mb-3">
                Kapitalgewinne (Gewinn beim Verkauf) fallen normalerweise im Land der Immobilie an. Dies bedeutet, dass Sie Kapitalgewinnen in Spanien besteuert werden. Deutschland besteuert normalerweise nicht, da der Ort der Besteuerung vorrangig ist.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Wichtig:</strong> Konsultieren Sie einen Steuerberater mit Expertise im Doppelbesteuerungsrecht, um sicherzustellen, dass Sie korrekt versteuert sind.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Verkaufskosten */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Kosten beim Verkauf</h2>
          <p className="text-gray-700 mb-6">
            Der Verkauf einer Immobilie bringt auch eigene Kosten mit sich.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6 mb-4">
              <h3 className="font-semibold text-primary-900 mb-3">Verkaufskosten durchschnittlich 5-8%</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Maklergebühren: 3-5%</li>
                <li>Notarkosten: 1-1,5%</li>
                <li>Grundbuchgebühren: 0,1-0,2%</li>
                <li>Rechtsanwaltsgebühren (optional): 0,5-1%</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Einkommensteuer auf Kapitalgewinne</h3>
              <p className="text-gray-700 mb-3">
                Wenn Sie die Immobilie nicht als Hauptwohnsitz nutzen, müssen Sie Einkommensteuer auf den Kapitalgewinn zahlen. Der Steuersatz ist:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>19% für Gewinne bis 6.000 Euro</li>
                <li>21% für Gewinne 6.001-50.000 Euro</li>
                <li>25% für Gewinne über 50.000 Euro</li>
              </ul>
              <p className="text-gray-700 text-sm mt-3">
                *Für Nicht-Residenten beträgt die Steuer pauschal 19% des Gewinns.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Ausnahme:</strong> Wenn die Immobilie Ihr Hauptwohnsitz war, können Sie unter bestimmten Bedingungen von Kapitalgewinnsteuer befreit sein.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Tipps zur Steueroptimierung */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Tipps zur Steueroptimierung</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Professionelle Beratung einholen</h3>
              <p className="text-gray-700">
                Arbeiten Sie mit einem spanischen Steuerberater zusammen, der mit deutschen Resident vertraut ist. Dies kann erhebliche Steuereinsparungen ermöglichen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Rechnungen dokumentieren</h3>
              <p className="text-gray-700">
                Bewahren Sie alle Rechnungen für Reparaturen, Instandhaltung und Verbesserungen auf. Diese können von den Mieteinnahmen abgezogen werden.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Abschreibungen nutzen</h3>
              <p className="text-gray-700">
                Möglicherweise können Sie die Gebäude abschreiben und Teile der Immobilie als Betriebsvermögen behandeln, was Steuern spart.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Rechtzeitig bei Finanzamt anmelden</h3>
              <p className="text-gray-700">
                Registrieren Sie sich beim spanischen Finanzamt und der Gemeinde. Dies ist erforderlich und verhindert Nachzahlungen und Strafen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Über Unternehmensstrukturen nachdenken</h3>
              <p className="text-gray-700">
                In einigen Fällen kann die Gründung einer SL (spanische GmbH) für mehrere Immobilien steuerliche Vorteile bieten. Dies sollte mit einem Experten besprochen werden.
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
          <h2 className="text-2xl font-light mb-4">Benötigen Sie Hilfe bei Steuerfragen?</h2>
          <p className="mb-6 text-gray-100">
            Unser Team kann Sie mit qualifizierten Steuerberatern und Anwälten verbinden, die Ihre Situation analysieren können.
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
