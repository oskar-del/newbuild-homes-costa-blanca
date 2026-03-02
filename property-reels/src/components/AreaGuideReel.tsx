/**
 * AreaGuideReel — 30-45 second vertical reel showcasing an area
 *
 * Pulls data from the area guide JSON and pairs it with
 * background videos for an engaging social media reel.
 *
 * SEGMENTS:
 *   1. Hero — area name + region + hook line (5s)
 *   2. Lifestyle highlights — 3 key points (7s)
 *   3. Amenities — beach/golf/dining proximity (6s)
 *   4. Investment stats — yield + appreciation (5s)
 *   5. "A Day In..." — morning/afternoon/evening (8s)
 *   6. CTA — website + contact (4s)
 *
 * Each segment has a different background video with Ken Burns
 * and smooth cross-fade transitions between segments.
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
} from "remotion";
import { VideoSegment } from "./shared/VideoSegment";
import {
  FadeUpText,
  AccentLine,
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

export const areaGuideReelSchema = z.object({
  areaName: z.string(),
  region: z.string(),
  heroIntro: z.string(),
  lifestyleHighlights: z.array(z.string()).min(1).max(5),
  amenities: z.object({
    beach: z.string().optional(),
    golf: z.string().optional(),
    dining: z.string().optional(),
    healthcare: z.string().optional(),
    airport: z.string().optional(),
  }),
  investmentData: z
    .object({
      rentalYield: z.string().optional(),
      appreciation: z.string().optional(),
      priceFrom: z.number().optional(),
    })
    .optional(),
  dayInTheLife: z
    .array(
      z.object({
        time: z.string(),
        activity: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  // Video backgrounds for each segment
  videoHero: z.string(),
  videoLifestyle: z.string(),
  videoAmenities: z.string(),
  videoInvestment: z.string(),
  videoDayInLife: z.string(),
  videoCTA: z.string(),
  // Branding
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
  musicTrack: z.string().optional(),
});

type AreaGuideReelProps = z.infer<typeof areaGuideReelSchema>;

// ── Segment durations (in frames at 30fps) ──────────
const FPS = 30;
const HERO_DUR = 5 * FPS; // 150 frames
const LIFESTYLE_DUR = 7 * FPS; // 210 frames
const AMENITIES_DUR = 6 * FPS; // 180 frames
const INVESTMENT_DUR = 5 * FPS; // 150 frames
const DAYINLIFE_DUR = 8 * FPS; // 240 frames
const CTA_DUR = 4 * FPS; // 120 frames
const CROSS_FADE = 12; // frames overlap

// Segment start times (with overlap for cross-fades)
const HERO_START = 0;
const LIFESTYLE_START = HERO_DUR - CROSS_FADE;
const AMENITIES_START = LIFESTYLE_START + LIFESTYLE_DUR - CROSS_FADE;
const INVESTMENT_START = AMENITIES_START + AMENITIES_DUR - CROSS_FADE;
const DAYINLIFE_START = INVESTMENT_START + INVESTMENT_DUR - CROSS_FADE;
const CTA_START = DAYINLIFE_START + DAYINLIFE_DUR - CROSS_FADE;

export const AREA_GUIDE_TOTAL_FRAMES =
  CTA_START + CTA_DUR; // ~33 seconds

// ── Main Component ──────────────────────────────────

export const AreaGuideReel: React.FC<AreaGuideReelProps> = (props) => {
  const {
    areaName,
    region,
    heroIntro,
    lifestyleHighlights,
    amenities,
    investmentData,
    dayInTheLife,
    videoHero,
    videoLifestyle,
    videoAmenities,
    videoInvestment,
    videoDayInLife,
    videoCTA,
    websiteUrl,
    musicTrack,
  } = props;

  // Resolve music source
  const musicSrc = musicTrack
    ? musicTrack.startsWith('http')
      ? musicTrack
      : staticFile(musicTrack)
    : null;

  // Truncate hero intro to first sentence
  const hookLine =
    heroIntro.split(".")[0].length > 100
      ? heroIntro.substring(0, 100) + "…"
      : heroIntro.split(".")[0] + ".";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      {/* Audio Track */}
      {musicSrc && (
        <Audio
          src={musicSrc}
          volume={(f) =>
            interpolate(f, [0, 10, AREA_GUIDE_TOTAL_FRAMES - 60, AREA_GUIDE_TOTAL_FRAMES], [0, 0.6, 0.6, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      )}

      {/* ── Segment 1: Hero ─────────────────────── */}
      <Sequence from={HERO_START} durationInFrames={HERO_DUR} name="Hero">
        <VideoSegment
          videoSrc={videoHero}
          durationInFrames={HERO_DUR}
          kenBurns="zoom-in"
          zoomIntensity={1.12}
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
              paddingTop: 200,
            }}
          >
            {/* Region badge */}
            <NavyBadge text={region} delay={8} />

            {/* Area name */}
            <FadeUpText
              text={areaName}
              delay={15}
              style={{
                ...headingLargeStyle,
                marginTop: 20,
              }}
            />

            {/* Gold accent line */}
            <AccentLine delay={22} width={160} style={{ marginTop: 24 }} />

            {/* Hook line */}
            <FadeUpText
              text={hookLine}
              delay={28}
              style={{
                ...bodyLargeStyle,
                marginTop: 20,
                maxWidth: 800,
              }}
            />
          </AbsoluteFill>

          {/* Logo watermark top-right */}
          <div style={watermarkStyle}>
            <span style={watermarkTextStyle}>{websiteUrl}</span>
          </div>
        </VideoSegment>
      </Sequence>

      {/* ── Segment 2: Lifestyle Highlights ──────── */}
      <Sequence
        from={LIFESTYLE_START}
        durationInFrames={LIFESTYLE_DUR}
        name="Lifestyle"
      >
        <VideoSegment
          videoSrc={videoLifestyle}
          durationInFrames={LIFESTYLE_DUR}
          kenBurns="pan-right"
          overlayOpacity={0.55}
          gradientBottom={false}
          entrance="slide-up"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              padding: SPACING.safeArea,
              gap: 24,
            }}
          >
            {/* Section label */}
            <NavyBadge text="Lifestyle" delay={5} />

            <FadeUpText
              text={`Living in ${areaName}`}
              delay={10}
              style={headingStyle}
            />

            <AccentLine delay={16} />

            {/* Highlight items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 12 }}>
              {lifestyleHighlights.slice(0, 4).map((highlight, i) => (
                <IconTextRow
                  key={i}
                  icon={["🏖️", "☀️", "🍷", "🏡"][i] || "✨"}
                  text={highlight}
                  delay={20 + i * 8}
                />
              ))}
            </div>
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── Segment 3: Amenities & Proximity ────── */}
      <Sequence
        from={AMENITIES_START}
        durationInFrames={AMENITIES_DUR}
        name="Amenities"
      >
        <VideoSegment
          videoSrc={videoAmenities}
          durationInFrames={AMENITIES_DUR}
          kenBurns="zoom-in"
          zoomIntensity={1.1}
          overlayOpacity={0.6}
          gradientBottom={false}
          entrance="slide-left"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              padding: SPACING.safeArea,
              gap: 20,
            }}
          >
            <NavyBadge text="Nearby" delay={5} />

            <FadeUpText
              text="Everything Close By"
              delay={10}
              style={headingStyle}
            />

            <AccentLine delay={16} />

            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 8 }}>
              {amenities.beach && (
                <IconTextRow icon="🏖️" text={amenities.beach} delay={20} />
              )}
              {amenities.golf && (
                <IconTextRow icon="⛳" text={amenities.golf} delay={28} />
              )}
              {amenities.dining && (
                <IconTextRow icon="🍽️" text={amenities.dining} delay={36} />
              )}
              {amenities.healthcare && (
                <IconTextRow icon="🏥" text={amenities.healthcare} delay={44} />
              )}
              {amenities.airport && (
                <IconTextRow icon="✈️" text={amenities.airport} delay={52} />
              )}
            </div>
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── Segment 4: Investment Stats ─────────── */}
      {investmentData && (
        <Sequence
          from={INVESTMENT_START}
          durationInFrames={INVESTMENT_DUR}
          name="Investment"
        >
          <VideoSegment
            videoSrc={videoInvestment}
            durationInFrames={INVESTMENT_DUR}
            kenBurns="pan-left"
            overlayOpacity={0.7}
            gradientBottom={false}
            entrance="zoom"
            exit="fade"
            transitionFrames={CROSS_FADE}
          >
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: SPACING.safeArea,
                gap: 32,
              }}
            >
              <NavyBadge text="Investment" delay={5} />

              <FadeUpText
                text="Smart Investment"
                delay={10}
                style={{ ...headingStyle, textAlign: "center" }}
              />

              <AccentLine delay={16} width={60} />

              {/* Stats row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 60,
                  marginTop: 16,
                }}
              >
                {investmentData.rentalYield && (
                  <StatBox
                    label="Rental Yield"
                    value={investmentData.rentalYield}
                    delay={22}
                  />
                )}
                {investmentData.appreciation && (
                  <StatBox
                    label="Appreciation"
                    value={investmentData.appreciation}
                    delay={30}
                  />
                )}
              </div>

              {investmentData.priceFrom && (
                <FadeUpText
                  text={`Properties from €${investmentData.priceFrom.toLocaleString()}`}
                  delay={38}
                  style={{
                    ...bodyLargeStyle,
                    color: COLORS.accent,
                    textAlign: "center",
                  }}
                />
              )}
            </AbsoluteFill>
          </VideoSegment>
        </Sequence>
      )}

      {/* ── Segment 5: A Day In The Life ─────────── */}
      {dayInTheLife && dayInTheLife.length > 0 && (
        <Sequence
          from={DAYINLIFE_START}
          durationInFrames={DAYINLIFE_DUR}
          name="DayInTheLife"
        >
          <VideoSegment
            videoSrc={videoDayInLife}
            durationInFrames={DAYINLIFE_DUR}
            kenBurns="pan-up"
            overlayOpacity={0.6}
            gradientBottom={false}
            entrance="slide-up"
            exit="fade"
            transitionFrames={CROSS_FADE}
          >
            <AbsoluteFill
              style={{
                justifyContent: "center",
                padding: SPACING.safeArea,
                gap: 20,
              }}
            >
              <NavyBadge text={`A Day in ${areaName}`} delay={5} />

              <FadeUpText
                text="Your Typical Day"
                delay={10}
                style={headingStyle}
              />

              <AccentLine delay={16} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  marginTop: 12,
                }}
              >
                {dayInTheLife.slice(0, 4).map((entry, i) => (
                  <TimelineEntry
                    key={i}
                    time={entry.time}
                    activity={entry.activity}
                    delay={22 + i * 12}
                  />
                ))}
              </div>
            </AbsoluteFill>
          </VideoSegment>
        </Sequence>
      )}

      {/* ── Segment 6: CTA ──────────────────────── */}
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
            headline={`Discover ${areaName}`}
            subtext={`Find your dream home on the ${region}`}
            websiteUrl={websiteUrl}
            delay={8}
          />
        </VideoSegment>
      </Sequence>
    </AbsoluteFill>
  );
};

// ── Helper sub-components ───────────────────────────

const NavyBadge: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
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
        display: "inline-block",
        alignSelf: "flex-start",
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        padding: "10px 28px",
        borderRadius: 8,
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.bold,
        fontFamily: FONTS.primary,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      {text}
    </div>
  );
};

const StatBox: React.FC<{
  label: string;
  value: string;
  delay: number;
}> = ({ label, value, delay }) => {
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
        gap: 8,
        padding: "24px 32px",
        backgroundColor: COLORS.primary,
        border: `2px solid ${COLORS.accent}`,
        borderRadius: 12,
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: FONT_SIZES["2xl"],
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
          fontSize: FONT_SIZES.sm,
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

const TimelineEntry: React.FC<{
  time: string;
  activity: string;
  delay: number;
}> = ({ time, activity, delay }) => {
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
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [-40, 0])}px)`,
      }}
    >
      {/* Time badge */}
      <div
        style={{
          minWidth: 140,
          padding: "12px 20px",
          borderRadius: 10,
          backgroundColor: COLORS.primary,
          border: `2px solid ${COLORS.accent}`,
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: FONT_SIZES.sm,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        {time}
      </div>

      {/* Activity text */}
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: FONT_SIZES.base,
          color: COLORS.white,
          lineHeight: 1.4,
        }}
      >
        {activity}
      </span>
    </div>
  );
};

// ── Shared styles ───────────────────────────────────

const headingLargeStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  fontSize: FONT_SIZES["3xl"],
  color: COLORS.white,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
};

const headingStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  fontSize: FONT_SIZES["2xl"],
  color: COLORS.white,
  lineHeight: 1.15,
  letterSpacing: "-0.01em",
};

const bodyLargeStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.base,
  color: COLORS.white,
  lineHeight: 1.4,
  opacity: 0.9,
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
