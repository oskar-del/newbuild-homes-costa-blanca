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
          {/* Tag pill — top left */}
          <div style={{ position: "absolute", top: 40, left: 40 }}>
            <FrostedBadge text="Area Guide" delay={8} />
          </div>

          {/* Logo circle — top right */}
          <div style={logoCircleStyle}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}></span>
          </div>

          {/* Bottom text — editorial */}
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 48px 160px",
              gap: 14,
            }}
          >
            {/* Area name — large editorial serif */}
            <FadeUpText
              text={areaName}
              delay={12}
              style={{
                fontFamily: FONTS.display,
                fontWeight: FONT_WEIGHTS.regular,
                fontSize: FONT_SIZES["3xl"],
                color: "#ffffff",
                lineHeight: 1.05,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            />

            {/* Hook line */}
            <FadeUpText
              text={hookLine}
              delay={20}
              style={{
                ...bodyLargeStyle,
                maxWidth: 800,
              }}
            />

            <AccentLine delay={26} width={60} style={{ marginTop: 4 }} />

            {/* Website */}
            <FadeUpText
              text={websiteUrl}
              delay={32}
              style={watermarkTextStyle}
            />
          </AbsoluteFill>
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
          overlayOpacity={0.35}
          gradientBottom
          entrance="slide-up"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <div style={{ position: "absolute", top: 40, left: 40 }}>
            <FrostedBadge text="Lifestyle" delay={5} />
          </div>

          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 48px 120px",
              gap: 16,
            }}
          >
            <FadeUpText
              text={`Living in ${areaName}`}
              delay={10}
              style={editorialHeadingStyle}
            />

            <AccentLine delay={16} width={60} />

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
              {lifestyleHighlights.slice(0, 4).map((highlight, i) => (
                <FadeUpText
                  key={i}
                  text={highlight}
                  delay={20 + i * 8}
                  style={listItemStyle}
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
          overlayOpacity={0.35}
          gradientBottom
          entrance="slide-left"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <div style={{ position: "absolute", top: 40, left: 40 }}>
            <FrostedBadge text="Nearby" delay={5} />
          </div>

          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: "0 48px 120px",
              gap: 16,
            }}
          >
            <FadeUpText
              text="Everything Close By"
              delay={10}
              style={editorialHeadingStyle}
            />

            <AccentLine delay={16} width={60} />

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
              {amenities.beach && (
                <FadeUpText text={amenities.beach} delay={20} style={listItemStyle} />
              )}
              {amenities.golf && (
                <FadeUpText text={amenities.golf} delay={28} style={listItemStyle} />
              )}
              {amenities.dining && (
                <FadeUpText text={amenities.dining} delay={36} style={listItemStyle} />
              )}
              {amenities.healthcare && (
                <FadeUpText text={amenities.healthcare} delay={44} style={listItemStyle} />
              )}
              {amenities.airport && (
                <FadeUpText text={amenities.airport} delay={52} style={listItemStyle} />
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
            overlayOpacity={0.4}
            gradientBottom
            entrance="zoom"
            exit="fade"
            transitionFrames={CROSS_FADE}
          >
            <div style={{ position: "absolute", top: 40, left: 40 }}>
              <FrostedBadge text="Investment" delay={5} />
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
                style={editorialHeadingStyle}
              />

              <AccentLine delay={16} width={60} />

              <div style={{ display: "flex", gap: 48, marginTop: 8 }}>
                {investmentData.rentalYield && (
                  <StatBox label="Rental Yield" value={investmentData.rentalYield} delay={22} />
                )}
                {investmentData.appreciation && (
                  <StatBox label="Appreciation" value={investmentData.appreciation} delay={30} />
                )}
              </div>

              {investmentData.priceFrom && (
                <FadeUpText
                  text={`Properties from €${investmentData.priceFrom.toLocaleString()}`}
                  delay={38}
                  style={listItemStyle}
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
            overlayOpacity={0.35}
            gradientBottom
            entrance="slide-up"
            exit="fade"
            transitionFrames={CROSS_FADE}
          >
            <div style={{ position: "absolute", top: 40, left: 40 }}>
              <FrostedBadge text={`A Day in ${areaName}`} delay={5} />
            </div>

            <AbsoluteFill
              style={{
                justifyContent: "flex-end",
                padding: "0 48px 120px",
                gap: 16,
              }}
            >
              <FadeUpText
                text="Your Typical Day"
                delay={10}
                style={editorialHeadingStyle}
              />

              <AccentLine delay={16} width={60} />

              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 8 }}>
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

/** Frosted glass badge — matches editorial PropertyCard/AreaShowcase style */
const FrostedBadge: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
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
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        padding: "12px 24px",
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: FONT_WEIGHTS.medium,
        fontFamily: FONTS.primary,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.accent }} />
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
      {/* Time badge — frosted glass */}
      <div
        style={{
          minWidth: 120,
          padding: "10px 18px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: 16,
          color: COLORS.primary,
          textAlign: "center",
          letterSpacing: "0.06em",
        }}
      >
        {time}
      </div>

      {/* Activity text */}
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.regular,
          fontSize: FONT_SIZES.base,
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.4,
        }}
      >
        {activity}
      </span>
    </div>
  );
};

// ── Editorial styles ─────────────────────────────────

const editorialHeadingStyle: React.CSSProperties = {
  fontFamily: FONTS.display,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES["2xl"],
  color: "#ffffff",
  lineHeight: 1.1,
  textShadow: "0 2px 16px rgba(0,0,0,0.3)",
};

const bodyLargeStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.regular,
  fontSize: FONT_SIZES.base,
  color: "rgba(255,255,255,0.8)",
  lineHeight: 1.4,
};

const listItemStyle: React.CSSProperties = {
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
