import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/hypothek`

export const metadata: Metadata = {
  title: 'Hypotheken in Spanien - Guide für Deutsche Käufer',
  description: 'Vollständiger Guide zu Hypotheken in Spanien: Banken, Konditionen, Prozess und Tipps für deutsche Käufer. Deutsche Bank, Commerzbank, Sparkasse.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/mortgages`,
      sv: `${baseUrl}/se/guides/bolan-spanien`,
      nl: `${baseUrl}/nl/guides/hypotheek`,
      'nl-BE': `${baseUrl}/nl-be/guides/hypotheek`,
      fr: `${baseUrl}/fr/guides/hypotheque`,
      no: `${baseUrl}/no/guides/boliglan`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/mortgages`,
    },
  },
  openGraph: {
    title: 'Hypotheken in Spanien - Guide für Deutsche Käufer',
    description: 'Umfassender Guide zu Hypotheken und Immobilienfinanzierung in Spanien',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'Hypotheken', url: currentUrl },
]

const faqs = [
  {
    question: 'Können deutsche Bürger eine Hypothek in Spanien bekommen?',
    answer: 'Ja, deutsche Bürger können in Spanien eine Hypothek bekommen. Deutsche Banken wie Deutsche Bank und Commerzbank sowie lokale spanische Banken bieten spezialisierte Produkte an. Sie benötigen eine NIE-Nummer, Nachweis des Einkommens und eine gute Kredithistorie.',
  },
  {
    question: 'Wie viel kann ich mir in Spanien leihen?',
    answer: 'Spanische Banken finanzieren normalerweise 70-80% des Kaufpreises, in manchen Fällen bis zu 90%. Der genaue Betrag hängt von Ihrem Einkommen, Ihrer Kredithistorie und der Immobilie ab. Banken prüfen üblicherweise, dass die Hypothekenrate nicht mehr als 35-40% Ihres monatlichen Einkommens beträgt.',
  },
  {
    question: 'Was sind typische Zinssätze für Hypotheken in Spanien?',
    answer: 'Die Zinssätze in Spanien sind derzeit (2026) zwischen 3,5-5,5% p.a., abhängig vom Zeitraum und der Bank. Spanische Banken bieten üblicherweise Euribor + Marge (normalerweise 0,5-2%) als variabler Satz oder einen festen Satz. Die Konditionen hängen von Ihrer persönlichen Situation ab.',
  },
  {
    question: 'Wie lange dauert der Hypotheken-Genehmigungsprozess?',
    answer: 'Der Prozess dauert normalerweise 4-8 Wochen. Nach Antragstellung benötigt die Bank Zeit für Dokumentenprüfung, Immobilienbewertung, Kreditwürdigkeitsprüfung und Genehmigung. Eine schnellere Genehmigung ist möglich, wenn alle Dokumente sofort verfügbar sind.',
  },
  {
    question: 'Welche Dokumente benötige ich für eine Hypothek?',
    answer: 'Sie benötigen: gültigen Pass/Personalausweis, NIE-Nummer, die letzten 3-6 Monate Kontoauszüge, Einkommensnachweise (Steuererklärungen, Lohnzettel), Arbeitgeberbestätigung, Nachweis der Kredithistorie und Details zur Immobilie (Kaufvertrag, Immobilienbewertung).',
  },
  {
    question: 'Kann ich eine Hypothek mit variable oder fester Rate bekommen?',
    answer: 'Ja, Spanische Banken bieten beide an. Variable Raten (Euribor + Marge) sind üblicherweise billiger zu Beginn, aber können steigen. Feste Raten sind höher, geben aber Sicherheit. Sie können auch zwischen Optionen wechseln. Konsultieren Sie Ihren Berater über das beste Modell für Ihre Situation.',
  },
  {
    question: 'Brauche ich eine Versicherung für meine Hypothek?',
    answer: 'Ja, Banken fordern normalerweise eine Hypothek-Schutzversicherung (Seguro de Hipoteca) ab, die etwa 0,6-1,5% des Kreditbetrags kostet. Dies schützt die Bank, falls Sie ausfallen. Zusätzlich wird Hausratversicherung empfohlen. Manche Banken bieten kombinierte Produkte an.',
  },
  {
    question: 'Wie hoch sind die Bearbeitungsgebühren für eine Hypothek?',
    answer: 'Bearbeitungsgebühren liegen normalerweise zwischen 0,5-2% des Kreditbetrags. Einige Banken bieten Hypotheken ohne Bearbeitungsgebühren an. Vergleichen Sie mehrere Banken, da die Gebühren erheblich unterschiedlich sein können. Fragen Sie auch nach versteckten Gebühren für Änderungen oder vorzeitige Rückzahlung.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function HypothekPage() {
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
            Hypotheken in Spanien
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Dieser umfassende Leitfaden erklärt alles über Hypotheken in Spanien für deutsche Käufer. Von Bankenoptionen über Zinssätze bis zum Genehmigungsprozess - wir decken alle wichtigen Aspekte ab.
          </p>
        </div>

        {/* Section: Hypotheken in Spanien */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Hypotheken in Spanien - Die Grundlagen</h2>
          <p className="text-gray-700 mb-6">
            In Spanien ist es völlig normal und häufig, eine Hypothek für den Immobilienkauf zu nutzen. Die meisten Immobilienkäufer finanzieren 70-80% des Kaufpreises über eine Bank. Spanische Hypotheken sind üblicherweise kundenfreundlich und flexibel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Typische Konditionen</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Finanzierungsanteil: 70-90%</li>
                <li>Laufzeit: 10-30 Jahre</li>
                <li>Zinssätze: 3,5-5,5% p.a.</li>
                <li>Bearbeitungsgebühren: 0,5-2%</li>
                <li>Versicherung: 0,6-1,5%</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Was ist erforderlich</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>NIE-Nummer</li>
                <li>Nachweis des Einkommens</li>
                <li>Gute Kredithistorie</li>
                <li>Eigenkapital von 10-30%</li>
                <li>Gültiger Pass/Ausweis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Banken für Deutsche */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Banken für Hypotheken in Spanien</h2>
          <p className="text-gray-700 mb-6">
            Es gibt mehrere Optionen für Hypotheken: deutsche Banken mit Spanien-Expertise, internationale Banken und lokale spanische Banken.
          </p>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Deutsche Banken</h3>
              <p className="text-gray-700 mb-4">
                Deutsche Banken haben Expertise mit deutschen Kunden und verstehen Ihre Situation:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                <li><strong>Deutsche Bank</strong> - International, mit Büros in Spanien, spezialisiert auf Auslandsimmobilien</li>
                <li><strong>Commerzbank</strong> - Bietet internationale Hypotheken und Immobilienfinanzierung</li>
                <li><strong>Hypotthekensbanken</strong> - Spezialisierte Deutsche Banken mit Spanien-Angeboten</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Spanische Banken</h3>
              <p className="text-gray-700 mb-4">
                Lokale spanische Banken sind oft konkurrenzfähig und kennen lokale Bedingungen:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                <li><strong>Sparkasse (Caixa)</strong> - Regionale Banken mit lokaler Präsenz, oft günstig</li>
                <li><strong>BBVA, Santander</strong> - Große Banken mit guten Konditionen</li>
                <li><strong>ING, Sabadell</strong> - Competitive rates und moderne Online-Dienste</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Tipps zur Bankwahl</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vergleichen Sie mehrere Banken - die Konditionen können erheblich unterschiedlich sein</li>
                <li>Fragen Sie nach versteckten Gebühren (Kontoführung, Änderungen, vorzeitige Rückzahlung)</li>
                <li>Achten Sie auf Servicequalität und Deutsch-sprechende Mitarbeiter</li>
                <li>Prüfen Sie, ob die Bank lokale Expertise hat (besonders für Regionen wie Costa Blanca)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Hypothekentypen */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Arten von Hypotheken</h2>
          <p className="text-gray-700 mb-6">
            Spanische Banken bieten verschiedene Hypothekentypen an. Die Wahl hängt von Ihrer Risikobereitschaft und Situation ab.
          </p>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Variable Hypotheken (Hipoteca a Tipo Variable)</h3>
              <p className="text-gray-700 mb-3">
                Der Zinssatz ist an einen Index gekoppelt (üblicherweise Euribor) plus eine Marge. Der Satz passt sich vierteljährlich oder halbjährlich an.
              </p>
              <div className="bg-gray-50 rounded-sm p-4">
                <p className="text-gray-700 text-sm"><strong>Vorteile:</strong> Niedriger Anfangssatz, günstig bei steigende Zinsen</p>
                <p className="text-gray-700 text-sm mt-2"><strong>Nachteile:</strong> Unsicherheit, Raten können steigen, schwierig zu budgetieren</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Feste Hypotheken (Hipoteca a Tipo Fijo)</h3>
              <p className="text-gray-700 mb-3">
                Der Zinssatz ist für die gesamte Laufzeit festgelegt. Ihre Monatsrate bleibt gleich, unabhängig von Marktveränderungen.
              </p>
              <div className="bg-gray-50 rounded-sm p-4">
                <p className="text-gray-700 text-sm"><strong>Vorteile:</strong> Sicherheit, berechenbare Raten, leicht zu budgetieren</p>
                <p className="text-gray-700 text-sm mt-2"><strong>Nachteile:</strong> Höherer Anfangssatz, weniger flexibel</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Gemischte Hypotheken (Hipoteca Mixta)</h3>
              <p className="text-gray-700 mb-3">
                Kombination aus festem und variablem Satz. Die ersten Jahre haben einen festen Satz, danach wird es variabel.
              </p>
              <div className="bg-gray-50 rounded-sm p-4">
                <p className="text-gray-700 text-sm"><strong>Vorteile:</strong> Beste Merkmale beider Typen, Flexibilität</p>
                <p className="text-gray-700 text-sm mt-2"><strong>Nachteile:</strong> Komplexer, Mittelsatz zwischen fest und variabel</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Zinssätze */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Zinssätze und Konditionen</h2>
          <p className="text-gray-700 mb-6">
            Die Zinssätze in Spanien sind derzeit (2026) im Vergleich zu historischen Niveaus moderat. Die genauen Konditionen hängen von mehreren Faktoren ab.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Einflussfaktoren auf Zinssätze</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Laufzeit:</strong> Längere Laufzeiten = höherer Zins</li>
                <li><strong>Finanzierungsbetrag:</strong> Höhere LTV (Loan-to-Value) = höherer Zins</li>
                <li><strong>Ihre Kreditwürdigkeit:</strong> Bessere Bonität = niedrigerer Zins</li>
                <li><strong>Marktkonditionen:</strong> ECB-Politik beeinflusst Euribor</li>
                <li><strong>Immobilienlage:</strong> Prime Locations können bessere Konditionen bekommen</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Typische Zinssätze (2026)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Basierend auf aktuellen Marktkonditionen für deutsche Käufer:
              </p>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between bg-gray-50 p-2">
                  <span>Variable (Euribor + 0,5-1,5%)</span>
                  <span className="font-semibold">3,5-4,5%</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-2">
                  <span>Fest (20 Jahre)</span>
                  <span className="font-semibold">4,5-5,5%</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-2">
                  <span>Fest (30 Jahre)</span>
                  <span className="font-semibold">4,8-5,5%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Genehmigungsprozess */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Der Genehmigungsprozess</h2>
          <p className="text-gray-700 mb-6">
            Die Genehmigung einer Hypothek erfordert mehrere Schritte und normalerweise 4-8 Wochen.
          </p>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">1</span>
                Antrag einreichen
              </h3>
              <p className="text-gray-700">
                Sie reichen einen formellen Antrag bei der Bank ein und legen alle erforderlichen Dokumente bei. Die Bank führt eine erste Überprüfung durch.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">2</span>
                Immobilienbewertung
              </h3>
              <p className="text-gray-700">
                Die Bank lässt die Immobilie von einem unabhängigen Sachverständigen bewerten. Dies bestimmt den maximalen Finanzierungsbetrag. Die Kosten (normalerweise 200-400 Euro) trägt der Käufer.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">3</span>
                Kreditwürdigkeitsprüfung
              </h3>
              <p className="text-gray-700">
                Die Bank überprüft Ihre Kredithistorie, Schulden und Einkommen. Dies kann auch eine Überprüfung mit Finanzinstitutionen in Deutschland einschließen.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">4</span>
                Vorläufige Genehmigung
              </h3>
              <p className="text-gray-700">
                Wenn alles positiv ist, erhalten Sie eine vorläufige Genehmigung. Dies ist der Punkt, an dem Sie das Angebot machen und den Reservierungsvertrag unterzeichnen können.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">5</span>
                Endgültige Genehmigung und Auszahlung
              </h3>
              <p className="text-gray-700">
                Nach dem notariellen Kaufvertrag gibt die Bank die endgültige Genehmigung. Das Geld wird an den Notar überwiesen und zur Zahlung des Kaufpreises verwendet.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Erforderliche Dokumente */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Erforderliche Dokumente</h2>
          <p className="text-gray-700 mb-6">
            Für die Hypothekenantrag benötigen Sie folgende Dokumente:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Persönliche Dokumente</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Gültiger Pass oder Personalausweis</li>
                <li>NIE-Nummer oder Kopie</li>
                <li>Nachweis des Familienstatus</li>
                <li>Ledigkeitsbescheinigung (falls erforderlich)</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Finanzielle Dokumente</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Letzter 3-6 Monate Kontoauszüge</li>
                <li>Gehaltszettel oder Einkommensnachweise</li>
                <li>Steuererklärungen (letzte 2 Jahre)</li>
                <li>Arbeitgeberbestätigung</li>
                <li>Nachweise von bestehenden Schulden</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Immobilien-Dokumente</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Kaufvertrag oder Reservierungsvertrag</li>
                <li>Immobilienbeschreibung</li>
                <li>Energieausweis</li>
                <li>Grundbuch-Auszug</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Weitere Dokumente</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Versicherungsinformationen</li>
                <li>Kredithistorie (falls von Bank angefordert)</li>
                <li>Anzahlungsnachweis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Kosten und Gebühren */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Kosten der Hypothek</h2>
          <p className="text-gray-700 mb-6">
            Neben dem Zinssatz fallen mehrere Gebühren an:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-3 font-semibold text-primary-900">Gebührenart</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Typischer Betrag</th>
                  <th className="px-4 py-3 font-semibold text-primary-900">Anmerkung</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Bearbeitungsgebühr</td>
                  <td className="px-4 py-3">0,5-2%</td>
                  <td className="px-4 py-3">Einmalig, beim Abschluss</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Bewertungsgebühr</td>
                  <td className="px-4 py-3">200-400 Euro</td>
                  <td className="px-4 py-3">Für Immobilienbewertung</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Versicherung</td>
                  <td className="px-4 py-3">0,6-1,5%</td>
                  <td className="px-4 py-3">Obligatorisch, jährlich</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">Notarkosten</td>
                  <td className="px-4 py-3">1,5-2%</td>
                  <td className="px-4 py-3">Für notarielle Unterzeichnung</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Registergebühren</td>
                  <td className="px-4 py-3">0,1-0,2%</td>
                  <td className="px-4 py-3">Für Registrierung der Hypothek</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Gesamtkosten Beispiel</h3>
            <p className="text-gray-700 text-sm mb-3">
              Bei einer 250.000 Euro Hypothek mit 3,5% Zinssatz über 20 Jahre:
            </p>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>Kreditbetrag</span>
                <span className="font-semibold">250.000 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Bearbeitungsgebühr (1%)</span>
                <span className="font-semibold">2.500 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Monatliche Rate (ca.)</span>
                <span className="font-semibold">1.235 Euro</span>
              </div>
              <div className="flex justify-between">
                <span>Gesamtzinsen über 20 Jahre</span>
                <span className="font-semibold">45.400 Euro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Tipps */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Tipps für die beste Hypothek</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Vergleichen Sie mehrere Banken</h3>
              <p className="text-gray-700 text-sm">
                Die Unterschiede zwischen Banken können erheblich sein. Besorgen Sie sich Angebote von mindestens 3-4 Banken.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Verstehen Sie alle Gebühren</h3>
              <p className="text-gray-700 text-sm">
                Nicht nur der Zinssatz zählt. Beachten Sie Bearbeitungsgebühren, Versicherung und versteckte Kosten.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Fragen Sie nach Vorbezahlungsmöglichkeiten</h3>
              <p className="text-gray-700 text-sm">
                Erlaubt die Bank vorzeitige Rückzahlung ohne Strafgebühren? Dies ist wichtig für zukünftige Flexibilität.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Planen Sie Ihre Laufzeit</h3>
              <p className="text-gray-700 text-sm">
                Längere Laufzeiten (25-30 Jahre) senken die Monatsrate, erhöhen aber die Gesamtzinsen. Balancieren Sie dies mit Ihren Finanzen.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Arbeiten Sie mit Fachleuten</h3>
              <p className="text-gray-700 text-sm">
                Ein Anwalt oder Finanzberater kann Sie durch den Prozess führen und sicherstellen, dass Ihre Interessen geschützt sind.
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
          <h2 className="text-2xl font-light mb-4">Benötigen Sie Hilfe bei der Hypothekenfinanzierung?</h2>
          <p className="mb-6 text-gray-100">
            Unser Team kann Sie mit den besten Banken verbinden und durch den gesamten Prozess unterstützen.
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
