import { useVideoConfig, AbsoluteFill, Sequence, Audio, staticFile, interpolate } from 'remotion';
import { z } from 'zod';
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../brand';
import { VideoSegment } from './shared/VideoSegment';
import { FadeUpText, AccentLine, PillBadge } from './shared/AnimatedText';
import { AnimatedCounter, CTACard } from './shared/AnimatedText';

/** Schema for InvestmentCaseReel props */
export const investmentCaseReelSchema = z.object({
  headline: z.string().default('Why Investors Choose Costa Blanca'),
  areaName: z.string().optional(),
  stats: z
    .array(
      z.object({
        label: z.string(), // "Rental Yield"
        value: z.number(), // 6.5
        prefix: z.string().optional(), // "€"
        suffix: z.string().optional(), // "%"
        isCurrency: z.boolean().optional(),
        decimals: z.number().optional(),
      })
    )
    .min(2)
    .max(6),
  ctaText: z.string().default('Start Investing Today'),
  ctaSubtext: z.string().optional(),
  videoHook: z.string(),
  videoStats: z.string(),
  videoCTA: z.string(),
  /** Optional hero image overlay for the hook (e.g. building render) */
  heroImage: z.string().optional(),
  websiteUrl: z.string().default('newbuildhomescostablanca.com'),
  musicTrack: z.string().optional(),
});

export type InvestmentCaseReelProps = z.infer<typeof investmentCaseReelSchema>;

export const INVESTMENT_CASE_REEL_FRAMES = 450;

/**
 * InvestmentCaseReel - 15 second Remotion composition
 *
 * A data-heavy investment marketing reel with three segments:
 * 1. Hook (3s) - Building video with headline and accent line
 * 2. Stats Dashboard (8s) - Animated counters in grid layout
 * 3. CTA (4s) - Call-to-action with property count
 *
 * Designed to target investors with impressive metrics and ROI data.
 *
 * @example
 * <Composition
 *   id="investment-case-reel"
 *   component={InvestmentCaseReel}
 *   durationInFrames={INVESTMENT_CASE_REEL_FRAMES}
 *   fps={30}
 *   width={1080}
 *   height={1920}
 *   defaultProps={{...}}
 *   schema={investmentCaseReelSchema}
 * />
 */
export const InvestmentCaseReel: React.FC<InvestmentCaseReelProps> = ({
  headline,
  areaName,
  stats,
  ctaText,
  ctaSubtext,
  videoHook,
  videoStats,
  videoCTA,
  heroImage,
  websiteUrl,
  musicTrack,
}) => {
  const { fps } = useVideoConfig();

  // Resolve music source
  const musicSrc = musicTrack
    ? musicTrack.startsWith('http')
      ? musicTrack
      : staticFile(musicTrack)
    : null;

  // Segment timing
  const hookFrames = 90; // 3s
  const statsDashboardFrames = 240; // 8s
  const ctaFrames = 120; // 4s
  const transitionFrames = 12; // 0.4s crossfade

  const segment2Start = hookFrames - transitionFrames;
  const segment3Start = segment2Start + statsDashboardFrames - transitionFrames;

  // Calculate staggered start times for stats (each 12 frames apart, starting at frame 30)
  const statsStartFrame = 30;
  const statsPerRowDelay = 12;

  /**
   * Segment 1: Hook
   * Building video with headline, pill badge, and accent line
   */
  const renderHook = () => (
    <VideoSegment
      videoSrc={videoHook}
      imageSrc={heroImage}
      durationInFrames={hookFrames}
      kenBurns="zoom-in"
      zoomIntensity={1.15}
      overlayOpacity={0.4}
      gradientBottom
      transitionFrames={transitionFrames}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingLeft: SPACING.safeArea,
          paddingRight: SPACING.safeArea,
          paddingBottom: SPACING["2xl"],
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {/* Pill Badge - Top Left */}
        <PillBadge text="INVESTMENT" delay={15} style={{ position: 'absolute', top: 40, left: 40 }} />

        {/* Logo Circle - Top Right */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 3,
          }}
        />

        {/* Main Headline */}
        <FadeUpText
          text={headline}
          delay={30}
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES['5xl'],
            fontWeight: FONT_WEIGHTS.regular,
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            lineHeight: 1.2,
            marginBottom: SPACING.lg,
            maxWidth: '90%',
          }}
        />

        {/* Accent Line */}
        <AccentLine delay={50} width={80} />
      </div>
    </VideoSegment>
  );

  /**
   * Segment 2: Stats Dashboard
   * Grid of animated counters showing investment metrics
   */
  const renderStatsDashboard = () => {
    // Layout: 2 columns × 3 rows (or adjust based on stats count)
    const columns = 2;
    const statWidth = 200;
    const statHeight = 160;
    const horizontalGap = SPACING.xl;
    const verticalGap = SPACING["2xl"];

    // Grid container dimensions
    const gridWidth = columns * statWidth + (columns - 1) * horizontalGap;

    return (
      <VideoSegment
        videoSrc={videoStats}
        durationInFrames={statsDashboardFrames}
        overlayOpacity={0.4}
        gradientBottom
        transitionFrames={transitionFrames}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: SPACING.safeArea,
            paddingRight: SPACING.safeArea,
            zIndex: 2,
          }}
        >
          {/* Frosted Badge - Top Left */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 6,
              paddingBottom: 6,
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.primary,
                fontSize: FONT_SIZES.xs,
                fontWeight: FONT_WEIGHTS.semibold,
                color: COLORS.primary,
              }}
            >
              METRICS
            </div>
          </div>

          {/* Stats Title */}
          <FadeUpText
            text="Investment Metrics"
            delay={10}
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES["2xl"],
              fontWeight: FONT_WEIGHTS.regular,
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: SPACING.xl,
            }}
          />

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: `${verticalGap}px ${horizontalGap}px`,
              width: gridWidth,
              justifyContent: 'center',
            }}
          >
            {stats.map((stat, index) => {
              const delayOffset = statsStartFrame + index * statsPerRowDelay;

              return (
                <StatCard
                  key={`stat-${index}`}
                  label={stat.label}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isCurrency={stat.isCurrency}
                  decimals={stat.decimals}
                  delay={delayOffset}
                />
              );
            })}
          </div>
        </div>
      </VideoSegment>
    );
  };

  /**
   * Segment 3: CTA
   * Call-to-action with editorial serif heading and subtle gold accent
   */
  const renderCTA = () => (
    <VideoSegment
      videoSrc={videoCTA}
      durationInFrames={ctaFrames}
      overlayOpacity={0.4}
      gradientBottom
      transitionFrames={transitionFrames}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: SPACING.safeArea,
          paddingRight: SPACING.safeArea,
          zIndex: 2,
        }}
      >
        {/* Editorial Serif Heading */}
        <FadeUpText
          text={ctaText}
          delay={20}
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES['5xl'],
            fontWeight: FONT_WEIGHTS.regular,
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            lineHeight: 1.2,
            marginBottom: SPACING.lg,
            maxWidth: '90%',
            textAlign: 'center',
          }}
        />

        {/* Subtle Gold Accent Line */}
        <div
          style={{
            width: 60,
            height: 2,
            backgroundColor: COLORS.accent,
            marginBottom: SPACING['2xl'],
            opacity: 0.7,
          }}
        />

        {/* Subtext */}
        {ctaSubtext && (
          <FadeUpText
            text={ctaSubtext}
            delay={35}
            style={{
              fontFamily: FONTS.primary,
              fontSize: FONT_SIZES.base,
              fontWeight: FONT_WEIGHTS.regular,
              color: '#ffffff',
              marginBottom: SPACING["2xl"],
              opacity: 0.85,
            }}
          />
        )}

        {/* Website URL at Bottom */}
        <FadeUpText
          text={websiteUrl}
          delay={50}
          style={{
            fontFamily: FONTS.primary,
            fontSize: FONT_SIZES.sm,
            fontWeight: FONT_WEIGHTS.regular,
            color: COLORS.accent,
            marginTop: SPACING.lg,
            opacity: 0.8,
            letterSpacing: '0.5px',
          }}
        />
      </div>
    </VideoSegment>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary, overflow: 'hidden' }}>
      {/* Audio Track */}
      {musicSrc && (
        <Audio
          src={musicSrc}
          volume={(f) =>
            interpolate(f, [0, 10, INVESTMENT_CASE_REEL_FRAMES - 60, INVESTMENT_CASE_REEL_FRAMES], [0, 0.6, 0.6, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      )}

      {/* Segment 1: Hook */}
      <Sequence from={0} durationInFrames={hookFrames} name="InvestHook">
        {renderHook()}
      </Sequence>

      {/* Segment 2: Stats Dashboard */}
      <Sequence from={segment2Start} durationInFrames={statsDashboardFrames} name="InvestStats">
        {renderStatsDashboard()}
      </Sequence>

      {/* Segment 3: CTA */}
      <Sequence from={segment3Start} durationInFrames={ctaFrames} name="InvestCTA">
        {renderCTA()}
      </Sequence>
    </AbsoluteFill>
  );
};

/**
 * StatCard - Individual stat display with animated counter
 *
 * Shows a large animated number with a label below in grid layout.
 * Counter animates over ~30 frames for impact.
 * Uses editorial serif font for values with lighter weight.
 *
 * @param label - Stat label e.g. "Rental Yield"
 * @param value - Numeric value to animate to
 * @param prefix - Optional prefix e.g. "€"
 * @param suffix - Optional suffix e.g. "%"
 * @param isCurrency - Use currency formatting
 * @param decimals - Number of decimal places
 * @param delay - Frame delay before animation starts
 */
const StatCard: React.FC<{
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  decimals?: number;
  delay: number;
}> = ({ label, value, prefix, suffix, isCurrency, decimals, delay }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Animated Counter Value */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES['5xl'],
          fontWeight: FONT_WEIGHTS.regular,
          color: COLORS.accent,
          textAlign: 'center',
          marginBottom: SPACING.md,
          lineHeight: 1,
        }}
      >
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          delay={delay}
          duration={30}
          currency={isCurrency}
          decimals={decimals}
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES['5xl'],
            fontWeight: FONT_WEIGHTS.regular,
            color: COLORS.accent,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: FONT_SIZES.base,
          fontWeight: FONT_WEIGHTS.regular,
          color: '#ffffff',
          textAlign: 'center',
          opacity: 0.85,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default InvestmentCaseReel;
