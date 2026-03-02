/**
 * DayInTheLifeReel — A 30-second vertical reel showcasing a full day in a Costa Blanca area
 *
 * Presents a morning-to-evening lifestyle journey through sequential time periods:
 *   • Morning (sunrise/beach activities)
 *   • Late Morning (continued activities)
 *   • Afternoon (dining/recreation)
 *   • Evening (sunset/social activities)
 *
 * Each period shows a time badge, period label, and 2-3 key activities.
 * Flexible timeline structure allows 2-6 segments based on data provided.
 *
 * SEGMENTS:
 *   1. Title Card (3s) — "A Day in [Area]" with sunrise video
 *   2. Time Periods (4s-6s each) — Staggered activities with time badges
 *   3. Summary Quote (2s) — Tagline over nature video
 *   4. CTA (3s) — Call-to-action card
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
  staticFile,
} from "remotion";
import { VideoSegment } from "./shared/VideoSegment";
import {
  FadeUpText,
  AccentLine,
  PillBadge,
  IconTextRow,
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

export const dayInTheLifeReelSchema = z.object({
  areaName: z.string(),
  region: z.string(),
  tagline: z.string().optional(),

  // Timeline of time periods with activities
  timeline: z.array(
    z.object({
      timeRange: z.string(), // "07:00 – 09:00"
      period: z.string(), // "Morning", "Late Morning", etc.
      activities: z.array(
        z.object({
          icon: z.string(), // emoji
          activity: z.string(),
          description: z.string(),
        })
      ).min(1).max(3),
    })
  ).min(2).max(6),

  // Video backgrounds for each segment
  videoTitle: z.string(),
  videoMorning: z.string(),
  videoLateMorning: z.string().optional(),
  videoAfternoon: z.string(),
  videoEvening: z.string(),
  videoCTA: z.string(),

  // Branding
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),
  musicTrack: z.string().optional(),
});

type DayInTheLifeReelProps = z.infer<typeof dayInTheLifeReelSchema>;

// ── Duration calculation ────────────────────────────

const FPS = 30;
const TITLE_DUR = 3 * FPS; // 90 frames
const PERIOD_DUR_MIN = 4 * FPS; // 120 frames (minimum per period)
const PERIOD_DUR_MAX = 6 * FPS; // 180 frames (maximum per period)
const SUMMARY_DUR = 2 * FPS; // 60 frames
const CTA_DUR = 3 * FPS; // 90 frames
const CROSS_FADE = 12; // frames overlap

/**
 * Calculate total duration based on number of timeline periods
 * Distributes 30 seconds across fixed segments + variable period segments
 */
export const calculateDayInTheLifeDuration = (timelineCount: number): number => {
  const fixedDuration = TITLE_DUR + SUMMARY_DUR + CTA_DUR;

  // Distribute remaining time across periods
  const remainingTime = (30 * FPS) - fixedDuration - (CROSS_FADE * (timelineCount + 2));
  const perPeriod = Math.max(PERIOD_DUR_MIN, Math.floor(remainingTime / timelineCount));

  const totalFrames = fixedDuration + (perPeriod * timelineCount) + (CROSS_FADE * (timelineCount + 2));
  return Math.round(totalFrames);
};

// ── Timing calculation ──────────────────────────────

const getTiming = (timelineCount: number) => {
  const perPeriod = Math.max(
    PERIOD_DUR_MIN,
    Math.floor(((30 * FPS) - TITLE_DUR - SUMMARY_DUR - CTA_DUR - (CROSS_FADE * (timelineCount + 2))) / timelineCount)
  );

  const TITLE_START = 0;
  const TITLE_END = TITLE_START + TITLE_DUR;

  const periodStarts: number[] = [];
  let currentPos = TITLE_END - CROSS_FADE;

  for (let i = 0; i < timelineCount; i++) {
    periodStarts.push(currentPos);
    currentPos += perPeriod - CROSS_FADE;
  }

  const SUMMARY_START = periodStarts[timelineCount - 1] + perPeriod - CROSS_FADE;
  const CTA_START = SUMMARY_START + SUMMARY_DUR - CROSS_FADE;

  return {
    TITLE_START,
    TITLE_DUR,
    TITLE_END,
    periodStarts,
    perPeriod,
    SUMMARY_START,
    SUMMARY_DUR,
    CTA_START,
    CTA_DUR,
    TOTAL_FRAMES: CTA_START + CTA_DUR,
  };
};

// ── Main Component ──────────────────────────────────

export const DayInTheLifeReel: React.FC<DayInTheLifeReelProps> = (props) => {
  const {
    areaName,
    region,
    tagline,
    timeline,
    videoTitle,
    videoMorning,
    videoLateMorning,
    videoAfternoon,
    videoEvening,
    videoCTA,
    websiteUrl,
    musicTrack,
  } = props;

  const timing = getTiming(timeline.length);

  // Select period videos in order
  const periodVideos = [
    videoMorning,
    videoLateMorning || videoAfternoon,
    videoAfternoon,
    videoEvening,
  ];

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
            interpolate(f, [0, 10, timing.TOTAL_FRAMES - 60, timing.TOTAL_FRAMES], [0, 0.6, 0.6, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      )}
      {/* ── Segment 1: Title Card ─────────────────────── */}
      <Sequence
        from={timing.TITLE_START}
        durationInFrames={timing.TITLE_DUR}
        name="DayInLifeTitle"
      >
        <VideoSegment
          videoSrc={videoTitle}
          durationInFrames={timing.TITLE_DUR}
          kenBurns="zoom-out"
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
            {/* Region badge */}
            <PillBadge text={region} delay={8} />

            {/* Main title */}
            <FadeUpText
              text={`A Day in ${areaName}`}
              delay={15}
              style={{...headingLargeStyle, marginTop: SPACING.md}}
            />

            {/* Accent line */}
            <AccentLine delay={22} width={120} style={{ marginTop: SPACING.lg }} />

            {/* Subheading */}
            <FadeUpText
              text="Morning to Evening"
              delay={28}
              style={{
                ...bodyLargeStyle,
                marginTop: SPACING.lg,
              }}
            />
          </AbsoluteFill>

          {/* Watermark */}
          <div style={watermarkStyle}>
            <span style={watermarkTextStyle}>{websiteUrl}</span>
          </div>
        </VideoSegment>
      </Sequence>

      {/* ── Segments 2+: Time Periods ─────────────────── */}
      {timeline.map((period, periodIndex) => {
        const periodStart = timing.periodStarts[periodIndex];
        const periodDuration = timing.perPeriod;
        const videoSrc = periodVideos[Math.min(periodIndex, periodVideos.length - 1)];

        // Determine overlay opacity based on period
        const overlayOpacity = 0.55;

        return (
          <Sequence
            key={periodIndex}
            from={periodStart}
            durationInFrames={periodDuration}
            name={`Period-${period.period}`}
          >
            <VideoSegment
              videoSrc={videoSrc}
              durationInFrames={periodDuration}
              kenBurns={
                periodIndex === 0 ? "pan-right" :
                periodIndex === timeline.length - 1 ? "zoom-in" :
                periodIndex % 2 === 0 ? "pan-left" : "pan-right"
              }
              overlayOpacity={overlayOpacity}
              gradientBottom={false}
              entrance="slide-up"
              exit="fade"
              transitionFrames={CROSS_FADE}
            >
              <AbsoluteFill
                style={{
                  justifyContent: "center",
                  padding: SPACING.safeArea,
                  gap: SPACING.lg,
                }}
              >
                {/* Period label */}
                <FadeUpText
                  text={period.period.toUpperCase()}
                  delay={5}
                  style={{
                    fontFamily: FONTS.primary,
                    fontWeight: FONT_WEIGHTS.bold,
                    fontSize: FONT_SIZES["5xl"],
                    color: COLORS.white,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
                  }}
                />

                {/* Time badge */}
                <TimeRangeBadge
                  timeRange={period.timeRange}
                  delay={12}
                />

                {/* Activities */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: SPACING.lg,
                    marginTop: SPACING.md,
                  }}
                >
                  {period.activities.slice(0, 3).map((act, actIndex) => (
                    <ActivityRow
                      key={actIndex}
                      icon={act.icon}
                      activity={act.activity}
                      description={act.description}
                      delay={18 + actIndex * 10}
                    />
                  ))}
                </div>
              </AbsoluteFill>
            </VideoSegment>
          </Sequence>
        );
      })}

      {/* ── Segment: Summary Quote ────────────────────── */}
      <Sequence
        from={timing.SUMMARY_START}
        durationInFrames={timing.SUMMARY_DUR}
        name="SummaryQuote"
      >
        <VideoSegment
          videoSrc={videoEvening}
          durationInFrames={timing.SUMMARY_DUR}
          kenBurns="zoom-in"
          zoomIntensity={1.1}
          overlayOpacity={0.7}
          gradientBottom={false}
          entrance="fade"
          exit="fade"
          transitionFrames={CROSS_FADE}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: SPACING.safeArea,
            }}
          >
            <FadeUpText
              text={tagline || "This could be your everyday."}
              delay={5}
              style={{
                ...headingStyle,
                textAlign: "center",
                maxWidth: 700,
              }}
            />
          </AbsoluteFill>
        </VideoSegment>
      </Sequence>

      {/* ── Segment: CTA ────────────────────────────── */}
      <Sequence
        from={timing.CTA_START}
        durationInFrames={timing.CTA_DUR}
        name="DayInLifeCTA"
      >
        <VideoSegment
          videoSrc={videoCTA}
          durationInFrames={timing.CTA_DUR}
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
            subtext={`Your home on the ${region}`}
            websiteUrl={websiteUrl}
            delay={8}
          />
        </VideoSegment>
      </Sequence>
    </AbsoluteFill>
  );
};

// ── Helper Components ───────────────────────────────

/**
 * Glowing time range badge (e.g., "07:00 – 09:00")
 */
const TimeRangeBadge: React.FC<{
  timeRange: string;
  delay: number;
}> = ({ timeRange, delay }) => {
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
        padding: `${SPACING.sm}px ${SPACING.md}px`,
        borderRadius: 8,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        border: "2px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "0 0 16px rgba(255, 255, 255, 0.2)",
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.85, 1])})`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.primary,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: FONT_SIZES.xl,
          color: COLORS.white,
          letterSpacing: "0.02em",
        }}
      >
        {timeRange}
      </span>
    </div>
  );
};

/**
 * Activity row with icon, activity name, and description
 */
const ActivityRow: React.FC<{
  icon: string;
  activity: string;
  description: string;
  delay: number;
}> = ({ icon, activity, description, delay }) => {
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
        gap: SPACING.md,
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [-40, 0])}px)`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: FONT_SIZES["3xl"],
          minWidth: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      {/* Text content */}
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.xs }}>
        <span
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.semibold,
            fontSize: FONT_SIZES.xl,
            color: COLORS.white,
          }}
        >
          {activity}
        </span>
        <span
          style={{
            fontFamily: FONTS.primary,
            fontWeight: FONT_WEIGHTS.regular,
            fontSize: FONT_SIZES.base,
            color: COLORS.white,
            opacity: 0.7,
            lineHeight: 1.4,
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
};

// ── Shared Styles ───────────────────────────────────

const headingLargeStyle: React.CSSProperties = {
  fontFamily: FONTS.primary,
  fontWeight: FONT_WEIGHTS.bold,
  fontSize: FONT_SIZES["4xl"],
  color: COLORS.white,
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
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
  fontSize: FONT_SIZES.lg,
  color: COLORS.white,
  lineHeight: 1.5,
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
