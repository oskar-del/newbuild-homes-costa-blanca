import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { breadcrumbSchema, toJsonLd, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Spanish Mortgage & Finance | Compare Rates 2026 | New Build Homes Costa Blanca',
  description: 'Compare Spanish mortgage rates from all major banks. Expert finance solutions for property buyers - from first-time buyers to luxury €800k+ properties. Free calculator & market insights.',
  openGraph: {
    title: 'Spanish Mortgage & Finance | Compare Rates 2026',
    description: 'Compare Spanish mortgage rates and get expert finance advice for your property purchase.',
    type: 'website',
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

// Current market data (would be fetched from API in production)
const MARKET_DATA = {
  euribor12m: 2.45,
  euriborTrend: 'stable',
  avgFixedRate: 3.15,
  avgVariableRate: 2.85,
  ltv: {
    resident: 80,
    nonResident: 70,
  },
  lastUpdated: '2026-02-01',
};

const financeFaqs = [
  {
    question: 'Can non-residents get a mortgage in Spain?',
    answer: 'Yes, Spanish banks offer mortgages to non-residents typically up to 60-70% loan-to-value. You\'ll need proof of income, tax returns, bank statements, and a valid passport. The process takes 4-6 weeks for approval.',
  },
  {
    question: 'Should I get a fixed or variable rate mortgage in Spain?',
    answer: 'Fixed rates offer payment certainty (currently around 3-3.5%) while variable rates (Euribor + spread) can be lower but fluctuate. With Euribor stabilizing, many buyers prefer fixed rates for security. Your choice depends on risk tolerance and how long you plan to keep the mortgage.',
  },
  {
    question: 'What deposit do I need for a Spanish mortgage?',
    answer: 'Non-residents typically need 30-40% deposit (banks lend 60-70% LTV). Residents can access up to 80% LTV. Plus you\'ll need approximately 13% for purchase costs (taxes, notary, legal fees).',
  },
  {
    question: 'Can I get a mortgage to reduce Spanish wealth tax?',
    answer: 'Yes, a mortgage taken at the time of purchase is deductible from your Spanish wealth tax calculation. This can significantly reduce annual tax liability, especially on properties over €700,000. This is one reason why financing often makes sense even if you have cash.',
  },
  {
    question: 'How long does mortgage approval take in Spain?',
    answer: 'Typically 4-6 weeks from application to formal offer. Pre-approval can be obtained in 1-2 weeks with proper documentation. Using a mortgage broker can speed up the process as they know which banks suit your profile.',
  },
  {
    question: 'What documents do I need for a Spanish mortgage?',
    answer: 'Passport, NIE number (or application), last 2-3 years tax returns, 3-6 months bank statements, proof of income (employment contract or company accounts if self-employed), and details of existing debts/mortgages.',
  },
];

export default function FinancePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Finance', url: 'https://newbuildhomescostablanca.com/finance/' },
  ]);

  const faqSchemaData = faqSchema(financeFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
            <nav className="text-warm-400 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Finance & Mortgages</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Property Finance</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
                  Spanish Mortgages <span className="text-accent-400">Made Simple</span>
                </h1>
                <p className="text-warm-200 text-lg leading-relaxed mb-8">
                  Compare rates from all Spanish banks, understand your options, and get expert guidance
                  for your property purchase. From first-time buyers to luxury investments.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">{MARKET_DATA.avgFixedRate}%</div>
                    <div className="text-warm-300 text-sm">Avg Fixed Rate</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">{MARKET_DATA.ltv.nonResident}%</div>
                    <div className="text-warm-300 text-sm">Non-Resident LTV</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="#calculator" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Calculate Your Mortgage
                  </a>
                  <a href="#luxury" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/30 transition-colors">
                    Luxury €800k+ Options
                  </a>
                </div>
              </div>

              {/* Market Overview Card */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Market Overview February 2026
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">12-Month Euribor</span>
                    <span className="text-xl font-bold text-primary-900">{MARKET_DATA.euribor12m}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">Avg Fixed Rate (25yr)</span>
                    <span className="text-xl font-bold text-primary-900">{MARKET_DATA.avgFixedRate}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">Avg Variable Rate</span>
                    <span className="text-xl font-bold text-primary-900">Euribor + 0.4%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">Max LTV (Non-Resident)</span>
                    <span className="text-xl font-bold text-primary-900">60-70%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-warm-600">Max LTV (Resident)</span>
                    <span className="text-xl font-bold text-primary-900">Up to 80%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <p className="text-sm text-warm-700">
                      <strong>Market Insight:</strong> ECB rate cuts in late 2025 have stabilized Euribor.
                      Fixed rates remain attractive for long-term security. Variable rates suit those expecting further cuts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Finance Options */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Our Partners</span>
              <h2 className="text-3xl font-bold text-primary-900 mt-3">Two Paths to Your Perfect Mortgage</h2>
              <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
                Whether you're buying a holiday apartment or a luxury villa, we have the right finance partner for you.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Habeno - Mainstream */}
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border-2 border-primary-200 hover:border-primary-400 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🏦</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900">Habeno</h3>
                    <p className="text-primary-600">Mortgage Comparison Platform</p>
                  </div>
                </div>

                <p className="text-warm-700 mb-6">
                  Compare mortgage offers from Spain's top banks in minutes. Perfect for standard property purchases
                  where you want to quickly see all your options and find the best rate.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">Compare 15+ Spanish banks instantly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">Free, no-obligation quotes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">Online application process</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">Best for properties under €800k</span>
                  </div>
                </div>

                <div className="bg-primary-100 rounded-xl p-4 mb-6">
                  <div className="text-sm text-primary-700">
                    <strong>Ideal for:</strong> First-time buyers, holiday homes, investment properties up to €800k
                  </div>
                </div>

                <a
                  href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 rounded-lg text-center transition-colors"
                >
                  Compare Rates Now →
                </a>
              </div>

              {/* Lions Gate Capital - Luxury */}
              <div id="luxury" className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border-2 border-amber-300 hover:border-amber-400 transition-colors relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Premium</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🦁</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900">Lions Gate Capital</h3>
                    <p className="text-amber-700">Luxury Finance Specialists</p>
                  </div>
                </div>

                <p className="text-warm-700 mb-6">
                  Spain's leading financing experts for luxury properties. Personal service, access to ALL banks,
                  and specialist knowledge in wealth tax optimization. Perfect for discerning buyers.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">50+ years combined banking experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">One contact for ALL Spanish banks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">Wealth tax optimization advice</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-700">Currency, insurance & survey services</span>
                  </div>
                </div>

                <div className="bg-amber-100 rounded-xl p-4 mb-6">
                  <div className="text-sm text-amber-800">
                    <strong>Ideal for:</strong> Luxury properties €800k+, complex income situations, wealth tax planning, bespoke service
                  </div>
                </div>

                <a
                  href="#lions-gate-calculator"
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg text-center transition-colors"
                >
                  Get Boutique Consultation →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Finance in Spain */}
        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900">Why Finance Even If You Have Cash?</h2>
              <p className="text-warm-600 mt-3">Smart buyers often choose mortgages even when they don't need to</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-bold text-primary-900 mb-2">Wealth Tax Reduction</h3>
                <p className="text-warm-600 text-sm">
                  A mortgage at purchase is deductible from wealth tax (0.28%-3.45% annually).
                  Can save €5,000-50,000+ per year on luxury properties.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-bold text-primary-900 mb-2">Diversification</h3>
                <p className="text-warm-600 text-sm">
                  Keep capital liquid for other investments that may generate higher returns than your
                  mortgage interest rate.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-primary-900 mb-2">Access to Funds</h3>
                <p className="text-warm-600 text-sm">
                  Unlike other countries, releasing equity from Spanish property later is very difficult.
                  Get finance at purchase or miss out.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📉</span>
                </div>
                <h3 className="font-bold text-primary-900 mb-2">Low Interest Rates</h3>
                <p className="text-warm-600 text-sm">
                  With rates around 3%, borrowing is historically cheap. The tax benefits often outweigh
                  the interest costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Habeno Calculator */}
        <section id="calculator" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <span className="text-primary-500 text-xs font-bold tracking-widest uppercase">Powered by Habeno</span>
              <h2 className="text-3xl font-bold text-primary-900 mt-3">Compare Spanish Mortgage Rates</h2>
              <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
                Get instant quotes from 15+ Spanish banks. Free, no-obligation comparison.
              </p>
            </div>

            {/* Habeno CTA */}
            <div className="bg-primary-50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🏦</span>
                    <h3 className="text-2xl font-bold text-primary-900">Get Your Free Quote</h3>
                  </div>
                  <p className="text-warm-700 mb-4">
                    Compare mortgage rates from 15+ Spanish banks in just a few minutes.
                    Habeno shows you all your options side-by-side with no obligation.
                  </p>
                  <ul className="space-y-2 text-warm-700 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-success-500">✓</span> Free, no-obligation comparison
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success-500">✓</span> Results in under 5 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success-500">✓</span> All major Spanish banks included
                    </li>
                  </ul>
                  <a
                    href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary-900 hover:bg-primary-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                  >
                    Compare Mortgages Now →
                  </a>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-primary-900 mb-4 text-center">Why Use Habeno?</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">⚡</span>
                      <div>
                        <div className="font-medium text-primary-900">Fast & Simple</div>
                        <div className="text-sm text-warm-600">Online process, no paperwork to start</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🔍</span>
                      <div>
                        <div className="font-medium text-primary-900">Transparent</div>
                        <div className="text-sm text-warm-600">See all rates and fees upfront</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💬</span>
                      <div>
                        <div className="font-medium text-primary-900">Expert Support</div>
                        <div className="text-sm text-warm-600">Mortgage advisors guide you through</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lions Gate Calculator */}
        <section id="lions-gate-calculator" className="py-16 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🦁</span>
                  <div>
                    <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Luxury Finance</span>
                    <h2 className="text-3xl font-bold text-primary-900">Lions Gate Capital</h2>
                  </div>
                </div>

                <p className="text-warm-700 text-lg mb-6">
                  For properties €800,000 and above, Lions Gate Capital provides bespoke mortgage solutions
                  with personal service from Spain's leading financing experts.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900">Personal Service</h4>
                      <p className="text-warm-600 text-sm">Direct contact with experienced mortgage consultants who guide you through every step.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🏦</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900">All Banks, One Contact</h4>
                      <p className="text-warm-600 text-sm">They negotiate with every Spanish bank to find the best terms for your specific situation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900">Full Service</h4>
                      <p className="text-warm-600 text-sm">Currency exchange, insurance, valuations, and tax planning - all coordinated for you.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-amber-200">
                  <h4 className="font-semibold text-primary-900 mb-3">Contact Lions Gate Capital</h4>
                  <div className="space-y-2 text-warm-700">
                    <p>📞 +34 971 100 637</p>
                    <p>✉️ info@lionsgatecapital.com</p>
                    <p>🌐 www.lionsgatecapital.com</p>
                    <p>📍 Head Office: Palma de Mallorca</p>
                  </div>
                </div>
              </div>

              {/* Lions Gate Calculator iFrame */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-amber-600 text-white p-4 text-center">
                  <h3 className="font-bold">Luxury Mortgage Calculator</h3>
                  <p className="text-amber-100 text-sm">Calculate your monthly payments</p>
                </div>
                <div className="p-4">
                  <iframe
                    frameBorder="0"
                    src="https://lionsgatecapital.com/affiliated-mortgage-calculator-horizontal"
                    width="100%"
                    height="700"
                    title="Lions Gate Capital Mortgage Calculator"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900">The Mortgage Process</h2>
              <p className="text-warm-600 mt-3">From application to completion in 4-6 weeks</p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: 1, title: 'Initial Enquiry', desc: 'Contact us with property details and your financial situation' },
                { step: 2, title: 'Documents', desc: 'Provide ID, tax returns, bank statements, proof of income' },
                { step: 3, title: 'Bank Search', desc: 'We find the best bank and terms for your profile' },
                { step: 4, title: 'Valuation', desc: 'Property valued by bank-approved surveyor' },
                { step: 5, title: 'Completion', desc: 'Sign at notary, funds released, keys yours!' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-2">{item.title}</h3>
                  <p className="text-warm-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900">Mortgage FAQs</h2>
              <p className="text-warm-600 mt-3">Common questions about Spanish property finance</p>
            </div>

            <div className="space-y-4">
              {financeFaqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-warm-200 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-primary-900 hover:bg-warm-50 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-warm-700 border-t border-warm-200 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-warm-200 mb-8 max-w-2xl mx-auto">
              Whether you're comparing rates online or need bespoke luxury finance advice, we can help you
              find the right mortgage for your Spanish property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="bg-white hover:bg-warm-100 text-primary-900 font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
