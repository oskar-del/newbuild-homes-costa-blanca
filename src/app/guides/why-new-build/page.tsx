import type { Metadata } from 'next';
import Link from 'next/link';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';
import JustLaunchedDevelopments from '@/components/JustLaunchedDevelopments';

export const metadata: Metadata = {
  title: 'New Build vs Resale Spain 2026 | 10 Reasons to Buy New Construction',
  description: 'New build vs resale property in Spain compared. 10-year guarantees, launch pricing 20-40% below completion, better mortgages. Complete 2026 guide.',
  keywords: 'new build vs resale Spain, buy new build Spain, off plan property Spain, new construction Costa Blanca, advantages new build Spain, launch prices Spain',
  openGraph: {
    title: 'New Build vs Resale Spain | 10 Reasons to Buy New',
    description: 'Why savvy buyers choose new build over resale in Costa Blanca. Launch pricing, guarantees, and modern specs.',
    type: 'article',
  },
};

export default function WhyNewBuildPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="text-warm-200 text-sm mb-4">
              <Link href="/guides" className="hover:text-white">Guides</Link>
              <span className="mx-2">›</span>
              <span>New Build vs Resale</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              New Build vs Resale Property in Spain: Which Should You Buy?
            </h1>
            <p className="text-xl text-warm-300">
              10 compelling reasons to choose new construction over resale — from launch pricing advantages to 10-year guarantees and better mortgage terms.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-warm-200">
              <span>📖 10 min read</span>
              <span>•</span>
              <span>Updated February 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary-50 border border-warm-200 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-3 text-primary-900">New Build Advantages at a Glance</h2>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Launch prices</strong> — 20-40% below completion value</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>10-year guarantee</strong> — structural defects covered</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Better mortgages</strong> — banks prefer new builds</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Lower taxes</strong> — 10% IVA vs 8-10% transfer tax</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Payment plans</strong> — spread cost over construction</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Customization</strong> — choose your finishes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Energy efficient</strong> — A/B ratings, lower bills</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Bank guaranteed</strong> — deposits protected by law</span>
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
              When searching for property on the Costa Blanca, you'll find two main options: new build developments and resale properties. While resale homes can offer charm and established locations, <strong>new build properties offer significant financial and practical advantages</strong> that many international buyers overlook.
            </p>
            <p className="text-warm-700">
              Here's why savvy buyers are increasingly choosing new construction — and why the numbers often make it the smarter investment.
            </p>
          </div>

          {/* Reason 1: Launch Pricing */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</span>
              <h2 className="text-2xl font-bold">Launch Prices: Buy at 20-40% Below Completion Value</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                This is the biggest advantage most buyers don't know about. Developers launch projects at <strong>significantly lower prices</strong> to generate early sales and build momentum. As the project progresses and units sell, prices increase with each phase.
              </p>
              <div className="bg-success-50 border-l-4 border-success-500 p-4 mb-4">
                <p className="font-semibold text-success-800">Real Example:</p>
                <p className="text-success-700">
                  A development might launch 2-bed apartments at €195,000. By completion 18 months later, the last units sell for €260,000 — that's <strong>over 30% appreciation</strong> before you even get the keys.
                </p>
              </div>
              <p className="text-warm-700">
                Early buyers essentially lock in today's prices for tomorrow's property. With resale, you pay full market price — no room for built-in appreciation.
              </p>
            </div>
          </section>

        </div>
      </article>

      {/* Just Launched Developments - Showcase */}
      <JustLaunchedDevelopments
        title="Currently at Launch Prices"
        subtitle="These developments just launched — get in early before prices increase"
        limit={3}
        variant="default"
      />

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Reason 2: Builder Guarantees */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</span>
              <h2 className="text-2xl font-bold">10-Year Structural Guarantee</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                Spanish law (LOE - Ley de Ordenación de la Edificación) requires builders to provide <strong>mandatory guarantees</strong> on new construction:
              </p>
              <div className="bg-warm-50 rounded-xl p-6 mb-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-semibold">10 Years</td>
                      <td className="py-3">Structural defects (foundations, load-bearing walls)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-semibold">3 Years</td>
                      <td className="py-3">Habitability issues (waterproofing, insulation, plumbing)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold">1 Year</td>
                      <td className="py-3">Finishing defects (paintwork, fixtures, fittings)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-warm-700">
                With resale properties? You buy "as seen." Any hidden defects are your problem. That damp issue, those foundation cracks, the leaky roof — all at your expense.
              </p>
            </div>
          </section>

          {/* Reason 3: Tax Advantages */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</span>
              <h2 className="text-2xl font-bold">Lower Purchase Taxes</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                New builds and resale properties are taxed differently in Spain — and new builds often work out cheaper:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-success-50 rounded-xl p-4">
                  <h4 className="font-bold text-success-800 mb-2">New Build Taxes</h4>
                  <ul className="text-sm text-success-700 space-y-1">
                    <li>• IVA (VAT): <strong>10%</strong></li>
                    <li>• AJD (Stamp Duty): ~1.5%</li>
                    <li>• <strong>Total: ~11.5%</strong></li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="font-bold text-orange-800 mb-2">Resale Taxes</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• ITP (Transfer Tax): <strong>8-10%</strong>*</li>
                    <li>• No stamp duty</li>
                    <li>• <strong>Total: 8-10%</strong></li>
                  </ul>
                </div>
              </div>
              <p className="text-warm-700 text-sm mb-4">
                *ITP varies by region. Valencia/Alicante region is 10%.
              </p>
              <p className="text-warm-700">
                While resale appears cheaper on tax alone, remember: new builds include everything brand new (no renovation costs), and you're buying at launch prices that can be 20-40% below completion value.
              </p>
            </div>
          </section>

          {/* Reason 4: Better Mortgages */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</span>
              <h2 className="text-2xl font-bold">Better Mortgage Terms</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                Spanish banks <strong>prefer financing new builds</strong>. Why? Lower risk. The property is brand new, has a guaranteed valuation, and comes with those legal guarantees.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-success-50 rounded-xl p-4">
                  <h4 className="font-bold text-success-800 mb-2">New Build</h4>
                  <ul className="text-sm text-success-700 space-y-1">
                    <li>• LTV up to 70-80%</li>
                    <li>• Competitive interest rates</li>
                    <li>• Straightforward valuation</li>
                    <li>• Developer-bank partnerships</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="font-bold text-orange-800 mb-2">Resale</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• LTV often limited to 60-70%</li>
                    <li>• Rates can be higher</li>
                    <li>• Valuation uncertainty</li>
                    <li>• More documentation required</li>
                  </ul>
                </div>
              </div>
              <p className="text-warm-700">
                Many developers also have <strong>preferred bank arrangements</strong> that streamline the mortgage process for their buyers.
              </p>
            </div>
          </section>

          {/* Reason 5: Payment Plans */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">5</span>
              <h2 className="text-2xl font-bold">Spread Payments Over Construction</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                Off-plan purchases let you <strong>spread your investment</strong> over 12-24 months:
              </p>
              <div className="bg-warm-50 rounded-xl p-6 mb-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Reservation deposit</span>
                    <span className="font-semibold">€3,000 - €10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract signing (30 days)</span>
                    <span className="font-semibold">20-30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>During construction</span>
                    <span className="font-semibold">20-30%</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span>On completion</span>
                    <span className="font-semibold">20-40%</span>
                  </div>
                </div>
              </div>
              <p className="text-warm-700">
                This gives you time to save, sell existing property, or arrange financing. With resale, you need the full amount ready within weeks.
              </p>
            </div>
          </section>

          {/* Reason 6: Customization */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">6</span>
              <h2 className="text-2xl font-bold">Customize Your Property</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                Buy early enough in the construction process and you can often <strong>personalize your new home</strong>:
              </p>
              <ul className="space-y-2 text-warm-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span>Choose flooring types and colors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span>Select kitchen cabinet styles and countertops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span>Pick bathroom tiles and fixtures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span>Upgrade appliances or air conditioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span>Modify layouts (in early stages)</span>
                </li>
              </ul>
              <p className="text-warm-700">
                With resale, you're stuck with the previous owner's taste — or paying €20,000+ to change it.
              </p>
            </div>
          </section>

          {/* Reason 7: Modern Specifications */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">7</span>
              <h2 className="text-2xl font-bold">Modern Specifications & Energy Efficiency</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                New builds meet <strong>current building standards</strong> — something older properties simply can't match without expensive renovations:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Ducted air conditioning throughout</span>
                </div>
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Double/triple glazed windows</span>
                </div>
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Modern thermal insulation</span>
                </div>
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Energy efficiency rating A or B</span>
                </div>
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Pre-wired for smart home tech</span>
                </div>
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Modern plumbing & electrics</span>
                </div>
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Contemporary kitchen appliances</span>
                </div>
                <div className="flex items-center gap-2 text-warm-700">
                  <span className="text-success-500">✓</span>
                  <span>Designer bathrooms included</span>
                </div>
              </div>
              <p className="text-warm-700">
                Better energy efficiency means <strong>lower utility bills</strong> — increasingly important as energy costs rise. Most resale properties have E, F, or G ratings.
              </p>
            </div>
          </section>

          {/* Reason 8: No Renovation Needed */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">8</span>
              <h2 className="text-2xl font-bold">Move In Ready — No Renovation Surprises</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                That "charming" resale property often needs work. New kitchen? €15,000. New bathrooms? €8,000 each. Rewiring? €5,000+. Suddenly your "bargain" isn't so cheap.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="font-semibold text-yellow-800">Hidden Costs of Resale:</p>
                <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                  <li>• Outdated electrics needing replacement</li>
                  <li>• Old plumbing with potential leaks</li>
                  <li>• Worn kitchen and bathrooms</li>
                  <li>• Single glazing (hot summers, cold winters)</li>
                  <li>• No air conditioning installation</li>
                  <li>• Potential damp or structural issues</li>
                </ul>
              </div>
              <p className="text-warm-700">
                New builds? Everything is brand new, under warranty, and exactly as specified. No nasty surprises.
              </p>
            </div>
          </section>

          {/* Reason 9: Bank Guarantee Protection */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">9</span>
              <h2 className="text-2xl font-bold">Bank Guarantee Protection</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                When buying off-plan in Spain, your stage payments are <strong>protected by bank guarantee</strong>. If the developer fails to complete the project, you get your money back with interest.
              </p>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-4">
                <p className="font-semibold text-primary-800">Legal Protection (Law 20/2015):</p>
                <p className="text-primary-700">
                  Spanish law requires developers to provide bank guarantees or insurance for all payments received before completion. Deposits must be held in special escrow accounts. This protection doesn't exist with resale purchases.
                </p>
              </div>
              <p className="text-warm-700">
                Your investment is secure throughout the construction period — something the 2008 crisis taught Spain to mandate.
              </p>
            </div>
          </section>

          {/* Reason 10: Better Resale & Rental */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">10</span>
              <h2 className="text-2xl font-bold">Easier Resale & Higher Rental Income</h2>
            </div>
            <div className="pl-14">
              <p className="text-warm-700 mb-4">
                When it's time to sell or rent, modern properties attract more interest and command better prices:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-warm-50 rounded-xl p-4">
                  <h4 className="font-bold mb-2">For Resale</h4>
                  <ul className="text-sm text-warm-700 space-y-1">
                    <li>• Modern design appeals to wider market</li>
                    <li>• Good energy rating increasingly important</li>
                    <li>• Remaining warranty transfers to buyer</li>
                    <li>• No "dated" features putting buyers off</li>
                  </ul>
                </div>
                <div className="bg-warm-50 rounded-xl p-4">
                  <h4 className="font-bold mb-2">For Holiday Rentals</h4>
                  <ul className="text-sm text-warm-700 space-y-1">
                    <li>• Better guest reviews</li>
                    <li>• Higher nightly rates</li>
                    <li>• Lower maintenance costs</li>
                    <li>• Resort amenities boost appeal</li>
                  </ul>
                </div>
              </div>
              <p className="text-warm-700">
                A 10-year-old modern apartment will still feel contemporary. A 10-year-old "traditional" property often feels outdated.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">New Build vs Resale: Direct Comparison</h2>
            <div className="bg-white rounded-xl shadow overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="p-4 text-left">Factor</th>
                    <th className="p-4 text-center text-success-700">New Build</th>
                    <th className="p-4 text-center text-orange-700">Resale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Price appreciation</td>
                    <td className="p-4 text-center text-success-600">✓ Buy at launch prices</td>
                    <td className="p-4 text-center text-orange-600">✗ Pay market rate</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4 font-medium">Structural guarantee</td>
                    <td className="p-4 text-center text-success-600">✓ 10 years</td>
                    <td className="p-4 text-center text-orange-600">✗ None</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Purchase tax</td>
                    <td className="p-4 text-center text-success-600">10% IVA + 1.5% AJD</td>
                    <td className="p-4 text-center text-orange-600">8-10% ITP</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4 font-medium">Mortgage terms</td>
                    <td className="p-4 text-center text-success-600">✓ Favorable</td>
                    <td className="p-4 text-center text-orange-600">~ More restrictive</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Payment flexibility</td>
                    <td className="p-4 text-center text-success-600">✓ Staged payments</td>
                    <td className="p-4 text-center text-orange-600">✗ Full amount upfront</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4 font-medium">Customization</td>
                    <td className="p-4 text-center text-success-600">✓ Choose finishes</td>
                    <td className="p-4 text-center text-orange-600">✗ Take as-is</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Energy efficiency</td>
                    <td className="p-4 text-center text-success-600">✓ A/B rating</td>
                    <td className="p-4 text-center text-orange-600">✗ Often E/F/G</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4 font-medium">Renovation needed</td>
                    <td className="p-4 text-center text-success-600">✓ Move-in ready</td>
                    <td className="p-4 text-center text-orange-600">✗ Often €20k+</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Deposit protection</td>
                    <td className="p-4 text-center text-success-600">✓ Bank guaranteed</td>
                    <td className="p-4 text-center text-orange-600">~ Contract only</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4 font-medium">Availability</td>
                    <td className="p-4 text-center text-orange-600">~ Wait for completion</td>
                    <td className="p-4 text-center text-success-600">✓ Immediate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When Resale Might Be Better */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">When Might Resale Be Better?</h2>
            <p className="text-warm-700 mb-4">
              To be fair, resale properties do have advantages in specific situations:
            </p>
            <ul className="space-y-2 text-warm-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>Immediate availability</strong> — no waiting for construction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>Established areas</strong> — mature gardens, known neighbors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>Character properties</strong> — traditional Spanish fincas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span><strong>Prime locations</strong> — beachfront where no new land exists</span>
              </li>
            </ul>
            <p className="text-warm-700 mt-4">
              However, for most buyers prioritizing value, security, and modern living — new build is the clear winner.
            </p>
          </section>

          {/* Expert Guidance CTA */}
          <section className="mb-12">
            <div className="bg-primary-900 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Not All New Builds Are Equal</h2>
              <p className="mb-4 text-warm-300">
                Location, developer track record, and timing all impact your investment potential. Some areas consistently outperform others for capital growth, while certain developments offer better value than comparable projects nearby.
              </p>
              <p className="mb-6 text-warm-300">
                We specialize in matching buyers with the right development for their budget and goals — whether that's maximizing rental yield, long-term appreciation, or finding the best lifestyle fit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/34634044970?text=Hi%2C%20I%27m%20interested%20in%20new%20build%20properties%20and%20would%20like%20advice%20on%20the%20best%20areas%20and%20developments%20for%20my%20budget."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Get Personalized Recommendations
                </a>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  Is it safe to buy off-plan property in Spain?
                  <span className="transform group-open:rotate-180 transition-transform text-warm-500">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Yes, Spanish law provides strong protections for off-plan buyers. All deposits and stage payments must be secured by bank guarantees or insurance policies. If the developer fails to deliver, you get your money back with interest. Always ensure your lawyer verifies the bank guarantee exists before making any payments.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  What taxes do I pay on new build property in Spain?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  New builds are subject to 10% IVA (VAT) plus approximately 1.5% AJD (stamp duty), totaling around 11.5%. This compares to 8-10% ITP (transfer tax) on resale properties. While the headline rate is slightly higher, new builds include everything brand new with no renovation costs.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  How much cheaper are launch prices compared to completion?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Launch prices are typically 20-40% below completion prices, depending on the development and location. Developers increase prices with each construction phase and as units sell. Buying in Phase 1 or 2 offers the best value, though you'll wait longer for completion.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  What guarantee do I get with a new build in Spain?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Spanish law mandates three guarantee periods: 10 years for structural defects (foundations, load-bearing elements), 3 years for habitability issues (waterproofing, plumbing, insulation), and 1 year for finishing defects (paintwork, fixtures). These guarantees are backed by mandatory insurance policies.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  Can I get a mortgage for off-plan property?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Yes, and banks often prefer new builds. You typically arrange the mortgage to complete when the property is ready — the mortgage funds the final 50-60% payment at completion. Many developers have partnerships with Spanish banks that can streamline the process.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  What happens if construction is delayed?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Your purchase contract should specify the completion date and penalties for delays. If delays become significant, you may be entitled to compensation or contract termination with full refund. The bank guarantee protects your deposits regardless of delay reasons.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  Are new builds more expensive than resale per square meter?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  On paper, yes — new builds typically cost more per square meter than resale. However, this doesn't account for launch price discounts (buying early), renovation costs on resale (often €20,000+), or energy efficiency savings. When comparing total cost of ownership, new builds often work out better value.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  Can I choose my own finishes in a new build?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Often yes, especially if you buy early. Many developers offer selection packages for flooring, kitchen cabinets, tiles, and fixtures. Some allow layout modifications before construction reaches that phase. The earlier you buy, the more customization options available.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  What amenities do new build developments include?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Most Costa Blanca new builds include communal swimming pools, landscaped gardens, underground parking, and storage rooms. Many also feature gyms, padel courts, children's play areas, and gated security. These amenities are shared among owners and maintained through community fees.
                </p>
              </details>

              <details className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                  Is new build better for holiday rentals?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Generally yes. Modern properties with pools, air conditioning, and contemporary design attract better reviews and higher rental rates. Lower maintenance costs improve profitability. Resort-style amenities increase booking appeal. Energy efficiency reduces utility costs between rentals.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary-900 text-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore New Build Options?</h2>
            <p className="mb-6 text-warm-300">
              We specialize exclusively in new build properties across Costa Blanca. Get early access to launch prices and expert guidance throughout your purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/developments"
                className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors text-center"
              >
                View All Developments
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
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="container mx-auto px-4 max-w-2xl">
          <LeadFormAdvanced
            title="Get Personalized New Build Recommendations"
            subtitle="Tell us your budget and requirements — we'll match you with suitable developments at launch prices."
            propertyInterest="New Build vs Resale Guide Inquiry"
            source="why-new-build-guide"
            variant="hero"
            showBudget={true}
            showTimeline={true}
            showCallbackDate={true}
            ctaText="Get My Recommendations"
          />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/guides/buying-process" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Buying Process</h3>
              <p className="text-warm-600 text-sm">Step-by-step new build purchase guide</p>
            </Link>
            <Link href="/guides/costs-taxes" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Costs & Taxes</h3>
              <p className="text-warm-600 text-sm">Full breakdown of buying costs</p>
            </Link>
            <Link href="/guides/mortgages" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Mortgages</h3>
              <p className="text-warm-600 text-sm">Financing for foreign buyers</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
