import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  Easing,
} from "remotion";
import { z } from "zod";

// ============================================================================
// SCHEMA
// ============================================================================

export const logoIntroSchema = z.object({
  variant: z.enum(["watermark", "youtube-intro", "end-card"]).default("watermark"),
});

type LogoIntroProps = z.infer<typeof logoIntroSchema>;

// ============================================================================
// BRAND COLORS
// ============================================================================

const COLORS = {
  primary: "#1a2332",
  accent: "#c5a55a",
  white: "#ffffff",
};

// ============================================================================
// WATERMARK — Small corner logo for TikTok/Reels (overlay on top of reels)
// Subtle, doesn't steal attention from the hook
// ============================================================================

const Watermark: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Gentle fade in over 0.5s
  const opacity = interpolate(frame, [0, 15], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const finalOpacity = Math.min(opacity, frame > durationInFrames - 10 ? fadeOut : opacity);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 40,
          opacity: finalOpacity,
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
        }}
      >
        <Img
          src={staticFile("logo-round.png")}
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// YOUTUBE INTRO — Full animated logo for YouTube long-form (3 seconds)
// Smooth entrance with the round logo scaling up, then horizontal logo fades in
// ============================================================================

const YouTubeIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Round logo scales in with bounce
  const logoScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 22,
    config: { damping: 10 },
  });

  const logoOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold lines draw in from center
  const lineWidth = interpolate(frame, [8, 28], [0, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "Costa Blanca" text fades in below
  const textOpacity = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = spring({
    frame: frame - 20,
    fps,
    from: 15,
    to: 0,
    durationInFrames: 15,
  });

  // Subtle shimmer across the gold line
  const shimmerX = interpolate(frame, [25, 50], [-200, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse behind logo
  const glowOpacity = interpolate(frame, [15, 35, 50, 70], [0, 0.2, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(197,165,90,${glowOpacity}) 0%, transparent 60%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Round logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            marginBottom: 30,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
          }}
        >
          <Img
            src={staticFile("logo-round.png")}
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Gold line below logo */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: COLORS.accent,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -1,
              left: shimmerX,
              width: 50,
              height: 5,
              background: `linear-gradient(90deg, transparent, ${COLORS.white}, transparent)`,
              opacity: 0.5,
            }}
          />
        </div>

        {/* Costa Blanca text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <div
            style={{
              color: COLORS.accent,
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: 14,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Costa Blanca
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            opacity: textOpacity * 0.4,
            marginTop: 30,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 18,
              letterSpacing: 3,
            }}
          >
            newbuildhomescostablanca.com
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// END CARD — Quick logo flash before CTA (0.8 second)
// Just the round logo popping in, clean and fast
// ============================================================================

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fast pop-in
  const scale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    durationInFrames: 10,
    config: { damping: 12 },
  });

  const opacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity * fadeOut,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Round logo — centered, clean */}
        <Img
          src={staticFile("logo-round.png")}
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
          }}
        />

        {/* Gold line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: COLORS.accent,
            borderRadius: 2,
          }}
        />

        {/* Costa Blanca */}
        <div
          style={{
            color: COLORS.accent,
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: 10,
            textTransform: "uppercase",
          }}
        >
          Costa Blanca
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// MAIN EXPORT
// ============================================================================

export const LogoIntro: React.FC<LogoIntroProps> = ({ variant = "watermark" }) => {
  if (variant === "watermark") return <Watermark />;
  if (variant === "youtube-intro") return <YouTubeIntro />;
  if (variant === "end-card") return <EndCard />;
  return <Watermark />;
};
