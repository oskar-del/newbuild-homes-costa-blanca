'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BEACH_ZONES,
  GOLF_ZONES,
  PRICE_BRACKETS,
  LIFESTYLE_TAGS,
  PROPERTY_TYPE_TAGS,
  REGION_TAGS,
  PriceBracket,
} from '@/data/property-tags';

// ==========================================
// TYPES
// ==========================================

interface SearchFilters {
  query: string;
  propertyType?: string;
  minBedrooms?: number;
  maxPrice?: number;
  minPrice?: number;
  lifestyle?: string[];
  area?: string;
  nearBeach?: boolean;
  nearGolf?: boolean;
  status?: 'key-ready' | 'off-plan' | 'any';
}

interface SearchSuggestion {
  type: 'area' | 'lifestyle' | 'property-type' | 'price' | 'feature' | 'development';
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

// ==========================================
// QUICK FILTERS DATA
// ==========================================

const quickFilters = [
  { id: 'golf', label: 'Golf Properties', icon: '⛳', filter: { nearGolf: true } },
  { id: 'beach', label: 'Near Beach', icon: '🏖️', filter: { nearBeach: true } },
  { id: 'budget', label: 'Under €200k', icon: '💰', filter: { maxPrice: 200000 } },
  { id: 'luxury', label: 'Luxury €500k+', icon: '✨', filter: { minPrice: 500000 } },
  { id: 'villa', label: 'Villas', icon: '🏡', filter: { propertyType: 'villa' } },
  { id: 'apartment', label: 'Apartments', icon: '🏢', filter: { propertyType: 'apartment' } },
  { id: 'key-ready', label: 'Key Ready', icon: '🔑', filter: { status: 'key-ready' as const } },
  { id: 'family', label: 'Family Homes', icon: '👨‍👩‍👧‍👦', filter: { minBedrooms: 3 } },
];

// Area suggestions
const areaSuggestions: SearchSuggestion[] = [
  { type: 'area', label: 'Algorfa / La Finca Golf', value: 'algorfa', icon: '⛳', description: 'Golf lifestyle, inland value' },
  { type: 'area', label: 'Orihuela Costa', value: 'orihuela-costa', icon: '🏖️', description: 'Beaches, amenities, expat hub' },
  { type: 'area', label: 'Torrevieja', value: 'torrevieja', icon: '🌊', description: 'Urban beach living' },
  { type: 'area', label: 'Guardamar del Segura', value: 'guardamar-del-segura', icon: '🌲', description: 'Dune beaches, nature' },
  { type: 'area', label: 'La Zenia', value: 'la-zenia', icon: '🛍️', description: 'Shopping, beaches, nightlife' },
  { type: 'area', label: 'Villamartín', value: 'villamartin', icon: '⛳', description: 'Golf, established community' },
  { type: 'area', label: 'Campoamor', value: 'campoamor', icon: '🏖️', description: 'Upmarket beach area' },
  { type: 'area', label: 'Los Alcázares', value: 'los-alcazares', icon: '🏄', description: 'Mar Menor, watersports' },
];

// Lifestyle suggestions
const lifestyleSuggestions: SearchSuggestion[] = LIFESTYLE_TAGS.map(tag => ({
  type: 'lifestyle' as const,
  label: tag.name,
  value: tag.id,
  icon: tag.icon,
  description: tag.description,
}));

// Property type suggestions
const propertyTypeSuggestions: SearchSuggestion[] = PROPERTY_TYPE_TAGS.map(tag => ({
  type: 'property-type' as const,
  label: tag.name,
  value: tag.id,
  icon: tag.icon,
}));

// Price suggestions
const priceSuggestions: SearchSuggestion[] = PRICE_BRACKETS.map(bracket => ({
  type: 'price' as const,
  label: bracket.name,
  value: bracket.id,
  icon: '💶',
  description: bracket.description,
}));

// ==========================================
// NATURAL LANGUAGE PARSER
// ==========================================

function parseNaturalLanguage(query: string): Partial<SearchFilters> {
  const filters: Partial<SearchFilters> = {};
  const lowerQuery = query.toLowerCase();

  // Property types
  if (lowerQuery.includes('villa')) filters.propertyType = 'villa';
  else if (lowerQuery.includes('apartment') || lowerQuery.includes('flat')) filters.propertyType = 'apartment';
  else if (lowerQuery.includes('townhouse')) filters.propertyType = 'townhouse';
  else if (lowerQuery.includes('penthouse')) filters.propertyType = 'penthouse';
  else if (lowerQuery.includes('bungalow')) filters.propertyType = 'bungalow';

  // Bedrooms
  const bedroomMatch = lowerQuery.match(/(\d+)\s*(?:bed|bedroom|br)/);
  if (bedroomMatch) filters.minBedrooms = parseInt(bedroomMatch[1]);

  // Price parsing
  const pricePatterns = [
    /under\s*€?\s*(\d+)k/i,
    /below\s*€?\s*(\d+)k/i,
    /max\s*€?\s*(\d+)k/i,
    /€?\s*(\d+)k\s*(?:max|or less)/i,
  ];
  for (const pattern of pricePatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      filters.maxPrice = parseInt(match[1]) * 1000;
      break;
    }
  }

  const minPricePatterns = [
    /over\s*€?\s*(\d+)k/i,
    /above\s*€?\s*(\d+)k/i,
    /min\s*€?\s*(\d+)k/i,
    /€?\s*(\d+)k\s*(?:min|\+|plus)/i,
  ];
  for (const pattern of minPricePatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      filters.minPrice = parseInt(match[1]) * 1000;
      break;
    }
  }

  // Price range
  const rangeMatch = lowerQuery.match(/€?\s*(\d+)k?\s*[-–to]+\s*€?\s*(\d+)k/i);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1]);
    const max = parseInt(rangeMatch[2]);
    filters.minPrice = min < 1000 ? min * 1000 : min;
    filters.maxPrice = max < 1000 ? max * 1000 : max;
  }

  // Location features
  if (lowerQuery.includes('beach') || lowerQuery.includes('sea') || lowerQuery.includes('coast')) {
    filters.nearBeach = true;
  }
  if (lowerQuery.includes('golf')) {
    filters.nearGolf = true;
  }

  // Status
  if (lowerQuery.includes('key ready') || lowerQuery.includes('move in') || lowerQuery.includes('completed')) {
    filters.status = 'key-ready';
  } else if (lowerQuery.includes('off plan') || lowerQuery.includes('off-plan') || lowerQuery.includes('new build')) {
    filters.status = 'off-plan';
  }

  // Areas
  for (const area of areaSuggestions) {
    if (lowerQuery.includes(area.label.toLowerCase()) || lowerQuery.includes(area.value.replace('-', ' '))) {
      filters.area = area.value;
      break;
    }
  }

  return filters;
}

// ==========================================
// BUILD SEARCH URL
// ==========================================

function buildSearchUrl(filters: Partial<SearchFilters>): string {
  const params = new URLSearchParams();

  if (filters.query) params.set('q', filters.query);
  if (filters.propertyType) params.set('type', filters.propertyType);
  if (filters.minBedrooms) params.set('beds', filters.minBedrooms.toString());
  if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
  if (filters.nearBeach) params.set('beach', 'true');
  if (filters.nearGolf) params.set('golf', 'true');
  if (filters.status && filters.status !== 'any') params.set('status', filters.status);
  if (filters.area) params.set('area', filters.area);
  if (filters.lifestyle?.length) params.set('lifestyle', filters.lifestyle.join(','));

  const queryString = params.toString();
  return queryString ? `/properties?${queryString}` : '/properties';
}

// ==========================================
// COMPONENT
// ==========================================

interface SmartSearchProps {
  variant?: 'hero' | 'navbar' | 'page';
  placeholder?: string;
  showQuickFilters?: boolean;
  autoFocus?: boolean;
  onSearch?: (filters: Partial<SearchFilters>) => void;
}

export default function SmartSearch({
  variant = 'hero',
  placeholder = 'Search properties... try "3 bed villa near beach under 400k"',
  showQuickFilters = true,
  autoFocus = false,
  onSearch,
}: SmartSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Generate suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results: SearchSuggestion[] = [];

    // Search areas
    areaSuggestions.forEach(s => {
      if (s.label.toLowerCase().includes(lowerQuery) || s.value.includes(lowerQuery)) {
        results.push(s);
      }
    });

    // Search lifestyles
    lifestyleSuggestions.forEach(s => {
      if (s.label.toLowerCase().includes(lowerQuery)) {
        results.push(s);
      }
    });

    // Search property types
    propertyTypeSuggestions.forEach(s => {
      if (s.label.toLowerCase().includes(lowerQuery)) {
        results.push(s);
      }
    });

    // Search prices
    if (lowerQuery.includes('budget') || lowerQuery.includes('cheap') || lowerQuery.includes('affordable')) {
      results.push(...priceSuggestions.filter(s => s.value === 'budget' || s.value === 'affordable'));
    }
    if (lowerQuery.includes('luxury') || lowerQuery.includes('premium') || lowerQuery.includes('high end')) {
      results.push(...priceSuggestions.filter(s => s.value === 'luxury' || s.value === 'ultra-luxury'));
    }

    setSuggestions(results.slice(0, 8));
    setSelectedIndex(-1);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, [suggestions, selectedIndex]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const filters: Partial<SearchFilters> = { query };

    switch (suggestion.type) {
      case 'area':
        filters.area = suggestion.value;
        break;
      case 'lifestyle':
        filters.lifestyle = [suggestion.value];
        break;
      case 'property-type':
        filters.propertyType = suggestion.value;
        break;
      case 'price':
        const bracket = PRICE_BRACKETS.find(b => b.id === suggestion.value);
        if (bracket) {
          filters.minPrice = bracket.min;
          filters.maxPrice = bracket.max === Infinity ? undefined : bracket.max;
        }
        break;
    }

    if (onSearch) {
      onSearch(filters);
    } else {
      router.push(buildSearchUrl(filters));
    }
    setIsOpen(false);
  };

  // Handle search
  const handleSearch = () => {
    const parsedFilters = parseNaturalLanguage(query);
    const filters: Partial<SearchFilters> = {
      query,
      ...parsedFilters,
    };

    // Add active quick filters
    activeFilters.forEach(filterId => {
      const quickFilter = quickFilters.find(f => f.id === filterId);
      if (quickFilter) {
        Object.assign(filters, quickFilter.filter);
      }
    });

    if (onSearch) {
      onSearch(filters);
    } else {
      router.push(buildSearchUrl(filters));
    }
    setIsOpen(false);
  };

  // Toggle quick filter
  const toggleQuickFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  // Variant styles
  const containerStyles = {
    hero: 'max-w-3xl mx-auto',
    navbar: 'max-w-md',
    page: 'max-w-2xl',
  };

  const inputStyles = {
    hero: 'text-lg py-4 px-6',
    navbar: 'text-sm py-2 px-4',
    page: 'text-base py-3 px-5',
  };

  return (
    <div className={containerStyles[variant]} ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-400 text-xl">
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`
              w-full bg-white border-2 border-warm-200 rounded-2xl
              ${inputStyles[variant]}
              pl-12 pr-24
              focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/20
              transition-all shadow-lg
            `}
          />
          <button
            onClick={handleSearch}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2
              bg-accent-500 hover:bg-accent-600 text-white font-semibold
              ${variant === 'hero' ? 'px-6 py-2' : 'px-4 py-1.5'}
              rounded-xl transition-colors
            `}
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-warm-200 rounded-xl shadow-xl overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.value}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`
                  w-full px-4 py-3 text-left flex items-center gap-3
                  hover:bg-warm-50 transition-colors
                  ${index === selectedIndex ? 'bg-warm-50' : ''}
                `}
              >
                <span className="text-xl">{suggestion.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-primary-900">{suggestion.label}</p>
                  {suggestion.description && (
                    <p className="text-sm text-warm-500">{suggestion.description}</p>
                  )}
                </div>
                <span className="text-xs text-warm-400 capitalize">{suggestion.type.replace('-', ' ')}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Filters */}
      {showQuickFilters && variant === 'hero' && (
        <div className="mt-4">
          <div className="flex flex-wrap justify-center gap-2">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleQuickFilter(filter.id)}
                className={`
                  inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                  transition-all
                  ${activeFilters.includes(filter.id)
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-warm-700 hover:text-primary-900 shadow-sm'
                  }
                `}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Active Filters Summary */}
          {activeFilters.length > 0 && (
            <div className="mt-3 text-center">
              <button
                onClick={handleSearch}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
                Search with {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Popular Searches (for hero variant) */}
      {variant === 'hero' && !query && (
        <div className="mt-6 text-center">
          <p className="text-warm-500 text-sm mb-2">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Golf villas La Finca',
              'Beach apartments Torrevieja',
              'Family homes under €300k',
              'Luxury villas with pool',
            ].map((search) => (
              <button
                key={search}
                onClick={() => {
                  setQuery(search);
                  setTimeout(handleSearch, 100);
                }}
                className="text-accent-600 hover:text-accent-700 text-sm hover:underline"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
