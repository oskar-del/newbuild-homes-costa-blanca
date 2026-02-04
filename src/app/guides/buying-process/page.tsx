import { Metadata } from 'next';
import Link from 'next/link';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';
import JustLaunchedDevelopments from '@/components/JustLaunchedDevelopments';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'How to Buy Property in Spain 2026 | Complete Buying Process Guide',
  description: 'Step-by-step guide to buying new build property in Costa Blanca, Spain. NIE numbers, contracts, payments, notary completion. Updated for 2026 with expert advice for British and international buyers.',
  keywords: 'buy property Spain, buying process Spain, new build Spain, Costa Blanca property, NIE number, Spanish property purchase, off-plan Spain',
  openGraph: {
    title: 'How to Buy Property in Spain | Complete 2026 Guide',
    description: 'The definitive step-by-step guide to buying new build property in Spain. From reservation to keys.',
    type: 'article',
  },
};

// FAQs for schema markup
const buyingFaqs = [
  {
    question: 'How long does it take to buy property in Spain?',
    answer: 'The buying process typically takes 8-12 weeks from reservation to completion for key-ready properties. For off-plan purchases, you\'ll sign contracts within 30-60 days of reservation, then wait 12-24 months for construction to complete.',
  },
  {
    question: 'Do I need a lawyer to buy property in Spain?',
    answer: 'While not legally required, we strongly recommend using an independent lawyer. They\'ll check contracts, verify the property is legally sound, handle NIE applications, and represent you at the notary if needed. Expect to pay 1-1.5% of the purchase price.',
  },
  {
    question: 'Can I buy property in Spain without an NIE number?',
    answer: 'No. The NIE (Número de Identificación de Extranjero) is mandatory for all property purchases in Spain. You\'ll also need it to open a bank account, sign utility contracts, and pay taxes. Apply early as it can take 1-4 weeks.',
  },
  {
    question: 'What deposit do I need to buy property in Spain?',
    answer: 'You\'ll typically pay €3,000-€10,000 as a reservation deposit, then 20-30% at contract signing. For off-plan properties, additional stage payments of 20-30% are made during construction, with 40-50% due at completion.',
  },
  {
    question: 'Is my deposit protected when buying off-plan in Spain?',
    answer: 'Yes. Spanish law (Law 20/2015) requires developers to provide bank guarantees or insurance for all payments made before completion. If the developer fails to deliver, you\'re entitled to a full refund with interest.',
  },
  {
    question: 'What taxes do I pay when buying new build property in Spain?',
    answer: 'New builds attract 10% IVA (VAT) plus approximately 1.5% stamp duty (AJD). Total additional costs including taxes, notary, registry, and legal fees are typically 13-14% of the purchase price.',
  },
  {
    question: 'Can foreigners get a mortgage in Spain?',
    answer: 'Yes. Spanish banks lend to non-residents, typically up to 60-70% of the property value. You\'ll need proof of income, tax returns, and bank statements. Current fixed rates average around 3.15%.',
  },
  {
    question: 'What is a snagging inspection?',
    answer: 'A snagging inspection identifies defects in a new build property before you complete the purchase. Issues like paint imperfections, faulty fixtures, or incomplete finishes are documented and must be fixed by the developer before completion.',
  },
];

export default function BuyingProcessPage() {
  // Schema data
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/guides/' },
    { name: 'Buying Process', url: 'https://newbuildhomescostablanca.com/guides/buying-process/' },
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
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <span className="mx-2">→</span>
            <span>Buying Process</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How to Buy New Build Property in Spain
          </h1>
          <p className="text-xl text-warm-300 max-w-2xl">
            The complete step-by-step guide to purchasing off-plan and new build property in Costa Blanca. From NIE numbers to notary completion — everything you need to know.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
            <span>📖 12 min read</span>
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
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-warm-700 leading-relaxed">
              Buying new build property in Spain offers significant advantages over resale: modern construction standards, energy efficiency, builder warranties, and the ability to customize finishes. This guide walks you through the entire process from first viewing to collecting your keys.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-warm-50 rounded-xl p-6 mb-12">
            <h2 className="text-lg font-bold mb-4">In This Guide</h2>
            <ol className="space-y-2 text-warm-700">
              <li><a href="#step-1" className="text-accent-600 hover:underline">1. Property Search & Selection</a></li>
              <li><a href="#step-2" className="text-accent-600 hover:underline">2. Reservation Agreement</a></li>
              <li><a href="#step-3" className="text-accent-600 hover:underline">3. Getting Your NIE Number</a></li>
              <li><a href="#step-4" className="text-accent-600 hover:underline">4. Opening a Spanish Bank Account</a></li>
              <li><a href="#step-5" className="text-accent-600 hover:underline">5. Private Purchase Contract</a></li>
              <li><a href="#step-6" className="text-accent-600 hover:underline">6. Stage Payments During Construction</a></li>
              <li><a href="#step-7" className="text-accent-600 hover:underline">7. Snagging Inspection</a></li>
              <li><a href="#step-8" className="text-accent-600 hover:underline">8. Completion at the Notary</a></li>
              <li><a href="#costs" className="text-accent-600 hover:underline">9. Total Costs Summary</a></li>
            </ol>
          </div>

          {/* Step 1 */}
          <section id="step-1" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">1</span>
              Property Search & Selection
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                Start by defining your requirements: location, property type, budget, and timeline. For new builds, you'll typically choose between:
              </p>
              <ul>
                <li><strong>Off-plan:</strong> Purchase before construction completes (often 12-24 months). Lower entry price, more customization options.</li>
                <li><strong>Under construction:</strong> Building has started, completion within 6-12 months.</li>
                <li><strong>Key-ready:</strong> Completed and ready to move in. What you see is what you get.</li>
              </ul>
              <p>
                We recommend visiting Costa Blanca to see developments in person. Our team offers viewing trips and video tours for overseas buyers.
              </p>
            </div>
          </section>

          {/* Step 2 */}
          <section id="step-2" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">2</span>
              Reservation Agreement
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                Once you've found your property, you'll sign a <strong>reservation agreement</strong> and pay a deposit to take it off the market. This is typically:
              </p>
              <ul>
                <li><strong>€3,000 - €10,000</strong> depending on property value</li>
                <li>Usually held for <strong>30-60 days</strong> while you arrange finances and paperwork</li>
                <li>Normally <strong>deducted from the purchase price</strong></li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="font-semibold text-yellow-800">Important:</p>
                <p className="text-yellow-700">The reservation deposit may be non-refundable if you withdraw without valid reason. Read the terms carefully before signing.</p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section id="step-3" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">3</span>
              Getting Your NIE Number
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                The <strong>NIE (Número de Identificación de Extranjero)</strong> is your Spanish tax identification number. You cannot buy property, open a bank account, or connect utilities without it.
              </p>
              <p>You can apply:</p>
              <ul>
                <li><strong>In Spain:</strong> At the Foreigners Office (Oficina de Extranjería) or National Police station</li>
                <li><strong>From abroad:</strong> At the Spanish Embassy or Consulate in your country</li>
              </ul>
              <p>
                Processing typically takes 1-4 weeks. Many lawyers can handle this for you via power of attorney.
              </p>
              <Link href="/guides/nie-number" className="text-accent-600 font-semibold hover:underline">
                → Read our complete NIE Number Guide
              </Link>
            </div>
          </section>

          {/* Step 4 */}
          <section id="step-4" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">4</span>
              Opening a Spanish Bank Account
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                You'll need a Spanish bank account for:
              </p>
              <ul>
                <li>Paying the purchase price and taxes</li>
                <li>Setting up direct debits for utilities and community fees</li>
                <li>Mortgage payments (if applicable)</li>
              </ul>
              <p>
                Major banks like Sabadell, CaixaBank, and Santander have experience with international buyers. You'll need your NIE, passport, and proof of income/address.
              </p>
            </div>
          </section>

          {/* Step 5 */}
          <section id="step-5" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">5</span>
              Private Purchase Contract
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                The <strong>Contrato de Compraventa</strong> is the binding purchase contract between you and the developer. At signing, you'll pay:
              </p>
              <ul>
                <li><strong>20-30% of the purchase price</strong> (minus the reservation deposit)</li>
              </ul>
              <p>The contract should include:</p>
              <ul>
                <li>Full property specifications and plans</li>
                <li>Payment schedule</li>
                <li>Expected completion date</li>
                <li>Penalty clauses for delays</li>
                <li>Bank guarantee details (mandatory in Spain)</li>
              </ul>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                <p className="font-semibold text-primary-800">Bank Guarantee Protection</p>
                <p className="text-primary-700">Spanish law requires developers to provide a bank guarantee or insurance for all stage payments. If the developer fails to complete the property, you're entitled to a full refund of payments made.</p>
              </div>
            </div>
          </section>

          {/* Step 6 */}
          <section id="step-6" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">6</span>
              Stage Payments During Construction
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                For off-plan properties, you'll make payments linked to construction milestones. A typical schedule:
              </p>
              <table className="w-full border-collapse my-6">
                <thead>
                  <tr className="bg-warm-100">
                    <th className="border p-3 text-left">Stage</th>
                    <th className="border p-3 text-left">Typical %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-3">Reservation</td><td className="border p-3">€3,000-10,000</td></tr>
                  <tr><td className="border p-3">Contract signing</td><td className="border p-3">20-30%</td></tr>
                  <tr><td className="border p-3">During construction</td><td className="border p-3">20-30%</td></tr>
                  <tr><td className="border p-3">Completion</td><td className="border p-3">40-50%</td></tr>
                </tbody>
              </table>
              <p>
                Keep all payment receipts and bank guarantee certificates safely filed.
              </p>
            </div>
          </section>

          {/* Step 7 */}
          <section id="step-7" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">7</span>
              Snagging Inspection
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                Before completion, you (or a professional snagging company) should inspect the property and compile a <strong>snagging list</strong> of any defects:
              </p>
              <ul>
                <li>Paintwork and finishes</li>
                <li>Doors, windows, and locks</li>
                <li>Plumbing and drainage</li>
                <li>Electrical installations</li>
                <li>Tiling and flooring</li>
                <li>Air conditioning and appliances</li>
              </ul>
              <p>
                The developer must fix snagging issues before completion or agree to a retention from the final payment.
              </p>
            </div>
          </section>

          {/* Step 8 */}
          <section id="step-8" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">8</span>
              Completion at the Notary
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                The final step takes place at a Spanish notary where you'll:
              </p>
              <ul>
                <li>Sign the <strong>Escritura</strong> (title deed)</li>
                <li>Pay the final balance</li>
                <li>Pay IVA (VAT) and Stamp Duty</li>
                <li>Receive the keys!</li>
              </ul>
              <p>
                You can attend in person or grant Power of Attorney to your lawyer. After signing, your lawyer registers the property at the Land Registry.
              </p>
            </div>
          </section>

          {/* Costs Summary */}
          <section id="costs" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Total Costs Summary</h2>
            <div className="bg-warm-50 rounded-xl p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Cost</th>
                    <th className="text-right py-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  <tr className="border-b"><td className="py-3">Purchase Price</td><td className="text-right">100%</td></tr>
                  <tr className="border-b"><td className="py-3">IVA (VAT) - new builds only</td><td className="text-right">10%</td></tr>
                  <tr className="border-b"><td className="py-3">Stamp Duty (AJD)</td><td className="text-right">1.5%</td></tr>
                  <tr className="border-b"><td className="py-3">Notary fees</td><td className="text-right">€800-1,500</td></tr>
                  <tr className="border-b"><td className="py-3">Land Registry</td><td className="text-right">€400-800</td></tr>
                  <tr className="border-b"><td className="py-3">Legal fees</td><td className="text-right">1-1.5%</td></tr>
                  <tr className="font-bold"><td className="py-3">Total Additional Costs</td><td className="text-right">~13-14%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-warm-600">
              <Link href="/guides/costs-taxes" className="text-accent-600 font-semibold hover:underline">
                → Read our detailed Costs & Taxes Guide
              </Link>
            </p>
          </section>

          {/* CTA */}
          <section className="bg-primary-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Property Search?</h2>
            <p className="text-warm-700 mb-6">
              Our team specializes in new build properties across Costa Blanca. We'll guide you through every step of the buying process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/developments"
                className="bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
              >
                View Properties
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-accent-600 text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Featured Developments - Start Your Search */}
      <JustLaunchedDevelopments
        title="Start Your Property Search"
        subtitle="Browse new developments currently available — from off-plan at launch prices to key-ready homes"
        limit={3}
        variant="default"
        showViewAll={true}
      />

      {/* FAQs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {buyingFaqs.map((faq, i) => (
              <details key={i} className="group bg-warm-50 rounded-xl border border-warm-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-100 transition-colors">
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

      {/* Lead Form */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="container mx-auto px-4 max-w-2xl">
          <LeadFormAdvanced
            title="Get Expert Buying Advice"
            subtitle="Have questions about the buying process? Our team guides international buyers through every step."
            propertyInterest="Buying Process Guide Inquiry"
            source="buying-process-guide"
            variant="hero"
            showBudget={true}
            showTimeline={true}
            showCallbackDate={true}
            ctaText="Request a Callback"
          />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link href="/guides/nie-number" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold mb-2">NIE Number Guide</h3>
              <p className="text-warm-600 text-sm">How to get your Spanish tax ID</p>
            </Link>
            <Link href="/guides/costs-taxes" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Costs & Taxes</h3>
              <p className="text-warm-600 text-sm">Complete breakdown of all costs</p>
            </Link>
            <Link href="/guides/mortgages" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏦</div>
              <h3 className="font-bold mb-2">Mortgages</h3>
              <p className="text-warm-600 text-sm">Financing options for foreigners</p>
            </Link>
            <Link href="/finance" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow border-2 border-accent-200">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold mb-2">Compare Rates</h3>
              <p className="text-warm-600 text-sm">Compare 15+ Spanish banks</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
