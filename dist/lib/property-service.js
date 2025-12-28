"use strict";
/**
 * Property Service
 *
 * Central data layer for properties, developments, builders, and areas
 * Uses XML feed when available, falls back to sample data
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = exports.slugify = void 0;
exports.getAllProperties = getAllProperties;
exports.getAllDevelopments = getAllDevelopments;
exports.getDevelopmentBySlug = getDevelopmentBySlug;
exports.getFeaturedDevelopments = getFeaturedDevelopments;
exports.getDevelopmentsByArea = getDevelopmentsByArea;
exports.getDevelopmentsByBuilder = getDevelopmentsByBuilder;
exports.getGolfDevelopments = getGolfDevelopments;
exports.getAllBuilders = getAllBuilders;
exports.getBuilderBySlug = getBuilderBySlug;
exports.getAllAreas = getAllAreas;
exports.getAreaBySlug = getAreaBySlug;
exports.getAreasByRegion = getAreasByRegion;
exports.getAllGolfCourses = getAllGolfCourses;
exports.searchDevelopments = searchDevelopments;
exports.getStatusConfig = getStatusConfig;
exports.getDevelopmentStats = getDevelopmentStats;
const xml_parser_1 = require("./xml-parser");
Object.defineProperty(exports, "slugify", { enumerable: true, get: function () { return xml_parser_1.slugify; } });
Object.defineProperty(exports, "formatPrice", { enumerable: true, get: function () { return xml_parser_1.formatPrice; } });
const sample_data_1 = require("../data/sample-data");
// Cache for property data
let cachedProperties = null;
let cachedDevelopments = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
/**
 * Get all properties (from XML or sample data)
 */
async function getAllProperties() {
    const now = Date.now();
    // Return cached data if still fresh
    if (cachedProperties && (now - lastFetchTime) < CACHE_DURATION) {
        return cachedProperties;
    }
    try {
        // Try to fetch from XML feed
        const properties = await (0, xml_parser_1.fetchXMLFeed)();
        if (properties.length > 0) {
            cachedProperties = properties;
            lastFetchTime = now;
            return properties;
        }
    }
    catch (error) {
        console.error('Failed to fetch properties from XML:', error);
    }
    // Return empty array - developments come from sample data
    return [];
}
/**
 * Get all developments (grouped from properties or sample data)
 */
async function getAllDevelopments() {
    const now = Date.now();
    if (cachedDevelopments && (now - lastFetchTime) < CACHE_DURATION) {
        return cachedDevelopments;
    }
    try {
        const properties = await getAllProperties();
        if (properties.length > 0) {
            cachedDevelopments = (0, xml_parser_1.groupByDevelopment)(properties);
            return cachedDevelopments;
        }
    }
    catch (error) {
        console.error('Failed to group developments:', error);
    }
    // Return sample developments as fallback
    return sample_data_1.sampleDevelopments;
}
/**
 * Get a single development by slug
 */
async function getDevelopmentBySlug(slug) {
    const developments = await getAllDevelopments();
    return developments.find(d => d.slug === slug) || null;
}
/**
 * Get featured developments for homepage
 */
function getFeaturedDevelopments() {
    return sample_data_1.featuredDevelopments;
}
/**
 * Get developments by area
 */
async function getDevelopmentsByArea(areaSlug) {
    const developments = await getAllDevelopments();
    return developments.filter(d => (0, xml_parser_1.slugify)(d.town) === areaSlug);
}
/**
 * Get developments by builder
 */
async function getDevelopmentsByBuilder(builderSlug) {
    const developments = await getAllDevelopments();
    return developments.filter(d => d.developerSlug === builderSlug);
}
/**
 * Get developments near golf courses
 */
async function getGolfDevelopments() {
    const developments = await getAllDevelopments();
    // Filter for golf-related developments
    const golfTowns = ['algorfa', 'orihuela costa', 'campoamor', 'ciudad quesada', 'villamartin'];
    return developments.filter(d => {
        const townLower = d.town.toLowerCase();
        const nameLower = d.name.toLowerCase();
        return golfTowns.some(t => townLower.includes(t)) ||
            nameLower.includes('golf') ||
            d.zone.toLowerCase().includes('golf');
    });
}
/**
 * Get all builders
 */
function getAllBuilders() {
    return sample_data_1.sampleBuilders;
}
/**
 * Get a single builder by slug
 */
function getBuilderBySlug(slug) {
    return sample_data_1.sampleBuilders.find(b => b.slug === slug) || null;
}
/**
 * Get all areas
 */
function getAllAreas() {
    return sample_data_1.sampleAreas;
}
/**
 * Get a single area by slug
 */
function getAreaBySlug(slug) {
    return sample_data_1.sampleAreas.find(a => a.slug === slug) || null;
}
/**
 * Get areas by region
 */
function getAreasByRegion(region) {
    return sample_data_1.sampleAreas.filter(a => a.region === region);
}
/**
 * Get all golf courses
 */
function getAllGolfCourses() {
    return sample_data_1.golfCourses;
}
/**
 * Search developments
 */
async function searchDevelopments(params) {
    let developments = await getAllDevelopments();
    if (params.status && params.status !== 'all') {
        developments = developments.filter(d => d.statuses.includes(params.status));
    }
    if (params.area && params.area !== 'all') {
        developments = developments.filter(d => (0, xml_parser_1.slugify)(d.town) === params.area);
    }
    if (params.minBedrooms) {
        developments = developments.filter(d => d.bedroomRange.max >= params.minBedrooms);
    }
    if (params.maxPrice) {
        developments = developments.filter(d => d.priceFrom !== null && d.priceFrom <= params.maxPrice);
    }
    if (params.type && params.type !== 'all') {
        developments = developments.filter(d => d.types.includes(params.type));
    }
    return developments;
}
/**
 * Get property status configuration
 */
function getStatusConfig() {
    return {
        'key-ready': {
            label: 'Key Ready',
            color: 'bg-green-500',
            textColor: 'text-green-700',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            priority: 1
        },
        'completion-3-months': {
            label: 'Completion within 3 months',
            color: 'bg-blue-500',
            textColor: 'text-blue-700',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            priority: 2
        },
        'under-construction': {
            label: 'Under Construction',
            color: 'bg-amber-500',
            textColor: 'text-amber-700',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-200',
            priority: 3
        },
        'off-plan': {
            label: 'Off Plan',
            color: 'bg-purple-500',
            textColor: 'text-purple-700',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            priority: 4
        },
        'sold': {
            label: 'Sold',
            color: 'bg-gray-500',
            textColor: 'text-gray-700',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200',
            priority: 5
        }
    };
}
/**
 * Get development statistics
 */
async function getDevelopmentStats() {
    const developments = await getAllDevelopments();
    const areas = getAllAreas();
    const builders = getAllBuilders();
    const totalProperties = developments.reduce((sum, d) => sum + d.propertyCount, 0);
    const allPrices = developments
        .map(d => d.priceFrom)
        .filter(Boolean);
    const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
    return {
        totalDevelopments: developments.length,
        totalProperties,
        totalAreas: areas.length,
        totalBuilders: builders.length,
        priceFrom: minPrice,
        priceFromFormatted: (0, xml_parser_1.formatPrice)(minPrice)
    };
}
