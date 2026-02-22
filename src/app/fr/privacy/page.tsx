import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | New Build Homes Costa Blanca',
  description: 'Politique de confidentialité de New Build Homes Costa Blanca. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/privacy',
  },
};

export default function PrivacyPageFr() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Politique de confidentialité', url: 'https://newbuildhomescostablanca.com/fr/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/fr/" className="hover:text-white transition-colors">Accueil</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Politique de confidentialité</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Politique de confidentialité
            </h1>
            <p className="text-warm-300 mt-4">
              Dernière mise à jour : Février 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Introduction</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;nous,&quot; &quot;notre,&quot; ou &quot;nos&quot;) s'engage à protéger votre vie privée.
                Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et sécurisons vos informations lorsque vous
                visitez notre site web newbuildhomescostablanca.com.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Informations que nous collectons</h2>

              <h3 className="text-lg font-semibold text-primary-900">Données personnelles</h3>
              <p className="text-warm-700">
                Lorsque vous remplissez nos formulaires de contact ou de demande, nous pouvons collecter :
              </p>
              <ul className="text-warm-700">
                <li>Nom</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone</li>
                <li>Préférences et exigences en matière d'immobilier</li>
                <li>Gamme budgétaire</li>
                <li>Calendrier d'achat</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Informations collectées automatiquement</h3>
              <p className="text-warm-700">
                Lorsque vous visitez notre site web, nous pouvons collecter automatiquement certaines informations, notamment :
              </p>
              <ul className="text-warm-700">
                <li>Adresse IP</li>
                <li>Type et version du navigateur</li>
                <li>Pages visitées et durée de visite</li>
                <li>Site web de référence</li>
                <li>Informations sur l'appareil</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Cookies</h2>
              <p className="text-warm-700">
                Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience de navigation.
                Vous pouvez contrôler les préférences de cookies via notre banneau de consentement aux cookies.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Types de cookies que nous utilisons</h3>
              <ul className="text-warm-700">
                <li><strong>Cookies essentiels :</strong> Nécessaires au bon fonctionnement du site web</li>
                <li><strong>Cookies d'analyse :</strong> Nous aident à comprendre comment les visiteurs utilisent notre site (Google Analytics)</li>
                <li><strong>Cookies de marketing :</strong> Utilisés pour suivre les visiteurs sur les sites web à des fins publicitaires</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. Comment nous utilisons vos informations</h2>
              <p className="text-warm-700">Nous utilisons les informations collectées pour :</p>
              <ul className="text-warm-700">
                <li>Répondre à vos demandes et demandes d'immobilier</li>
                <li>Vous envoyer des informations sur les propriétés qui correspondent à vos critères</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Analyser les modèles d'utilisation du site web</li>
                <li>Respecter les obligations légales</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Partage des données</h2>
              <p className="text-warm-700">
                Nous pouvons partager vos informations avec :
              </p>
              <ul className="text-warm-700">
                <li>Les promoteurs immobiliers et les constructeurs lorsque vous manifestez de l'intérêt pour des développements spécifiques</li>
                <li>Nos partenaires de confiance (avocats, conseillers hypothécaires) lorsque demandé</li>
                <li>Les prestataires de services qui nous aident à gérer notre site web</li>
                <li>Les autorités légales lorsque requis par la loi</li>
              </ul>
              <p className="text-warm-700">
                Nous ne vendrons jamais vos informations personnelles à des tiers.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Vos droits (RGPD)</h2>
              <p className="text-warm-700">
                En vertu du Règlement général sur la protection des données (RGPD), vous avez le droit de :
              </p>
              <ul className="text-warm-700">
                <li><strong>Accès :</strong> Demander une copie de vos données personnelles</li>
                <li><strong>Rectification :</strong> Demander la correction de données inexactes</li>
                <li><strong>Suppression :</strong> Demander la suppression de vos données personnelles</li>
                <li><strong>Restriction du traitement :</strong> Demander la limitation de la façon dont nous utilisons vos données</li>
                <li><strong>Portabilité des données :</strong> Recevoir vos données dans un format portable</li>
                <li><strong>Opposition :</strong> S'opposer au traitement de vos données personnelles</li>
                <li><strong>Retrait du consentement :</strong> Retirer le consentement à tout moment</li>
              </ul>
              <p className="text-warm-700">
                Pour exercer l'un de ces droits, veuillez nous contacter à{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Sécurité des données</h2>
              <p className="text-warm-700">
                Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos informations
                personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cependant,
                aucune méthode de transmission sur Internet n'est 100 % sécurisée.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Conservation des données</h2>
              <p className="text-warm-700">
                Nous conservons vos informations personnelles aussi longtemps que nécessaire pour remplir les objectifs
                énoncés dans cette politique, sauf si une période de rétention plus longue est requise par la loi. Les données de demande
                sont généralement conservées pendant 3 ans après votre dernière interaction avec nous.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Services tiers</h2>
              <p className="text-warm-700">
                Notre site web peut utiliser des services tiers, notamment :
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (analyse du site web)</li>
                <li>Google Tag Manager (gestion des balises)</li>
                <li>Netlify (hébergement de site web et traitement des formulaires)</li>
                <li>WhatsApp (service de messagerie)</li>
              </ul>
              <p className="text-warm-700">
                Ces services ont leurs propres politiques de confidentialité régissant l'utilisation de vos informations.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Confidentialité des enfants</h2>
              <p className="text-warm-700">
                Notre site web n'est pas destiné aux enfants de moins de 16 ans. Nous ne collectons pas sciemment
                d'informations personnelles provenant d'enfants de moins de 16 ans.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Modifications de cette politique</h2>
              <p className="text-warm-700">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous notifierons les modifications
                en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date &quot;Dernière mise à jour&quot;.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Nous contacter</h2>
              <p className="text-warm-700">
                Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :
              </p>
              <ul className="text-warm-700">
                <li>E-mail : <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Téléphone : <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp : <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Nous envoyer un message</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
