import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/schluesselfertig-vs-planverkauf`

export const metadata: Metadata = {
  title: 'Schlüsselfertig vs. Planverkauf - Vollständiger Vergleich',
  description: 'Guide zum Unterschied zwischen schlüsselfertigen Immobilien und Planverkauf in Spanien. Vor- und Nachteile, Risiken und beste Wahl für Sie.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/key-ready-vs-off-plan`,
      sv: `${baseUrl}/se/guides/key-ready-vs-off-plan`,
      nl: `${baseUrl}/nl/guides/kant-en-klaar-vs-ritning`,
      'nl-BE': `${baseUrl}/nl-be/guides/kant-en-klaar-vs-ritning`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/innflyttingsklar-tegning`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/key-ready-vs-off-plan`,
    },
  },
  openGraph: {
    title: 'Schlüsselfertig vs. Planverkauf',
    description: 'Vergleich zwischen schlüsselfertigen und Off-Plan Immobilien in Spanien',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Schlüsselfertig vs. Planverkauf', url: currentUrl },
]

const faqs = [
  {
    question: 'Was bedeutet "Schlüsselfertig" (Key Ready)?',
    answer: 'Eine schlüsselfertige Immobilie ist vollständig fertiggestellt und bezugsbereit. Sie erhalten die Schlüssel, betreten die Immobilie und können sofort einziehen oder vermieten. Sie muss keine Arbeiten durchführen.',
  },
  {
    question: 'Was bedeutet "Planverkauf" (Off-Plan)?',
    answer: 'Planverkauf bedeutet, dass Sie die Immobilie noch während der Planung oder Konstruktion kaufen. Sie kaufen basierend auf Plänen und Renderings, nicht eine fertige Immobilie. Die Konstruktion erfolgt nach Ihrem Kauf.',
  },
  {
    question: 'Welche Option ist sicherer?',
    answer: 'Schlüsselfertige Immobilien sind sicherer, da Sie sehen, was Sie bekommen. Sie können die fertige Immobilie besichtigen. Planverkauf hat mehr Risiken, da Sie vertrauen müssen, dass alles wie geplant fertig wird.',
  },
  {
    question: 'Ist Planverkauf billiger?',
    answer: 'Oft ja. Planverkauf bietet normalerweise niedrigere Preise, da Sie früher kaufen und das Risiko des Bauherrn mittragen. Schlüsselfertige Immobilien sind teurer, da die Kosten der Fertigstellung bereits eingerechnet sind.',
  },
  {
    question: 'Kann ich einen Planverkauf noch anpassen?',
    answer: 'Ja, das ist ein großer Vorteil. Beim Planverkauf können Sie oft Materialien, Farben, Layouts und Ausstattungen anpassen, bevor die Konstruktion beginnt oder voranschreitet.',
  },
  {
    question: 'Wie lange dauert ein Planverkauf bis zur Fertigstellung?',
    answer: 'Die Konstruktion dauert normalerweise 12-24 Monate, je nach Projekt. Sie zahlen Raten während der Konstruktion. Schlüsselfertige Immobilien sind sofort verfügbar.',
  },
  {
    question: 'Kann ich eine schlüsselfertige Immobilie noch personalisieren?',
    answer: 'Begrenzt. Sie müssen die Immobilie akzeptieren, wie sie ist. Kosmetische Anpassungen (Streichen, Dekoration) sind möglich, aber größere Änderungen erfordern Renovierungen auf Ihre Kosten.',
  },
  {
    question: 'Welche Option ist für Erstkäufer besser?',
    answer: 'Für Erstkäufer ist schlüsselfertig sicherer und einfacher. Sie sehen die Immobilie vollständig und wissen genau, was sie bekommen. Planverkauf erfordert mehr Vertrauen und Finanzplanung über längere Zeiträume.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function SchluesselfertigVsPlanverkauf() {
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
            Schlüsselfertig vs. Planverkauf
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bei Neubauten in Spanien haben Sie die Wahl zwischen schlüsselfertigen Immobilien und Planverkauf. Dieser Guide erklärt die Unterschiede, Vor- und Nachteile jeder Option.
          </p>
        </div>

        {/* Section: Definitionen */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Definitionen und Unterschiede</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Schlüsselfertig (Key Ready)</h3>
              <p className="text-gray-700 mb-4">
                Die Immobilie ist vollständig fertiggestellt und bezugsbereit. Sie können sofort die Schlüssel abholen und einziehen oder vermieten.
              </p>
              <div className="bg-gray-50 rounded-sm p-4 text-sm">
                <p className="text-gray-700 font-semibold mb-2">Verfügbarkeit:</p>
                <p className="text-gray-700">Sofort, innerhalb weniger Wochen</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Planverkauf (Off-Plan)</h3>
              <p className="text-gray-700 mb-4">
                Sie kaufen die Immobilie während der Planung oder Konstruktion. Sie basieren auf Plänen und Renderings, nicht auf einer fertigen Immobilie.
              </p>
              <div className="bg-gray-50 rounded-sm p-4 text-sm">
                <p className="text-gray-700 font-semibold mb-2">Verfügbarkeit:</p>
                <p className="text-gray-700">12-24 Monate nach Kauf</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Schlüsselfertig */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Schlüsselfertig (Key Ready)</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Vorteile</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Sie sehen die Immobilie vollständig fertig</li>
                <li>Sie wissen genau, was Sie bekommen</li>
                <li>Sofortige Verfügbarkeit</li>
                <li>Keine Überraschungen während der Konstruktion</li>
                <li>Sie können sofort einziehen oder vermieten</li>
                <li>Weniger Risiko und Komplexität</li>
                <li>Finanzierung und Kauf geschehen schnell</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Nachteile</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Normalerweise teurer als Planverkauf</li>
                <li>Keine oder begrenzte Anpassungsmöglichkeiten</li>
                <li>Sie müssen die Immobilie akzeptieren, wie sie ist</li>
                <li>Weniger Preisverhandlungsspielraum</li>
                <li>Die beste Auswahl könnte schon verkauft sein</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Idealerweise für...</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Käufer, die schnell einziehen möchten</li>
                <li>Erstkäufer, die Sicherheit wollen</li>
                <li>Investoren, die sofort vermieten möchten</li>
                <li>Menschen, die Unsicherheit vermeiden wollen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Planverkauf */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Planverkauf (Off-Plan)</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Vorteile</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Normalerweise günstiger als schlüsselfertig</li>
                <li>Umfangreiche Anpassungsmöglichkeiten</li>
                <li>Sie können Materialien, Farben, Layouts wählen</li>
                <li>Bessere Preisverhandlungsmöglichkeiten</li>
                <li>Sie schaffen die Immobilie nach Ihren Wünschen</li>
                <li>Normalerweise bessere Lage und Auswahlmöglichkeiten</li>
                <li>Möglichkeit, später zu verkaufen, bevor die Immobilie fertig ist</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Nachteile</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Wartezeit von 12-24 Monaten</li>
                <li>Zahlungen während der Konstruktion notwendig</li>
                <li>Risiko von Bauverzögerungen</li>
                <li>Mögliche Mängel während der Konstruktion</li>
                <li>Abhängigkeit von Bauunternehmen und Marktkonditionen</li>
                <li>Sie sehen die fertige Immobilie nicht vorher</li>
                <li>Komplexere Finanzierung und Prozesse</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Idealerweise für...</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Käufer, die Zeit haben und sparen möchten</li>
                <li>Menschen mit spezifischen Wünschen</li>
                <li>Investoren mit Geduld und langfristiger Perspektive</li>
                <li>Käufer, die ein Projekt vom Anfang mitgestalten möchten</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Zahlungsprozess */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Zahlungsprozess</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Schlüsselfertig - Zahlungsplan</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Reservierung</span>
                  <span className="font-semibold">5-10%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Beim Kaufvertrag</span>
                  <span className="font-semibold">30-40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Beim notariellen Abschluss</span>
                  <span className="font-semibold">50-65%</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-3">
                Die Zahlungen erfolgen innerhalb von wenigen Wochen bis Monaten.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Planverkauf - Zahlungsplan</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Reservierung</span>
                  <span className="font-semibold">5-10%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Beim Kaufvertrag</span>
                  <span className="font-semibold">20-30%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Während der Konstruktion (mehrere Zahlungen)</span>
                  <span className="font-semibold">30-40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Beim notariellen Abschluss</span>
                  <span className="font-semibold">30-40%</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-3">
                Die Zahlungen erfolgen über 12-24 Monate verteilt (normalerweise alle 3-6 Monate).
              </p>
            </div>
          </div>
        </section>

        {/* Section: Risiken */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Risiken und Schutzmaßnahmen</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-sm p-6">
              <h3 className="font-semibold text-red-700 mb-3">Planverkauf-Risiken</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Bauverzögerungen (können Monate dauern)</li>
                <li>Qualitätsmängel während der Konstruktion</li>
                <li>Finanzielle Schwierigkeiten des Bauherrn</li>
                <li>Änderungen in Materialien oder Spezifikationen</li>
                <li>Marktrückgang könnte Ihr Objekt entwerten</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Schutzmaßnahmen beim Planverkauf</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Beauftragen Sie einen erfahrenen Anwalt</li>
                <li>Stellen Sie sicher, dass alle Zahlungen auf einem Treuhandkonto liegen</li>
                <li>Überprüfen Sie die Bonität und Reputation des Bauherrn</li>
                <li>Erhalten Sie regelmäßige Baufortschrittsberichte</li>
                <li>Führen Sie regelmäßige Besichtigungen durch</li>
                <li>Stellen Sie sicher, dass alle Vereinbarungen schriftlich festgehalten sind</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Finanzielle Unterschiede */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Finanzielle Unterschiede</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Preisvergleich - Beispiel 300.000 Euro</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 font-semibold mb-2">Schlüsselfertig:</p>
                  <p className="text-gray-700">300.000 Euro Kaufpreis</p>
                  <p className="text-gray-700">Nebenkosten: etwa 24.000-30.000 Euro (8-10%)</p>
                  <p className="text-gray-700 font-semibold mt-2">Gesamtkosten: 324.000-330.000 Euro</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-700 font-semibold mb-2">Planverkauf (normalerweise günstiger):</p>
                  <p className="text-gray-700">270.000 Euro Kaufpreis (10% Rabatt)</p>
                  <p className="text-gray-700">Nebenkosten: etwa 21.600-27.000 Euro (8-10%)</p>
                  <p className="text-gray-700 font-semibold mt-2">Gesamtkosten: 291.600-297.000 Euro</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-6 border-t pt-4">
                In diesem Beispiel spart man durch Planverkauf etwa 30.000-40.000 Euro, wartet aber 12-24 Monate.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Vergleichstabelle */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Vergleichstabelle</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 font-semibold text-primary-900">Aspekt</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Schlüsselfertig</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Planverkauf</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Verfügbarkeit</td>
                  <td className="px-4 py-3">Sofort (wenige Wochen)</td>
                  <td className="px-4 py-3">12-24 Monate</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Preis</td>
                  <td className="px-4 py-3">Normalerweise höher</td>
                  <td className="px-4 py-3">Normalerweise 10-15% günstiger</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Anpassungen</td>
                  <td className="px-4 py-3">Sehr begrenzt</td>
                  <td className="px-4 py-3">Umfangreiche Optionen</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Risiko</td>
                  <td className="px-4 py-3">Sehr niedrig</td>
                  <td className="px-4 py-3">Moderat bis mittel</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Finanzierung</td>
                  <td className="px-4 py-3">Einfach, schnell</td>
                  <td className="px-4 py-3">Komplex, längerfristig</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">Besichtigung</td>
                  <td className="px-4 py-3">Vollständig, vor Kauf</td>
                  <td className="px-4 py-3">Nur Pläne und Renderings</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Ideal für</td>
                  <td className="px-4 py-3">Eilige Käufer, Sicherheit</td>
                  <td className="px-4 py-3">Geduldige, sparsame Käufer</td>
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
          <h2 className="text-2xl font-light mb-4">Unsicher, welche Option richtig ist?</h2>
          <p className="mb-6 text-gray-100">
            Unser Team kann Sie bei der Entscheidung unterstützen und beide Optionen mit Ihnen durchgehen.
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
