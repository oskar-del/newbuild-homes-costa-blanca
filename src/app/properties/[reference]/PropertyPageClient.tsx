'use client';

/**
 * Property Page Client Component
 * ==============================
 * All interactive UI for property detail pages.
 * 
 * Layout (top to bottom):
 * 1. Breadcrumb
 * 2. Image Gallery + Lightbox
 * 3. Title + Location (Google Maps → town, not exact) + Price
 * 4. Last Updated + Share Buttons (WhatsApp, Facebook, X, Copy)
 * 5. Quick Stats + Feature Chips
 * 6. Nearby Amenities (beach, supermarket, hospital, schools, golf, airport)
 * 7. Main Description
 * 8. Area Section (sky blue - geography, climate, transport)
 * 9. Lifestyle Section (amber - daily life, beaches, healthcare, expat community)
 * 10. Investment Section (emerald + charts + rental income)
 * 11. "Why Buy This Property?" (10 points, BLUE)
 * 12. Features List
 * 13. Helpful Resources
 * 14. FAQ Accordion
 * 15. Bottom CTA (earthy amber/stone)
 * 16. Similar Properties
 * 17. View All Properties CTA
 * 
 * Sidebar: Agent Card (stars + reviews), Contact, Lead Form, Mortgage, Video/Floorplan
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UnifiedProperty } from '@/lib/unified-property';
import { PropertyContent } from '@/lib/property-content-generator';
import LeadForm from '@/components/LeadForm';
import NewsletterCTA from '@/components/NewsletterCTA';
import VideoCard from '@/components/VideoCard';

// ====================
// CONSTANTS
// ====================

const WHATSAPP_URL = 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0';
const PHONE_NUMBER = '+34 634 044 970';
const PHONE_TEL = 'tel:+34634044970';
const HABENO_URL = 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e';
const AGENT_PHOTO = 'https://hanssonhertzell.se/media/images/teams/thumbnails/o_1gq9nqdtl3ck2h01r4ur931q12c_400x400.png';

// Brand Colors now use Tailwind design system classes:
// primary-900 (#1E2A38), accent-500 (#B39960), etc.

// ====================
// INTERFACES
// ====================

interface LinkingData {
  development: { slug: string; name: string; status: string } | null;
  builder: { slug: string; name: string } | null;
  relatedArticles: { slug: string; title: string; category: string; readTime: number }[];
  propertyVideo: {
    slug: string;
    title: string;
    youtubeId: string;
    description: string;
    category: string;
    duration: string;
    price: number | null;
  } | null;
}

interface PropertyPageClientProps {
  property: UnifiedProperty;
  content: PropertyContent;
  similarProperties: UnifiedProperty[];
  linkingData: LinkingData;
  lang?: string;
}

// ====================
// LOCALIZED UI STRINGS
// ====================

interface PropertyStrings {
  home: string; properties: string; clickForFullscreen: string;
  bedrooms: string; bathrooms: string; sqmBuilt: string; sqmPlot: string;
  pool: string; seaView: string; golfView: string; garden: string; terrace: string; parking: string;
  nearbyAmenities: string; beach: string; supermarket: string; hospital: string; schools: string; golfCourse: string; airport: string;
  approxDistances: string; viewOnMap: string; openInGoogleMaps: string; mapShowsApprox: string; approxAreaShown: string;
  aboutThisProperty: string; aboutArea: string; exploreAreaGuide: string; lifeIn: string;
  investmentPotential: string; estRentalIncome: string; annual: string; monthly: string; weeklyPeak: string; basedOn: string; occupancyRate: string;
  whyBuyThis: string; allFeatures: string; helpfulResources: string;
  buyingProcessGuide: string; buyingProcessDesc: string; nieNumberGuide: string; nieNumberDesc: string; mortgageGuide: string; mortgageDesc: string; areaGuide: string; discoverLifestyle: string;
  exploreMoreProperties: string; allIn: string; bedroomHomes: string; under300k: string; keyReady: string;
  videoTour: string; multimedia: string; faq: string;
  highDemandArea: string; wontLastLong: string; qualityPropertiesIn: string; sellingFast: string;
  requestFloorPlans: string; getDetailedLayouts: string; scheduleVideoTour: string; seeItFromAnywhere: string; bookAViewing: string; weArrangeEverything: string;
  whatsappNow: string; call: string; orLeaveDetails: string; hideContactForm: string;
  similarProperties: string; buyingGuidesFor: string; viewAllProperties: string;
  guidePrice: string; whatsappUs: string; builtBy: string; partOfDevelopment: string;
  lastUpdated: string; priceVerified: string; share: string; linkCopied: string; copyLink: string;
  propertySpecialist: string; reviews: string; agentBio: string;
  needFinancing: string; compareMortgage: string; getMortgageQuote: string;
  getNewListingsFirst: string; beFirstToKnow: string;
  sendInquiry: string; sending: string; thankYou: string; inTouch24h: string; privacyNotice: string; errorMessage: string;
  yourName: string; emailAddress: string; phoneOptional: string; message: string;
  location: string;
}

const STRINGS: Record<string, PropertyStrings> = {
  en: {
    home: 'Home', properties: 'Properties', clickForFullscreen: 'Click for fullscreen',
    bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', sqmBuilt: 'm² Built', sqmPlot: 'm² Plot',
    pool: 'Pool', seaView: 'Sea View', golfView: 'Golf View', garden: 'Garden', terrace: 'Terrace', parking: 'Parking',
    nearbyAmenities: 'Nearby Amenities', beach: 'Beach', supermarket: 'Supermarket', hospital: 'Hospital', schools: 'Schools', golfCourse: 'Golf Course', airport: 'Airport',
    approxDistances: 'Approximate distances. Contact us for exact property location.', viewOnMap: 'View on Map', openInGoogleMaps: 'Open in Google Maps', mapShowsApprox: 'Map shows approximate area (~500m radius)', approxAreaShown: 'Approximate area shown. Contact us for the exact address.',
    aboutThisProperty: 'About This Property', aboutArea: 'About', exploreAreaGuide: 'Area Guide', lifeIn: 'Life in',
    investmentPotential: 'Investment Potential', estRentalIncome: 'Estimated Rental Income', annual: 'Annual', monthly: 'Monthly', weeklyPeak: 'Weekly (peak)', basedOn: 'Based on', occupancyRate: '% occupancy rate',
    whyBuyThis: 'Why Buy This Property?', allFeatures: 'All Features', helpfulResources: 'Helpful Resources',
    buyingProcessGuide: 'Buying Process Guide', buyingProcessDesc: 'Step-by-step guide for foreign buyers', nieNumberGuide: 'NIE Number Guide', nieNumberDesc: 'How to get your Spanish tax ID', mortgageGuide: 'Mortgage Guide', mortgageDesc: 'Financing options for non-residents', areaGuide: 'Area Guide:', discoverLifestyle: 'Discover the local lifestyle',
    exploreMoreProperties: 'Explore More Properties', allIn: 'All in', bedroomHomes: 'Bedroom Homes', under300k: 'Under €300k', keyReady: 'Key Ready',
    videoTour: 'Video Tour', multimedia: 'Multimedia', faq: 'Frequently Asked Questions',
    highDemandArea: 'High Demand Area', wontLastLong: "This Won't Last Long", qualityPropertiesIn: 'Quality properties in', sellingFast: 'are selling fast. Take the next step before someone else does.',
    requestFloorPlans: 'Request Floor Plans', getDetailedLayouts: 'Get detailed layouts', scheduleVideoTour: 'Schedule Video Tour', seeItFromAnywhere: 'See it from anywhere', bookAViewing: 'Book a Viewing', weArrangeEverything: "We'll arrange everything",
    whatsappNow: 'WhatsApp Now', call: 'Call', orLeaveDetails: "Or leave your details and we'll contact you", hideContactForm: 'Hide contact form',
    similarProperties: "Similar Properties You'll Love", buyingGuidesFor: 'Buying Guides for', viewAllProperties: 'View All Properties',
    guidePrice: 'Guide price', whatsappUs: 'WhatsApp Us', builtBy: 'Built by', partOfDevelopment: 'Part of Development',
    lastUpdated: 'Last updated:', priceVerified: 'Price verified', share: 'Share:', linkCopied: 'Link copied to clipboard!', copyLink: 'Copy link',
    propertySpecialist: 'Property Specialist', reviews: '(50+ reviews)', agentBio: 'I help international buyers find their perfect home in Costa Blanca. I speak English, Swedish, and Spanish.',
    needFinancing: 'Need Financing?', compareMortgage: 'Compare mortgage rates from multiple Spanish banks.', getMortgageQuote: 'Get Mortgage Quote',
    getNewListingsFirst: 'Get New Listings First', beFirstToKnow: 'Be the first to know about new properties in',
    sendInquiry: 'Send Inquiry', sending: 'Sending...', thankYou: 'Thank you!', inTouch24h: "We'll be in touch within 24 hours.", privacyNotice: 'We respect your privacy. Your data is handled securely.', errorMessage: 'Something went wrong. Please try again or contact us directly.',
    yourName: 'Your Name', emailAddress: 'Email Address', phoneOptional: 'Phone (optional)', message: 'Message',
    location: 'Location',
  },
  sv: {
    home: 'Hem', properties: 'Bostäder', clickForFullscreen: 'Klicka för helskärm',
    bedrooms: 'Sovrum', bathrooms: 'Badrum', sqmBuilt: 'm² Boyta', sqmPlot: 'm² Tomt',
    pool: 'Pool', seaView: 'Havsutsikt', golfView: 'Golfutsikt', garden: 'Trädgård', terrace: 'Terrass', parking: 'Parkering',
    nearbyAmenities: 'Närliggande bekvämligheter', beach: 'Strand', supermarket: 'Mataffär', hospital: 'Sjukhus', schools: 'Skolor', golfCourse: 'Golfbana', airport: 'Flygplats',
    approxDistances: 'Ungefärliga avstånd. Kontakta oss för exakt läge.', viewOnMap: 'Visa på karta', openInGoogleMaps: 'Öppna i Google Maps', mapShowsApprox: 'Kartan visar ungefärligt område (~500m radie)', approxAreaShown: 'Ungefärligt område visas. Kontakta oss för exakt adress.',
    aboutThisProperty: 'Om denna bostad', aboutArea: 'Om', exploreAreaGuide: 'Områdesguide', lifeIn: 'Livet i',
    investmentPotential: 'Investeringspotential', estRentalIncome: 'Beräknade hyresintäkter', annual: 'Årlig', monthly: 'Månadsvis', weeklyPeak: 'Veckovis (högsäsong)', basedOn: 'Baserat på', occupancyRate: '% beläggningsgrad',
    whyBuyThis: 'Varför köpa denna bostad?', allFeatures: 'Alla egenskaper', helpfulResources: 'Användbara resurser',
    buyingProcessGuide: 'Köpprocessguide', buyingProcessDesc: 'Steg-för-steg-guide för utländska köpare', nieNumberGuide: 'NIE-nummerguide', nieNumberDesc: 'Så får du ditt spanska skatte-ID', mortgageGuide: 'Bolåneguide', mortgageDesc: 'Finansieringsalternativ för icke-residenter', areaGuide: 'Områdesguide:', discoverLifestyle: 'Upptäck den lokala livsstilen',
    exploreMoreProperties: 'Utforska fler bostäder', allIn: 'Alla i', bedroomHomes: 'sovrumsbostäder', under300k: 'Under €300k', keyReady: 'Nyckelfärdiga',
    videoTour: 'Videovisning', multimedia: 'Multimedia', faq: 'Vanliga frågor',
    highDemandArea: 'Populärt område', wontLastLong: 'Denna möjlighet varar inte länge', qualityPropertiesIn: 'Kvalitetsbostäder i', sellingFast: 'säljs snabbt. Ta nästa steg innan någon annan gör det.',
    requestFloorPlans: 'Begär planritningar', getDetailedLayouts: 'Få detaljerade ritningar', scheduleVideoTour: 'Boka videovisning', seeItFromAnywhere: 'Se den var du än är', bookAViewing: 'Boka visning', weArrangeEverything: 'Vi ordnar allt',
    whatsappNow: 'WhatsApp nu', call: 'Ring', orLeaveDetails: 'Eller lämna dina uppgifter så kontaktar vi dig', hideContactForm: 'Dölj kontaktformulär',
    similarProperties: 'Liknande bostäder du kommer älska', buyingGuidesFor: 'Köpguider för', viewAllProperties: 'Visa alla bostäder',
    guidePrice: 'Riktpris', whatsappUs: 'WhatsApp oss', builtBy: 'Byggd av', partOfDevelopment: 'Del av projekt',
    lastUpdated: 'Senast uppdaterad:', priceVerified: 'Pris verifierat', share: 'Dela:', linkCopied: 'Länk kopierad!', copyLink: 'Kopiera länk',
    propertySpecialist: 'Bostadsspecialist', reviews: '(50+ recensioner)', agentBio: 'Jag hjälper internationella köpare att hitta sin drömbostad på Costa Blanca. Jag talar svenska, engelska och spanska.',
    needFinancing: 'Behöver du finansiering?', compareMortgage: 'Jämför bolåneräntor från flera spanska banker.', getMortgageQuote: 'Få bolåneoffert',
    getNewListingsFirst: 'Få nya objekt först', beFirstToKnow: 'Bli först med att veta om nya bostäder i',
    sendInquiry: 'Skicka förfrågan', sending: 'Skickar...', thankYou: 'Tack!', inTouch24h: 'Vi hör av oss inom 24 timmar.', privacyNotice: 'Vi respekterar din integritet. Din data hanteras säkert.', errorMessage: 'Något gick fel. Försök igen eller kontakta oss direkt.',
    yourName: 'Ditt namn', emailAddress: 'E-postadress', phoneOptional: 'Telefon (valfritt)', message: 'Meddelande',
    location: 'Läge',
  },
  de: {
    home: 'Startseite', properties: 'Immobilien', clickForFullscreen: 'Klicken für Vollbild',
    bedrooms: 'Schlafzimmer', bathrooms: 'Badezimmer', sqmBuilt: 'm² Wohnfläche', sqmPlot: 'm² Grundstück',
    pool: 'Pool', seaView: 'Meerblick', golfView: 'Golfblick', garden: 'Garten', terrace: 'Terrasse', parking: 'Parkplatz',
    nearbyAmenities: 'Einrichtungen in der Nähe', beach: 'Strand', supermarket: 'Supermarkt', hospital: 'Krankenhaus', schools: 'Schulen', golfCourse: 'Golfplatz', airport: 'Flughafen',
    approxDistances: 'Ungefähre Entfernungen. Kontaktieren Sie uns für den genauen Standort.', viewOnMap: 'Auf Karte anzeigen', openInGoogleMaps: 'In Google Maps öffnen', mapShowsApprox: 'Karte zeigt ungefähren Bereich (~500m Radius)', approxAreaShown: 'Ungefährer Bereich. Kontaktieren Sie uns für die genaue Adresse.',
    aboutThisProperty: 'Über diese Immobilie', aboutArea: 'Über', exploreAreaGuide: 'Gebietsführer', lifeIn: 'Leben in',
    investmentPotential: 'Investitionspotenzial', estRentalIncome: 'Geschätzte Mieteinnahmen', annual: 'Jährlich', monthly: 'Monatlich', weeklyPeak: 'Wöchentlich (Hochsaison)', basedOn: 'Basierend auf', occupancyRate: '% Auslastung',
    whyBuyThis: 'Warum diese Immobilie kaufen?', allFeatures: 'Alle Merkmale', helpfulResources: 'Hilfreiche Ressourcen',
    buyingProcessGuide: 'Kaufprozess-Leitfaden', buyingProcessDesc: 'Schritt-für-Schritt-Anleitung für ausländische Käufer', nieNumberGuide: 'NIE-Nummer-Leitfaden', nieNumberDesc: 'So erhalten Sie Ihre spanische Steuer-ID', mortgageGuide: 'Hypotheken-Leitfaden', mortgageDesc: 'Finanzierungsmöglichkeiten für Nicht-Residenten', areaGuide: 'Gebietsführer:', discoverLifestyle: 'Entdecken Sie den lokalen Lebensstil',
    exploreMoreProperties: 'Weitere Immobilien entdecken', allIn: 'Alle in', bedroomHomes: 'Schlafzimmer-Häuser', under300k: 'Unter €300k', keyReady: 'Schlüsselfertig',
    videoTour: 'Video-Rundgang', multimedia: 'Multimedia', faq: 'Häufig gestellte Fragen',
    highDemandArea: 'Begehrte Lage', wontLastLong: 'Das wird nicht lange verfügbar sein', qualityPropertiesIn: 'Qualitätsimmobilien in', sellingFast: 'verkaufen sich schnell. Machen Sie den nächsten Schritt.',
    requestFloorPlans: 'Grundrisse anfordern', getDetailedLayouts: 'Detaillierte Pläne erhalten', scheduleVideoTour: 'Video-Besichtigung planen', seeItFromAnywhere: 'Von überall besichtigen', bookAViewing: 'Besichtigung buchen', weArrangeEverything: 'Wir organisieren alles',
    whatsappNow: 'WhatsApp jetzt', call: 'Anrufen', orLeaveDetails: 'Oder hinterlassen Sie Ihre Daten und wir kontaktieren Sie', hideContactForm: 'Kontaktformular ausblenden',
    similarProperties: 'Ähnliche Immobilien', buyingGuidesFor: 'Kaufratgeber für', viewAllProperties: 'Alle Immobilien ansehen',
    guidePrice: 'Richtpreis', whatsappUs: 'WhatsApp', builtBy: 'Gebaut von', partOfDevelopment: 'Teil der Wohnanlage',
    lastUpdated: 'Zuletzt aktualisiert:', priceVerified: 'Preis verifiziert', share: 'Teilen:', linkCopied: 'Link kopiert!', copyLink: 'Link kopieren',
    propertySpecialist: 'Immobilienspezialist', reviews: '(50+ Bewertungen)', agentBio: 'Ich helfe internationalen Käufern, ihr perfektes Zuhause an der Costa Blanca zu finden. Ich spreche Englisch, Schwedisch und Spanisch.',
    needFinancing: 'Finanzierung benötigt?', compareMortgage: 'Vergleichen Sie Hypothekenzinsen von mehreren spanischen Banken.', getMortgageQuote: 'Hypothekenangebot erhalten',
    getNewListingsFirst: 'Neue Objekte zuerst erhalten', beFirstToKnow: 'Erfahren Sie als Erstes von neuen Immobilien in',
    sendInquiry: 'Anfrage senden', sending: 'Wird gesendet...', thankYou: 'Vielen Dank!', inTouch24h: 'Wir melden uns innerhalb von 24 Stunden.', privacyNotice: 'Wir respektieren Ihre Privatsphäre. Ihre Daten werden sicher verarbeitet.', errorMessage: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    yourName: 'Ihr Name', emailAddress: 'E-Mail-Adresse', phoneOptional: 'Telefon (optional)', message: 'Nachricht',
    location: 'Lage',
  },
  nl: {
    home: 'Home', properties: 'Woningen', clickForFullscreen: 'Klik voor volledig scherm',
    bedrooms: 'Slaapkamers', bathrooms: 'Badkamers', sqmBuilt: 'm² Woonoppervlak', sqmPlot: 'm² Perceel',
    pool: 'Zwembad', seaView: 'Zeezicht', golfView: 'Golfzicht', garden: 'Tuin', terrace: 'Terras', parking: 'Parkeerplaats',
    nearbyAmenities: 'Voorzieningen in de buurt', beach: 'Strand', supermarket: 'Supermarkt', hospital: 'Ziekenhuis', schools: 'Scholen', golfCourse: 'Golfbaan', airport: 'Luchthaven',
    approxDistances: 'Geschatte afstanden. Neem contact op voor de exacte locatie.', viewOnMap: 'Bekijk op kaart', openInGoogleMaps: 'Open in Google Maps', mapShowsApprox: 'Kaart toont geschat gebied (~500m radius)', approxAreaShown: 'Geschat gebied. Neem contact op voor het exacte adres.',
    aboutThisProperty: 'Over deze woning', aboutArea: 'Over', exploreAreaGuide: 'Gebiedsgids', lifeIn: 'Leven in',
    investmentPotential: 'Investeringspotentieel', estRentalIncome: 'Geschatte huurinkomsten', annual: 'Jaarlijks', monthly: 'Maandelijks', weeklyPeak: 'Wekelijks (piekseizoen)', basedOn: 'Gebaseerd op', occupancyRate: '% bezettingsgraad',
    whyBuyThis: 'Waarom deze woning kopen?', allFeatures: 'Alle kenmerken', helpfulResources: 'Nuttige bronnen',
    buyingProcessGuide: 'Koopprocesgids', buyingProcessDesc: 'Stap-voor-stap gids voor buitenlandse kopers', nieNumberGuide: 'NIE-nummergids', nieNumberDesc: 'Hoe u uw Spaans belastingnummer verkrijgt', mortgageGuide: 'Hypotheekgids', mortgageDesc: 'Financieringsopties voor niet-residenten', areaGuide: 'Gebiedsgids:', discoverLifestyle: 'Ontdek de lokale levensstijl',
    exploreMoreProperties: 'Meer woningen ontdekken', allIn: 'Alle in', bedroomHomes: 'slaapkamerwoningen', under300k: 'Onder €300k', keyReady: 'Sleutelklaar',
    videoTour: 'Videorondleiding', multimedia: 'Multimedia', faq: 'Veelgestelde vragen',
    highDemandArea: 'Gewild gebied', wontLastLong: 'Dit blijft niet lang beschikbaar', qualityPropertiesIn: 'Kwaliteitswoningen in', sellingFast: 'worden snel verkocht. Neem de volgende stap.',
    requestFloorPlans: 'Plattegronden opvragen', getDetailedLayouts: 'Gedetailleerde plattegronden', scheduleVideoTour: 'Videorondleiding plannen', seeItFromAnywhere: 'Bekijk het overal', bookAViewing: 'Bezichtiging boeken', weArrangeEverything: 'Wij regelen alles',
    whatsappNow: 'WhatsApp nu', call: 'Bel', orLeaveDetails: 'Of laat uw gegevens achter en wij nemen contact op', hideContactForm: 'Contactformulier verbergen',
    similarProperties: 'Vergelijkbare woningen', buyingGuidesFor: 'Koopgidsen voor', viewAllProperties: 'Alle woningen bekijken',
    guidePrice: 'Richtprijs', whatsappUs: 'WhatsApp ons', builtBy: 'Gebouwd door', partOfDevelopment: 'Onderdeel van project',
    lastUpdated: 'Laatst bijgewerkt:', priceVerified: 'Prijs geverifieerd', share: 'Delen:', linkCopied: 'Link gekopieerd!', copyLink: 'Link kopiëren',
    propertySpecialist: 'Woningspecialist', reviews: '(50+ beoordelingen)', agentBio: 'Ik help internationale kopers hun perfecte woning te vinden aan de Costa Blanca. Ik spreek Engels, Zweeds en Spaans.',
    needFinancing: 'Financiering nodig?', compareMortgage: 'Vergelijk hypotheekrentes van meerdere Spaanse banken.', getMortgageQuote: 'Hypotheekofferte aanvragen',
    getNewListingsFirst: 'Ontvang nieuwe aanbiedingen eerst', beFirstToKnow: 'Wees de eerste die weet van nieuwe woningen in',
    sendInquiry: 'Vraag versturen', sending: 'Verzenden...', thankYou: 'Dank u!', inTouch24h: 'We nemen binnen 24 uur contact op.', privacyNotice: 'Wij respecteren uw privacy. Uw gegevens worden veilig verwerkt.', errorMessage: 'Er is iets misgegaan. Probeer het opnieuw of neem direct contact op.',
    yourName: 'Uw naam', emailAddress: 'E-mailadres', phoneOptional: 'Telefoon (optioneel)', message: 'Bericht',
    location: 'Locatie',
  },
  'nl-be': {
    home: 'Home', properties: 'Woningen', clickForFullscreen: 'Klik voor volledig scherm',
    bedrooms: 'Slaapkamers', bathrooms: 'Badkamers', sqmBuilt: 'm² Bewoonbaar', sqmPlot: 'm² Perceel',
    pool: 'Zwembad', seaView: 'Zeezicht', golfView: 'Golfzicht', garden: 'Tuin', terrace: 'Terras', parking: 'Parkeerplaats',
    nearbyAmenities: 'Voorzieningen in de buurt', beach: 'Strand', supermarket: 'Supermarkt', hospital: 'Ziekenhuis', schools: 'Scholen', golfCourse: 'Golfbaan', airport: 'Luchthaven',
    approxDistances: 'Geschatte afstanden. Neem contact op voor de exacte locatie.', viewOnMap: 'Bekijk op kaart', openInGoogleMaps: 'Open in Google Maps', mapShowsApprox: 'Kaart toont geschat gebied (~500m radius)', approxAreaShown: 'Geschat gebied. Neem contact op voor het exacte adres.',
    aboutThisProperty: 'Over deze woning', aboutArea: 'Over', exploreAreaGuide: 'Gebiedsgids', lifeIn: 'Leven in',
    investmentPotential: 'Investeringspotentieel', estRentalIncome: 'Geschatte huurinkomsten', annual: 'Jaarlijks', monthly: 'Maandelijks', weeklyPeak: 'Wekelijks (piekseizoen)', basedOn: 'Gebaseerd op', occupancyRate: '% bezettingsgraad',
    whyBuyThis: 'Waarom deze woning kopen?', allFeatures: 'Alle kenmerken', helpfulResources: 'Nuttige bronnen',
    buyingProcessGuide: 'Koopprocesgids', buyingProcessDesc: 'Stap-voor-stap gids voor buitenlandse kopers', nieNumberGuide: 'NIE-nummergids', nieNumberDesc: 'Hoe u uw Spaans belastingnummer verkrijgt', mortgageGuide: 'Hypotheekgids', mortgageDesc: 'Financieringsopties voor niet-residenten', areaGuide: 'Gebiedsgids:', discoverLifestyle: 'Ontdek de lokale levensstijl',
    exploreMoreProperties: 'Meer woningen ontdekken', allIn: 'Alle in', bedroomHomes: 'slaapkamerwoningen', under300k: 'Onder €300k', keyReady: 'Sleutelklaar',
    videoTour: 'Videorondleiding', multimedia: 'Multimedia', faq: 'Veelgestelde vragen',
    highDemandArea: 'Gewild gebied', wontLastLong: 'Dit blijft niet lang beschikbaar', qualityPropertiesIn: 'Kwaliteitswoningen in', sellingFast: 'worden snel verkocht. Neem de volgende stap.',
    requestFloorPlans: 'Grondplannen opvragen', getDetailedLayouts: 'Gedetailleerde plattegronden', scheduleVideoTour: 'Videorondleiding plannen', seeItFromAnywhere: 'Bekijk het overal', bookAViewing: 'Bezichtiging boeken', weArrangeEverything: 'Wij regelen alles',
    whatsappNow: 'WhatsApp nu', call: 'Bel', orLeaveDetails: 'Of laat uw gegevens achter en wij nemen contact op', hideContactForm: 'Contactformulier verbergen',
    similarProperties: 'Vergelijkbare woningen', buyingGuidesFor: 'Koopgidsen voor', viewAllProperties: 'Alle woningen bekijken',
    guidePrice: 'Richtprijs', whatsappUs: 'WhatsApp ons', builtBy: 'Gebouwd door', partOfDevelopment: 'Onderdeel van project',
    lastUpdated: 'Laatst bijgewerkt:', priceVerified: 'Prijs geverifieerd', share: 'Delen:', linkCopied: 'Link gekopieerd!', copyLink: 'Link kopiëren',
    propertySpecialist: 'Woningspecialist', reviews: '(50+ beoordelingen)', agentBio: 'Ik help internationale kopers hun perfecte woning te vinden aan de Costa Blanca. Ik spreek Engels, Zweeds en Spaans.',
    needFinancing: 'Financiering nodig?', compareMortgage: 'Vergelijk hypotheekrentes van meerdere Spaanse banken.', getMortgageQuote: 'Hypotheekofferte aanvragen',
    getNewListingsFirst: 'Ontvang nieuwe aanbiedingen eerst', beFirstToKnow: 'Wees de eerste die weet van nieuwe woningen in',
    sendInquiry: 'Vraag versturen', sending: 'Verzenden...', thankYou: 'Dank u!', inTouch24h: 'We nemen binnen 24 uur contact op.', privacyNotice: 'Wij respecteren uw privacy. Uw gegevens worden veilig verwerkt.', errorMessage: 'Er is iets misgegaan. Probeer het opnieuw of neem direct contact op.',
    yourName: 'Uw naam', emailAddress: 'E-mailadres', phoneOptional: 'Telefoon (optioneel)', message: 'Bericht',
    location: 'Locatie',
  },
  fr: {
    home: 'Accueil', properties: 'Biens', clickForFullscreen: 'Cliquer pour plein écran',
    bedrooms: 'Chambres', bathrooms: 'Salles de bain', sqmBuilt: 'm² Habitable', sqmPlot: 'm² Terrain',
    pool: 'Piscine', seaView: 'Vue mer', golfView: 'Vue golf', garden: 'Jardin', terrace: 'Terrasse', parking: 'Parking',
    nearbyAmenities: 'Commodités à proximité', beach: 'Plage', supermarket: 'Supermarché', hospital: 'Hôpital', schools: 'Écoles', golfCourse: 'Golf', airport: 'Aéroport',
    approxDistances: 'Distances approximatives. Contactez-nous pour la localisation exacte.', viewOnMap: 'Voir sur la carte', openInGoogleMaps: 'Ouvrir dans Google Maps', mapShowsApprox: 'La carte montre une zone approximative (~500m de rayon)', approxAreaShown: 'Zone approximative. Contactez-nous pour l\'adresse exacte.',
    aboutThisProperty: 'À propos de ce bien', aboutArea: 'À propos de', exploreAreaGuide: 'Guide de la région', lifeIn: 'La vie à',
    investmentPotential: 'Potentiel d\'investissement', estRentalIncome: 'Revenus locatifs estimés', annual: 'Annuel', monthly: 'Mensuel', weeklyPeak: 'Hebdomadaire (haute saison)', basedOn: 'Basé sur', occupancyRate: '% de taux d\'occupation',
    whyBuyThis: 'Pourquoi acheter ce bien ?', allFeatures: 'Toutes les caractéristiques', helpfulResources: 'Ressources utiles',
    buyingProcessGuide: 'Guide du processus d\'achat', buyingProcessDesc: 'Guide étape par étape pour les acheteurs étrangers', nieNumberGuide: 'Guide du numéro NIE', nieNumberDesc: 'Comment obtenir votre identifiant fiscal espagnol', mortgageGuide: 'Guide hypothécaire', mortgageDesc: 'Options de financement pour non-résidents', areaGuide: 'Guide de la région :', discoverLifestyle: 'Découvrez le style de vie local',
    exploreMoreProperties: 'Découvrir plus de biens', allIn: 'Tous à', bedroomHomes: 'chambres', under300k: 'Moins de 300k€', keyReady: 'Clé en main',
    videoTour: 'Visite vidéo', multimedia: 'Multimédia', faq: 'Questions fréquentes',
    highDemandArea: 'Zone très demandée', wontLastLong: 'Ça ne va pas durer', qualityPropertiesIn: 'Les biens de qualité à', sellingFast: 'se vendent vite. Faites le prochain pas.',
    requestFloorPlans: 'Demander les plans', getDetailedLayouts: 'Plans détaillés', scheduleVideoTour: 'Planifier une visite vidéo', seeItFromAnywhere: 'Visitez de n\'importe où', bookAViewing: 'Réserver une visite', weArrangeEverything: 'Nous organisons tout',
    whatsappNow: 'WhatsApp maintenant', call: 'Appeler', orLeaveDetails: 'Ou laissez vos coordonnées et nous vous contacterons', hideContactForm: 'Masquer le formulaire',
    similarProperties: 'Biens similaires', buyingGuidesFor: 'Guides d\'achat pour', viewAllProperties: 'Voir tous les biens',
    guidePrice: 'Prix indicatif', whatsappUs: 'WhatsApp', builtBy: 'Construit par', partOfDevelopment: 'Fait partie du programme',
    lastUpdated: 'Dernière mise à jour :', priceVerified: 'Prix vérifié', share: 'Partager :', linkCopied: 'Lien copié !', copyLink: 'Copier le lien',
    propertySpecialist: 'Spécialiste immobilier', reviews: '(50+ avis)', agentBio: 'J\'aide les acheteurs internationaux à trouver leur bien idéal sur la Costa Blanca. Je parle anglais, suédois et espagnol.',
    needFinancing: 'Besoin de financement ?', compareMortgage: 'Comparez les taux hypothécaires de plusieurs banques espagnoles.', getMortgageQuote: 'Obtenir un devis hypothécaire',
    getNewListingsFirst: 'Recevez les nouveautés en premier', beFirstToKnow: 'Soyez le premier informé des nouveaux biens à',
    sendInquiry: 'Envoyer la demande', sending: 'Envoi en cours...', thankYou: 'Merci !', inTouch24h: 'Nous vous contacterons dans les 24 heures.', privacyNotice: 'Nous respectons votre vie privée. Vos données sont traitées en toute sécurité.', errorMessage: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.',
    yourName: 'Votre nom', emailAddress: 'Adresse e-mail', phoneOptional: 'Téléphone (optionnel)', message: 'Message',
    location: 'Emplacement',
  },
  no: {
    home: 'Hjem', properties: 'Eiendommer', clickForFullscreen: 'Klikk for fullskjerm',
    bedrooms: 'Soverom', bathrooms: 'Bad', sqmBuilt: 'm² Bolig', sqmPlot: 'm² Tomt',
    pool: 'Basseng', seaView: 'Havutsikt', golfView: 'Golfutsikt', garden: 'Hage', terrace: 'Terrasse', parking: 'Parkering',
    nearbyAmenities: 'Fasiliteter i nærheten', beach: 'Strand', supermarket: 'Dagligvare', hospital: 'Sykehus', schools: 'Skoler', golfCourse: 'Golfbane', airport: 'Flyplass',
    approxDistances: 'Omtrentlige avstander. Kontakt oss for nøyaktig beliggenhet.', viewOnMap: 'Vis på kart', openInGoogleMaps: 'Åpne i Google Maps', mapShowsApprox: 'Kartet viser omtrentlig område (~500m radius)', approxAreaShown: 'Omtrentlig område vist. Kontakt oss for nøyaktig adresse.',
    aboutThisProperty: 'Om denne eiendommen', aboutArea: 'Om', exploreAreaGuide: 'Områdeguide', lifeIn: 'Livet i',
    investmentPotential: 'Investeringspotensial', estRentalIncome: 'Estimerte leieinntekter', annual: 'Årlig', monthly: 'Månedlig', weeklyPeak: 'Ukentlig (høysesong)', basedOn: 'Basert på', occupancyRate: '% belegg',
    whyBuyThis: 'Hvorfor kjøpe denne eiendommen?', allFeatures: 'Alle funksjoner', helpfulResources: 'Nyttige ressurser',
    buyingProcessGuide: 'Kjøpsprosessguide', buyingProcessDesc: 'Steg-for-steg guide for utenlandske kjøpere', nieNumberGuide: 'NIE-nummerguide', nieNumberDesc: 'Slik får du ditt spanske skatte-ID', mortgageGuide: 'Låneguide', mortgageDesc: 'Finansieringsalternativer for ikke-residenter', areaGuide: 'Områdeguide:', discoverLifestyle: 'Opplev den lokale livsstilen',
    exploreMoreProperties: 'Utforsk flere eiendommer', allIn: 'Alle i', bedroomHomes: 'soveromshjem', under300k: 'Under €300k', keyReady: 'Nøkkelferdig',
    videoTour: 'Videovisning', multimedia: 'Multimedia', faq: 'Ofte stilte spørsmål',
    highDemandArea: 'Populært område', wontLastLong: 'Dette varer ikke lenge', qualityPropertiesIn: 'Kvalitetseiendommer i', sellingFast: 'selges raskt. Ta neste steg før noen andre gjør det.',
    requestFloorPlans: 'Be om plantegninger', getDetailedLayouts: 'Få detaljerte tegninger', scheduleVideoTour: 'Planlegg videovisning', seeItFromAnywhere: 'Se den uansett hvor du er', bookAViewing: 'Book visning', weArrangeEverything: 'Vi ordner alt',
    whatsappNow: 'WhatsApp nå', call: 'Ring', orLeaveDetails: 'Eller legg igjen kontaktinfo så tar vi kontakt', hideContactForm: 'Skjul kontaktskjema',
    similarProperties: 'Lignende eiendommer', buyingGuidesFor: 'Kjøpsguider for', viewAllProperties: 'Se alle eiendommer',
    guidePrice: 'Veiledende pris', whatsappUs: 'WhatsApp oss', builtBy: 'Bygget av', partOfDevelopment: 'Del av prosjekt',
    lastUpdated: 'Sist oppdatert:', priceVerified: 'Pris verifisert', share: 'Del:', linkCopied: 'Lenke kopiert!', copyLink: 'Kopier lenke',
    propertySpecialist: 'Eiendomsspesialist', reviews: '(50+ anmeldelser)', agentBio: 'Jeg hjelper internasjonale kjøpere med å finne sin drømmebolig på Costa Blanca. Jeg snakker engelsk, svensk og spansk.',
    needFinancing: 'Trenger du finansiering?', compareMortgage: 'Sammenlign lånerenter fra flere spanske banker.', getMortgageQuote: 'Få lånetilbud',
    getNewListingsFirst: 'Få nye boliger først', beFirstToKnow: 'Vær den første som får vite om nye eiendommer i',
    sendInquiry: 'Send forespørsel', sending: 'Sender...', thankYou: 'Takk!', inTouch24h: 'Vi tar kontakt innen 24 timer.', privacyNotice: 'Vi respekterer personvernet ditt. Dataene dine håndteres sikkert.', errorMessage: 'Noe gikk galt. Prøv igjen eller kontakt oss direkte.',
    yourName: 'Ditt navn', emailAddress: 'E-postadresse', phoneOptional: 'Telefon (valgfritt)', message: 'Melding',
    location: 'Beliggenhet',
  },
  pl: {
    home: 'Strona główna', properties: 'Nieruchomości', clickForFullscreen: 'Kliknij na pełny ekran',
    bedrooms: 'Sypialnie', bathrooms: 'Łazienki', sqmBuilt: 'm² Powierzchnia', sqmPlot: 'm² Działka',
    pool: 'Basen', seaView: 'Widok na morze', golfView: 'Widok na golf', garden: 'Ogród', terrace: 'Taras', parking: 'Parking',
    nearbyAmenities: 'Udogodnienia w pobliżu', beach: 'Plaża', supermarket: 'Supermarket', hospital: 'Szpital', schools: 'Szkoły', golfCourse: 'Pole golfowe', airport: 'Lotnisko',
    approxDistances: 'Przybliżone odległości. Skontaktuj się z nami po dokładną lokalizację.', viewOnMap: 'Pokaż na mapie', openInGoogleMaps: 'Otwórz w Google Maps', mapShowsApprox: 'Mapa pokazuje przybliżony obszar (~500m promień)', approxAreaShown: 'Pokazany przybliżony obszar. Skontaktuj się po dokładny adres.',
    aboutThisProperty: 'O tej nieruchomości', aboutArea: 'O', exploreAreaGuide: 'Przewodnik po okolicy', lifeIn: 'Życie w',
    investmentPotential: 'Potencjał inwestycyjny', estRentalIncome: 'Szacowany dochód z wynajmu', annual: 'Rocznie', monthly: 'Miesięcznie', weeklyPeak: 'Tygodniowo (szczyt)', basedOn: 'Na podstawie', occupancyRate: '% obłożenia',
    whyBuyThis: 'Dlaczego warto kupić tę nieruchomość?', allFeatures: 'Wszystkie cechy', helpfulResources: 'Przydatne zasoby',
    buyingProcessGuide: 'Przewodnik zakupu', buyingProcessDesc: 'Krok po kroku dla zagranicznych nabywców', nieNumberGuide: 'Przewodnik NIE', nieNumberDesc: 'Jak uzyskać hiszpański numer podatkowy', mortgageGuide: 'Przewodnik kredytowy', mortgageDesc: 'Opcje finansowania dla nierezydentów', areaGuide: 'Przewodnik:', discoverLifestyle: 'Poznaj lokalny styl życia',
    exploreMoreProperties: 'Odkryj więcej nieruchomości', allIn: 'Wszystkie w', bedroomHomes: 'sypialni', under300k: 'Poniżej 300 tys. €', keyReady: 'Pod klucz',
    videoTour: 'Wideo prezentacja', multimedia: 'Multimedia', faq: 'Najczęściej zadawane pytania',
    highDemandArea: 'Popularna lokalizacja', wontLastLong: 'To nie potrwa długo', qualityPropertiesIn: 'Nieruchomości premium w', sellingFast: 'sprzedają się szybko. Zrób następny krok.',
    requestFloorPlans: 'Poproś o rzuty', getDetailedLayouts: 'Uzyskaj szczegółowe plany', scheduleVideoTour: 'Zaplanuj wideoprezentację', seeItFromAnywhere: 'Zobacz z dowolnego miejsca', bookAViewing: 'Zarezerwuj wizytę', weArrangeEverything: 'Wszystko zorganizujemy',
    whatsappNow: 'WhatsApp teraz', call: 'Zadzwoń', orLeaveDetails: 'Lub zostaw dane, a my się skontaktujemy', hideContactForm: 'Ukryj formularz',
    similarProperties: 'Podobne nieruchomości', buyingGuidesFor: 'Przewodniki zakupu dla', viewAllProperties: 'Zobacz wszystkie nieruchomości',
    guidePrice: 'Cena orientacyjna', whatsappUs: 'WhatsApp', builtBy: 'Zbudowane przez', partOfDevelopment: 'Część inwestycji',
    lastUpdated: 'Ostatnia aktualizacja:', priceVerified: 'Cena zweryfikowana', share: 'Udostępnij:', linkCopied: 'Link skopiowany!', copyLink: 'Kopiuj link',
    propertySpecialist: 'Specjalista ds. nieruchomości', reviews: '(50+ opinii)', agentBio: 'Pomagam międzynarodowym nabywcom znaleźć idealną nieruchomość na Costa Blanca. Mówię po angielsku, szwedzku i hiszpańsku.',
    needFinancing: 'Potrzebujesz finansowania?', compareMortgage: 'Porównaj oferty kredytowe z wielu hiszpańskich banków.', getMortgageQuote: 'Uzyskaj ofertę kredytową',
    getNewListingsFirst: 'Otrzymuj nowe oferty jako pierwszy', beFirstToKnow: 'Bądź pierwszym, który dowie się o nowych nieruchomościach w',
    sendInquiry: 'Wyślij zapytanie', sending: 'Wysyłanie...', thankYou: 'Dziękujemy!', inTouch24h: 'Skontaktujemy się w ciągu 24 godzin.', privacyNotice: 'Szanujemy Twoją prywatność. Dane są bezpiecznie przetwarzane.', errorMessage: 'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się bezpośrednio.',
    yourName: 'Twoje imię', emailAddress: 'Adres e-mail', phoneOptional: 'Telefon (opcjonalnie)', message: 'Wiadomość',
    location: 'Lokalizacja',
  },
  ru: {
    home: 'Главная', properties: 'Недвижимость', clickForFullscreen: 'Нажмите для полноэкранного режима',
    bedrooms: 'Спальни', bathrooms: 'Ванные', sqmBuilt: 'м² Жилая', sqmPlot: 'м² Участок',
    pool: 'Бассейн', seaView: 'Вид на море', golfView: 'Вид на гольф', garden: 'Сад', terrace: 'Терраса', parking: 'Парковка',
    nearbyAmenities: 'Инфраструктура рядом', beach: 'Пляж', supermarket: 'Супермаркет', hospital: 'Больница', schools: 'Школы', golfCourse: 'Гольф-поле', airport: 'Аэропорт',
    approxDistances: 'Приблизительные расстояния. Свяжитесь с нами для точного местоположения.', viewOnMap: 'Показать на карте', openInGoogleMaps: 'Открыть в Google Maps', mapShowsApprox: 'Карта показывает приблизительную область (~500м радиус)', approxAreaShown: 'Показана приблизительная область. Свяжитесь для точного адреса.',
    aboutThisProperty: 'Об этой недвижимости', aboutArea: 'О районе', exploreAreaGuide: 'Путеводитель по району', lifeIn: 'Жизнь в',
    investmentPotential: 'Инвестиционный потенциал', estRentalIncome: 'Расчётный доход от аренды', annual: 'Годовой', monthly: 'Месячный', weeklyPeak: 'Недельный (пик)', basedOn: 'На основе', occupancyRate: '% заполняемости',
    whyBuyThis: 'Почему стоит купить эту недвижимость?', allFeatures: 'Все характеристики', helpfulResources: 'Полезные ресурсы',
    buyingProcessGuide: 'Руководство по покупке', buyingProcessDesc: 'Пошаговое руководство для иностранных покупателей', nieNumberGuide: 'Руководство по NIE', nieNumberDesc: 'Как получить испанский налоговый номер', mortgageGuide: 'Руководство по ипотеке', mortgageDesc: 'Варианты финансирования для нерезидентов', areaGuide: 'Путеводитель:', discoverLifestyle: 'Откройте для себя местный образ жизни',
    exploreMoreProperties: 'Ещё недвижимость', allIn: 'Все в', bedroomHomes: 'спален', under300k: 'До €300 тыс.', keyReady: 'Под ключ',
    videoTour: 'Видеотур', multimedia: 'Мультимедиа', faq: 'Часто задаваемые вопросы',
    highDemandArea: 'Востребованный район', wontLastLong: 'Это не продлится долго', qualityPropertiesIn: 'Качественная недвижимость в', sellingFast: 'продаётся быстро. Сделайте следующий шаг.',
    requestFloorPlans: 'Запросить планировки', getDetailedLayouts: 'Получить детальные планы', scheduleVideoTour: 'Запланировать видеотур', seeItFromAnywhere: 'Смотрите откуда угодно', bookAViewing: 'Забронировать просмотр', weArrangeEverything: 'Мы всё организуем',
    whatsappNow: 'WhatsApp сейчас', call: 'Позвонить', orLeaveDetails: 'Или оставьте контакты, и мы свяжемся с вами', hideContactForm: 'Скрыть форму',
    similarProperties: 'Похожая недвижимость', buyingGuidesFor: 'Руководства по покупке для', viewAllProperties: 'Все объекты недвижимости',
    guidePrice: 'Ориентировочная цена', whatsappUs: 'WhatsApp', builtBy: 'Застройщик', partOfDevelopment: 'Часть комплекса',
    lastUpdated: 'Обновлено:', priceVerified: 'Цена проверена', share: 'Поделиться:', linkCopied: 'Ссылка скопирована!', copyLink: 'Копировать ссылку',
    propertySpecialist: 'Специалист по недвижимости', reviews: '(50+ отзывов)', agentBio: 'Я помогаю международным покупателям найти идеальную недвижимость на Коста Бланка. Я говорю на английском, шведском и испанском.',
    needFinancing: 'Нужно финансирование?', compareMortgage: 'Сравните ставки по ипотеке от нескольких испанских банков.', getMortgageQuote: 'Получить предложение по ипотеке',
    getNewListingsFirst: 'Получайте новинки первыми', beFirstToKnow: 'Узнавайте первыми о новой недвижимости в',
    sendInquiry: 'Отправить запрос', sending: 'Отправка...', thankYou: 'Спасибо!', inTouch24h: 'Мы свяжемся с вами в течение 24 часов.', privacyNotice: 'Мы уважаем вашу конфиденциальность. Ваши данные обрабатываются безопасно.', errorMessage: 'Что-то пошло не так. Попробуйте снова или свяжитесь напрямую.',
    yourName: 'Ваше имя', emailAddress: 'Электронная почта', phoneOptional: 'Телефон (необязательно)', message: 'Сообщение',
    location: 'Расположение',
  },
};

function getStrings(lang?: string): PropertyStrings {
  return STRINGS[lang || 'en'] || STRINGS.en;
}

// ====================
// HELPER FUNCTIONS
// ====================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function getGoogleMapsUrl(property: UnifiedProperty): string {
  // Show town/area instead of exact location - users should contact for exact address
  const town = property.town || 'Costa Blanca';
  const region = property.region || 'Alicante';
  return `https://www.google.com/maps/search/${encodeURIComponent(town + ', ' + region + ', Spain')}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Estimated distances by town (km) - these are typical for each area
const TOWN_AMENITIES: Record<string, { beach: string; airport: string; hospital: string; supermarket: string; golf: string; school: string }> = {
  'torrevieja': { beach: '0.5-3', airport: '50', hospital: '2', supermarket: '0.5', golf: '10', school: '2' },
  'orihuela costa': { beach: '0.5-2', airport: '55', hospital: '15', supermarket: '1', golf: '5', school: '3' },
  'guardamar': { beach: '1-3', airport: '45', hospital: '20', supermarket: '1', golf: '10', school: '2' },
  'algorfa': { beach: '15', airport: '40', hospital: '20', supermarket: '4', golf: '2', school: '5' },
  'villamartin': { beach: '8', airport: '50', hospital: '15', supermarket: '2', golf: '1', school: '5' },
  'javea': { beach: '2-5', airport: '90', hospital: '5', supermarket: '1', golf: '15', school: '3' },
  'moraira': { beach: '1-3', airport: '95', hospital: '15', supermarket: '1', golf: '10', school: '5' },
  'calpe': { beach: '0.5-2', airport: '80', hospital: '10', supermarket: '0.5', golf: '15', school: '2' },
  'benidorm': { beach: '0.5-2', airport: '55', hospital: '3', supermarket: '0.5', golf: '10', school: '1' },
  'altea': { beach: '1-3', airport: '65', hospital: '15', supermarket: '1', golf: '12', school: '2' },
  'denia': { beach: '1-5', airport: '100', hospital: '5', supermarket: '1', golf: '20', school: '2' },
};

function getAmenityDistances(town: string): { beach: string; airport: string; hospital: string; supermarket: string; golf: string; school: string } {
  const normalizedTown = town.toLowerCase().trim();
  
  // Try exact match
  if (TOWN_AMENITIES[normalizedTown]) {
    return TOWN_AMENITIES[normalizedTown];
  }
  
  // Try partial match
  for (const [key, data] of Object.entries(TOWN_AMENITIES)) {
    if (normalizedTown.includes(key) || key.includes(normalizedTown)) {
      return data;
    }
  }
  
  // Default distances for Costa Blanca
  return { beach: '5-15', airport: '50-70', hospital: '10-20', supermarket: '2-5', golf: '10-20', school: '5-10' };
}

// ====================
// SUB-COMPONENTS
// ====================

// Price Growth Chart (Bar Chart)
function PriceGrowthChart({ data }: { data: { year: string; price: number }[] }) {
  const maxPrice = Math.max(...data.map((d) => d.price));
  
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-primary-900 mb-4">Costa Blanca Price Growth (€/m²)</h4>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.year} className="flex items-center gap-3">
            <span className="w-12 text-sm text-warm-600">{item.year}</span>
            <div className="flex-1 bg-warm-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(item.price / maxPrice) * 100}%` }}
              >
                <span className="text-xs text-white font-medium">€{item.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Rental Yield Comparison Chart
function RentalYieldChart({ data }: { data: { area: string; yield: number; color: string }[] }) {
  const maxYield = Math.max(...data.map((d) => d.yield));
  
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-primary-900 mb-4">Rental Yield by Area (%)</h4>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.area} className="flex items-center gap-3">
            <span className="w-28 text-sm text-warm-600 truncate">{item.area}</span>
            <div className="flex-1 bg-warm-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end pr-2"
                style={{ 
                  width: `${(item.yield / maxYield) * 100}%`,
                  backgroundColor: item.color 
                }}
              >
                <span className="text-xs text-white font-medium">{item.yield}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Accordion Item
function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void
}) {
  return (
    <div className="border-b border-warm-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left hover:text-accent-600 transition-colors"
      >
        <span className="font-medium text-primary-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-accent-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-warm-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

// Property Card for Similar Properties — larger format
function PropertyCard({ property, basePath = '', strings }: { property: UnifiedProperty; basePath?: string; strings?: PropertyStrings }) {
  const imageUrl = property.images?.[0]?.url || '/placeholder-property.jpg';
  const s = strings || STRINGS.en;

  return (
    <Link
      href={`${basePath}/properties/${property.reference || property.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-warm-200 group"
    >
      <div className="relative h-56 md:h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${property.propertyType} in ${property.town}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {property.price > 0 && (
          <div className="absolute bottom-3 left-3 bg-primary-900/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg font-bold">
            {formatPrice(property.price)}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-accent-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold uppercase">
          {property.propertyType || 'Property'}
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-bold text-primary-900 mb-2 text-lg line-clamp-1 group-hover:text-accent-700 transition-colors">
          {property.propertyType} in {property.town}
        </h4>
        <div className="flex items-center gap-4 text-sm text-warm-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            {property.bedrooms} beds
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
            {property.bathrooms} baths
          </span>
          {property.builtArea > 0 && (
            <span>{property.builtArea}m²</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ====================
// MAIN COMPONENT
// ====================

export default function PropertyPageClient({ property, content, similarProperties, linkingData, lang }: PropertyPageClientProps) {
  // Language-aware path prefix (e.g., '/fr' for French, '' for English)
  const basePath = lang && lang !== 'en' ? `/${lang}` : '';
  const s = getStrings(lang);

  // State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showUrgencyForm, setShowUrgencyForm] = useState(false);
  // Form state removed — now using LeadForm component with Airtable integration

  // Data
  const images = property.images || [];
  const mainImage = images[0]?.url || '/placeholder-property.jpg';
  const thumbnails = images.slice(1, 5);
  const mapsUrl = getGoogleMapsUrl(property);
  const townSlug = slugify(property.town || 'costa-blanca');
  
  // Handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => setLightboxOpen(false);
  
  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const nextImage = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  // Form handlers removed — now using LeadForm component with Airtable integration

  return (
    <main className="min-h-screen bg-warm-50">
      {/* ==================== LIGHTBOX ==================== */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-accent-400 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-accent-400 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="max-w-5xl max-h-[85vh] relative">
            <Image
              src={images[lightboxIndex]?.url || mainImage}
              alt={content.imageAltTags[lightboxIndex] || `Property image ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh]"
              priority
            />
          </div>
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-accent-400 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ==================== BREADCRUMB ==================== */}
        <nav className="flex items-center gap-2 text-sm text-warm-500 mb-6 flex-wrap">
          <Link href={`${basePath}/`} className="hover:text-accent-600">{s.home}</Link>
          <span>›</span>
          <Link href={`${basePath}/properties`} className="hover:text-accent-600">{s.properties}</Link>
          {linkingData.development && (
            <>
              <span>›</span>
              <Link href={`${basePath}/developments/${linkingData.development.slug}`} className="hover:text-accent-600">
                {linkingData.development.name}
              </Link>
            </>
          )}
          <span>›</span>
          <span className="text-warm-700">{property.propertyType} in {property.town}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== MAIN CONTENT ==================== */}
          <div className="lg:col-span-2 space-y-8">
            {/* ==================== IMAGE GALLERY ==================== */}
            <div className="space-y-3">
              {/* Main Image with inline arrows */}
              <div
                className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(galleryIndex)}
              >
                <Image
                  src={images[galleryIndex]?.url || mainImage}
                  alt={content.imageAltTags[galleryIndex] || content.seoTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {/* Inline navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex(prev => prev === 0 ? images.length - 1 : prev - 1); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-primary-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-10"
                      aria-label="Previous photo"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex(prev => prev === images.length - 1 ? 0 : prev + 1); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-primary-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-10"
                      aria-label="Next photo"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Photo counter */}
                <div className="absolute bottom-4 right-4 bg-primary-900/80 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                  <span>{galleryIndex + 1} / {images.length}</span>
                  <span className="text-white/60">|</span>
                  <span>{s.clickForFullscreen}</span>
                </div>
              </div>
              
              {/* Thumbnails */}
              {thumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {thumbnails.map((img, i) => (
                    <div
                      key={i}
                      className="relative h-20 md:h-24 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(i + 1)}
                    >
                      <Image
                        src={img.url}
                        alt={content.imageAltTags[i + 1] || `Property image ${i + 2}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 25vw, 15vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ==================== TITLE + LOCATION + PRICE ==================== */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 mb-3">
                {content.seoTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-warm-600 mb-4">
                <span className="font-medium">{property.town}, {property.province || 'Alicante'}</span>
                <span className="text-warm-300">•</span>
                <Link
                  href={`${basePath}/properties/${slugify(property.propertyType || 'property')}s`}
                  className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-accent-200 transition-colors"
                >
                  {property.propertyType || 'Property'}
                </Link>
                {linkingData.development && (
                  <>
                    <span className="text-warm-300">•</span>
                    <Link
                      href={`${basePath}/developments/${linkingData.development.slug}`}
                      className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {linkingData.development.name}
                    </Link>
                  </>
                )}
                {linkingData.builder && (
                  <>
                    <span className="text-warm-300">•</span>
                    <Link
                      href={`${basePath}/builders/${linkingData.builder.slug}`}
                      className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {s.builtBy} {linkingData.builder.name}
                    </Link>
                  </>
                )}
                <span className="text-warm-300">•</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                >
                  {s.viewOnMap}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              {property.price && (
                <div>
                  <div className="text-3xl font-bold text-primary-900">
                    {formatPrice(property.price)}
                  </div>
                  {content.priceContext && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-warm-600">
                        EUR {content.priceContext.pricePerSqm.toLocaleString()}/m²
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        content.priceContext.percentageDiff < -5
                          ? 'bg-success-100 text-success-700'
                          : content.priceContext.percentageDiff > 10
                            ? 'bg-accent-100 text-accent-700'
                            : 'bg-warm-100 text-warm-600'
                      }`}>
                        {content.priceContext.comparisonText}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ==================== DEVELOPMENT & BUILDER BANNER ==================== */}
            {(linkingData.development || linkingData.builder) && (
              <div className="bg-primary-900 rounded-xl p-4 mb-4 flex flex-wrap items-center gap-4">
                {linkingData.development && (
                  <Link
                    href={`${basePath}/developments/${linkingData.development.slug}`}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition-colors flex-1 min-w-[200px]"
                  >
                    <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-primary-300 uppercase tracking-wider">{s.partOfDevelopment}</div>
                      <div className="text-white font-semibold">{linkingData.development.name}</div>
                      {linkingData.development.status && (
                        <div className="text-xs text-accent-400">{linkingData.development.status}</div>
                      )}
                    </div>
                    <svg className="w-5 h-5 text-primary-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
                {linkingData.builder && (
                  <Link
                    href={`${basePath}/builders/${linkingData.builder.slug}`}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition-colors flex-1 min-w-[200px]"
                  >
                    <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-primary-300 uppercase tracking-wider">{s.builtBy}</div>
                      <div className="text-white font-semibold">{linkingData.builder.name}</div>
                    </div>
                    <svg className="w-5 h-5 text-primary-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            )}

            {/* Last Updated Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-warm-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{s.lastUpdated} {content.lastUpdated}</span>
                <span className="text-success-600">• {s.priceVerified}</span>
              </div>
              
              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-warm-500 hidden sm:inline">{s.share}</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this property in ${property.town}: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-success-500 hover:bg-success-600 rounded-full flex items-center justify-center transition-colors"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${property.propertyType} in ${property.town}`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
                  title="Share on X"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: content.seoTitle,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(s.linkCopied);
                    }
                  }}
                  className="w-8 h-8 bg-warm-200 hover:bg-warm-300 rounded-full flex items-center justify-center transition-colors"
                  title={s.copyLink}
                >
                  <svg className="w-4 h-4 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ==================== QUICK STATS ==================== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.bedrooms || 0}</div>
                <div className="text-sm text-warm-500">{s.bedrooms}</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.bathrooms || 0}</div>
                <div className="text-sm text-warm-500">{s.bathrooms}</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.builtArea || 0}</div>
                <div className="text-sm text-warm-500">{s.sqmBuilt}</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-warm-100">
                <div className="text-2xl font-bold text-primary-900">{property.plotArea || 0}</div>
                <div className="text-sm text-warm-500">{s.sqmPlot}</div>
              </div>
            </div>

            {/* ==================== FEATURE CHIPS ==================== */}
            <div className="flex flex-wrap gap-2">
              {property.hasPool && (
                <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {s.pool}
                </span>
              )}
              {property.hasSeaview && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {s.seaView}
                </span>
              )}
              {property.hasGolfview && (
                <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {s.golfView}
                </span>
              )}
              {property.hasGarden && (
                <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {s.garden}
                </span>
              )}
              {property.hasTerrace && (
                <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {s.terrace}
                </span>
              )}
              {property.hasParking && (
                <span className="bg-warm-100 text-warm-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {s.parking}
                </span>
              )}
            </div>

            {/* ==================== NEARBY AMENITIES ==================== */}
            {(() => {
              const amenities = getAmenityDistances(property.town || 'Costa Blanca');
              return (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
                  <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {s.nearbyAmenities}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16" transform="rotate(45 12 12)" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">{s.beach}</div>
                        <div className="text-sm text-warm-500">{amenities.beach} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
                      <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">{s.supermarket}</div>
                        <div className="text-sm text-warm-500">{amenities.supermarket} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">{s.hospital}</div>
                        <div className="text-sm text-warm-500">{amenities.hospital} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent-50 rounded-lg">
                      <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">{s.schools}</div>
                        <div className="text-sm text-warm-500">{amenities.school} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
                      <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">{s.golfCourse}</div>
                        <div className="text-sm text-warm-500">{amenities.golf} km</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-900">{s.airport}</div>
                        <div className="text-sm text-warm-500">{amenities.airport} km</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-warm-400 mt-4 text-center">
                    {s.approxDistances}
                  </p>
                </div>
              );
            })()}

            {/* ==================== LOCATION MAP ==================== */}
            {property.latitude > 0 && property.longitude !== 0 && (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-warm-100">
                <div className="p-6 pb-3">
                  <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
                    <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location — {property.town}
                  </h2>
                  <p className="text-sm text-warm-500 mt-1">{s.approxAreaShown}</p>
                </div>
                <div className="relative h-[350px] w-full">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.006},${property.latitude - 0.005},${property.longitude + 0.006},${property.latitude + 0.005}&layer=mapnik&marker=${property.latitude},${property.longitude}`}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    title={`Map of ${property.propertyType} in ${property.town}`}
                  />
                </div>
                <div className="p-4 bg-warm-50 flex items-center justify-between">
                  <span className="text-xs text-warm-500">{s.mapShowsApprox}</span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                  >
                    {s.openInGoogleMaps}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* ==================== MAIN DESCRIPTION ==================== */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
              <h2 className="text-xl font-bold text-primary-900 mb-4">{s.aboutThisProperty}</h2>
              <div className="prose prose-warm max-w-none">
                {content.mainDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-warm-600 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* ==================== AREA SECTION ==================== */}
            {content.areaSection && (
              <div className="bg-gradient-to-br from-primary-50 to-warm-100 border border-primary-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  About {property.town || 'This Location'}
                </h2>
                <div className="text-warm-600 leading-relaxed">
                  {content.areaSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
                {property.town && (
                  <Link
                    href={`${basePath}/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 mt-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Explore {property.town} Area Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            )}

            {/* ==================== LIFESTYLE SECTION ==================== */}
            {content.lifestyleSection && (
            <div className="bg-gradient-to-br from-accent-50 to-warm-100 border border-accent-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Life in {property.town || 'Costa Blanca'}
              </h2>
              <div className="text-warm-600 leading-relaxed">
                {content.lifestyleSection.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
            </div>
            )}

            {/* ==================== INVESTMENT SECTION ==================== */}
            <div className="bg-gradient-to-br from-success-50 to-warm-100 border border-success-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {s.investmentPotential}
              </h2>

              {content.investmentSection && (
              <div className="text-warm-600 leading-relaxed mb-6">
                {content.investmentSection.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
              )}

              {/* Rental Income Estimate */}
              <div className="bg-white/70 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-primary-900 mb-3">{s.estRentalIncome}</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-success-600">
                      {formatPrice(content.rentalIncomeEstimate.annual)}
                    </div>
                    <div className="text-sm text-warm-500">{s.annual}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-success-600">
                      {formatPrice(content.rentalIncomeEstimate.monthly)}
                    </div>
                    <div className="text-sm text-warm-500">{s.monthly}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-success-600">
                      {formatPrice(content.rentalIncomeEstimate.weekly)}
                    </div>
                    <div className="text-sm text-warm-500">{s.weeklyPeak}</div>
                  </div>
                </div>
                <p className="text-xs text-warm-400 mt-2 text-center">
                  Based on {content.rentalIncomeEstimate.occupancyRate}% occupancy rate
                </p>
              </div>
              
              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <PriceGrowthChart data={content.priceChartData} />
                <RentalYieldChart data={content.rentalYieldData} />
              </div>
              
              {/* Mortgage Partner CTA — Habeno for <€1M, Lionsgate for €1M+ */}
              <a
                href={property.price && property.price >= 1000000
                  ? 'https://www.lionsgatecapital.com/contact?ref=newbuildhomescostablanca'
                  : HABENO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block bg-gradient-to-r from-primary-800 to-primary-900 hover:from-primary-700 hover:to-primary-800 rounded-xl p-6 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-white">
                        {property.price && property.price >= 1000000 ? 'Premium Mortgage Solutions' : 'Get Your Best Mortgage Rate'}
                      </h4>
                      <svg className="w-5 h-5 text-accent-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <p className="text-primary-200 text-sm mb-2">
                      {property.price && property.price >= 1000000
                        ? 'Our premium partner Lionsgate Capital specializes in high-value property financing across Spain.'
                        : 'Our partner Habeno compares mortgage offers from multiple Spanish banks to find you the best rate.'}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-accent-400 text-sm font-semibold">
                      <span>{property.price && property.price >= 1000000 ? 'Contact Lionsgate Capital' : 'Start Free Mortgage Comparison'}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* ==================== WHY BUY THIS PROPERTY ==================== */}
            <div className="bg-gradient-to-br from-primary-50 to-warm-100 border border-primary-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {s.whyBuyThis}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.sellingPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-primary-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-warm-600 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== FEATURES LIST ==================== */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
                <h2 className="text-xl font-bold text-primary-900 mb-4">{s.allFeatures}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-warm-600">
                      <svg className="w-4 h-4 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== HELPFUL RESOURCES ==================== */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
              <h2 className="text-xl font-bold text-primary-900 mb-4">{s.helpfulResources}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`${basePath}/guides/buying-process`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">{s.buyingProcessGuide}</div>
                    <div className="text-sm text-warm-500">{s.buyingProcessDesc}</div>
                  </div>
                </Link>

                <Link href={`${basePath}/guides/nie-number`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">{s.nieNumberGuide}</div>
                    <div className="text-sm text-warm-500">{s.nieNumberDesc}</div>
                  </div>
                </Link>

                <Link href={`${basePath}/guides/mortgages`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">{s.mortgageGuide}</div>
                    <div className="text-sm text-warm-500">{s.mortgageDesc}</div>
                  </div>
                </Link>

                <Link href={`${basePath}/areas/${townSlug}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors group">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                    <svg className="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">{s.areaGuide} {property.town || 'Costa Blanca'}</div>
                    <div className="text-sm text-warm-500">{s.discoverLifestyle}</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* ==================== EXPLORE MORE PROPERTIES ==================== */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
              <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {s.exploreMoreProperties}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.town && (
                  <Link
                    href={`${basePath}/properties/${slugify(property.town)}`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-sm font-medium text-primary-800">{s.allIn} {property.town}</span>
                  </Link>
                )}
                {property.propertyType && (
                  <Link
                    href={`${basePath}/properties/${slugify(property.propertyType)}s`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-accent-50 hover:bg-accent-100 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-sm font-medium text-accent-800">All {property.propertyType}s</span>
                  </Link>
                )}
                {property.bedrooms > 0 && (
                  <Link
                    href={`${basePath}/properties/${property.bedrooms}-bed`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-warm-100 hover:bg-warm-200 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-warm-700">{property.bedrooms} {s.bedroomHomes}</span>
                  </Link>
                )}
                {property.price && property.price < 300000 && (
                  <Link
                    href={`${basePath}/properties/under-300k`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-success-50 hover:bg-success-100 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-success-700">Under €300k</span>
                  </Link>
                )}
                <Link
                  href={`${basePath}/properties/key-ready`}
                  className="flex items-center gap-2 p-3 rounded-lg bg-success-50 hover:bg-success-100 transition-colors group"
                >
                  <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span className="text-sm font-medium text-success-700">{s.keyReady}</span>
                </Link>
                {property.region && (
                  <Link
                    href={`${basePath}/properties/${slugify(property.region)}`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="text-sm font-medium text-primary-800">{property.region}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Blog articles section moved below Similar Properties */}

            {/* ==================== VIDEO TOUR ==================== */}
            {linkingData.propertyVideo && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-accent-500 rounded-full" />
                  <div>
                    <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                      {s.multimedia}
                    </span>
                    <h2 className="text-xl font-light text-primary-900">{s.videoTour}</h2>
                  </div>
                </div>
                <VideoCard
                  slug={linkingData.propertyVideo.slug}
                  title={linkingData.propertyVideo.title}
                  youtubeId={linkingData.propertyVideo.youtubeId}
                  description={linkingData.propertyVideo.description}
                  category={linkingData.propertyVideo.category}
                  duration={linkingData.propertyVideo.duration}
                  price={linkingData.propertyVideo.price}
                  variant="hero"
                />
              </div>
            )}

            {/* ==================== FAQ ACCORDION ==================== */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
              <h2 className="text-xl font-bold text-primary-900 mb-4">{s.faq}</h2>
              <div className="divide-y divide-warm-200">
                {content.faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqIndex === i}
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  />
                ))}
              </div>
            </div>

            {/* ==================== THIS WON'T LAST LONG — URGENCY + ACTIONS ==================== */}
            <div className="bg-gradient-to-br from-accent-600 via-accent-500 to-accent-600 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 backdrop-blur-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {s.highDemandArea}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{s.wontLastLong}</h2>
                <p className="text-white/90 text-lg max-w-xl mx-auto">
                  {s.qualityPropertiesIn} {property.town} {s.sellingFast}
                </p>
              </div>

              {/* Action Cards Grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Request Floor Plans */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-5 text-center transition-all group hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-primary-900 mb-1">{s.requestFloorPlans}</h4>
                  <p className="text-sm text-warm-500">{s.getDetailedLayouts}</p>
                </a>

                {/* Schedule Video Visit */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-5 text-center transition-all group hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-primary-900 mb-1">{s.scheduleVideoTour}</h4>
                  <p className="text-sm text-warm-500">{s.seeItFromAnywhere}</p>
                </a>

                {/* Book a Viewing */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-5 text-center transition-all group hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-success-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-primary-900 mb-1">{s.bookAViewing}</h4>
                  <p className="text-sm text-warm-500">{s.weArrangeEverything}</p>
                </a>
              </div>

              {/* Contact Row */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-success-600 hover:bg-success-700 text-white py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-lg shadow-md"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {s.whatsappNow}
                </a>
                <a
                  href={PHONE_TEL}
                  className="flex-1 bg-primary-900 hover:bg-primary-800 text-white py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-lg shadow-md"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {PHONE_NUMBER}
                </a>
              </div>

              {/* Expandable Lead Form */}
              <div className="text-center">
                <button
                  onClick={() => setShowUrgencyForm(!showUrgencyForm)}
                  className="text-white/90 hover:text-white text-sm font-medium underline underline-offset-2 transition-colors"
                >
                  {showUrgencyForm ? 'Hide contact form' : 'Or leave your details and we\'ll contact you'}
                </button>
                {showUrgencyForm && (
                  <div className="mt-4 bg-white rounded-xl p-5">
                    <LeadForm
                      area={property.town || ''}
                      language={lang || 'en'}
                      propertyType={property.propertyType || ''}
                      formType="Property Inquiry"
                      sourcePage={`/properties/${property.reference || property.id}`}
                      budgetRange={property.price ? `€${property.price.toLocaleString()}` : ''}
                      propertyReference={property.reference || property.id}
                      customMessage={`I'm interested in this ${property.propertyType?.toLowerCase() || 'property'} (Ref: ${property.reference || property.id})`}
                      compact={true}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ==================== SIMILAR PROPERTIES (3 cards, larger) ==================== */}
            {similarProperties.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.similarProperties}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {similarProperties.slice(0, 3).map((prop) => (
                    <PropertyCard key={prop.id} property={prop} basePath={basePath} strings={s} />
                  ))}
                </div>
              </div>
            )}

            {/* ==================== RELATED BLOG ARTICLES ==================== */}
            {linkingData.relatedArticles.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-100">
                <h2 className="text-2xl font-bold text-primary-900 mb-5 flex items-center gap-2">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {s.buyingGuidesFor} {property.town || 'Costa Blanca'}
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {linkingData.relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`${basePath}/blog/${article.slug}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-warm-50 hover:bg-accent-50 transition-colors group border border-warm-100"
                    >
                      <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-200 transition-colors">
                        <svg className="w-6 h-6 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-primary-900 group-hover:text-accent-700 transition-colors line-clamp-1">
                          {article.title}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-warm-500 mt-0.5">
                          <span className="bg-warm-100 px-2 py-0.5 rounded text-xs">{article.category}</span>
                          <span>{article.readTime} min read</span>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-warm-400 group-hover:text-accent-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== VIEW ALL PROPERTIES CTA ==================== */}
            <div className="text-center">
              <Link
                href={`${basePath}/properties`}
                className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                {s.viewAllProperties}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ==================== SIDEBAR ==================== */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto space-y-6 scrollbar-thin pr-1">
              {/* Agent Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-warm-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={AGENT_PHOTO}
                      alt="Oskar Peterson - Property Specialist"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900">Oskar Peterson</h4>
                    <p className="text-sm text-warm-500">{s.propertySpecialist}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-warm-400 ml-1">{s.reviews}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-warm-600">
                  {s.agentBio}
                </p>
              </div>

              {/* Contact Card */}
              <div id="lead-form-section" className="bg-gradient-to-br from-accent-50 to-warm-100 rounded-xl p-5 shadow-sm">
                {property.price && (
                  <div className="text-center mb-4 pb-4 border-b border-warm-200">
                    <div className="text-3xl font-bold text-primary-900">
                      {formatPrice(property.price)}
                    </div>
                    <p className="text-sm text-warm-500">{s.guidePrice}</p>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-success-600 hover:bg-success-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {s.whatsappUs}
                  </a>
                  
                  <a
                    href={PHONE_TEL}
                    className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call: {PHONE_NUMBER}
                  </a>
                </div>

                {/* Lead Form — Airtable connected */}
                <LeadForm
                  area={property.town || ''}
                  language={lang || 'en'}
                  propertyType={property.propertyType || ''}
                  formType="Property Inquiry"
                  sourcePage={`/properties/${property.reference || property.id}`}
                  budgetRange={property.price ? `€${property.price.toLocaleString()}` : ''}
                  propertyReference={property.reference || property.id}
                  customMessage={`I'm interested in this ${property.propertyType?.toLowerCase() || 'property'} (Ref: ${property.reference || property.id})`}
                  compact={true}
                />
              </div>

              {/* Mortgage CTA — Habeno or Lionsgate */}
              <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2">
                  {property.price && property.price >= 1000000 ? 'Premium Financing' : s.needFinancing}
                </h4>
                <p className="text-sm text-primary-200 mb-3">
                  {property.price && property.price >= 1000000
                    ? 'Lionsgate Capital specializes in high-value property mortgages.'
                    : s.compareMortgage}
                </p>
                <a
                  href={property.price && property.price >= 1000000
                    ? 'https://www.lionsgatecapital.com/contact?ref=newbuildhomescostablanca'
                    : HABENO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {property.price && property.price >= 1000000 ? 'Contact Lionsgate' : s.getMortgageQuote}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Newsletter CTA — prominent design */}
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl p-5 text-white">
                <h4 className="font-bold text-lg mb-1">{s.getNewListingsFirst}</h4>
                <p className="text-white/90 text-sm mb-3">
                  {s.beFirstToKnow} {property.town || 'Costa Blanca'}.
                </p>
                <NewsletterCTA
                  type="properties"
                  areaName={property.town || ''}
                  language={lang || 'en'}
                  sourcePage={`/properties/${property.reference || property.id}`}
                />
              </div>

              {/* Sidebar kept clean — Video Visit + Floorplan CTAs moved to main content "This Won't Last Long" section */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
