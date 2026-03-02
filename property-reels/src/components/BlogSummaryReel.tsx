import { Sequence, interpolate, useCurrentFrame, Audio, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS, SPACING } from "../brand";
import { VideoSegment } from "./shared/VideoSegment";
import {
  FadeUpText,
  AccentLine,
  PillBadge,
  CTACard,
} from "./shared/AnimatedText";

/**
 * Schema for BlogSummaryReel props
 * Defines the structure of a blog article for conversion into a visual reel
 */
export const blogSummaryReelSchema = z.object({
  /** Title of the blog article */
  articleTitle: z.string(),

  /** Category of the blog post (e.g., "Buying Guide", "Investment", "Lifestyle") */
  category: z.string(),

  /** Optional hook question to grab attention (e.g., "Did you know...?") */
  hookQuestion: z.string().optional(),

  /** Array of 2-5 key points from the article */
  keyPoints: z
    .array(
      z.object({
        /** Headline for this key point */
        headline: z.string(),

        /** 1-2 line summary of the point */
        summary: z.string(),

        /** Optional background image for this point */
        image: z.string().optional(),
      })
    )
    .min(2)
    .max(5),

  /** Key message or memorable quote for the takeaway section */
  takeaway: z.string(),

  /** Video source for the hook section */
  videoHook: z.string(),

  /** Default video source for key points without custom images */
  videoPoints: z.string(),

  /** Video source for the CTA section */
  videoCTA: z.string(),

  /** Website URL for the CTA (default: newbuildhomescostablanca.com) */
  websiteUrl: z.string().default("newbuildhomescostablanca.com"),

  /** Optional slug for direct article link */
  articleSlug: z.string().optional(),

  /** Optional background music track */
  musicTrack: z.string().optional(),
});

export type BlogSummaryReelProps = z.infer<typeof blogSummaryReelSchema>;

/**
 * Calculate total duration in frames based on number of key points
 * Structure: Hook (90f) + KeyPoints (150f each) + Takeaway (90f) + CTA (120f)
 *
 * @param numKeyPoints Number of key points (2-5)
 * @returns Total duration in frames
 */
export const calculateBlogSummaryDuration = (numKeyPoints: number): number => {
  const validatedPoints = Math.min(Math.max(numKeyPoints, 2), 5);
  const HOOK_FRAMES = 120;
  const KEY_POINT_FRAMES = 180;
  const TAKEAWAY_FRAMES = 120;
  const CTA_FRAMES = 120;

  return (
    HOOK_FRAMES +
    KEY_POINT_FRAMES * validatedPoints +
    TAKEAWAY_FRAMES +
    CTA_FRAMES
  );
};

/**
 * Individual key point component
 * Displays a single insight with background media and animated text
 */
const KeyPoint: React.FC<{
  index: number;
  headline: string;
  summary: string;
  backgroundSrc?: string;
  fallbackVideo: string;
  startFrame: number;
  duration: number;
  kenBurnsIntensity: number;
}> = ({
  index,
  headline,
  summary,
  backgroundSrc,
  fallbackVideo,
  startFrame,
  duration,
  kenBurnsIntensity,
}) => {
  const pointNumber = String(index + 1).padStart(2, "0");
  const transitionFrames = 12;
  const contentStartFrame = transitionFrames;

  // Determine entrance animation based on index
  const entranceAnimations = ["slideUp", "slideLeft", "fade"];
  const entranceType = entranceAnimations[index % entranceAnimations.length];

  return (
    <Sequence from={startFrame} durationInFrames={duration}>
      {/* Background video/image with overlay */}
      <VideoSegment
        videoSrc={!backgroundSrc ? fallbackVideo : undefined}
        imageSrc={backgroundSrc}
        durationInFrames={duration}
        overlayOpacity={0.68}
        kenBurns="zoom-in"
        zoomIntensity={kenBurnsIntensity}
        entrance="fade"
        exit="fade"
        transitionFrames={transitionFrames}
      />

      {/* Point number - semi-transparent large text */}
      <div
        style={{
          position: "absolute",
          top: SPACING.lg,
          left: SPACING.lg,
          fontSize: FONT_SIZES["6xl"],
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.accent,
          opacity: 0.25,
          fontFamily: FONTS.primary,
          pointerEvents: "none",
        }}
      >
        {pointNumber}
      </div>

      {/* Point headline */}
      <Sequence from={contentStartFrame} durationInFrames={duration - contentStartFrame}>
        <div
          style={{
            position: "absolute",
            bottom: SPACING.lg,
            left: SPACING.lg,
            right: SPACING.lg,
            fontFamily: FONTS.primary,
          }}
        >
          <FadeUpText
            text={headline}
            delay={0}
            style={{
              fontSize: FONT_SIZES["3xl"],
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.white,
              lineHeight: 1.2,
              marginBottom: SPACING.md,
            }}
          />

          {/* Point summary */}
          <FadeUpText
            text={summary}
            delay={15}
            style={{
              fontSize: FONT_SIZES.lg,
              fontWeight: FONT_WEIGHTS.regular,
              color: COLORS.accentLight,
              lineHeight: 1.5,
            }}
          />
        </div>
      </Sequence>
    </Sequence>
  );
};

/**
 * BlogSummaryReel Component
 *
 * Transforms a blog article into an engaging 25-second (or dynamic) visual reel
 * for social media. Combines hook, key insights, takeaway, and CTA.
 *
 * Structure:
 * - Hook (3s): Article title with category badge and opening hook
 * - Key Points (5s each): Multiple insights with backgrounds and animations
 * - Takeaway (3s): Key message with accent styling
 * - CTA (4s): Call-to-action with website URL
 */
export const BlogSummaryReel: React.FC<BlogSummaryReelProps> = ({
  articleTitle,
  category,
  hookQuestion,
  keyPoints,
  takeaway,
  videoHook,
  videoPoints,
  videoCTA,
  websiteUrl = "newbuildhomescostablanca.com",
  articleSlug,
  musicTrack,
}) => {
  const currentFrame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Frame timings (slowed down for readability)
  const HOOK_FRAMES = 120;        // 4s (more time for title)
  const KEY_POINT_FRAMES = 180;   // 6s (slower, more readable)
  const TAKEAWAY_FRAMES = 120;    // 4s (more impact)
  const CTA_FRAMES = 120;         // 4s

  // Resolve music track
  const musicSrc = musicTrack
    ? musicTrack.startsWith("http")
      ? musicTrack
      : staticFile(musicTrack)
    : null;

  let currentFramePosition = 0;

  // Hook section (frames 0-89)
  const hookStart = currentFramePosition;
  const hookEnd = hookStart + HOOK_FRAMES;
  currentFramePosition = hookEnd;

  // Key points (each 150 frames)
  const keyPointStarts = keyPoints.map(() => {
    const start = currentFramePosition;
    currentFramePosition += KEY_POINT_FRAMES;
    return start;
  });

  // Takeaway section
  const takeawayStart = currentFramePosition;
  const takeawayEnd = takeawayStart + TAKEAWAY_FRAMES;
  currentFramePosition = takeawayEnd;

  // CTA section
  const ctaStart = currentFramePosition;
  const ctaEnd = ctaStart + CTA_FRAMES;

  // Ken Burns intensity variation per point
  const kenBurnsIntensities = [1.1, 0.95, 1.05, 1.0, 1.15];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.primary,
        fontFamily: FONTS.primary,
        overflow: "hidden",
      }}
    >
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

      {/* ===== HOOK SECTION (3s) ===== */}
      <Sequence from={hookStart} durationInFrames={HOOK_FRAMES}>
        <VideoSegment
          videoSrc={videoHook}
          durationInFrames={HOOK_FRAMES}
          overlayOpacity={0.65}
          kenBurns="zoom-in"
          zoomIntensity={1.15}
          entrance="fade"
          exit="fade"
          transitionFrames={12}
        />

        {/* Category badge */}
        <Sequence from={15} durationInFrames={60}>
          <div
            style={{
              position: "absolute",
              top: SPACING.safeArea,
              left: SPACING.lg,
            }}
          >
            <PillBadge
              text={category.toUpperCase()}
              delay={0}
              style={{
                fontSize: FONT_SIZES.sm,
                fontWeight: FONT_WEIGHTS.semibold,
                backgroundColor: COLORS.accent,
                color: COLORS.primary,
                padding: `${SPACING.xs}px ${SPACING.sm}px`,
                borderRadius: 24,
              }}
            />
          </div>
        </Sequence>

        {/* Article title */}
        <Sequence from={25} durationInFrames={60}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: SPACING.lg,
              right: SPACING.lg,
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: SPACING.md,
            }}
          >
            <FadeUpText
              text={articleTitle}
              delay={0}
              style={{
                fontSize: FONT_SIZES["3xl"],
                fontWeight: FONT_WEIGHTS.bold,
                color: COLORS.white,
                lineHeight: 1.2,
                maxWidth: "90%",
              }}
            />

            {/* Hook question if provided */}
            {hookQuestion && (
              <Sequence from={20} durationInFrames={40}>
                <FadeUpText
                  text={hookQuestion}
                  delay={0}
                  style={{
                    fontSize: FONT_SIZES.lg,
                    fontWeight: FONT_WEIGHTS.regular,
                    color: COLORS.accentLight,
                    maxWidth: "90%",
                    fontStyle: "italic",
                  }}
                />
              </Sequence>
            )}
          </div>
        </Sequence>
      </Sequence>

      {/* ===== KEY POINTS SECTION (5s each) ===== */}
      {keyPoints.map((point, index) => (
        <KeyPoint
          key={`key-point-${index}`}
          index={index}
          headline={point.headline}
          summary={point.summary}
          backgroundSrc={point.image}
          fallbackVideo={videoPoints}
          startFrame={keyPointStarts[index]}
          duration={KEY_POINT_FRAMES}
          kenBurnsIntensity={kenBurnsIntensities[index % kenBurnsIntensities.length]}
        />
      ))}

      {/* ===== TAKEAWAY SECTION (3s) ===== */}
      <Sequence from={takeawayStart} durationInFrames={TAKEAWAY_FRAMES}>
        {/* Dark background overlay */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.primary,
          }}
        />

        {/* Accent line at top */}
        <Sequence from={10} durationInFrames={70}>
          <div
            style={{
              position: "absolute",
              top: SPACING.safeArea,
              left: SPACING.lg,
            }}
          >
            <AccentLine
              delay={0}
              width={60}
              style={{
                backgroundColor: COLORS.accent,
                height: 3,
              }}
            />
          </div>
        </Sequence>

        {/* "Key Takeaway" label */}
        <Sequence from={15} durationInFrames={65}>
          <div
            style={{
              position: "absolute",
              top: SPACING.safeArea + 50,
              left: SPACING.lg,
            }}
          >
            <PillBadge
              text="KEY TAKEAWAY"
              delay={0}
              style={{
                fontSize: FONT_SIZES.base,
                fontWeight: FONT_WEIGHTS.semibold,
                color: COLORS.accent,
              }}
            />
          </div>
        </Sequence>

        {/* Takeaway quote/message */}
        <Sequence from={25} durationInFrames={65}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: SPACING.lg,
              right: SPACING.lg,
              transform: "translateY(-50%)",
            }}
          >
            <FadeUpText
              text={takeaway}
              delay={0}
              style={{
                fontSize: FONT_SIZES["4xl"],
                fontWeight: FONT_WEIGHTS.semibold,
                color: COLORS.white,
                lineHeight: 1.3,
                fontStyle: "italic",
              }}
            />
          </div>
        </Sequence>
      </Sequence>

      {/* ===== CTA SECTION (4s) ===== */}
      <Sequence from={ctaStart} durationInFrames={CTA_FRAMES}>
        <VideoSegment
          videoSrc={videoCTA}
          durationInFrames={CTA_FRAMES}
          overlayOpacity={0.65}
          kenBurns="zoom-out"
          zoomIntensity={0.95}
          entrance="fade"
          exit="fade"
          transitionFrames={12}
        />

        {/* CTA Card */}
        <Sequence from={20} durationInFrames={100}>
          <div
            style={{
              position: "absolute",
              bottom: SPACING.safeArea,
              left: SPACING.lg,
              right: SPACING.lg,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CTACard
              headline="Read the Full Guide"
              subtext={
                articleSlug
                  ? `newbuildhomescostablanca.com/${articleSlug}`
                  : websiteUrl
              }
              websiteUrl={
                articleSlug
                  ? `https://${websiteUrl}/${articleSlug}`
                  : `https://${websiteUrl}`
              }
              delay={0}
            />
          </div>
        </Sequence>
      </Sequence>
    </div>
  );
};

export default BlogSummaryReel;
