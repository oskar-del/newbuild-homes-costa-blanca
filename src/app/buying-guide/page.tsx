import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'How to Buy Property in Spain | Complete Guide for Foreigners',
  description: 'Step-by-step guide to buying property in Spain as a foreigner. NIE numbers, mortgages, legal process, taxes and costs explained.',
};

const steps = [
  {
    number: 1,
    title: 'Get Your NIE Number',
    description: 'The NIE (Número de Identificación de Extranjero) is essential for any property transaction in Spain. Apply at Spanish consulates abroad or in Spain.',
    link: '/guides/nie-number',
  },
  {
    number: 2,
    title: 'Open a Spanish Bank Account',
    description: 'You\'ll need a Spanish bank account for the purchase transaction and ongoing bills. Most banks require your NIE to open an account.',
    link: null,
  },
  {
    number: 3,
    title: 'Arrange Financing',
    description: 'If you need a mortgage, start the pre-approval process early. Spanish banks offer up to 70% financing for non-residents.',
    link: '/finance',
  },
  {
    number: 4,
    title: 'Find Your Property',
    description: 'Browse our developments or tell us your requirements. We\'ll help you find the perfect property and arrange viewings.',
    link: '/developments',
  },
  {
    number: 5,
    title: 'Make a Reservation',
    description: 'Once you\'ve chosen a property, pay a reservation deposit (typically €3,000-6,000) to take it off the market.',
    link: null,
  },
  {
    number: 6,
    title: 'Sign the Private Contract',
    description: 'Sign the purchase contract and pay the initial deposit (usually 30-40% of purchase price). Have a lawyer review all documents.',
    link: null,
  },
  {
    number: 7,
    title: 'Completion at Notary',
    description: 'Sign the public deed (escritura) at the notary, pay the balance plus taxes, and receive your keys!',
    link: null,
  },
];

export default function BuyingGuidePage() {
  return (
    <>
      <section className="bg-hero-pattern text-white py-16">
        <div className="container-wide">
          <h1 className="heading-1 text-white mb-4">
            Buying Property in Spain
          </h1>
          <p className="lead text-primary-100 max-w-2xl">
            A complete guide for international buyers. We'll walk you through 
            every step of purchasing your Spanish property.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div className="flex-grow">
                  <h2 className="font-display font-bold text-xl text-slate-900 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-slate-600 mb-2">
                    {step.description}
                  </p>
                  {step.link && (
                    <Link href={step.link} className="text-primary-600 font-medium hover:underline">
                      Learn more →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/finance" className="card p-6 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-4 block">🏦</span>
              <h3 className="font-semibold text-slate-900 mb-2">Mortgages & Finance</h3>
              <p className="text-slate-600 text-sm">Get up to 70% financing from Spanish banks.</p>
            </Link>
            <Link href="/guides/buying-costs" className="card p-6 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-4 block">💰</span>
              <h3 className="font-semibold text-slate-900 mb-2">Taxes & Costs</h3>
              <p className="text-slate-600 text-sm">Understand all the costs involved in buying.</p>
            </Link>
            <Link href="/guides/nie-number" className="card p-6 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-4 block">📋</span>
              <h3 className="font-semibold text-slate-900 mb-2">NIE Application</h3>
              <p className="text-slate-600 text-sm">How to get your Spanish tax ID number.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide text-center">
          <h2 className="heading-2 text-slate-900 mb-4">
            Ready to Start?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We're here to guide you through every step. Contact us to discuss 
            your requirements and start your property search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/developments" className="btn-primary">
              Browse Developments
            </Link>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
