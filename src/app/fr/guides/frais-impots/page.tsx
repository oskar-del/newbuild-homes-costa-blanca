import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Frais et Taxes d\'Achat en Espagne | Guide pour Acheteurs Français 2026',
  description: 'Guide complet des frais et impôts pour acheter un bien immobilier neuf en Espagne. TVA 10%, droits de timbre 1,5%, honoraires, plus-values. Budget pour acheteurs français.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/guides/frais-impots',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/costs-taxes',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/frais-impots',
    },
  },
};

const faqsData = [
  {
    question: 'Combien coûte l\'achat d\'un bien en Espagne en plus du prix ?',
    answer: 'Budgétisez environ 13-14% supplémentaires du prix d\'achat pour les taxes, frais et frais juridiques combinés. Pour une propriété de 250 000€, cela représente 32 500€ à 35 000€ de coûts supplémentaires.',
  },
  {
    question: 'La TVA s\'applique-t-elle à tous les biens immobiliers ?',
    answer: 'La TVA (10%) s\'applique uniquement aux biens neufs. Les propriétés d\'occasion sont soumises à l\'ITP (Impuesto de Transmisiones Patrimoniales) d\'environ 10% selon la région. Nous nous concentrons sur les biens neufs.',
  },
  {
    question: 'Qui paie les frais de notaire ?',
    answer: 'Le prix du notaire (généralement 800€-1 500€) est généralement partagé ou payé par l\'acheteur. Il est négociable et basé sur une tarification gouvernementale standard.',
  },
  {
    question: 'Dois-je payer des impôts annuels sur la propriété ?',
    answer: 'Oui. L\'IBI (impôt sur les biens immobiliers) est une taxe annuelle municipale d\'environ 300€-800€ par an. Les propriétaires non-résidents paient également un impôt de revenus imputés, même sans louer le bien.',
  },
  {
    question: 'Comment sont imposés les revenus de location ?',
    answer: 'Les résidents français doivent déclarer les revenus locatifs en France. En Espagne, les résidents paient 19% d\'impôt sur le bénéfice net, les non-résidents 24% sur le revenu brut. Un double impôt peut s\'appliquer, atténué par la convention fiscale.',
  },
  {
    question: 'Y a-t-il un impôt sur les plus-values ?',
    answer: 'Oui. Les plus-values sont imposées en Espagne à 19% pour les résidents, 24% pour les non-résidents. Les acheteurs français sont également imposés par la France. Consultez un fiscaliste pour optimiser votre stratégie.',
  },
  {
    question: 'Dois-je déclarer ma propriété au fisc français ?',
    answer: 'Oui. Vous devez déclarer la propriété à la France. Les revenus fonciers doivent être déclarés sur votre impôt sur le revenu. Remplissez le formulaire 3916 pour les comptes bancaires espagnols. Consultez votre centre des finances publiques.',
  },
  {
    question: 'Quelle est la différence entre TVA et droits de timbre ?',
    answer: 'La TVA (10%) est un impôt de vente sur les biens neufs. Les droits de timbre (AJD, 1,5%) sont un impôt distinct sur la transaction. Les deux s\'ajoutent au prix d\'achat pour les biens neufs.',
  },
];

export default function FraisImpotsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/fr/guides' },
    { name: 'Frais et impôts', url: 'https://newbuildhomescostablanca.com/fr/guides/frais-impots' },
  ]);

  const faqSchemaData = faqSchema(faqsData);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4 text-warm-200">
              <Link href="/fr/guides" className="hover:text-white">Guides</Link>
              <span className="mx-2">→</span>
              <span>Frais et impôts</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Frais et Impôts Immobiliers en Espagne
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Décomposition complète de tous les coûts lors de l\'achat d\'un bien neuf. Connaissez exactement le budget au-delà du prix d\'achat.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>Lecture : 10 min</span>
              <span>•</span>
              <span>Mis à jour février 2026</span>
              <span>•</span>
              <span className="bg-accent-500/20 text-accent-300 px-2 py-1 rounded-sm">Expert Vérifié</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Summary Box */}
            <div className="bg-primary-50 border-2 border-warm-200 rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4 text-primary-900">Résumé Rapide : Coûts Totaux</h2>
              <p className="text-warm-700 mb-4">
                Lors de l\'achat d\'un <strong>bien immobilier neuf en Espagne</strong>, budgétisez environ <strong>13-14%</strong> supplémentaires du prix d\'achat pour les impôts, frais et frais juridiques.
              </p>
              <div className="text-3xl font-bold text-accent-600">
                Bien de 250 000€ = ~283 250€ à 285 000€ total
              </div>
            </div>

            {/* Impôts d\'Achat */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Impôts d\'Achat</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Les impôts varient selon que vous achetez un <strong>bien neuf</strong> ou <strong>d\'occasion</strong>. Pour les biens neufs, vous payez la TVA et les droits de timbre.
                </p>

                <div className="bg-warm-50 rounded-sm p-6 my-6">
                  <h3 className="text-xl font-semibold mb-4">Biens Neufs</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3"><strong>TVA</strong></td>
                        <td className="py-3 text-right"><strong>10%</strong></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">
                          <strong>AJD (Droits de Timbre)</strong>
                          <p className="text-sm text-warm-500">Actos Jurídicos Documentados - région Valencia</p>
                        </td>
                        <td className="py-3 text-right"><strong>1,5%</strong></td>
                      </tr>
                      <tr className="bg-primary-50">
                        <td className="py-3 font-bold">Impôt Total</td>
                        <td className="py-3 text-right font-bold text-accent-600">11,5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="font-semibold text-yellow-800">Note :</p>
                  <p className="text-yellow-700">Les taux d\'impôt varient selon la région. Les taux ci-dessus sont pour la Communauté Valencienne (qui comprend la Costa Blanca). Les autres régions peuvent différer.</p>
                </div>
              </div>
            </section>

            {/* Frais Professionnels */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Frais Professionnels</h2>

              <div className="space-y-6">
                {/* Notaire */}
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="text-xl font-semibold mb-2">Honoraires Notaire</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Gamme type :</span>
                    <span className="font-bold text-lg">600€ - 1 500€</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Fixés selon une tarification gouvernementale basée sur la valeur du bien. Couvre la préparation et l\'authentification de l\'acte de propriété (Escritura). Votre avocat coordonne généralement la visite chez le notaire.
                  </p>
                </div>

                {/* Cadastre */}
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="text-xl font-semibold mb-2">Cadastre (Registro de la Propiedad)</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Gamme type :</span>
                    <span className="font-bold text-lg">400€ - 800€</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Enregistrement officiel de votre propriété. Basé également sur une tarification gouvernementale.
                  </p>
                </div>

                {/* Avocat */}
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="text-xl font-semibold mb-2">Honoraires Avocat/Juriste</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Taux type :</span>
                    <span className="font-bold text-lg">1% - 1,5% + TVA</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Représentation juridique indépendante. Fortement recommandé pour les acheteurs internationaux. Généralement minimum 1 500€. Nous travaillons avec des avocats francophones expérimentés en transactions immobilières.
                  </p>
                </div>

                {/* Gestoría */}
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="text-xl font-semibold mb-2">Gestoría (Administratif)</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Gamme type :</span>
                    <span className="font-bold text-lg">300€ - 500€</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Gère les formalités administratives : paiements fiscaux, raccordements, demandes de NIE. Souvent inclus dans les honoraires juridiques.
                  </p>
                </div>
              </div>
            </section>

            {/* Décomposition Complète */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Décomposition Complète des Coûts</h2>
              <div className="bg-white border-2 border-warm-200 rounded-sm overflow-hidden">
                <div className="bg-warm-800 text-white p-4">
                  <h3 className="font-semibold">Exemple : Appartement Neuf de 250 000€</h3>
                </div>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Prix d\'achat</td>
                      <td className="p-4 text-right font-semibold">250 000€</td>
                    </tr>
                    <tr className="border-b bg-warm-50">
                      <td className="p-4 font-semibold" colSpan={2}>Impôts</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">TVA (10%)</td>
                      <td className="p-4 text-right">25 000€</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Droits de timbre AJD (1,5%)</td>
                      <td className="p-4 text-right">3 750€</td>
                    </tr>
                    <tr className="border-b bg-warm-50">
                      <td className="p-4 font-semibold" colSpan={2}>Frais Professionnels</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Notaire</td>
                      <td className="p-4 text-right">1 000€</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Cadastre</td>
                      <td className="p-4 text-right">600€</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Honoraires Avocat (1% + TVA)</td>
                      <td className="p-4 text-right">3 025€</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Gestoría</td>
                      <td className="p-4 text-right">400€</td>
                    </tr>
                    <tr className="bg-accent-600 text-white">
                      <td className="p-4 font-bold">COÛT TOTAL</td>
                      <td className="p-4 text-right font-bold text-xl">283 775€</td>
                    </tr>
                    <tr className="bg-primary-50">
                      <td className="p-4 text-primary-800">Coûts supplémentaires en % du prix</td>
                      <td className="p-4 text-right font-bold text-primary-800">13,5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Impôts Annuels */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Coûts Annuels Récurrents</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>Une fois propriétaire en Espagne, budgétisez ces coûts annuels :</p>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm">
                  <div>
                    <strong>IBI (Taxe Foncière)</strong>
                    <p className="text-sm text-warm-600">Impuesto sobre Bienes Inmuebles</p>
                  </div>
                  <span className="font-semibold">300€ - 800€/an</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm">
                  <div>
                    <strong>Collecte des Ordures (Basura)</strong>
                    <p className="text-sm text-warm-600">Taxe annuelle de collecte des déchets</p>
                  </div>
                  <span className="font-semibold">50€ - 150€/an</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm">
                  <div>
                    <strong>Frais de Copropriété</strong>
                    <p className="text-sm text-warm-600">Entretien partagé, piscine, jardins, etc.</p>
                  </div>
                  <span className="font-semibold">600€ - 2 400€/an</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm">
                  <div>
                    <strong>Assurance Habitation</strong>
                    <p className="text-sm text-warm-600">Bâtiments et contenu</p>
                  </div>
                  <span className="font-semibold">200€ - 500€/an</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm">
                  <div>
                    <strong>Impôt Non-Résident</strong>
                    <p className="text-sm text-warm-600">Si vous ne louez pas (impôt sur revenus imputés)</p>
                  </div>
                  <span className="font-semibold">200€ - 600€/an</span>
                </div>
              </div>
            </section>

            {/* Impôts Non-Résidents */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Impôts pour les Propriétaires Non-Résidents</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Si vous êtes propriétaire non-résident en Espagne, vous avez des obligations fiscales même si vous ne louez pas votre bien :
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Si Vous Ne Louez Pas</h3>
                <p>
                  Vous payez un <strong>impôt sur revenus imputés</strong> basé sur la valeur cadastrale. Actuellement :
                </p>
                <ul>
                  <li>Résidents UE/EEE : 19% de 1,1-2% de la valeur cadastrale</li>
                  <li>Résidents non-UE : 24% de 1,1-2% de la valeur cadastrale</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Si Vous Louez</h3>
                <p>
                  Vous payez un impôt sur le revenu locatif. Les résidents UE/EEE déduisent les frais ; les non-résidents paient sur le revenu brut.
                </p>
                <ul>
                  <li>Résidents UE/EEE : 19% sur bénéfice net</li>
                  <li>Résidents non-UE : 24% sur revenu brut</li>
                </ul>

                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="font-semibold text-primary-800">Conseil :</p>
                  <p className="text-primary-700">De nombreux propriétaires utilisent un représentant fiscal ou gestoría pour les déclarations annuelles. Le coût est généralement 100€-200€/an.</p>
                </div>
              </div>
            </section>

            {/* Impôts Français */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Obligations Fiscales Françaises</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  En tant que résident français propriétaire d\'un bien immobilier en Espagne, vous avez des obligations déclaratives en France :
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Déclaration du Bien</h3>
                <p>
                  Signalez l\'acquisition de votre bien à votre centre des finances publiques. Les revenus locatifs doivent être déclarés en tant que revenus fonciers (formulaire 2042).
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Comptes Bancaires Étrangers</h3>
                <p>
                  Vous devez déclarer vos comptes bancaires espagnols. Remplissez le formulaire 3916 (Déclaration de comptes et titres détenus hors de France) lors de votre déclaration annuelle.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Impôt sur les Plus-Values</h3>
                <p>
                  Les gains de capital sont imposés à 36,2% en France (impôt sur le revenu + prélèvements sociaux) sur la plus-value nette. Cependant, la convention fiscale France-Espagne peut réduire cette charge.
                </p>

                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="font-semibold text-primary-800">Conseil Fiscal :</p>
                  <p className="text-primary-700">Consultez un expert-comptable spécialisé en fiscalité internationale. L\'optimisation de votre structure fiscale peut réduire considérablement vos impôts.</p>
                </div>
              </div>
            </section>

            {/* Coûts de Vente */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Frais Lors de la Vente</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>Si vous vendez votre propriété à l\'avenir, budgétisez :</p>
                <ul>
                  <li><strong>Plusvalía Municipal :</strong> Impôt local sur l\'augmentation de la valeur du terrain. Varie selon la commune.</li>
                  <li><strong>Impôt sur les Plus-Values :</strong> 19% pour résidents UE, 24% pour non-UE. Payable sur bénéfice de la vente.</li>
                  <li><strong>Honoraires Agence Immobilière :</strong> Si vous utilisez un agent, généralement 3-5% + TVA.</li>
                  <li><strong>Certificat Énergétique :</strong> Obligatoire pour la vente, 100€-200€.</li>
                </ul>
                <p>
                  Non-résidents : l\'acheteur doit retenir 3% du prix de vente et le verser à l\'administration fiscale en garantie de votre responsabilité en impôts sur les plus-values.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-accent-600 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-4">Besoin d\'une Estimation Personnalisée ?</h2>
              <p className="mb-6 text-warm-300">
                Obtenez une décomposition précise de tous les frais pour votre bien spécifique. Notre équipe peut fournir une estimation détaillée basée sur votre développement choisi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/fr/contact"
                  className="bg-white text-accent-600 px-6 py-3 rounded-sm font-semibold hover:bg-warm-50 transition-colors text-center"
                >
                  Demander une Estimation
                </Link>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  className="border-2 border-white text-white px-6 py-3 rounded-sm font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Nous Contacter via WhatsApp
                </a>
              </div>
            </section>

          </div>
        </article>

        {/* FAQs Section */}
        <section className="py-16 bg-warm-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-light text-center mb-8">Questions Fréquemment Posées</h2>
            <div className="space-y-4">
              {faqsData.map((faq, i) => (
                <details key={i} className="group bg-white rounded-sm border border-warm-200 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-50 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 border-t border-warm-200 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light mb-8 text-center">Guides Connexes</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/fr/guides/processus-achat" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Processus d\'Achat</h3>
                <p className="text-warm-600 text-sm">Guide étape par étape du processus</p>
              </Link>
              <Link href="/fr/guides/nie" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Numéro NIE</h3>
                <p className="text-warm-600 text-sm">Obtenir votre identité fiscale espagnole</p>
              </Link>
              <Link href="/fr/guides/hypotheque" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Hypothèques</h3>
                <p className="text-warm-600 text-sm">Financement pour les étrangers</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
