import Link from 'next/link';
import { Metadata } from 'next';
import { fetchXMLFeed, groupByArea } from '@/lib/xml-parser';

export const metadata: Metadata = {
  title: 'Costa Blanca Areas | Where to Buy Property in Spain',
  description: 'Explore Costa Blanca regions for new build properties.',
};

const northTowns = ['javea', 'denia', 'calpe', 'altea', 'benidorm', 'finestrat', 'villajoyosa', 'moraira', 'benissa', 'teulada'];
const getZone = (town: string) => northTowns.some(n => town.toLowerCase().includes(n)) ? 'Costa Blanca North' : 'Costa Blanca South';

export default async function AreasPage() {
  const properties = await fetchXMLFeed();
  const areaGroups = groupByArea(properties);
  const areas = Array.from(areaGroups.entries()).map(([townKey, props]) => {
    const prices = props.map(p => p.price).filter(Boolean) as number[];
    const town = props[0]?.town || townKey;
    return { slug: townKey.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), name: town.split('/')[0].trim(), region: getZone(town), properties: props.length, priceFrom: prices.length ? Math.min(...prices) : null };
  }).sort((a, b) => a.name.localeCompare(b.name));
  const southAreas = areas.filter(a => a.region === 'Costa Blanca South');
  const northAreas = areas.filter(a => a.region === 'Costa Blanca North');
  return (
    <>
      <section className="bg-hero-pattern text-white py-16"><div className="container-wide"><h1 className="heading-1 text-white mb-4">Explore Costa Blanca</h1><p className="lead text-primary-100 max-w-2xl">From vibrant coastal resorts to peaceful inland towns.</p></div></section>
      <section className="section"><div className="container-wide">
        {southAreas.length > 0 && (<><h2 className="heading-3 text-slate-900 mb-8">Costa Blanca South</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">{southAreas.map((area) => (<Link key={area.slug} href={`/areas/${area.slug}`} className="card p-6 hover:-translate-y-1 transition-all"><h3 className="font-display font-bold text-xl text-slate-900 mb-2">{area.name}</h3><div className="flex justify-between text-sm text-slate-600"><span>{area.properties} properties</span><span>{area.priceFrom ? `From ${area.priceFrom.toLocaleString()}` : 'POA'}</span></div></Link>))}</div></>)}
        {northAreas.length > 0 && (<><h2 className="heading-3 text-slate-900 mb-8">Costa Blanca North</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{northAreas.map((area) => (<Link key={area.slug} href={`/areas/${area.slug}`} className="card p-6 hover:-translate-y-1 transition-all"><h3 className="font-display font-bold text-xl text-slate-900 mb-2">{area.name}</h3><div className="flex justify-between text-sm text-slate-600"><span>{area.properties} properties</span><span>{area.priceFrom ? `From ${area.priceFrom.toLocaleString()}` : 'POA'}</span></div></Link>))}</div></>)}
        {areas.length === 0 && (<p className="text-center text-gray-500 py-12">No areas available.</p>)}
      </div></section>
      <section className="section bg-slate-50"><div className="container-wide"><h2 className="heading-3 text-slate-900 mb-6">Popular Areas</h2><div className="flex flex-wrap gap-3">{['Torrevieja', 'Orihuela Costa', 'Guardamar', 'Javea', 'Finestrat'].map((area) => (<Link key={area} href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`} className="px-4 py-2 bg-white rounded-full text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition border">{area}</Link>))}</div></div></section>
    </>
  );
}
