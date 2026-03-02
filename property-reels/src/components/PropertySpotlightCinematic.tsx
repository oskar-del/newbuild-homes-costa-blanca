/**
 * PropertySpotlightCinematic — 30-45 second vertical reel showcasing a property
 *
 * A calm, detailed property spotlight reel that highlights key features,
 * location benefits, and investment potential. Uses high-quality property
 * images and videos for a cinematic presentation.
 *
 * SEGMENTS:
 *   1. Hero Reveal — property image + price + type + area name (6s)
 *   2. Key Stats — beds, baths, area, type (5s)
 *   3. Features Showcase — 4-6 key amenities with icons (5s)
 *   4. Location Context — distance to beach, golf, airport, amenities (5s)
 *   5. Gallery Montage — quick cuts through 3-4 images (6s)
 *   6. Investment Angle — rental yield, price per sqm (4s)
 *   7. CTA — call to action with website URL (4s)
 *
 * Each segment has transitions with 12-frame cross-fades for smooth flow.
 */

import React from "react";
import { z } from "zod";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { VideoSegment } from "./shared/VideoSegment";
import {
  FadeUpText,
  AccentLine,
  PillBadge,
  IconTextRow,
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

export const propertySpotlightCinematicSchema = z.object({
  propertyRef: z.string(),
  images: z.array(z.string()).min(1), // property image URLs
  title: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(), // sqm
  town: z.string(),
  province: z.string(),
  type: z.string(), // "Villa", "Penthouse", "Apartment", etc
  features: z.array(z.string()).min(1).max(6),
  description: z.string().optional(),
  nearbyAmenities: z
    .object({
      beach: z.string().optional(),
      golf: z.string().optional(),
      airport: z.string().optional(),
      restaurants: z.string().optional(),
    })
    .optional(),
  rentalYield: z.string().optional(),
  pricePerSqm: z.number().optional(),
  videoHero: z.string().optional(), // video for hero (if available)
  videoLocation: z.string(),
  videoInvestment: z.string(),
  videoCTA: z.string(),
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
  agentName: z.string().optional(),
  agentPhone: z.string().optional(),
  musicTrack: z.string().optional(),
});

type PropertySpotlightCinematicProps = z.infer<typeof propertySpotlightCinematicSchema>;

// ── Segment durations (in frames at 30fps) ──────────
const FPS = 30;
const HERO_DUR = 6 * FPS; // 180 frames
const KEYSTATS_DUR = 5 * FPS; // 150 frames
const FEATURES_DUR = 5 * FPS; // 150 frames
const LOCATION_DUR = 5 * FPS; // 150 frames
const GALLERY_DUR = 6 * FPS; // 180 frames
const INVESTMENT_DUR = 4 * FPS; // 120 frames
const CTA_DUR = 4 * FPS; // 120 frames
const CROSS_FADE = 12; // frames overlap

// Segment start times (with overlap for cross-fades)
const HERO_START = 0;
const KEYSTATS_START = HERO_DUR - CROSS_FADE;
const FEATURES_START = KEYSTATS_START + KEYSTATS_DUR - CROSS_FADE;
const LOCATION_START = FEATURES_START + FEATURES_DUR - CROSS_FADE;
const GALLERY_START = LOCATION_START + LOCATION_DUR - CROSS_FADE;
const INVESTMENT_START = GALLERY_START + GALLERY_DUR - CROSS_FADE;
const CTA_START = INVESTMENT_START + INVESTMENT_DUR - CROSS_FADE;

export const PROPERTY_SPOTLIGHT_CINEMATIC_FRAMES =
  CTA_START + CTA_DUR; // ~35 seconds

// ── Main Component ──────────────────────────────────

export const PropertySpotlightCinematic: React.FC<PropertySpotlightCinematicProps> = (props) => {
  const {
    propertyRef,
    images,
    title,
    price,
    bedrooms,
    bathrooms,
    area,
    town,
    province,
    type,
    features,
    description,
    nearbyAmenities,
    rentalYield,
    pricePerSqm,
    videoHero,
    videoLocation,
    videoInvestment,
    videoCTA,
    websiteUrl,
    musicTrack,
  } = props;

  // Use first image as hero fallback if no video
  const heroSource = videoHero || images[0];
  const isHeroVideo = videoHero !== undefined && videoHero !== "";

  // Resolve music track
  const { durationInFrames } = useVideoConfig();
  const musicSrc = musicTrack
    ? musicTrack.startsWith("http")
      ? musicTrack
      : staticFile(musicTrack)
    : null;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      {/* Background music — fades out in last 60 frames */}
      {musicSrc && (
        <Audio
          src={musicSrc}
          volume={(f) =>
            interpolate(f, [0, 10, durationInFrames - 60, durationInFrames], [0, 0.6, 0.6, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      )}
      {/* ── Segment 1: Hero Reveal ──────────────── */}
      <Sequence from={HERO_START} durationInFrames={HERO_DUR} name="Hero">
        <VideoSegment
          videoSrc={isHeroVideo ? heroSource : undefined}
          imageSrc={!isHeroVideo ? heroSource : undefined}
          durationInFrames={HERO_DUR}
          kenBurns="zoom-in"
          zoomIntensity={1.12}
          gradientBottom
          gradientTop
          entrance="fade"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          {/* Tag pill — top left, frosted glass */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 40,
            }}
          >
            <PillBadge text={type} delay={8} />
          </div>

          {/* Logo — top right, frosted glass circle */}
          <div style={logoCircleStyle}>
            <Img
              src={staticFile("logo-round.png")}
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Bottom text — editorial, floating over photo */}
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 48px 160px",
              gap: 16,
            }}
          >
            {/* Price — large editorial serif */}
            <FadeUpText
              text={`€${price.toLocaleString()}`}
              delay={12}
              style={priceStyle}
            />

            {/* Location name — serif */}
            <FadeUpText
              text={`${town}, ${province}`}
              delay={20}
              style={locationStyle}
            />

            {/* Small gold accent line */}
            <AccentLine delay={26} width={60} style={{ marginTop: 8 }} />

            {/* Website */}
            <FadeUpText
              text={websiteUrl}
              delay={32}
              style={watermarkTextStyle}
            />
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── Segment 2: Key Stats ───────────────── */}
      <Sequence
        from={KEYSTATS_START}
        durationInFrames={KEYSTATS_DUR}
        name="KeyStats"
      >
        <VideoSegment
          imageSrc={images[1] || images[0]}
          durationInFrames={KEYSTATS_DUR}
          kenBurns="zoom-in"
          zoomIntensity={1.1}
          overlayOpacity={0.45}
          gradientBottom
          entrance="fade"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          {/* Tag pill top-left */}
          <div style={{ position: "absolute", top: 40, left: 40 }}>
            <PillBadge text="Details" delay={5} />
          </div>

          {/* Stats at bottom over gradient */}
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 48px 120px",
              gap: 24,
            }}
          >
            {/* Title — serif */}
            <FadeUpText
              text={title}
              delay={10}
              style={{
                fontFamily: FONTS.display,
                fontWeight: FONT_WEIGHTS.regular,
                fontSize: FONT_SIZES["2xl"],
                color: "#ffffff",
                lineHeight: 1.1,
                textShadow: "0 2px 16px rgba(0,0,0,0.3)",
              }}
            />

            {/* Stats row — minimal */}
            <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
              <StatBox label="Bed" value={bedrooms.toString()} delay={18} />
              <StatBox label="Bath" value={bathrooms.toString()} delay={24} />
              <StatBox label="m²" value={area.toString()} delay={30} />
            </div>

            <AccentLine delay={36} width={60} />
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── Segment 3: Features Showcase ────────── */}
      <Sequence
        from={FEATURES_START}
        durationInFrames={FEATURES_DUR}
        name="Features"
      >
        <VideoSegment
          imageSrc={images[2] || images[0]}
          durationInFrames={FEATURES_DUR}
          kenBurns="pan-right"
          overlayOpacity={0.4}
          gradientBottom
          entrance="slide-up"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          {/* Tag pill */}
          <div style={{ position: "absolute", top: 40, left: 40 }}>
            <PillBadge text="Highlights" delay={5} />
          </div>

          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 48px 120px",
              gap: 24,
            }}
          >
            <FadeUpText
              text="Key Features"
              delay={10}
              style={{
                fontFamily: FONTS.display,
                fontWeight: FONT_WEIGHTS.regular,
                fontSize: FONT_SIZES["2xl"],
                color: "#ffffff",
                lineHeight: 1.1,
                textShadow: "0 2px 16px rgba(0,0,0,0.3)",
              }}
            />

            <AccentLine delay={16} width={60} />

            {/* Feature items — clean, no emojis */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 8 }}>
              {features.slice(0, 4).map((feature, i) => (
                <FadeUpText
                  key={i}
                  text={feature}
                  delay={22 + i * 8}
                  style={{
                    fontFamily: FONTS.primary,
                    fontWeight: FONT_WEIGHTS.regular,
                    fontSize: FONT_SIZES.base,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.4,
                  }}
                />
              ))}
            </div>
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── Segment 4: Location Context ────────── */}
      <Sequence
        from={LOCATION_START}
        durationInFrames={LOCATION_DUR}
        name="Location"
      >
        <VideoSegment
          videoSrc={videoLocation}
          durationInFrames={LOCATION_DUR}
          kenBurns="pan-left"
          overlayOpacity={0.35}
          gradientBottom
          entrance="slide-left"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <div style={{ position: "absolute", top: 40, left: 40 }}>
            <PillBadge text="Location" delay={5} />
          </div>

          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 48px 120px",
              gap: 20,
            }}
          >
            <FadeUpText
              text="Prime Location"
              delay={10}
              style={{
                fontFamily: FONTS.display,
                fontWeight: FONT_WEIGHTS.regular,
                fontSize: FONT_SIZES["2xl"],
                color: "#ffffff",
                lineHeight: 1.1,
                textShadow: "0 2px 16px rgba(0,0,0,0.3)",
              }}
            />

            <AccentLine delay={16} width={60} />

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
              {nearbyAmenities?.beach && (
                <FadeUpText text={nearbyAmenities.beach} delay={20} style={amenityTextStyle} />
              )}
              {nearbyAmenities?.golf && (
                <FadeUpText text={nearbyAmenities.golf} delay={28} style={amenityTextStyle} />
              )}
              {nearbyAmenities?.airport && (
                <FadeUpText text={nearbyAmenities.airport} delay={36} style={amenityTextStyle} />
              )}
              {nearbyAmenities?.restaurants && (
                <FadeUpText text={nearbyAmenities.restaurants} delay={44} style={amenityTextStyle} />
              )}
            </div>
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── Segment 5: Gallery Montage ────────── */}
      <Sequence
        from={GALLERY_START}
        durationInFrames={GALLERY_DUR}
        name="Gallery"
      >
        <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
          {/* Image 1 */}
          <Sequence from={0} durationInFrames={45}>
            <VideoSegment
              imageSrc={images[0]}
              durationInFrames={45}
              kenBurns="zoom-in"
              zoomIntensity={1.15}
              gradientBottom={false}
              entrance="fade"
              exit="fade"
              transitionFrames={CROSS_FADE}
            />
          </Sequence>

          {/* Image 2 */}
          <Sequence from={45} durationInFrames={45}>
            <VideoSegment
              imageSrc={images[1] || images[0]}
              durationInFrames={45}
              kenBurns="pan-up"
              overlayOpacity={0.3}
              gradientBottom={false}
              entrance="fade"
              exit="fade"
              transitionFrames={CROSS_FADE}
            />
          </Sequence>

          {/* Image 3 */}
          <Sequence from={90} durationInFrames={45}>
            <VideoSegment
              imageSrc={images[2] || images[0]}
              durationInFrames={45}
              kenBurns="zoom-out"
              zoomIntensity={1.15}
              overlayOpacity={0.3}
              gradientBottom={false}
              entrance="fade"
              exit="fade"
              transitionFrames={CROSS_FADE}
            />
          </Sequence>

          {/* Image 4 or back to first */}
          <Sequence from={135} durationInFrames={45}>
            <VideoSegment
              imageSrc={images[3] || images[0]}
              durationInFrames={45}
              kenBurns="pan-right"
              overlayOpacity={0.3}
              gradientBottom={false}
              entrance="fade"
              exit="fade"
              transitionFrames={CROSS_FADE}
            />
          </Sequence>

          {/* Ref overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: 80,
              right: 80,
              textAlign: "center",
            }}
          >
            <GalleryRef refCode={propertyRef} delay={30} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── Segment 6: Investment Angle ────────── */}
      {(rentalYield || pricePerSqm) && (
        <Sequence
          from={INVESTMENT_START}
          durationInFrames={INVESTMENT_DUR}
          name="Investment"
        >
          <VideoSegment
            videoSrc={videoInvestment}
            durationInFrames={INVESTMENT_DUR}
            kenBurns="zoom-in"
            zoomIntensity={1.12}
            overlayOpacity={0.4}
            gradientBottom
            entrance="zoom"
            exit="fade"
            transitionFrames={CROSS_FADE}
          >
            <div style={{ position: "absolute", top: 40, left: 40 }}>
              <PillBadge text="Investment" delay={5} />
            </div>

            <AbsoluteFill
              style={{
                justifyContent: "flex-end",
                padding: "0 48px 120px",
                gap: 20,
              }}
            >
              <FadeUpText
                text="Smart Investment"
                delay={10}
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: FONT_WEIGHTS.regular,
                  fontSize: FONT_SIZES["2xl"],
                  color: "#ffffff",
                  lineHeight: 1.1,
                  textShadow: "0 2px 16px rgba(0,0,0,0.3)",
                }}
              />

              <AccentLine delay={16} width={60} />

              {/* Stats row */}
              <div style={{ display: "flex", gap: 48, marginTop: 8 }}>
                {rentalYield && (
                  <StatBox label="Rental Yield" value={rentalYield} delay={22} />
                )}
                {pricePerSqm && (
                  <StatBox label="Price/m²" value={`€${pricePerSqm.toLocaleString()}`} delay={30} />
                )}
              </div>
            </AbsoluteFill>
          </VideoSegment>
        </Sequence>
      )}

      {/* ── Segment 7: CTA ──────────────────── */}
      <Sequence from={CTA_START} durationInFrames={CTA_DUR} name="CTA">
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
            headline={`${type} in ${town}`}
            subtext={`Ref: ${propertyRef}`}
            websiteUrl={websiteUrl}
            delay={8}
          />
        </VideoSegment>
      </Sequence>
    </AbsoluteFill>
  );
};

// ── Helper sub-components ───────────────────────────

const StatBox: React.FC<{
  label: string;
  value: string;
  icon?: string;
  delay: number;
}> = ({ label, value, icon, delay }) => {
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
        gap: 6,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.display,
          fontWeight: FONT_WEIGHTS.regular,
          fontSize: FONT_SIZES.xl,
          color: "#ffffff",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.regular,
          fontSize: FONT_SIZES.xs,
          color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
    </div>
  );
};

const GalleryRef: React.FC<{
  refCode: string;
  delay: number;
}> = ({ refCode, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.5 },
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.semibold,
          fontSize: FONT_SIZES.base,
          color: COLORS.accent,
          letterSpacing: "0.05em",
        }}
      >
        Ref: {refCode}
      </span>
    </div>
  );
};

// ── Shared styles — editorial ───────────────────────

const priceStyle: React.CSSProperties = {
  fontFamily: FONTS.display,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES["4xl"],
  color: "#ffffff",
  lineHeight: 1.05,
  letterSpacing: "0.01em",
  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
};

const locationStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.lg,
  color: "rgba(255,255,255,0.8)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const amenityTextStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.base,
  color: "rgba(255,255,255,0.85)",
  lineHeight: 1.4,
};

const logoCircleStyle: React.CSSProperties = {
  position: "absolute",
  top: 36,
  right: 36,
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
};

const watermarkTextStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.xs,
  color: "rgba(255,255,255,0.5)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};
