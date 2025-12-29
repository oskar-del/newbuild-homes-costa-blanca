import Link from 'next/link';
import { Metadata } from 'next';
import { fetchXMLFeed, groupByDeveloper } from '@/lib/xml-parser';

export const metadata: Metadata = {
  title: 'Property Developers Costa Blanca | Trusted Spanish Builders',
  description: 'Discover trusted property developers building new homes across Costa Blanca.',
};

export default async function BuildersPage() {
  const properties = await fetchXMLFeed();
  const developerGroups = groupByDeveloper(properties);
  const builders = Array.from(developerGroups.entries()).map(([slug, props]) => {
    const prices = props.map(p => p.price).filter(Boolean) as number[];
    return { slug, name: props[0]?.developer || slug, developments: new Set(props.map(p => p.developmentSlug)).size, properties: props.length, priceFrom: prices.length ? Math.min(...prices) : null };
  }).sort((a, b) => b.properties - a.properties);
  return (
    <>
      <section className="bg-hero-pattern text-white py-16"><div className="container-wide"><h1 className="heading-1 text-white mb-4">Trusted Developers</h1><p className="lead text-primary-100 max-w-2xl">We work with Costa Blanca's most reputable builders to bring you quality new build homes.</p></div></section>
      <section className="section"><div className="container-wide"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {builders.map((builder) => (
          <Link key={builder.slug} href={`/builders/${builder.slug}`} className="card p-6 hover:-translate-y-1 transition-all">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-2">{builder.name}</h2>
            <div className="text-sm text-slate-600 space-y-1">
              <p>{builder.developments} active developments</p>
              <p>{builder.properties} properties</p>
              {builder.priceFrom && <p>From {builder.priceFrom.toLocaleString()} EUR</p>}
            </div>
          </Link>
        ))}
      </div></div></section>
    </>
  );
}
