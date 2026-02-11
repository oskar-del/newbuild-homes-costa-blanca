'use client';

import Link from 'next/link';
import { useLocalizeHref } from '@/lib/useLocale';

interface PriceData {
  type: string;
  priceRange: string;
  avgPrice: number;
  trend: 'up' | 'stable' | 'down';
  trendPercent: number;
}

interface ComparisonArea {
  name: string;
  slug: string;
  avgPrice: number;
  rentalYield: number;
  distanceToBeach: string;
  distanceToAirport: string;
}

interface MarketContext {
  spainOverview: string;
  regionalTrends: string;
  localDevelopments: string;
  futureOutlook: string;
  priceGrowth5Year: string;
  foreignBuyerPercent: string;
  averageDaysOnMarket: string;
}

interface InvestmentAnalysisProps {
  areaName: string;
  priceData: PriceData[];
  comparisonAreas: ComparisonArea[];
  rentalYield: {
    shortTerm: string;
    longTerm: string;
    occupancy: string;
  };
  investmentHighlights: string[];
  marketInsight: string;
  marketContext?: MarketContext;
}

export default function InvestmentAnalysis({
  areaName,
  priceData,
  comparisonAreas,
  rentalYield,
  investmentHighlights,
  marketInsight,
  marketContext,
}: InvestmentAnalysisProps) {
  const localizeHref = useLocalizeHref();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);

  const getTrendIcon = (trend: 'up' | 'stable' | 'down') => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const getTrendColor = (trend: 'up' | 'stable' | 'down') => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-warm-600';
  };

  return (
    <section id="investment" className="py-16 bg-gradient-to-b from-primary-900 to-primary-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-400">
              Investment Analysis
            </span>
            <div className="w-12 h-px bg-accent-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
            Property Investment in <span className="font-semibold">{areaName}</span>
          </h2>
          <p className="text-warm-300 max-w-2xl mx-auto">
            {marketInsight}
          </p>
        </div>

        {/* Market Context Section - NEW */}
        {marketContext && (
          <div className="mb-12 grid lg:grid-cols-2 gap-8">
            {/* Spain Market Overview */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🇪🇸</span>
                Spain Property Market 2025
              </h3>
              <p className="text-warm-300 mb-4 leading-relaxed">
                {marketContext.spainOverview}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-400">{marketContext.priceGrowth5Year}</p>
                  <p className="text-white/60 text-xs mt-1">5-Year Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-400">{marketContext.foreignBuyerPercent}</p>
                  <p className="text-white/60 text-xs mt-1">Foreign Buyers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-400">{marketContext.averageDaysOnMarket}</p>
                  <p className="text-white/60 text-xs mt-1">Days on Market</p>
                </div>
              </div>
            </div>

            {/* Regional & Local Trends */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📍</span>
                {areaName} & Costa Blanca South
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-accent-400 font-semibold text-sm uppercase tracking-wide mb-2">Regional Trends</h4>
                  <p className="text-warm-300 text-sm leading-relaxed">{marketContext.regionalTrends}</p>
                </div>
                <div>
                  <h4 className="text-accent-400 font-semibold text-sm uppercase tracking-wide mb-2">Local Developments</h4>
                  <p className="text-warm-300 text-sm leading-relaxed">{marketContext.localDevelopments}</p>
                </div>
                <div>
                  <h4 className="text-accent-400 font-semibold text-sm uppercase tracking-wide mb-2">Future Outlook</h4>
                  <p className="text-warm-300 text-sm leading-relaxed">{marketContext.futureOutlook}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Price Analysis Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Price Guide by Property Type
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left py-3 px-4 font-semibold text-primary-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-900">Price Range</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-900">Average</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-900">Trend (12mo)</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((row, index) => (
                    <tr key={index} className="border-b border-warm-100 hover:bg-warm-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-medium text-primary-900">{row.type}</span>
                      </td>
                      <td className="py-4 px-4 text-warm-700">{row.priceRange}</td>
                      <td className="py-4 px-4 font-semibold text-primary-900">
                        {formatCurrency(row.avgPrice)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`flex items-center gap-1 font-medium ${getTrendColor(row.trend)}`}>
                          {getTrendIcon(row.trend)}
                          {row.trend === 'up' ? '+' : row.trend === 'down' ? '' : ''}
                          {row.trendPercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-warm-500 text-sm mt-4 italic">
              * Prices based on new build properties. Data updated monthly.
            </p>
          </div>

          {/* Rental Yield Card */}
          <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">🏠</span>
              Rental Returns
            </h3>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Short-Term (Holiday)</p>
                <p className="text-2xl font-bold">{rentalYield.shortTerm}</p>
                <p className="text-white/70 text-xs mt-1">Gross annual yield</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Long-Term Rental</p>
                <p className="text-2xl font-bold">{rentalYield.longTerm}</p>
                <p className="text-white/70 text-xs mt-1">Gross annual yield</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Average Occupancy</p>
                <p className="text-2xl font-bold">{rentalYield.occupancy}</p>
                <p className="text-white/70 text-xs mt-1">Golf season extends demand</p>
              </div>
            </div>

            <Link
              href={localizeHref('/consultation?subject=investment')}
              className="block w-full bg-white text-accent-600 font-semibold text-center py-3 rounded-lg mt-6 hover:bg-warm-50 transition-colors"
            >
              Get Investment Analysis
            </Link>
          </div>
        </div>

        {/* Area Comparison */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            How {areaName} Compares
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-900 text-white">
                  <th className="text-left py-3 px-4 font-semibold rounded-tl-lg">Area</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg. Price (3-bed villa)</th>
                  <th className="text-left py-3 px-4 font-semibold">Rental Yield</th>
                  <th className="text-left py-3 px-4 font-semibold">Beach</th>
                  <th className="text-left py-3 px-4 font-semibold rounded-tr-lg">Airport</th>
                </tr>
              </thead>
              <tbody>
                {comparisonAreas.map((area, index) => (
                  <tr
                    key={index}
                    className={`border-b border-warm-100 hover:bg-accent-50 transition-colors ${
                      area.name.includes(areaName) ? 'bg-accent-50 font-semibold' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <Link
                        href={`/areas/${area.slug}`}
                        className="text-primary-900 hover:text-accent-600 transition-colors"
                      >
                        {area.name}
                        {area.name.includes(areaName) && (
                          <span className="ml-2 text-accent-500 text-sm">(This area)</span>
                        )}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-primary-900 font-semibold">
                      {formatCurrency(area.avgPrice)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 font-medium">{area.rentalYield}%</span>
                    </td>
                    <td className="py-4 px-4 text-warm-700">{area.distanceToBeach}</td>
                    <td className="py-4 px-4 text-warm-700">{area.distanceToAirport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {investmentHighlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-xl p-5 text-white"
            >
              <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-lg font-bold mb-4">
                {index + 1}
              </div>
              <p className="text-warm-200">{highlight}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href={localizeHref('/consultation')}
            className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Investment Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
