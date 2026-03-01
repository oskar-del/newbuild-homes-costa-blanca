#!/bin/bash
# ============================================================================
# Render Edificio Vento social media stills
# Usage: cd property-reels && bash render-edificio-vento.sh
#
# Prerequisites: Copy Vento images to property-reels/public/vento/
#   cp ../public/images/blog/edificio-vento/edificio-vento-exterior.png public/vento/
#   cp ../public/images/blog/edificio-vento/edificio-vento-night.png public/vento/
#   cp ../public/images/blog/edificio-vento/edificio-vento-sunset.png public/vento/
#   cp ../public/images/blog/edificio-vento/floorplan-overview.webp public/vento/
# ============================================================================

OUT="out/edificio-vento"
mkdir -p "$OUT"
mkdir -p public/vento

# Copy images if not already there
if [ ! -f public/vento/edificio-vento-exterior.png ]; then
  echo "📋 Copying Vento images to public/vento/..."
  cp ../public/images/blog/edificio-vento/edificio-vento-exterior.png public/vento/ 2>/dev/null
  cp ../public/images/blog/edificio-vento/edificio-vento-night.png public/vento/ 2>/dev/null
  cp ../public/images/blog/edificio-vento/edificio-vento-sunset.png public/vento/ 2>/dev/null
  cp ../public/images/blog/edificio-vento/floorplan-overview.webp public/vento/ 2>/dev/null
  cp ../public/images/blog/edificio-vento/edificio-vento-apartments-overview.webp public/vento/ 2>/dev/null
fi

echo "🏗️ Rendering Edificio Vento social media stills..."
echo ""

# ── 1. Development Overview — Hero shot ───────────────────────────────────
echo "📸 1/6: Development overview (square + pinterest)"

npx remotion still PropertyCardSquare "$OUT/vento-overview-square.png" \
  --props='{"image":"vento/edificio-vento-exterior.png","title":"Edificio Vento — New Build Torrevieja Centre","price":158000,"bedrooms":1,"bathrooms":1,"area":48,"town":"Torrevieja","type":"Apartment","propertyRef":"N9593","websiteUrl":"newbuildhomescostablanca.com"}'

npx remotion still PropertyCardPinterest "$OUT/vento-overview-pinterest.png" \
  --props='{"image":"vento/edificio-vento-exterior.png","images":["vento/edificio-vento-exterior.png","vento/edificio-vento-night.png","vento/edificio-vento-sunset.png"],"title":"Edificio Vento — New Build Torrevieja Centre","price":158000,"bedrooms":1,"bathrooms":1,"area":48,"town":"Torrevieja","type":"Apartment","propertyRef":"N9593","websiteUrl":"newbuildhomescostablanca.com"}'

# ── 2. Two-Bedroom Unit ───────────────────────────────────────────────────
echo "📸 2/6: Two-bedroom apartment (square + pinterest)"

npx remotion still PropertyCardSquare "$OUT/vento-2bed-square.png" \
  --props='{"image":"vento/edificio-vento-exterior.png","title":"2 Bed Apartment Edificio Vento Torrevieja","price":245000,"bedrooms":2,"bathrooms":1,"area":89,"town":"Torrevieja","type":"Apartment","propertyRef":"N9594","websiteUrl":"newbuildhomescostablanca.com"}'

npx remotion still PropertyCardPinterest "$OUT/vento-2bed-pinterest.png" \
  --props='{"image":"vento/edificio-vento-exterior.png","images":["vento/edificio-vento-exterior.png","vento/edificio-vento-night.png","vento/edificio-vento-sunset.png"],"title":"2 Bed Apartment Edificio Vento Torrevieja","price":245000,"bedrooms":2,"bathrooms":1,"area":89,"town":"Torrevieja","type":"Apartment","propertyRef":"N9594","websiteUrl":"newbuildhomescostablanca.com"}'

# ── 3. Penthouse with Pool ────────────────────────────────────────────────
echo "📸 3/6: Penthouse with pool (square + pinterest)"

npx remotion still PropertyCardSquare "$OUT/vento-penthouse-square.png" \
  --props='{"image":"vento/edificio-vento-night.png","title":"Duplex Penthouse with Private Pool — Edificio Vento","price":412000,"bedrooms":2,"bathrooms":2,"area":173,"town":"Torrevieja","type":"Penthouse","propertyRef":"N9535","websiteUrl":"newbuildhomescostablanca.com"}'

npx remotion still PropertyCardPinterest "$OUT/vento-penthouse-pinterest.png" \
  --props='{"image":"vento/edificio-vento-night.png","images":["vento/edificio-vento-night.png","vento/edificio-vento-exterior.png","vento/edificio-vento-sunset.png"],"title":"Duplex Penthouse with Private Pool — Edificio Vento","price":412000,"bedrooms":2,"bathrooms":2,"area":173,"town":"Torrevieja","type":"Penthouse","propertyRef":"N9535","websiteUrl":"newbuildhomescostablanca.com"}'

echo ""
echo "🏁 Done! Check $OUT/ for all rendered images"
echo "📂 $(ls -1 $OUT/*.png 2>/dev/null | wc -l) images rendered"
