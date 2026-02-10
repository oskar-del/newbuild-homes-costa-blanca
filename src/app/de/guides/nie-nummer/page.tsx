import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/de/guides/nie-nummer`

export const metadata: Metadata = {
  title: 'NIE-Nummer Spanien - Beantragung & Guide für Deutsche',
  description: 'Kompletter Guide zur Beantragung der spanischen NIE-Nummer (Número de Identidad de Extranjero). Dokumente, Verfahren und häufig gestellte Fragen.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/nie-number`,
      sv: `${baseUrl}/se/guides/nie-nummer`,
      nl: `${baseUrl}/nl/guides/nie-nummer`,
      'nl-BE': `${baseUrl}/nl-be/guides/nie-nummer`,
      fr: `${baseUrl}/fr/guides/nie`,
      no: `${baseUrl}/no/guides/nie-nummer`,
      de: currentUrl,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/nie-number`,
    },
  },
  openGraph: {
    title: 'NIE-Nummer Spanien - Beantragung & Guide für Deutsche',
    description: 'Kompletter Guide zur Beantragung der spanischen NIE-Nummer',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'de_DE',
  },
}

const breadcrumbs = [
  { name: 'Startseite', url: `${baseUrl}/de` },
  { name: 'Ratgeber', url: `${baseUrl}/de/guides` },
  { name: 'NIE-Nummer', url: currentUrl },
]

const faqs = [
  {
    question: 'Was ist die NIE-Nummer und warum brauche ich sie?',
    answer: 'Die NIE-Nummer (Número de Identidad de Extranjero) ist die spanische Identifikationsnummer für Ausländer. Sie ist erforderlich für alle rechtlichen und finanziellen Transaktionen in Spanien, einschließlich Immobilienkauf, Bankkonten, Arbeit und Steuerfragen beim Finanzamt.',
  },
  {
    question: 'Wie lange dauert die Beantragung der NIE-Nummer?',
    answer: 'Der Prozess dauert normalerweise 3-7 Werktage. Sie können die Nummer direkt an der Polizía Nacional oder beim Finanzamt beantragen. In einigen Fällen erhalten Sie die Nummer sofort nach der Beantragung, aber es ist ratsam, sich auf eine Wartezeit vorzubereiten.',
  },
  {
    question: 'Kann ich die NIE-Nummer online beantragen?',
    answer: 'Nein, die NIE-Nummer muss persönlich beantragt werden. Sie müssen sich persönlich bei der Polizía Nacional oder dem Finanzamt (Hacienda) vorstellen. Sie können einen Bevollmächtigten schicken, müssen dann aber eine beglaubigte Vollmacht vorlegen.',
  },
  {
    question: 'Welche Dokumente benötige ich zur Beantragung?',
    answer: 'Sie benötigen: gültigen Pass oder Personalausweis, Nachweis der Residenz in Spanien (Mietvertrag, Hotelrechnung, Stromrechnung), ausgefülltes Antragsformular (EX-15) und zwei Passfotos. Bei Immobilienkauf genügt oft der Kaufvertrag oder die Reservierungsbescheinigung.',
  },
  {
    question: 'Wo beantrage ich die NIE-Nummer?',
    answer: 'Sie können die NIE-Nummer bei zwei Stellen beantragen: der Polizía Nacional (Nationale Polizei) oder dem Finanzamt (Oficina de Hacienda). Die Polizía Nacional ist normalerweise schneller. In der Provinz Alicante gibt es mehrere Büros.',
  },
  {
    question: 'Kosten die NIE-Nummer oder die Beantragung etwas?',
    answer: 'Nein, die NIE-Nummer ist kostenlos. Es gibt keine Gebühren für die Beantragung bei der Polizía Nacional oder dem Finanzamt. Seien Sie vorsichtig vor Betrügern, die Gebühren verlangen.',
  },
  {
    question: 'Wie lange ist die NIE-Nummer gültig?',
    answer: 'Die NIE-Nummer ist unbegrenzt gültig. Sie erhalten ein physisches Dokument oder Zertifikat, das als Nachweis dient. Dieses Dokument haben Sie für alle Ihre Transaktionen in Spanien.',
  },
  {
    question: 'Kann ich die NIE-Nummer für Immobilienkauf verwenden, bevor sie offiziell registriert ist?',
    answer: 'Ja, sobald Sie das Zertifikat oder eine Bestätigung von der Polizía Nacional oder dem Finanzamt haben, können Sie dieses für den Immobilienkauf verwenden. Der Notar akzeptiert die vorläufige Dokumentation.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function NIENummer() {
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
            NIE-Nummer in Spanien
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Die NIE-Nummer (Número de Identidad de Extranjero) ist Ihre spanische Identifikationsnummer für alle rechtlichen und finanziellen Transaktionen. Dieser Guide erklärt, was Sie wissen müssen, wie Sie sie beantragen und welche Schritte notwendig sind.
          </p>
        </div>

        {/* Section: Was ist die NIE */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Was ist die NIE-Nummer?</h2>
          <p className="text-gray-700 mb-6">
            Die NIE-Nummer ist ein eindeutiges Identifikationssystem für Ausländer in Spanien. Sie ersetzt in vielen administrativen Kontexten den Pass oder die Personalausweis-Nummer. Jeder Ausländer, der sich langfristig in Spanien aufhält oder ein Geschäft betreibt, muss eine NIE-Nummer beantragen.
          </p>

          <div className="bg-warm-50 rounded-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">Die NIE-Nummer besteht aus:</h3>
            <p className="text-gray-700 mb-3">
              Eine Kombination aus: ein Buchstabe (X, Y oder Z), gefolgt von 7 Ziffern und einem Kontrollbuchstaben.
            </p>
            <p className="text-gray-700 font-mono bg-white p-3 rounded-sm border border-gray-200">
              Beispiel: X-1234567-A
            </p>
          </div>

          <div className="border-l-4 border-accent-500 pl-4">
            <p className="text-gray-700">
              <strong>Wichtig:</strong> Die NIE-Nummer ist nicht dasselbe wie eine Aufenthaltserlaubnis oder ein Visum. Sie ist rein eine Identifikationsnummer für administrative und steuerliche Zwecke.
            </p>
          </div>
        </section>

        {/* Section: Wann benötigen Sie NIE */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Wann benötigen Sie die NIE-Nummer?</h2>
          <p className="text-gray-700 mb-6">
            Die NIE-Nummer ist erforderlich für zahlreiche Transaktionen:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Immobilien & Finanzen</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Immobilienkauf und -verkauf</li>
                <li>Bankkonten eröffnen</li>
                <li>Hypothek beantragen</li>
                <li>Versicherungsvertrag abschließen</li>
                <li>Wahrungen und Investments</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Administrative & Steuern</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Steuererklärungen beim Finanzamt</li>
                <li>Arbeit und Selbstständigkeit</li>
                <li>Fahrzeugregistrierung</li>
                <li>Versorgungsverträge</li>
                <li>Geschäftsgründung</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Beantragungsprozess */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Schritt-für-Schritt Beantragungsprozess</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">1</span>
                Wo beantragen Sie die NIE
              </h3>
              <p className="text-gray-700">
                Sie können die NIE-Nummer an zwei Stellen beantragen: der <strong>Polizía Nacional</strong> oder dem <strong>Finanzamt (Oficina de Hacienda)</strong>. Die Polizía Nacional ist normalerweise schneller und wird empfohlen. In der Provinz Alicante gibt es Büros in allen größeren Städten.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">2</span>
                Erforderliche Dokumente
              </h3>
              <div className="text-gray-700">
                <p className="mb-3">Folgende Dokumente sind erforderlich:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Gültiger Reisepass oder nationale Identitätskarte (Personalausweis)</li>
                  <li>Nachweis der Residenz in Spanien (Mietvertrag, Hotelrechnung, Stromrechnung)</li>
                  <li>Ausgefülltes Antragsformular (Modell EX-15) - kostenloses Formular</li>
                  <li>Zwei Passfotos (4x4 cm)</li>
                  <li>Bei Immobilienkauf: Kaufvertrag oder Reservierungsbescheinigung</li>
                </ul>
              </div>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">3</span>
                Antrag einreichen
              </h3>
              <p className="text-gray-700 mb-3">
                Besuchen Sie persönlich das Büro der Polizía Nacional oder des Finanzamtes mit allen erforderlichen Dokumenten. Sie müssen sich selbst vorstellen, es sei denn, Sie haben eine beglaubigte Vollmacht.
              </p>
              <p className="text-gray-700">
                Das Personal wird den Antrag bearbeiten, Ihre Dokumente überprüfen und ein Foto machen. Der Prozess dauert normalerweise 15-30 Minuten.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-500 text-white rounded-full mr-3 text-sm">4</span>
                Genehmigung und Dokumentation
              </h3>
              <p className="text-gray-700 mb-3">
                Nach der Antragstellung erhalten Sie normalerweise ein Genehmigungsschreiben mit Ihrer NIE-Nummer und einer vorläufigen Bestätigung. Dies reicht für sofortige Verwendung aus.
              </p>
              <p className="text-gray-700">
                Die offizielle NIE-Nummer kann 3-7 Werktage dauern. Sie können eine SMS oder E-Mail zur Benachrichtigung anfordern.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Dokumentanforderungen */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Detaillierte Dokumentanforderungen</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Antragsformular (EX-15)</h3>
              <p className="text-gray-700 mb-3">
                Das Formular EX-15 ist das offizielle Antragsformular der spanischen Polizei. Es ist kostenlos bei der Polizía Nacional erhältlich oder kann oft online heruntergeladen werden. Das Formular muss vollständig und lesbar ausgefüllt werden, idealerweise mit Tinte.
              </p>
              <p className="text-gray-700 text-sm">
                Wichtig: Nutzen Sie Druckbuchstaben und vermeiden Sie Fehler, da Korrektionen nicht akzeptiert werden.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Nachweis der Residenz</h3>
              <p className="text-gray-700 mb-3">
                Der Nachweis der Residenz kann sein:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Mietvertrag (bei einer privaten Unterkunft)</li>
                <li>Hotelrechnung oder Pensionsquittung</li>
                <li>Stromrechnung, Wasserrechnung oder Gasrechnung</li>
                <li>Registrierung bei der Gemeinde (Padrón)</li>
                <li>Kaufvertrag einer Immobilie</li>
              </ul>
              <p className="text-gray-700 text-sm mt-3">
                Das Dokument muss aktuell sein (nicht älter als 3 Monate).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Fotos</h3>
              <p className="text-gray-700">
                Zwei aktuelle Passfotos im Format 4x4 cm sind erforderlich. Sie müssen farbig sein, einen weißen Hintergrund haben und zeigen, wie Sie aktuell aussehen. Hüte und Sonnenbrillen sind nicht erlaubt.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Wartezeiten und Kosten */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Wartezeiten und Kosten</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Zeitrahmen</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Persönlicher Besuch: 15-30 Minuten</li>
                <li>Vorläufige Bestätigung: Sofort</li>
                <li>Offizielle Dokumentation: 3-7 Werktage</li>
                <li>Physisches Dokument: 1-2 Wochen</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Kosten</h3>
              <p className="text-gray-700 font-bold mb-2">0 Euro</p>
              <p className="text-gray-700 text-sm">
                Die NIE-Nummer ist völlig kostenlos. Es gibt keine Gebühren bei der Polizía Nacional oder dem Finanzamt.
              </p>
            </div>
          </div>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Vorsicht vor Betrügern</h3>
            <p className="text-gray-700">
              Es gibt Agenturen und Dienstleister, die behaupten, die NIE-Nummer für Sie zu besorgen - gegen Gebühr. Dies ist nicht notwendig und oft ein Betrug. Die Beantragung ist kostenlos und relativ einfach selbst zu machen.
            </p>
          </div>
        </section>

        {/* Section: Nach der Beantragung */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Nach der Beantragung</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-semibold text-primary-900 mb-2">Verwendung vor offizieller Dokumentation</h3>
              <p className="text-gray-700">
                Sie können die NIE-Nummer sofort nach der Beantragung verwenden. Das Genehmigungsschreiben oder die vorläufige Bestätigung ist ausreichend für den Immobilienkauf oder die Eröffnung eines Bankkontos.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-semibold text-primary-900 mb-2">Erhalt der physischen Dokumentation</h3>
              <p className="text-gray-700">
                Nach 1-2 Wochen können Sie die offizielle NIE-Dokumentation abholen oder erhalten sie per Post. Heben Sie dieses Dokument auf, da Sie es für zukünftige Transaktionen benötigen.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-semibold text-primary-900 mb-2">Registrierung beim Finanzamt</h3>
              <p className="text-gray-700">
                Mit Ihrer NIE-Nummer können Sie sich beim Finanzamt registrieren und ein Steuerkonto eröffnen. Dies ist wichtig, wenn Sie Einkünfte in Spanien haben oder eine Immobilie besitzen.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-semibold text-primary-900 mb-2">Bankkontoöffnung</h3>
              <p className="text-gray-700">
                Mit der NIE-Nummer und Ihrem Pass können Sie bei spanischen Banken ein Konto eröffnen. Dies ist notwendig für den Immobilienkauf und die Verwaltung von Finanzen in Spanien.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Beliebte Beantragungsstellen in Alicante */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Beliebte Beantragungsstellen in der Provinz Alicante</h2>
          <p className="text-gray-700 mb-6">
            Hier sind einige der wichtigsten Büros der Polizía Nacional und des Finanzamts in der Provinz Alicante:
          </p>

          <div className="space-y-4">
            <div className="border rounded-sm p-4 border-gray-200">
              <h3 className="font-semibold text-primary-900">Alicante (Stadt)</h3>
              <p className="text-gray-700 text-sm">Polizía Nacional - Hauptbüro mit längeren Öffnungszeiten</p>
            </div>

            <div className="border rounded-sm p-4 border-gray-200">
              <h3 className="font-semibold text-primary-900">Benidorm</h3>
              <p className="text-gray-700 text-sm">Mehrere Büros, Beantragung möglich, gute Verfügbarkeit</p>
            </div>

            <div className="border rounded-sm p-4 border-gray-200">
              <h3 className="font-semibold text-primary-900">Torrevieja</h3>
              <p className="text-gray-700 text-sm">Polizía Local und Polizía Nacional Büro vorhanden</p>
            </div>

            <div className="border rounded-sm p-4 border-gray-200">
              <h3 className="font-semibold text-primary-900">Jávea</h3>
              <p className="text-gray-700 text-sm">Lokales Büro für NIE-Beantragung verfügbar</p>
            </div>
          </div>
        </section>

        {/* Section: Häufige Fehler vermeiden */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Häufige Fehler vermeiden</h2>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-sm p-4">
              <h3 className="font-semibold text-red-700 mb-2">Unvollständiges Formular</h3>
              <p className="text-gray-700">
                Stellen Sie sicher, dass das EX-15 Formular vollständig und lesbar ausgefüllt ist. Fehlerhafte Felder können zu Verzögerungen führen.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-sm p-4">
              <h3 className="font-semibold text-red-700 mb-2">Abgelaufene Dokumente</h3>
              <p className="text-gray-700">
                Der Nachweis der Residenz darf nicht älter als 3 Monate sein. Überprüfen Sie das Datum auf allen Dokumenten.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-sm p-4">
              <h3 className="font-semibold text-red-700 mb-2">Falsche Fotos</h3>
              <p className="text-gray-700">
                Stellen Sie sicher, dass die Fotos aktuell sind, Ihre aktuelle Erscheinung zeigen und den Anforderungen entsprechen (4x4 cm, Farbe, weißer Hintergrund).
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-sm p-4">
              <h3 className="font-semibold text-red-700 mb-2">Falsche Adresse</h3>
              <p className="text-gray-700">
                Die Adresse im Formular muss mit dem Nachweis der Residenz übereinstimmen. Überprüfen Sie alle Details gründlich.
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
          <h2 className="text-2xl font-light mb-4">Benötigen Sie Hilfe bei der NIE-Beantragung?</h2>
          <p className="mb-6 text-gray-100">
            Unser Team kann Sie durch den gesamten Prozess unterstützen und sicherstellen, dass Ihre Beantragung problemlos verläuft.
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
