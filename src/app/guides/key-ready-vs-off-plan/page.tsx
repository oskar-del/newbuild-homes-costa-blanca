import type { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Key Ready vs Off-Plan Property Spain | Which to Buy?',
  description: 'Compare key ready and off-plan properties in Spain. Payment schedules, risks, savings, and which option suits your situation. Expert guide for 2026.',
  keywords: 'key ready vs off plan Spain, off plan property Spain, new build payment schedule, buying off plan Costa Blanca',
};

export default function KeyReadyVsOffPlanPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="text-warm-200 text-sm mb-4">
              <Link href="/guides" className="hover:text-white">Guides</Link>
              <span className="mx-2">›</span>
              <span>Key Ready vs Off-Plan</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Key Ready vs Off-Plan: Which Should You Buy?
            </h1>
            <p className="text-xl text-warm-300">
              Move in now or save money? Understand the pros, cons, and payment options to make the right choice for your Spanish property purchase.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-warm-200">
              <span>📖 10 min read</span>
              <span>•</span>
              <span>Updated January 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary-50 border border-warm-200 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-3 text-primary-900">Quick Comparison</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-success-50 rounded-lg p-4">
                  <h3 className="font-bold text-success-800 mb-2">Key Ready</h3>
                  <ul className="text-success-700 space-y-1">
                    <li>• Move in within weeks</li>
                    <li>• What you see is what you get</li>
                    <li>• Full payment at purchase</li>
                    <li>• Higher price per unit</li>
                    <li>• No construction risk</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-2">Off-Plan</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Wait 12-24 months</li>
                    <li>• Buy from plans/renders</li>
                    <li>• Staged payments</li>
                    <li>• Launch price savings</li>
                    <li>• Bank guaranteed deposits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Intro */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-warm-700 leading-relaxed">
              When buying new build property in Spain, you'll often face a choice: key ready (completed) or off-plan (under construction). Both have genuine advantages — the right choice depends on your timeline, budget, risk tolerance, and goals.
            </p>
            <p className="text-warm-700">
              This guide explains everything you need to know to make an informed decision.
            </p>
          </div>

          {/* What is Key Ready */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Key Ready?</h2>
            <p className="text-warm-700 mb-4">
              "Key ready" means the property is fully built, has all licenses and certificates, and you can move in almost immediately after purchase. You're buying a finished product.
            </p>

            <div className="bg-success-50 rounded-xl p-6 mb-4">
              <h3 className="font-bold text-success-800 mb-3">Key Ready Advantages</h3>
              <ul className="space-y-2 text-success-700">
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>Immediate availability</strong> — move in within 4-8 weeks of signing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>No construction risk</strong> — no delays, no surprises</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>See exactly what you're buying</strong> — visit and inspect the actual unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>Immediate rental income</strong> — start earning from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>Easier financing</strong> — simpler mortgage process for completed properties</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="font-bold text-orange-800 mb-3">Key Ready Disadvantages</h3>
              <ul className="space-y-2 text-orange-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Higher price</strong> — you pay the full, final-phase price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Limited choice</strong> — best units often sold already</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>No customization</strong> — finishes and layout are fixed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Full payment required</strong> — need all funds upfront</span>
                </li>
              </ul>
            </div>
          </section>

          {/* What is Off-Plan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Off-Plan?</h2>
            <p className="text-warm-700 mb-4">
              "Off-plan" means buying a property before or during construction. You purchase based on architectural plans, 3D renders, and show homes (if available). The property doesn't exist yet, or isn't finished.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-4">
              <h3 className="font-bold text-blue-800 mb-3">Off-Plan Advantages</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Launch pricing</strong> — typically 20-40% below completion prices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Best unit selection</strong> — choose your preferred plot/floor/orientation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Staged payments</strong> — spread cost over 12-24 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Customization options</strong> — choose finishes, sometimes layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Time to arrange finances</strong> — mortgage only needed at completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Built-in equity</strong> — appreciation during construction</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="font-bold text-orange-800 mb-3">Off-Plan Disadvantages</h3>
              <ul className="space-y-2 text-orange-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Waiting period</strong> — typically 12-24 months until completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Buying "blind"</strong> — can only see plans and renders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Potential delays</strong> — construction can take longer than planned</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Market risk</strong> — property values could change during construction</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Payment Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Payment Schedules Compared</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-bold text-success-800 mb-4">Key Ready Payment</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Reservation</span>
                    <span className="font-semibold">€3,000-10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract signing</span>
                    <span className="font-semibold">10% (minus reservation)</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span>Completion (4-8 weeks)</span>
                    <span className="font-semibold">Remaining 90%</span>
                  </div>
                </div>
                <p className="text-warm-600 text-xs mt-4">
                  Plus ~13% for taxes, notary, and fees
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-bold text-blue-800 mb-4">📋 Off-Plan Payment</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Reservation</span>
                    <span className="font-semibold">€3,000-10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract (30 days)</span>
                    <span className="font-semibold">20-30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>During construction</span>
                    <span className="font-semibold">20-30%</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span>Completion (12-24 months)</span>
                    <span className="font-semibold">30-50%</span>
                  </div>
                </div>
                <p className="text-warm-600 text-xs mt-4">
                  Exact schedule varies by developer
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="font-semibold text-yellow-800">Important:</p>
              <p className="text-yellow-700">
                Off-plan payments before completion must be protected by <strong>bank guarantee</strong> (aval bancario). If the developer fails to deliver, you get your money back with interest. Always verify this guarantee exists before paying.
              </p>
            </div>
          </section>

          {/* Price Difference Example */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Real Price Difference Example</h2>
            <p className="text-warm-700 mb-4">
              Here's how pricing typically works for the same development:
            </p>

            <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="p-4 text-left">Purchase Stage</th>
                    <th className="p-4 text-center">3-Bed Villa Price</th>
                    <th className="p-4 text-center">Savings vs Key Ready</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">Phase 1 Launch (foundations)</td>
                    <td className="p-4 text-center font-semibold text-success-600">€320,000</td>
                    <td className="p-4 text-center text-success-600">-20% (€80,000)</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4">Phase 2 (structure complete)</td>
                    <td className="p-4 text-center font-semibold">€350,000</td>
                    <td className="p-4 text-center text-success-600">-12.5% (€50,000)</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4">Phase 3 (near completion)</td>
                    <td className="p-4 text-center font-semibold">€380,000</td>
                    <td className="p-4 text-center text-success-600">-5% (€20,000)</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4 font-bold">Key Ready (completed)</td>
                    <td className="p-4 text-center font-bold">€400,000</td>
                    <td className="p-4 text-center">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-success-50 border-l-4 border-success-500 p-4">
              <p className="font-semibold text-success-800">The Math:</p>
              <p className="text-success-700">
                Buying at Phase 1 launch saves €80,000 compared to key ready — that's the cost of furnishing your villa, a car, and several years of community fees.
              </p>
            </div>
          </section>

          {/* Risk Assessment */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Understanding the Risks</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-bold text-lg mb-3">Off-Plan Risks (and Mitigations)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-warm-800">Construction Delays</p>
                    <p className="text-warm-600 text-sm mb-1">Projects can take 3-12 months longer than estimated.</p>
                    <p className="text-success-600 text-sm">✓ <strong>Mitigation:</strong> Check developer track record. Established builders like Contrimar, TM, and GV have strong delivery histories.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-warm-800">Developer Insolvency</p>
                    <p className="text-warm-600 text-sm mb-1">What if the builder goes bankrupt?</p>
                    <p className="text-success-600 text-sm">✓ <strong>Mitigation:</strong> Bank guarantees (mandatory in Spain) protect all stage payments. You get your money back with interest.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-warm-800">Doesn't Match Expectations</p>
                    <p className="text-warm-600 text-sm mb-1">Finished product differs from renders.</p>
                    <p className="text-success-600 text-sm">✓ <strong>Mitigation:</strong> Visit completed developments by the same builder. Check specifications in your contract.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-bold text-lg mb-3">Key Ready Risks</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-warm-800">Paying Premium Prices</p>
                    <p className="text-warm-600 text-sm mb-1">You pay the highest price in the development lifecycle.</p>
                    <p className="text-orange-600 text-sm">⚠ <strong>Trade-off:</strong> This is the cost of certainty and immediate availability.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-warm-800">Limited Selection</p>
                    <p className="text-warm-600 text-sm mb-1">Best units often sold during off-plan phases.</p>
                    <p className="text-orange-600 text-sm">⚠ <strong>Trade-off:</strong> You may need to compromise on orientation, floor, or view.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Decision Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Which Should You Choose?</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-success-50 rounded-xl p-6">
                <h3 className="font-bold text-success-800 text-lg mb-4">Choose Key Ready if:</h3>
                <ul className="space-y-2 text-success-700">
                  <li className="flex items-start gap-2">
                    <span className="text-success-500 mt-1">✓</span>
                    <span>You need to move in soon (relocation, retirement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500 mt-1">✓</span>
                    <span>You want immediate rental income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500 mt-1">✓</span>
                    <span>You prefer to see exactly what you're buying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500 mt-1">✓</span>
                    <span>You have funds available now</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500 mt-1">✓</span>
                    <span>You're risk-averse about construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500 mt-1">✓</span>
                    <span>Your circumstances might change (can't commit 2 years)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 text-lg mb-4">Choose Off-Plan if:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Maximizing value is your priority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>You can wait 12-24 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>You want to choose your exact unit/plot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>You need time to accumulate funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>You want to customize finishes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>You're comfortable with reputable developers</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Hybrid Option */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">The "Nearly Ready" Sweet Spot</h2>
            <p className="text-warm-700 mb-4">
              There's actually a middle ground many buyers overlook: buying <strong>during late construction</strong> (Phase 3). You get:
            </p>

            <ul className="space-y-2 text-warm-700 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-success-500 mt-1">✓</span>
                <span>Some discount vs key ready (typically 5-15%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-500 mt-1">✓</span>
                <span>Shorter wait (3-6 months vs 12-24)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-500 mt-1">✓</span>
                <span>Can often visit the building in progress</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-500 mt-1">✓</span>
                <span>Lower construction risk (project clearly completing)</span>
              </li>
            </ul>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4">
              <p className="font-semibold text-primary-800">Our Tip:</p>
              <p className="text-primary-700">
                Ask us about developments in Phase 3 — these offer an excellent balance of savings, certainty, and timing.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Is my money safe when buying off-plan?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Yes, Spanish law requires all off-plan deposits to be protected by bank guarantees (aval bancario) or insurance. If the developer fails to deliver, you receive a full refund plus legal interest. Always verify this guarantee exists before making payments.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Can I change my mind after signing off-plan?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  It depends on your contract, but generally you would forfeit your reservation deposit if you withdraw. Once you sign the private purchase contract, additional penalties may apply. Some developers allow resale of your contract to another buyer — ask before signing.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  What if construction is delayed?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Delays of 3-6 months are common and usually covered by contract clauses. Significant delays (12+ months) may entitle you to compensation or contract termination with full refund. Your lawyer should review these terms before you sign.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Can I get a mortgage for off-plan property?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Yes. You typically get mortgage approval in principle early, then finalize when the property is near completion. The mortgage funds the final payment (usually 30-50%). Banks prefer lending on new builds, and many developers have preferred bank relationships.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  How much can I really save buying off-plan?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Typically 20-40% compared to key ready prices in the same development. On a €400,000 villa, that's €80,000-160,000. The earlier you buy (Phase 1), the greater the savings — but also the longer the wait.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Can I visit the property during construction?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Usually yes, with the developer's permission. Many developers offer scheduled site visits at key construction milestones. This lets you see progress and feel more connected to your purchase.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-accent-600 to-primary-800 text-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Need Help Deciding?</h2>
            <p className="mb-6 text-warm-300">
              We have both key ready and off-plan properties available across Costa Blanca. Tell us your timeline and priorities, and we'll recommend the best options for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/properties"
                className="bg-white text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
              >
                Browse Properties
              </Link>
              <a
                href="https://wa.me/34634044970"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </section>

        </div>
      </article>

      {/* Lead Form */}
      <section className="py-16 bg-warm-100">
        <div className="container mx-auto px-4">
          <LeadForm
            title="Get Property Recommendations"
            subtitle="Tell us whether you prefer key ready or off-plan, and we'll match you with suitable properties."
            propertyInterest="Key Ready vs Off-Plan Guide Inquiry"
          />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/guides/why-new-build" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Why New Build?</h3>
              <p className="text-warm-600 text-sm">10 reasons to choose new construction</p>
            </Link>
            <Link href="/guides/buying-process" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Buying Process</h3>
              <p className="text-warm-600 text-sm">Step-by-step purchase guide</p>
            </Link>
            <Link href="/guides/costs-taxes" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Costs & Taxes</h3>
              <p className="text-warm-600 text-sm">Full breakdown of buying costs</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
