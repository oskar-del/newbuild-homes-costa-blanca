import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Spanish Mortgages for Foreigners | Finance Your Costa Blanca Property',
  description: 'Get a Spanish mortgage as a foreign buyer. Up to 70% financing for non-residents. We partner with Habeno to compare rates from multiple Spanish banks.',
};

const mortgageOptions = [
  {
    type: 'Spanish Resident',
    ltv: '70-80%',
    term: 'Up to 30 years',
    rate: 'From 3.0%',
    features: ['Full employment income considered', 'Fastest approval', 'Best rates available'],
  },
  {
    type: 'EU Resident',
    ltv: '60-70%',
    term: 'Up to 25 years',
    rate: 'From 3.5%',
    features: ['EU income documentation accepted', 'No NIE required upfront', 'Competitive rates'],
  },
  {
    type: 'UK/Non-EU Resident',
    ltv: '50-60%',
    term: 'Up to 20 years',
    rate: 'From 4.0%',
    features: ['International income considered', 'GBP/USD income acceptable', 'Specialist lenders'],
  },
];

const buyingCosts = [
  { item: 'IVA (VAT) - New builds', percentage: '10%', example: '€25,000' },
  { item: 'AJD (Stamp Duty)', percentage: '1.5%', example: '€3,750' },
  { item: 'Notary Fees', percentage: 'Fixed', example: '€1,500-2,000' },
  { item: 'Land Registry', percentage: 'Fixed', example: '€800-1,200' },
  { item: 'Legal Fees', percentage: '1-1.5%', example: '€2,500-3,750' },
];

const faqs = [
  {
    question: 'Can foreigners get a mortgage in Spain?',
    answer: 'Yes, Spanish banks actively lend to foreign buyers. Non-residents can typically borrow 50-70% of the property value, depending on residency status and income. EU residents generally get better terms than non-EU buyers, but mortgages are available to all nationalities.',
  },
  {
    question: 'What documents do I need for a Spanish mortgage?',
    answer: 'You\'ll typically need: passport, NIE number (or application), proof of income (payslips, tax returns, or accounts for self-employed), bank statements (last 6 months), proof of address, and existing mortgage/loan statements. Habeno can provide a complete checklist based on your situation.',
  },
  {
    question: 'How long does mortgage approval take in Spain?',
    answer: 'Pre-approval typically takes 1-2 weeks. Full approval and completion takes 4-8 weeks from application. For new builds, you can secure approval before construction completes, with the mortgage finalizing at completion. We recommend starting the process early.',
  },
  {
    question: 'What are current Spanish mortgage rates?',
    answer: 'Spanish mortgage rates vary by bank and borrower profile. Fixed rates currently range from 3-5% for residents and 3.5-5.5% for non-residents. Variable rates are tied to Euribor plus a margin. Habeno compares offers from multiple banks to find the best rate for your situation.',
  },
  {
    question: 'Do I need a Spanish bank account?',
    answer: 'Yes, you\'ll need a Spanish bank account before completing a property purchase. This is where mortgage payments will be debited and where you\'ll pay utility bills and community fees. Opening an account requires your NIE number and takes about 1 hour at the bank.',
  },
  {
    question: 'What is the NIE and do I need one for a mortgage?',
    answer: 'The NIE (Número de Identificación de Extranjero) is Spain\'s tax identification number for foreigners. You need one to buy property, open a bank account, and get a mortgage. You can apply at Spanish consulates abroad or in Spain. Processing takes 2-4 weeks.',
  },
];

export default function FinancePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-pattern text-white py-20">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-4 py-2 bg-success-500 rounded-full text-sm font-semibold mb-6">
                🏦 Mortgage Partner
              </span>
              <h1 className="heading-1 text-white mb-6">
                Finance Your Spanish Property
              </h1>
              <p className="lead text-primary-100 mb-8">
                Getting a Spanish mortgage as a foreign buyer is easier than you think. 
                We partner with Habeno to compare offers from multiple Spanish banks 
                and secure the best financing for your situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={siteConfig.partners.habeno}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                >
                  Start Mortgage Application
                </a>
                <a href="#how-it-works" className="btn-outline !border-white !text-white hover:!bg-white/10">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-slate-800">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-3xl">🏦</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Habeno</h3>
                    <p className="text-slate-500">Mortgage Aggregator</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-slate-600">
                    <svg className="w-5 h-5 mr-3 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Compare multiple Spanish banks
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="w-5 h-5 mr-3 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Specialist in non-resident mortgages
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="w-5 h-5 mr-3 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    English-speaking advisors
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="w-5 h-5 mr-3 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Free initial consultation
                  </li>
                </ul>
                <a
                  href={siteConfig.partners.habeno}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full !bg-success-600 hover:!bg-success-700"
                >
                  Get Started with Habeno →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Options by Residency */}
      <section id="how-it-works" className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Mortgage Options by Residency Status
            </h2>
            <p className="lead max-w-2xl mx-auto">
              Your residency status affects how much you can borrow and at what rate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mortgageOptions.map((option) => (
              <div key={option.type} className="card p-8">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-4">
                  {option.type}
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loan-to-Value</span>
                    <span className="font-semibold text-primary-600">{option.ltv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Term</span>
                    <span className="font-semibold">{option.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Rate</span>
                    <span className="font-semibold">{option.rate}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-slate-600">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={siteConfig.partners.habeno}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-success-600 hover:!bg-success-700"
            >
              Check Your Eligibility with Habeno
            </a>
          </div>
        </div>
      </section>

      {/* Buying Costs */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Buying Costs in Spain
            </h2>
            <p className="lead max-w-2xl mx-auto">
              Budget approximately 13-14% on top of the purchase price for taxes and fees
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Cost</th>
                    <th>Percentage</th>
                    <th>Example (€250,000 property)</th>
                  </tr>
                </thead>
                <tbody>
                  {buyingCosts.map((cost) => (
                    <tr key={cost.item}>
                      <td>{cost.item}</td>
                      <td>{cost.percentage}</td>
                      <td className="font-semibold">{cost.example}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary-50">
                    <td className="font-bold">Total Additional Costs</td>
                    <td className="font-bold">~13-14%</td>
                    <td className="font-bold text-primary-600">€33,550-€35,700</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-accent-50 border border-accent-200 rounded-xl p-6">
              <h3 className="font-semibold text-accent-800 mb-2">
                💡 Cash Required for Purchase
              </h3>
              <p className="text-accent-700 mb-4">
                For a €250,000 property with 70% mortgage (€175,000 loan):
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-slate-600">Deposit (30%)</div>
                  <div className="text-xl font-bold text-slate-900">€75,000</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-slate-600">Taxes & Fees (~14%)</div>
                  <div className="text-xl font-bold text-slate-900">€35,000</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-accent-200">
                <div className="flex justify-between">
                  <span className="font-semibold text-accent-800">Total Cash Required</span>
                  <span className="text-2xl font-bold text-accent-700">€110,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Mortgage Application Process
            </h2>
            <p className="lead max-w-2xl mx-auto">
              From application to completion in 4-8 weeks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>
              
              <div className="space-y-8">
                {[
                  { step: 1, title: 'Initial Consultation', time: 'Day 1', desc: 'Discuss your situation with Habeno. They\'ll assess your eligibility and recommend suitable lenders.' },
                  { step: 2, title: 'Document Collection', time: 'Week 1', desc: 'Gather required documents: income proof, bank statements, ID, and NIE application if needed.' },
                  { step: 3, title: 'Pre-Approval', time: 'Week 1-2', desc: 'Receive pre-approval letter confirming how much you can borrow. Use this to make offers on properties.' },
                  { step: 4, title: 'Property Valuation', time: 'Week 3-4', desc: 'Bank arranges independent property valuation. Cost typically €300-500, payable by buyer.' },
                  { step: 5, title: 'Final Approval', time: 'Week 4-6', desc: 'Bank issues binding mortgage offer (FEIN). Review terms carefully with your lawyer.' },
                  { step: 6, title: 'Completion', time: 'Week 6-8', desc: 'Sign at notary. Mortgage funds transfer to seller. You receive the keys!' },
                ].map((item, index) => (
                  <div key={item.step} className="relative flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
                      {item.step}
                    </div>
                    <div className="flex-grow bg-white rounded-xl shadow-md p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
                        <span className="text-sm text-primary-600 font-medium">{item.time}</span>
                      </div>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-success-600">
        <div className="container-wide text-center">
          <h2 className="heading-2 text-white mb-4">
            Ready to Get Pre-Approved?
          </h2>
          <p className="text-success-100 text-lg mb-8 max-w-2xl mx-auto">
            Start your mortgage application with Habeno today. Compare offers from 
            multiple Spanish banks and find the best rate for your situation.
          </p>
          <a
            href={siteConfig.partners.habeno}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !bg-white !text-success-700 hover:!bg-success-50 text-lg px-8 py-4"
          >
            Start Your Application with Habeno →
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-slate-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Spanish Mortgage FAQs
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg divide-y divide-slate-100">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-slate-900 mb-6">
                Questions About Financing?
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                We're here to help you understand your financing options. Contact us 
                for personalized advice on funding your Costa Blanca property purchase.
              </p>
              <div className="space-y-4">
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-600 hover:text-primary-600"
                >
                  <div className="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="font-medium">WhatsApp us for quick answers</span>
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneClean}`}
                  className="flex items-center text-slate-600 hover:text-primary-600"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="font-medium">{siteConfig.contact.phone}</span>
                </a>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="font-display font-bold text-xl mb-6">
                Request a Callback
              </h3>
              <LeadForm propertyInterest="Mortgage Enquiry" source="finance-page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
