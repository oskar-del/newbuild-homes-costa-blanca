import { Composition } from "remotion";
import { PropertyReel, propertyReelSchema } from "./components/PropertyReel";
import { PropertyCarousel, propertyCarouselSchema } from "./components/PropertyCarousel";

/**
 * Remotion Root - Registers all video compositions
 *
 * Compositions:
 * 1. PropertyReel - Single property showcase (9:16 vertical for Instagram/TikTok)
 * 2. PropertyCarousel - Multiple properties slideshow (9:16 vertical)
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Single property reel - 15 seconds, 9:16 vertical */}
      <Composition
        id="PropertyReel"
        component={PropertyReel}
        schema={propertyReelSchema}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          propertyRef: "N9499",
          images: [
            "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-2.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-3.jpg",
            "https://fotos15.apinmo.com/7515/24512307/23-4.jpg",
          ],
          title: "2 Bed Penthouse Guardamar del Segura",
          price: 249000,
          bedrooms: 2,
          bathrooms: 2,
          area: 80,
          town: "Guardamar del Segura",
          province: "Alicante",
          type: "Penthouse",
          features: ["Pool", "Golf View", "Terrace"],
          agentName: "Oskar Peterson",
          agentPhone: "+34 634 044 970",
          websiteUrl: "newbuildhomescostablanca.com",
          language: "en" as const,
        }}
      />

      {/* Property carousel - 30 seconds, 9:16 vertical */}
      <Composition
        id="PropertyCarousel"
        component={PropertyCarousel}
        schema={propertyCarouselSchema}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          properties: [
            {
              reference: "N9499",
              image: "https://fotos15.apinmo.com/7515/24512307/23-1.jpg",
              title: "2 Bed Penthouse Guardamar",
              price: 249000,
              bedrooms: 2,
              bathrooms: 2,
              area: 80,
              town: "Guardamar del Segura",
              type: "Penthouse",
            },
            {
              reference: "N8059",
              image: "https://fotos15.apinmo.com/7515/27424204/10-1.jpg",
              title: "3 Bed Villa Torrevieja",
              price: 389000,
              bedrooms: 3,
              bathrooms: 2,
              area: 120,
              town: "Torrevieja",
              type: "Villa",
            },
            {
              reference: "N6552",
              image: "https://fotos15.apinmo.com/7515/27424199/7-1.jpg",
              title: "2 Bed Apartment Orihuela Costa",
              price: 195000,
              bedrooms: 2,
              bathrooms: 1,
              area: 65,
              town: "Orihuela Costa",
              type: "Apartment",
            },
          ],
          headline: "New Build Homes Costa Blanca",
          subheadline: "From €164,000",
          agentName: "Oskar Peterson",
          agentPhone: "+34 634 044 970",
          websiteUrl: "newbuildhomescostablanca.com",
          language: "en" as const,
        }}
      />
    </>
  );
};
