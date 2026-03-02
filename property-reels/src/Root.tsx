import { Composition, Still, staticFile } from "remotion";
import { PropertyReel, propertyReelSchema } from "./components/PropertyReel";
import { PropertyCarousel, propertyCarouselSchema } from "./components/PropertyCarousel";
import { LogoIntro, logoIntroSchema } from "./components/LogoIntro";
import { PropertyCard, propertyCardSchema } from "./components/PropertyCard";
import { AreaShowcase, areaShowcaseSchema } from "./components/AreaShowcase";
import {
  AreaGuideReel,
  areaGuideReelSchema,
  AREA_GUIDE_TOTAL_FRAMES,
} from "./components/AreaGuideReel";
import {
  PropertySpotlightCinematic,
  propertySpotlightCinematicSchema,
  PROPERTY_SPOTLIGHT_CINEMATIC_FRAMES,
} from "./components/PropertySpotlightCinematic";
import {
  PropertySpotlightRapid,
  propertySpotlightRapidSchema,
  PROPERTY_SPOTLIGHT_RAPID_FRAMES,
} from "./components/PropertySpotlightRapid";
import {
  CuratedListReel,
  curatedListReelSchema,
  calculateCuratedListDuration,
} from "./components/CuratedListReel";
import {
  DayInTheLifeReel,
  dayInTheLifeReelSchema,
  calculateDayInTheLifeDuration,
} from "./components/DayInTheLifeReel";
import {
  BuyerPersonaReel,
  buyerPersonaReelSchema,
  calculateBuyerPersonaDuration,
} from "./components/BuyerPersonaReel";
import {
  BlogSummaryReel,
  blogSummaryReelSchema,
  calculateBlogSummaryDuration,
} from "./components/BlogSummaryReel";
import {
  InvestmentCaseReel,
  investmentCaseReelSchema,
  INVESTMENT_CASE_REEL_FRAMES,
} from "./components/InvestmentCaseReel";

/**
 * Remotion Root - Registers all video compositions
 *
 * TEMPLATE LIBRARY:
 * ┌───────────────────────────┬──────────┬───────────┬──────────────────────────┐
 * │ Template                  │ Ratio    │ Duration  │ Content Source            │
 * ├───────────────────────────┼──────────┼───────────┼──────────────────────────┤
 * │ AreaGuideReel             │ 9:16     │ ~33s      │ Area JSON (96 areas)     │
 * │ PropertySpotlightCinema   │ 9:16     │ ~35s      │ Property JSON (1,246)    │
 * │ PropertySpotlightRapid    │ 9:16     │ 15s       │ Property JSON + images   │
 * │ CuratedListReel           │ 9:16     │ dynamic   │ Curated property sets    │
 * │ DayInTheLifeReel          │ 9:16     │ ~30s      │ Area JSON timeline       │
 * │ BuyerPersonaReel          │ 9:16     │ ~20s      │ Static personas          │
 * │ BlogSummaryReel           │ 9:16     │ ~25s      │ Blog JSON (203 articles) │
 * │ InvestmentCaseReel        │ 9:16     │ 15s       │ Area JSON investment     │
 * │ PropertyReel (legacy)     │ 9:16     │ 15s       │ Single property          │
 * │ PropertyCarousel (legacy) │ 9:16     │ dynamic   │ Multi-property           │
 * └───────────────────────────┴──────────┴───────────┴──────────────────────────┘
 *
 * PLATFORM SPECS:
 * TikTok: 9:16, 15-60s, fast cuts + hook
 * Instagram Reels: 9:16, 15-90s, captions help
 * YouTube Shorts: 9:16, up to 60s, more polished
 * YouTube: 16:9, 3-15min, longer + detailed
 * Facebook Reels: 9:16, 15-60s, slightly slower
 */

// Video assets are symlinked into public/videos/
// Use staticFile() for Studio preview, absolute paths for CLI render
const vid = (name: string) => staticFile(`videos/${name}`);

// Sample property images for demos
const SAMPLE_IMAGES = [
  "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
  "https://fotos15.apinmo.com/7515/24512307/23-2.jpg",
  "https://fotos15.apinmo.com/7515/24512307/23-3.jpg",
  "https://fotos15.apinmo.com/7515/24512307/23-4.jpg",
  "https://fotos15.apinmo.com/7515/27424204/10-1.jpg",
  "https://fotos15.apinmo.com/7515/27424199/7-1.jpg",
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ═══════════════════════════════════════════
          NEW TEMPLATE LIBRARY
          ═══════════════════════════════════════════ */}

      {/* Area Guide Reel — Guardamar del Segura sample */}
      <Composition
        id="AreaGuideReel"
        component={AreaGuideReel}
        schema={areaGuideReelSchema}
        durationInFrames={AREA_GUIDE_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          areaName: "Guardamar del Segura",
          region: "Costa Blanca South",
          heroIntro:
            "Where the River Segura meets the Mediterranean, a remarkable landscape unfolds. 11 km of natural beaches backed by protected dunes, pine forests, and a genuine Spanish community.",
          lifestyleHighlights: [
            "11 km of natural beaches backed by protected dunes",
            "Unique pine forest — walking and cycling trails",
            "Flamingos at La Mata salt lakes (5 km)",
            "Just 28 minutes from Alicante Airport",
          ],
          amenities: {
            beach: "Playa Centro — 5 min walk, Blue Flag award",
            golf: "La Finca Golf — 15 min drive, 18 holes",
            dining: "Traditional Spanish restaurants — fresh fish, paella, tapas",
            healthcare: "Hospital de Torrevieja — 12 min drive, English-speaking staff",
            airport: "Alicante Airport — 28 min drive",
          },
          investmentData: {
            rentalYield: "5-7%",
            appreciation: "4-6%",
            priceFrom: 175000,
          },
          dayInTheLife: [
            { time: "07:00", activity: "Pine Forest Walk", description: "Morning walk through protected dune system" },
            { time: "08:30", activity: "Beach Breakfast", description: "Coffee at a beachfront chiringuito" },
            { time: "10:00", activity: "Beach Swimming", description: "Pristine waters with fewer crowds" },
            { time: "12:30", activity: "Market & Lunch", description: "Wednesday market or traditional Spanish restaurant" },
          ],
          videoHero: vid("general beach with palm.mp4"),
          videoLifestyle: vid("general _ walking on beach.mp4"),
          videoAmenities: vid("Golf alicante.mp4"),
          videoInvestment: vid("modern 1.mp4"),
          videoDayInLife: vid("sunrise.mp4"),
          videoCTA: vid("sunset.mp4"),
          websiteUrl: "newbuildhomescostablanca.com",
          musicTrack: "music/chill.mp3",
        }}
      />

      {/* Property Spotlight — Cinematic (~35s, calm & detailed) */}
      <Composition
        id="PropertySpotlightCinematic"
        component={PropertySpotlightCinematic}
        schema={propertySpotlightCinematicSchema}
        durationInFrames={PROPERTY_SPOTLIGHT_CINEMATIC_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          propertyRef: "N9499",
          images: SAMPLE_IMAGES.slice(0, 4),
          title: "2 Bed Penthouse Guardamar del Segura",
          price: 249000,
          bedrooms: 2,
          bathrooms: 2,
          area: 80,
          town: "Guardamar del Segura",
          province: "Alicante",
          type: "Penthouse",
          features: ["Communal Pool", "Golf View", "Rooftop Terrace", "Parking", "Air Conditioning", "Storage Room"],
          description: "Stunning new build penthouse with panoramic views over the Guardamar coastline. Walking distance to pristine beaches.",
          nearbyAmenities: {
            beach: "Playa Centro — 5 min walk",
            golf: "La Finca Golf — 15 min",
            airport: "Alicante Airport — 28 min",
            restaurants: "Beachfront dining — 3 min walk",
          },
          rentalYield: "6-7%",
          pricePerSqm: 3113,
          videoLocation: vid("general beach with palm.mp4"),
          videoInvestment: vid("modern 1.mp4"),
          videoCTA: vid("sunset.mp4"),
          websiteUrl: "newbuildhomescostablanca.com",
          agentName: "Oskar Peterson",
          agentPhone: "+34 634 044 970",
          musicTrack: "music/luxury.mp3",
        }}
      />

      {/* Property Spotlight — Rapid (15s, TikTok energy) */}
      <Composition
        id="PropertySpotlightRapid"
        component={PropertySpotlightRapid}
        schema={propertySpotlightRapidSchema}
        durationInFrames={PROPERTY_SPOTLIGHT_RAPID_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          propertyRef: "N9499",
          images: SAMPLE_IMAGES.slice(0, 4),
          title: "2 Bed Penthouse Guardamar",
          price: 249000,
          bedrooms: 2,
          bathrooms: 2,
          area: 80,
          town: "Guardamar del Segura",
          type: "Penthouse",
          features: ["Pool", "Golf View", "Terrace", "Parking", "A/C"],
          websiteUrl: "newbuildhomescostablanca.com",
          musicTrack: "music/upbeat.mp3",
        }}
      />

      {/* Curated List — Top Apartments Under €200K */}
      <Composition
        id="CuratedListReel"
        component={CuratedListReel}
        schema={curatedListReelSchema}
        durationInFrames={calculateCuratedListDuration(4)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "Top 4 Apartments Under €200K",
          category: "Costa Blanca South",
          subtitle: "Key-ready properties you can move into now",
          properties: [
            {
              rank: 1,
              image: "https://fotos15.apinmo.com/7515/27424199/7-1.jpg",
              title: "2 Bed Apartment Orihuela Costa",
              price: 169000,
              bedrooms: 2,
              bathrooms: 1,
              area: 65,
              town: "Orihuela Costa",
              type: "Apartment",
              highlight: "Best Value",
            },
            {
              rank: 2,
              image: "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
              title: "2 Bed Ground Floor Torrevieja",
              price: 179000,
              bedrooms: 2,
              bathrooms: 2,
              area: 72,
              town: "Torrevieja",
              type: "Apartment",
              highlight: "Sea View",
            },
            {
              rank: 3,
              image: "https://fotos15.apinmo.com/7515/27424204/10-1.jpg",
              title: "2 Bed Penthouse Guardamar",
              price: 189000,
              bedrooms: 2,
              bathrooms: 2,
              area: 80,
              town: "Guardamar del Segura",
              type: "Penthouse",
              highlight: "Rooftop Terrace",
            },
            {
              rank: 4,
              image: "https://fotos15.apinmo.com/7515/24512307/23-2.jpg",
              title: "1 Bed Apartment Villamartin",
              price: 159000,
              bedrooms: 1,
              bathrooms: 1,
              area: 55,
              town: "Villamartin",
              type: "Apartment",
            },
          ],
          videoIntro: vid("drone view of beach.mp4"),
          videoCTA: vid("sunset.mp4"),
          websiteUrl: "newbuildhomescostablanca.com",
          musicTrack: "music/upbeat.mp3",
        }}
      />

      {/* Day in the Life — Guardamar */}
      <Composition
        id="DayInTheLifeReel"
        component={DayInTheLifeReel}
        schema={dayInTheLifeReelSchema}
        durationInFrames={calculateDayInTheLifeDuration(4)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          areaName: "Guardamar del Segura",
          region: "Costa Blanca South",
          tagline: "This could be your everyday.",
          timeline: [
            {
              timeRange: "07:00 – 09:00",
              period: "Morning",
              activities: [
                { icon: "🌅", activity: "Sunrise Walk", description: "Along the protected dune system and pine forest" },
                { icon: "☕", activity: "Beach Breakfast", description: "Fresh orange juice at a chiringuito on Playa Centro" },
              ],
            },
            {
              timeRange: "10:00 – 12:00",
              period: "Late Morning",
              activities: [
                { icon: "🏊", activity: "Beach Swimming", description: "Crystal clear waters with fewer crowds than the big resorts" },
                { icon: "🚴", activity: "Cycling", description: "Flat terrain perfect for exploring the river trails" },
              ],
            },
            {
              timeRange: "13:00 – 16:00",
              period: "Afternoon",
              activities: [
                { icon: "🍽️", activity: "Spanish Lunch", description: "Fresh paella at a family restaurant in the old town" },
                { icon: "☀️", activity: "Siesta & Pool", description: "Relax by the communal pool in your new build home" },
              ],
            },
            {
              timeRange: "18:00 – 21:00",
              period: "Evening",
              activities: [
                { icon: "🌅", activity: "Sunset Paseo", description: "Walk along the promenade as the sun sets over the Med" },
                { icon: "🍷", activity: "Tapas & Wine", description: "End the day with local wines and seafood tapas" },
              ],
            },
          ],
          videoTitle: vid("sunrise.mp4"),
          videoMorning: vid("general _ walking on beach.mp4"),
          videoLateMorning: vid("general beach with palm.mp4"),
          videoAfternoon: vid("Golf alicante.mp4"),
          videoEvening: vid("sunset.mp4"),
          videoCTA: vid("sunset.mp4"),
          websiteUrl: "newbuildhomescostablanca.com",
          musicTrack: "music/chill.mp3",
        }}
      />

      {/* Buyer Persona Reel — What Type of Buyer Are You? */}
      <Composition
        id="BuyerPersonaReel"
        component={BuyerPersonaReel}
        schema={buyerPersonaReelSchema}
        durationInFrames={calculateBuyerPersonaDuration(4)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "What Type of Buyer Are You?",
          personas: [
            {
              icon: "🏖️",
              name: "The Holiday Maker",
              traits: [
                "Wants sunshine & beach lifestyle",
                "2-3 weeks per year in Spain",
                "Rental income when away",
              ],
              propertyMatch: "2-bed apartment near the beach",
              priceFrom: 150000,
              image: SAMPLE_IMAGES[0],
            },
            {
              icon: "💰",
              name: "The Smart Investor",
              traits: [
                "Looking for 5-7% rental yield",
                "Capital appreciation potential",
                "New build with warranty",
              ],
              propertyMatch: "New build apartment in growth area",
              priceFrom: 165000,
              image: SAMPLE_IMAGES[1],
            },
            {
              icon: "☀️",
              name: "The Lifestyle Mover",
              traits: [
                "Ready to relocate full-time",
                "Values community & amenities",
                "Active outdoor lifestyle",
              ],
              propertyMatch: "3-bed villa with garden & pool",
              priceFrom: 280000,
              image: SAMPLE_IMAGES[4],  // villa image
            },
            {
              icon: "👨‍👩‍👧‍👦",
              name: "The Family Buyer",
              traits: [
                "International schools nearby",
                "Safe, family-friendly area",
                "Space for the whole family",
              ],
              propertyMatch: "4-bed villa in established neighbourhood",
              priceFrom: 350000,
              image: SAMPLE_IMAGES[4],  // villa image (not apartment)
            },
          ],
          videoHook: vid("general holding hand.mp4"),
          videoCTA: vid("sunset.mp4"),
          websiteUrl: "newbuildhomescostablanca.com",
          musicTrack: "music/chill.mp3",
        }}
      />

      {/* Blog Summary Reel — Sample article */}
      <Composition
        id="BlogSummaryReel"
        component={BlogSummaryReel}
        schema={blogSummaryReelSchema}
        durationInFrames={calculateBlogSummaryDuration(3)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          articleTitle: "Cost of Living in Spain vs UK 2026",
          category: "Lifestyle Guide",
          hookQuestion: "Did you know you could save 40% on your monthly expenses?",
          keyPoints: [
            {
              headline: "Housing is 55% Cheaper",
              summary: "Average 2-bed apartment on the Costa Blanca: €600/month rent or €170K to buy — compared to £1,200+ in most UK cities.",
            },
            {
              headline: "Healthcare That Won't Break the Bank",
              summary: "Spain's public healthcare ranks 7th globally. Private cover from just €60/month with no waiting lists.",
            },
            {
              headline: "Eat Out for €10",
              summary: "Menu del día at local restaurants: 3 courses + drink for €10-15. Weekly shop at Mercadona averages €50-70.",
            },
          ],
          takeaway: "Your money goes 40-55% further on the Costa Blanca — with better weather, food, and quality of life.",
          videoHook: vid("old town alicante.mp4"),
          videoPoints: vid("general _ walking on beach.mp4"),
          videoCTA: vid("sunset.mp4"),
          websiteUrl: "newbuildhomescostablanca.com",
          articleSlug: "cost-of-living-spain-vs-uk",
          musicTrack: "music/chill.mp3",
        }}
      />

      {/* Investment Case Reel — Costa Blanca numbers */}
      <Composition
        id="InvestmentCaseReel"
        component={InvestmentCaseReel}
        schema={investmentCaseReelSchema}
        durationInFrames={INVESTMENT_CASE_REEL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "Why Investors Choose Costa Blanca",
          areaName: "Costa Blanca",
          stats: [
            { label: "Rental Yield", value: 6.5, suffix: "%", decimals: 1 },
            { label: "Appreciation / yr", value: 4.8, suffix: "%", decimals: 1 },
            { label: "Price From", value: 165000, prefix: "€", isCurrency: true },
            { label: "Price per m²", value: 2100, prefix: "€", isCurrency: true },
            { label: "Occupancy Rate", value: 85, suffix: "%" },
            { label: "Properties", value: 1246, suffix: "+" },
          ],
          ctaText: "Start Investing Today",
          ctaSubtext: "1,200+ new build properties available",
          videoHook: vid("building men.mp4"),
          videoStats: vid("modern 1.mp4"),
          videoCTA: vid("sunset.mp4"),
          websiteUrl: "newbuildhomescostablanca.com",
          musicTrack: "music/luxury.mp3",
        }}
      />

      {/* ═══════════════════════════════════════════
          LEGACY COMPOSITIONS (still working)
          ═══════════════════════════════════════════ */}

      {/* Single property reel - 15 seconds, 9:16 vertical */}
      <Composition
        id="PropertyReel"
        component={PropertyReel}
        schema={propertyReelSchema}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          propertyRef: "N9499",
          images: [
            "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-2.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-3.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-4.jpg",
          ],
          title: "2 Bed Penthouse Guardamar del Segura",
          price: 249000,
          bedrooms: 2,
          bathrooms: 2,
          area: 80,
          town: "Guardamar del Segura",
          province: "Alicante",
          type: "Penthouse",
          features: ["Pool", "Golf View", "Terrace"],
          agentName: "Oskar Peterson",
          agentPhone: "+34 634 044 970",
          websiteUrl: "newbuildhomescostablanca.com",
          language: "en" as const,
          musicTrack: "music/upbeat.mp3",
        }}
      />

      {/* Property carousel */}
      <Composition
        id="PropertyCarousel"
        component={PropertyCarousel}
        schema={propertyCarouselSchema}
        calculateMetadata={({ props }) => {
          const count = Math.min(props.properties.length, 5);
          return { durationInFrames: 75 + count * 90 + 90 };
        }}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          properties: [
            {
              reference: "N9499",
              image: "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
              title: "2 Bed Penthouse Guardamar",
              price: 249000,
              bedrooms: 2,
              bathrooms: 2,
              area: 80,
              town: "Guardamar del Segura",
              type: "Penthouse",
            },
            {
              reference: "N8059",
              image: "https://fotos15.apinmo.com/7515/27424204/10-1.jpg",
              title: "3 Bed Villa Torrevieja",
              price: 389000,
              bedrooms: 3,
              bathrooms: 2,
              area: 120,
              town: "Torrevieja",
              type: "Villa",
            },
            {
              reference: "N6552",
              image: "https://fotos15.apinmo.com/7515/27424199/7-1.jpg",
              title: "2 Bed Apartment Orihuela Costa",
              price: 195000,
              bedrooms: 2,
              bathrooms: 1,
              area: 65,
              town: "Orihuela Costa",
              type: "Apartment",
            },
          ],
          headline: "New Build Homes Costa Blanca",
          subheadline: "From €164,000",
          agentName: "Oskar Peterson",
          agentPhone: "+34 634 044 970",
          websiteUrl: "newbuildhomescostablanca.com",
          language: "en" as const,
          musicTrack: "music/chill.mp3",
        }}
      />

      {/* Logo compositions */}
      <Composition
        id="LogoWatermark"
        component={LogoIntro}
        schema={logoIntroSchema}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ variant: "watermark" as const }}
      />

      <Composition
        id="LogoEndCard"
        component={LogoIntro}
        schema={logoIntroSchema}
        durationInFrames={45}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ variant: "end-card" as const }}
      />

      <Composition
        id="LogoYouTubeIntro"
        component={LogoIntro}
        schema={logoIntroSchema}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ variant: "youtube-intro" as const }}
      />

      {/* STILL COMPOSITIONS */}

      <Still
        id="PropertyCardSquare"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1080}
        defaultProps={{
          image: "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
          title: "2 Bed Penthouse Guardamar",
          price: 249000,
          bedrooms: 2,
          bathrooms: 2,
          area: 80,
          town: "Guardamar del Segura",
          type: "Penthouse",
          propertyRef: "N9499",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      <Still
        id="PropertyCardPinterest"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1350}
        defaultProps={{
          image: "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
          images: [
            "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-2.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-3.jpg",
          ],
          title: "2 Bed Penthouse Guardamar",
          price: 249000,
          bedrooms: 2,
          bathrooms: 2,
          area: 80,
          town: "Guardamar del Segura",
          type: "Penthouse",
          propertyRef: "N9499",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      {/* ═══════════════════════════════════════════
          EDIFICIO VENTO — Social Media Stills
          3 posts × 2 formats (Square + Pinterest)
          ═══════════════════════════════════════════ */}

      {/* Post 1: Development Overview — 1-bed from €158K */}
      <Still
        id="VentoOverviewSquare"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1080}
        defaultProps={{
          image: staticFile("vento/edificio-vento-exterior.png"),
          title: "Edificio Vento — New Build Torrevieja Centre",
          price: 158000,
          bedrooms: 1,
          bathrooms: 1,
          area: 48,
          town: "Torrevieja",
          type: "Apartment",
          propertyRef: "N9593",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      <Still
        id="VentoOverviewPinterest"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1350}
        defaultProps={{
          image: staticFile("vento/edificio-vento-exterior.png"),
          images: [
            staticFile("vento/edificio-vento-exterior.png"),
            staticFile("vento/floorplan-overview.webp"),
            staticFile("vento/edificio-vento-apartments-overview.webp"),
          ],
          title: "Edificio Vento — New Build Torrevieja Centre",
          price: 158000,
          bedrooms: 1,
          bathrooms: 1,
          area: 48,
          town: "Torrevieja",
          type: "Apartment",
          propertyRef: "N9593",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      {/* Post 2: Two-Bedroom Showcase — €245K */}
      <Still
        id="Vento2BedSquare"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1080}
        defaultProps={{
          image: staticFile("vento/edificio-vento-exterior.png"),
          title: "2-Bed Apartment — Edificio Vento Torrevieja",
          price: 245000,
          bedrooms: 2,
          bathrooms: 2,
          area: 89,
          town: "Torrevieja",
          type: "Apartment",
          propertyRef: "N9593",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      <Still
        id="Vento2BedPinterest"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1350}
        defaultProps={{
          image: staticFile("vento/edificio-vento-exterior.png"),
          images: [
            staticFile("vento/edificio-vento-exterior.png"),
            staticFile("vento/floorplan-overview.webp"),
            staticFile("vento/edificio-vento-sunset.png"),
          ],
          title: "2-Bed Apartment — Edificio Vento Torrevieja",
          price: 245000,
          bedrooms: 2,
          bathrooms: 2,
          area: 89,
          town: "Torrevieja",
          type: "Apartment",
          propertyRef: "N9593",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      {/* Post 3: Penthouse with Private Pool — €412K */}
      <Still
        id="VentoPenthouseSquare"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1080}
        defaultProps={{
          image: staticFile("vento/edificio-vento-night.png"),
          title: "Penthouse + Private Pool — Edificio Vento",
          price: 412000,
          bedrooms: 2,
          bathrooms: 2,
          area: 173,
          town: "Torrevieja",
          type: "Penthouse",
          propertyRef: "N9593",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      <Still
        id="VentoPenthousePinterest"
        component={PropertyCard}
        schema={propertyCardSchema}
        width={1080}
        height={1350}
        defaultProps={{
          image: staticFile("vento/edificio-vento-night.png"),
          images: [
            staticFile("vento/edificio-vento-night.png"),
            staticFile("vento/edificio-vento-sunset.png"),
            staticFile("vento/edificio-vento-exterior.png"),
          ],
          title: "Penthouse + Private Pool — Edificio Vento",
          price: 412000,
          bedrooms: 2,
          bathrooms: 2,
          area: 173,
          town: "Torrevieja",
          type: "Penthouse",
          propertyRef: "N9593",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      <Still
        id="AreaShowcaseSquare"
        component={AreaShowcase}
        schema={areaShowcaseSchema}
        width={1080}
        height={1080}
        defaultProps={{
          image: SAMPLE_IMAGES[0],
          locationName: "Guardamar del Segura",
          tagline: "Discover Mediterranean Living",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />

      <Still
        id="AreaShowcasePinterest"
        component={AreaShowcase}
        schema={areaShowcaseSchema}
        width={1080}
        height={1350}
        defaultProps={{
          image: SAMPLE_IMAGES[0],
          locationName: "Guardamar del Segura",
          tagline: "Discover Mediterranean Living",
          websiteUrl: "newbuildhomescostablanca.com",
        }}
      />
    </>
  );
};
