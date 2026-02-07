'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Development } from '@/lib/development-service';

/**
 * Development Card Component
 *
 * Two modes:
 * 1. Pass a Development object directly
 * 2. Pass individual props (legacy/manual usage)
 */

interface DevelopmentCardPropsLegacy {
  development?: never;
  slug: string;
  name: string;
  image: string;
  price: number | null;
  propertyType?: string;
  town: string;
  developer?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  size?: number | null;
  unitCount?: number;
  variant?: 'dark' | 'light';
  badge?: string;
  href?: string;
  deliveryQuarter?: string;
  status?: Development['status'];
}

interface DevelopmentCardPropsDirect {
  development: Development;
  variant?: 'dark' | 'light';
  priority?: boolean;
}

type DevelopmentCardProps = DevelopmentCardPropsLegacy | DevelopmentCardPropsDirect;

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Status badge config
 */
function getStatusConfig(status?: Development['status']) {
  switch (status) {
    case 'key-ready':
      return { label: 'Key Ready', bg: 'bg-success-500', text: 'text-white' };
    case 'completed':
      return { label: 'Completed', bg: 'bg-success-400', text: 'text-white' };
    case 'under-construction':
      return { label: 'Building', bg: 'bg-amber-500', text: 'text-white' };
    case 'off-plan':
      return { label: 'Off-Plan', bg: 'bg-primary-600', text: 'text-white' };
    default:
      return null;
  }
}

export default function DevelopmentCard(props: DevelopmentCardProps) {
  // Extract values from either Development object or individual props
  const isDirect = 'development' in props && props.development;

  const slug = isDirect ? props.development.slug : props.slug;
  const name = isDirect ? props.development.name : props.name;
  const image = isDirect ? props.development.mainImage : props.image;
  const price = isDirect ? props.development.priceFrom : props.price;
  const town = isDirect ? props.development.town : props.town;
  const zone = isDirect ? props.development.zone : undefined;
  const developer = isDirect ? props.development.developer : props.developer;
  const unitCount = isDirect ? props.development.totalUnits : props.unitCount;
  const propertyTypes = isDirect ? props.development.propertyTypes : [];
  const bedroomRange = isDirect ? props.development.bedroomRange : (props.bedrooms?.toString() || '');
  const status = isDirect ? props.development.status : props.status;
  const deliveryQuarter = isDirect ? props.development.deliveryQuarter : props.deliveryQuarter;
  const priceRange = isDirect ? props.development.priceRange : (price ? formatPrice(price) : 'Price on Request');

  const variant = props.variant || 'dark';
  const statusConfig = getStatusConfig(status);

  const linkHref = `/developments/${slug}`;

  return (
    <Link
      href={linkHref}
      className={`group overflow-hidden rounded-sm transition-all duration-300 border ${
        variant === 'dark'
          ? 'bg-white border-warm-200 hover:shadow-xl'
          : 'bg-warm-50 border-primary-200 hover:shadow-xl'
      }`}
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image || '/placeholder-development.svg'}
          alt={`New build ${propertyTypes?.[0]?.toLowerCase() || 'homes'} for sale ${town} Spain ${name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {/* Status badge */}
          {statusConfig && (
            <span className={`${statusConfig.bg} ${statusConfig.text} text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide`}>
              {statusConfig.label}
            </span>
          )}

          {/* Delivery date (if not key-ready) */}
          {deliveryQuarter && status !== 'key-ready' && status !== 'completed' && (
            <span className="bg-white/90 text-primary-900 text-xs font-medium px-2 py-1 rounded-sm">
              Ready: {deliveryQuarter}
            </span>
          )}

          {/* Unit count (if no delivery badge) */}
          {(!deliveryQuarter || status === 'key-ready' || status === 'completed') && unitCount && unitCount > 1 && (
            <span className="bg-white/90 text-primary-900 text-xs font-medium px-2 py-1 rounded-sm">
              {unitCount} Units
            </span>
          )}
        </div>

        {/* Bottom price overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-xl font-semibold text-white">
            {price ? `From ${formatPrice(price)}` : 'Price on Request'}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`p-4 ${
        variant === 'dark'
          ? 'bg-primary-900'
          : 'bg-warm-50 border-t-4 border-accent-500'
      }`}>
        <h3 className={`font-semibold mb-1 transition-colors line-clamp-1 ${
          variant === 'dark'
            ? 'text-white group-hover:text-accent-400'
            : 'text-primary-900 group-hover:text-accent-600'
        }`}>
          {name}
        </h3>

        <p className={`text-sm mb-2 flex items-center gap-1 ${
          variant === 'dark' ? 'text-warm-400' : 'text-warm-600'
        }`}>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{town}{zone ? `, ${zone}` : ''}</span>
        </p>

        {/* Property info row */}
        <div className={`flex items-center gap-3 text-sm pt-2 border-t ${
          variant === 'dark'
            ? 'text-warm-300 border-white/10'
            : 'text-warm-600 border-warm-200'
        }`}>
          {bedroomRange && (
            <span>{bedroomRange} bed</span>
          )}
          {propertyTypes.length > 0 && (
            <>
              <span>•</span>
              <span className="truncate">{propertyTypes.slice(0, 2).join(', ')}</span>
            </>
          )}
        </div>

        {/* Developer and CTA */}
        <div className="mt-3 flex items-center justify-between">
          {developer && (
            <span className={`text-xs truncate mr-2 ${
              variant === 'dark' ? 'text-warm-500' : 'text-warm-500'
            }`}>
              by {developer}
            </span>
          )}
          <span className={`text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all flex-shrink-0 ${
            variant === 'dark' ? 'text-accent-400' : 'text-accent-600'
          }`}>
            View
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Compact version for sidebar/smaller grids
 */
export function DevelopmentCardCompact({ development }: { development: Development }) {
  const statusConfig = getStatusConfig(development.status);

  return (
    <Link
      href={`/developments/${development.slug}`}
      className="group flex gap-3 bg-white rounded-sm p-3 border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all"
    >
      <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={development.mainImage}
          alt={development.name}
          fill
          className="object-cover"
          sizes="96px"
          unoptimized
        />
        {statusConfig && (
          <div className={`absolute bottom-0 left-0 right-0 ${statusConfig.bg} ${statusConfig.text} text-[10px] font-bold text-center py-0.5`}>
            {statusConfig.label}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-primary-900 group-hover:text-accent-600 transition-colors text-sm truncate">
          {development.name}
        </h4>
        <p className="text-warm-500 text-xs truncate">{development.town}</p>
        <p className="text-primary-900 font-semibold text-sm mt-1">
          From {formatPrice(development.priceFrom)}
        </p>
      </div>
    </Link>
  );
}

/**
 * Skeleton for loading states
 */
export function DevelopmentCardSkeleton() {
  return (
    <div className="bg-white rounded-sm overflow-hidden border border-warm-200 animate-pulse">
      <div className="h-52 bg-warm-200" />
      <div className="p-4 bg-primary-900 space-y-3">
        <div className="h-5 bg-white/20 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
      </div>
    </div>
  );
}
