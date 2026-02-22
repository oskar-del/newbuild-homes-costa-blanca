import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | New Build Homes Costa Blanca',
  description: 'Datenschutzerklärung für New Build Homes Costa Blanca. Erfahren Sie, wie wir Ihre persönlichen Daten erfassen, nutzen und schützen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/privacy',
  },
};

export default function PrivacyPageDe() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Startseite', url: 'https://newbuildhomescostablanca.com/de/' },
    { name: 'Datenschutzerklärung', url: 'https://newbuildhomescostablanca.com/de/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/de/" className="hover:text-white transition-colors">Startseite</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Datenschutzerklärung</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Datenschutzerklärung
            </h1>
            <p className="text-warm-300 mt-4">
              Zuletzt aktualisiert: Februar 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Einleitung</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;wir,&quot; &quot;unser,&quot; oder &quot;uns&quot;) ist verpflichtet, Ihre Privatsphäre zu schützen.
                Diese Datenschutzerklärung erklärt, wie wir Ihre Informationen erfassen, nutzen, offenlegen und schützen, wenn Sie
                unsere Website newbuildhomescostablanca.com besuchen.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Informationen, die wir erfassen</h2>

              <h3 className="text-lg font-semibold text-primary-900">Persönliche Informationen</h3>
              <p className="text-warm-700">
                Wenn Sie unsere Kontaktformulare oder Anfragefomulare ausfüllen, können wir erfassen:
              </p>
              <ul className="text-warm-700">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>Immobilienvorlieben und Anforderungen</li>
                <li>Budgetbereich</li>
                <li>Zeitrahmen für Kauf</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Automatisch erfasste Informationen</h3>
              <p className="text-warm-700">
                Wenn Sie unsere Website besuchen, können wir automatisch bestimmte Informationen erfassen, einschließlich:
              </p>
              <ul className="text-warm-700">
                <li>IP-Adresse</li>
                <li>Browsertyp und -version</li>
                <li>Besuchte Seiten und Verweildauer</li>
                <li>Verweisende Website</li>
                <li>Geräteinformationen</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Cookies</h2>
              <p className="text-warm-700">
                Wir verwenden Cookies und ähnliche Tracking-Technologien, um Ihr Browsing-Erlebnis zu verbessern.
                Sie können Cookie-Einstellungen über unser Cookie-Einwilligungsbanner steuern.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Arten von Cookies, die wir verwenden</h3>
              <ul className="text-warm-700">
                <li><strong>Essenzielle Cookies:</strong> Erforderlich für das ordnungsgemäße Funktionieren der Website</li>
                <li><strong>Analytics-Cookies:</strong> Helfen uns zu verstehen, wie Besucher unsere Website nutzen (Google Analytics)</li>
                <li><strong>Marketing-Cookies:</strong> Werden verwendet, um Besucher über Websites hinweg zu Werbezwecken zu verfolgen</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. Wie wir Ihre Informationen nutzen</h2>
              <p className="text-warm-700">Wir nutzen die erfassten Informationen, um:</p>
              <ul className="text-warm-700">
                <li>Ihre Anfragen und Immobilienanfragen zu beantworten</li>
                <li>Sie über Immobilien zu informieren, die Ihren Kriterien entsprechen</li>
                <li>Unsere Website und Dienstleistungen zu verbessern</li>
                <li>Websitenutzungsmuster zu analysieren</li>
                <li>Rechtliche Verpflichtungen zu erfüllen</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Datenaustausch</h2>
              <p className="text-warm-700">
                Wir können Ihre Informationen mit folgenden Personen teilen:
              </p>
              <ul className="text-warm-700">
                <li>Immobilienentwickler und Bauunternehmer, wenn Sie Interesse an bestimmten Entwicklungen zeigen</li>
                <li>Unseren vertrauenswürdigen Partnern (Anwälten, Hypothekenberatern), wenn angefordert</li>
                <li>Dienstleistern, die uns bei der Verwaltung unserer Website helfen</li>
                <li>Behörden, wenn gesetzlich erforderlich</li>
              </ul>
              <p className="text-warm-700">
                Wir werden Ihre persönlichen Informationen niemals an Dritte verkaufen.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Ihre Rechte (DSGVO)</h2>
              <p className="text-warm-700">
                Nach der Datenschutz-Grundverordnung (DSGVO) haben Sie das Recht auf:
              </p>
              <ul className="text-warm-700">
                <li><strong>Zugang:</strong> Anfordern einer Kopie Ihrer persönlichen Daten</li>
                <li><strong>Berichtigung:</strong> Anfordern der Korrektur ungenauer Daten</li>
                <li><strong>Löschung:</strong> Anfordern der Löschung Ihrer persönlichen Daten</li>
                <li><strong>Einschränkung der Verarbeitung:</strong> Anfordern einer Einschränkung der Datennutzung</li>
                <li><strong>Datenportabilität:</strong> Erhalten Ihrer Daten in einem portablen Format</li>
                <li><strong>Widerspruch:</strong> Widerspruch gegen die Verarbeitung Ihrer persönlichen Daten</li>
                <li><strong>Einwilligung zurückziehen:</strong> Jederzeit die Einwilligung zurückziehen</li>
              </ul>
              <p className="text-warm-700">
                Um eines dieser Rechte auszuüben, kontaktieren Sie uns unter{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Datensicherheit</h2>
              <p className="text-warm-700">
                Wir implementieren angemessene technische und organisatorische Maßnahmen, um Ihre persönlichen
                Informationen vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen. Allerdings
                ist keine Übertragungsmethode über das Internet 100% sicher.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Datenspeicherung</h2>
              <p className="text-warm-700">
                Wir speichern Ihre persönlichen Informationen so lange wie nötig, um die in dieser Richtlinie
                beschriebenen Zwecke zu erfüllen, sofern nicht eine längere Aufbewahrungsdauer gesetzlich erforderlich ist. Anfragedaten
                werden typischerweise 3 Jahre nach Ihrer letzten Interaktion mit uns gespeichert.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Dienste Dritter</h2>
              <p className="text-warm-700">
                Unsere Website kann Dienste von Drittanbietern nutzen, darunter:
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (Website-Analytik)</li>
                <li>Google Tag Manager (Tag-Verwaltung)</li>
                <li>Netlify (Website-Hosting und Formularverarbeitung)</li>
                <li>WhatsApp (Messaging-Dienst)</li>
              </ul>
              <p className="text-warm-700">
                Diese Dienste haben ihre eigenen Datenschutzrichtlinien, die die Nutzung Ihrer Informationen regeln.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Datenschutz von Kindern</h2>
              <p className="text-warm-700">
                Unsere Website ist nicht für Kinder unter 16 Jahren bestimmt. Wir erfassen wissentlich keine persönlichen
                Informationen von Kindern unter 16 Jahren.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Änderungen dieser Richtlinie</h2>
              <p className="text-warm-700">
                Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen
                benachrichtigen, indem wir die neue Datenschutzerklärung auf dieser Seite veröffentlichen und das Datum &quot;Zuletzt aktualisiert&quot; aktualisieren.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Kontaktieren Sie uns</h2>
              <p className="text-warm-700">
                Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte:
              </p>
              <ul className="text-warm-700">
                <li>E-Mail: <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Telefon: <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp: <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Nachricht senden</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
