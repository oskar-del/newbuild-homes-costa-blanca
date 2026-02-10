import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'À Propos | Maisons Neuves Costa Blanca',
  description: 'Découvrez notre expertise dans l\'immobilier neuf sur la Costa Blanca. 15+ années au service des acheteurs français, belges et suisses.',
  openGraph: {
    title: 'À Propos | Maisons Neuves Costa Blanca',
    description: 'Nos experts du marché immobilier vous accompagnent pour trouver votre maison sur la Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/about',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/about',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/about',
      'sv': 'https://newbuildhomescostablanca.com/sv/about',
      'nl': 'https://newbuildhomescostablanca.com/nl/about',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/about',
      'fr': 'https://newbuildhomescostablanca.com/fr/about',
      'no': 'https://newbuildhomescostablanca.com/no/about',
      'x-default': 'https://newbuildhomescostablanca.com/about',
    },
  },
};

export default function FRAboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'À Propos', url: 'https://newbuildhomescostablanca.com/fr/about/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Nous Parlons <span className="font-semibold">Français</span>
              </h1>
              <p className="text-warm-300 text-lg leading-relaxed">
                Depuis plus de 15 ans, nous aidons les acheteurs français, belges et suisses à trouver leur maison de rêve sur la Costa Blanca. Nos experts locaux connaissent chaque région comme leur poche.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-light text-primary-900 mb-6">
                  Notre <span className="font-semibold">Mission</span>
                </h2>
                <div className="space-y-4 text-warm-600">
                  <p>
                    Nous croyons que trouver la bonne propriété devrait être une expérience agréable et transparente. Trop de sociétés font passer le profit avant les besoins du client. Pas nous.
                  </p>
                  <p>
                    Notre mission est simple : être votre partenaire de confiance tout au long du processus d'achat. Du premier coup d'œil à la signature chez le notaire, nous sommes à vos côtés.
                  </p>
                  <p>
                    Nous parlons votre langue, comprenons votre culture, et connaissons les nuances juridiques et fiscales spécifiques aux acheteurs français en Espagne.
                  </p>
                </div>
              </div>
              <div className="bg-warm-100 rounded-sm p-8 border border-warm-300">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">15+</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900">Années d'Expérience</h3>
                      <p className="text-warm-600 text-sm">Spécialisés dans l'immobilier neuf sur la Costa Blanca</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">500+</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900">Familles Aidées</h3>
                      <p className="text-warm-600 text-sm">Satisfaites dans leur nouvelle maison</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900">Langues</h3>
                      <p className="text-warm-600 text-sm">Français, English, Español, Deutsch, Svenska</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
              Pourquoi Nous <span className="font-semibold">Choisir?</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Expertise Locale</h3>
                <p className="text-warm-600">
                  Nous connaissons personnellement les développeurs, les banques, les notaires et les avocats. Cela signifie des transactions plus fluides pour vous.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Service en Français</h3>
                <p className="text-warm-600">
                  Pas d'interprètes, pas de malentendus. Nous parlons français couramment et connaissons les préoccupations spécifiques des acheteurs français.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Transparence Totale</h3>
                <p className="text-warm-600">
                  Pas de frais cachés. Nous expliquons chaque étape, chaque coût, chaque contrat. Vous êtes toujours au courant.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Conseil Fiscal</h3>
                <p className="text-warm-600">
                  Nous vous guidons à travers les implications fiscales en France (impôts sur le revenu, plus-values, impôts locaux).
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Accès Prioritaire</h3>
                <p className="text-warm-600">
                  Accès aux propriétés neuves avant qu'elles ne soient annoncées publiquement. Nous aidons nos clients à trouver les meilleurs deals.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Assistance Après Vente</h3>
                <p className="text-warm-600">
                  Votre relation avec nous ne s'arrête pas à la signature. Nous continuons à soutenir nos clients longtemps après l'achat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-8 text-center">
              Notre <span className="font-semibold">Processus</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">1</div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Consultation Gratuite</h3>
                  <p className="text-warm-600">Nous discutons de vos besoins, votre budget, votre style de vie et vos aspirations pour la Costa Blanca.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">2</div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Sélection de Propriétés</h3>
                  <p className="text-warm-600">Nous sélectionnons les propriétés qui correspondent parfaitement à vos critères et vous les présentons avec analyses détaillées.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">3</div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Visites Organisées</h3>
                  <p className="text-warm-600">Nous organisons des visites à votre convenance. Pas de pression, juste des explications complètes.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">4</div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Négociations & Contrats</h3>
                  <p className="text-warm-600">Nous négocions en votre nom et nous assurons que tous les contrats sont clairs et légaux.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">5</div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Finalisation</h3>
                  <p className="text-warm-600">Nous coordonnons avec le notaire, les banques et tous les organismes pour une clôture sans tracas.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">6</div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Remise des Clés</h3>
                  <p className="text-warm-600">Vous recevez les clés et nous restons disponibles pour toute question future.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Prêt à <span className="font-semibold">Commencer?</span>
            </h2>
            <p className="text-warm-300 mb-8 text-lg">
              Contactez-nous dès aujourd'hui pour une consultation gratuite. Pas d'engagement, pas de frais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fr/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Demander une Consultation
              </Link>
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
