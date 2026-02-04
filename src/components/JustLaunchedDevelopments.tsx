import Link from 'next/link';
import Image from 'next/image';
import { getAllDevelopments, Development } from '@/lib/development-service';

interface JustLaunchedProps {
  limit?: number;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  variant?: 'default' | 'compact' | 'dark';
}

// Format price for display
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Parse delivery date and calculate months until completion
function getDeliveryInfo(dev: Development): { label: string; monthsAway: number; isNew: boolean } {
  if (dev.status === 'key-ready') {
    return { label: 'Key Ready Now', monthsAway: 0, isNew: false };
  }

  if (!dev.deliveryDate && !dev.deliveryQuarter) {
    return { label: 'TBC', monthsAway: 99, isNew: false };
  }

  const now = new Date();
  let targetDate: Date;

  if (dev.deliveryQuarter) {
    // Parse "Q2 2026" format
    const match = dev.deliveryQuarter.match(/Q(\d)\s*(\d{4})/);
    if (match) {
      const quarter = parseInt(match[1]);
      const year = parseInt(match[2]);
      const month = (quarter - 1) * 3; // Q1=0, Q2=3, Q3=6, Q4=9
      targetDate = new Date(year, month, 1);
    } else {
      return { label: dev.deliveryQuarter, monthsAway: 99, isNew: false };
    }
  } else if (dev.deliveryDate) {
    // Parse "01-06-2026" format
    const parts = dev.deliveryDate.split('-');
    if (parts.length === 3) {
      targetDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    } else {
      return { label: dev.deliveryDate, monthsAway: 99, isNew: false };
    }
  } else {
    return { label: 'TBC', monthsAway: 99, isNew: false };
  }

  const monthsAway = Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30));

  // Format the label
  const label = targetDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

  // Developments with delivery 18+ months away are likely newly launched
  const isNew = monthsAway >= 18;

  return { label, monthsAway, isNew };
}

// Get just-launched developments (furthest delivery dates = newest launches)
async function getJustLaunchedDevelopments(limit: number): Promise<Development[]> {
  const allDevs = await getAllDevelopments();

  // Filter to off-plan only and sort by furthest delivery date
  const offPlan = allDevs
    .filter(d => d.status === 'off-plan' || d.status === 'under-construction')
    .map(d => ({
      ...d,
      deliveryInfo: getDeliveryInfo(d),
    }))
    .filter(d => d.deliveryInfo.monthsAway > 6) // At least 6 months out
    .sort((a, b) => b.deliveryInfo.monthsAway - a.deliveryInfo.monthsAway) // Furthest first
    .slice(0, limit);

  return offPlan;
}

// Card component
function DevelopmentCard({ dev, variant }: { dev: Development; variant: string }) {
  const deliveryInfo = getDeliveryInfo(dev);
  const isDark = variant === 'dark';

  return (
    <Link
      href={`/developments/${dev.slug}`}
      className={`group block rounded-xl overflow-hidden transition-all ${
        isDark
          ? 'bg-white/5 hover:bg-white/10 border border-white/10'
          : 'bg-white border border-warm-200 hover:shadow-xl hover:border-accent-400'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dev.mainImage || dev.images?.[0] || '/images/placeholder.jpg'}
          alt={dev.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {deliveryInfo.isNew && (
            <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
              Just Launched
            </span>
          )}
          <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
            {dev.status === 'off-plan' ? 'Off-Plan' : 'Building'}
          </span>
        </div>

        {/* Delivery Date */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-lg">{dev.name}</span>
            <span className="bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
              {deliveryInfo.label}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${isDark ? 'text-white' : ''}`}>
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className={isDark ? 'text-white/60' : 'text-warm-500'}>📍</span>
          <span className={isDark ? 'text-white/80' : 'text-warm-700'}>{dev.town}</span>
          {dev.zone && (
            <>
              <span className={isDark ? 'text-white/40' : 'text-warm-400'}>•</span>
              <span className={isDark ? 'text-white/60' : 'text-warm-500'}>{dev.zone}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className={`text-xs ${isDark ? 'text-white/50' : 'text-warm-500'}`}>From</span>
            <span className={`block text-lg font-bold ${isDark ? 'text-accent-400' : 'text-accent-600'}`}>
              {formatPrice(dev.priceFrom)}
            </span>
          </div>
          <div className="text-right">
            <span className={`text-xs ${isDark ? 'text-white/50' : 'text-warm-500'}`}>{dev.bedroomRange} beds</span>
            <span className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-warm-700'}`}>
              {dev.availableUnits} units left
            </span>
          </div>
        </div>

        {/* Launch pricing callout */}
        <div className={`mt-3 pt-3 border-t ${isDark ? 'border-white/10' : 'border-warm-100'}`}>
          <div className="flex items-center gap-2">
            <span className="text-success-500 text-sm">💰</span>
            <span className={`text-xs ${isDark ? 'text-success-400' : 'text-success-600'} font-medium`}>
              Launch prices • Lock in today's rates
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Main component - can be used as server component
export default async function JustLaunchedDevelopments({
  limit = 3,
  title = 'Just Launched Developments',
  subtitle = 'Get in early at launch prices — typically 20-40% below completion value',
  showViewAll = true,
  variant = 'default',
}: JustLaunchedProps) {
  const developments = await getJustLaunchedDevelopments(limit);

  if (developments.length === 0) {
    return null;
  }

  const isDark = variant === 'dark';

  return (
    <section className={`py-12 ${isDark ? 'bg-primary-900' : 'bg-warm-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🚀</span>
              <span className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-accent-400' : 'text-accent-600'}`}>
                Early Bird Opportunities
              </span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-primary-900'}`}>
              {title}
            </h2>
            <p className={`mt-2 ${isDark ? 'text-white/70' : 'text-warm-600'}`}>
              {subtitle}
            </p>
          </div>
          {showViewAll && (
            <Link
              href="/developments?status=off-plan"
              className={`hidden md:inline-flex items-center gap-2 font-medium ${
                isDark ? 'text-accent-400 hover:text-accent-300' : 'text-accent-600 hover:text-accent-700'
              }`}
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developments.map((dev) => (
            <DevelopmentCard key={dev.slug} dev={dev} variant={variant} />
          ))}
        </div>

        {/* Mobile View All */}
        {showViewAll && (
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/developments?status=off-plan"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                isDark
                  ? 'bg-accent-500 text-white hover:bg-accent-600'
                  : 'bg-accent-500 text-white hover:bg-accent-600'
              }`}
            >
              View All Off-Plan Developments
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {/* Value proposition */}
        <div className={`mt-10 grid md:grid-cols-3 gap-6 pt-8 border-t ${isDark ? 'border-white/10' : 'border-warm-200'}`}>
          <div className="text-center">
            <div className="text-2xl mb-2">📉</div>
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-primary-900'}`}>Launch Pricing</h4>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-warm-600'}`}>
              Buy 20-40% below completion prices
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🛡️</div>
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-primary-900'}`}>Bank Guaranteed</h4>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-warm-600'}`}>
              Your payments protected by Spanish law
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-primary-900'}`}>Choose Finishes</h4>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-warm-600'}`}>
              Customize kitchen, floors & more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export a client-side wrapper for dynamic use
export function JustLaunchedDevelopmentsClient(props: JustLaunchedProps) {
  // This would need to fetch data client-side
  // For now, use the server component directly
  return null;
}
