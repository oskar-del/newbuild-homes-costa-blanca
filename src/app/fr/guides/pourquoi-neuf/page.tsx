import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/fr/guides/pourquoi-neuf`

export const metadata: Metadata = {
  title: 'Pourquoi Acheter une Maison Neuve en Espagne en 2026',
  description: 'Guide complet: pourquoi les maisons neuves offrent les meilleures garanties, conditions de financement et avantages fiscaux pour les acheteurs français.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/why-new-build`,
      sv: `${baseUrl}/sv/guides/why-new-build`,
      nl: `${baseUrl}/nl/guides/waarom-nieuwbouw`,
      'nl-BE': `${baseUrl}/nl-be/guides/waarom-nieuwbouw`,
      fr: currentUrl,
      no: `${baseUrl}/no/guides/hvorfor-nybygg`,
      de: `${baseUrl}/de/guides/warum-neubau`,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/why-new-build`,
    },
  },
  openGraph: {
    title: 'Pourquoi Acheter Neuf en Espagne',
    description: 'Guide complet des avantages des maisons neuves pour les acheteurs français',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'fr_FR',
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: `${baseUrl}/fr` },
  { name: 'Guides', url: `${baseUrl}/fr/guides` },
  { name: 'Pourquoi Acheter Neuf', url: currentUrl },
]

const faqs = [
  {
    question: 'Quels sont les principaux avantages d\'une maison neuve?',
    answer: 'Les maisons neuves offrent: garanties constructeur (10 ans), aucune rénovation nécessaire, meilleure efficacité énergétique, financement plus facile (jusqu\'à 80% pour les neufs vs 70% pour l\'ancien), et prix fixes connus d\'avance.',
  },
  {
    question: 'Combien coûte une maison neuve sur la Costa Blanca?',
    answer: 'Les prix varient de 1.500€ à 4.500€/m² selon la localisation. Pour un appartement de 100m², comptez entre 150.000€ et 450.000€. Les neufs sont généralement 15-25% plus chers que l\'ancien au m² mais offrent des avantages compensant le surcoût.',
  },
  {
    question: 'Puis-je obtenir un financement pour une maison neuve?',
    answer: 'Oui, les banques françaises (BNP Paribas, Société Générale, Crédit Agricole) financent facilement les neufs jusqu\'à 80% du prix d\'achat. Les taux sont généralement plus compétitifs pour les neufs (moins de risque).',
  },
  {
    question: 'Y a-t-il des avantages fiscaux pour les neufs?',
    answer: 'Vous bénéficiez de la TVA réduite (10%) si achetés avant 3 ans, pas de droits de mutation (ahorro de 6-10%), et amortissement possible du bien pour les investisseurs (3% à 3,33% annuel). Convention fiscale France-Espagne vous protège.',
  },
  {
    question: 'Combien de temps avant de pouvoir occuper une maison neuve?',
    answer: 'Cela dépend de la phase. Les off-plans peuvent prendre 18-36 mois avant livraison. Les clé-en-main sont disponibles immédiatement. Les semi-terminés prennent généralement 6-12 mois.',
  },
  {
    question: 'Quels problèmes pourrais-je rencontrer avec une maison ancienne?',
    answer: 'Les anciennes maisons nécessitent souvent des rénovations coûteuses (électricité, plomberie, toiture), les garanties n\'existent pas, et les financements sont limités. Vous pouvez aussi rencontrer des surprises lors de l\'inspection.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function PourquoiNeufPage() {
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
            Pourquoi Acheter une Maison Neuve en Espagne en 2026
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Que vous soyez retraité français cherchant à vous installer à la Costa Blanca ou investisseur immobilier, une maison neuve offre des avantages incomparables. Découvrez pourquoi les maisons neuves représentent le meilleur investissement pour les acheteurs français.
          </p>
        </div>

        {/* Section: Overview */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Pourquoi Privilégier la Maison Neuve?</h2>
          <p className="text-gray-700 mb-6">
            Acheter neuf est une décision stratégique. Contrairement à un achat ancien, une maison neuve est un bien sans historique, construit aux dernières normes de qualité et efficacité énergétique. Pour un acheteur français, c'est sécurité et tranquillité d'esprit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Avantages Maisons Neuves</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Garanties constructeur 10 ans</li>
                <li>Aucune rénovation à prévoir</li>
                <li>Meilleure isolation thermique</li>
                <li>Normes de sécurité modernes</li>
                <li>Financement plus facile (jusqu'à 80%)</li>
                <li>Prix fixes et transparents</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Problèmes Maisons Anciennes</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Rénovations coûteuses</li>
                <li>Pas de garanties</li>
                <li>Installations vieillies</li>
                <li>Problèmes structurels cachés</li>
                <li>Financement limité (70%)</li>
                <li>Négociations difficiles</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Guarantees */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Garanties Légales - Sécurité Totale</h2>
          <p className="text-gray-700 mb-6">
            En Espagne, tout constructeur doit fournir des garanties légales. Pour les acheteurs français, c'est une protection comparable au droit français et couvert par la convention fiscale franco-espagnole.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Garantie de Réception (1 an)</h3>
              <p className="text-gray-700">
                Le constructeur répond de tous les défauts manifestes lors de la livraison. Les petits défauts de finition doivent être corrigés dans les 30 jours.
              </p>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Garantie de Solidité (3 ans)</h3>
              <p className="text-gray-700">
                Le constructeur garantit la solidité de la structure (fondations, murs porteurs). Tous les éléments doivent être fonctionnels.
              </p>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Assurance Décennale (10 ans)</h3>
              <p className="text-gray-700">
                Couverture d'assurance obligatoire pour les défauts graves affectant la solidité du bâtiment. C'est la protection ultime pour votre investissement.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Pour les acheteurs français:</strong> Ces garanties sont reconnues en France et peuvent être actionnées même si vous vivez en France. Vous êtes protégé par la convention fiscale franco-espagnole.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Pricing */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Prix Transparents et Financements Avantageux</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Prix des Neufs (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Costa Blanca Nord (Jávea, Moraira):</p>
                  <p className="text-gray-700">3.500€ - 5.000€/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Costa Blanca Centre (Altea):</p>
                  <p className="text-gray-700">2.800€ - 4.200€/m²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Costa Blanca Sud (Torrevieja):</p>
                  <p className="text-gray-700">1.800€ - 3.500€/m²</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Financement Immobilier</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Maisons Neuves:</p>
                  <p>Financement jusqu'à 80% du prix, taux à partir de 3,5%, durée jusqu'à 30 ans</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Maisons Anciennes:</p>
                  <p>Financement jusqu'à 70% du prix, taux à partir de 4,2%, durée jusqu'à 25 ans</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Banques Françaises Proposant le Financement</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>BNP Paribas:</strong> Crédit immobilier espagnol pour résidents français</li>
                <li><strong>Société Générale:</strong> Solutions hypothécaires personnalisées</li>
                <li><strong>Crédit Agricole:</strong> Financement groupé avec avantages pour clients français</li>
                <li><strong>Banques espagnoles:</strong> Bankia, BBVA, CaixaBank avec meilleure connaissance locale</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Tax Benefits */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Avantages Fiscaux pour les Acheteurs Français</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">TVA Réduite (10%)</h3>
              <p className="text-gray-700 mb-3">
                Les maisons neuves (moins de 3 ans) bénéficient de la TVA réduite à 10% au lieu de 21%. Cela représente une économie de 11% sur le prix d'achat — une réduction considérable.
              </p>
              <p className="text-gray-700 text-sm">
                Exemple: Un bien de 300.000€ avec TVA réduite économise 33.000€ comparé à la TVA normale.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Pas de Droits de Mutation</h3>
              <p className="text-gray-700 mb-3">
                Les neufs ne sont pas soumis à la "Transmisión de Bienes Inmuebles" (droits de mutation) qui s'appliquent aux anciennes maisons à 6-10%.
              </p>
              <p className="text-gray-700 text-sm">
                Économie: Un bien de 300.000€ neuf épargne 18.000€ - 30.000€ en droits de mutation.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Amortissement Immobilier (Investisseurs)</h3>
              <p className="text-gray-700 mb-3">
                Si vous investissez (location courte durée), la structure du bâtiment est amortissable à 3-3,33% annuellement, ce qui réduit vos impôts français.
              </p>
              <p className="text-gray-700 text-sm">
                Pour un bien de 300.000€, l'amortissement représente 9.000€ - 10.000€ déductibles chaque année.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 mb-2">
                <strong>Convention Fiscale France-Espagne:</strong> Vous êtes protégé par la convention fiscale franco-espagnole qui évite la double imposition. Les revenus locatifs en Espagne peuvent être déclarés en France avec crédit d'impôt.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Zero Renovation */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Zéro Rénovation - Zéro Surprise</h2>

          <div className="space-y-6">
            <p className="text-gray-700">
              L'une des plus grandes dépenses lors d'un achat immobilier ancien est la rénovation. Une maison neuve élimine complètement cette préoccupation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Maison Neuve (0 €)</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                  <li>Électricité conforme norme</li>
                  <li>Plomberie moderne</li>
                  <li>Isolation thermique optimale</li>
                  <li>Toiture neuve garantie</li>
                  <li>Fenêtres et portes neuves</li>
                  <li>Carrelage/parquet neuf</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Maison Ancienne (15.000€+)</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                  <li>Électricité peut être datée</li>
                  <li>Plomberie rouille possible</li>
                  <li>Isolation médiocre</li>
                  <li>Toiture peut fuir</li>
                  <li>Fenêtres usées</li>
                  <li>Carrelage/parquet usé</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Coûts de Rénovation Typiques (Ancien)</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Électricité complète</span>
                  <span className="font-semibold">3.000€ - 8.000€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Plomberie et sanitaires</span>
                  <span className="font-semibold">2.000€ - 5.000€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Toiture et charpente</span>
                  <span className="font-semibold">5.000€ - 15.000€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Fenêtres et portes</span>
                  <span className="font-semibold">3.000€ - 8.000€</span>
                </div>
                <div className="flex justify-between">
                  <span>Peinture et finitions</span>
                  <span className="font-semibold">2.000€ - 4.000€</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total estimé</span>
                  <span>15.000€ - 40.000€+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Energy Efficiency */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Efficacité Énergétique - Économies Durables</h2>

          <div className="space-y-6">
            <p className="text-gray-700">
              Les maisons neuves en Espagne respectent la norme CTE (Código Técnico de la Edificación) qui impose une excellente isolation thermique. Cela se traduit par des factures d'électricité et de climatisation beaucoup plus faibles.
            </p>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Classe Énergétique des Maisons Neuves</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Classe A ou B (Excellent)</p>
                  <p className="text-gray-700 text-sm">Toutes les maisons neuves construites après 2020. Consommation minimale.</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Factures Électriques Moyennes (2026)</p>
                  <p className="text-gray-700 text-sm">Neuf: 80€ - 120€/mois | Ancien: 150€ - 250€/mois</p>
                  <p className="text-gray-700 text-sm font-semibold text-accent-600">Économie: 840€ - 2.040€ par an</p>
                </div>
              </div>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Équipements Modernes Standard</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fenêtres double vitrage haute performance</li>
                <li>Chauffage efficace (radiateurs / pompe à chaleur)</li>
                <li>Climatisation moderne et réglable par zone</li>
                <li>Appareils électroménagers classe A+</li>
                <li>Système de ventilation équilibré</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Quality Standards */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Normes de Qualité Moderne</h2>

          <div className="space-y-6">
            <p className="text-gray-700">
              Les constructeurs sérieux suivent les normes internationales de construction. Cela signifie des matériaux de qualité, une main-d'œuvre expérimentée, et des inspections régulières pendant la construction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-sm p-6 border-gray-200">
                <h3 className="font-semibold text-primary-900 mb-3">Contrôles de Qualité</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                  <li>Inspections par les autorités locales</li>
                  <li>Certifications CTE (norme de construction)</li>
                  <li>Tests de stabilité structurale</li>
                  <li>Vérification des installations électriques/plomberie</li>
                  <li>Contrôle final avant livraison</li>
                </ul>
              </div>

              <div className="border rounded-sm p-6 border-gray-200">
                <h3 className="font-semibold text-primary-900 mb-3">Matériaux de Qualité</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                  <li>Béton conforme aux normes</li>
                  <li>Acier renforcé certifié</li>
                  <li>Isolation thermique professionnelle</li>
                  <li>Menuiserie de qualité supérieure</li>
                  <li>Appareils sanitaires renommés</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Conseil:</strong> Choisissez un constructeur réputé avec historique de projets terminés à temps et dans le budget. Vérifiez les avis des anciens acheteurs et les références de projets antérieurs.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Timeline */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Timeline d'Achat et Livraison</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Clé en Main (Prêt à Occuper)</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Durée avant livraison:</span> Immédiat à 3 mois</p>
                <p><span className="font-semibold">Processus:</span> Signature → Inspection → Livraison</p>
                <p className="text-accent-600 font-semibold">Idéal si vous voulez emménager rapidement</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Semi-Terminé (Finitions en Cours)</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Durée avant livraison:</span> 6-12 mois</p>
                <p><span className="font-semibold">Processus:</span> Visite régulière de chantier, finitions personnalisées possibles</p>
                <p className="text-accent-600 font-semibold">Bon compromis prix/délai</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Off-Plan (En Construction)</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Durée avant livraison:</span> 18-36 mois</p>
                <p><span className="font-semibold">Processus:</span> Réservation → Paiements échelonnés → Livraison</p>
                <p className="text-accent-600 font-semibold">Meilleur prix mais patience requise</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Financements Échelonnés (Off-Plan)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Pour un achat off-plan, les paiements sont généralement échelonnés:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li><strong>Réservation:</strong> 3.000€ - 5.000€ (non-remboursable)</li>
                <li><strong>Compromis (Contrat):</strong> 10-20% du prix</li>
                <li><strong>Phases de construction:</strong> 30-40% en plusieurs versements</li>
                <li><strong>Livraison:</strong> Solde final (30-50%)</li>
                <li><strong>Financement bancaire:</strong> Souvent après 75% de travaux</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: International Buyers */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Avantages Spécifiques pour les Acheteurs Français</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Pas de NIE Requis pour Acheter Neuf</h3>
              <p className="text-gray-700 text-sm">
                Pour une maison neuve, vous pouvez signer le contrat avec votre passeport français. Le NIE peut être obtenu après l'achat. C'est plus simple et rapide qu'une maison ancienne.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Assistance Complète des Constructeurs</h3>
              <p className="text-gray-700 text-sm">
                Les grands constructeurs offrent assistance pour obtenir le NIE, ouverture de compte bancaire espagnol, et démarches administratives. C'est un service inclus dans votre achat.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Documentation en Français</h3>
              <p className="text-gray-700 text-sm">
                La plupart des constructeurs sérieux fournissent documentation en français et peuvent faciliter communication avec notaire français et banque française.
              </p>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Garanties Reconnues en France</h3>
              <p className="text-gray-700 text-sm">
                Les garanties constructeur espagnoles (décennale surtout) sont reconnues et opposables en France. Vous avez recours légaux même en France.
              </p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Conseil important:</strong> Utilisez un notaire français ou un notaire espagnol parlant français. Les frais notariaux sont environ 5% du prix d'achat (moins cher que la France).
              </p>
            </div>
          </div>
        </section>

        {/* Section: Investment Potential */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Potentiel d'Investissement</h2>

          <div className="space-y-6">
            <p className="text-gray-700">
              Au-delà de la résidence personnelle, une maison neuve sur la Costa Blanca peut être un excellent investissement locatif pour les acheteurs français.
            </p>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Rendements Locatifs (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Location courte durée (tourisme):</p>
                  <p>5-8% rendement annuel brut en haute saison</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Location longue durée (résidentiel):</p>
                  <p>3-4% rendement annuel brut</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Exemple: Appartement 300.000€</p>
                  <p>Location courte durée: 15.000€ - 24.000€/an</p>
                  <p>Location longue durée: 9.000€ - 12.000€/an</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Avantages Fiscaux pour Investisseurs</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Amortissement de 3-3,33% annuels déductible</li>
                <li>Frais de gestion locative déductibles</li>
                <li>Intérêts hypothécaires déductibles en partie</li>
                <li>Convention France-Espagne évite double imposition</li>
                <li>Déductions pour entretien et réparations</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Zones Touristiques Les Plus Rentables</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Jávea (Costa Blanca Nord):</strong> 6-8% rendement, clientèle haut de gamme</li>
                <li><strong>Torrevieja (Sud):</strong> 5-7% rendement, forte demande étrangère</li>
                <li><strong>Moraira/Calpe:</strong> 5-6% rendement, prestige et fiabilité</li>
              </ul>
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
          <h2 className="text-2xl font-light mb-4">Prêt à Investir dans une Maison Neuve?</h2>
          <p className="mb-6 text-gray-100">
            Découvrez notre sélection exclusive de maisons neuves clé-en-main sur la Costa Blanca. Financement français disponible pour les acheteurs français.
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
              Formulaire de Contact
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
