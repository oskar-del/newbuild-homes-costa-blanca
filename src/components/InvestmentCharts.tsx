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
export function InvestmentChart() {
  return (
    <div className="bg-white rounded-lg p-4">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={priceGrowthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `€${value}`}
            domain={[1500, 2600]}
          />
          <Tooltip 
            formatter={(value: number) => [`€${value}/m²`, 'Avg. Price']}
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
            stroke="#059669"
            strokeWidth={3}
            dot={{ fill: '#059669', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#059669' }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center text-stone-500 text-xs mt-2">
        Costa Blanca average property prices (€/m²) | Source: Property market data 2020-2025
      </p>
    </div>
  );
}

/**
 * Area Price Comparison - Bar chart comparing town prices
 */
interface AreaPriceComparisonProps {
  currentTown?: string;
}

export function AreaPriceComparison({ currentTown }: AreaPriceComparisonProps) {
  // Highlight the current town if provided
  const data = areaPriceData.map((item) => ({
    ...item,
    isHighlighted: currentTown?.toLowerCase().includes(item.area.toLowerCase()),
  }));
  
  return (
    <div className="bg-white rounded-lg p-4">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
          <XAxis 
            type="number"
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `€${value}`}
            domain={[0, 4500]}
          />
          <YAxis 
            type="category"
            dataKey="area"
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={{ stroke: '#d1d5db' }}
            width={80}
          />
          <Tooltip 
            formatter={(value: number) => [`€${value}/m²`, 'Avg. Price']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          />
          <Bar dataKey="price" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.isHighlighted ? '#059669' : entry.color}
                fillOpacity={entry.isHighlighted ? 1 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-stone-500 text-xs mt-2">
        Average prices by area (€/m²) | 2024-2025 market data
      </p>
    </div>
  );
}

/**
 * Rental Yield Comparison (Alternative chart if needed)
 */
export function RentalYieldChart() {
  const yieldData = [
    { area: 'Torrevieja', yield: 6.2 },
    { area: 'Benidorm', yield: 5.8 },
    { area: 'Orihuela Costa', yield: 5.5 },
    { area: 'Guardamar', yield: 5.3 },
    { area: 'Calpe', yield: 4.9 },
    { area: 'Altea', yield: 4.5 },
    { area: 'Javea', yield: 4.2 },
    { area: 'Moraira', yield: 3.8 },
  ];
  
  return (
    <div className="bg-white rounded-lg p-4">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={yieldData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="area"
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={{ stroke: '#d1d5db' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 7]}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Gross Yield']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="yield" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-stone-500 text-xs mt-2">
        Estimated gross rental yields by area | 2024 market data
      </p>
    </div>
  );
}

/**
 * Tourism Stats Chart
 */
export function TourismStatsChart() {
  const tourismData = [
    { year: '2019', visitors: 8.2, occupancy: 72 },
    { year: '2020', visitors: 3.1, occupancy: 38 },
    { year: '2021', visitors: 5.8, occupancy: 52 },
    { year: '2022', visitors: 7.9, occupancy: 68 },
    { year: '2023', visitors: 8.7, occupancy: 75 },
    { year: '2024', visitors: 9.2, occupancy: 78 },
  ];
  
  return (
    <div className="bg-white rounded-lg p-4">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={tourismData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `${value}M`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              name === 'visitors' ? `${value}M visitors` : `${value}% occupancy`,
              name === 'visitors' ? 'Tourism' : 'Occupancy'
            ]}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="visitors"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="occupancy"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: '#f59e0b', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        <span className="flex items-center text-xs text-stone-600">
          <span className="w-3 h-3 bg-blue-500 rounded mr-1"></span>
          Visitors (millions)
        </span>
        <span className="flex items-center text-xs text-stone-600">
          <span className="w-3 h-3 bg-amber-500 rounded mr-1"></span>
          Occupancy rate (%)
        </span>
      </div>
    </div>
  );
}
