#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# RENDER ALL VENTO CONTENT — Videos + Stills
# Run on your Mac: cd property-reels && bash render-vento.sh
# ═══════════════════════════════════════════════════════════════════════════

set -e

VIDS="out/videos"
STILLS="out/social-posts"
mkdir -p "$VIDS" "$STILLS"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  EDIFICIO VENTO — Full Render Pipeline                      ║"
echo "║  7 video reels + 10 still images                            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# ── VIDEO REELS ────────────────────────────────────────────────────────────
echo "🎬 RENDERING VIDEO REELS..."
echo ""

echo "  [1/7] VentoCinematic (35s)..."
npx remotion render VentoCinematic "$VIDS/vento-cinematic.mp4" --codec h264

echo "  [2/7] VentoRapid (15s)..."
npx remotion render VentoRapid "$VIDS/vento-rapid.mp4" --codec h264

echo "  [3/7] VentoPenthouseCinematic (35s)..."
npx remotion render VentoPenthouseCinematic "$VIDS/vento-penthouse-cinematic.mp4" --codec h264

echo "  [4/7] VentoPenthouseRapid (15s)..."
npx remotion render VentoPenthouseRapid "$VIDS/vento-penthouse-rapid.mp4" --codec h264

echo "  [5/7] VentoBlogReel (30s)..."
npx remotion render VentoBlogReel "$VIDS/vento-blog-reel.mp4" --codec h264

echo "  [6/7] VentoAreaGuide (33s)..."
npx remotion render VentoAreaGuide "$VIDS/vento-area-guide.mp4" --codec h264

echo "  [7/7] VentoInvestmentCase (15s)..."
npx remotion render VentoInvestmentCase "$VIDS/vento-investment-case.mp4" --codec h264

echo ""
echo "✅ All 7 video reels rendered!"
echo ""

# ── STILL IMAGES ───────────────────────────────────────────────────────────
echo "📸 RENDERING STILL IMAGES..."
echo ""

echo "  [1/10] VentoOverviewSquare..."
npx remotion still VentoOverviewSquare --output "$STILLS/vento-overview-square.png"

echo "  [2/10] VentoOverviewPinterest..."
npx remotion still VentoOverviewPinterest --output "$STILLS/vento-overview-pinterest.png"

echo "  [3/10] Vento2BedSquare..."
npx remotion still Vento2BedSquare --output "$STILLS/vento-2bed-square.png"

echo "  [4/10] Vento2BedPinterest..."
npx remotion still Vento2BedPinterest --output "$STILLS/vento-2bed-pinterest.png"

echo "  [5/10] VentoPenthouseSquare..."
npx remotion still VentoPenthouseSquare --output "$STILLS/vento-penthouse-square.png"

echo "  [6/10] VentoPenthousePinterest..."
npx remotion still VentoPenthousePinterest --output "$STILLS/vento-penthouse-pinterest.png"

echo "  [7/10] Vento3BedSquare..."
npx remotion still Vento3BedSquare --output "$STILLS/vento-3bed-square.png"

echo "  [8/10] Vento3BedPinterest..."
npx remotion still Vento3BedPinterest --output "$STILLS/vento-3bed-pinterest.png"

echo "  [9/10] VentoTorreviejaSquare..."
npx remotion still VentoTorreviejaSquare --output "$STILLS/vento-torrevieja-square.png"

echo "  [10/10] VentoTorreviejaPinterest..."
npx remotion still VentoTorreviejaPinterest --output "$STILLS/vento-torrevieja-pinterest.png"

echo ""
echo "✅ All 10 stills rendered!"
echo ""

# ── SUMMARY ────────────────────────────────────────────────────────────────
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  RENDER COMPLETE                                            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "  🎬 Videos: $(ls -1 $VIDS/*.mp4 2>/dev/null | wc -l) files in $VIDS/"
echo "  📸 Stills: $(ls -1 $STILLS/*.png 2>/dev/null | wc -l) files in $STILLS/"
echo ""
echo "  Next steps:"
echo "    1. Preview: node schedule-engine.mjs --batch content-batches/vento.json --dry-run"
echo "    2. Go live: node schedule-engine.mjs --batch content-batches/vento.json"
