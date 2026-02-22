/**
 * SEO Keyword & Question Database
 * ================================
 * Compiled from Google Search Console data and People Also Ask research.
 * Used by content generation scripts to ensure AI-generated content
 * targets real search queries.
 *
 * Last updated: 2026-02-22
 */

export interface SEOQuestion {
  question: string;
  category: string;
  language: string; // 'en', 'sv', 'nl', 'no', 'de', 'fr', 'pl', 'ru'
  searchIntent: 'informational' | 'transactional' | 'navigational' | 'commercial';
  priority: 'high' | 'medium' | 'low';
  relatedTowns?: string[]; // towns this question is relevant to
}

export interface GSCQuery {
  query: string;
  impressions: number;
  clicks: number;
  language: string;
  category: string;
}

export interface KeywordCluster {
  topic: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  questions: string[];
  contentSuggestion: string; // what content to create
  priority: 'high' | 'medium' | 'low';
  targetAudience: string;
  relatedTowns?: string[];
}

// ============================================================================
// GOOGLE SEARCH CONSOLE QUERIES - Real search traffic data
// ============================================================================

export const gscQueries: GSCQuery[] = [
  // Page 1 - Top performing queries
  {
    query: "nieuwbouw appartement costa blanca",
    impressions: 60,
    clicks: 1,
    language: "nl",
    category: "property-types"
  },
  {
    query: "best restaurants in torrevieja",
    impressions: 4,
    clicks: 1,
    language: "en",
    category: "lifestyle"
  },
  {
    query: "hypotheek spanje ing",
    impressions: 1,
    clicks: 1,
    language: "nl",
    category: "mortgages"
  },
  {
    query: "nieuwbouw costa blanca",
    impressions: 191,
    clicks: 0,
    language: "nl",
    category: "general-search"
  },
  {
    query: "new build moraira",
    impressions: 105,
    clicks: 0,
    language: "en",
    category: "locations-south"
  },
  {
    query: "nieuwbouw javea",
    impressions: 94,
    clicks: 0,
    language: "nl",
    category: "locations-south"
  },
  {
    query: "new construction costa blanca",
    impressions: 51,
    clicks: 0,
    language: "en",
    category: "general-search"
  },
  {
    query: "new apartment in costa blanca",
    impressions: 44,
    clicks: 0,
    language: "en",
    category: "property-types"
  },
  {
    query: "new build in costa blanca",
    impressions: 43,
    clicks: 0,
    language: "en",
    category: "general-search"
  },
  {
    query: "key ready property in costa blanca",
    impressions: 40,
    clicks: 0,
    language: "en",
    category: "property-types"
  },

  // Page 2
  {
    query: "köpa bostad i spanien",
    impressions: 40,
    clicks: 0,
    language: "sv",
    category: "buying-process"
  },
  {
    query: "nieuwbouw villa costa blanca zuid",
    impressions: 38,
    clicks: 0,
    language: "nl",
    category: "locations-south"
  },
  {
    query: "nieuwbouw costa blanca noord",
    impressions: 38,
    clicks: 0,
    language: "nl",
    category: "locations-north"
  },
  {
    query: "new build properties for sale costa blanca",
    impressions: 37,
    clicks: 0,
    language: "en",
    category: "general-search"
  },
  {
    query: "nieuwbouw villa costa blanca noord",
    impressions: 36,
    clicks: 0,
    language: "nl",
    category: "locations-north"
  },
  {
    query: "nieuwbouw spanje",
    impressions: 36,
    clicks: 0,
    language: "nl",
    category: "general-search"
  },
  {
    query: "köpa lägenhet i spanien kostnader",
    impressions: 35,
    clicks: 0,
    language: "sv",
    category: "costs-taxes"
  },
  {
    query: "köpa lägenhet spanien",
    impressions: 34,
    clicks: 0,
    language: "sv",
    category: "buying-process"
  },
  {
    query: "nieuwbouw costa blanca zuid",
    impressions: 32,
    clicks: 0,
    language: "nl",
    category: "locations-south"
  },
  {
    query: "spain mortgage rates february 2026",
    impressions: 26,
    clicks: 0,
    language: "en",
    category: "mortgages"
  },

  // Page 3
  {
    query: "köpa lägenhet i spanien",
    impressions: 26,
    clicks: 0,
    language: "sv",
    category: "buying-process"
  },
  {
    query: "nieuwbouw in spanje",
    impressions: 26,
    clicks: 0,
    language: "nl",
    category: "general-search"
  },
  {
    query: "nieuwbouw la zenia",
    impressions: 25,
    clicks: 0,
    language: "nl",
    category: "locations-south"
  },
  {
    query: "average mortgage interest rate spain february 2026",
    impressions: 24,
    clicks: 0,
    language: "en",
    category: "mortgages"
  },
  {
    query: "boliglån spania",
    impressions: 24,
    clicks: 0,
    language: "no",
    category: "mortgages"
  },
  {
    query: "current mortgage interest rates spain february 2026",
    impressions: 23,
    clicks: 0,
    language: "en",
    category: "mortgages"
  },
  {
    query: "nieuwbouw orihuela costa",
    impressions: 23,
    clicks: 0,
    language: "nl",
    category: "locations-south"
  },
  {
    query: "erfbelasting spanje",
    impressions: 21,
    clicks: 0,
    language: "nl",
    category: "costs-taxes"
  },
  {
    query: "current mortgage interest rates spain 2026",
    impressions: 20,
    clicks: 0,
    language: "en",
    category: "mortgages"
  },
  {
    query: "bostad spanien",
    impressions: 20,
    clicks: 0,
    language: "sv",
    category: "general-search"
  },

  // Page 4
  {
    query: "valencia town center lease expirations 2026",
    impressions: 18,
    clicks: 0,
    language: "en",
    category: "investment-rental"
  },
  {
    query: "nieuwbouw villajoyosa",
    impressions: 18,
    clicks: 0,
    language: "nl",
    category: "locations-south"
  },
  {
    query: "boliglån i spania",
    impressions: 17,
    clicks: 0,
    language: "no",
    category: "mortgages"
  },
  {
    query: "current mortgage rates spain february 2026",
    impressions: 16,
    clicks: 0,
    language: "en",
    category: "mortgages"
  },
  {
    query: "luksusowe domy costa blanca",
    impressions: 16,
    clicks: 0,
    language: "pl",
    category: "property-types"
  },
  {
    query: "nieuwbouw spanje costa blanca",
    impressions: 16,
    clicks: 0,
    language: "nl",
    category: "general-search"
  },
  {
    query: "what is the process for buying a property in javea",
    impressions: 15,
    clicks: 0,
    language: "en",
    category: "buying-process"
  },
  {
    query: "wonen in javea",
    impressions: 15,
    clicks: 0,
    language: "nl",
    category: "lifestyle"
  },
  {
    query: "nieuwbouw kopen costa blanca",
    impressions: 15,
    clicks: 0,
    language: "nl",
    category: "buying-process"
  },
  {
    query: "köpa bostad spanien",
    impressions: 15,
    clicks: 0,
    language: "sv",
    category: "buying-process"
  }
];

// ============================================================================
// PEOPLE ALSO ASK (PAA) RESEARCH DATABASE
// ============================================================================

export const paaQuestions: SEOQuestion[] = [
  // BUYING PROCESS - English
  {
    question: "How do I buy a property in Spain?",
    category: "buying-process",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the process for buying a house in Spain?",
    category: "buying-process",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Can foreigners buy property in Spain?",
    category: "buying-process",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What documents do I need to buy a property in Spain?",
    category: "buying-process",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "How long does it take to buy a property in Spain?",
    category: "buying-process",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What is a notary in Spain and do I need one?",
    category: "legal-documentation",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "How do I find a property in Costa Blanca?",
    category: "buying-process",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What is key-ready property in Spain?",
    category: "property-types",
    language: "en",
    searchIntent: "informational",
    priority: "medium",
    relatedTowns: ["Costa Blanca", "Javea", "Moraira"]
  },

  // BUYING PROCESS - Dutch
  {
    question: "Hoe koop ik een huis in Spanje?",
    category: "buying-process",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Wat is het proces voor het kopen van een eigendom in Spanje?",
    category: "buying-process",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Kunnen buitenlanders onroerend goed in Spanje kopen?",
    category: "buying-process",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Welke documenten heb ik nodig om een woning in Spanje te kopen?",
    category: "buying-process",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hoe lang duurt het om een eigendom in Spanje te kopen?",
    category: "buying-process",
    language: "nl",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Waar kan ik in Costa Blanca wonen?",
    category: "lifestyle",
    language: "nl",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Wat zijn de voordelen van nieuwbouw in Costa Blanca?",
    category: "property-types",
    language: "nl",
    searchIntent: "informational",
    priority: "medium"
  },

  // BUYING PROCESS - Swedish
  {
    question: "Hur köper jag en fastighet i Spanien?",
    category: "buying-process",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Vilken är processen för att köpa en bostad i Spanien?",
    category: "buying-process",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Kan utlänningar köpa fastigheter i Spanien?",
    category: "buying-process",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Vilka dokument behöver jag för att köpa en fastighet i Spanien?",
    category: "buying-process",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },

  // BUYING PROCESS - Norwegian
  {
    question: "Hvordan kjøper jeg en eiendom i Spania?",
    category: "buying-process",
    language: "no",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hva er prosessen for å kjøpe en eiendom i Spania?",
    category: "buying-process",
    language: "no",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Kan utlendinger kjøpe eiendom i Spania?",
    category: "buying-process",
    language: "no",
    searchIntent: "informational",
    priority: "high"
  },

  // COSTS & TAXES - English
  {
    question: "What are the costs of buying a property in Spain?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "How much are property taxes in Spain?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is transfer tax in Spain (ITP)?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What are the hidden costs of buying property in Spain?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "How much is the notary fee in Spain?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What is the annual property tax in Costa Blanca?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Do I have to pay VAT when buying new construction in Spain?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Are there stamp duties in Spain for property purchases?",
    category: "costs-taxes",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // COSTS & TAXES - Dutch
  {
    question: "Wat zijn de kosten voor het kopen van een woning in Spanje?",
    category: "costs-taxes",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hoeveel zijn de onroerende zaakbelastingen in Spanje?",
    category: "costs-taxes",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Wat is de overdrachtsbelasting in Spanje?",
    category: "costs-taxes",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Welke verborgen kosten zijn er bij het kopen van onroerend goed in Spanje?",
    category: "costs-taxes",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hoeveel is het notariskosten in Spanje?",
    category: "costs-taxes",
    language: "nl",
    searchIntent: "informational",
    priority: "medium"
  },

  // COSTS & TAXES - Swedish
  {
    question: "Vilka är kostnaderna för att köpa en fastighet i Spanien?",
    category: "costs-taxes",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hur mycket är fastighetsskatten i Spanien?",
    category: "costs-taxes",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Vad kostar det att köpa lägenhet i Spanien?",
    category: "costs-taxes",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Vilka avgifter måste jag betala när jag köper bostad i Spanien?",
    category: "costs-taxes",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },

  // MORTGAGES - English
  {
    question: "Can I get a mortgage in Spain as a foreigner?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What are the current mortgage rates in Spain?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "How much can I borrow for a mortgage in Spain?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What are the requirements for getting a mortgage in Spain?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the average mortgage interest rate in Spain?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Are there government programs for foreign buyers in Spain?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What is a mortgage broker in Spain?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "How long are mortgages in Spain?",
    category: "mortgages",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // MORTGAGES - Dutch
  {
    question: "Kan ik een hypotheek krijgen in Spanje als buitenlander?",
    category: "mortgages",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Wat zijn de huidige hypotheekrentes in Spanje?",
    category: "mortgages",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hoeveel kan ik lenen voor een hypotheek in Spanje?",
    category: "mortgages",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Wat zijn de vereisten voor een hypotheek in Spanje?",
    category: "mortgages",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Biedt ING hypotheken in Spanje aan?",
    category: "mortgages",
    language: "nl",
    searchIntent: "transactional",
    priority: "medium"
  },

  // MORTGAGES - Swedish
  {
    question: "Kan jag få ett bolån i Spanien som utlänning?",
    category: "mortgages",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Vilka är de aktuella bolåneräntorna i Spanien?",
    category: "mortgages",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hur mycket kan jag låna för ett bolån i Spanien?",
    category: "mortgages",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Vad är kraven för ett bolån i Spanien?",
    category: "mortgages",
    language: "sv",
    searchIntent: "informational",
    priority: "high"
  },

  // MORTGAGES - Norwegian
  {
    question: "Kan jeg få boliglån i Spania som utlending?",
    category: "mortgages",
    language: "no",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hva er gjeldende boliglånerenter i Spania?",
    category: "mortgages",
    language: "no",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hvor mye kan jeg låne for et boliglån i Spania?",
    category: "mortgages",
    language: "no",
    searchIntent: "informational",
    priority: "high"
  },

  // INVESTMENT & RENTAL - English
  {
    question: "Is buying property in Spain a good investment?",
    category: "investment-rental",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the rental yield in Costa Blanca?",
    category: "investment-rental",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Can I rent out my property in Spain?",
    category: "investment-rental",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What are the rental laws in Spain?",
    category: "investment-rental",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "How much can I earn by renting a property in Costa Blanca?",
    category: "investment-rental",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What is the short-term rental market in Costa Blanca?",
    category: "investment-rental",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What are lease expirations in Valencia town center?",
    category: "investment-rental",
    language: "en",
    searchIntent: "informational",
    priority: "low"
  },

  // RESIDENCY & VISA - English
  {
    question: "How do I get residency in Spain?",
    category: "residency-visa",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the Beckham Law in Spain?",
    category: "beckham-law",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the Golden Visa program in Spain?",
    category: "residency-visa",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Do I need a visa to live in Spain?",
    category: "residency-visa",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What are the requirements for Spanish residency?",
    category: "residency-visa",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "How does the Beckham Law tax break work?",
    category: "beckham-law",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // RESIDENCY & VISA - Dutch
  {
    question: "Hoe krijg ik ingezetenschap in Spanje?",
    category: "residency-visa",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Wat is de Beckham-wet in Spanje?",
    category: "beckham-law",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },

  // HEALTHCARE & LIFESTYLE - English
  {
    question: "What is the healthcare system like in Spain?",
    category: "healthcare-lifestyle",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the cost of living in Costa Blanca?",
    category: "healthcare-lifestyle",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the weather like in Costa Blanca?",
    category: "weather-climate",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What restaurants are in Torrevieja?",
    category: "healthcare-lifestyle",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Is Spain safe for expats?",
    category: "safety-security",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the expat community like in Costa Blanca?",
    category: "healthcare-lifestyle",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // HEALTHCARE & LIFESTYLE - Dutch
  {
    question: "Hoe is het gezondheidssysteem in Spanje?",
    category: "healthcare-lifestyle",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Wat zijn de levensonkosten in Costa Blanca?",
    category: "healthcare-lifestyle",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hoe is het weer in Costa Blanca?",
    category: "weather-climate",
    language: "nl",
    searchIntent: "informational",
    priority: "medium"
  },

  // LOCATIONS - NORTH - English
  {
    question: "What is Javea like?",
    category: "locations-north",
    language: "en",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Javea", "Xábia"]
  },
  {
    question: "Is Javea a good place to live?",
    category: "locations-north",
    language: "en",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Javea"]
  },
  {
    question: "What is the property market like in Javea?",
    category: "locations-north",
    language: "en",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Javea"]
  },
  {
    question: "What new builds are available in Javea?",
    category: "locations-north",
    language: "en",
    searchIntent: "informational",
    priority: "medium",
    relatedTowns: ["Javea"]
  },
  {
    question: "What is Moraira like?",
    category: "locations-north",
    language: "en",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Moraira"]
  },
  {
    question: "What is the property market in Moraira?",
    category: "locations-north",
    language: "en",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Moraira"]
  },

  // LOCATIONS - SOUTH - English
  {
    question: "What is Torrevieja like?",
    category: "locations-south",
    language: "en",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Torrevieja"]
  },
  {
    question: "What is Orihuela Costa like?",
    category: "locations-south",
    language: "en",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Orihuela Costa"]
  },
  {
    question: "What new builds are available in Orihuela Costa?",
    category: "locations-south",
    language: "en",
    searchIntent: "informational",
    priority: "medium",
    relatedTowns: ["Orihuela Costa"]
  },
  {
    question: "What is La Zenia like?",
    category: "locations-south",
    language: "en",
    searchIntent: "informational",
    priority: "medium",
    relatedTowns: ["La Zenia"]
  },
  {
    question: "What is Villajoyosa like?",
    category: "locations-south",
    language: "en",
    searchIntent: "informational",
    priority: "medium",
    relatedTowns: ["Villajoyosa"]
  },

  // LOCATIONS - NORTH - Dutch
  {
    question: "Hoe is het in Javea?",
    category: "locations-north",
    language: "nl",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Javea"]
  },
  {
    question: "Is Javea een goede plaats om te wonen?",
    category: "locations-north",
    language: "nl",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Javea"]
  },
  {
    question: "Hoe is het in Moraira?",
    category: "locations-north",
    language: "nl",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Moraira"]
  },

  // LOCATIONS - SOUTH - Dutch
  {
    question: "Hoe is het in Torrevieja?",
    category: "locations-south",
    language: "nl",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Torrevieja"]
  },
  {
    question: "Hoe is het in Orihuela Costa?",
    category: "locations-south",
    language: "nl",
    searchIntent: "informational",
    priority: "high",
    relatedTowns: ["Orihuela Costa"]
  },
  {
    question: "Hoe is het in Villajoyosa?",
    category: "locations-south",
    language: "nl",
    searchIntent: "informational",
    priority: "medium",
    relatedTowns: ["Villajoyosa"]
  },

  // PROPERTY TYPES - English
  {
    question: "What is a villa in Spain?",
    category: "property-types",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What is the difference between a villa and an apartment?",
    category: "property-types",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What is new construction in Spain?",
    category: "property-types",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What are luxury homes in Costa Blanca?",
    category: "property-types",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // PROPERTY TYPES - Polish
  {
    question: "Jakie są luksusowe domy w Costa Blanca?",
    category: "property-types",
    language: "pl",
    searchIntent: "informational",
    priority: "medium"
  },

  // CONSTRUCTION QUALITY - English
  {
    question: "What is the quality of new construction in Spain?",
    category: "construction-quality",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Are there building defects in Spanish new builds?",
    category: "construction-quality",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What building standards exist in Spain?",
    category: "construction-quality",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "What warranties come with new construction in Spain?",
    category: "construction-quality",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // INHERITANCE - English
  {
    question: "What is inheritance tax in Spain?",
    category: "inheritance",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "How much is inheritance tax in Spain?",
    category: "inheritance",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Can I leave my property to my children in Spain?",
    category: "inheritance",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // INHERITANCE - Dutch
  {
    question: "Wat is erfbelasting in Spanje?",
    category: "inheritance",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Hoeveel is erfbelasting in Spanje?",
    category: "inheritance",
    language: "nl",
    searchIntent: "informational",
    priority: "high"
  },

  // LEGAL & DOCUMENTATION - English
  {
    question: "What legal documents do I need for buying property in Spain?",
    category: "legal-documentation",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is a property deed in Spain (escritura)?",
    category: "legal-documentation",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Do I need a lawyer to buy property in Spain?",
    category: "legal-documentation",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "What is the Registry of Properties in Spain?",
    category: "legal-documentation",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // COSTA BLANCA VS ALTERNATIVES - English
  {
    question: "Is Costa Blanca better than other regions in Spain?",
    category: "costa-blanca-vs-alternatives",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Why choose Costa Blanca for property investment?",
    category: "costa-blanca-vs-alternatives",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // SCHOOLS & EDUCATION - English
  {
    question: "What are the schools like in Costa Blanca?",
    category: "schools-education",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "Are there international schools in Costa Blanca?",
    category: "schools-education",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // WEATHER & CLIMATE - English
  {
    question: "What is the climate in Costa Blanca?",
    category: "weather-climate",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },
  {
    question: "How many sunny days are there in Costa Blanca?",
    category: "weather-climate",
    language: "en",
    searchIntent: "informational",
    priority: "medium"
  },

  // SAFETY & SECURITY - English
  {
    question: "What is the crime rate in Costa Blanca?",
    category: "safety-security",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
  {
    question: "Is it safe to own property in Costa Blanca?",
    category: "safety-security",
    language: "en",
    searchIntent: "informational",
    priority: "high"
  },
];

// ============================================================================
// KEYWORD CLUSTERS - Actionable content strategy
// ============================================================================

export const keywordClusters: KeywordCluster[] = [
  {
    topic: "Complete Buying Guide for Spanish Properties",
    primaryKeyword: "how to buy property in Spain",
    relatedKeywords: [
      "buying process Spain",
      "property buying steps",
      "foreigners buying Spain",
      "buying house Spain checklist"
    ],
    questions: [
      "How do I buy a property in Spain?",
      "What is the process for buying a house in Spain?",
      "Can foreigners buy property in Spain?",
      "What documents do I need to buy a property in Spain?",
      "How long does it take to buy a property in Spain?"
    ],
    contentSuggestion:
      "Create comprehensive step-by-step buying guide covering the entire process from viewings to closing. Include timelines, required documents, and professional roles (notary, lawyer, realtor).",
    priority: "high",
    targetAudience: "International buyers new to Spanish property market"
  },

  {
    topic: "Costs & Financial Planning for Spanish Property Purchase",
    primaryKeyword: "costs of buying property in Spain",
    relatedKeywords: [
      "Spain property taxes",
      "transfer tax Spain",
      "notary fees Spain",
      "hidden costs Spain",
      "ITP Spain"
    ],
    questions: [
      "What are the costs of buying a property in Spain?",
      "How much are property taxes in Spain?",
      "What is transfer tax in Spain (ITP)?",
      "What are the hidden costs of buying property in Spain?",
      "How much is the notary fee in Spain?"
    ],
    contentSuggestion:
      "Create detailed cost breakdown page with actual fee percentages, tax calculations, and examples. Include comparison of new vs resale property costs. Add calculator tool.",
    priority: "high",
    targetAudience: "Buyers wanting to understand total investment cost"
  },

  {
    topic: "Mortgage & Financing Options for Foreigners",
    primaryKeyword: "mortgage Spain foreigners",
    relatedKeywords: [
      "Spain mortgage rates",
      "foreign buyer mortgage",
      "mortgage requirements Spain",
      "borrowing limits Spain",
      "Spanish banks mortgages"
    ],
    questions: [
      "Can I get a mortgage in Spain as a foreigner?",
      "What are the current mortgage rates in Spain?",
      "How much can I borrow for a mortgage in Spain?",
      "What are the requirements for getting a mortgage in Spain?",
      "What is the average mortgage interest rate in Spain?"
    ],
    contentSuggestion:
      "Create guides on mortgage options, requirements, and current rates with comparisons to home country. Include explanation of Spanish banking system and loan approval process.",
    priority: "high",
    targetAudience: "Buyers needing financing information"
  },

  {
    topic: "Investment & Rental Income Potential",
    primaryKeyword: "property investment Costa Blanca",
    relatedKeywords: [
      "rental yield Costa Blanca",
      "Airbnb Spain",
      "rental income Spain",
      "tourist rental laws Spain",
      "investment returns Costa Blanca"
    ],
    questions: [
      "Is buying property in Spain a good investment?",
      "What is the rental yield in Costa Blanca?",
      "Can I rent out my property in Spain?",
      "What are the rental laws in Spain?",
      "How much can I earn by renting a property in Costa Blanca?"
    ],
    contentSuggestion:
      "Create investment analysis pages with ROI calculations, rental market analysis, and regulatory requirements. Include case studies of successful rental properties.",
    priority: "high",
    targetAudience: "Investment property buyers and existing homeowners"
  },

  {
    topic: "Javea - North Costa Blanca Destination Guide",
    primaryKeyword: "new build Javea",
    relatedKeywords: [
      "Javea property market",
      "living in Javea",
      "Javea new construction",
      "Javea lifestyle",
      "Javea beaches"
    ],
    questions: [
      "What is Javea like?",
      "Is Javea a good place to live?",
      "What is the property market like in Javea?",
      "What new builds are available in Javea?",
      "Hoe is het in Javea?"
    ],
    contentSuggestion:
      "Create comprehensive destination guide for Javea covering lifestyle, property market, amenities, and new construction projects. Include property listings and investment potential.",
    priority: "high",
    targetAudience: "Buyers interested in northern Costa Blanca",
    relatedTowns: ["Javea", "Moraira"]
  },

  {
    topic: "Moraira - Exclusive Coastal Living",
    primaryKeyword: "property Moraira",
    relatedKeywords: [
      "Moraira new builds",
      "Moraira lifestyle",
      "Moraira investment",
      "luxury homes Moraira",
      "Moraira market"
    ],
    questions: [
      "What is Moraira like?",
      "What is the property market in Moraira?",
      "What new builds are available in Moraira?"
    ],
    contentSuggestion:
      "Create luxury living guide for Moraira as exclusive destination. Highlight upscale properties, amenities, and investment potential for high-end buyers.",
    priority: "high",
    targetAudience: "Luxury property buyers"
  },

  {
    topic: "Torrevieja - Southern Costa Blanca Destination",
    primaryKeyword: "new build Torrevieja",
    relatedKeywords: [
      "Torrevieja property",
      "living in Torrevieja",
      "restaurants Torrevieja",
      "Torrevieja lifestyle",
      "Torrevieja investment"
    ],
    questions: [
      "What is Torrevieja like?",
      "What restaurants are in Torrevieja?",
      "Best restaurants in Torrevieja"
    ],
    contentSuggestion:
      "Create lifestyle and property guide for Torrevieja covering local amenities, dining scene, expat community, and new construction projects.",
    priority: "medium",
    targetAudience: "Buyers interested in southern Costa Blanca"
  },

  {
    topic: "Orihuela Costa - Development & Investment Hub",
    primaryKeyword: "new build Orihuela Costa",
    relatedKeywords: [
      "Orihuela Costa property",
      "Orihuela Costa new construction",
      "living in Orihuela Costa",
      "investment Orihuela Costa"
    ],
    questions: [
      "What is Orihuela Costa like?",
      "What new builds are available in Orihuela Costa?"
    ],
    contentSuggestion:
      "Create development guide showcasing Orihuela Costa as key investment area with multiple new projects. Include market analysis and ROI potential.",
    priority: "medium",
    targetAudience: "Investment-focused buyers"
  },

  {
    topic: "Residency & Visa Requirements for Spain",
    primaryKeyword: "Spain residency visa",
    relatedKeywords: [
      "golden visa Spain",
      "Spanish residency requirements",
      "expat visa Spain",
      "non-lucrative visa Spain"
    ],
    questions: [
      "How do I get residency in Spain?",
      "Do I need a visa to live in Spain?",
      "What are the requirements for Spanish residency?",
      "What is the Golden Visa program in Spain?"
    ],
    contentSuggestion:
      "Create guide covering different visa types (non-lucrative, golden visa, work visa) with eligibility requirements and application processes.",
    priority: "high",
    targetAudience: "Expats planning to relocate to Spain"
  },

  {
    topic: "Beckham Law - Spanish Tax Advantage",
    primaryKeyword: "Beckham Law Spain",
    relatedKeywords: [
      "Spanish tax incentive",
      "tax advantages Spain",
      "non-resident taxation",
      "expat tax break"
    ],
    questions: [
      "What is the Beckham Law in Spain?",
      "How does the Beckham Law tax break work?"
    ],
    contentSuggestion:
      "Create detailed explanation of Beckham Law tax benefits, eligibility requirements, and how it affects property investment returns.",
    priority: "medium",
    targetAudience: "High-income international buyers"
  },

  {
    topic: "Construction Quality & Building Standards",
    primaryKeyword: "Spanish building standards",
    relatedKeywords: [
      "new build quality Spain",
      "construction defects Spain",
      "building regulations Spain",
      "construction warranties"
    ],
    questions: [
      "What is the quality of new construction in Spain?",
      "Are there building defects in Spanish new builds?",
      "What building standards exist in Spain?",
      "What warranties come with new construction in Spain?"
    ],
    contentSuggestion:
      "Create buyer education content on Spanish building codes, quality standards, warranty systems, and how to inspect new builds.",
    priority: "medium",
    targetAudience: "Buyers concerned about construction quality"
  },

  {
    topic: "Inheritance & Estate Planning",
    primaryKeyword: "inheritance tax Spain",
    relatedKeywords: [
      "Spanish inheritance laws",
      "estate planning Spain",
      "passing property to children",
      "erfbelasting"
    ],
    questions: [
      "What is inheritance tax in Spain?",
      "How much is inheritance tax in Spain?",
      "Can I leave my property to my children in Spain?",
      "Wat is erfbelasting in Spanje?"
    ],
    contentSuggestion:
      "Create guide on inheritance laws, tax implications, and estate planning options for international property owners.",
    priority: "medium",
    targetAudience: "Property owners concerned about succession planning"
  },

  {
    topic: "Legal Documentation & Property Registration",
    primaryKeyword: "Spanish property legal documents",
    relatedKeywords: [
      "escritura property Spain",
      "property deed Spain",
      "registry of properties Spain",
      "notary role Spain"
    ],
    questions: [
      "What legal documents do I need for buying property in Spain?",
      "What is a property deed in Spain (escritura)?",
      "Do I need a lawyer to buy property in Spain?",
      "What is the Registry of Properties in Spain?"
    ],
    contentSuggestion:
      "Create comprehensive guide on all required legal documents, what each means, and roles of notaries and lawyers in the process.",
    priority: "high",
    targetAudience: "First-time buyers unfamiliar with Spanish legal system"
  },

  {
    topic: "Healthcare & Lifestyle for Expats",
    primaryKeyword: "living in Costa Blanca expat",
    relatedKeywords: [
      "healthcare Spain",
      "cost of living Spain",
      "expat community Costa Blanca",
      "lifestyle Spain"
    ],
    questions: [
      "What is the healthcare system like in Spain?",
      "What is the cost of living in Costa Blanca?",
      "What is the expat community like in Costa Blanca?",
      "Is Spain safe for expats?"
    ],
    contentSuggestion:
      "Create lifestyle guides covering healthcare access, monthly budget expectations, social opportunities, and safety for expat families.",
    priority: "medium",
    targetAudience: "Expats considering relocation"
  },

  {
    topic: "Climate & Weather Guide",
    primaryKeyword: "Costa Blanca climate weather",
    relatedKeywords: [
      "Costa Blanca sunshine",
      "Spain weather patterns",
      "seasonal climate Costa Blanca"
    ],
    questions: [
      "What is the climate in Costa Blanca?",
      "How many sunny days are there in Costa Blanca?",
      "What is the weather like in Costa Blanca?",
      "Hoe is het weer in Costa Blanca?"
    ],
    contentSuggestion:
      "Create weather guide with climate data, seasonal variations, and how weather impacts daily life and property maintenance.",
    priority: "low",
    targetAudience: "Buyers considering lifestyle factors"
  },

  {
    topic: "Safety & Security Information",
    primaryKeyword: "safety Costa Blanca",
    relatedKeywords: [
      "crime rates Costa Blanca",
      "security considerations",
      "safe neighborhoods Spain",
      "property security"
    ],
    questions: [
      "Is it safe to own property in Costa Blanca?",
      "What is the crime rate in Costa Blanca?"
    ],
    contentSuggestion:
      "Create safety guide with crime statistics, neighborhood comparisons, and security recommendations for property owners.",
    priority: "high",
    targetAudience: "Concerned buyers and expats"
  },

  {
    topic: "International Buyer Resources",
    primaryKeyword: "buying property in Spain guide",
    relatedKeywords: [
      "international property buyer",
      "expat property purchase",
      "foreign investor guide",
      "relocation to Spain"
    ],
    questions: [
      "What is key-ready property in Spain?",
      "What is new construction in Spain?",
      "Why choose Costa Blanca for property investment?"
    ],
    contentSuggestion:
      "Create comprehensive resource hub for international buyers with checklists, glossaries, FAQ sections, and downloadable guides.",
    priority: "high",
    targetAudience: "All international buyers"
  },

  {
    topic: "Nordic Market Focus (Swedish, Norwegian)",
    primaryKeyword: "köpa lägenhet spanien",
    relatedKeywords: [
      "bostad spanien",
      "bolån spanien",
      "boliglån spania",
      "köpa bostad i spanien"
    ],
    questions: [
      "Hur köper jag en fastighet i Spanien?",
      "Vilka är kostnaderna för att köpa en fastighet i Spanien?",
      "Kan jag få ett bolån i Spanien som utlänning?",
      "Hvordan kjøper jeg en eiendom i Spania?"
    ],
    contentSuggestion:
      "Create localized content for Nordic buyers in Swedish and Norwegian covering taxation differences, mortgage options, and regional preferences.",
    priority: "high",
    targetAudience: "Swedish and Norwegian property buyers"
  },

  {
    topic: "Dutch Market Focus",
    primaryKeyword: "nieuwbouw costa blanca",
    relatedKeywords: [
      "nieuwbouw appartement",
      "nieuwbouw villa",
      "hypotheek spanje",
      "wonen javea"
    ],
    questions: [
      "Hoe koop ik een huis in Spanje?",
      "Wat zijn de kosten voor het kopen van een woning in Spanje?",
      "Kan ik een hypotheek krijgen in Spanje als buitenlander?",
      "Hoe is het in Javea?"
    ],
    contentSuggestion:
      "Create Dutch-language property guides with local market insights, mortgage information from Dutch banks, and lifestyle content.",
    priority: "high",
    targetAudience: "Dutch property buyers"
  },

  {
    topic: "Schools & Education Information",
    primaryKeyword: "international schools Costa Blanca",
    relatedKeywords: [
      "education system Spain",
      "schools Costa Blanca",
      "expat schooling options"
    ],
    questions: [
      "What are the schools like in Costa Blanca?",
      "Are there international schools in Costa Blanca?"
    ],
    contentSuggestion:
      "Create guide on educational options including international schools, Spanish education system, and expat family resources.",
    priority: "medium",
    targetAudience: "Families with children relocating to Spain"
  },

  {
    topic: "Luxury Properties & Premium Living",
    primaryKeyword: "luxury homes Costa Blanca",
    relatedKeywords: [
      "premium properties Spain",
      "high-end real estate",
      "villa market",
      "luksusowe domy"
    ],
    questions: [
      "What are luxury homes in Costa Blanca?",
      "Jakie są luksusowe domy w Costa Blanca?"
    ],
    contentSuggestion:
      "Create luxury segment content showcasing high-end properties, exclusive neighborhoods, and premium amenities available in Costa Blanca.",
    priority: "medium",
    targetAudience: "High-net-worth international buyers"
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getQuestionsByCategory(category: string): SEOQuestion[] {
  return paaQuestions.filter((q) => q.category === category);
}

export function getQuestionsByLanguage(language: string): SEOQuestion[] {
  return paaQuestions.filter((q) => q.language === language);
}

export function getHighPriorityQuestions(): SEOQuestion[] {
  return paaQuestions.filter((q) => q.priority === "high");
}

export function getQueriesByLanguage(language: string): GSCQuery[] {
  return gscQueries.filter((q) => q.language === language);
}

export function getTopPerformingQueries(limit: number = 10): GSCQuery[] {
  return [...gscQueries]
    .sort((a, b) => {
      const aScore = b.impressions + b.clicks * 10;
      const bScore = a.impressions + a.clicks * 10;
      return aScore - bScore;
    })
    .slice(0, limit);
}

export function getClusterByTopic(topic: string): KeywordCluster | undefined {
  return keywordClusters.find((c) => c.topic === topic);
}

export function getAllTowns(): string[] {
  const towns = new Set<string>();
  paaQuestions.forEach((q) => {
    if (q.relatedTowns) {
      q.relatedTowns.forEach((t) => towns.add(t));
    }
  });
  return Array.from(towns).sort();
}

export function getQuestionsForTown(town: string): SEOQuestion[] {
  return paaQuestions.filter(
    (q) => q.relatedTowns && q.relatedTowns.includes(town)
  );
}

/**
 * Get relevant PAA questions for a specific property context.
 * Used by seo-prompts.ts to enrich AI content generation prompts.
 */
export function getQuestionsForPropertyContext(
  town: string,
  buyerPersona: string,
  language: string = "en",
  limit: number = 6
): string[] {
  const townLower = town.toLowerCase();

  // Map buyer personas to relevant question categories
  const personaCategoryMap: Record<string, string[]> = {
    luxury: ["property-types", "investment-rental", "lifestyle", "legal-documentation"],
    golf: ["lifestyle", "healthcare-lifestyle", "property-types", "costs-taxes"],
    retirement: ["healthcare-lifestyle", "residency-visa", "costs-taxes", "safety-security", "lifestyle"],
    family: ["schools-education", "healthcare-lifestyle", "safety-security", "lifestyle", "buying-process"],
    investment: ["investment-rental", "costs-taxes", "mortgages", "beckham-law"],
    holiday: ["buying-process", "costs-taxes", "lifestyle", "weather-climate"],
  };

  const relevantCategories = personaCategoryMap[buyerPersona] || personaCategoryMap["holiday"];

  // First: town-specific questions in the right language
  const townQuestions = paaQuestions.filter(
    (q) =>
      q.language === language &&
      q.relatedTowns?.some((t) => t.toLowerCase().includes(townLower) || townLower.includes(t.toLowerCase()))
  );

  // Second: category-matched questions in the right language
  const categoryQuestions = paaQuestions.filter(
    (q) =>
      q.language === language &&
      relevantCategories.includes(q.category) &&
      !townQuestions.includes(q)
  );

  // Sort by priority
  const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
  const sorted = [
    ...townQuestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
    ...categoryQuestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
  ];

  return sorted.slice(0, limit).map((q) => q.question);
}

/**
 * Get relevant GSC search queries for a given town.
 * Shows what people are ACTUALLY searching for in that area.
 */
export function getRelevantGSCQueries(
  town: string,
  limit: number = 5
): { query: string; impressions: number }[] {
  const townLower = town.toLowerCase();

  // Direct town match
  const townMatches = gscQueries.filter((q) =>
    q.query.toLowerCase().includes(townLower)
  );

  // If no direct matches, show top general queries
  const results =
    townMatches.length > 0
      ? townMatches.sort((a, b) => b.impressions - a.impressions)
      : gscQueries
          .filter((q) => q.language === "en")
          .sort((a, b) => b.impressions - a.impressions);

  return results.slice(0, limit).map((q) => ({
    query: q.query,
    impressions: q.impressions,
  }));
}

/**
 * Get long-tail keywords from clusters relevant to a property.
 */
export function getRelevantKeywords(
  town: string,
  buyerPersona: string,
  limit: number = 8
): string[] {
  const townLower = town.toLowerCase();

  const personaTopicMap: Record<string, string[]> = {
    luxury: ["Luxury Properties & Premium Living", "Investment & Rental Income"],
    golf: ["Lifestyle & Living"],
    retirement: ["Healthcare & Lifestyle", "Costs & Taxes", "Residency & Visa"],
    family: ["Schools & Education Information", "Healthcare & Lifestyle", "Safety & Security"],
    investment: ["Investment & Rental Income", "Mortgages & Finance", "Beckham Law Tax Benefits"],
    holiday: ["Buying Process", "Costs & Taxes", "Weather & Climate"],
  };

  const relevantTopics = personaTopicMap[buyerPersona] || [];

  const keywords: string[] = [];
  for (const cluster of keywordClusters) {
    const isTopicMatch = relevantTopics.some((t) =>
      cluster.topic.toLowerCase().includes(t.toLowerCase())
    );
    const isTownMatch = cluster.relatedTowns?.some(
      (t) => t.toLowerCase().includes(townLower) || townLower.includes(t.toLowerCase())
    );

    if (isTopicMatch || isTownMatch) {
      keywords.push(cluster.primaryKeyword, ...cluster.relatedKeywords.slice(0, 2));
    }
  }

  return Array.from(new Set(keywords)).slice(0, limit);
}

/**
 * Statistics about the keyword database
 */
export const databaseStats = {
  totalGSCQueries: gscQueries.length,
  totalPAAQuestions: paaQuestions.length,
  totalKeywordClusters: keywordClusters.length,
  languageBreakdown: {
    en: paaQuestions.filter((q) => q.language === "en").length,
    nl: paaQuestions.filter((q) => q.language === "nl").length,
    sv: paaQuestions.filter((q) => q.language === "sv").length,
    no: paaQuestions.filter((q) => q.language === "no").length,
    de: paaQuestions.filter((q) => q.language === "de").length,
    fr: paaQuestions.filter((q) => q.language === "fr").length,
    pl: paaQuestions.filter((q) => q.language === "pl").length,
    ru: paaQuestions.filter((q) => q.language === "ru").length
  },
  categoryBreakdown: {
    "buying-process": paaQuestions.filter(
      (q) => q.category === "buying-process"
    ).length,
    "costs-taxes": paaQuestions.filter((q) => q.category === "costs-taxes")
      .length,
    mortgages: paaQuestions.filter((q) => q.category === "mortgages").length,
    "investment-rental": paaQuestions.filter(
      (q) => q.category === "investment-rental"
    ).length,
    "residency-visa": paaQuestions.filter(
      (q) => q.category === "residency-visa"
    ).length,
    "healthcare-lifestyle": paaQuestions.filter(
      (q) => q.category === "healthcare-lifestyle"
    ).length,
    "beckham-law": paaQuestions.filter((q) => q.category === "beckham-law")
      .length,
    "locations-north": paaQuestions.filter(
      (q) => q.category === "locations-north"
    ).length,
    "locations-south": paaQuestions.filter(
      (q) => q.category === "locations-south"
    ).length,
    "safety-security": paaQuestions.filter(
      (q) => q.category === "safety-security"
    ).length,
    "property-types": paaQuestions.filter(
      (q) => q.category === "property-types"
    ).length,
    "construction-quality": paaQuestions.filter(
      (q) => q.category === "construction-quality"
    ).length,
    inheritance: paaQuestions.filter((q) => q.category === "inheritance")
      .length,
    "legal-documentation": paaQuestions.filter(
      (q) => q.category === "legal-documentation"
    ).length,
    "costa-blanca-vs-alternatives": paaQuestions.filter(
      (q) => q.category === "costa-blanca-vs-alternatives"
    ).length,
    "schools-education": paaQuestions.filter(
      (q) => q.category === "schools-education"
    ).length,
    "weather-climate": paaQuestions.filter(
      (q) => q.category === "weather-climate"
    ).length,
    lifestyle: paaQuestions.filter((q) => q.category === "lifestyle").length
  }
};
