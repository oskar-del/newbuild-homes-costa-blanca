import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/fr/guides/nord-vs-sud`

export const metadata: Metadata = {
  title: 'Costa Blanca Nord vs Sud: Guide Comparatif pour Acheteurs Français',
  description: 'Comparaison complète Nord (Jávea, Altea) vs Sud (Torrevieja): prix, style de vie, climat, infrastructure, et recommandations pour acheteurs français.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/north-vs-south`,
      sv: `${baseUrl}/sv/guides/north-vs-south`,
      nl: `${baseUrl}/nl/guides/noord-vs-zuid`,
      'nl-BE': `${baseUrl}/nl-be/guides/noord-vs-zuid`,
      fr: currentUrl,
      no: `${baseUrl}/no/guides/nord-vs-sor`,
      de: `${baseUrl}/de/guides/nord-vs-sued`,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/north-vs-south`,
    },
  },
  openGraph: {
    title: 'Costa Blanca Nord vs Sud: Guide Complet',
    description: 'Comparaison détaillée pour acheteurs français - prix, climat, style de vie',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'fr_FR',
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: `${baseUrl}/fr` },
  { name: 'Guides', url: `${baseUrl}/fr/guides` },
  { name: 'Nord vs Sud', url: currentUrl },
]

const faqs = [
  {
    question: 'Quelle est la différence principale entre le Nord et le Sud de la Costa Blanca?',
    answer: 'Nord (Jávea, Altea): plus cher (4.000€ - 5.500€/m²), falaises spectaculaires, population active, loisirs premium. Sud (Torrevieja): moins cher (1.800€ - 3.500€/m²), plages plates, population retraités/familles, loisirs variés.',
  },
  {
    question: 'Quel est le meilleur pour les retraités français?',
    answer: 'Sud généralement meilleur: coût vie inférieur (25-30% moins cher), communauté française établie, infrastructure pour retraités excellente, loisirs adaptés. Nord mieux pour actifs/jeunes couples cherchant prestige.',
  },
  {
    question: 'Y a-t-il une grande différence de prix entre Nord et Sud?',
    answer: 'Oui, très importante. Example: villa 150m² coûte 425.000€ - 550.000€ à Jávea (Nord) vs 225.000€ - 325.000€ à Torrevieja (Sud). Différence: 45-55% moins cher au Sud.',
  },
  {
    question: 'Quel est le climat le meilleur?',
    answer: 'Sud légèrement meilleur: 310 jours de soleil/an vs 300 au Nord, tempé moins variable. Nord un peu plus frais en hiver (plus montagneux). Été similaire (28-30°C).',
  },
  {
    question: 'Quelle région a meilleur rendement locatif?',
    answer: 'Nord (Jávea): 6-8% rendement avec clientèle haut de gamme. Sud (Torrevieja): 5-7% rendement mais volumes touristiques plus élevés. Nord = rendement meilleur, Sud = volume meilleur.',
  },
  {
    question: 'Quelle distance du prochain aéroport?',
    answer: 'Nord (Jávea) à Alicante: 90 km, 90-120 min. Sud (Torrevieja) à Alicante: 50 km, 45-60 min. Sud plus proche. Alternative Sud: aéroport Murcie (100 km).',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function NordVsSudPage() {
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
            Costa Blanca Nord vs Sud: Guide Comparatif Complet
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Choisir entre le Nord (Jávea, Altea, Moraira) et le Sud (Torrevieja, Orihuela Costa) de la Costa Blanca est une décision majeure. Découvrez les différences essentielles en prix, style de vie, climat et infrastructure.
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
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Nord (Jávea, Altea)</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Sud (Torrevieja)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Prix moyen/m²</td>
                  <td className="py-3 px-4">4.000€ - 5.500€</td>
                  <td className="py-3 px-4">1.800€ - 3.500€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Villa 150m² prix</td>
                  <td className="py-3 px-4">425.000€ - 550.000€</td>
                  <td className="py-3 px-4">225.000€ - 325.000€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Coût vie (couple/mois)</td>
                  <td className="py-3 px-4">2.500€ - 3.500€</td>
                  <td className="py-3 px-4">1.800€ - 2.500€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Paysage</td>
                  <td className="py-3 px-4">Falaises spectaculaires</td>
                  <td className="py-3 px-4">Plages plates</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Rendement locatif</td>
                  <td className="py-3 px-4">6-8%</td>
                  <td className="py-3 px-4">5-7%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Population retraités</td>
                  <td className="py-3 px-4">30-40%</td>
                  <td className="py-3 px-4">50-60%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Distance Alicante</td>
                  <td className="py-3 px-4">90 km (90 min)</td>
                  <td className="py-3 px-4">50 km (45 min)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Vols directs France</td>
                  <td className="py-3 px-4">Paris CDG, Lyon</td>
                  <td className="py-3 px-4">Paris CDG, Orly, Lyon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Costa Blanca Nord */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Costa Blanca Nord - Prestige et Activité</h2>
          <p className="text-gray-700 mb-6">
            Le Nord (Jávea, Altea, Moraira, Calpe) est la Costa Blanca des falaises spectaculaires, de la vie active, et de prestige. C'est plus cher mais offre sophistication et loisirs premium.
          </p>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Avantages du Nord</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Paysage spectaculaire: falaises, vue mer</li>
                <li>Population active et cosmopolite</li>
                <li>Loisirs premium: golf haut de gamme, yacht clubs</li>
                <li>Restaurants et bars de qualité supérieure</li>
                <li>Rendement locatif meilleur (6-8%)</li>
                <li>Appréciation immobilière plus rapide</li>
                <li>Communautés expat bien établies</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Inconvénients du Nord</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Prix très élevés (45-55% plus cher qu'au Sud)</li>
                <li>Coût vie supérieur (restaurants, loisirs)</li>
                <li>Plus éloigné d'Alicante (90 km)</li>
                <li>Hiver plus frais (risque gelée rare)</li>
                <li>Terrain montagneux = problèmes constructifs</li>
                <li>Moins de communauté française établie</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Pricing Nord (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Jávea:</p>
                  <p>Villa 150m² = 425.000€ - 550.000€ | Apartment 90m² = 300.000€ - 400.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Altea:</p>
                  <p>Villa 150m² = 350.000€ - 450.000€ | Apartment 90m² = 250.000€ - 350.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Moraira:</p>
                  <p>Villa 150m² = 500.000€ - 650.000€ | Apartment 90m² = 350.000€ - 450.000€</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Coût de Vie Mensuel Nord (Couple, 2026)</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Loyer (si loué)/Charges (si propriétaire)</span>
                  <span className="font-semibold">700€ - 1.000€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Supermarché et restaurants</span>
                  <span className="font-semibold">600€ - 800€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Golf et loisirs</span>
                  <span className="font-semibold">300€ - 600€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Transports et voiture</span>
                  <span className="font-semibold">200€ - 300€</span>
                </div>
                <div className="flex justify-between">
                  <span>Santé et assurances</span>
                  <span className="font-semibold">150€ - 250€</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total mensuel</span>
                  <span>2.500€ - 3.500€</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Costa Blanca Sud */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Costa Blanca Sud - Accessibilité et Communauté</h2>
          <p className="text-gray-700 mb-6">
            Le Sud (Torrevieja, Orihuela Costa, Guardamar) est plus accessible, avec communauté française très établie et coûts de vie nettement inférieurs. C'est le choix populaire des retraités français.
          </p>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Avantages du Sud</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Prix 45-55% moins cher qu'au Nord</li>
                <li>Coût vie inférieur 30-40%</li>
                <li>Communauté française très établie</li>
                <li>Infrastructure adaptée aux retraités</li>
                <li>Plages longues et plates</li>
                <li>Plus proche d'Alicante (50 km)</li>
                <li>Climat très stable et ensoleillé</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Inconvénients du Sud</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Paysage moins spectaculaire</li>
                <li>Population moins active/cosmopolite</li>
                <li>Moins d'options loisirs premium</li>
                <li>Rendement locatif légèrement inférieur (5-7%)</li>
                <li>Appréciation immobilière plus lente</li>
                <li>Atmosphere plus "retraite" que "aventure"</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Pricing Sud (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Torrevieja:</p>
                  <p>Villa 150m² = 225.000€ - 325.000€ | Apartment 90m² = 140.000€ - 200.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Orihuela Costa:</p>
                  <p>Villa 150m² = 240.000€ - 340.000€ | Apartment 90m² = 150.000€ - 220.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Guardamar:</p>
                  <p>Villa 150m² = 210.000€ - 300.000€ | Apartment 90m² = 130.000€ - 180.000€</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Coût de Vie Mensuel Sud (Couple, 2026)</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Loyer (si loué)/Charges (si propriétaire)</span>
                  <span className="font-semibold">500€ - 700€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Supermarché et restaurants</span>
                  <span className="font-semibold">400€ - 550€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Activités et loisirs</span>
                  <span className="font-semibold">150€ - 300€</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Transports et voiture</span>
                  <span className="font-semibold">150€ - 250€</span>
                </div>
                <div className="flex justify-between">
                  <span>Santé et assurances</span>
                  <span className="font-semibold">150€ - 200€</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total mensuel</span>
                  <span>1.800€ - 2.500€</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Climate Comparison */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Climat: Lequel Est Meilleur?</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-sm p-6 border-gray-200">
                <h3 className="font-semibold text-primary-900 mb-3">Climat Nord (Jávea)</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div>
                    <p className="font-semibold">Jours de soleil/an:</p>
                    <p>300 jours</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Janvier:</p>
                    <p>Min 8°C / Max 16°C</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Juillet:</p>
                    <p>Min 22°C / Max 30°C</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Gel/Neige:</p>
                    <p>Exceptionnel</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-sm p-6 border-gray-200">
                <h3 className="font-semibold text-primary-900 mb-3">Climat Sud (Torrevieja)</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div>
                    <p className="font-semibold">Jours de soleil/an:</p>
                    <p>310 jours (meilleur!)</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Janvier:</p>
                    <p>Min 9°C / Max 17°C</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Juillet:</p>
                    <p>Min 23°C / Max 31°C</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Gel/Neige:</p>
                    <p>Jamais</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Verdict:</strong> Le Sud a légèrement meilleur climat (310 vs 300 jours soleil, plus chaud en hiver, jamais gel). Mais différence minime. Choisir basé sur style de vie plutôt que climat.
              </p>
            </div>
          </div>
        </section>

        {/* Section: French Community */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Communauté Française: Nord vs Sud</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Communauté Française Nord</h3>
              <p className="text-gray-700 mb-3">
                Moins dense et moins organisée. Vous trouverez Français mais pas communauté établie comme au Sud. Avantage: plus international, moins "ghetto français".
              </p>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">% Français:</span> 10-15% population étrangère</p>
                <p><span className="font-semibold">Infrastructure française:</span> Quelques restaurants/services</p>
                <p><span className="font-semibold">Clubs/Associations:</span> Limités, surtout expat generiques</p>
                <p><span className="font-semibold">Écoles françaises:</span> Aucune, écoles internationales uniquement</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Communauté Française Sud</h3>
              <p className="text-gray-700 mb-3">
                Très forte et bien organisée. Communauté française la plus grande d'Espagne. Vous trouverez tout en français, amis facilement, infrastructure pour Français.
              </p>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">% Français:</span> 20-30% population étrangère (5.000+ Français)</p>
                <p><span className="font-semibold">Infrastructure française:</span> Nombreux restaurants, services en français, médecins français</p>
                <p><span className="font-semibold">Clubs/Associations:</span> Association Française, clubs loisirs, pétanque, bridge, danse</p>
                <p><span className="font-semibold">Écoles françaises:</span> Lycée français à Alicante (40 km), école française à Torrevieja</p>
              </div>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Implications pour Acheteurs Français</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Retraité aimant rester français:</strong> Sud meilleur (communauté établie)</li>
                <li><strong>Jeune couple voulant s'intégrer localement:</strong> Nord meilleur (moins insulaire)</li>
                <li><strong>Besoin services en français:</strong> Sud = avantage majeur</li>
                <li><strong>Cherchant amis français rapidement:</strong> Sud beaucoup plus facile</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Investment */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Investissement Immobilier: Nord ou Sud?</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Rendement Locatif Nord</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p><span className="font-semibold">Rendement moyen:</span> 6-8% brut</p>
                <p><span className="font-semibold">Clientèle:</span> Haut de gamme, couples actifs, jeunes familles aisées</p>
                <p><span className="font-semibold">Saison:</span> Avril-septembre très actif, octobre-mars plus calme</p>
                <p><span className="font-semibold">Prix nuit (haute saison):</span> 180€ - 300€ (villa/apartment)</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Rendement Locatif Sud</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p><span className="font-semibold">Rendement moyen:</span> 5-7% brut</p>
                <p><span className="font-semibold">Clientèle:</span> Retraités, familles, locations longues durée aussi</p>
                <p><span className="font-semibold">Saison:</span> Octobre-avril très actif (retraités hivernants), mai-septembre calme</p>
                <p><span className="font-semibold">Prix nuit (haute saison):</span> 100€ - 180€ (apartment), 150€ - 250€ (villa)</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Exemple Rendement: 300.000€ Investis</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="border rounded p-3">
                  <p className="font-semibold">Nord (Jávea) @ 7%:</p>
                  <p>Rendement annuel: 21.000€ brut</p>
                  <p>Après charges (30%): 14.700€ net</p>
                </div>
                <div className="border rounded p-3">
                  <p className="font-semibold">Sud (Torrevieja) @ 6%:</p>
                  <p>Rendement annuel: 18.000€ brut</p>
                  <p>Après charges (25%): 13.500€ net</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Verdict Investissement:</strong> Nord meilleur rendement si location courte durée. Sud meilleur si mélange court/long terme. Nord = appréciation plus rapide. Sud = volume locataire plus stable.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Accessibility */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Accessibilité: Vols et Transports</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-sm p-6 border-gray-200">
                <h3 className="font-semibold text-primary-900 mb-3">Nord (Jávea)</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div>
                    <p className="font-semibold">Aéroport Alicante:</p>
                    <p>90 km, 90-120 min voiture</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Vols de France:</p>
                    <p>Paris CDG, Orly, Lyon, Marseille</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Route nationale:</p>
                    <p>N-332 directe (bonne qualité)</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Train:</p>
                    <p>Gare locale, ligne côtière</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-sm p-6 border-gray-200">
                <h3 className="font-semibold text-primary-900 mb-3">Sud (Torrevieja)</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div>
                    <p className="font-semibold">Aéroport Alicante:</p>
                    <p>50 km, 45-60 min voiture (PLUS PROCHE)</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Aéroport Murcie:</p>
                    <p>100 km, 90 min voiture</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Vols de France:</p>
                    <p>Paris CDG, Orly, Lyon, Marseille, Toulouse, Bordeaux</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="font-semibold">Route/Bus:</p>
                    <p>A-37 autoroute directe, bus Alicante</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Verdict:</strong> Sud beaucoup plus accessible. 45 min vs 2h vers aéroport. Plus d'options vols. Considération majeure pour retraités visitant France fréquemment.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Decision Guide */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Comment Choisir: Nord ou Sud?</h2>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3 text-lg">Choisissez le Nord Si:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vous êtes actif et cherchez vie cosmopolite</li>
                <li>Budget immobilier supérieur à 400.000€</li>
                <li>Vous investissez pour rendement (6-8%)</li>
                <li>Vous aimez paysage spectaculaire</li>
                <li>Vous voulez loisirs premium (golf haut gamme)</li>
                <li>Vous êtes couple jeune/actif</li>
                <li>Moins important d'avoir amis français</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3 text-lg">Choisissez le Sud Si:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vous êtes retraité cherchant vie tranquille</li>
                <li>Budget immobilier inférieur à 300.000€</li>
                <li>Vous cherchez communauté française</li>
                <li>Coût vie important (retraite fixe)</li>
                <li>Accessible aéroport crucial (visitant France souvent)</li>
                <li>Vous préférez vie simple et décontractée</li>
                <li>Infrastructure adaptée retraites importante</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Profils Types</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold">Retraité français 65+ ans, retraite 2.000€/mois:</p>
                  <p>→ SUD FORTEMENT RECOMMANDÉ</p>
                  <p className="text-xs mt-1">Coût vie inférieur, communauté française, accessible aéroport</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Couple 45 ans, actifs professionnellement:</p>
                  <p>→ NORD LÉGÈREMENT MEILLEUR</p>
                  <p className="text-xs mt-1">Vie active, loisirs, prestige, appréciation rapide</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Investisseur cherchant rendement maximal:</p>
                  <p>→ NORD (6-8% vs 5-7%)</p>
                  <p className="text-xs mt-1">Meilleur rendement malgré prix initial élevé</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold">Famille française cherchant équilibre:</p>
                  <p>→ CENTRE (Altea, Benidorm)</p>
                  <p className="text-xs mt-1">Compromis: prix modérés, loisirs, accessibilité</p>
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
          <h2 className="text-2xl font-light mb-4">Besoin Conseil pour Choisir?</h2>
          <p className="mb-6 text-gray-100">
            Nous connaissons intimement Nord et Sud. Nos conseillers français peuvent évaluer votre profil et recommander région idéale pour vous.
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
