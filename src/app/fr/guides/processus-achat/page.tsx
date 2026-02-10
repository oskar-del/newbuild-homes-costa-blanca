import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Processus d\'Achat Immobilier en Espagne | Guide Complet 2026',
  description: 'Guide complet étape par étape pour acheter un bien immobilier neuf en Espagne. Processus d\'achat, NIE, signature de contrat, paiements de construction, achèvement notarial. Conseils spécialisés pour les acheteurs français.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/guides/processus-achat',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/buying-process',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/processus-achat',
    },
  },
};

const buyingFaqs = [
  {
    question: 'Combien de temps faut-il pour acheter un bien immobilier en Espagne ?',
    answer: 'Le processus d\'achat dure généralement 8-12 semaines de la réservation à l\'achèvement pour les biens clés en main. Pour les achats sur plan, vous signerez le contrat dans les 30-60 jours suivant la réservation, puis attendrez 12-24 mois la fin de la construction.',
  },
  {
    question: 'Ai-je besoin d\'un avocat pour acheter un bien en Espagne ?',
    answer: 'Bien que non obligatoire légalement, nous recommandons fortement de faire appel à un avocat indépendant. Il vérifiera les contrats, s\'assurera que le bien est légalement en règle, gérera la demande de NIE et vous représentera chez le notaire si nécessaire. Comptez 1-1,5% du prix d\'achat.',
  },
  {
    question: 'Puis-je acheter sans numéro NIE ?',
    answer: 'Non. Le NIE (Número de Identificación de Extranjero) est obligatoire pour tous les achats immobiliers en Espagne. Vous en aurez également besoin pour ouvrir un compte bancaire, signer les contrats d\'utilités et payer les impôts. Demandez-le rapidement car son obtention peut prendre 1-4 semaines.',
  },
  {
    question: 'Quel dépôt dois-je prévoir pour acheter en Espagne ?',
    answer: 'Vous verserez généralement entre 3 000€ et 10 000€ de dépôt de réservation, puis 20-30% à la signature du contrat. Pour les biens sur plan, des versements supplémentaires de 20-30% sont effectués pendant la construction, avec 40-50% dus à l\'achèvement.',
  },
  {
    question: 'Mon dépôt est-il protégé lors d\'un achat sur plan ?',
    answer: 'Oui. La loi espagnole (Loi 20/2015) exige que les promoteurs fournissent une garantie bancaire ou une assurance pour tous les versements antérieurs à l\'achèvement. En cas d\'insolvabilité du promoteur, vous avez droit au remboursement complet avec intérêts.',
  },
  {
    question: 'Quels sont les différences entre un notaire français et un notaire espagnol ?',
    answer: 'Le notaire espagnol joue un rôle similaire au notaire français pour authentifier l\'acte de vente. Cependant, en Espagne, le notaire authentifie l\'Escritura (acte de propriété) mais ne gère pas l\'intégralité des démarches administratives comme en France. Un avocat ou gestor (administratif) est souvent nécessaire pour certaines étapes.',
  },
  {
    question: 'Comment déclarer mon bien immobilier aux autorités fiscales françaises ?',
    answer: 'Vous devez déclarer votre bien aux impôts français. Signalez l\'acquisition sur votre déclaration de revenus (formulaire 2042). Les revenus locatifs doivent être déclarés en tant que revenus fonciers. Consultez votre centre des finances publiques ou un expert-comptable pour les détails.',
  },
  {
    question: 'Y a-t-il un traité fiscal entre la France et l\'Espagne pour éviter la double imposition ?',
    answer: 'Oui. La convention fiscale France-Espagne de 1990 prévient la double imposition. L\'Espagne a droit d\'imposer les revenus locatifs et les plus-values sur l\'immeuble. La France ne peut imposer que les plus-values et certaines situations. Un expert-comptable peut vous aider à optimiser votre fiscalité.',
  },
];

export default function ProcessusAchatPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/fr/guides' },
    { name: 'Processus d\'achat', url: 'https://newbuildhomescostablanca.com/fr/guides/processus-achat' },
  ]);

  const faqSchemaData = faqSchema(buyingFaqs);

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
              <span>Processus d\'achat</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Acheter un Bien Immobilier Neuf en Espagne
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Guide complet étape par étape pour acheter un bien sur plan ou clés en main en Costa Blanca. Du numéro NIE à l\'achèvement notarial — tout ce que vous devez savoir.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>Lecture : 12 min</span>
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

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-warm-700 leading-relaxed">
                Acheter un bien immobilier neuf en Espagne offre des avantages considérables par rapport à l\'immobilier d\'occasion : normes de construction modernes, efficacité énergétique, garanties constructeur et possibilité de personnaliser les finitions. Ce guide vous accompagne dans l\'ensemble du processus, de la première visite à la remise des clés.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-warm-50 rounded-sm p-6 mb-12">
              <h2 className="text-lg font-semibold mb-4">Sommaire</h2>
              <ol className="space-y-2 text-warm-700">
                <li><a href="#etape-1" className="text-accent-600 hover:underline">1. Recherche et Sélection du Bien</a></li>
                <li><a href="#etape-2" className="text-accent-600 hover:underline">2. Accord de Réservation</a></li>
                <li><a href="#etape-3" className="text-accent-600 hover:underline">3. Obtention du Numéro NIE</a></li>
                <li><a href="#etape-4" className="text-accent-600 hover:underline">4. Ouverture d\'un Compte Bancaire Espagnol</a></li>
                <li><a href="#etape-5" className="text-accent-600 hover:underline">5. Contrat d\'Achat Privé</a></li>
                <li><a href="#etape-6" className="text-accent-600 hover:underline">6. Versements Pendant la Construction</a></li>
                <li><a href="#etape-7" className="text-accent-600 hover:underline">7. Inspection des Défauts</a></li>
                <li><a href="#etape-8" className="text-accent-600 hover:underline">8. Achèvement Chez le Notaire</a></li>
              </ol>
            </div>

            {/* Étape 1 */}
            <section id="etape-1" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">1</span>
                Recherche et Sélection du Bien
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Commencez par définir vos critères : localisation, type de bien, budget et délai. Pour les biens neufs, vous choisirez généralement entre :
                </p>
                <ul>
                  <li><strong>Sur plan :</strong> Achat avant la fin de la construction (généralement 12-24 mois de délai). Prix d\'entrée plus bas, options de personnalisation.</li>
                  <li><strong>En cours de construction :</strong> La construction a commencé, achèvement prévu dans 6-12 mois.</li>
                  <li><strong>Clés en main :</strong> Achevé et prêt à emménager. Ce que vous voyez est ce que vous obtenez.</li>
                </ul>
                <p>
                  Nous recommandons de visiter la Costa Blanca en personne. Notre équipe propose des visites et des tours vidéo pour les acheteurs d\'outre-mer.
                </p>
              </div>
            </section>

            {/* Étape 2 */}
            <section id="etape-2" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">2</span>
                Accord de Réservation
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Une fois le bien choisi, vous signerez un <strong>accord de réservation</strong> et verserez un dépôt pour retirer le bien du marché. Celui-ci est généralement :
                </p>
                <ul>
                  <li><strong>3 000€ à 10 000€</strong> selon la valeur du bien</li>
                  <li>Généralement conservé pendant <strong>30-60 jours</strong> le temps d\'organiser vos finances et documents</li>
                  <li>Normalement <strong>déduit du prix d\'achat</strong></li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                  <p className="font-semibold text-yellow-800">Important :</p>
                  <p className="text-yellow-700">Le dépôt de réservation peut être non remboursable si vous vous retirez sans raison valable. Lisez attentivement les conditions avant de signer.</p>
                </div>
              </div>
            </section>

            {/* Étape 3 */}
            <section id="etape-3" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">3</span>
                Obtention du Numéro NIE
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Le <strong>NIE (Número de Identificación de Extranjero)</strong> est votre numéro d\'identification fiscale espagnol. Vous ne pouvez pas acheter un bien, ouvrir un compte bancaire ni connecter les services sans celui-ci.
                </p>
                <p>Vous pouvez en faire la demande :</p>
                <ul>
                  <li><strong>En Espagne :</strong> À l\'Office des Étrangers (Oficina de Extranjería) ou à la station de police nationale</li>
                  <li><strong>De l\'étranger :</strong> À l\'ambassade ou au consulat espagnol de votre pays</li>
                </ul>
                <p>
                  Le traitement prend généralement 1-4 semaines. De nombreux avocats peuvent s\'en charger via procuration.
                </p>
                <Link href="/fr/guides/nie" className="text-accent-600 font-semibold hover:underline">
                  → Lire notre guide complet sur le numéro NIE
                </Link>
              </div>
            </section>

            {/* Étape 4 */}
            <section id="etape-4" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">4</span>
                Ouverture d\'un Compte Bancaire Espagnol
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Vous aurez besoin d\'un compte bancaire espagnol pour :
                </p>
                <ul>
                  <li>Payer le prix d\'achat et les taxes</li>
                  <li>Configurer les prélèvements automatiques pour les services publics et les frais de copropriété</li>
                  <li>Les remboursements hypothécaires (le cas échéant)</li>
                </ul>
                <p>
                  Les grandes banques comme Sabadell, CaixaBank et Santander ont de l\'expérience avec les acheteurs internationaux. Vous aurez besoin de votre NIE, passport et preuve de revenus/adresse.
                </p>
              </div>
            </section>

            {/* Étape 5 */}
            <section id="etape-5" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">5</span>
                Contrat d\'Achat Privé
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Le <strong>Contrato de Compraventa</strong> est le contrat d\'achat obligatoire entre vous et le promoteur. À la signature, vous verserez :
                </p>
                <ul>
                  <li><strong>20-30% du prix d\'achat</strong> (moins le dépôt de réservation)</li>
                </ul>
                <p>Le contrat doit inclure :</p>
                <ul>
                  <li>Spécifications complètes et plans du bien</li>
                  <li>Calendrier de paiement</li>
                  <li>Date d\'achèvement prévue</li>
                  <li>Clauses de pénalité pour retard</li>
                  <li>Détails de la garantie bancaire (obligatoire en Espagne)</li>
                </ul>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="font-semibold text-primary-800">Protection par Garantie Bancaire</p>
                  <p className="text-primary-700">La loi espagnole exige que les promoteurs fournissent une garantie bancaire ou une assurance pour tous les versements de stade. En cas de non-livraison, vous avez droit au remboursement intégral des versements effectués.</p>
                </div>
              </div>
            </section>

            {/* Étape 6 */}
            <section id="etape-6" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">6</span>
                Versements Pendant la Construction
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Pour les biens sur plan, vous verserez des montants liés aux jalons de construction. Un calendrier type :
                </p>
                <table className="w-full border-collapse my-6">
                  <thead>
                    <tr className="bg-warm-100">
                      <th className="border p-3 text-left">Étape</th>
                      <th className="border p-3 text-left">Pourcentage Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-3">Réservation</td><td className="border p-3">3 000€-10 000€</td></tr>
                    <tr><td className="border p-3">Signature du contrat</td><td className="border p-3">20-30%</td></tr>
                    <tr><td className="border p-3">Pendant la construction</td><td className="border p-3">20-30%</td></tr>
                    <tr><td className="border p-3">Achèvement</td><td className="border p-3">40-50%</td></tr>
                  </tbody>
                </table>
                <p>
                  Conservez tous les justificatifs de paiement et les certificats de garantie bancaire en sécurité.
                </p>
              </div>
            </section>

            {/* Étape 7 */}
            <section id="etape-7" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">7</span>
                Inspection des Défauts
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Avant l\'achèvement, vous (ou une entreprise spécialisée) devez inspecter le bien et dresser une <strong>liste de défauts</strong> :
                </p>
                <ul>
                  <li>Peinture et finitions</li>
                  <li>Portes, fenêtres et serrures</li>
                  <li>Plomberie et drainage</li>
                  <li>Installations électriques</li>
                  <li>Carrelage et revêtements</li>
                  <li>Climatisation et appareils</li>
                </ul>
                <p>
                  Le promoteur doit corriger les défauts avant l\'achèvement ou accepter une retenue sur le paiement final.
                </p>
              </div>
            </section>

            {/* Étape 8 */}
            <section id="etape-8" className="mb-12">
              <h2 className="text-2xl font-light mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">8</span>
                Achèvement Chez le Notaire
              </h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  L\'étape finale se déroule chez un notaire espagnol où vous :
                </p>
                <ul>
                  <li>Signerez l\'<strong>Escritura</strong> (acte de propriété)</li>
                  <li>Verserez le solde final</li>
                  <li>Paierez la TVA et les droits de timbre</li>
                  <li>Recevrez les clés !</li>
                </ul>
                <p>
                  Vous pouvez assister en personne ou conférer une procuration à votre avocat. Après la signature, votre avocat enregistre le bien au cadastre.
                </p>
              </div>
            </section>

            {/* Coûts Totaux */}
            <section id="cout" className="mb-12">
              <h2 className="text-2xl font-light mb-4">Résumé des Coûts Totaux</h2>
              <div className="bg-warm-50 rounded-sm p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Coût</th>
                      <th className="text-right py-3">Montant</th>
                    </tr>
                  </thead>
                  <tbody className="text-warm-700">
                    <tr className="border-b"><td className="py-3">Prix d\'achat</td><td className="text-right">100%</td></tr>
                    <tr className="border-b"><td className="py-3">TVA (biens neufs uniquement)</td><td className="text-right">10%</td></tr>
                    <tr className="border-b"><td className="py-3">Droits de timbre (AJD)</td><td className="text-right">1,5%</td></tr>
                    <tr className="border-b"><td className="py-3">Honoraires notaire</td><td className="text-right">800€-1 500€</td></tr>
                    <tr className="border-b"><td className="py-3">Cadastre</td><td className="text-right">400€-800€</td></tr>
                    <tr className="border-b"><td className="py-3">Honoraires avocat</td><td className="text-right">1-1,5%</td></tr>
                    <tr className="font-semibold"><td className="py-3">Coûts Additionnels Totaux</td><td className="text-right">~13-14%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-warm-600">
                <Link href="/fr/guides/frais-impots" className="text-accent-600 font-semibold hover:underline">
                  → Lire notre guide détaillé sur les frais et impôts
                </Link>
              </p>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-4">Prêt à Débuter Votre Recherche ?</h2>
              <p className="text-warm-700 mb-6">
                Notre équipe se spécialise dans les biens neufs en Costa Blanca. Nous vous guiderons à chaque étape du processus d\'achat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/fr/contact"
                  className="bg-accent-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-accent-700 transition-colors text-center"
                >
                  Nous Contacter
                </Link>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  className="border-2 border-accent-600 text-accent-600 px-6 py-3 rounded-sm font-semibold hover:bg-warm-50 transition-colors text-center"
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
              {buyingFaqs.map((faq, i) => (
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
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Link href="/fr/guides/nie" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Guide Numéro NIE</h3>
                <p className="text-warm-600 text-sm">Comment obtenir votre numéro d\'identification espagnol</p>
              </Link>
              <Link href="/fr/guides/frais-impots" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Frais et Impôts</h3>
                <p className="text-warm-600 text-sm">Décomposition détaillée de tous les coûts</p>
              </Link>
              <Link href="/fr/guides/hypotheque" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Hypothèques</h3>
                <p className="text-warm-600 text-sm">Options de financement pour les étrangers</p>
              </Link>
              <Link href="/fr/guides" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow border-2 border-accent-200">
                <h3 className="font-semibold mb-2">Tous les Guides</h3>
                <p className="text-warm-600 text-sm">Explorez tous nos guides pour acheteurs</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
