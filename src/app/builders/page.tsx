import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Property Developers Costa Blanca | Trusted Spanish Builders',
  description: 'Discover trusted property developers building new homes across Costa Blanca. Contrimar, Aedas Homes, Taylor Wimpey España and more.',
};

const builders = [
  {
    slug: 'contrimar',
    name: 'Contrimar',
    established: 2003,
    completed: '25+ projects',
    specialization: 'Golf & Resort Properties',
    activeDevelopments: 3,
  },
];

export default function BuildersPage() {
  return (
    <>
      <section className="bg-hero-pattern text-white py-16">
        <div className="container-wide">
          <h1 className="heading-1 text-white mb-4">
            Trusted Developers
          </h1>
          <p className="lead text-primary-100 max-w-2xl">
            We work with Costa Blanca's most reputable builders to bring you 
            quality new build homes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {builders.map((builder) => (
              <Link
                key={builder.slug}
                href={`/builders/${builder.slug}`}
                className="card p-8 hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {builder.name.charAt(0)}
                  </span>
                </div>
                <h2 className="font-display font-bold text-xl text-slate-900 mb-2">
                  {builder.name}
                </h2>
                <p className="text-slate-600 mb-4">{builder.specialization}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Established</span>
                    <span className="font-medium">{builder.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Completed</span>
                    <span className="font-medium">{builder.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Developments</span>
                    <span className="font-medium text-primary-600">{builder.activeDevelopments}</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Coming Soon Card */}
            <div className="card p-8 bg-slate-50 border-dashed border-2 border-slate-200">
              <div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h2 className="font-display font-bold text-xl text-slate-400 mb-2">
                More Builders Coming
              </h2>
              <p className="text-slate-400">
                We're adding more trusted developers to our portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container-wide text-center">
          <h2 className="heading-3 text-slate-900 mb-4">
            Are You a Developer?
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            We're always looking to partner with quality builders. 
            Get in touch to discuss marketing your developments.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="btn-primary"
          >
            Partner With Us
          </a>
        </div>
      </section>
    </>
  );
}
