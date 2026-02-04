import Link from 'next/link';

interface DeveloperCardProps {
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  knownFor: string[];
  stats?: {
    founded?: string;
    homesDelivered?: string;
    experience?: string;
  };
}

export default function DeveloperCard({
  name,
  slug,
  tagline,
  shortDescription,
  knownFor,
  stats,
}: DeveloperCardProps) {
  return (
    <Link
      href={`/builders/${slug}`}
      className="group bg-white p-5 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
    >
      <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">
        {name}
      </h3>
      <p className="text-accent-500 text-sm font-medium mb-3">{tagline}</p>
      <p className="text-warm-600 text-sm mb-4">{shortDescription}</p>

      {/* Stats row if available */}
      {stats && (stats.founded || stats.homesDelivered || stats.experience) && (
        <div className="flex gap-4 mb-4 text-xs">
          {stats.founded && (
            <div>
              <span className="text-primary-900 font-medium">{stats.founded}</span>
              <span className="text-warm-500 ml-1">Est.</span>
            </div>
          )}
          {stats.homesDelivered && (
            <div>
              <span className="text-primary-900 font-medium">{stats.homesDelivered}</span>
              <span className="text-warm-500 ml-1">Homes</span>
            </div>
          )}
          {stats.experience && (
            <div>
              <span className="text-primary-900 font-medium">{stats.experience}</span>
              <span className="text-warm-500 ml-1">Exp.</span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {knownFor.slice(0, 2).map((trait) => (
          <span
            key={trait}
            className="bg-warm-100 text-warm-600 text-xs px-2 py-1 rounded"
          >
            {trait}
          </span>
        ))}
      </div>
    </Link>
  );
}
