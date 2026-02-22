import { Metadata } from 'next';
import Link from 'next/link';
import ConsultationForm from '@/components/ConsultationForm';

export const metadata: Metadata = {
  title: 'Réservez une consultation gratuite | New Build Homes Costa Blanca',
  description: 'Planifiez un appel vidéo, un appel téléphonique ou une consultation WhatsApp gratuits avec nos experts immobiliers de Costa Blanca. Obtenez des conseils personnalisés sur les maisons neuves en Espagne.',
  openGraph: {
    title: 'Réservez une consultation immobilière gratuite',
    description: 'Planifiez une consultation gratuite avec nos experts immobiliers de Costa Blanca.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/consultation',
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

export default function ConsultationPageFr() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-warm-400 text-sm mb-8">
            <Link href="/fr" className="hover:text-white transition-colors">Accueil</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Réserver une consultation</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                Conseil d'expert gratuit
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
              Réservez Votre <span className="font-semibold">Consultation Gratuite</span>
            </h1>

            <p className="text-warm-300 text-lg leading-relaxed mb-8">
              Parlez directement avec nos experts immobiliers de votre recherche de propriété à Costa Blanca.
              Que vous cherchiez une maison de vacances, un investissement ou une relocalisation permanente—nous
              vous guiderons à chaque étape.
            </p>

            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>Appels vidéo</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>Appels téléphoniques</span>
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
                <span>Visites sur site</span>
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
                À quoi vous attendre
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Réservez votre créneau</h3>
                    <p className="text-warm-600 text-sm">Choisissez votre date, heure et méthode de communication préférées.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Confirmation</h3>
                    <p className="text-warm-600 text-sm">Nous confirmons votre rendez-vous dans les 2 heures par e-mail et WhatsApp.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Consultation d'expert</h3>
                    <p className="text-warm-600 text-sm">Discutez de vos exigences, votre budget et vos préférences avec nos spécialistes.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Recommandations personnalisées</h3>
                    <p className="text-warm-600 text-sm">Recevez une sélection curée de propriétés correspondant à vos critères.</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-8 border-t border-warm-200">
                <p className="text-sm text-warm-500 mb-4">De confiance auprès des acheteurs de</p>
                <div className="flex flex-wrap gap-3">
                  {['🇬🇧 Royaume-Uni', '🇩🇪 Allemagne', '🇸🇪 Suède', '🇳🇴 Norvège', '🇳🇱 Pays-Bas', '🇧🇪 Belgique'].map((country) => (
                    <span key={country} className="bg-warm-100 text-warm-700 px-3 py-1 rounded-full text-sm">
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-10 p-6 bg-primary-50 rounded-xl">
                <h3 className="font-semibold text-primary-900 mb-3">Besoin d'aide maintenant?</h3>
                <p className="text-warm-600 text-sm mb-4">Sautez le formulaire et contactez-nous directement:</p>
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
                    <span className="font-medium">WhatsApp nous</span>
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
                    <span className="font-medium">E-mail nous</span>
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
            Questions fréquemment posées
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'La consultation est-elle vraiment gratuite?',
                a: 'Oui, complètement gratuite sans obligation. Nous croyons en construire des relations d\'abord. Nos consultations nous aident à comprendre vos besoins et à fournir une vraie valeur avant que vous ne décidiez de travailler avec nous.',
              },
              {
                q: 'Combien de temps dure généralement une consultation?',
                a: 'La plupart des consultations durent 20-30 minutes. Cela nous donne assez de temps pour comprendre vos exigences, répondre à vos questions et suggérer des propriétés adaptées.',
              },
              {
                q: 'Que dois-je préparer avant la consultation?',
                a: 'Pensez à votre gamme de budget, vos emplacements préférés, le type de propriété (appartement, villa, etc.) et votre calendrier. Avoir une idée approximative nous aide à fournir des recommandations plus pertinentes.',
              },
              {
                q: 'Pouvez-vous me montrer des propriétés lors d\'un appel vidéo?',
                a: 'Absolument! Nous pouvons partager des écrans pour vous guider à travers les annonces, montrer des visites virtuelles et même faire des visites vidéo en direct de propriétés.',
              },
              {
                q: 'Quelles langues parlez-vous?',
                a: 'Notre équipe parle l\'anglais, l\'espagnol et le suédois. Nous pouvons organiser des consultations dans d\'autres langues avec notification préalable.',
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
