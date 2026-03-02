/**
 * PropertySpotlightRapid — 15-second vertical reel with punchy, fast energy
 *
 * TikTok-style property spotlight featuring:
 *   • 2s Hook: Hero image + price + property type + town
 *   • 10s Rapid Gallery: 10 images cycling at ~1 second each with big stat callouts
 *   • 3s CTA: Dark overlay with ref, price, website URL
 *
 * Total duration: 450 frames at 30fps (15 seconds)
 * Perfect for social media stories and reels.
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
import { FadeUpText, PillBadge, CTACard } from "./shared/AnimatedText";
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
} from "../brand";

// ── Schema ──────────────────────────────────────────

export const propertySpotlightRapidSchema = z.object({
  propertyRef: z.string(),
  images: z.array(z.string()).min(3).max(10),
  title: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(), // sqm
  town: z.string(),
  type: z.string(), // "Villa", "Penthouse", "Apartment", etc
  features: z.array(z.string()).min(0).max(10),
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
  musicTrack: z.string().optional(),
});

type PropertySpotlightRapidProps = z.infer<typeof propertySpotlightRapidSchema>;

// ── Timings (in frames at 30fps) ──────────────────────

const FPS = 30;
const HOOK_DUR = 2 * FPS; // 60 frames
const CTA_DUR = 3 * FPS; // 90 frames
const FADE_TRANSITION = 6; // frames
// Gallery duration is calculated dynamically based on image count
// to avoid dead time when fewer than 10 images are provided

export const PROPERTY_SPOTLIGHT_RAPID_FRAMES = 450; // 15 seconds at 30fps

// Segment start times
const HOOK_START = 0;
const GALLERY_START = HOOK_DUR;

// ── Main Component ──────────────────────────────────

/**
 * PropertySpotlightRapid composition
 *
 * Props conform to propertySpotlightRapidSchema.
 * Renders a fast, punchy 15-second property video.
 */
export const PropertySpotlightRapid: React.FC<PropertySpotlightRapidProps> = (
  props
) => {
  const {
    propertyRef,
    images,
    title,
    price,
    bedrooms,
    bathrooms,
    area,
    town,
    type,
    features,
    websiteUrl,
    musicTrack,
  } = props;

  // Build callout text array from property details
  const callouts = buildCallouts(bedrooms, bathrooms, area, features);

  // Calculate gallery timing dynamically based on image count
  const imageCount = Math.min(images.length, 10);
  const GALLERY_DUR = PROPERTY_SPOTLIGHT_RAPID_FRAMES - HOOK_DUR - CTA_DUR; // remaining time for gallery
  const IMAGE_DUR = Math.floor(GALLERY_DUR / imageCount); // distribute evenly across images
  const CTA_START = GALLERY_START + GALLERY_DUR;

  // Resolve music track
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
            interpolate(f, [0, 10, PROPERTY_SPOTLIGHT_RAPID_FRAMES - 60, PROPERTY_SPOTLIGHT_RAPID_FRAMES], [0, 0.6, 0.6, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      )}
      {/* ── HOOK: Hero image + price + type + town (2s) ──── */}
      <Sequence from={HOOK_START} durationInFrames={HOOK_DUR} name="Hook">
        <VideoSegment
          imageSrc={images[0]}
          durationInFrames={HOOK_DUR}
          kenBurns="zoom-in"
          zoomIntensity={1.15}
          gradientBottom
          gradientTop
          entrance="fade"
          exit="fade"
          transitionFrames={FADE_TRANSITION}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              padding: SPACING.safeArea,
            }}
          >
            {/* Property type badge — fast entrance */}
            <PillBadge text={type} delay={8} />

            {/* Price — huge, bold, slamming in */}
            <FadeUpText
              text={`€${price.toLocaleString()}`}
              delay={12}
              style={priceCalloutStyle}
            />

            {/* Town name */}
            <FadeUpText
              text={town}
              delay={18}
              style={townCalloutStyle}
            />
          </AbsoluteFill>

          {/* Website watermark top-right */}
          <div style={watermarkStyle}>
            <span style={watermarkTextStyle}>{websiteUrl}</span>
          </div>
        </VideoSegment>
      </Sequence>

      {/* ── GALLERY: 10 images cycling with stat callouts (10s) ──── */}
      <Sequence
        from={GALLERY_START}
        durationInFrames={GALLERY_DUR}
        name="RapidGallery"
      >
        <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
          {images.slice(0, 10).map((imageSrc, idx) => {
            const imageStart = idx * IMAGE_DUR;
            const kbEffect = [
              "zoom-in",
              "pan-left",
              "zoom-out",
              "pan-right",
            ][idx % 4] as
              | "zoom-in"
              | "pan-left"
              | "zoom-out"
              | "pan-right";

            const calloutText = callouts[idx % callouts.length] || "";

            return (
              <Sequence
                key={idx}
                from={imageStart}
                durationInFrames={IMAGE_DUR}
              >
                <VideoSegment
                  imageSrc={imageSrc}
                  durationInFrames={IMAGE_DUR}
                  kenBurns={kbEffect}
                  zoomIntensity={1.18}
                  overlayOpacity={0.3}
                  gradientBottom={false}
                  gradientTop={false}
                  entrance="fade"
                  exit="fade"
                  transitionFrames={FADE_TRANSITION}
                >
                  {/* Big stat callout text — slamming in with spring */}
                  <AbsoluteFill
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SPACING.safeArea,
                    }}
                  >
                    <GalleryCallout text={calloutText} delay={3} />
                  </AbsoluteFill>
                </VideoSegment>
              </Sequence>
            );
          })}
        </AbsoluteFill>
      </Sequence>

      {/* ── CTA: Dark overlay with ref, price, website (3s) ──── */}
      <Sequence from={CTA_START} durationInFrames={CTA_DUR} name="CTA">
        <VideoSegment
          imageSrc={images[0]}
          durationInFrames={CTA_DUR}
          kenBurns="zoom-out"
          zoomIntensity={1.2}
          overlayOpacity={0.8}
          gradientBottom={false}
          gradientTop={false}
          entrance="fade"
          exit="none"
          transitionFrames={FADE_TRANSITION}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: SPACING.safeArea,
              flexDirection: "column",
              gap: 48,
            }}
          >
            {/* Property type */}
            <FadeUpText
              text={type}
              delay={8}
              style={ctaLabelStyle}
            />

            {/* Property location */}
            <FadeUpText
              text={`${title} in ${town}`}
              delay={15}
              style={ctaHeadlineStyle}
            />

            {/* Price again */}
            <FadeUpText
              text={`€${price.toLocaleString()}`}
              delay={22}
              style={ctaPriceStyle}
            />

            {/* Property ref */}
            <FadeUpText
              text={`Ref: ${propertyRef}`}
              delay={29}
              style={ctaRefStyle}
            />

            {/* Website URL — call to action */}
            <FadeUpText
              text={websiteUrl}
              delay={36}
              style={ctaUrlStyle}
            />

            {/* Tap / Swipe up indicator */}
            <FadeUpText
              text="Swipe Up"
              delay={43}
              style={ctaTapStyle}
            />
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>
    </AbsoluteFill>
  );
};

// ── Helper Functions ────────────────────────────────

/**
 * Build an array of callout texts from property details.
 * Array cycles through during rapid gallery sequence.
 */
function buildCallouts(
  bedrooms: number,
  bathrooms: number,
  area: number,
  features: string[]
): string[] {
  const callouts: string[] = [];

  // Bedrooms
  callouts.push(`${bedrooms} BEDROOM${bedrooms > 1 ? "S" : ""}`);

  // Bathrooms
  callouts.push(`${bathrooms} BATHROOM${bathrooms > 1 ? "S" : ""}`);

  // Area
  callouts.push(`${area} m²`);

  // Features (up to 7 more callouts)
  features.slice(0, 7).forEach((feature) => {
    callouts.push(feature.toUpperCase());
  });

  return callouts;
}

// ── Gallery Callout Text (animated) ──────────────────

/**
 * BIG BOLD text that SLAMS onto screen with spring animation.
 * Used for each image's stat callout in the rapid gallery.
 */
const GalleryCallout: React.FC<{ text: string; delay: number }> = ({
  text,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.4 }, // snappy spring
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [1.3, 1])})`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: FONT_SIZES["6xl"],
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1,
          textShadow: "0 4px 16px rgba(0, 0, 0, 0.8)",
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </span>
    </div>
  );
};

// ── Styles ──────────────────────────────────────────

const priceCalloutStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  fontSize: FONT_SIZES["6xl"],
  color: COLORS.accent,
  lineHeight: 1,
  letterSpacing: "-0.02em",
  marginBottom: 16,
};

const townCalloutStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.semibold,
  fontSize: FONT_SIZES.xl,
  color: COLORS.white,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
};

const watermarkStyle: React.CSSProperties = {
  position: "absolute",
  top: SPACING.safeArea,
  right: SPACING.safeArea,
};

const watermarkTextStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.medium,
  fontSize: FONT_SIZES.xs,
  color: COLORS.white,
  opacity: 0.5,
  letterSpacing: "0.02em",
};

const ctaLabelStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.medium,
  fontSize: FONT_SIZES.base,
  color: COLORS.accent,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const ctaHeadlineStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  fontSize: FONT_SIZES["4xl"],
  color: COLORS.white,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  textAlign: "center",
};

const ctaPriceStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  fontSize: FONT_SIZES["5xl"],
  color: COLORS.accent,
  lineHeight: 1,
  letterSpacing: "-0.02em",
};

const ctaRefStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.medium,
  fontSize: FONT_SIZES.base,
  color: COLORS.white,
  opacity: 0.8,
  letterSpacing: "0.02em",
};

const ctaUrlStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.semibold,
  fontSize: FONT_SIZES.lg,
  color: COLORS.accent,
  letterSpacing: "0.01em",
};

const ctaTapStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  fontSize: FONT_SIZES.xl,
  color: COLORS.white,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};
