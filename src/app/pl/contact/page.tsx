import { Metadata } from 'next';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';

export const metadata: Metadata = {
  title: 'Skontaktuj Się | Nowe Domy Costa Blanca',
  description: 'Skontaktuj się z nami, aby uzyskać bezpłatną konsultację na temat kupna nieruchomości na Costa Blance. Mówimy po polsku.',
  openGraph: {
    title: 'Skontaktuj Się | Nowe Domy Costa Blanca',
    description: 'Bezpłatna konsultacja na temat kupna domu na Costa Blance.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/contact',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/contact',
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

export default function PolishContactPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-light text-white mb-6">
            Skontaktuj Się <span className="font-semibold text-accent-400">z Nami</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Chętnie pomożemy Ci znaleźć idealny dom na Costa Blance. Bezpłatna konsultacja dla wszystkich kupujących.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Email</h3>
              <p className="text-warm-600">info@newbuildhomescostablanca.com</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Telefon</h3>
              <p className="text-warm-600">+34 965 920 090</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Lokalizacja</h3>
              <p className="text-warm-600">Costa Blanca, Hiszpania</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-light text-primary-900 mb-6">
                Wyślij Nam <span className="font-semibold">Wiadomość</span>
              </h2>
              <p className="text-warm-600 mb-6">
                Chętnie odpowiemy na wszystkie Twoje pytania na temat kupienia domu na Costa Blance. Odpowiadamy w ciągu 24 godzin.
              </p>

              <LeadFormAdvanced />
            </div>

            <div>
              <h2 className="text-2xl font-light text-primary-900 mb-6">
                Dlaczego Się <span className="font-semibold">Skontaktować?</span>
              </h2>

              <div className="space-y-4">
                <div className="bg-warm-50 rounded-sm p-4 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-2">Porady Eksperta</h3>
                  <p className="text-warm-600 text-sm">Nasi specjaliści mają ponad 15 lat doświadczenia na rynku nieruchomości Costa Blanki.</p>
                </div>

                <div className="bg-warm-50 rounded-sm p-4 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-2">Mówią Po Polsku</h3>
                  <p className="text-warm-600 text-sm">Cały nasz zespół mówi po polsku. Bez barier w komunikacji.</p>
                </div>

                <div className="bg-warm-50 rounded-sm p-4 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-2">Bezpłatna Konsultacja</h3>
                  <p className="text-warm-600 text-sm">Wszystkie konsultacje są całkowicie bezpłatne. Bez zobowiązań.</p>
                </div>

                <div className="bg-warm-50 rounded-sm p-4 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-2">Osobiste Podejście</h3>
                  <p className="text-warm-600 text-sm">Każdy klient jest ważny. Osobiste i indywidualne podejście.</p>
                </div>

                <div className="bg-warm-50 rounded-sm p-4 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-2">WhatsApp</h3>
                  <p className="text-warm-600 text-sm mb-3">Szybka wiadomość poprzez WhatsApp</p>
                  <a
                    href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Najczęstsze <span className="font-semibold">Pytania</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Jaki jest czas odpowiedzi?</h3>
              <p className="text-warm-600 text-sm">Odpowiadamy na wszystkie zapytania w ciągu 24 godzin, zazwyczaj szybciej.</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Czy konsultacja jest bezpłatna?</h3>
              <p className="text-warm-600 text-sm">Tak, wszystkie konsultacje są całkowicie bezpłatne i bez zobowiązań.</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Czy mogę zadzwonić zamiast wysłać formularz?</h3>
              <p className="text-warm-600 text-sm">Oczywiście. Możesz zadzwonić: +34 965 920 090</p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Czy mogę wysłać wiadomość WhatsApp?</h3>
              <p className="text-warm-600 text-sm">Tak, WhatsApp jest najszybszym sposobem na kontakt. Sprawdź link wyżej.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
