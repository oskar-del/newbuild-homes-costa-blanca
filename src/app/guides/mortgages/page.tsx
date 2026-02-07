import { Metadata } from 'next';
import Link from 'next/link';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';
import { howToSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Spanish Mortgages for Foreigners 2026 | Non-Resident Guide',
  description: 'How to get a mortgage in Spain as a non-resident. Current rates ~3.15%, LTV 60-70%, requirements for British & EU buyers. Compare 15+ banks.',
  keywords: 'Spanish mortgage non-resident, mortgage Spain foreigners, property finance Spain, Costa Blanca mortgage, British buyer mortgage Spain',
};

export default function MortgagesPage() {
  const howToSchemaData = howToSchema({
    name: 'How to Get a Spanish Mortgage for Foreign Buyers',
    description: 'Complete guide to obtaining a mortgage in Spain as a non-resident. Current rates ~3.15%, LTV 60-70%, requirements for British and international buyers.',
    totalTime: 'PT10W',
    steps: [
      {
        name: 'Check Your Eligibility',
        text: 'Spanish banks lend to foreign nationals and non-residents. EU/EEA non-residents can typically borrow 60-70% LTV, requiring 30-40% deposit. You will need proof of stable income, tax returns, and bank statements. Employment status (employed vs. self-employed) affects documentation requirements.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#can-foreigners'
      },
      {
        name: 'Gather Required Documentation',
        text: 'Collect valid passport, NIE number, last 2-3 years tax returns, last 3-6 months payslips (or business accounts if self-employed), employment contract, last 3-6 months bank statements, proof of deposit funds, and details of existing debts. All documents should be translated to Spanish.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#requirements'
      },
      {
        name: 'Choose Rate Type and Get Pre-Approval',
        text: 'Select between fixed rate (currently 3.5-4.5%), variable rate (Euribor + 1-2%), or mixed rate (fixed then variable). Contact Spanish banks directly or use a mortgage broker. Submit initial financial information for pre-approval showing how much you can borrow.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#interest-rates'
      },
      {
        name: 'Find Your Property and Submit Full Application',
        text: 'Once you have found a property and signed a reservation, submit your complete application to the bank. Bank reviews all documentation and your credit profile. This typically takes 2-4 weeks.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#application-process'
      },
      {
        name: 'Property Valuation',
        text: 'The bank arranges an independent valuation (tasación) of the property. You pay for this (€300-500). Your LTV is calculated based on the valuation figure, not the purchase price. If valuation is lower than purchase price, your borrowing amount decreases.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#application-process'
      },
      {
        name: 'Receive Formal Mortgage Offer',
        text: 'Bank issues a binding offer (Oferta Vinculante) detailing loan amount, interest rate, term, monthly payment, and all conditions. This offer is valid for minimum 10 days by Spanish law. Review all terms carefully.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#application-process'
      },
      {
        name: 'Accept Offer and Arrange Completion',
        text: 'Accept the mortgage offer in writing. Coordinate with the notary to schedule completion date for both property purchase and mortgage deed signing. Both happen on the same day. Bank representative attends the notary signing.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#application-process'
      },
      {
        name: 'Complete at Notary and Receive Funds',
        text: 'Sign the Escritura (property deed) and mortgage deed at the notary. Pay final balance and all costs. Bank transfers mortgage funds same day. You receive keys and become the legal owner. Total timeline: 6-10 weeks from full application to completion.',
        url: 'https://newbuildhomescostablanca.com/guides/mortgages/#application-process'
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
            <a href="/guides" className="hover:text-white">Guides</a>
            <span className="mx-2">→</span>
            <span>Mortgages</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Spanish Mortgages for Foreign Buyers
          </h1>
          <p className="text-xl text-warm-300 max-w-2xl">
            Everything you need to know about financing your Spanish property purchase. Requirements, rates, and how to apply.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
            <span>📖 10 min read</span>
            <span>•</span>
            <span>Updated February 2026</span>
            <span>•</span>
            <Link href="/finance" className="bg-accent-500/20 text-accent-300 px-2 py-1 rounded hover:bg-accent-500/30 transition-colors">
              Compare Rates →
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          
          {/* Key Facts */}
          <div className="bg-primary-50 border-2 border-warm-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-4 text-primary-900">Key Facts for Non-Residents (February 2026)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-warm-600">Maximum LTV</div>
                <div className="text-2xl font-bold text-accent-600">60-70%</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-warm-600">Avg Fixed Rate (25yr)</div>
                <div className="text-2xl font-bold text-accent-600">~3.15%</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-warm-600">Maximum Term</div>
                <div className="text-2xl font-bold text-accent-600">20-25 years</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-warm-600">12-Month Euribor</div>
                <div className="text-2xl font-bold text-accent-600">2.45%</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-warm-200">
              <Link href="/finance" className="inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700">
                Compare rates from 15+ Spanish banks →
              </Link>
            </div>
          </div>

          {/* Can Foreigners Get Mortgages */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Can Foreigners Get Spanish Mortgages?</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                <strong>Yes.</strong> Spanish banks actively lend to foreign nationals, including non-residents. Whether you're from the UK, EU, USA, or elsewhere, you can obtain financing for your Spanish property purchase.
              </p>
              <p>
                However, conditions differ from what you might be used to at home:
              </p>
              <ul>
                <li><strong>Lower LTV ratios</strong> – expect to put down 30-40% deposit</li>
                <li><strong>More documentation</strong> – banks want proof of stable income</li>
                <li><strong>Stricter affordability checks</strong> – monthly payment typically max 30-35% of income</li>
                <li><strong>Higher rates than residents</strong> – though still competitive</li>
              </ul>
            </div>
          </section>

          {/* LTV by Buyer Type */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Loan-to-Value (LTV) Limits</h2>
            <div className="bg-warm-50 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-warm-800 text-white">
                  <tr>
                    <th className="p-4 text-left">Buyer Type</th>
                    <th className="p-4 text-right">Maximum LTV</th>
                    <th className="p-4 text-right">Min. Deposit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Spanish Resident</td>
                    <td className="p-4 text-right font-semibold">80%</td>
                    <td className="p-4 text-right">20%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">EU/EEA Non-Resident</td>
                    <td className="p-4 text-right font-semibold">70%</td>
                    <td className="p-4 text-right">30%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">UK Non-Resident (post-Brexit)</td>
                    <td className="p-4 text-right font-semibold">60-70%</td>
                    <td className="p-4 text-right">30-40%</td>
                  </tr>
                  <tr>
                    <td className="p-4">Other Non-EU (USA, Canada, etc.)</td>
                    <td className="p-4 text-right font-semibold">60-70%</td>
                    <td className="p-4 text-right">30-40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-warm-600 text-sm">
              Note: LTV is based on the <strong>lower of</strong> purchase price or bank valuation. If the bank values your property lower than the price, your effective LTV decreases.
            </p>
          </section>

          {/* Interest Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Interest Rates in 2025</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                Spanish mortgage rates have risen with ECB rate increases but remain competitive. You'll typically choose between:
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Fixed Rate (Tipo Fijo)</h3>
              <ul>
                <li>Rate stays the same for entire term</li>
                <li>Current range: <strong>3.5% - 4.5%</strong></li>
                <li>Popular choice for budget certainty</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Variable Rate (Tipo Variable)</h3>
              <ul>
                <li>Based on Euribor + bank margin</li>
                <li>Current range: <strong>Euribor + 1% to 2%</strong></li>
                <li>Lower initially but can increase</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Mixed Rate (Tipo Mixto)</h3>
              <ul>
                <li>Fixed for first 3-10 years, then variable</li>
                <li>Good compromise option</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
              <p className="font-semibold text-yellow-800">Current Euribor:</p>
              <p className="text-yellow-700">12-month Euribor (used by most Spanish banks) fluctuates. Check current rates when applying. As of late 2024, it's around 2.5-3%.</p>
            </div>
          </section>

          {/* Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Documents Required</h2>
            <div className="bg-warm-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Employed Applicants:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Valid passport (copy of all pages)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>NIE number</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Last 2-3 years tax returns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Last 3-6 months payslips</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Employment contract or letter from employer</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Last 3-6 months bank statements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Proof of deposit funds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Details of existing debts/mortgages</span>
                </li>
              </ul>

              <h3 className="font-semibold mb-4">Self-Employed Applicants:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>All above documents, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Last 2-3 years business accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Business tax returns (SA302 for UK)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success-600">✓</span>
                  <span>Accountant's reference letter</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Spanish Banks */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Major Spanish Banks for Mortgages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Banco Sabadell</h3>
                <p className="text-warm-600 text-sm">Popular with international buyers. English-speaking advisors available. Strong presence in Costa Blanca.</p>
              </div>
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">CaixaBank</h3>
                <p className="text-warm-600 text-sm">Spain's largest bank. Wide branch network. Offers non-resident mortgages through specialist departments.</p>
              </div>
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Santander</h3>
                <p className="text-warm-600 text-sm">International bank with presence in UK. Can sometimes use UK income verification.</p>
              </div>
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">BBVA</h3>
                <p className="text-warm-600 text-sm">Major Spanish bank. Offers competitive rates. English service available in tourist areas.</p>
              </div>
            </div>
          </section>

          {/* Application Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">The Mortgage Application Process</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg">Initial Consultation & Pre-Approval</h3>
                  <p className="text-warm-700">Submit basic financial information. Bank provides an indicative offer showing how much you could borrow. Not binding but useful for budgeting.</p>
                  <p className="text-sm text-warm-500 mt-1">Timeline: 1-2 weeks</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg">Full Application</h3>
                  <p className="text-warm-700">Once you've found a property and signed reservation, submit complete documentation. Bank reviews your application in detail.</p>
                  <p className="text-sm text-warm-500 mt-1">Timeline: 2-4 weeks</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg">Property Valuation</h3>
                  <p className="text-warm-700">Bank arranges independent valuation (tasación). You pay for this (€300-500). LTV is based on this figure.</p>
                  <p className="text-sm text-warm-500 mt-1">Timeline: 1-2 weeks</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-lg">Formal Offer (Oferta Vinculante)</h3>
                  <p className="text-warm-700">Bank issues binding offer detailing loan amount, rate, term, and all conditions. Valid for minimum 10 days by law.</p>
                  <p className="text-sm text-warm-500 mt-1">Timeline: 1 week</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-lg">Completion at Notary</h3>
                  <p className="text-warm-700">Sign mortgage deed same day as property purchase. Bank representative attends. Funds transferred same day.</p>
                  <p className="text-sm text-warm-500 mt-1">Timeline: Coordinated with purchase completion</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mt-6">
              <p className="font-semibold text-primary-800">Total Timeline:</p>
              <p className="text-primary-700">Allow <strong>6-10 weeks</strong> from full application to completion. Start early – don't wait until just before your purchase deadline.</p>
            </div>
          </section>

          {/* Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Mortgage Setup Costs</h2>
            <div className="bg-warm-50 rounded-xl p-6">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Valuation (Tasación)</td>
                    <td className="py-3 text-right font-semibold">€300 - €500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Arrangement fee (some banks)</td>
                    <td className="py-3 text-right font-semibold">0 - 1%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Notary (mortgage deed)</td>
                    <td className="py-3 text-right font-semibold">€500 - €800</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">AJD Tax on mortgage</td>
                    <td className="py-3 text-right font-semibold">Paid by bank*</td>
                  </tr>
                  <tr>
                    <td className="py-3">Life insurance (often required)</td>
                    <td className="py-3 text-right font-semibold">Varies</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-warm-600 mt-4">*Since 2019, banks pay the AJD stamp duty on mortgages, not borrowers.</p>
            </div>
          </section>

          {/* Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Tips for Success</h2>
            <div className="space-y-4">
              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-semibold text-success-800">Get pre-approval early</p>
                <p className="text-success-700">Know your budget before you start property hunting. Pre-approval strengthens your negotiating position.</p>
              </div>
              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-semibold text-success-800">Use a mortgage broker</p>
                <p className="text-success-700">Brokers specializing in non-resident mortgages know which banks work best for your situation and can negotiate better rates.</p>
              </div>
              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-semibold text-success-800">Keep documents ready</p>
                <p className="text-success-700">Have all paperwork translated into Spanish. Incomplete documentation is the main cause of delays.</p>
              </div>
              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-semibold text-success-800">Budget conservatively</p>
                <p className="text-success-700">Don't stretch to the maximum. Remember ongoing costs, currency fluctuations, and potential rate increases.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-accent-600 to-primary-800 text-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Need Help with Financing?</h2>
            <p className="mb-6 text-warm-300">
              We partner with Habeno, a mortgage aggregator specializing in non-resident financing. They compare offers from multiple Spanish banks to find you the best rates and terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e" target="_blank" rel="noopener noreferrer"
                className="bg-white text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
              >
                Start Mortgage Application →
              </a>
              <a 
                href="https://wa.me/34634044970"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </section>

        </div>
      </article>

      {/* Lead Form */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="container mx-auto px-4 max-w-2xl">
          <LeadFormAdvanced
            title="Get Mortgage Pre-Approval"
            subtitle="Connect with specialist mortgage brokers who work with non-resident buyers daily."
            propertyInterest="Mortgage Guide Inquiry"
            source="mortgages-guide"
            variant="hero"
            showBudget={true}
            showTimeline={true}
            showCallbackDate={true}
            ctaText="Get Pre-Approval Started"
          />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href="/guides/buying-process" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold mb-2">Buying Process</h3>
              <p className="text-warm-600 text-sm">Step-by-step purchase guide</p>
            </a>
            <a href="/guides/nie-number" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold mb-2">NIE Number</h3>
              <p className="text-warm-600 text-sm">Get your Spanish tax ID</p>
            </a>
            <a href="/guides/costs-taxes" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Costs & Taxes</h3>
              <p className="text-warm-600 text-sm">Full cost breakdown</p>
            </a>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
