import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Hypothèques en Espagne pour Français | Guide Financement 2026',
  description: 'Guide complet pour obtenir une hypothèque en Espagne en tant que français. Taux actuels 3-4%, LTV 60-70%, banques françaises et espagnoles, conditions pour non-résidents.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/guides/hypotheque',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/mortgages',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/bolan-spanien',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/hypotheek',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/hypotheque',
      'no': 'https://newbuildhomescostablanca.com/no/guides/boliglan',
      'x-default': 'https://newbuildhomescostablanca.com/guides/mortgages',
    },
  },
};

const mortgageFaqs = [
  {
    question: 'Les français peuvent-ils obtenir une hypothèque en Espagne ?',
    answer: 'Oui. Les banques espagnoles prêtent volontiers aux propriétaires français et autres étrangers. Cependant, les conditions diffèrent des hypothèques résidentielles : ratios LTV plus bas (60-70%), taux légèrement plus élevés et documentation plus stricte.',
  },
  {
    question: 'Quel est le LTV (ratio prêt-valeur) pour les acheteurs français ?',
    answer: 'Pour les non-résidents français, les banques prêtent généralement 60-70% de la valeur du bien. Cela signifie que vous devez prévoir 30-40% d\'apport personnel. C\'est plus strict qu\'en France où les LTV peuvent atteindre 85-90%.',
  },
  {
    question: 'Quels sont les taux hypothécaires actuels en Espagne ?',
    answer: 'Les taux fixes actuels se situent entre 3,5% et 4,5%. Les taux variables sont basés sur l\'Euribor 12 mois (actuellement environ 2,5%) plus la marge bancaire de 1-2%. Les taux sont compétitifs malgré les conditions de non-résident.',
  },
  {
    question: 'BNP Paribas et Crédit Agricole offrent-ils des hypothèques en Espagne ?',
    answer: 'Oui. BNP Paribas opère via sa filiale espagnole BNP Paribas España et propose des hypothèques aux non-résidents. Crédit Agricole a également une présence limitée. Cependant, les banques espagnoles spécialisées comme Sabadell et CaixaBank sont souvent plus compétitives pour les non-résidents.',
  },
  {
    question: 'Combien de temps faut-il pour obtenir une hypothèque ?',
    answer: 'Le processus complet prend généralement 6-10 semaines : préqualification (1-2 semaines), application complète (2-4 semaines), évaluation (1-2 semaines), offre formelle (1 semaine), et signature notariale. Commencez tôt, ne pas attendre le dernier moment.',
  },
  {
    question: 'Quels documents dois-je fournir ?',
    answer: 'Passeport, NIE, dernières déclarations fiscales (2-3 ans), fiches de paie récentes (3-6 mois), contrat de travail, relevés bancaires (3-6 mois), preuve des fonds de l\'apport, et détails de tous les dettes existantes. Les documents doivent être traduits en espagnol.',
  },
  {
    question: 'Comment la France impose-t-elle les intérêts hypothécaires ?',
    answer: 'Contrairement à la France, les intérêts hypothécaires ne sont pas déductibles de l\'impôt sur le revenu français. Les revenus locatifs bruts (moins l\'impôt espagnol déjà payé grâce à la convention fiscale) sont imposables en France.',
  },
  {
    question: 'Puis-je obtenir une hypothèque directement d\'une banque française ?',
    answer: 'Quelques banques françaises (comme BNP Paribas, Société Générale) proposent des hypothèques pour des biens espagnols, généralement avec des conditions moins favorables. Les banques espagnoles spécialisées sont généralement plus compétitives et plus rapides.',
  },
];

export default function HypothequePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/fr/guides' },
    { name: 'Hypothèques', url: 'https://newbuildhomescostablanca.com/fr/guides/hypotheque' },
  ]);

  const faqSchemaData = faqSchema(mortgageFaqs);

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
              <span>Hypothèques</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Hypothèques en Espagne pour les Français
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Tout ce que vous devez savoir pour financer votre achat immobilier en Espagne. Taux, conditions, processus de demande et comparaison bancaire.
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

            {/* Key Facts */}
            <div className="bg-primary-50 border-2 border-warm-200 rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4 text-primary-900">Points Clés pour les Non-Résidents (Février 2026)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-warm-600">LTV Maximum</div>
                  <div className="text-2xl font-bold text-accent-600">60-70%</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-warm-600">Taux Fixe Moyen (25 ans)</div>
                  <div className="text-2xl font-bold text-accent-600">~3,9%</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-warm-600">Durée Maximum</div>
                  <div className="text-2xl font-bold text-accent-600">20-25 ans</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-warm-600">Euribor 12 Mois</div>
                  <div className="text-2xl font-bold text-accent-600">~2,5%</div>
                </div>
              </div>
            </div>

            {/* Les Français Peuvent-ils Emprunter */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Les Français Peuvent-ils Obtenir une Hypothèque en Espagne ?</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  <strong>Oui.</strong> Les banques espagnoles prêtent volontiers aux citoyens français, y compris les non-résidents. Que vous soyez de France, de l\'UE ou ailleurs, vous pouvez financer votre achat immobilier en Espagne.
                </p>
                <p>
                  Cependant, les conditions diffèrent de ce que vous pourriez être habitué en France :
                </p>
                <ul>
                  <li><strong>Ratios LTV plus bas</strong> – Préparez un apport de 30-40%</li>
                  <li><strong>Plus de documentation</strong> – Les banques demandent des preuves solides de revenus stables</li>
                  <li><strong>Vérifications d\'accessibilité plus strictes</strong> – Le paiement mensuel ne dépasse généralement pas 30-35% du revenu</li>
                  <li><strong>Taux légèrement plus élevés</strong> – Bien que toujours compétitifs</li>
                </ul>
              </div>
            </section>

            {/* Ratios LTV */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Ratios Prêt-Valeur (LTV)</h2>
              <div className="bg-warm-50 rounded-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-warm-800 text-white">
                    <tr>
                      <th className="p-4 text-left">Type d\'Acheteur</th>
                      <th className="p-4 text-right">LTV Maximum</th>
                      <th className="p-4 text-right">Apport Min.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Résident Espagnol</td>
                      <td className="p-4 text-right font-semibold">80%</td>
                      <td className="p-4 text-right">20%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Français Non-Résident</td>
                      <td className="p-4 text-right font-semibold">70%</td>
                      <td className="p-4 text-right">30%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Autre Non-Résident UE</td>
                      <td className="p-4 text-right font-semibold">60-70%</td>
                      <td className="p-4 text-right">30-40%</td>
                    </tr>
                    <tr>
                      <td className="p-4">Non-UE (USA, Canada, etc.)</td>
                      <td className="p-4 text-right font-semibold">60-70%</td>
                      <td className="p-4 text-right">30-40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-warm-600 text-sm">
                Note : Le LTV est basé sur la <strong>valeur la plus basse</strong> du prix d\'achat ou de l\'évaluation bancaire. Si la banque évalue votre propriété à un prix inférieur, votre LTV effectif diminue.
              </p>
            </section>

            {/* Taux d\'Intérêt */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Taux d\'Intérêt en 2026</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Les taux hypothécaires espagnols restent compétitifs malgré les augmentations des taux de la BCE. Vous choisirez généralement entre :
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Taux Fixe (Tipo Fijo)</h3>
                <ul>
                  <li>Le taux reste identique pour toute la durée</li>
                  <li>Gamme actuelle : <strong>3,5% - 4,5%</strong></li>
                  <li>Populaire pour la prévisibilité budgétaire</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Taux Variable (Tipo Variable)</h3>
                <ul>
                  <li>Basé sur Euribor + marge bancaire</li>
                  <li>Gamme actuelle : <strong>Euribor + 1% à 2%</strong></li>
                  <li>Plus bas initialement mais peut augmenter</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Taux Mixte (Tipo Mixto)</h3>
                <ul>
                  <li>Fixe pour les 3-10 premières années, puis variable</li>
                  <li>Bon compromis</li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                  <p className="font-semibold text-yellow-800">Euribor Actuel :</p>
                  <p className="text-yellow-700">L\'Euribor 12 mois fluctue. Vérifiez les taux actuels lors de votre demande. Actuellement, il tourne autour de 2,5-3%.</p>
                </div>
              </div>
            </section>

            {/* Documents Requis */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Documents Requis</h2>
              <div className="bg-warm-50 rounded-sm p-6">
                <h3 className="font-semibold mb-4">Salariés :</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Passeport valide (copie de toutes les pages)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Numéro NIE</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Dernières déclarations fiscales (2-3 ans) - avis d\'imposition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>3 dernières fiches de paie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Contrat de travail ou lettre de l\'employeur</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>6 derniers relevés bancaires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Preuve des fonds de l\'apport personnel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Détails de toute dette existante (hypothèques, crédits, etc.)</span>
                  </li>
                </ul>

                <h3 className="font-semibold mb-4">Travailleurs Indépendants :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Tous les documents ci-dessus, plus :</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Comptes professionnels 2-3 ans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Déclarations fiscales professionnelles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 font-bold">✓</span>
                    <span>Lettre de recommandation de votre expert-comptable</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Banques */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Principales Banques pour les Hypothèques</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="font-bold text-lg mb-2">Banco Sabadell</h3>
                  <p className="text-warm-600 text-sm">Populaire auprès des acheteurs français. Conseillers francophones disponibles. Présence importante en Costa Blanca.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="font-bold text-lg mb-2">CaixaBank</h3>
                  <p className="text-warm-600 text-sm">La plus grande banque d\'Espagne. Réseau national étendu. Propose des hypothèques non-résidents via départements spécialisés.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="font-bold text-lg mb-2">BNP Paribas España</h3>
                  <p className="text-warm-600 text-sm">Filiale de BNP Paribas. Bonne option pour les clients français existants. Service multilingue.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="font-bold text-lg mb-2">BBVA</h3>
                  <p className="text-warm-600 text-sm">Grande banque espagnole. Taux compétitifs. Service en anglais disponible dans les zones touristiques.</p>
                </div>
              </div>
            </section>

            {/* Processus */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Processus de Demande d\'Hypothèque</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-lg">Consultation Initiale et Préqualification</h3>
                    <p className="text-warm-700">Soumettez des informations financières de base. La banque fournit une offre indicative montrant combien vous pourriez emprunter. Non-contraignant mais utile pour le budget.</p>
                    <p className="text-sm text-warm-500 mt-1">Délai : 1-2 semaines</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-lg">Demande Complète</h3>
                    <p className="text-warm-700">Une fois le bien trouvé et la réservation signée, soumettez la documentation complète. La banque examine votre dossier en détail.</p>
                    <p className="text-sm text-warm-500 mt-1">Délai : 2-4 semaines</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-lg">Évaluation du Bien</h3>
                    <p className="text-warm-700">La banque organise une évaluation indépendante (tasación). Vous payez ce coût (300€-500€). Le LTV est basé sur cette évaluation.</p>
                    <p className="text-sm text-warm-500 mt-1">Délai : 1-2 semaines</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-lg">Offre Formelle (Oferta Vinculante)</h3>
                    <p className="text-warm-700">La banque émet une offre contraignante détaillant le montant du prêt, le taux, la durée, le paiement mensuel et toutes les conditions. Valide minimum 10 jours par loi.</p>
                    <p className="text-sm text-warm-500 mt-1">Délai : 1 semaine</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-semibold text-lg">Achèvement Chez le Notaire</h3>
                    <p className="text-warm-700">Signez l\'acte hypothécaire le même jour que la signature de la propriété. Un représentant de la banque assiste. Les fonds sont transférés le jour même.</p>
                    <p className="text-sm text-warm-500 mt-1">Délai : Coordonné avec l\'achèvement immobilier</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mt-6">
                <p className="font-semibold text-primary-800">Délai Total :</p>
                <p className="text-primary-700">Prévoyez <strong>6-10 semaines</strong> de la demande complète à l\'achèvement. Commencez tôt – ne pas attendre la dernière minute avant votre date d\'achat.</p>
              </div>
            </section>

            {/* Frais */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Frais de Mise en Place de l\'Hypothèque</h2>
              <div className="bg-warm-50 rounded-sm p-6">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">Évaluation (Tasación)</td>
                      <td className="py-3 text-right font-semibold">300€ - 500€</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Frais de mise en place (certaines banques)</td>
                      <td className="py-3 text-right font-semibold">0 - 1%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Notaire (acte hypothécaire)</td>
                      <td className="py-3 text-right font-semibold">500€ - 800€</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">AJD Impôt sur l\'hypothèque</td>
                      <td className="py-3 text-right font-semibold">Payé par la banque*</td>
                    </tr>
                    <tr>
                      <td className="py-3">Assurance décès-invalidité (souvent requise)</td>
                      <td className="py-3 text-right font-semibold">Variable</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-warm-600 mt-4">*Depuis 2019, les banques payent l\'impôt AJD sur les hypothèques, pas les emprunteurs.</p>
              </div>
            </section>

            {/* Conseils */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Conseils pour la Réussite</h2>
              <div className="space-y-4">
                <div className="bg-success-50 border-l-4 border-success-500 p-4">
                  <p className="font-semibold text-success-800">Obtenez une préqualification tôt</p>
                  <p className="text-success-700">Connaissez votre budget avant de chercher. La préqualification renforce votre position de négociation.</p>
                </div>
                <div className="bg-success-50 border-l-4 border-success-500 p-4">
                  <p className="font-semibold text-success-800">Documents prêts et traduits</p>
                  <p className="text-success-700">Faites traduire en espagnol. Les documents incomplets sont la principale cause de délais.</p>
                </div>
                <div className="bg-success-50 border-l-4 border-success-500 p-4">
                  <p className="font-semibold text-success-800">Comparez les offres</p>
                  <p className="text-success-700">Contactez plusieurs banques. Les taux et conditions varient. Quelques dixièmes de pourcentage signifient des milliers d\'euros sur la durée.</p>
                </div>
                <div className="bg-success-50 border-l-4 border-success-500 p-4">
                  <p className="font-semibold text-success-800">Budgétez de façon prudente</p>
                  <p className="text-success-700">Ne vous étendez pas au maximum. Tenez compte des coûts récurrents, des fluctuations de change et des augmentations de taux potentielles.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-accent-600 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-4">Besoin d\'Aide pour le Financement ?</h2>
              <p className="mb-6 text-warm-300">
                Nous partenons avec des courtiers spécialisés en financement pour les non-résidents. Ils comparent les offres de plusieurs banques espagnoles pour trouver les meilleurs taux et conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/fr/contact"
                  className="bg-white text-accent-600 px-6 py-3 rounded-sm font-semibold hover:bg-warm-50 transition-colors text-center"
                >
                  Nous Contacter
                </Link>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  className="border-2 border-white text-white px-6 py-3 rounded-sm font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  WhatsApp
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
              {mortgageFaqs.map((faq, i) => (
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
              <Link href="/fr/guides/frais-impots" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Frais et Impôts</h3>
                <p className="text-warm-600 text-sm">Décomposition complète des coûts</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
