import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/kaufprozess`

export const metadata: Metadata = {
  title: 'Kaufprozess in Spanien - Der komplette Guide',
  description: 'Vollständiger Leitfaden zum Immobilienkaufprozess in Spanien. Schritt-für-Schritt Erklärungen, Dokumentation und Tipps für deutsche Käufer.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/buying-process`,
      sv: `${baseUrl}/se/guides/kopprocessen`,
      nl: `${baseUrl}/nl/guides/koopproces`,
      'nl-BE': `${baseUrl}/nl-be/guides/koopproces`,
      fr: `${baseUrl}/fr/guides/processus-achat`,
      no: `${baseUrl}/no/guides/kjopsprosessen`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/buying-process`,
    },
  },
  openGraph: {
    title: 'Kaufprozess in Spanien - Der komplette Guide',
    description: 'Vollständiger Leitfaden zum Immobilienkaufprozess in Spanien',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Kaufprozess in Spanien', url: currentUrl },
]

const faqs = [
  {
    question: 'Wie lange dauert der Kaufprozess in Spanien durchschnittlich?',
    answer: 'Der Kaufprozess in Spanien dauert typischerweise zwischen 3 und 6 Monaten. Der genaue Zeitrahmen hängt von verschiedenen Faktoren ab, wie z.B. der Finanzierungsgenehmigung, der Grundstückschecks und dem Notariatsverfahren. Bei unkomplizierten Barkäufen kann es schneller gehen.',
  },
  {
    question: 'Welche Dokumentation benötige ich als deutscher Käufer?',
    answer: 'Sie benötigen folgende Dokumente: gültiger Pass oder Personalausweis, NIE-Nummer, Finanzierungsbestätigung von Ihrer Bank, Nachweis des Kundengeldes, beglaubigte Kopie Ihres Personalausweises und eine Eröffnungsbescheinigung vom Finanzamt. Weitere Dokumente können vom Notar angefordert werden.',
  },
  {
    question: 'Wer trägt die Notarkosten bei einem Immobilienkauf?',
    answer: 'Die Notarkosten in Spanien belaufen sich normalerweise auf etwa 1,5-2% des Kaufpreises. Traditionell trägt der Käufer die Notarkosten, doch die genaue Aufteilung ist verhandelbar. Dies sollte im Angebot oder im Kaufvertrag festgehalten werden.',
  },
  {
    question: 'Muss ich die NIE-Nummer vor dem Kaufprozess haben?',
    answer: 'Es wird dringend empfohlen, die NIE-Nummer vor Beginn des Kaufprozesses zu erwerben. Sie ist erforderlich für die Eröffnung eines Bankkontos, die Unterzeichnung des Kaufvertrags und später für Finanzamt-Angelegenheiten.',
  },
  {
    question: 'Kann ich den Kaufvertrag ohne einen spanischen Anwalt unterzeichnen?',
    answer: 'Es ist nicht legal erforderlich, einen Anwalt zu haben, wenn Sie den Notar haben, aber es wird dringend empfohlen. Ein spanischer Anwalt schützt Ihre Interessen, überprüft alle Dokumente, prüft Eigentumsrechte und vertritt Sie bei den Verhandlungen.',
  },
  {
    question: 'Wie funktioniert die Bankfinanzierung für ausländische Käufer in Spanien?',
    answer: 'Spanische Banken wie Deutsche Bank, Commerzbank und lokale Sparkassen bieten Hypotheken an. Normalerweise erhalten Sie 70-80% des Kaufpreises finanziert. Sie benötigen Einkommen-Nachweise, Bonität-Checks und meist einen Kontoauszug über 3 Monate.',
  },
  {
    question: 'Was passiert bei der Unterzeichnung des Kaufvertrags?',
    answer: 'Der Notar erklärt den Vertrag, überprüft alle Identitäten und Dokumente. Sie unterzeichnen vor dem Notar, die Bankfinanzierung wird bestätigt, und der Kaufvertrag wird beglaubigt. Der Notar registriert die Transaktion beim Grundbuchamt.',
  },
  {
    question: 'Welche Steuern muss ich beim Immobilienkauf zahlen?',
    answer: 'Hauptsteuern sind die Grunderwerbsteuer (Impuesto de Transmisiones Patrimoniales - ITP) von 6-10% und die VAT (IVA) von 10% auf Neubauten. Hinzu kommen Notarkosten und möglicherweise Grundbuchgebühren. Ein Anwalt kann die genauen Kosten berechnen.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function KaufprozessPage() {
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
            Kaufprozess in Spanien
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Der Immobilienkauf in Spanien folgt einem strukturierten Prozess, der sich von deutschen Praktiken unterscheidet. Dieser umfassende Leitfaden führt Sie Schritt für Schritt durch den kompletten Kaufprozess und erklärt alle notwendigen Dokumentationen, Kosten und Verfahrensschritte.
          </p>
        </div>

        {/* Section: Vorbereitung */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Vorbereitung zum Immobilienkauf</h2>
          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">1. NIE-Nummer beschaffen</h3>
              <p className="text-gray-700 mb-3">
                Die spanische Identifikationsnummer (NIE - Número de Identidad de Extranjero) ist erforderlich für alle rechtlichen und finanziellen Transaktionen. Sie können die NIE-Nummer bei der Polizía Nacional oder beim Finanzamt erwerben. Für deutsche Staatsangehörige ist dies einer der ersten Schritte.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">2. Finanzierung klären</h3>
              <p className="text-gray-700 mb-3">
                Kontaktieren Sie deutsche oder spanische Banken wie Deutsche Bank, Commerzbank oder lokale Sparkassen. Diese bieten spezialisierte Produkte für Immobilienkäufer an. Besorgen Sie sich eine Finanzierungszusage oder Bestätigung Ihrer Barmittel.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">3. Rechtliche Beratung einholen</h3>
              <p className="text-gray-700 mb-3">
                Beauftragen Sie einen spanischen Anwalt oder Gestalter (Gestor) mit Erfahrung bei ausländischen Käufern. Diese Fachperson wird Sie durch alle rechtlichen Aspekte führen und sicherstellen, dass alle Dokumentationen korrekt sind.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Verhandlung und Angebot */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Verhandlung und Angebot</h2>
          <p className="text-gray-700 mb-6">
            Nach der Besichtigung einer Immobilie, die Ihnen gefällt, unterbreiten Sie ein schriftliches Angebot. In Spanien ist es üblich, zunächst unter dem geforderten Preis zu bieten. Der Verkäufer kann akzeptieren, ablehnen oder eine Gegenofferte machen.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Reservierungsvertrag:</strong> Wird das Angebot akzeptiert, unterzeichnen Sie normalerweise einen Reservierungsvertrag, der Ihre Absicht zum Kauf zeigt. Dies ist rechtlich bindend und enthält die Bedingung, dass Sie die Finanzierung genehmigen lassen müssen.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Finanzierungsvorbehalt:</strong> Der Vertrag sollte einen Finanzierungsvorbehalt enthalten, falls Sie von einer Hypothek abhängen. Dies schützt Sie, falls die Bank Ihre Anfrage ablehnt.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Kaufvertrag */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Notarieller Kaufvertrag (Escritura de Compraventa)</h2>
          <p className="text-gray-700 mb-6">
            Der Hauptkaufvertrag ist ein notarieller Akt, der beim spanischen Notar (Notario) unterzeichnet wird. Dies ist ein öffentliches Dokument, das die Eigentumsübertragung amtlich bestätigt.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6">
              <h4 className="font-semibold text-primary-900 mb-2">Notarieller Prozess:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Der Notar erklärt den Vertrag in Ihrer Anwesenheit</li>
                <li>Alle Parteien (Käufer, Verkäufer, Makler) sind präsent</li>
                <li>Identitäten werden überprüft und Unterlagen kontrolliert</li>
                <li>Der Kaufvertrag wird unterzeichnet und beglaubigt</li>
                <li>Der Notar registriert die Eigentumsübertragung beim Grundbuchamt</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Zahlung und Finanzierung */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Zahlung und Hypothek</h2>
          <p className="text-gray-700 mb-6">
            Die Zahlung erfolgt normalerweise direkt nach der notariellen Unterzeichnung. Wenn Sie eine Hypothek haben, überweist die Bank den Betrag direkt an den Verkäufer.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Hypothekenfinanzierung</h3>
              <p className="text-gray-700 mb-3">
                Spanische Banken gewähren normalerweise 70-80% des Kaufpreises. Häufige Kreditgeber sind:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Deutsche Bank</strong> - Spezialisiert auf Kunden im Ausland</li>
                <li><strong>Commerzbank</strong> - Internationale Hypotheken</li>
                <li><strong>Sparkasse</strong> - Regionale und lokale Finanzierungen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Nach der Unterzeichnung */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Nach der Unterzeichnung</h2>
          <p className="text-gray-700 mb-6">
            Nach der notariellen Unterzeichnung müssen Sie mehrere administrative Schritte abschließen:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-2">
                <strong>Eigentumsregistrierung:</strong> Der Notar registriert das Eigentum beim spanischen Grundbuchamt (Registro de la Propiedad). Dies wird normalerweise 4-6 Wochen nach der Unterzeichnung abgeschlossen.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-2">
                <strong>Finanzamtsanmeldung:</strong> Sie müssen sich beim Finanzamt (Hacienda) anmelden und ein Steuerkonto eröffnen. Dies ist erforderlich für zukünftige Steuerfragen.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-2">
                <strong>Gemeindeanmeldung:</strong> Melden Sie sich bei der lokalen Gemeinde (Ayuntamiento) an, besonders wenn Sie die Immobilie als Hauptwohnsitz nutzen möchten.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-2">
                <strong>Nebenkosten einrichten:</strong> Melden Sie sich für Wasser-, Strom- und Gasversorgung an, abhängig von der Immobilie.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Kosten und Gebühren */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Kostendarstellung</h2>
          <p className="text-gray-700 mb-6">
            Der Kaufpreis ist nur ein Teil der Gesamtkosten. Hier ist ein Überblick über die zusätzlichen Ausgaben:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 font-semibold text-primary-900">Kostenart</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Prozentsatz</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Hinweise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Notarkosten</td>
                  <td className="px-4 py-3">1,5-2%</td>
                  <td className="px-4 py-3">Normalerweise vom Käufer bezahlt</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Grunderwerbsteuer (ITP)</td>
                  <td className="px-4 py-3">6-10%</td>
                  <td className="px-4 py-3">Variiert je nach Region</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">VAT (IVA) auf Neubauten</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Nur für neue Gebäude</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Grundbuchgebühren</td>
                  <td className="px-4 py-3">0,1-0,2%</td>
                  <td className="px-4 py-3">Für Registrierung erforderlich</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Vermögenssteuer (jährlich)</td>
                  <td className="px-4 py-3">0,4-1,1%</td>
                  <td className="px-4 py-3">Basierend auf Immobilienwert</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Doppelbesteuerungsabkommen */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Doppelbesteuerungsabkommen Deutschland-Spanien</h2>
          <p className="text-gray-700 mb-6">
            Deutschland und Spanien haben ein Doppelbesteuerungsabkommen, das verhindert, dass Sie als deutscher Resident doppelt besteuert werden. Dies ist besonders wichtig für Einnahmen aus der Immobilie (z.B. Mieteinnahmen) und Kapitalgewinne.
          </p>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">Wichtige Punkte:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Einkünfte werden in Spanien besteuert, wenn die Immobilie dort liegt</li>
              <li>Deutschland befreit diese Einkünfte von Besteuerung</li>
              <li>Sie können sich bei der deutschen Steuer anrechnen lassen</li>
              <li>Kapitalgewinne fallen üblicherweise im Land der Immobilie an</li>
            </ul>
          </div>
        </section>

        {/* Section: Checkliste */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Kaufprozess-Checkliste</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">NIE-Nummer beantragen und erhalten</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Finanzierungszusage von Bank einholen</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Anwalt oder Gestor beauftragen</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Schriftliches Angebot unterbreiten</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Reservierungsvertrag unterzeichnen</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Beim Notar unterzeichnen (Escritura)</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Zahlung an Verkäufer durchführen</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Eigentumsregistrierung beim Grundbuchamt</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Bei Finanzamt anmelden</span>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span className="text-gray-700">Nebenkosten einrichten</span>
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
          <h2 className="text-2xl font-light mb-4">Benötigen Sie Hilfe beim Kaufprozess?</h2>
          <p className="mb-6 text-gray-100">
            Kontaktieren Sie unser Team für professionelle Unterstützung bei jedem Schritt des Immobilienkaufs in Spanien.
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
