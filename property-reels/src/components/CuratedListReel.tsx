/**
 * CuratedListReel — 30-45 second vertical reel for curated property lists
 *
 * Ideal for showcasing themed property collections like:
 *   • "Top 10 Key-Ready Apartments Under €200,000"
 *   • "Luxury Villa Guide Costa Blanca North"
 *   • "5 Best Golf Properties Near Alicante"
 *   • "Early Investments — Up to 30% Off"
 *
 * STRUCTURE:
 *   1. Intro (4s) — video background, list title, category badge, item count
 *   2. Property Items (4s each) — image + ranking number + title + price + stats
 *   3. Summary (3s) — price range, best value, total count
 *   4. CTA (3s) — browse all properties link
 *
 * Each property item fades in smoothly with a 10-frame crossfade transition.
 * Ranking numbers are large, semi-transparent watermarks in top-left.
 * Optional highlight badges (e.g., "BEST VALUE") appear top-right.
 */

import React from "react";
import { z } from "zod";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  spring,
  useVideoConfig,
  Img,
} from "remotion";
import { VideoSegment } from "./shared/VideoSegment";
import {
  FadeUpText,
  AccentLine,
  PillBadge,
  AnimatedCounter,
  CTACard,
} from "./shared/AnimatedText";
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
} from "../brand";

// ── Schema ──────────────────────────────────────────

/**
 * Schema for a single property in the curated list
 */
const propertySchema = z.object({
  rank: z.number().describe("Property rank (1-10)"),
  image: z.string().describe("Property image path"),
  title: z.string().describe("Property name/address"),
  price: z.number().describe("Price in euros"),
  bedrooms: z.number().describe("Number of bedrooms"),
  bathrooms: z.number().describe("Number of bathrooms"),
  area: z.number().describe("Area in square meters"),
  town: z.string().describe("Town/city name"),
  type: z.string().describe("Property type (e.g., 'Apartment', 'Villa')"),
  highlight: z
    .string()
    .optional()
    .describe("Badge text like 'BEST VALUE', 'SEA VIEW', 'READY NOW'"),
});

/**
 * Main schema for CuratedListReel props
 */
export const curatedListReelSchema = z.object({
  headline: z.string().describe("Main list title"),
  category: z.string().describe("Category/region badge text"),
  subtitle: z
    .string()
    .optional()
    .describe("Optional subtitle with property count"),
  properties: propertySchema.array().min(3).max(10),
  videoIntro: z.string().describe("Intro segment video path"),
  videoCTA: z.string().describe("CTA segment video path"),
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
  musicTrack: z.string().optional(),
});

export type CuratedListReelProps = z.infer<typeof curatedListReelSchema>;

// ── Timing constants ────────────────────────────────

const FPS = 30;
const INTRO_DUR = 4 * FPS; // 120 frames (4 seconds)
const ITEM_DUR = 4 * FPS; // 120 frames (4 seconds per property)
const SUMMARY_DUR = 3 * FPS; // 90 frames (3 seconds)
const CTA_DUR = 3 * FPS; // 90 frames (3 seconds)
const CROSS_FADE = 10; // frame overlap between segments

/**
 * Calculate total duration for a curated list reel based on property count
 * @param itemCount - number of properties (3-10)
 * @returns total frames at 30fps
 */
export const calculateCuratedListDuration = (itemCount: number): number => {
  const numItems = Math.min(Math.max(itemCount, 3), 10);
  return (
    INTRO_DUR + numItems * ITEM_DUR + SUMMARY_DUR + CTA_DUR - CROSS_FADE * 3
  );
};

// Segment start times
const INTRO_START = 0;
const itemsStart = (itemIndex: number) => INTRO_START + INTRO_DUR - CROSS_FADE + itemIndex * ITEM_DUR;
const summaryStart = (itemCount: number) =>
  INTRO_START + INTRO_DUR + itemCount * ITEM_DUR - CROSS_FADE * 2;
const ctaStart = (itemCount: number) =>
  INTRO_START + INTRO_DUR + itemCount * ITEM_DUR + SUMMARY_DUR - CROSS_FADE;

// ── Main Component ──────────────────────────────────

/**
 * CuratedListReel — vertical video composition for property lists
 * 9:16 aspect ratio, 1080x1920px, 30fps
 */
export const CuratedListReel: React.FC<CuratedListReelProps> = (props) => {
  const {
    headline,
    category,
    subtitle,
    properties,
    videoIntro,
    videoCTA,
    websiteUrl,
    musicTrack,
  } = props;

  const { durationInFrames } = useVideoConfig();

  // Resolve music source
  const musicSrc = musicTrack
    ? musicTrack.startsWith('http')
      ? musicTrack
      : staticFile(musicTrack)
    : null;

  const itemCount = properties.length;
  const totalDuration = calculateCuratedListDuration(itemCount);

  // Calculate price range and best value
  const prices = properties.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const pricePerSqm = properties.map((p) => p.price / p.area);
  const bestValueIndex = pricePerSqm.indexOf(Math.min(...pricePerSqm));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      {/* Audio Track */}
      {musicSrc && (
        <Audio
          src={musicSrc}
          volume={(f) =>
            interpolate(f, [0, 10, durationInFrames - 60, durationInFrames], [0, 0.6, 0.6, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      )}

      {/* ── Segment 1: Intro ────────────────────────────── */}
      <Sequence from={INTRO_START} durationInFrames={INTRO_DUR} name="Intro">
        <VideoSegment
          videoSrc={videoIntro}
          durationInFrames={INTRO_DUR}
          kenBurns="zoom-in"
          zoomIntensity={1.15}
          gradientBottom
          gradientTop
          entrance="fade"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              padding: SPACING.safeArea,
            }}
          >
            {/* Category badge */}
            <PillBadge text={category} delay={8} />

            {/* Main headline */}
            <FadeUpText
              text={headline}
              delay={16}
              style={{
                fontFamily: FONTS.primary,
                fontWeight: FONT_WEIGHTS.bold,
                fontSize: FONT_SIZES["4xl"],
                color: COLORS.white,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginTop: 20,
              }}
            />

            {/* Accent line */}
            <AccentLine delay={24} width={100} style={{ marginTop: 16 }} />

            {/* Subtitle with item count */}
            <FadeUpText
              text={
                subtitle || `${itemCount} properties you need to see`
              }
              delay={32}
              style={{
                fontFamily: FONTS.primary,
                fontWeight: FONT_WEIGHTS.regular,
                fontSize: FONT_SIZES.lg,
                color: COLORS.white,
                lineHeight: 1.5,
                opacity: 0.9,
                marginTop: 16,
                maxWidth: 800,
              }}
            />
          </AbsoluteFill>

          {/* Watermark */}
          <div style={watermarkStyle}>
            <span style={watermarkTextStyle}>{websiteUrl}</span>
          </div>
        </VideoSegment>
      </Sequence>

      {/* ── Segments 2+: Property Items ────────────────── */}
      {properties.map((property, idx) => (
        <Sequence
          key={`property-${idx}`}
          from={itemsStart(idx)}
          durationInFrames={ITEM_DUR}
          name={`Property-${property.rank}`}
        >
          <PropertyCard property={property} />
        </Sequence>
      ))}

      {/* ── Summary Segment ─────────────────────────────── */}
      <Sequence
        from={summaryStart(itemCount)}
        durationInFrames={SUMMARY_DUR}
        name="Summary"
      >
        <VideoSegment
          videoSrc={videoIntro}
          durationInFrames={SUMMARY_DUR}
          kenBurns="pan-up"
          overlayOpacity={0.65}
          gradientBottom
          entrance="fade"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: SPACING.safeArea,
              gap: SPACING.lg,
            }}
          >
            {/* Section label */}
            <PillBadge text="Summary" delay={5} />

            {/* Price range */}
            <div style={{ display: "flex", gap: SPACING.xl, alignItems: "center" }}>
              <SummaryBox
                label="Min Price"
                value={`€${minPrice.toLocaleString()}`}
                delay={15}
              />
              <SummaryBox
                label="Max Price"
                value={`€${maxPrice.toLocaleString()}`}
                delay={25}
              />
            </div>

            {/* Best value callout */}
            <FadeUpText
              text={`Best Value: ${properties[bestValueIndex].title}`}
              delay={35}
              style={{
                fontFamily: FONTS.primary,
                fontWeight: FONT_WEIGHTS.semibold,
                fontSize: FONT_SIZES.lg,
                color: COLORS.accent,
                textAlign: "center",
              }}
            />

            {/* Total count */}
            <FadeUpText
              text={`${itemCount} properties from €${minPrice.toLocaleString()}`}
              delay={45}
              style={{
                fontFamily: FONTS.primary,
                fontWeight: FONT_WEIGHTS.bold,
                fontSize: FONT_SIZES["2xl"],
                color: COLORS.white,
                textAlign: "center",
              }}
            />
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── CTA Segment ─────────────────────────────────── */}
      <Sequence
        from={ctaStart(itemCount)}
        durationInFrames={CTA_DUR}
        name="CTA"
      >
        <VideoSegment
          videoSrc={videoCTA}
          durationInFrames={CTA_DUR}
          kenBurns="zoom-out"
          zoomIntensity={1.2}
          gradientBottom
          gradientTop
          entrance="fade"
          exit="none"
          transitionFrames={CROSS_FADE}
        >
          <CTACard
            headline={`Browse All ${category} Properties`}
            subtext="Find your next investment or home"
            websiteUrl={websiteUrl}
            delay={8}
          />
        </VideoSegment>
      </Sequence>
    </AbsoluteFill>
  );
};

// ── Sub-components ──────────────────────────────────

/**
 * PropertyCard — single property display (4s segment)
 * Features large ranking number, image, title, price, and stats
 */
interface PropertyCardProps {
  property: z.infer<typeof propertySchema>;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const {
    rank,
    image,
    title,
    price,
    bedrooms,
    bathrooms,
    area,
    town,
    highlight,
  } = property;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in the card content
  const contentProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.5 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      {/* Property image background */}
      {image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-10%",
              transform: `scale(${interpolate(frame, [0, ITEM_DUR], [1, 1.1])})`,
              transformOrigin: "center center",
            }}
          >
            <Img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}

      {/* Dark gradient overlays for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "35%",
          background:
            "linear-gradient(to bottom, rgba(30,42,56,0.7) 0%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background:
            "linear-gradient(to top, rgba(30,42,56,0.92) 0%, rgba(30,42,56,0.6) 40%, transparent 100%)",
        }}
      />

      {/* Large ranking number (watermark style) */}
      <div
        style={{
          position: "absolute",
          top: SPACING.safeArea + 20,
          left: SPACING.safeArea,
          opacity: 0.3,
          transform: `scale(${interpolate(
            contentProgress,
            [0, 1],
            [0.8, 1]
          )})`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: FONT_SIZES["6xl"],
            color: COLORS.accent,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          #{rank}
        </div>
      </div>

      {/* Highlight badge (top-right) */}
      {highlight && (
        <div
          style={{
            position: "absolute",
            top: SPACING.safeArea,
            right: SPACING.safeArea,
          }}
        >
          <PillBadge text={highlight} delay={8} />
        </div>
      )}

      {/* Content (bottom area) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: SPACING.safeArea,
          paddingTop: SPACING.xl,
          opacity: contentProgress,
          transform: `translateY(${interpolate(
            contentProgress,
            [0, 1],
            [20, 0]
          )}px)`,
        }}
      >
        {/* Property title */}
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: FONT_SIZES["3xl"],
            color: COLORS.white,
            lineHeight: 1.2,
            marginBottom: SPACING.md,
          }}
        >
          {title}
        </div>

        {/* Price in accent gold */}
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: FONT_SIZES["2xl"],
            color: COLORS.accent,
            marginBottom: SPACING.lg,
          }}
        >
          €{price.toLocaleString()}
        </div>

        {/* Key stats line */}
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: FONT_SIZES.lg,
            color: COLORS.white,
            opacity: 0.85,
            marginBottom: SPACING.md,
          }}
        >
          {bedrooms} bed · {bathrooms} bath · {area} m²
        </div>

        {/* Town name */}
        <div
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.regular,
            fontSize: FONT_SIZES.base,
            color: COLORS.white,
            opacity: 0.7,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          }}
        >
          {town}
        </div>
      </div>

      {/* Watermark */}
      <div style={watermarkStyle}>
        <span style={watermarkTextStyle}>newbuildhomescostablanca.com</span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * SummaryBox — two-column stat display for summary segment
 */
interface SummaryBoxProps {
  label: string;
  value: string;
  delay: number;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({ label, value, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 100, mass: 0.5 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: SPACING.xs,
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: FONT_SIZES["3xl"],
          color: COLORS.accent,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: FONT_SIZES.base,
          color: COLORS.white,
          opacity: 0.8,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ── Shared styles ───────────────────────────────────

const watermarkStyle: React.CSSProperties = {
  position: "absolute",
  bottom: SPACING.safeArea,
  right: SPACING.safeArea,
};

const watermarkTextStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.medium,
  fontSize: FONT_SIZES.xs,
  color: COLORS.white,
  opacity: 0.4,
  letterSpacing: "0.02em",
};
