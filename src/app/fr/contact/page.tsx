import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { localBusinessSchema, breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact | Maisons Neuves Costa Blanca',
  description: 'Contactez Maisons Neuves Costa Blanca. Conseil expert pour acheter du neuf en Espagne. WhatsApp, téléphone, e-mail ou formulaire. Nous parlons français!',
  openGraph: {
    title: 'Contact | Maisons Neuves Costa Blanca',
    description: 'Contactez notre équipe d\'experts. WhatsApp, téléphone ou formulaire. Consultation gratuite pour votre recherche immobilière.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/contact',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Maisons Neuves Costa Blanca',
    description: 'Contactez-nous pour des conseils experts en achat immobilier en Espagne.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/contact',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/contact',
      'sv': 'https://newbuildhomescostablanca.com/sv/contact',
      'nl': 'https://newbuildhomescostablanca.com/nl/contact',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/contact',
      'fr': 'https://newbuildhomescostablanca.com/fr/contact',
      'no': 'https://newbuildhomescostablanca.com/no/contact',
      'x-default': 'https://newbuildhomescostablanca.com/contact',
    },
  },
};

export default function FRContactPage() {
  const businessSchema = localBusinessSchema();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Contact', url: 'https://newbuildhomescostablanca.com/fr/contact/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Nous Contacter</h1>
          <p className="text-xl text-warm-600 max-w-2xl mx-auto">
            Prêt à trouver votre maison de rêve sur la Costa Blanca? Nous sommes ici pour vous guider avec expertise à chaque étape.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-4 mb-8">
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-success-50 hover:bg-success-100 border border-success-200 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-primary-900">WhatsApp</div>
                  <div className="text-sm text-warm-600">Réponse rapide - généralement en quelques minutes</div>
                </div>
                <svg className="w-5 h-5 text-warm-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="tel:+34634044970"
                className="flex items-center gap-4 p-4 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-primary-900">+34 634 044 970</div>
                  <div className="text-sm text-warm-600">Appelez-nous - Français, anglais, espagnol</div>
                </div>
                <svg className="w-5 h-5 text-warm-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="mailto:oskar@hanssonhertzell.com"
                className="flex items-center gap-4 p-4 bg-warm-50 hover:bg-warm-100 border border-warm-200 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 bg-warm-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-primary-900">E-mail</div>
                  <div className="text-sm text-warm-600">oskar@hanssonhertzell.com</div>
                </div>
                <svg className="w-5 h-5 text-warm-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Heures de Bureau</h3>
                <p className="text-sm text-warm-600">
                  Lun-Ven: 09:00 - 18:00<br />
                  Sam-Dim: Sur rendez-vous<br />
                  Tous les horaires en CEST (heure de la Costa Blanca)
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Service en Français</h3>
                <p className="text-sm text-warm-600">
                  Nous parlons couramment le français et pouvons vous guider à travers tout le processus d'achat dans votre langue.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-warm-100 p-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">Envoyez-nous un message</h2>
              <LeadForm />
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-warm-50 rounded-xl">
            <div className="text-4xl mb-3">1000+</div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Maisons</h3>
            <p className="text-warm-600 text-sm">Découvrez notre vaste collection de propriétés neuves sur la Costa Blanca.</p>
          </div>

          <div className="text-center p-8 bg-warm-50 rounded-xl">
            <div className="text-4xl mb-3">15+</div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Années d'Expérience</h3>
            <p className="text-warm-600 text-sm">Notre équipe expérimentée connaît chaque région et peut vous proposer le meilleur match.</p>
          </div>

          <div className="text-center p-8 bg-warm-50 rounded-xl">
            <div className="text-4xl mb-3">Gratuit</div>
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Conseil</h3>
            <p className="text-warm-600 text-sm">Obtenez des conseils personnalisés à chaque étape du processus d'achat sans frais cachés.</p>
          </div>
        </div>
      </div>
    </>
  );
}
