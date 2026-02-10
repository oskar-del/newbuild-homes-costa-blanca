import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guides d\'Achat | Comment Acheter une Maison en Espagne',
  description: 'Guides complets pour les acheteurs français. Processus d\'achat, NIE, frais, hypothèques, taxes et tout ce que vous devez savoir.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

interface BuyerGuide {
  id: string;
  title: string;
  description: string;
  href: string;
}

const buyerGuides: BuyerGuide[] = [
  {
    id: 'processus-achat',
    title: 'Processus d\'Achat',
    description: 'Guide étape par étape pour acheter une maison neuve en Espagne',
    href: '/fr/guides/processus-achat',
  },
  {
    id: 'frais-impots',
    title: 'Frais & Taxes',
    description: 'Comprendre les 10-13% de frais supplémentaires et les taxes locales',
    href: '/fr/guides/frais-impots',
  },
  {
    id: 'hypotheque',
    title: 'Hypothèques pour Étrangers',
    description: 'Obtenir un financement hypothécaire en tant qu\'acheteur français',
    href: '/fr/guides/hypotheque',
  },
  {
    id: 'nie',
    title: 'Numéro NIE',
    description: 'Guide complet du numéro d\'identification fiscale pour les étrangers',
    href: '/fr/guides/nie',
  },
];

export default function FRGuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Guides d'Achat</h1>
            <p className="text-xl text-warm-300 mb-8 max-w-3xl mx-auto">
              Tout ce que vous devez savoir pour acheter une maison neuve en Espagne — spécialement pour les acheteurs français
            </p>
            <p className="text-lg text-warm-200">
              Du numéro NIE aux hypothèques, nous vous guidons à travers chaque étape
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Guides d'Achat pour Français</h2>
            <p className="text-lg text-warm-600">Tout de l'achat d'une propriété étape par étape</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buyerGuides.map((guide) => (
              <Link key={guide.id} href={guide.href}>
                <div className="bg-white border-2 border-warm-200 rounded-sm p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center text-accent-600 text-sm font-semibold">
                    Lire Maintenant
                    <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Service & Support Français</h2>
            <p className="text-lg text-warm-600">Nous comprenons les besoins des acheteurs français</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Conseillers Parlant Français</h3>
              <p className="text-warm-600">
                Notre équipe parle couramment le français et comprend les défis spécifiques aux acheteurs français. Vous êtes toujours dans votre langue.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Expertise Fiscale</h3>
              <p className="text-warm-600">
                Nous vous guidons à travers les implications fiscales en France (impôts sur le revenu, plus-values) et les conventions fiscales France-Espagne.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Réseaux Bancaires Français</h3>
              <p className="text-warm-600">
                Connexions avec les banques françaises (BNP Paribas, Crédit Agricole, Société Générale) et hypothèques espagnoles pour les meilleurs taux.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-sm p-12 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-light mb-6">Comparaison des Prix</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-warm-300 mb-2">Prix en France</p>
                <p className="text-3xl font-bold">€10 000-12 000/m²</p>
                <p className="text-sm text-warm-300">Prix moyen à Paris</p>
              </div>
              <div>
                <p className="text-warm-300 mb-2">Prix Costa Blanca</p>
                <p className="text-3xl font-bold text-accent-400">€1 500-2 500/m²</p>
                <p className="text-sm text-warm-300">Prix moyen régional</p>
              </div>
            </div>
            <p className="text-lg text-warm-200 mb-6">
              Économisez jusqu'à 80% sur le prix au mètre carré tout en maintenant la qualité
            </p>
            <Link href="/fr/contact">
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-sm transition-colors">
                Demander une Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Pourquoi Faire Confiance à Nos Guides?</h2>
            <p className="text-lg text-warm-600">Expertise locale combinée avec compréhension française</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Expertise Locale</h3>
              <p className="text-warm-600">Plus de 15 ans d'expérience sur le marché immobilier de la Costa Blanca</p>
            </div>
            <div className="bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Information Actualisée</h3>
              <p className="text-warm-600">Les règles changent — nous maintenons tout à jour pour les acheteurs français</p>
            </div>
            <div className="bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Focus Français</h3>
              <p className="text-warm-600">Écrit pour les acheteurs français par des personnes qui comprennent votre situation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">Des Questions?</h2>
          <p className="text-xl text-white/90 mb-8">
            Notre équipe française est ici pour répondre à toutes vos questions sur l'achat en Espagne
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fr/contact">
              <button className="bg-primary-900 hover:bg-primary-800 text-white font-bold py-3 px-8 rounded-sm transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                Contactez-Nous
              </button>
            </Link>
            <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0">
              <button className="bg-white hover:bg-warm-100 text-primary-900 font-bold py-3 px-8 rounded-sm transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                WhatsApp
              </button>
            </a>
          </div>

          <p className="text-white/80 text-sm mt-6">
            Réponse rapide en 24 heures — souvent beaucoup plus rapide
          </p>
        </div>
      </section>
    </div>
  );
}
