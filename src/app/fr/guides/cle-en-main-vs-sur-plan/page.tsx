import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/fr/guides/cle-en-main-vs-sur-plan`

export const metadata: Metadata = {
  title: 'Clé en Main vs Sur Plan: Guide Complet pour Acheteurs Français',
  description: 'Comparaison détaillée: clé en main vs off-plan. Délais, prix, risques, et financement pour les acheteurs français en 2026.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/key-ready-vs-off-plan`,
      sv: `${baseUrl}/sv/guides/key-ready-vs-off-plan`,
      nl: `${baseUrl}/nl/guides/kant-en-klaar-vs-ritning`,
      'nl-BE': `${baseUrl}/nl-be/guides/kant-en-klaar-vs-ritning`,
      fr: currentUrl,
      no: `${baseUrl}/no/guides/innflyttingsklar-tegning`,
      de: `${baseUrl}/de/guides/schluesselfertig-vs-planverkauf`,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/key-ready-vs-off-plan`,
    },
  },
  openGraph: {
    title: 'Clé en Main vs Sur Plan: Guide Complet',
    description: 'Comparaison détaillée pour acheteurs français - prix, délais et risques',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'fr_FR',
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: `${baseUrl}/fr` },
  { name: 'Guides', url: `${baseUrl}/fr/guides` },
  { name: 'Clé en Main vs Sur Plan', url: currentUrl },
]

const faqs = [
  {
    question: 'Quelle est la différence principale entre clé-en-main et sur plan?',
    answer: 'Clé-en-main: maison prête à occuper immédiatement, prix plus élevé. Sur plan: maison encore en construction, prix plus bas mais délai d\'attente de 18-36 mois. Clé-en-main donne certitude absolue, sur plan offre meilleur prix.',
  },
  {
    question: 'Combien puis-je économiser en achetant sur plan?',
    answer: 'Environ 10-20% d\'économies en achetant off-plan. Exemple: clé-en-main 300.000€, sur plan peut être 240.000€ - 270.000€. L\'économie compense partiellement l\'attente et les risques de construction.',
  },
  {
    question: 'Quels sont les risques d\'acheter sur plan?',
    answer: 'Risques: retards de construction (8-12 mois non rares), modifications du projet, qualité de construction variable, insolvabilité du promoteur. Seules les maisons assorties d\'assurance promoteur offrent sécurité complète.',
  },
  {
    question: 'Puis-je obtenir un financement pour une maison sur plan?',
    answer: 'Financement possible à partir de 75% de travaux complétés (généralement 18 mois après signature). Paiements échelonnés durant construction. Financement bancaire français accepte les deux options (Crédit Agricole, BNP Paribas, Société Générale).',
  },
  {
    question: 'Quel délai avant d\'emménager?',
    answer: 'Clé-en-main: 0-3 mois. Semi-terminé: 6-12 mois. Sur plan: 18-36 mois (rarement avant). Vérifiez contrats de construction qui spécifient délais avec pénalités en cas retard.',
  },
  {
    question: 'Comment protéger mon argent en achetant sur plan?',
    answer: 'Conditions essentielles: assurance promoteur (garantie promoteur), clause de préemption (remboursement si non-construction), comptes bloqués chez notaire, contrat détaillé. Jamais paiement direct au promoteur sans protection.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function CleEnMainVsSurPlanPage() {
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
            Clé en Main vs Sur Plan: Le Guide Complet pour Acheteurs Français
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Deux approches radicalement différentes d'acheter une maison neuve: payer plus cher mais recevoir immédiatement, ou payer moins cher et attendre. Découvrez laquelle correspond à vos objectifs.
          </p>
        </div>

        {/* Section: Quick Comparison */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Comparaison Rapide</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Critère</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Clé en Main</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Sur Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Prix (300.000€ exemple)</td>
                  <td className="py-3 px-4">300.000€</td>
                  <td className="py-3 px-4">240.000€ - 270.000€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Délai emménagement</td>
                  <td className="py-3 px-4">0-3 mois</td>
                  <td className="py-3 px-4">18-36 mois</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">État physique</td>
                  <td className="py-3 px-4">Visible, inspecté</td>
                  <td className="py-3 px-4">Imagination seulement</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Risque de retard</td>
                  <td className="py-3 px-4">Aucun</td>
                  <td className="py-3 px-4">Élevé (8-12 mois courant)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Financement</td>
                  <td className="py-3 px-4">Immédiatement disponible</td>
                  <td className="py-3 px-4">À partir de 75% travaux</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Personnalisation</td>
                  <td className="py-3 px-4">Aucune</td>
                  <td className="py-3 px-4">Possible selon phases</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Certitude qualité</td>
                  <td className="py-3 px-4">100%</td>
                  <td className="py-3 px-4">80% (dépend constructeur)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Démarches administratives</td>
                  <td className="py-3 px-4">Rapides (1-2 mois)</td>
                  <td className="py-3 px-4">Longues (2-3 mois)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Cle en Main */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Clé en Main - Immédiat et Certain</h2>
          <p className="text-gray-700 mb-6">
            Une maison clé-en-main est entièrement terminée et prête à occuper. Vous voyez exactement ce que vous achetez, inspectez tout, et pouvez emménager dans 1-3 mois après signature.
          </p>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Avantages Clé en Main</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Certitude complète:</strong> Vous voyez la maison finie avant d'acheter</li>
                <li><strong>Délai rapide:</strong> Emménagement en 1-3 mois après signature</li>
                <li><strong>Pas de risque de retard:</strong> Aucune attente d'années</li>
                <li><strong>Financement immédiat:</strong> Banque française libère argent dès signature</li>
                <li><strong>Inspection complète:</strong> Vous vérifiez électricité, plomberie, finitions</li>
                <li><strong>Absence de surprises:</strong> Tout est fini, aucun changement possible</li>
                <li><strong>Démarches simplifiées:</strong> Processus plus rapide qu'off-plan</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Inconvénients Clé en Main</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Prix plus élevé:</strong> 10-20% plus cher que sur plan</li>
                <li><strong>Pas de personnalisation:</strong> Tout est fixé, vous ne pouvez rien changer</li>
                <li><strong>Choix limité:</strong> Moins de propriétés disponibles clé-en-main</li>
                <li><strong>Stocks hétéroclites:</strong> Peut inclure retours ou invendus</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Pricing Clé en Main (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Jávea (Costa Blanca Nord) - Villa 150m²</p>
                  <p>425.000€ - 550.000€ clé-en-main</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Torrevieja (Sud) - Apartment 90m²</p>
                  <p>225.000€ - 300.000€ clé-en-main</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Altea (Centre) - Penthouse 110m²</p>
                  <p>350.000€ - 450.000€ clé-en-main</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Timeline Clé en Main</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Visite virtuelle/sur place</span>
                  <span className="font-semibold">Jour 0 - 1</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Offre et négociation</span>
                  <span className="font-semibold">Jour 1 - 7</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Contrat compromis et NIE</span>
                  <span className="font-semibold">Jour 7 - 21</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Financement bancaire</span>
                  <span className="font-semibold">Jour 21 - 45</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Inspection finale</span>
                  <span className="font-semibold">Jour 40 - 50</span>
                </div>
                <div className="flex justify-between items-start">
                  <span>Signature notaire et livraison</span>
                  <span className="font-semibold">Jour 50 - 90</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Sur Plan */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Sur Plan (Off-Plan) - Économies et Attente</h2>
          <p className="text-gray-700 mb-6">
            Une maison sur plan est encore en construction. Vous voyez des plans et une maquette, l'argent est bloqué, et vous attendez jusqu'à 3 ans avant livraison. En contrepartie, vous payez 10-20% moins cher.
          </p>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Avantages Sur Plan</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Meilleur prix:</strong> 10-20% moins cher que clé-en-main</li>
                <li><strong>Personnalisation possible:</strong> Choisir peinture, sol, finitions lors de phases</li>
                <li><strong>Visites de chantier:</strong> Contrôler avancement construction personnellement</li>
                <li><strong>Financement progressif:</strong> Paiements échelonnés correspondent à construction</li>
                <li><strong>Meilleur choix de bien:</strong> Plus de maisons disponibles off-plan</li>
                <li><strong>Potentiel d'appréciation:</strong> Prix augmente si région se valorise</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Inconvénients Sur Plan</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Long délai:</strong> Attente 18-36 mois (rarement moins)</li>
                <li><strong>Risque de retard:</strong> Retards de 6-12 mois très courants</li>
                <li><strong>Risque promoteur:</strong> Si promoteur fait faillite, votre argent en danger</li>
                <li><strong>Argent bloqué longtemps:</strong> Capital immobilisé pendant ans</li>
                <li><strong>Incertitude qualité:</strong> Qualité dépend constructeur, impossible à vérifier d'avance</li>
                <li><strong>Financement limité:</strong> Banque finance seulement à partir 75% travaux</li>
                <li><strong>Modifications coûteuses:</strong> Changer d'avis après phase initiale = suppléments</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Pricing Sur Plan (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Jávea (Costa Blanca Nord) - Villa 150m²</p>
                  <p>340.000€ - 425.000€ sur plan</p>
                  <p className="text-accent-600">Économie: 50.000€ - 125.000€ vs clé-en-main</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Torrevieja (Sud) - Apartment 90m²</p>
                  <p>180.000€ - 240.000€ sur plan</p>
                  <p className="text-accent-600">Économie: 30.000€ - 60.000€ vs clé-en-main</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Timeline Sur Plan</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Visite maquette et plans</span>
                  <span className="font-semibold">Jour 0 - 1</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Offre et négociation</span>
                  <span className="font-semibold">Jour 1 - 7</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Contrat off-plan signé</span>
                  <span className="font-semibold">Jour 7 - 21</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Paiement réservation (3-5%)</span>
                  <span className="font-semibold">Jour 15</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Construction fondations (4-6 mois)</span>
                  <span className="font-semibold">Mois 1 - 6</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Paiements phase 1 (10-15%)</span>
                  <span className="font-semibold">Mois 4</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Murs et structure (6-10 mois)</span>
                  <span className="font-semibold">Mois 6 - 16</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Paiements phase 2 (20-30%)</span>
                  <span className="font-semibold">Mois 12</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Finitions (8-12 mois)</span>
                  <span className="font-semibold">Mois 16 - 28</span>
                </div>
                <div className="flex justify-between items-start border-b pb-2">
                  <span>Financement bancaire (75% travaux)</span>
                  <span className="font-semibold">Mois 18 - 20</span>
                </div>
                <div className="flex justify-between items-start">
                  <span>Livraison et paiement final</span>
                  <span className="font-semibold">Mois 24 - 36</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Financing */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Financement: Comment Ça Marche?</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Financement Clé en Main</h3>
              <p className="text-gray-700 mb-3">
                Plus simple et rapide. Vous présentez contrat d'achat à la banque, ils font évaluation, et après approbation libèrent argent dès signature notaire.
              </p>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Banques françaises acceptant:</span> BNP Paribas, Crédit Agricole, Société Générale, Caisse d'Épargne</p>
                <p><span className="font-semibold">Taux:</span> 3,5% - 4,5% selon profil et garanties</p>
                <p><span className="font-semibold">LTV (Loan-to-Value):</span> jusqu'à 80% du prix</p>
                <p><span className="font-semibold">Durée:</span> jusqu'à 30 ans</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Financement Sur Plan</h3>
              <p className="text-gray-700 mb-3">
                Plus compliqué. Banque finance seulement à partir de 75% de travaux (généralement mois 18-20 après signature). Avant ça, vous payez de votre poche.
              </p>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Phase 1-2 (Mois 1-12):</span> Vous payez 25-35% de votre poche</p>
                <p><span className="font-semibold">Financement à partir mois 18:</span> Banque finance 80% du montant encore dû</p>
                <p><span className="font-semibold">Avantage:</span> Paiements échelonnés = moins impact trésorerie mensuelle</p>
                <p><span className="font-semibold">Risque:</span> Si trésorerie difficile, peut être problématique</p>
              </div>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Exemple Financement: Apartment 250.000€ Sur Plan</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Réservation (3%)</span>
                  <span className="font-semibold">7.500€ (de votre poche)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Compromis (10%)</span>
                  <span className="font-semibold">25.000€ (de votre poche)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Phase 1 construction (20%)</span>
                  <span className="font-semibold">50.000€ (de votre poche, mois 4-6)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Phase 2 construction (20%)</span>
                  <span className="font-semibold">50.000€ (de votre poche, mois 12)</span>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Total avant financement: 132.500€ de votre poche</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Financement bancaire mois 18 (80% restant):</p>
                  <p>(250.000 - 132.500) × 80% = 94.000€ emprunté</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Dernier paiement à livraison:</p>
                  <p>23.500€ de votre poche</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Risks & Protection */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Risques et Protection en Achat Sur Plan</h2>

          <div className="space-y-6">
            <div className="bg-red-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Principaux Risques Sur Plan</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Retards de construction:</strong> 50% des projets prennent 6-12 mois de retard</li>
                <li><strong>Insolvabilité promoteur:</strong> Promoteur peut faire faillite, votre argent bloqué</li>
                <li><strong>Modifications de projet:</strong> Promoteur peut réduire terrasse, parking, finitions</li>
                <li><strong>Problèmes de qualité:</strong> Découverts après livraison = garantie au constructeur</li>
                <li><strong>Financement impossible:</strong> Si retards trop longs, banque refuse financer</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Protections Obligatoires en Espagne</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Assurance Promoteur (Garantie Promoteur):</strong> Obligatoire en Espagne, protège 100% votre versement si promoteur ne livre pas</li>
                <li><strong>Compte Bloqué Notaire:</strong> Votre argent ne va pas directement au promoteur, bloqué chez notaire</li>
                <li><strong>Contrat détaillé:</strong> Spécifier prix fixes, délais avec pénalités, finitions exactes</li>
                <li><strong>Clause de Préemption:</strong> Si maison non-terminée, vous pouvez être remboursé</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Vérifier Avant d'Acheter Sur Plan</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Assurance promoteur est en place et à jour</li>
                <li>Contrat spécifie délais avec pénalités jour par jour</li>
                <li>Compte notaire bloqué (jamais directement au promoteur)</li>
                <li>Historique du promoteur: projets antérieurs terminés on-time</li>
                <li>Santé financière promoteur: pas de dettes massives</li>
                <li>Avis d'autres acheteurs sur ce promoteur</li>
                <li>Clause permettant résiliation si retard supérieur à 6 mois</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-2">
                <strong>Conseil Important:</strong> Utilisez un notaire français ou bilingue pour contrats off-plan. Les termes techniques espagnols peuvent être mal compris. Votre notaire français protège vos intérêts.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Decision Matrix */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Qui Doit Choisir Clé en Main? Qui Doit Choisir Sur Plan?</h2>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3 text-lg">Choisissez Clé en Main Si:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vous voulez emménager rapidement (dans 3 mois)</li>
                <li>Vous préférez certitude complète avant d'acheter</li>
                <li>Vous avez argent liquide disponible maintenant</li>
                <li>Vous n'avez pas patience pour 2-3 ans d'attente</li>
                <li>Vous êtes retraité et voulez jouir vie immédiatement</li>
                <li>Votre hypothèque dépend de financement rapide</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3 text-lg">Choisissez Sur Plan Si:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vous cherchez meilleur prix (réduction 10-20%)</li>
                <li>Vous avez temps à attendre et patience</li>
                <li>Vous pouvez personnaliser finitions/couleurs</li>
                <li>Vous investissez avec financement progressif</li>
                <li>Vous voulez paiements échelonnés</li>
                <li>Vous croyez région va se valoriser avant livraison</li>
                <li>Vous avez fait confiance au promoteur (bon historique)</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Profils Types Acheteurs</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold">Retraité français (60-70 ans) venant vivre en Espagne:</p>
                  <p>→ Clé-en-main est meilleur (quitter France rapidement, jouir vie immédiatement)</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Jeune couple acheteur premier bien (30-45 ans):</p>
                  <p>→ Sur plan peut être bon (financement progressif, économies, temps d'attendre)</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Investisseur immobilier cherchant rendement:</p>
                  <p>→ Sur plan préférable (prix bas = rendement plus élevé, appréciation potentielle)</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Acheteur indécis ou ayant change d'avis courant:</p>
                  <p>→ Clé-en-main (sur plan = contrats très contraignants)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-primary-900 mb-8">Foire aux Questions</h2>
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
          <h2 className="text-2xl font-light mb-4">Besoin d'Aide pour Choisir?</h2>
          <p className="mb-6 text-gray-100">
            Nos conseillers français peuvent évaluer votre situation et recommander clé-en-main ou sur plan selon vos objectifs. Consultation gratuite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition"
            >
              Contacter par WhatsApp
            </Link>
            <Link
              href="/fr/contact"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition"
            >
              Demander Consultation
            </Link>
          </div>
        </section>

        {/* Back to guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/fr/guides"
            className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
          >
            Retour à tous les Guides
          </Link>
        </div>
      </main>
    </div>
  )
}
