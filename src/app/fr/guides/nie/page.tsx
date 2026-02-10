import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Obtenir Votre NIE en Espagne | Guide pour Français 2026',
  description: 'Guide complet pour obtenir un numéro NIE en Espagne. Comment l\'obtenir en France ou en Espagne, documents requis, délais, coût. Essentiel pour acheter un bien immobilier.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/guides/nie',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/nie-number',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/nie-nummer',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/nie-nummer',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/nie',
      'no': 'https://newbuildhomescostablanca.com/no/guides/nie-nummer',
      'x-default': 'https://newbuildhomescostablanca.com/guides/nie-number',
    },
  },
};

const nieFaqs = [
  {
    question: 'Qu\'est-ce qu\'un numéro NIE exactement ?',
    answer: 'Le NIE (Número de Identificación de Extranjero) est un numéro d\'identification unique attribué à tous les étrangers en Espagne. C\'est votre numéro d\'identification fiscale espagnol. Contrairement à ce que vous pourriez penser, le NIE n\'est pas lié à la résidence – vous pouvez avoir un NIE sans être résident en Espagne.',
  },
  {
    question: 'Puis-je acheter un bien sans numéro NIE ?',
    answer: 'Non. Le NIE est obligatoire pour signer l\'acte d\'achat (Escritura) chez le notaire. Vous pouvez signer un accord de réservation sans NIE, mais vous devez l\'avoir avant l\'achèvement final.',
  },
  {
    question: 'Où puis-je demander mon NIE en France ?',
    answer: 'Vous pouvez demander votre NIE auprès du consulat général d\'Espagne en France. Les principaux consulats se trouvent à Paris, Lyon, Marseille, Bordeaux, Toulouse et Strasbourg. Contactez-les pour prendre rendez-vous et connaître les documents requis.',
  },
  {
    question: 'Est-il plus facile d\'obtenir le NIE en Espagne ou en France ?',
    answer: 'C\'est généralement plus facile en France auprès du consulat espagnol. Les rendez-vous sont plus disponibles et le personnel parle français. En Espagne, les rendez-vous à l\'Office des Étrangers peuvent être difficiles à obtenir, bien que le traitement soit plus rapide.',
  },
  {
    question: 'Combien coûte un numéro NIE ?',
    answer: 'Le NIE est gratuit auprès du consulat espagnol. Il y a des droits de timbre environ 12€ à payer en Espagne. Si vous utilisez un avocat ou un gestor, vous paierez 100€-200€ supplémentaires pour frais administratifs.',
  },
  {
    question: 'Combien de temps faut-il pour obtenir un NIE ?',
    answer: 'En Espagne, le traitement prend généralement 1-2 semaines si vous allez à l\'Office des Étrangers. Via consulat en France, comptez 2-4 semaines. Via un avocat avec procuration, 2-4 semaines aussi. Commencez tôt car le délai peut varier.',
  },
  {
    question: 'Le NIE expire-t-il ?',
    answer: 'Non. Le numéro NIE lui-même est vôtre à vie. Cependant, le certificat papier peut avoir une date d\'expiration. Vous pouvez toujours obtenir un nouveau certificat avec le même numéro NIE.',
  },
  {
    question: 'Dois-je demander un NIE pour mon conjoint également ?',
    answer: 'Oui. Si vous achetez la propriété conjointement, chaque propriétaire a besoin de son propre NIE. C\'est un numéro personnelPersonn unique pour chaque personne.',
  },
];

export default function NIEPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/fr/guides' },
    { name: 'Numéro NIE', url: 'https://newbuildhomescostablanca.com/fr/guides/nie' },
  ]);

  const faqSchemaData = faqSchema(nieFaqs);

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
              <span>Numéro NIE</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Obtenir Votre Numéro NIE en Espagne
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Guide complet pour obtenir votre Número de Identificación de Extranjero (NIE). Essentiel pour acheter un bien immobilier en Espagne.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>Lecture : 8 min</span>
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

            {/* Qu'est-ce que NIE */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Qu\'est-ce qu\'un Numéro NIE ?</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Le <strong>NIE (Número de Identificación de Extranjero)</strong> est un numéro d\'identification unique attribué à tous les étrangers en Espagne. C\'est votre numéro d\'identification fiscale espagnol et est essentiel pour pratiquement toute transaction financière ou légale.
                </p>
                <p>Vous aurez besoin d\'un NIE pour :</p>
                <ul>
                  <li>Acheter ou vendre un bien immobilier</li>
                  <li>Ouvrir un compte bancaire espagnol</li>
                  <li>Signer des contrats (services publics, téléphone, internet)</li>
                  <li>Payer les impôts</li>
                  <li>Travailler en Espagne</li>
                  <li>Acheter une voiture</li>
                  <li>Créer une entreprise</li>
                </ul>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="font-semibold text-primary-800">Important :</p>
                  <p className="text-primary-700">Un NIE n\'est <strong>pas</strong> la même chose que la résidence. C\'est simplement un numéro d\'identification fiscale. Vous pouvez avoir un NIE sans être résident en Espagne.</p>
                </div>
              </div>
            </section>

            {/* Comment Demander */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Comment Demander un NIE</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>Il y a deux moyens d\'obtenir votre NIE :</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Option 1 : Demander en Espagne</h3>
                <p>Vous pouvez en faire la demande en personne :</p>
                <ul>
                  <li><strong>Oficina de Extranjería</strong> (Office des Étrangers)</li>
                  <li><strong>Comisaría de Policía</strong> (Poste de police) avec un département des étrangers</li>
                </ul>
                <p>
                  En Costa Blanca, les principaux bureaux se trouvent à Alicante, Benidorm et Torrevieja. Vous devrez prendre rendez-vous en ligne via le système gouvernemental espagnol.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Option 2 : Demander de France</h3>
                <p>
                  Vous pouvez en faire la demande auprès du consulat général d\'Espagne en France. C\'est souvent plus facile car les rendez-vous sont plus disponibles et le personnel parle français.
                </p>
                <p className="font-semibold mt-3">Consulats d\'Espagne en France :</p>
                <ul>
                  <li><strong>Paris :</strong> Consulat Général</li>
                  <li><strong>Lyon :</strong> Consulat Général</li>
                  <li><strong>Marseille :</strong> Consulat Général</li>
                  <li><strong>Bordeaux :</strong> Consulat</li>
                  <li><strong>Toulouse :</strong> Consulat</li>
                  <li><strong>Strasbourg :</strong> Consulat</li>
                </ul>
              </div>
            </section>

            {/* Documents Requis */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Documents Requis</h2>
              <div className="bg-warm-50 rounded-sm p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl font-bold">✓</span>
                    <div>
                      <strong>Formulaire EX-15</strong>
                      <p className="text-warm-600 text-sm">Formulaire officiel de demande NIE, rempli et signé</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl font-bold">✓</span>
                    <div>
                      <strong>Passeport Valide</strong>
                      <p className="text-warm-600 text-sm">Original plus photocopie de toutes les pages</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl font-bold">✓</span>
                    <div>
                      <strong>Photographie de Passeport</strong>
                      <p className="text-warm-600 text-sm">Récente, format passeport</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl font-bold">✓</span>
                    <div>
                      <strong>Justification du Motif</strong>
                      <p className="text-warm-600 text-sm">Document expliquant pourquoi vous avez besoin du NIE (par exemple, accord de réservation immobilière)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl font-bold">✓</span>
                    <div>
                      <strong>Modelo 790 Código 012</strong>
                      <p className="text-warm-600 text-sm">Formulaire fiscal avec justificatif de paiement des droits (environ 12€)</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Coût et Délai */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Coût et Délai</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="font-semibold mb-3">Coût</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>Frais gouvernementaux : <strong>~12€</strong></li>
                    <li>Via avocat/gestor : <strong>100€-200€</strong></li>
                    <li>Timbre (si applicable) : <strong>inclus ci-dessus</strong></li>
                  </ul>
                </div>
                <div className="bg-warm-50 rounded-sm p-6">
                  <h3 className="font-semibold mb-3">Délai</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>En Espagne : <strong>1-2 semaines</strong></li>
                    <li>De France (consulat) : <strong>2-4 semaines</strong></li>
                    <li>Via avocat : <strong>2-4 semaines</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Via Power of Attorney */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Obtenir votre NIE via Procuration</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Si vous ne pouvez pas visiter l\'Espagne ou si vous avez des difficultés à obtenir un rendez-vous, vous pouvez donner <strong>procuration à un avocat espagnol</strong> qui demandera le NIE en votre nom.
                </p>
                <p>Cela implique :</p>
                <ol>
                  <li>Signer un document de procuration (Poder Notarial) – peut être fait auprès d\'un consulat espagnol en France ou notarié et apostillé localement</li>
                  <li>Envoyer vos documents originaux à votre avocat</li>
                  <li>L\'avocat soumet la demande et récupère votre certificat NIE</li>
                </ol>
                <p>
                  C\'est l\'option la plus pratique pour les acheteurs d\'outre-mer et est couramment utilisée pour les achats immobiliers.
                </p>
              </div>
            </section>

            {/* Démarches via Consulat Français */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Demande via le Consulat d\'Espagne en France</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>
                  Nous recommandons cette approche car elle est généralement plus rapide et plus simple que d\'aller en Espagne :
                </p>
                <ol>
                  <li>Contactez le consulat d\'Espagne compétent pour votre région en France</li>
                  <li>Demandez les documents précis nécessaires (ils peuvent varier légèrement)</li>
                  <li>Organisez un rendez-vous</li>
                  <li>Présentez-vous avec tous les documents à la date du rendez-vous</li>
                  <li>Recevez votre certificat NIE (généralement dans 2-4 semaines)</li>
                </ol>

                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="font-semibold text-primary-800">Conseil :</p>
                  <p className="text-primary-700">Contactez le consulat dès que possible. Les rendez-vous peuvent avoir des délais d\'attente et vous ne voulez pas que cela retarde votre processus d\'achat.</p>
                </div>
              </div>
            </section>

            {/* Après Obtention */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4">Après Obtention de Votre NIE</h2>
              <div className="prose prose-lg max-w-none text-warm-700">
                <p>Une fois que vous avez votre numéro NIE, vous pouvez :</p>
                <ul>
                  <li>Ouvrir un compte bancaire espagnol</li>
                  <li>Signer votre accord de réservation immobilière</li>
                  <li>Conclure votre contrat d\'achat</li>
                  <li>Achever votre achat chez le notaire</li>
                </ul>
                <p>
                  Conservez votre certificat NIE en sécurité. Vous en aurez besoin pour pratiquement toutes les démarches administratives en Espagne.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-4">Besoin d\'Aide pour Votre Demande de NIE ?</h2>
              <p className="text-warm-700 mb-6">
                Lorsque vous achetez par notre intermédiaire, nous pouvons organiser votre demande de NIE via nos partenaires juridiques. C\'est une démarche de moins à gérer.
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
                  className="bg-success-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-success-700 transition-colors text-center"
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
              {nieFaqs.map((faq, i) => (
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
              <Link href="/fr/guides/frais-impots" className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Frais et Impôts</h3>
                <p className="text-warm-600 text-sm">Décomposition complète des coûts</p>
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
