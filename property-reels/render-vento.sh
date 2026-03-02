#!/bin/bash
# ============================================================================
# Render all Edificio Vento social media stills
# 5 posts × 2 formats (Square 1080×1080 + Pinterest 1080×1350) = 10 images
# ============================================================================

set -e

OUTPUT_DIR="out/social-posts"
mkdir -p "$OUTPUT_DIR"

echo "╔══════════════════════════════════════════════════╗"
echo "║   Rendering Edificio Vento Stills                ║"
echo "║   5 posts × 2 formats = 10 images                ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── Post 1: Development Overview ──
echo "🏢 [1/5] Vento Overview..."
npx remotion still VentoOverviewSquare --output "$OUTPUT_DIR/vento-overview-square.png" 2>/dev/null
npx remotion still VentoOverviewPinterest --output "$OUTPUT_DIR/vento-overview-pinterest.png" 2>/dev/null
echo "  ✅ Overview done"

# ── Post 2: Two-Bedroom Apartment ──
echo "🛏️  [2/5] Vento 2-Bed..."
npx remotion still Vento2BedSquare --output "$OUTPUT_DIR/vento-2bed-square.png" 2>/dev/null
npx remotion still Vento2BedPinterest --output "$OUTPUT_DIR/vento-2bed-pinterest.png" 2>/dev/null
echo "  ✅ 2-Bed done"

# ── Post 3: Penthouse ──
echo "🏊 [3/5] Vento Penthouse..."
npx remotion still VentoPenthouseSquare --output "$OUTPUT_DIR/vento-penthouse-square.png" 2>/dev/null
npx remotion still VentoPenthousePinterest --output "$OUTPUT_DIR/vento-penthouse-pinterest.png" 2>/dev/null
echo "  ✅ Penthouse done"

# ── Post 4: 3-Bed Flagship ──
echo "🏡 [4/5] Vento 3-Bed..."
npx remotion still Vento3BedSquare --output "$OUTPUT_DIR/vento-3bed-square.png" 2>/dev/null
npx remotion still Vento3BedPinterest --output "$OUTPUT_DIR/vento-3bed-pinterest.png" 2>/dev/null
echo "  ✅ 3-Bed done"

# ── Post 5: Torrevieja Area Showcase ──
echo "🌊 [5/5] Vento Torrevieja Area..."
npx remotion still VentoTorreviejaSquare --output "$OUTPUT_DIR/vento-torrevieja-square.png" 2>/dev/null
npx remotion still VentoTorreviejaPinterest --output "$OUTPUT_DIR/vento-torrevieja-pinterest.png" 2>/dev/null
echo "  ✅ Torrevieja done"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   All 10 Vento stills rendered!                   ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "Output:"
ls -lh "$OUTPUT_DIR"/vento-*.png
echo ""
echo "Next step: node upload-vento-to-postiz.mjs"
