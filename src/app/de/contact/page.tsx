import { Metadata } from 'next';
import Link from 'next/link';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';

export const metadata: Metadata = {
  title: 'Kontakt | Neubau Costa Blanca',
  description: 'Kontaktieren Sie uns für Hilfe beim Hauskauf an der Costa Blanca. Deutsche Experten stehen zur Verfügung.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/contact',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/contact',
      'sv': 'https://newbuildhomescostablanca.com/sv/contact',
      'nl': 'https://newbuildhomescostablanca.com/nl/contact',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/contact',
      'fr': 'https://newbuildhomescostablanca.com/fr/contact',
      'no': 'https://newbuildhomescostablanca.com/no/contact',
      'de': 'https://newbuildhomescostablanca.com/de/contact',
      'pl': 'https://newbuildhomescostablanca.com/pl/contact',
      'ru': 'https://newbuildhomescostablanca.com/ru/contact',
      'x-default': 'https://newbuildhomescostablanca.com/contact',
    },
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Nehmen Sie <span className="font-semibold">Kontakt auf</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Unser deutschsprachiges Team ist hier, um Ihnen zu helfen. Schreiben Sie uns oder rufen Sie an.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-light text-primary-900 mb-6">Kontaktformular</h2>
              <LeadFormAdvanced />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-light text-primary-900 mb-6">Kontaktinformation</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">WhatsApp</h3>
                  <a
                    href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Jetzt bei WhatsApp schreiben
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">Büro in Costa Blanca</h3>
                  <p className="text-warm-700">
                    Alicante, Spanien<br />
                    <span className="text-xs text-warm-600">Vor Ort verfügbar für Besichtigungen</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">Öffnungszeiten</h3>
                  <div className="space-y-1 text-warm-700">
                    <p>Montag - Freitag: 09:00 - 18:00 Uhr</p>
                    <p>Samstag - Sonntag: Nach Vereinbarung</p>
                    <p className="text-xs text-warm-600 mt-2">Telefonisch und WhatsApp verfügbar</p>
                  </div>
                </div>

                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="font-semibold text-primary-900 mb-2">Schneller Support</h4>
                  <p className="text-sm text-warm-700">
                    Für schnelle Anfragen nutzen Sie WhatsApp. Wir antworten meist innerhalb von 30 Minuten.
                  </p>
                </div>

                <div className="bg-warm-100 rounded-sm p-4 border border-warm-200">
                  <h4 className="font-semibold text-primary-900 mb-2">Sprachunterstützung</h4>
                  <p className="text-sm text-warm-700">
                    Wir sprechen Deutsch, Englisch und Spanisch. Ihre Muttersprache ist willkommen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50 border-t border-warm-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-light text-primary-900 mb-8 text-center">Häufig Gestellte Fragen</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-sm p-4 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Wie schnell können Sie mir helfen?</h3>
              <p className="text-warm-700 text-sm">
                Wir antworten auf Anfragen normalerweise innerhalb von 30 Minuten während der Geschäftszeiten. Für dringende Fragen nutzen Sie WhatsApp.
              </p>
            </div>
            <div className="bg-white rounded-sm p-4 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Kostet die Beratung etwas?</h3>
              <p className="text-warm-700 text-sm">
                Nein, unsere erste Beratung ist kostenlos. Wir helfen Ihnen gerne, die richtige Immobilie zu finden.
              </p>
            </div>
            <div className="bg-white rounded-sm p-4 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Können Sie mir bei Besichtigungen helfen?</h3>
              <p className="text-warm-700 text-sm">
                Ja, wir arrangieren Besichtigungen an der Costa Blanca. Wir können Sie von Alicante abholen oder virtuell zeigen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Bereit zum <span className="font-semibold">Start?</span>
          </h2>
          <p className="text-warm-300 mb-8">Lassen Sie uns Ihnen helfen, Ihr Traumhaus an der Costa Blanca zu finden.</p>
          <a
            href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
          >
            Bei WhatsApp schreiben
          </a>
        </div>
      </section>
    </main>
  );
}
