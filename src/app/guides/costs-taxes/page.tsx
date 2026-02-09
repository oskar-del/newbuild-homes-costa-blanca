import { Metadata } from 'next';
import Link from 'next/link';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';

export const metadata: Metadata = {
  title: 'Property Costs & Taxes Spain 2026 | Complete Buying Cost Guide',
  description: 'Full breakdown of buying costs and taxes for new build property in Spain. IVA 10%, stamp duty 1.5%, notary, legal fees. Budget calculator for Costa Blanca.',
  keywords: 'property costs Spain, taxes buying Spain, IVA Spain, stamp duty Spain, notary fees Spain, Costa Blanca costs',
};

export default function CostsTaxesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-warm-200">
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <span className="mx-2">→</span>
            <span>Costs & Taxes</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property Buying Costs & Taxes in Spain
          </h1>
          <p className="text-xl text-warm-300 max-w-2xl">
            Complete breakdown of all costs when buying new build property. Know exactly what to budget beyond the purchase price.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
            <span>📖 10 min read</span>
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
          
          {/* Summary Box */}
          <div className="bg-primary-50 border-2 border-warm-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-4 text-primary-900">Quick Summary: Total Costs</h2>
            <p className="text-warm-700 mb-4">
              When buying <strong>new build property in Spain</strong>, budget approximately <strong>13-14%</strong> on top of the purchase price for taxes, fees, and legal costs.
            </p>
            <div className="text-3xl font-bold text-accent-600">
              €300,000 property = ~€339,000-€342,000 total
            </div>
          </div>

          {/* Purchase Taxes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Purchase Taxes</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                The taxes you pay depend on whether you're buying a <strong>new build</strong> or <strong>resale</strong> property. For new builds, you pay IVA (VAT) and Stamp Duty.
              </p>
              
              <div className="bg-warm-50 rounded-xl p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">New Build Properties</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3"><strong>IVA (VAT)</strong></td>
                      <td className="py-3 text-right"><strong>10%</strong></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">
                        <strong>AJD (Stamp Duty)</strong>
                        <p className="text-sm text-warm-500">Actos Jurídicos Documentados - Valencia region</p>
                      </td>
                      <td className="py-3 text-right"><strong>1.5%</strong></td>
                    </tr>
                    <tr className="bg-primary-50">
                      <td className="py-3 font-bold">Total Tax</td>
                      <td className="py-3 text-right font-bold text-accent-600">11.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-warm-50 rounded-xl p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">Resale Properties (for comparison)</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">
                        <strong>ITP (Transfer Tax)</strong>
                        <p className="text-sm text-warm-500">Impuesto de Transmisiones Patrimoniales - Valencia region</p>
                      </td>
                      <td className="py-3 text-right"><strong>10%</strong></td>
                    </tr>
                    <tr className="bg-warm-100">
                      <td className="py-3 font-bold">Total Tax</td>
                      <td className="py-3 text-right font-bold">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-800">Note:</p>
                <p className="text-yellow-700">Tax rates vary by region. The rates above are for the Valencia Community (which includes Costa Blanca). Other regions may differ.</p>
              </div>
            </div>
          </section>

          {/* Professional Fees */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Professional Fees</h2>
            
            <div className="space-y-6">
              {/* Notary */}
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Notary Fees</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warm-700">Typical range:</span>
                  <span className="font-bold text-lg">€600 - €1,500</span>
                </div>
                <p className="text-warm-600 text-sm">
                  Set by government scale based on property value. Covers preparation and witnessing of the purchase deed (escritura). Your lawyer typically arranges the notary appointment — we can recommend trusted notaries in the Costa Blanca area.
                </p>
              </div>

              {/* Land Registry */}
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Land Registry (Registro de la Propiedad)</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warm-700">Typical range:</span>
                  <span className="font-bold text-lg">€400 - €800</span>
                </div>
                <p className="text-warm-600 text-sm">
                  Official registration of your ownership. Also based on government scale.
                </p>
              </div>

              {/* Legal Fees */}
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Legal Fees (Lawyer/Solicitor)</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warm-700">Typical rate:</span>
                  <span className="font-bold text-lg">1% - 1.5% + IVA</span>
                </div>
                <p className="text-warm-600 text-sm">
                  Independent legal representation. Strongly recommended for international buyers. Usually minimum €1,500. We work with English-speaking lawyers experienced in Costa Blanca property transactions — ask us for recommendations.
                </p>
              </div>

              {/* Gestoría */}
              <div className="bg-warm-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Gestoría (Administrative Agent)</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warm-700">Typical range:</span>
                  <span className="font-bold text-lg">€300 - €500</span>
                </div>
                <p className="text-warm-600 text-sm">
                  Handles paperwork like tax payments, utility connections, NIE applications. Often included in legal fees.
                </p>
              </div>
            </div>
          </section>

          {/* Complete Cost Breakdown */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Complete Cost Breakdown Example</h2>
            <div className="bg-white border-2 border-warm-200 rounded-xl overflow-hidden">
              <div className="bg-warm-800 text-white p-4">
                <h3 className="font-bold">Example: €300,000 New Build Apartment</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Purchase Price</td>
                    <td className="p-4 text-right font-semibold">€300,000</td>
                  </tr>
                  <tr className="border-b bg-warm-50">
                    <td className="p-4 font-semibold" colSpan={2}>Taxes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">IVA (10%)</td>
                    <td className="p-4 text-right">€30,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">AJD Stamp Duty (1.5%)</td>
                    <td className="p-4 text-right">€4,500</td>
                  </tr>
                  <tr className="border-b bg-warm-50">
                    <td className="p-4 font-semibold" colSpan={2}>Professional Fees</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Notary</td>
                    <td className="p-4 text-right">€1,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Land Registry</td>
                    <td className="p-4 text-right">€600</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Legal Fees (1% + IVA)</td>
                    <td className="p-4 text-right">€3,630</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Gestoría</td>
                    <td className="p-4 text-right">€400</td>
                  </tr>
                  <tr className="bg-accent-600 text-white">
                    <td className="p-4 font-bold">TOTAL COST</td>
                    <td className="p-4 text-right font-bold text-xl">€340,130</td>
                  </tr>
                  <tr className="bg-primary-50">
                    <td className="p-4 text-primary-800">Additional costs as % of price</td>
                    <td className="p-4 text-right font-bold text-primary-800">13.4%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Ongoing Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Ongoing Annual Costs</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>Once you own property in Spain, you'll have annual costs to budget for:</p>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center p-4 bg-warm-50 rounded-lg">
                <div>
                  <strong>IBI (Council Tax)</strong>
                  <p className="text-sm text-warm-600">Impuesto sobre Bienes Inmuebles</p>
                </div>
                <span className="font-semibold">€300 - €800/year</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-warm-50 rounded-lg">
                <div>
                  <strong>Basura (Rubbish Collection)</strong>
                  <p className="text-sm text-warm-600">Annual waste collection fee</p>
                </div>
                <span className="font-semibold">€50 - €150/year</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-warm-50 rounded-lg">
                <div>
                  <strong>Community Fees</strong>
                  <p className="text-sm text-warm-600">Shared maintenance, pool, gardens, etc.</p>
                </div>
                <span className="font-semibold">€600 - €2,400/year</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-warm-50 rounded-lg">
                <div>
                  <strong>Home Insurance</strong>
                  <p className="text-sm text-warm-600">Buildings and contents</p>
                </div>
                <span className="font-semibold">€200 - €500/year</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-warm-50 rounded-lg">
                <div>
                  <strong>Non-Resident Tax</strong>
                  <p className="text-sm text-warm-600">If not renting out (imputed income tax)</p>
                </div>
                <span className="font-semibold">€200 - €600/year</span>
              </div>
            </div>
          </section>

          {/* Non-Resident Tax */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Taxes for Non-Residents</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>
                If you're a non-resident property owner in Spain, you have tax obligations even if you don't rent out your property:
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">If NOT Renting Out</h3>
              <p>
                You pay <strong>imputed income tax</strong> based on the cadastral value of your property. Currently:
              </p>
              <ul>
                <li>EU/EEA residents: 19% of 1.1-2% of cadastral value</li>
                <li>Non-EU residents: 24% of 1.1-2% of cadastral value</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">If Renting Out</h3>
              <p>
                You pay tax on rental income. EU/EEA residents can deduct expenses; non-EU residents pay on gross income.
              </p>
              <ul>
                <li>EU/EEA residents: 19% on net profit</li>
                <li>Non-EU residents: 24% on gross income</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                <p className="font-semibold text-primary-800">Tip:</p>
                <p className="text-primary-700">Many owners use a fiscal representative or gestoría to handle annual tax declarations. Cost is typically €100-200/year.</p>
              </div>
            </div>
          </section>

          {/* Selling Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Costs When Selling</h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              <p>If you sell your property in the future, budget for:</p>
              <ul>
                <li><strong>Plusvalía Municipal:</strong> Local capital gains tax based on land value increase. Varies by municipality.</li>
                <li><strong>Capital Gains Tax:</strong> 19% for EU residents, 24% for non-EU. Payable on profit from sale.</li>
                <li><strong>Estate Agent Fees:</strong> If using an agent, typically 3-5% + IVA.</li>
                <li><strong>Energy Certificate:</strong> Required for sale, €100-200.</li>
              </ul>
              <p>
                Non-residents: the buyer must retain 3% of the sale price and pay it to the tax office as a withholding against your capital gains liability.
              </p>
            </div>
          </section>

          {/* Calculator Prompt */}
          <section className="bg-gradient-to-r from-accent-600 to-primary-800 text-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Need a Personalized Cost Estimate?</h2>
            <p className="mb-6 text-warm-300">
              Get an accurate breakdown of all costs for your specific property. Our team can provide a detailed estimate based on your chosen development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="bg-white text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
              >
                Request Cost Estimate
              </Link>
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
            title="Get a Detailed Cost Breakdown"
            subtitle="Tell us your budget and we'll provide a personalized cost estimate for your property search."
            propertyInterest="Costs & Taxes Guide Inquiry"
            source="costs-taxes-guide"
            variant="hero"
            showBudget={true}
            showTimeline={true}
            showCallbackDate={true}
            ctaText="Get Cost Estimate"
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
              <p className="text-warm-600 text-sm">Step-by-step purchase guide</p>
            </Link>
            <Link href="/guides/nie-number" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">NIE Number</h3>
              <p className="text-warm-600 text-sm">Get your Spanish tax ID</p>
            </Link>
            <Link href="/guides/mortgages" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Mortgages</h3>
              <p className="text-warm-600 text-sm">Financing for foreigners</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
