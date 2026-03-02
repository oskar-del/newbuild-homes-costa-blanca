#!/bin/bash
# ============================================================================
# Render all social media stills - Run this on your Mac
# Usage: cd property-reels && bash render-all.sh
# ============================================================================

OUT="out/social-posts"
mkdir -p "$OUT"

echo "🎬 Rendering 20 social media images (10 square + 10 Pinterest)..."
echo ""

# ── Property Cards ──────────────────────────────────────────────────────────

echo "📸 Property Cards..."

# 1. Penthouse Guardamar
npx remotion still PropertyCardSquare "$OUT/property-penthouse-guardamar-square.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/24512307/23-1.jpg","title":"2 Bed Penthouse Guardamar del Segura","price":249000,"bedrooms":2,"bathrooms":2,"area":80,"town":"Guardamar del Segura","type":"Penthouse","propertyRef":"N9499"}'

npx remotion still PropertyCardPinterest "$OUT/property-penthouse-guardamar-pinterest.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/24512307/23-1.jpg","images":["https://fotos15.apinmo.com/7515/24512307/23-1.jpg","https://fotos15.apinmo.com/7515/24512307/23-2.jpg","https://fotos15.apinmo.com/7515/24512307/23-3.jpg"],"title":"2 Bed Penthouse Guardamar del Segura","price":249000,"bedrooms":2,"bathrooms":2,"area":80,"town":"Guardamar del Segura","type":"Penthouse","propertyRef":"N9499"}'

# 2. Villa Torrevieja
npx remotion still PropertyCardSquare "$OUT/property-villa-torrevieja-square.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/27424204/10-1.jpg","title":"3 Bed Villa Torrevieja","price":389000,"bedrooms":3,"bathrooms":2,"area":120,"town":"Torrevieja","type":"Villa","propertyRef":"N8059"}'

npx remotion still PropertyCardPinterest "$OUT/property-villa-torrevieja-pinterest.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/27424204/10-1.jpg","images":["https://fotos15.apinmo.com/7515/27424204/10-1.jpg","https://fotos15.apinmo.com/7515/27424204/10-2.jpg","https://fotos15.apinmo.com/7515/27424204/10-3.jpg"],"title":"3 Bed Villa Torrevieja","price":389000,"bedrooms":3,"bathrooms":2,"area":120,"town":"Torrevieja","type":"Villa","propertyRef":"N8059"}'

# 3. Apartment Orihuela Costa
npx remotion still PropertyCardSquare "$OUT/property-apartment-orihuela-square.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/27424199/7-1.jpg","title":"2 Bed Apartment Orihuela Costa","price":195000,"bedrooms":2,"bathrooms":1,"area":65,"town":"Orihuela Costa","type":"Apartment","propertyRef":"N6552"}'

npx remotion still PropertyCardPinterest "$OUT/property-apartment-orihuela-pinterest.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/27424199/7-1.jpg","images":["https://fotos15.apinmo.com/7515/27424199/7-1.jpg","https://fotos15.apinmo.com/7515/27424199/7-2.jpg","https://fotos15.apinmo.com/7515/27424199/7-3.jpg"],"title":"2 Bed Apartment Orihuela Costa","price":195000,"bedrooms":2,"bathrooms":1,"area":65,"town":"Orihuela Costa","type":"Apartment","propertyRef":"N6552"}'

# 4. Townhouse Villamartín
npx remotion still PropertyCardSquare "$OUT/property-townhouse-villamartin-square.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/24512307/23-2.jpg","title":"New Build Townhouse near Golf","price":279000,"bedrooms":3,"bathrooms":2,"area":95,"town":"Villamartín","type":"Townhouse","propertyRef":"N7801"}'

npx remotion still PropertyCardPinterest "$OUT/property-townhouse-villamartin-pinterest.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/24512307/23-2.jpg","images":["https://fotos15.apinmo.com/7515/24512307/23-2.jpg","https://fotos15.apinmo.com/7515/24512307/23-3.jpg","https://fotos15.apinmo.com/7515/24512307/23-4.jpg"],"title":"New Build Townhouse near Golf","price":279000,"bedrooms":3,"bathrooms":2,"area":95,"town":"Villamartín","type":"Townhouse","propertyRef":"N7801"}'

# 5. Bungalow Guardamar
npx remotion still PropertyCardSquare "$OUT/property-bungalow-guardamar-square.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/24512307/23-3.jpg","title":"Ground Floor Bungalow with Garden","price":164000,"bedrooms":2,"bathrooms":1,"area":55,"town":"Guardamar del Segura","type":"Bungalow","propertyRef":"N8320"}'

npx remotion still PropertyCardPinterest "$OUT/property-bungalow-guardamar-pinterest.png" \
  --props='{"image":"https://fotos15.apinmo.com/7515/24512307/23-3.jpg","images":["https://fotos15.apinmo.com/7515/24512307/23-3.jpg","https://fotos15.apinmo.com/7515/24512307/23-4.jpg","https://fotos15.apinmo.com/7515/24512307/23-1.jpg"],"title":"Ground Floor Bungalow with Garden","price":164000,"bedrooms":2,"bathrooms":1,"area":55,"town":"Guardamar del Segura","type":"Bungalow","propertyRef":"N8320"}'

echo ""
echo "📸 Area Showcases..."

# ── Area Showcases ──────────────────────────────────────────────────────────

# 6. Torrevieja Beach
npx remotion still AreaShowcaseSquare "$OUT/area-torrevieja-beach-square.png" \
  --props='{"image":"area-photos/torrevieja-drone-playa-del-cura-beachfront-01.jpg","locationName":"Torrevieja","tagline":"Sun, Sea & Your Dream Home"}'

npx remotion still AreaShowcasePinterest "$OUT/area-torrevieja-beach-pinterest.png" \
  --props='{"image":"area-photos/torrevieja-drone-playa-del-cura-beachfront-01.jpg","locationName":"Torrevieja","tagline":"Sun, Sea & Your Dream Home"}'

# 7. Altea Old Town
npx remotion still AreaShowcaseSquare "$OUT/area-altea-oldtown-square.png" \
  --props='{"image":"area-photos/altea-drone-blue-dome-church-01.jpg","locationName":"Altea","tagline":"Mediterranean Charm at Its Finest"}'

npx remotion still AreaShowcasePinterest "$OUT/area-altea-oldtown-pinterest.png" \
  --props='{"image":"area-photos/altea-drone-blue-dome-church-01.jpg","locationName":"Altea","tagline":"Mediterranean Charm at Its Finest"}'

# 8. Cumbre del Sol
npx remotion still AreaShowcaseSquare "$OUT/area-cumbredelsol-square.png" \
  --props='{"image":"area-photos/benitachell-cliff-cove-turquoise-water-01.jpg","locationName":"Cumbre del Sol","tagline":"Clifftop Living, Ocean Views"}'

npx remotion still AreaShowcasePinterest "$OUT/area-cumbredelsol-pinterest.png" \
  --props='{"image":"area-photos/benitachell-cliff-cove-turquoise-water-01.jpg","locationName":"Cumbre del Sol","tagline":"Clifftop Living, Ocean Views"}'

# 9. Guardamar
npx remotion still AreaShowcaseSquare "$OUT/area-guardamar-dunes-square.png" \
  --props='{"image":"area-photos/guardamar-beach-sand-dunes-01.jpg","locationName":"Guardamar","tagline":"Natural Beauty, New Build Homes"}'

npx remotion still AreaShowcasePinterest "$OUT/area-guardamar-dunes-pinterest.png" \
  --props='{"image":"area-photos/guardamar-beach-sand-dunes-01.jpg","locationName":"Guardamar","tagline":"Natural Beauty, New Build Homes"}'

# 10. Costa Blanca Sunset
npx remotion still AreaShowcaseSquare "$OUT/area-costablanca-sunset-square.png" \
  --props='{"image":"area-photos/torrevieja-harbour-sunset-01.jpg","locationName":"Costa Blanca","tagline":"320 Days of Sunshine a Year"}'

npx remotion still AreaShowcasePinterest "$OUT/area-costablanca-sunset-pinterest.png" \
  --props='{"image":"area-photos/torrevieja-harbour-sunset-01.jpg","locationName":"Costa Blanca","tagline":"320 Days of Sunshine a Year"}'

echo ""
echo "🏁 Done! Check $OUT/ for all rendered images"
echo "📂 $(ls -1 $OUT/*.png 2>/dev/null | wc -l) images rendered"
