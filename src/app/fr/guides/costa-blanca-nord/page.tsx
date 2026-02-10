import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/fr/guides/costa-blanca-nord`

export const metadata: Metadata = {
  title: 'Costa Blanca Nord - Guide Premium Complet 2026',
  description: 'Guide détaillé Costa Blanca Nord: Jávea, Altea, Moraira, Calpe. Paysage spectaculaire, vie cosmopolite, investissement prestige pour acheteurs français.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/costa-blanca-north`,
      sv: `${baseUrl}/sv/guides/costa-blanca-north`,
      nl: `${baseUrl}/nl/guides/costa-blanca-noord`,
      'nl-BE': `${baseUrl}/nl-be/guides/costa-blanca-noord`,
      fr: currentUrl,
      no: `${baseUrl}/no/guides/costa-blanca-nord`,
      de: `${baseUrl}/de/guides/costa-blanca-nord`,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/costa-blanca-north`,
    },
  },
  openGraph: {
    title: 'Costa Blanca Nord - Guide Premium Complet',
    description: 'Jávea, Altea, Moraira - pour investisseurs et couples actifs',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'fr_FR',
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: `${baseUrl}/fr` },
  { name: 'Guides', url: `${baseUrl}/fr/guides` },
  { name: 'Costa Blanca Nord', url: currentUrl },
]

const faqs = [
  {
    question: 'Quelle est la différence entre chaque town du Nord?',
    answer: 'Jávea: prestige premium, falaises spectaculaires, rendement 6-8%. Altea: prestige modéré, villages blancs, rendement 5-7%. Moraira: ultra-prestige, petite, exclusive, rendement 7-9%. Calpe: intermédiaire, falaise fameuse, rendement 5-7%.',
  },
  {
    question: 'Quel est le meilleur pour investisseurs?',
    answer: 'Jávea: meilleur équilibre (prestige + rendement 6-8%). Moraira: meilleur rendement (7-9%) mais cher (600.000€+). Altea: bon marché relatif. Calpe: accessible avec bonne demande.',
  },
  {
    question: 'Combien coûte l\'immobilier au Nord vs Sud?',
    answer: 'Nord (Jávea villa 150m²): 425.000€ - 550.000€. Sud (Torrevieja villa 150m²): 225.000€ - 325.000€. Nord est 85-95% plus cher. Justifié par rendement, appréciation, prestige.',
  },
  {
    question: 'Y a-t-il infrastructure française au Nord?',
    answer: 'Moins dense qu\'au Sud (communauté française moins organisée). Services français disponibles (médecins, restaurants) mais pas "ghetto français". Avantage: plus cosmopolite et international.',
  },
  {
    question: 'Quel est le rendement locatif au Nord?',
    answer: 'Excellent: 6-8% moyen. Clientèle haut de gamme paie plus. Saison de mars à octobre actif. Locations courte durée lucrative.',
  },
  {
    question: 'Combien temps avant appréciation?',
    answer: 'Nord apprécie 5-8% annuels (vs 2-3% au Sud). Sur 5 ans: +25-40%. Sur 10 ans: +60-110%. Appréciation rapide justifie prix initial élevé.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function CostaBlancaNordPage() {
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
            Costa Blanca Nord - Guide Premium Complet 2026
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Costa Blanca Nord (Jávea, Altea, Moraira, Calpe, Benissa) est la région prestige de la côte espagnole. Falaises spectaculaires, vie cosmopolite, loisirs haut de gamme, et excellents rendements immobiliers pour investisseurs sérieux.
          </p>
        </div>

        {/* Section: Overview */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Vue d'Ensemble Costa Blanca Nord</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Faits Clés</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Population: 130.000+ habitants combinés</li>
                <li>Distance Alicante: 90-110 km</li>
                <li>Climat: 300 jours soleil/an</li>
                <li>Paysage: Falaises spectaculaires</li>
                <li>Prix moyen: 4.000€ - 5.500€/m²</li>
                <li>Rendement locatif: 6-8%</li>
                <li>Appréciation: 5-8% annuels</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Pourquoi Investir au Nord?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Prestige et paysage unique</li>
                <li>Population cosmopolite active</li>
                <li>Rendement locatif excellent (6-8%)</li>
                <li>Appréciation rapide (5-8%/an)</li>
                <li>Demande investisseurs forte</li>
                <li>Lifestyle haut de gamme</li>
                <li>Sécurité immobilière</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Towns Comparison */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Villes du Nord: Comparaison</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Jávea - Prestige Major</h3>
              <p className="text-gray-700 text-sm mb-3">
                Destination #1 du Nord. Falaises spectaculaires, vie cosmopolite très active, restaurants excellence, yacht club, golf haut de gamme.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Population:</span> 28.000</p>
                <p><span className="font-semibold">Prix villa 150m²:</span> 425.000€ - 550.000€</p>
                <p><span className="font-semibold">Rendement:</span> 6-8%</p>
                <p><span className="font-semibold">Appréciation:</span> 5-8% annuels</p>
                <p><span className="font-semibold">Ideal pour:</span> Investisseurs, couples actifs prestige</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Moraira - Ultra Prestige</h3>
              <p className="text-gray-700 text-sm mb-3">
                Petite enclave exclusive et haut de gamme. Très prisée milliardaires. Plage privée. Prestige maximal mais prix exorbitant.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Population:</span> 1.800 (tiny!)</p>
                <p><span className="font-semibold">Prix villa 150m²:</span> 500.000€ - 700.000€+</p>
                <p><span className="font-semibold">Rendement:</span> 7-9% (meilleur!)</p>
                <p><span className="font-semibold">Appréciation:</span> 6-10%</p>
                <p><span className="font-semibold">Ideal pour:</span> Ultra-investisseurs, milliardaires</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Altea - Prestige Modéré</h3>
              <p className="text-gray-700 text-sm mb-3">
                "Villages blancs" perchés en montagne. Artistic community, galeries d'art, ambiance bohême. Moins cher que Jávea. Population active.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Population:</span> 6.500</p>
                <p><span className="font-semibold">Prix villa 150m²:</span> 300.000€ - 400.000€</p>
                <p><span className="font-semibold">Rendement:</span> 5-7%</p>
                <p><span className="font-semibold">Appréciation:</span> 4-6%</p>
                <p><span className="font-semibold">Ideal pour:</span> Budget limité, artistes, culture</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Calpe - Falaise Emblématique</h3>
              <p className="text-gray-700 text-sm mb-3">
                Connue pour Peñón d'Ifach (falaise célèbre). Vie balnéaire active. Families nombreuses. Entre Altea économique et Jávea prestige.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Population:</span> 9.000</p>
                <p><span className="font-semibold">Prix villa 120m²:</span> 250.000€ - 350.000€</p>
                <p><span className="font-semibold">Rendement:</span> 5-7%</p>
                <p><span className="font-semibold">Appréciation:</span> 4-6%</p>
                <p><span className="font-semibold">Ideal pour:</span> Familles, budget modéré</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Benissa - Rural & Beach</h3>
              <p className="text-gray-700 text-sm mb-3">
                Village côtier plus tranquille. Moins touristique mais crescent population. Options residences privées.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Population:</span> 3.500</p>
                <p><span className="font-semibold">Prix villa 100m²:</span> 200.000€ - 300.000€</p>
                <p><span className="font-semibold">Rendement:</span> 4-6%</p>
                <p><span className="font-semibold">Appréciation:</span> 3-5%</p>
                <p><span className="font-semibold">Ideal pour:</span> Retraités tranquilles</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Investment Analysis */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Analyse Investissement Détaillée</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Rendement Locatif Comparatif (2026)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Town</th>
                      <th className="text-left py-2 px-2">Rendement</th>
                      <th className="text-left py-2 px-2">Clientèle</th>
                      <th className="text-left py-2 px-2">Saison</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-semibold">Moraira</td>
                      <td className="py-2 px-2">7-9%</td>
                      <td className="py-2 px-2">Ultra prestige</td>
                      <td className="py-2 px-2">Mai-sept</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-semibold">Jávea</td>
                      <td className="py-2 px-2">6-8%</td>
                      <td className="py-2 px-2">Haut de gamme</td>
                      <td className="py-2 px-2">Avr-oct</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-semibold">Calpe</td>
                      <td className="py-2 px-2">5-7%</td>
                      <td className="py-2 px-2">Familles</td>
                      <td className="py-2 px-2">Avr-oct</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-semibold">Altea</td>
                      <td className="py-2 px-2">5-7%</td>
                      <td className="py-2 px-2">Mixte</td>
                      <td className="py-2 px-2">Avr-oct</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Appréciation Immobilière (5-10 ans)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Moraira:</p>
                  <p>+6-10% annuels = +30-60% en 5 ans, +60-160% en 10 ans</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Jávea:</p>
                  <p>+5-8% annuels = +25-40% en 5 ans, +60-110% en 10 ans</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Altea/Calpe:</p>
                  <p>+4-6% annuels = +20-30% en 5 ans, +48-80% en 10 ans</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Scénario Investissement: 500.000€ à Jávea</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p><span className="font-semibold">Année 1 (2026):</span></p>
                <p className="ml-4">Rendement locatif: 35.000€ (7%)</p>
                <p className="ml-4">Appréciation immobilière: 25.000€ (5%)</p>
                <p className="ml-4">Retour total: 60.000€ (12%)</p>
                <p className="ml-4">Valeur propriété: 525.000€</p>
                <div className="border-t pt-2">
                  <p><span className="font-semibold">Année 5 (2031):</span></p>
                  <p className="ml-4">Rendement cumul: 175.000€</p>
                  <p className="ml-4">Appréciation cumul: 125.000€ (25%)</p>
                  <p className="ml-4">Valeur propriété: 625.000€ (+25%)</p>
                  <p className="ml-4">Retour total: 300.000€ (60%)</p>
                </div>
                <div className="border-t pt-2">
                  <p><span className="font-semibold">Année 10 (2036):</span></p>
                  <p className="ml-4">Rendement cumul: 350.000€</p>
                  <p className="ml-4">Appréciation cumul: 300.000€ (60%)</p>
                  <p className="ml-4">Valeur propriété: 800.000€ (+60%)</p>
                  <p className="ml-4">Retour total: 650.000€ (130%)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Lifestyle */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Lifestyle Premium au Nord</h2>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Golf & Loisirs</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Golf Ifach (Calpe): Parcours 18 trous prestige</li>
                <li>Golf clubs privés (Jávea, Moraira)</li>
                <li>Yacht clubs exclusifs</li>
                <li>Sports nautiques haut de gamme</li>
                <li>Marche et rando spectaculaires</li>
                <li>Pêche en haute mer</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Gastronomie Exceptionnelle</h3>
              <p className="text-gray-700 text-sm mb-3">
                Norte est centre gastronomique absolu. Restaurants Michelin-starred, chefs réputés, fruits de mer frais quotidiens.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>25+ restaurants prestige Jávea</li>
                <li>Restaurants français de qualité</li>
                <li>Paella traditional authentique</li>
                <li>Prix: 50€ - 150€+ par personne</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Événements & Culture</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Arenal Sound Festival (Jávea, août)</li>
                <li>Galeries d'art (Altea)</li>
                <li>Marchés artisanaux</li>
                <li>Festivals locaux</li>
                <li>Vie nocturne sophistiquée</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Paysage Naturel</h3>
              <p className="text-gray-700 text-sm">
                Costa Blanca Nord est célèbre pour falaises spectaculaires, calas isolées, sentiers montagneux avec vues mer. Chaque 5km nouvelle surprise.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Infrastructure */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastructure Complète</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Santé</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Hospitals privés modernes</li>
                <li>Médecins francophone</li>
                <li>Cliniques spécialisées</li>
                <li>Services d'urgence 24/7</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Transport</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Bus local extensif</li>
                <li>Gares trains côtière</li>
                <li>Taxi/Uber disponible</li>
                <li>Voiture recommandée</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Shopping</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Boutiques prestige</li>
                <li>Shopping centers</li>
                <li>Supermarkets haut gamme</li>
                <li>Designer boutiques</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Éducation</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Écoles internationales</li>
                <li>Universités Alicante proche</li>
                <li>Services bilingues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Accessibility */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Accessibilité et Vols</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Aéroport Alicante</h3>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Distance Nord:</span> 90-110 km</p>
                <p><span className="font-semibold">Durée:</span> 100-130 minutes voiture</p>
                <p><span className="font-semibold">Vol Paris-Alicante:</span> 2h15</p>
                <p><span className="font-semibold">Fréquence:</span> 3-6 vols quotidiens</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Vols France → Alicante</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li><strong>Paris CDG/Orly:</strong> 4-6 vols/jour, 2h15 vol</li>
                <li><strong>Lyon:</strong> 1 vol/jour, 2h vol</li>
                <li><strong>Marseille:</strong> 2-3 vols/semaine, 2h15 vol</li>
                <li><strong>Toulouse:</strong> 2 vols/semaine, 2h45 vol</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Transports Alicante → Nord</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Voiture (A-7 autoroute): 90-120 min</li>
                <li>Taxi/Uber: €70-90</li>
                <li>Bus direct: 2-2.5h</li>
                <li>Train côtier: 2h</li>
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
          <h2 className="text-2xl font-light mb-4">Investisseur Sérieux? Explorez Costa Blanca Nord</h2>
          <p className="mb-6 text-gray-100">
            Portfolio exclusif de propriétés prestige au Nord avec rendement 6-8% et appréciation 5-8% annuels. Consultation gratuite avec experts français.
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
              Consultation Gratuite
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
