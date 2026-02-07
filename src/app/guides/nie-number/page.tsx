import { Metadata } from 'next';
import Link from 'next/link';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';
import { howToSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'NIE Number Spain 2026 | How to Apply & Get Your Spanish Tax ID',
  description: 'Complete guide to getting your NIE number in Spain. Online application, Spanish embassy, requirements & costs. Essential for buying property in Costa Blanca.',
  keywords: 'NIE number Spain, Spanish tax ID, foreigner identification Spain, NIE application, buy property Spain NIE',
};

export default function NIENumberPage() {
  const howToSchemaData = howToSchema({
    name: 'How to Get Your NIE Number in Spain',
    description: 'Complete guide to obtaining your Número de Identificación de Extranjero (NIE) - your Spanish tax identification number required for property purchases.',
    totalTime: 'PT3W',
    steps: [
      {
        name: 'Understand What an NIE Is',
        text: 'The NIE (Número de Identificación de Extranjero) is a unique identification number assigned to foreigners in Spain. It\'s your Spanish tax identification number and is required for buying or selling property, opening a bank account, signing contracts, paying taxes, and working in Spain.',
        url: 'https://newbuildhomescostablanca.com/guides/nie-number/#what-is-nie'
      },
      {
        name: 'Choose Your Application Method',
        text: 'You have two options: Apply in Spain at the Oficina de Extranjería (Foreigners Office) or Comisaría de Policía (Police Station), or apply from your home country at the Spanish Embassy or Consulate. The embassy option is often easier with more available appointments and English-speaking staff.',
        url: 'https://newbuildhomescostablanca.com/guides/nie-number/#how-to-apply'
      },
      {
        name: 'Gather Required Documents',
        text: 'Collect your valid passport (original and photocopy), recent passport-sized photo, completed EX-15 form, proof of reason for NIE (like a property reservation contract), and Modelo 790 Código 012 tax form with fee payment (approximately €12).',
        url: 'https://newbuildhomescostablanca.com/guides/nie-number/#requirements'
      },
      {
        name: 'Submit Your Application',
        text: 'Submit all documents and forms to the Foreigners Office, Police Station, or Spanish Embassy/Consulate. If applying in Spain, you will need to book an appointment online through the Spanish government appointment system.',
        url: 'https://newbuildhomescostablanca.com/guides/nie-number/#how-to-apply'
      },
      {
        name: 'Receive Your NIE Certificate',
        text: 'Processing typically takes same day to 2 weeks if applying in Spain, or 2-4 weeks if applying from abroad. You will receive your NIE certificate with your unique NIE number. The number itself never expires - it\'s yours for life.',
        url: 'https://newbuildhomescostablanca.com/guides/nie-number/#costs-timeline'
      },
      {
        name: 'Alternative: Grant Power of Attorney',
        text: 'If you can\'t visit Spain or struggle to get an appointment, grant Power of Attorney (Poder Notarial) to a Spanish lawyer. Sign the document (at a Spanish consulate or notarized locally), send your original documents to the lawyer, and they will submit the application and collect your NIE certificate.',
        url: 'https://newbuildhomescostablanca.com/guides/nie-number/#via-lawyer'
      }
    ]
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(howToSchemaData) }} />

    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-warm-200">
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <span className="mx-2">→</span>
            <span>NIE Number</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NIE Number Spain: Complete Guide
          </h1>
          <p className="text-xl text-warm-300 max-w-2xl">
            Everything you need to know about obtaining your Número de Identificación de Extranjero - essential for buying property in Spain.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
            <span>📖 8 min read</span>
            <span>•</span>
            <span>Updated February 2026</span>
            <span>•</span>
            <span className="bg-accent-500/20 text-accent-300 px-2 py-1 rounded">Expert Verified</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          
          {/* What is NIE */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is an NIE Number?</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                The <strong>NIE (Número de Identificación de Extranjero)</strong> is a unique identification number assigned to foreigners in Spain. It's your Spanish tax identification number and is required for virtually any financial or legal transaction.
              </p>
              <p>You'll need an NIE to:</p>
              <ul>
                <li>Buy or sell property</li>
                <li>Open a Spanish bank account</li>
                <li>Sign contracts (utilities, phone, internet)</li>
                <li>Pay taxes</li>
                <li>Work in Spain</li>
                <li>Buy a car</li>
                <li>Set up a business</li>
              </ul>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                <p className="font-semibold text-primary-800">Important:</p>
                <p className="text-primary-700">An NIE is <strong>not</strong> the same as residency. It's simply a tax identification number. You can have an NIE without being a Spanish resident.</p>
              </div>
            </div>
          </section>

          {/* How to Apply */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Apply for an NIE</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>There are two ways to obtain your NIE:</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Option 1: Apply in Spain</h3>
              <p>You can apply in person at:</p>
              <ul>
                <li><strong>Oficina de Extranjería</strong> (Foreigners Office)</li>
                <li><strong>Comisaría de Policía</strong> (Police Station) with a foreigners department</li>
              </ul>
              <p>
                In Costa Blanca, major offices are in Alicante, Benidorm, and Torrevieja. You'll need to book an appointment online through the Spanish government appointment system.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Option 2: Apply from Your Home Country</h3>
              <p>
                You can apply at the Spanish Embassy or Consulate in your country. This is often easier as appointments may be more readily available and staff typically speak English.
              </p>
            </div>
          </section>

          {/* Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Required Documents</h2>
            <div className="bg-warm-50 rounded-xl p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-success-600 text-xl">✓</span>
                  <div>
                    <strong>EX-15 Form</strong>
                    <p className="text-warm-600 text-sm">Official NIE application form, completed and signed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600 text-xl">✓</span>
                  <div>
                    <strong>Valid Passport</strong>
                    <p className="text-warm-600 text-sm">Original plus a photocopy of all pages</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600 text-xl">✓</span>
                  <div>
                    <strong>Passport Photo</strong>
                    <p className="text-warm-600 text-sm">Recent, passport-sized photo</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600 text-xl">✓</span>
                  <div>
                    <strong>Proof of Reason</strong>
                    <p className="text-warm-600 text-sm">Document explaining why you need the NIE (e.g., reservation contract for property purchase)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600 text-xl">✓</span>
                  <div>
                    <strong>Modelo 790 Código 012</strong>
                    <p className="text-warm-600 text-sm">Tax form with fee payment (approximately €12)</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Costs & Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Cost and Timeline</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">💰 Cost</h3>
                <ul className="space-y-2 text-warm-700">
                  <li>Government fee: <strong>~€12</strong></li>
                  <li>Via lawyer/gestor: <strong>€100-200</strong></li>
                </ul>
              </div>
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">⏱️ Timeline</h3>
                <ul className="space-y-2 text-warm-700">
                  <li>In Spain: <strong>Same day - 2 weeks</strong></li>
                  <li>From abroad: <strong>2-4 weeks</strong></li>
                  <li>Via lawyer: <strong>2-4 weeks</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Via Lawyer */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Getting Your NIE via Power of Attorney</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                If you can't visit Spain or struggle to get an appointment, you can grant <strong>Power of Attorney (Poder Notarial)</strong> to a Spanish lawyer who can apply on your behalf.
              </p>
              <p>This involves:</p>
              <ol>
                <li>Signing a Power of Attorney document (can be done at a Spanish consulate or notarized and apostilled locally)</li>
                <li>Sending original documents to your lawyer</li>
                <li>The lawyer submits the application and collects your NIE certificate</li>
              </ol>
              <p>
                This is the most convenient option for overseas buyers and is commonly used for property purchases.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Does the NIE expire?</h3>
                <p className="text-warm-700">The NIE number itself never expires - it's yours for life. However, the paper certificate may have an expiration date. You can always get a new certificate with the same number.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Can I buy property without an NIE?</h3>
                <p className="text-warm-700">No. The NIE is required to sign the purchase deed (escritura) at the notary. You can sign a reservation without one, but must have it before completion.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Do both spouses need separate NIEs?</h3>
                <p className="text-warm-700">Yes. If buying property jointly, each person named on the title deed needs their own NIE number.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Is there a difference between NIE and TIE?</h3>
                <p className="text-warm-700">Yes. The NIE is just a number. The TIE (Tarjeta de Identidad de Extranjero) is a physical ID card for residents. Non-residents only need the NIE certificate.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Need Help with Your NIE?</h2>
            <p className="text-warm-700 mb-6">
              When you buy property through us, we can arrange your NIE application through our legal partners. One less thing to worry about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
              >
                Contact Us
              </Link>
              <a 
                href="https://wa.me/34634044970"
                className="bg-success-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-success-700 transition-colors text-center"
              >
                WhatsApp
              </a>
            </div>
          </section>

        </div>
      </article>

      {/* Lead Form */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="container mx-auto px-4 max-w-2xl">
          <LeadFormAdvanced
            title="Get Help with Your NIE Application"
            subtitle="Our legal partners can handle your NIE application remotely — no need to travel to Spain."
            propertyInterest="NIE Number Guide Inquiry"
            source="nie-number-guide"
            variant="hero"
            showBudget={false}
            showTimeline={true}
            showCallbackDate={true}
            ctaText="Get NIE Help"
          />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/guides/buying-process" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold mb-2">Buying Process</h3>
              <p className="text-warm-600 text-sm">Complete step-by-step guide</p>
            </Link>
            <Link href="/guides/costs-taxes" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Costs & Taxes</h3>
              <p className="text-warm-600 text-sm">Full breakdown of all costs</p>
            </Link>
            <Link href="/guides/mortgages" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏦</div>
              <h3 className="font-bold mb-2">Mortgages</h3>
              <p className="text-warm-600 text-sm">Financing for foreigners</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
