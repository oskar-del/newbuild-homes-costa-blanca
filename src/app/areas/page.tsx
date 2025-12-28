import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Costa Blanca Areas | Where to Buy Property in Spain',
  description: 'Explore Costa Blanca regions: Torrevieja, Orihuela Costa, Guardamar, Benidorm and more. Find the perfect location for your Spanish property.',
};

const areas = [
  { slug: 'torrevieja', name: 'Torrevieja', region: 'Costa Blanca South', properties: 45, priceFrom: 150000 },
  { slug: 'orihuela-costa', name: 'Orihuela Costa', region: 'Costa Blanca South', properties: 38, priceFrom: 180000 },
  { slug: 'guardamar', name: 'Guardamar del Segura', region: 'Costa Blanca South', properties: 22, priceFrom: 200000 },
  { slug: 'algorfa', name: 'Algorfa', region: 'Costa Blanca South', properties: 15, priceFrom: 250000 },
  { slug: 'benidorm', name: 'Benidorm', region: 'Costa Blanca North', properties: 28, priceFrom: 200000 },
  { slug: 'finestrat', name: 'Finestrat', region: 'Costa Blanca North', properties: 18, priceFrom: 250000 },
];

export default function AreasPage() {
  return (
    <>
      <section className="bg-hero-pattern text-white py-16">
        <div className="container-wide">
          <h1 className="heading-1 text-white mb-4">
            Explore Costa Blanca
          </h1>
          <p className="lead text-primary-100 max-w-2xl">
            From vibrant coastal resorts to peaceful inland towns - 
            find your perfect location in Spain's most popular region.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="heading-3 text-slate-900 mb-8">Costa Blanca South</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {areas.filter(a => a.region === 'Costa Blanca South').map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="card p-6 hover:-translate-y-1 transition-all"
              >
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  {area.name}
                </h3>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{area.properties} properties</span>
                  <span>From €{area.priceFrom.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="heading-3 text-slate-900 mb-8">Costa Blanca North</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.filter(a => a.region === 'Costa Blanca North').map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="card p-6 hover:-translate-y-1 transition-all"
              >
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  {area.name}
                </h3>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{area.properties} properties</span>
                  <span>From €{area.priceFrom.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
