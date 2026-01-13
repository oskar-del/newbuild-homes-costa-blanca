'use client';

/**
 * Investment Charts Component
 * 
 * Provides visual data for property investment section:
 * - InvestmentChart: Costa Blanca price growth 2020-2025
 * - AreaPriceComparison: Compare average prices across towns
 * 
 * Uses Recharts for visualization
 */

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Costa Blanca property price growth data (€/m²)
const priceGrowthData = [
  { year: '2020', price: 1650, growth: 0 },
  { year: '2021', price: 1780, growth: 7.9 },
  { year: '2022', price: 1920, growth: 7.9 },
  { year: '2023', price: 2080, growth: 8.3 },
  { year: '2024', price: 2250, growth: 8.2 },
  { year: '2025', price: 2420, growth: 7.6 },
];

// Area price comparison data
const areaPriceData = [
  { area: 'Javea', price: 3400, color: '#0ea5e9' },
  { area: 'Moraira', price: 4200, color: '#8b5cf6' },
  { area: 'Calpe', price: 2800, color: '#f59e0b' },
  { area: 'Altea', price: 3000, color: '#10b981' },
  { area: 'Benidorm', price: 2600, color: '#ef4444' },
  { area: 'Torrevieja', price: 2100, color: '#ec4899' },
  { area: 'Orihuela Costa', price: 2300, color: '#6366f1' },
  { area: 'Guardamar', price: 2000, color: '#14b8a6' },
];

/**
 * Investment Chart - Shows price growth over time
 */
export function InvestmentChart({ area }: { area?: string }) {
  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-stone-700 mb-3">
        Costa Blanca Price Growth (€/m²)
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={priceGrowthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={(value) => `€${value}`}
            domain={[1500, 2600]}
          />
          <Tooltip 
            formatter={(value) => [`€${value}/m²`, 'Avg. Price']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#059669' }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-stone-500 mt-2 text-center">
        Average annual growth: 7.8% (2020-2025)
      </p>
    </div>
  );
}

interface AreaPriceComparisonProps {
  currentTown?: string;
}

export function AreaPriceComparison({ currentTown }: AreaPriceComparisonProps) {
  // Highlight the current town if provided
  const dataWithHighlight = areaPriceData.map(item => ({
    ...item,
    isHighlighted: currentTown ? item.area.toLowerCase().includes(currentTown.toLowerCase()) : false,
  }));

  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-stone-700 mb-3">
        Average Price by Area (€/m²)
      </h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dataWithHighlight} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
          <XAxis 
            type="number"
            tick={{ fontSize: 11 }}
            tickLine={false}
            tickFormatter={(value) => `€${value}`}
            domain={[0, 4500]}
          />
          <YAxis 
            type="category"
            dataKey="area"
            tick={{ fontSize: 11 }}
            tickLine={false}
            width={90}
          />
          <Tooltip 
            formatter={(value) => [`€${value}/m²`, 'Avg. Price']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          />
          <Bar dataKey="price" radius={[0, 4, 4, 0]}>
            {dataWithHighlight.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.isHighlighted ? '#f59e0b' : entry.color}
                opacity={entry.isHighlighted ? 1 : 0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-stone-500 mt-2 text-center">
        North Costa Blanca averages 30-50% higher than South
      </p>
    </div>
  );
}

/**
 * Rental Yield Chart - NOT USED (shows NaN issues)
 * Kept for potential future use with proper data
 */
export function RentalYieldChart() {
  const rentalData = [
    { area: 'Torrevieja', yield: 6.2 },
    { area: 'Orihuela Costa', yield: 5.8 },
    { area: 'Guardamar', yield: 5.5 },
    { area: 'Benidorm', yield: 7.1 },
    { area: 'Calpe', yield: 5.9 },
    { area: 'Javea', yield: 4.8 },
  ];

  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-stone-700 mb-3">
        Estimated Rental Yields (%)
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={rentalData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="area" 
            tick={{ fontSize: 10 }}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 8]}
          />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Gross Yield']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="yield" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Tourism Stats Chart - Shows visitor numbers
 */
export function TourismStatsChart() {
  const tourismData = [
    { year: '2019', visitors: 8.2 },
    { year: '2020', visitors: 3.1 },
    { year: '2021', visitors: 5.4 },
    { year: '2022', visitors: 7.8 },
    { year: '2023', visitors: 9.1 },
    { year: '2024', visitors: 9.8 },
  ];

  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-stone-700 mb-3">
        Costa Blanca Tourism (Million Visitors)
      </h4>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={tourismData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={(value) => `${value}M`}
            domain={[0, 12]}
          />
          <Tooltip 
            formatter={(value) => [`${value}M visitors`, 'Annual']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="visitors" 
            stroke="#6366f1" 
            strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-stone-500 mt-2 text-center">
        Record tourism supports strong rental demand
      </p>
    </div>
  );
}
