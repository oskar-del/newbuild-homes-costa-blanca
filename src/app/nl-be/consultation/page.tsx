import { Metadata } from 'next';
import Link from 'next/link';
import ConsultationForm from '@/components/ConsultationForm';

export const metadata: Metadata = {
  title: 'Gratis consult boeken | New Build Homes Costa Blanca',
  description: 'Plan een gratis videogesprek, telefoongesprek of WhatsApp-consult met onze Costa Blanca-vastgoedexperts. Krijg persoonlijk advies over nieuwe huizen in Spanje.',
  openGraph: {
    title: 'Boek een gratis vastgoedconsultatie',
    description: 'Plan een gratis consult met onze Costa Blanca-vastgoedexperts.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/consultation',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/consultation',
      'sv': 'https://newbuildhomescostablanca.com/sv/consultation',
      'nl': 'https://newbuildhomescostablanca.com/nl/consultation',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/consultation',
      'fr': 'https://newbuildhomescostablanca.com/fr/consultation',
      'no': 'https://newbuildhomescostablanca.com/no/consultation',
      'de': 'https://newbuildhomescostablanca.com/de/consultation',
      'pl': 'https://newbuildhomescostablanca.com/pl/consultation',
      'ru': 'https://newbuildhomescostablanca.com/ru/consultation',
      'x-default': 'https://newbuildhomescostablanca.com/consultation',
    },
  },
};

export default function ConsultationPageNlBe() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-warm-400 text-sm mb-8">
            <Link href="/nl-be" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Consult boeken</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                Gratis Deskundigenadvies
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
              Boek Uw <span className="font-semibold">Gratis Consult</span>
            </h1>

            <p className="text-warm-300 text-lg leading-relaxed mb-8">
              Spreek rechtstreeks met onze vastgoedexperts over uw Costa Blanca-zoektocht.
              Of u nu op zoek bent naar een vakantiehuis, een investering of permanente verhuizing—wij
              begeleiden u bij elke stap.
            </p>

            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>Videogesprekken</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>Telefoongesprekken</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>Bezieningen ter plaatse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left - Benefits */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                Wat kunt u verwachten
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Boek uw moment</h3>
                    <p className="text-warm-600 text-sm">Kies uw voorkeur datum, tijd en communicatiemethode.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Bevestiging</h3>
                    <p className="text-warm-600 text-sm">We bevestigen uw afspraak binnen 2 uur per e-mail en WhatsApp.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Deskundige consult</h3>
                    <p className="text-warm-600 text-sm">Bespreek uw vereisten, budget en voorkeuren met onze specialisten.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Persoonlijke aanbevelingen</h3>
                    <p className="text-warm-600 text-sm">Ontvang een geselecteerde verzameling vastgoed die uw criteria aanvult.</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-8 border-t border-warm-200">
                <p className="text-sm text-warm-500 mb-4">Vertrouwd door kopers uit</p>
                <div className="flex flex-wrap gap-3">
                  {['🇬🇧 Verenigd Koninkrijk', '🇩🇪 Duitsland', '🇸🇪 Zweden', '🇳🇴 Noorwegen', '🇳🇱 Nederland', '🇧🇪 België'].map((country) => (
                    <span key={country} className="bg-warm-100 text-warm-700 px-3 py-1 rounded-full text-sm">
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-10 p-6 bg-primary-50 rounded-xl">
                <h3 className="font-semibold text-primary-900 mb-3">Hulp nodig nu?</h3>
                <p className="text-warm-600 text-sm mb-4">Sla het formulier over en neem rechtstreeks contact op:</p>
                <div className="space-y-3">
                  <a
                    href="https://api.whatsapp.com/send?phone=34634044970"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-primary-800 hover:text-[#25D366] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="font-medium">WhatsApp ons</span>
                  </a>
                  <a
                    href="tel:+34634044970"
                    className="flex items-center gap-3 text-primary-800 hover:text-accent-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">+34 634 044 970</span>
                  </a>
                  <a
                    href="mailto:info@newbuildhomescostablanca.com"
                    className="flex items-center gap-3 text-primary-800 hover:text-accent-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">E-mail ons</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-2">
              <ConsultationForm variant="full" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-primary-900 text-center mb-8">
            Veelgestelde vragen
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Is de consult echt gratis?',
                a: 'Ja, volledig gratis zonder verplichting. Wij geloven in het eerst opbouwen van relaties. Onze consults helpen ons uw behoeften te begrijpen en echte waarde te bieden voordat u besluit met ons samen te werken.',
              },
              {
                q: 'Hoe lang duurt een consult meestal?',
                a: 'De meeste consults duren 20-30 minuten. Dit geeft ons genoeg tijd om uw vereisten te begrijpen, uw vragen te beantwoorden en passende eigendommen voor te stellen.',
              },
              {
                q: 'Wat moet ik voor de consult voorbereiden?',
                a: 'Denk na over uw budget, voorkeur locaties, vastgoedtype (appartement, villa, enz.) en tijdlijn. Een globaal idee helpt ons relevantere aanbevelingen te geven.',
              },
              {
                q: 'Kunt u mij eigendommen via een videogesprek tonen?',
                a: 'Absoluut! We kunnen schermen delen om u door aanbiedingen te begeleiden, virtuele rondleidingen tonen en zelfs live videobezieningen van eigendommen uitvoeren.',
              },
              {
                q: 'Welke talen spreekt u?',
                a: 'Ons team spreekt Engels, Spaans en Zweeds. We kunnen consults in andere talen arrangeren met voorafgaande kennisgeving.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-warm-50 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5">
                  <span className="font-medium text-primary-900">{faq.q}</span>
                  <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-warm-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
