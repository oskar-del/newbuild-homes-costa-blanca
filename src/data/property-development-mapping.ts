/**
 * Property to Development Mapping
 *
 * This file maps property references from the REDSP feed to their
 * development/builder information which is NOT included in the Kyero XML format.
 *
 * Data source: REDSP Backend Screenshots
 *
 * To add more properties:
 * 1. Get screenshots from REDSP backend
 * 2. Add entries to propertyMapping with: reference, developer, development, deliveryDate, zone
 */

export interface PropertyDevelopmentInfo {
  developer: string;
  development: string;
  deliveryDate: string;  // Format: DD-MM-YYYY
  zone?: string;
}

/**
 * Map of property reference to development info
 */
export const propertyMapping: Record<string, PropertyDevelopmentInfo> = {
  // ==========================================
  // GUEMAR - GOMERA STAR (Torrevieja, Aguas Nuevas)
  // ==========================================
  'N9525': { developer: 'GUEMAR', development: 'GOMERA STAR', deliveryDate: '01-06-2026', zone: 'Aguas Nuevas' },
  'N9523': { developer: 'GUEMAR', development: 'GOMERA STAR', deliveryDate: '01-06-2026', zone: 'Aguas Nuevas' },
  'N9524': { developer: 'GUEMAR', development: 'GOMERA STAR', deliveryDate: '01-06-2026', zone: 'Aguas Nuevas' },

  // ==========================================
  // SAMAGUL - MIRASAL 2 (Torrevieja, Los Balcones)
  // ==========================================
  'N9511': { developer: 'SAMAGUL', development: 'MIRASAL 2', deliveryDate: '01-12-2026', zone: 'Los Balcones' },
  'N9512': { developer: 'SAMAGUL', development: 'MIRASAL 2', deliveryDate: '01-12-2026', zone: 'Los Balcones' },
  'N9510': { developer: 'SAMAGUL', development: 'MIRASAL 2', deliveryDate: '01-12-2026', zone: 'Los Balcones' },
  'N9509': { developer: 'SAMAGUL', development: 'MIRASAL 2', deliveryDate: '01-12-2026', zone: 'Los Balcones' },

  // ==========================================
  // AVKR HOMES - SAMAR VILLAS (Orihuela Costa, Las Filipinas)
  // ==========================================
  'N9507': { developer: 'AVKR HOMES', development: 'SAMAR VILLAS', deliveryDate: '01-06-2028', zone: 'Las Filipinas' },
  'N9506': { developer: 'AVKR HOMES', development: 'SAMAR VILLAS', deliveryDate: '01-06-2028', zone: 'Las Filipinas' },

  // ==========================================
  // BLUE MED INVEST - SILVER VIEWS (Puerto de Mazarron, Mar De Plata)
  // ==========================================
  'N9519': { developer: 'BLUE MED INVEST', development: 'SILVER VIEWS', deliveryDate: '01-12-2026', zone: 'Mar De Plata' },

  // ==========================================
  // BLUE MED INVEST - TAURUS (Puerto de Mazarron, Mar de Plata)
  // ==========================================
  'N9521': { developer: 'BLUE MED INVEST', development: 'TAURUS', deliveryDate: '01-01-2027', zone: 'Mar de Plata' },

  // ==========================================
  // BLUE MED INVEST - COUNTRY CLUB (Mazarron, Country Club)
  // ==========================================
  'N9502': { developer: 'BLUE MED INVEST', development: 'COUNTRY CLUB', deliveryDate: '01-05-2027', zone: 'Country Club' },

  // ==========================================
  // AVGD - VALL DEL PORTET (Benitachell, Golden Valley)
  // ==========================================
  'N9518': { developer: 'AVGD', development: 'VALL DEL PORTET', deliveryDate: '01-10-2026', zone: 'Golden Valley' },
  'N9517': { developer: 'AVGD', development: 'VALL DEL PORTET', deliveryDate: '01-07-2026', zone: 'Golden Valley' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - BELICH TOURISTIC APARTMENTS (Los Alcazares, Los Narejos)
  // ==========================================
  'N9515': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'BELICH TOURISTIC APARTMENTS', deliveryDate: '01-01-2026', zone: 'Los Narejos' },
  'N9513': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'BELICH TOURISTIC APARTMENTS', deliveryDate: '01-01-2026', zone: 'Los Narejos' },
  'N9514': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'BELICH TOURISTIC APARTMENTS', deliveryDate: '01-01-2026', zone: 'Los Narejos' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - VILLA LO LORENZO (Los Alcazares)
  // ==========================================
  'N9520': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'VILLA LO LORENZO', deliveryDate: '01-07-2027', zone: 'Los Alcazares' },

  // ==========================================
  // GARCISA - VILLA PINOSO (Pinoso, Campo)
  // ==========================================
  'N9516': { developer: 'GARCISA', development: 'VILLA PINOSO', deliveryDate: '01-05-2027', zone: 'Campo' },

  // ==========================================
  // PRIMER GRUPO VEGACASA - MERAKI VILLAS (Benferri, Benfis Park)
  // ==========================================
  'N9522': { developer: 'PRIMER GRUPO VEGACASA', development: 'MERAKI VILLAS', deliveryDate: '01-04-2026', zone: 'Benfis Park' },

  // ==========================================
  // QUADRATIA - ALLON BAY HILLS (Villajoyosa, La Tellerola)
  // ==========================================
  'SP1441': { developer: 'QUADRATIA', development: 'ALLON BAY HILLS', deliveryDate: '01-08-2027', zone: 'La Tellerola' },

  // ==========================================
  // EUROMARINA - LUISA (Rojales, Doña Pepa)
  // ==========================================
  'SP1442': { developer: 'EUROMARINA', development: 'LUISA', deliveryDate: '01-12-2026', zone: 'Doña Pepa' },
  'SP1443': { developer: 'EUROMARINA', development: 'LUISA', deliveryDate: '01-12-2026', zone: 'Doña Pepa' },

  // ==========================================
  // CONTRIMAR - OASIS LAGUNA 3 (Guardamar del Segura, El Raso)
  // ==========================================
  'N9493': { developer: 'CONTRIMAR', development: 'OASIS LAGUNA 3', deliveryDate: '01-03-2027', zone: 'El Raso' },
  'N9495': { developer: 'CONTRIMAR', development: 'OASIS LAGUNA 3', deliveryDate: '01-03-2027', zone: 'El Raso' },
  'N9496': { developer: 'CONTRIMAR', development: 'OASIS LAGUNA 3', deliveryDate: '01-03-2027', zone: 'El Raso' },
  'N9608': { developer: 'CONTRIMAR', development: 'OASIS LAGUNA 3', deliveryDate: '01-03-2027', zone: 'El Raso' },
  'N9497': { developer: 'CONTRIMAR', development: 'OASIS LAGUNA 3', deliveryDate: '01-03-2027', zone: 'El Raso' },
  'N9498': { developer: 'CONTRIMAR', development: 'OASIS LAGUNA 3', deliveryDate: '01-03-2027', zone: 'El Raso' },

  // ==========================================
  // GRUPO VISMELL - LA SUNRISE F3 (Los Alcazares, Lo Serena Golf)
  // ==========================================
  'N9481': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-12-2027', zone: 'Lo Serena Golf' },
  'N9482': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-12-2027', zone: 'Lo Serena Golf' },
  'N9483': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-12-2027', zone: 'Lo Serena Golf' },
  'N9503': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-05-2028', zone: 'Lo Serena Golf' },
  'N9504': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-05-2028', zone: 'Lo Serena Golf' },
  'N9505': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-05-2028', zone: 'Lo Serena Golf' },

  // ==========================================
  // VISMEV - RESIDENCIAL ARENA (Torre Pacheco, El Abito)
  // ==========================================
  'N9484': { developer: 'VISMEV', development: 'RESIDENCIAL ARENA', deliveryDate: '01-11-2027', zone: 'El Abito' },

  // ==========================================
  // NPE - FINESTRAT PARADISE RESORT (Finestrat, Campana Garden)
  // ==========================================
  'N9508': { developer: 'NPE', development: 'FINESTRAT PARADISE RESORT', deliveryDate: '01-12-2026', zone: 'Campana Garden' },

  // ==========================================
  // IMMO ALTEA - MIRADOR DE RELLEU (Relleu, pueblo)
  // ==========================================
  'SP1437': { developer: 'IMMO ALTEA', development: 'MIRADOR DE RELLEU', deliveryDate: '01-06-2026', zone: 'pueblo' },

  // ==========================================
  // MIMOSAN SPA ALLEE - SENDA DE LOS FLAMENCOS (San Javier, Parque del olivo)
  // ==========================================
  'N9501': { developer: 'MIMOSAN SPA ALLEE', development: 'SENDA DE LOS FLAMENCOS', deliveryDate: '01-05-2027', zone: 'Parque del olivo' },

  // ==========================================
  // GRUPO VISMELL - LA SUNRISE F3 (Los Alcazares, Lo Serena Golf) - Additional
  // ==========================================
  'N9489': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-12-2027', zone: 'Lo Serena Golf' },
  'N9490': { developer: 'GRUPO VISMELL', development: 'LA SUNRISE F3', deliveryDate: '01-12-2027', zone: 'Lo Serena Golf' },

  // ==========================================
  // SONKEL - SUNRISE BEACH (El Campello, Muchavista)
  // ==========================================
  'SP1432': { developer: 'SONKEL', development: 'SUNRISE BEACH', deliveryDate: '01-12-2027', zone: 'Muchavista' },
  'SP1433': { developer: 'SONKEL', development: 'SUNRISE BEACH', deliveryDate: '01-12-2027', zone: 'Muchavista' },
  'SP1434': { developer: 'SONKEL', development: 'SUNRISE BEACH', deliveryDate: '01-12-2027', zone: 'Muchavista' },
  'SP1435': { developer: 'SONKEL', development: 'SUNRISE BEACH', deliveryDate: '01-12-2027', zone: 'Muchavista' },
  'SP1431': { developer: 'SONKEL', development: 'SUNRISE BEACH', deliveryDate: '01-12-2027', zone: 'Muchavista' },

  // ==========================================
  // JJ PROPERTIES - VEGA GOLF VISTABELLA (Jacarilla, Vistabella)
  // ==========================================
  'N9491': { developer: 'JJ PROPERTIES', development: 'VEGA GOLF VISTABELLA', deliveryDate: '01-06-2027', zone: 'Vistabella' },

  // ==========================================
  // MORENO Y PARTNERS - ESSENCE III DOLORES (Dolores, Sector 2)
  // ==========================================
  'N9476': { developer: 'MORENO Y PARTNERS', development: 'ESSENCE III DOLORES', deliveryDate: '01-06-2026', zone: 'Sector 2' },
  'N9480': { developer: 'MORENO Y PARTNERS', development: 'ESSENCE III DOLORES', deliveryDate: '01-06-2026', zone: 'Sector 2' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - RESIDENCIAL AIRE LIMPIO IV (Alhama, Antreos)
  // ==========================================
  'N9492': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'RESIDENCIAL AIRE LIMPIO IV', deliveryDate: '01-05-2027', zone: 'Antreos' },

  // ==========================================
  // MLD LUXURY PROPERTIES - DOMO CATRAL (Catral, pueblo)
  // ==========================================
  'N9438': { developer: 'MLD LUXURY PROPERTIES', development: 'DOMO CATRAL', deliveryDate: '01-01-2026', zone: 'pueblo' },

  // ==========================================
  // ASARON STUDIO - CASA ALTARIS (Javea/Xabia, Valle del Sol)
  // ==========================================
  'N9435': { developer: 'ASARON STUDIO', development: 'CASA ALTARIS', deliveryDate: '01-08-2027', zone: 'Valle del Sol' },

  // ==========================================
  // ASARON STUDIO - CA SOUS (Javea/Xabia, Valle del Sol)
  // Note: N9453 moved to ALEGRIA - ALEGRA XXV based on later screenshot
  // ==========================================

  // ==========================================
  // ASARON STUDIO - CA SOROLLA (Javea/Xabia, Valle del Sol)
  // Note: N9454 moved to ALEGRIA - ALEGRA XXV based on later screenshot
  // ==========================================

  // ==========================================
  // ASARON STUDIO - CA LOS OLIVOS (Javea/Xabia, Valle del Sol)
  // ==========================================
  'N9451': { developer: 'ASARON STUDIO', development: 'CA LOS OLIVOS', deliveryDate: '01-10-2025', zone: 'Valle del Sol' },

  // ==========================================
  // ASARON STUDIO - CA SALINA (Los Llomios)
  // ==========================================
  'N9452': { developer: 'ASARON STUDIO', development: 'CA SALINA', deliveryDate: '01-03-2027', zone: 'Los Llomios' },

  // ==========================================
  // RASARA - LA VUELTA (San Miguel de Salinas)
  // ==========================================
  'N9479': { developer: 'RASARA', development: 'LA VUELTA', deliveryDate: '01-10-2025', zone: 'San Miguel De Salinas' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - MEDINA VILLAS (Torre Pacheco, pueblo)
  // ==========================================
  'N9398': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'MEDINA VILLAS', deliveryDate: '01-06-2027', zone: 'pueblo' },

  // ==========================================
  // PRIME HOME ALICANTE - VIDASSOL XI (Benijofar, Pueblo)
  // ==========================================
  'N9418': { developer: 'PRIME HOME ALICANTE', development: 'VIDASSOL XI', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9414': { developer: 'PRIME HOME ALICANTE', development: 'VIDASSOL XI', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9415': { developer: 'PRIME HOME ALICANTE', development: 'VIDASSOL XI', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9416': { developer: 'PRIME HOME ALICANTE', development: 'VIDASSOL XI', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9467': { developer: 'PRIME HOME ALICANTE', development: 'VIDASSOL XI', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  // Note: N9468 moved to INTERCOSTA VILLAS - BAHIA CENTER based on later screenshot

  // ==========================================
  // TALMAR - EDIFICIO SONATA (Torrevieja, Playa de El Cura)
  // ==========================================
  'N9413': { developer: 'TALMAR', development: 'EDIFICIO SONATA', deliveryDate: '01-01-2026', zone: 'Playa de El Cura' },

  // ==========================================
  // ALTECO INVEST - OASIS GUARDAMAR (Guardamar del Segura, Pueblo)
  // ==========================================
  'N9410': { developer: 'ALTECO INVEST', development: 'OASIS GUARDAMAR', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9411': { developer: 'ALTECO INVEST', development: 'OASIS GUARDAMAR', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9412': { developer: 'ALTECO INVEST', development: 'OASIS GUARDAMAR', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9409': { developer: 'ALTECO INVEST', development: 'OASIS GUARDAMAR', deliveryDate: '01-03-2027', zone: 'Pueblo' },

  // ==========================================
  // ORBIOS - VILLAS VICTORIA (Fuente Alamo, Hacienda Del Alamo Golf)
  // ==========================================
  'N9406': { developer: 'ORBIOS', development: 'VILLAS VICTORIA', deliveryDate: '01-01-2027', zone: 'Hacienda Del Alamo Golf' },
  'N9407': { developer: 'ORBIOS', development: 'VILLAS VICTORIA', deliveryDate: '01-01-2027', zone: 'Hacienda Del Alamo Golf' },

  // ==========================================
  // AUHMA NATURE - AUHMA NATURE RESORT (Alhama De Murcia, Condado De Alhama)
  // ==========================================
  'N9429': { developer: 'AUHMA NATURE', development: 'AUHMA NATURE RESORT', deliveryDate: '01-06-2026', zone: 'Condado De Alhama' },
  'N9428': { developer: 'AUHMA NATURE', development: 'AUHMA NATURE RESORT', deliveryDate: '01-01-2025', zone: 'Condado De Alhama' },
  'N9427': { developer: 'AUHMA NATURE', development: 'AUHMA NATURE RESORT', deliveryDate: '01-06-2026', zone: 'Condado De Alhama' },
  'N9436': { developer: 'AUHMA NATURE', development: 'AUHMA NATURE RESORT', deliveryDate: '01-06-2026', zone: 'Condado De Alhama' },

  // ==========================================
  // GMA - MAJESTIC PARADISE (Bigastro, pueblo)
  // ==========================================
  'N9422': { developer: 'GMA', development: 'MAJESTIC PARADISE', deliveryDate: '01-10-2026', zone: 'pueblo' },
  'N9423': { developer: 'GMA', development: 'MAJESTIC PARADISE', deliveryDate: '01-10-2025', zone: 'pueblo' },
  'N9424': { developer: 'GMA', development: 'MAJESTIC PARADISE', deliveryDate: '01-10-2026', zone: 'pueblo' },

  // ==========================================
  // ALEGRIA - ALEGRA 24 (Torrevieja, Parque de las Naciones)
  // ==========================================
  'N9421': { developer: 'ALEGRIA', development: 'ALEGRA 24', deliveryDate: '01-01-2027', zone: 'Parque de las Naciones' },

  // ==========================================
  // PROCAM SURESTE - VILLA FLORES (Costa de Palos, Cala Flores)
  // ==========================================
  'SP1580': { developer: 'PROCAM SURESTE', development: 'VILLA FLORES', deliveryDate: '01-12-2027', zone: 'Cala Flores' },

  // ==========================================
  // PROCAM SURESTE - MONTAÑA CLARA (San Javier)
  // ==========================================
  'SP1587': { developer: 'PROCAM SURESTE', development: 'MONTAÑA CLARA', deliveryDate: '01-12-2026', zone: 'San Javier' },

  // ==========================================
  // PROCAM SURESTE - 2 VILLAS EN LA TORRE (Pilar de la Horadada, Los Higuericos)
  // ==========================================
  'SP1588': { developer: 'PROCAM SURESTE', development: '2 VILLAS EN LA TORRE', deliveryDate: '01-12-2026', zone: 'Los Higuericos' },

  // ==========================================
  // PROCAM SURESTE - VILLA GUADILOLO (Pilar de la Horadada)
  // ==========================================
  'SP1589': { developer: 'PROCAM SURESTE', development: 'VILLA GUADILOLO', deliveryDate: '01-12-2026', zone: 'Pilar De la Horadada' },

  // ==========================================
  // PROCAM SURESTE - 7 VILLAS ROLDAN (Torre Pacheco, Roldan)
  // ==========================================
  'SP1590': { developer: 'PROCAM SURESTE', development: '7 VILLAS ROLDAN', deliveryDate: '01-12-2026', zone: 'Roldan' },

  // ==========================================
  // CONTRIMAR - OASIS VILLAS 2 LA FINCA (Algorfa, La Finca Golf)
  // ==========================================
  'N9434': { developer: 'CONTRIMAR', development: 'OASIS VILLAS 2 LA FINCA', deliveryDate: '01-03-2027', zone: 'La Finca Golf' },

  // ==========================================
  // ZANDRA - OLNE (Dolores, Pueblo)
  // ==========================================
  'N9433': { developer: 'ZANDRA', development: 'OLNE', deliveryDate: '01-12-2027', zone: 'Pueblo' },

  // ==========================================
  // SUMARA - AIJA SALINA 5 (Rojales, Pueblo)
  // ==========================================
  'N9432': { developer: 'SUMARA', development: 'AIJA SALINA 5', deliveryDate: '01-03-2027', zone: 'Pueblo' },
  'N9431': { developer: 'SUMARA', development: 'AIJA SALINA 5', deliveryDate: '01-03-2027', zone: 'Pueblo' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - OTTAWA VILLAS (Pilar de la Horadada, Torre de la Horadada)
  // ==========================================
  'N9430': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'OTTAWA VILLAS', deliveryDate: '01-10-2025', zone: 'Torre de la Horadada' },

  // ==========================================
  // BRICATUM - VILAS ALEJANDRA XIV (Los Alcazares, Serena Golf)
  // Note: N9461, N9462 moved to GRUPO VISMELL - BENIROL APARTMENTS II based on later screenshot
  // ==========================================

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - MACAE PLAYA (San Pedro del Pinatar, Lo Pagan)
  // ==========================================
  'N9443': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'MACAE PLAYA', deliveryDate: '01-12-2026', zone: 'Lo Pagan' },
  'N9444': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'MACAE PLAYA', deliveryDate: '01-12-2026', zone: 'Lo Pagan' },

  // ==========================================
  // BLUE MED INVEST - COUNTRY CLUB (Mazarron) - Additional
  // ==========================================
  'N9426': { developer: 'BLUE MED INVEST', development: 'COUNTRY CLUB', deliveryDate: '01-01-2026', zone: 'Country Club' },

  // ==========================================
  // BLUE MED INVEST - ALOHA NEW (Cartagena, Lo Jurico)
  // ==========================================
  'N9425': { developer: 'BLUE MED INVEST', development: 'ALOHA NEW', deliveryDate: '01-01-2026', zone: 'Lo Jurico' },

  // ==========================================
  // GRUPO VISMELL - CRETA DOLORES (Dolores, Sector 3)
  // ==========================================
  'N9485': { developer: 'GRUPO VISMELL', development: 'CRETA DOLORES', deliveryDate: '01-12-2026', zone: 'Sector 3' },

  // ==========================================
  // ALEGRIA - ALEGRA XXV (Torrevieja, Centro)
  // ==========================================
  'N9453': { developer: 'ALEGRIA', development: 'ALEGRA XXV', deliveryDate: '01-07-2027', zone: 'Centro' },
  'N9454': { developer: 'ALEGRIA', development: 'ALEGRA XXV', deliveryDate: '01-07-2027', zone: 'Centro' },
  'N9458': { developer: 'ALEGRIA', development: 'ALEGRA XXV', deliveryDate: '01-07-2027', zone: 'Centro' },

  // ==========================================
  // INTERCOSTA VILLAS - SUN BAY (Torrevieja, Centro)
  // ==========================================
  'N9404': { developer: 'INTERCOSTA VILLAS', development: 'SUN BAY', deliveryDate: '01-09-2027', zone: 'Centro' },
  'N9470': { developer: 'INTERCOSTA VILLAS', development: 'SUN BAY', deliveryDate: '01-09-2027', zone: 'Centro' },
  'N9463': { developer: 'INTERCOSTA VILLAS', development: 'SUN BAY', deliveryDate: '01-09-2027', zone: 'Centro' },

  // ==========================================
  // INTERCOSTA VILLAS - BAHIA CENTER (Torrevieja, Centro)
  // ==========================================
  'N9472': { developer: 'INTERCOSTA VILLAS', development: 'BAHIA CENTER', deliveryDate: '01-09-2027', zone: 'Centro' },
  'N9471': { developer: 'INTERCOSTA VILLAS', development: 'BAHIA CENTER', deliveryDate: '01-09-2027', zone: 'Centro' },
  'N9468': { developer: 'INTERCOSTA VILLAS', development: 'BAHIA CENTER', deliveryDate: '01-09-2027', zone: 'Centro' },
  'N9469': { developer: 'INTERCOSTA VILLAS', development: 'BAHIA CENTER', deliveryDate: '01-09-2027', zone: 'Centro' },
  'N9466': { developer: 'INTERCOSTA VILLAS', development: 'BAHIA CENTER', deliveryDate: '01-09-2027', zone: 'Centro' },

  // ==========================================
  // GRUPO VISMELL - BENIROL APARTMENTS II (Benijofar, Pueblo)
  // ==========================================
  'N9460': { developer: 'GRUPO VISMELL', development: 'BENIROL APARTMENTS II', deliveryDate: '01-09-2027', zone: 'Pueblo' },
  'N9461': { developer: 'GRUPO VISMELL', development: 'BENIROL APARTMENTS II', deliveryDate: '01-09-2027', zone: 'Pueblo' },
  'N9462': { developer: 'GRUPO VISMELL', development: 'BENIROL APARTMENTS II', deliveryDate: '01-09-2027', zone: 'Pueblo' },

  // ==========================================
  // PRASA REAL ESTATE - LA VAGUADA (Algorfa, La Finca Golf)
  // ==========================================
  'N9449': { developer: 'PRASA REAL ESTATE', development: 'LA VAGUADA', deliveryDate: '01-01-2027', zone: 'La Finca Golf' },
  'N9450': { developer: 'PRASA REAL ESTATE', development: 'LA VAGUADA', deliveryDate: '01-01-2027', zone: 'La Finca Golf' },
  'N9448': { developer: 'PRASA REAL ESTATE', development: 'LA VAGUADA', deliveryDate: '01-09-2027', zone: 'La Finca Golf' },

  // ==========================================
  // JUNCO ARQUITECTURA - ORQUÍDEA (Alfaz del Pi, Barranco Fondo)
  // ==========================================
  'N9457': { developer: 'JUNCO ARQUITECTURA', development: 'ORQUIDEA', deliveryDate: '01-09-2027', zone: 'Barranco Fondo' },
  'N9456': { developer: 'JUNCO ARQUITECTURA', development: 'ORQUIDEA', deliveryDate: '01-09-2027', zone: 'Barranco Fondo' },

  // ==========================================
  // SUNNER HOMES - VILLA LOSANDIA (Orihuela Costa, La Zenia)
  // ==========================================
  'N9455': { developer: 'SUNNER HOMES', development: 'VILLA LOSANDIA', deliveryDate: '01-05-2027', zone: 'La Zenia' },

  // ==========================================
  // THE FILM GROUP SPAIN - LIFE MEDITERRANEA (Algorfa, La Finca Golf)
  // ==========================================
  'N9478': { developer: 'THE FILM GROUP SPAIN', development: 'LIFE MEDITERRANEA', deliveryDate: '01-12-2026', zone: 'La Finca Golf' },

  // ==========================================
  // D CASAGRAND - CATHERINE (Rojales, Doña Pepa)
  // ==========================================
  'SP1518': { developer: 'D CASAGRAND', development: 'CATHERINE', deliveryDate: '01-06-2025', zone: 'Doña Pepa' },

  // ==========================================
  // EUROMARINA - MARIELA GARDEN (Rojales, Doña Pepa)
  // ==========================================
  'SP1287': { developer: 'EUROMARINA', development: 'MARIELA GARDEN', deliveryDate: '01-09-2026', zone: 'Doña Pepa' },

  // ==========================================
  // MARGEVS - RAMBLA BEACH II (Pilar de la Horadada)
  // ==========================================
  'N9285': { developer: 'MARGEVS', development: 'RAMBLA BEACH II', deliveryDate: '01-05-2026', zone: 'Pilar De La Horadada' },

  // ==========================================
  // LARCOSTA - LARCOSTA HOMES BY FG (Algorfa, La Finca Golf)
  // ==========================================
  'N9284': { developer: 'LARCOSTA', development: 'LARCOSTA HOMES BY FG', deliveryDate: '01-12-2026', zone: 'La Finca Golf' },

  // ==========================================
  // GRUPO COSTA CALIDA - PORTO MARINA PLAZA (Pilar de la Horadada, Torre De La Horadada)
  // ==========================================
  'N9277': { developer: 'GRUPO COSTA CALIDA', development: 'PORTO MARINA PLAZA', deliveryDate: '01-12-2026', zone: 'Torre De La Horadada' },
  'N9278': { developer: 'GRUPO COSTA CALIDA', development: 'PORTO MARINA PLAZA', deliveryDate: '01-12-2026', zone: 'Torre De La Horadada' },
  'N9279': { developer: 'GRUPO COSTA CALIDA', development: 'PORTO MARINA PLAZA', deliveryDate: '01-12-2026', zone: 'Torre De La Horadada' },

  // ==========================================
  // JACASOL COSTA - ORALDA (Ciudad Quesada, Doña Pepa)
  // ==========================================
  'N9275': { developer: 'JACASOL COSTA', development: 'ORALDA', deliveryDate: '01-07-2026', zone: 'Doña Pepa' },

  // ==========================================
  // RIERU - AZAHARES (Elche, pueblo)
  // ==========================================
  'N9272': { developer: 'RIERU', development: 'AZAHARES', deliveryDate: '01-01-2026', zone: 'pueblo' },

  // ==========================================
  // IFICATUM - APARTAMENTOS VICTOR MANUEL II (Pilar de la Horadada, Parque del Mediterraneo)
  // ==========================================
  'N9270': { developer: 'IFICATUM', development: 'APARTAMENTOS VICTOR MANUEL II', deliveryDate: '01-12-2026', zone: 'Parque del Mediterraneo' },
  'N9271': { developer: 'IFICATUM', development: 'APARTAMENTOS VICTOR MANUEL II', deliveryDate: '01-12-2026', zone: 'Parque del Mediterraneo' },

  // ==========================================
  // INSLIR GRUPO - LAS TERRAZAS DE MACENAS (Mojacar, Playa Macenas)
  // ==========================================
  'SP1522': { developer: 'INSLIR GRUPO', development: 'LAS TERRAZAS DE MACENAS', deliveryDate: '01-04-2028', zone: 'Playa Macenas' },
  'SP1528': { developer: 'INSLIR GRUPO', development: 'LAS TERRAZAS DE MACENAS', deliveryDate: '01-04-2028', zone: 'Playa Macenas' },

  // ==========================================
  // MACENAS RESORT - LAS VILLAS (Mojacar, Playa De Macenas)
  // ==========================================
  'SP1534': { developer: 'MACENAS RESORT', development: 'LAS VILLAS', deliveryDate: '01-12-2026', zone: 'Playa De Macenas' },

  // ==========================================
  // TURIS PROMOCIONES - PROJECT 303 (La Marina, Benitolo)
  // ==========================================
  'N9074': { developer: 'TURIS PROMOCIONES', development: 'PROJECT 303', deliveryDate: '01-01-2027', zone: 'Benitolo' },

  // ==========================================
  // BENLUSA - GARGANI (San Miguel de Salinas, Rebate)
  // ==========================================
  'N9082': { developer: 'BENLUSA', development: 'GARGANI', deliveryDate: '01-01-2027', zone: 'Rebate' },

  // ==========================================
  // INERTVA VILLAS - TRAM VILLAGE IV (Pilar de La Horadada, pueblo)
  // ==========================================
  'N9083': { developer: 'INERTVA VILLAS', development: 'TRAM VILLAGE IV', deliveryDate: '01-06-2027', zone: 'pueblo' },
  'N9084': { developer: 'INERTVA VILLAS', development: 'TRAM VILLAGE IV', deliveryDate: '01-06-2027', zone: 'pueblo' },

  // ==========================================
  // SONKEL - LA NUCIA PINES (La Nucia, Ciudad Deportiva)
  // ==========================================
  'SP18': { developer: 'SONKEL', development: 'LA NUCIA PINES', deliveryDate: '01-12-2027', zone: 'Ciudad Deportiva' },
  'SP182': { developer: 'SONKEL', development: 'LA NUCIA PINES', deliveryDate: '01-12-2027', zone: 'Ciudad Deportiva' },

  // ==========================================
  // SONKEL - SANTA POLA ELEGANCE (Santa Pola, pueblo)
  // ==========================================
  'SP1618': { developer: 'SONKEL', development: 'SANTA POLA ELEGANCE', deliveryDate: '01-12-2027', zone: 'pueblo' },
  'SP1619': { developer: 'SONKEL', development: 'SANTA POLA ELEGANCE', deliveryDate: '01-12-2027', zone: 'pueblo' },

  // ==========================================
  // MNB - LE MANS (Orihuela Costa, Los Altos)
  // ==========================================
  'N9085': { developer: 'MNB', development: 'LE MANS', deliveryDate: '01-01-2026', zone: 'Los Altos' },

  // ==========================================
  // MNB - ANAMAR (Torrevieja, El terrejon)
  // ==========================================
  'N9086': { developer: 'MNB', development: 'ANAMAR', deliveryDate: '01-07-2027', zone: 'El terrejon' },
  'N9087': { developer: 'MNB', development: 'ANAMAR', deliveryDate: '01-07-2027', zone: 'El terrejon' },
  'N9088': { developer: 'MNB', development: 'ANAMAR', deliveryDate: '01-07-2027', zone: 'El terrejon' },

  // ==========================================
  // LARCOSTA - PARIS VIII (Dolores, Sector 3)
  // ==========================================
  'N9082B': { developer: 'LARCOSTA', development: 'PARIS VIII', deliveryDate: '01-12-2026', zone: 'Sector 3' },

  // ==========================================
  // TAYLOR WIMPEY ESPANA - ALLURE (Moraleda del Cid, Altorreal Golf)
  // ==========================================
  'N9081': { developer: 'TAYLOR WIMPEY ESPANA', development: 'ALLURE', deliveryDate: '01-09-2027', zone: 'Altorreal Golf' },

  // ==========================================
  // INSLIR GRUPO - LAS TERRAZAS DE MACENAS (Mojacar) - Additional
  // ==========================================
  'SP1417': { developer: 'INSLIR GRUPO', development: 'LAS TERRAZAS DE MACENAS', deliveryDate: '01-04-2028', zone: 'Playa Macenas' },

  // ==========================================
  // TRIVEE - GRECIA_ZANTE (Algorfa)
  // ==========================================
  'N9074B': { developer: 'TRIVEE', development: 'GRECIA_ZANTE', deliveryDate: '01-06-2026', zone: 'Algorfa' },

  // ==========================================
  // TURIS PROMOCIONES - PROJECT 018 (Benejuzar, Lo Fuentes)
  // ==========================================
  'N9095': { developer: 'TURIS PROMOCIONES', development: 'PROJECT 018', deliveryDate: '01-12-2028', zone: 'Lo Fuentes' },

  // ==========================================
  // MACENAS RESORT - LOS ALTOS (Mojacar, Playa De Macenas)
  // ==========================================
  'SP1565': { developer: 'MACENAS RESORT', development: 'LOS ALTOS', deliveryDate: '01-05-2026', zone: 'Playa De Macenas' },

  // ==========================================
  // LLORVESA - VILLAS EL OLIVAR (Peraguila, El Olivar)
  // ==========================================
  'N9299': { developer: 'LLORVESA', development: 'VILLAS EL OLIVAR', deliveryDate: '01-01-2026', zone: 'El Olivar' },
  'N9295': { developer: 'LLORVESA', development: 'VILLAS EL OLIVAR', deliveryDate: '01-01-2026', zone: 'El Olivar' },
  'N9296': { developer: 'LLORVESA', development: 'VILLAS EL OLIVAR', deliveryDate: '01-10-2026', zone: 'El Olivar' },
  'N9297': { developer: 'LLORVESA', development: 'VILLAS EL OLIVAR', deliveryDate: '01-10-2026', zone: 'El Olivar' },

  // ==========================================
  // MARICU VILLAS - NAIA BLUE HORIZON (Guardamar del Segura, Camino del Puerto)
  // ==========================================
  'N9192': { developer: 'MARICU VILLAS', development: 'NAIA BLUE HORIZON', deliveryDate: '01-08-2027', zone: 'Camino del Puerto' },
  'N9293': { developer: 'MARICU VILLAS', development: 'NAIA BLUE HORIZON', deliveryDate: '01-08-2027', zone: 'Camino del Puerto' },
  'N9294': { developer: 'MARICU VILLAS', development: 'NAIA BLUE HORIZON', deliveryDate: '01-08-2027', zone: 'Camino del Puerto' },
  'N9289': { developer: 'MNB', development: 'NAIA BLUE HORIZON', deliveryDate: '01-07-2027', zone: 'Camino del Puerto' },
  'N9290': { developer: 'MARICU VILLAS', development: 'NAIA BLUE HORIZON', deliveryDate: '01-08-2027', zone: 'Camino del Puerto' },
  'N9291': { developer: 'MARICU VILLAS', development: 'NAIA BLUE HORIZON', deliveryDate: '01-08-2027', zone: 'Camino del Puerto' },

  // ==========================================
  // QUADRATIA - ALLON BAY HILLS (Villajoyosa, La Tellerola) - Additional
  // ==========================================
  'SP1864': { developer: 'QUADRATIA', development: 'ALLON BAY HILLS', deliveryDate: '01-08-2027', zone: 'La Tellerola' },
  'SP1863': { developer: 'QUADRATIA', development: 'ALLON BAY HILLS', deliveryDate: '01-08-2027', zone: 'La Tellerola' },
  'SP185': { developer: 'QUADRATIA', development: 'ALLON BAY HILLS', deliveryDate: '01-08-2027', zone: 'La Tellerola' },

  // ==========================================
  // TALMAR - EDIFICIO SOPRANO (Torrevieja, Centro)
  // ==========================================
  'N9310': { developer: 'TALMAR', development: 'EDIFICIO SOPRANO', deliveryDate: '01-12-2026', zone: 'Centro' },
  'N9137': { developer: 'TALMAR', development: 'EDIFICIO SOPRANO', deliveryDate: '01-12-2025', zone: 'Centro' },
  'N9179': { developer: 'TALMAR', development: 'EDIFICIO SOPRANO', deliveryDate: '01-12-2026', zone: 'Centro' },

  // ==========================================
  // NASCAVI - NASCAVI LA NUCIA (La Nucia, Don Mor)
  // ==========================================
  'N981': { developer: 'NASCAVI', development: 'NASCAVI LA NUCIA', deliveryDate: '01-09-2028', zone: 'Don Mor' },

  // ==========================================
  // VISTABELLA GOLF - MICO VILLAS (Orihuela, Vistabella Golf)
  // ==========================================
  'SP1582': { developer: 'VISTABELLA GOLF', development: 'MICO VILLAS', deliveryDate: '01-12-2026', zone: 'Vistabella Golf' },
  'SP195': { developer: 'VISTABELLA GOLF', development: 'MICO VILLAS', deliveryDate: '01-12-2026', zone: 'Vistabella Golf' },

  // ==========================================
  // LLORVESA - VILLAS EL OLIVAR (Peraguila) - Additional
  // ==========================================
  'N9058': { developer: 'LLORVESA', development: 'VILLAS EL OLIVAR', deliveryDate: '01-12-2026', zone: 'El Olivar' },

  // ==========================================
  // MACENAS RESORT - LOS ALTOS (Mojacar) - Additional
  // ==========================================
  'SP1557': { developer: 'MACENAS RESORT', development: 'LOS ALTOS', deliveryDate: '01-01-2026', zone: 'Playa De Macenas' },
  'SP1558': { developer: 'MACENAS RESORT', development: 'LOS ALTOS', deliveryDate: '01-01-2026', zone: 'Playa De Macenas' },
  'SP1559': { developer: 'MACENAS RESORT', development: 'LOS ALTOS', deliveryDate: '01-05-2027', zone: 'Playa De Macenas' },
  'SP1555': { developer: 'MACENAS RESORT', development: 'LOS ALTOS', deliveryDate: '01-05-2026', zone: 'Playa De Macenas' },

  // ==========================================
  // SERVIREA - NUEVA DATA VILLAS (Daya Nueva, Centro)
  // ==========================================
  'N9103': { developer: 'SERVIREA', development: 'NUEVA DATA VILLAS', deliveryDate: '01-12-2026', zone: 'Centro' },

  // ==========================================
  // MIRA VILLA HOUSES - VIVA LIFE BEACH (Pilar de La Horadada, Mil Palmeras)
  // ==========================================
  'N9512B': { developer: 'MIRA VILLA HOUSES', development: 'VIVA LIFE BEACH', deliveryDate: '01-04-2027', zone: 'Mil Palmeras' },
  'N9122': { developer: 'MIRA VILLA HOUSES', development: 'VIVA LIFE BEACH', deliveryDate: '01-04-2027', zone: 'Mil Palmeras' },
  'N9123': { developer: 'MIRA VILLA HOUSES', development: 'VIVA LIFE BEACH', deliveryDate: '01-04-2027', zone: 'Mil Palmeras' },

  // ==========================================
  // QUADRATIA - ALLON BAY HILLS (Villajoyosa) - More
  // ==========================================
  'SP1562': { developer: 'QUADRATIA', development: 'ALLON BAY HILLS', deliveryDate: '01-08-2027', zone: 'La Tellerola' },
  'SP1563': { developer: 'QUADRATIA', development: 'ALLON BAY HILLS', deliveryDate: '01-08-2027', zone: 'La Tellerola' },

  // ==========================================
  // SOL MEDITERRANEO - SOL NATURA (San Miguel de Salinas, Lo Cañada)
  // ==========================================
  'N9139': { developer: 'SOL MEDITERRANEO', development: 'SOL NATURA', deliveryDate: '01-09-2026', zone: 'Lo Cañada' },
  'N9140': { developer: 'SOL MEDITERRANEO', development: 'SOL NATURA', deliveryDate: '01-09-2026', zone: 'Lo Cañada' },
  'N914': { developer: 'SOL MEDITERRANEO', development: 'SOL NATURA', deliveryDate: '01-09-2026', zone: 'Lo Cañada' },
  'N9530': { developer: 'SOL MEDITERRANEO', development: 'SOL NATURA', deliveryDate: '01-09-2026', zone: 'Lo Cañada' },

  // ==========================================
  // LOASA - MIRAMAR HILLS (Vera, Vera Playa)
  // ==========================================
  'N9196': { developer: 'LOASA', development: 'MIRAMAR HILLS', deliveryDate: '01-04-2027', zone: 'Vera Playa' },
  'N9127': { developer: 'LOASA', development: 'MIRAMAR HILLS', deliveryDate: '01-04-2027', zone: 'Vera Playa' },
  'N9133': { developer: 'LOASA', development: 'MIRAMAR HILLS', deliveryDate: '01-04-2027', zone: 'Vera Playa' },
  'N9134': { developer: 'LOASA', development: 'MIRAMAR HILLS', deliveryDate: '01-04-2027', zone: 'Vera Playa' },
  'N9135': { developer: 'LOASA', development: 'MIRAMAR HILLS', deliveryDate: '01-04-2027', zone: 'Vera Playa' },
  'N913': { developer: 'LOASA', development: 'MIRAMAR HILLS', deliveryDate: '01-04-2027', zone: 'Vera Playa' },
  'N9138': { developer: 'LOASA', development: 'MIRAMAR HILLS', deliveryDate: '01-04-2027', zone: 'Vera Playa' },

  // ==========================================
  // SANTAMAR - CIBELES RESORT (San Miguel de Salinas, Pueblo)
  // ==========================================
  'N9100': { developer: 'SANTAMAR', development: 'CIBELES RESORT', deliveryDate: '01-09-2026', zone: 'Pueblo' },

  // ==========================================
  // IBERO HOMES - PANORAMA BEACH (Torrevieja, Centro)
  // ==========================================
  'N9146': { developer: 'IBERO HOMES', development: 'PANORAMA BEACH', deliveryDate: '01-09-2026', zone: 'Centro' },
  'N9547': { developer: 'IBERO HOMES', development: 'PANORAMA BEACH', deliveryDate: '01-09-2026', zone: 'Centro' },
  'N9542': { developer: 'IBERO HOMES', development: 'PANORAMA BEACH', deliveryDate: '01-09-2026', zone: 'Centro' },
  'N9143': { developer: 'IBERO HOMES', development: 'PANORAMA BEACH', deliveryDate: '01-09-2026', zone: 'Centro' },
  'N9544': { developer: 'IBERO HOMES', development: 'PANORAMA BEACH', deliveryDate: '01-09-2026', zone: 'Centro' },
  'N9545': { developer: 'IBERO HOMES', development: 'PANORAMA BEACH', deliveryDate: '01-09-2026', zone: 'Centro' },

  // ==========================================
  // PROPERTY SPAIN 2000 - LA MARINA BEACH (Finestrat)
  // ==========================================
  'N7083': { developer: 'PROPERTY SPAIN 2000', development: 'LA MARINA BEACH', deliveryDate: '01-12-2025', zone: 'Finestrat' },
  'N704': { developer: 'PROPERTY SPAIN 2000', development: 'LA MARINA BEACH', deliveryDate: '01-12-2025', zone: 'Finestrat' },

  // ==========================================
  // VISTABELLA GOLF - CAPE VII (Orihuela, Vistabella Golf)
  // ==========================================
  'SP177': { developer: 'VISTABELLA GOLF', development: 'CAPE VII', deliveryDate: '01-04-2025', zone: 'Vistabella Golf' },

  // ==========================================
  // COSTA BLANCA BOLU3 - EDIFICIO NEPTUNO II (Torrevieja, Centro)
  // ==========================================
  'N9182': { developer: 'COSTA BLANCA BOLU3', development: 'EDIFICIO NEPTUNO II', deliveryDate: '01-01-2027', zone: 'Centro' },

  // ==========================================
  // BOGSA - MASCARAT BAY VIEWS (Calpe, Mascarat)
  // ==========================================
  'N9171': { developer: 'BOGSA', development: 'MASCARAT BAY VIEWS', deliveryDate: '01-12-2027', zone: 'Mascarat' },
  'N9172': { developer: 'BOGSA', development: 'MASCARAT BAY VIEWS', deliveryDate: '01-12-2027', zone: 'Mascarat' },
  'N9170': { developer: 'BOGSA', development: 'MASCARAT BAY VIEWS', deliveryDate: '01-12-2027', zone: 'Mascarat' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - BREATHE 3 (Torre Pacheco)
  // ==========================================
  'N9181': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'BREATHE 3', deliveryDate: '01-04-2026', zone: 'Torre Pacheco' },

  // ==========================================
  // OREESOL - APARTAMENTOS TURISTICOS SANTA ROSALIA (Torre Pacheco, Santa Rosalia Lake And Life Resort)
  // ==========================================
  'N9158': { developer: 'OREESOL', development: 'APARTAMENTOS TURISTICOS SANTA ROSALIA', deliveryDate: '01-07-2027', zone: 'Santa Rosalia Lake And Life Resort' },

  // ==========================================
  // PRIME HOME ALICANTE - GREEN & BLUE (Finestrat, Puig Campana Golf)
  // ==========================================
  'N9190': { developer: 'PRIME HOME ALICANTE', development: 'GREEN & BLUE', deliveryDate: '01-09-2026', zone: 'Puig Campana Golf' },
  'N9191': { developer: 'PRIME HOME ALICANTE', development: 'GREEN & BLUE', deliveryDate: '01-12-2026', zone: 'Puig Campana Golf' },

  // ==========================================
  // OH COSTABLANCA - EUCALIPTUS 52 (Moraira_Teulada, Pinar del Advocat)
  // ==========================================
  'SP870': { developer: 'OH COSTABLANCA', development: 'EUCALIPTUS 52', deliveryDate: '01-12-2027', zone: 'Pinar del Advocat' },

  // ==========================================
  // DULY - LA HOYA (Torrevieja, La Siesta)
  // ==========================================
  'N9166': { developer: 'DULY', development: 'LA HOYA', deliveryDate: '01-03-2027', zone: 'La Siesta' },
  'N9164': { developer: 'DULY', development: 'LA HOYA', deliveryDate: '01-03-2027', zone: 'La Siesta' },
  'N9165': { developer: 'DULY', development: 'LA HOYA', deliveryDate: '01-03-2027', zone: 'La Siesta' },
  'N9184': { developer: 'DULY', development: 'LA HOYA', deliveryDate: '01-03-2027', zone: 'La Siesta' },
  'N9185': { developer: 'DULY', development: 'LA HOYA', deliveryDate: '01-03-2027', zone: 'La Siesta' },
  'N9186': { developer: 'DULY', development: 'LA HOYA', deliveryDate: '01-03-2027', zone: 'La Siesta' },

  // ==========================================
  // CHERRICO VILLAS DEVELOPMENTS - FALCO B (Benicco, Montemor)
  // ==========================================
  'SP650': { developer: 'CHERRICO VILLAS DEVELOPMENTS', development: 'FALCO B', deliveryDate: '01-08-2027', zone: 'Montemor' },

  // ==========================================
  // CHERRICO VILLAS DEVELOPMENTS - PROJECT 569 (Moraira_Teulada, La Sabatera)
  // ==========================================
  'SP1602': { developer: 'CHERRICO VILLAS DEVELOPMENTS', development: 'PROJECT 569', deliveryDate: '01-08-2027', zone: 'La Sabatera' },

  // ==========================================
  // CASAS IN LA ROMANA - VILLAS LA ROMANA (La Romana, Villas de la Romana)
  // ==========================================
  'N9175': { developer: 'CASAS IN LA ROMANA', development: 'VILLAS LA ROMANA', deliveryDate: '01-03-2027', zone: 'Villas de la Romana' },

  // ==========================================
  // COSTA BLANCA BOLU3 - EDIFICIO NEPTUNO 3 (Torrevieja, Centro)
  // ==========================================
  'N9180': { developer: 'COSTA BLANCA BOLU3', development: 'EDIFICIO NEPTUNO 3', deliveryDate: '01-03-2027', zone: 'Centro' },
  'N9183': { developer: 'COSTA BLANCA BOLU3', development: 'EDIFICIO NEPTUNO 3', deliveryDate: '01-03-2027', zone: 'Centro' },

  // ==========================================
  // AMAL - SERENA BREEZE 2 (Los Alcazares, Serena Golf)
  // ==========================================
  'N9167': { developer: 'AMAL', development: 'SERENA BREEZE 2', deliveryDate: '01-05-2027', zone: 'Serena Golf' },
  'N9168': { developer: 'AMAL', development: 'SERENA BREEZE 2', deliveryDate: '01-05-2027', zone: 'Serena Golf' },
  'N9191B': { developer: 'AMAL', development: 'SERENA BREEZE 2', deliveryDate: '01-01-2026', zone: 'Serena Golf' },

  // ==========================================
  // AM HOME - AM HOME NAUFRAGOS (Torrevieja, Playa Los Naufragos)
  // ==========================================
  'N9238': { developer: 'AM HOME', development: 'AM HOME NAUFRAGOS', deliveryDate: '01-03-2026', zone: 'Playa Los Naufragos' },

  // ==========================================
  // GROUP UNO - ALAIA VILLAS (San Pedro del Pinatar, Lo Pagan)
  // ==========================================
  'N9234': { developer: 'GROUP UNO', development: 'ALAIA VILLAS', deliveryDate: '01-12-2026', zone: 'Lo Pagan' },

  // ==========================================
  // GROUP UNO - VILLA NUEVA F3 (San Pedro del Pinatar, Centro)
  // ==========================================
  'N9235': { developer: 'GROUP UNO', development: 'VILLA NUEVA F3', deliveryDate: '01-12-2026', zone: 'Centro' },

  // ==========================================
  // TOSCANY GROUP - ALONES (Villajoyosa, Playo del Torres)
  // ==========================================
  'N9230': { developer: 'TOSCANY GROUP', development: 'ALONES', deliveryDate: '01-12-2027', zone: 'Playo del Torres' },
  'N9232': { developer: 'TOSCANY GROUP', development: 'ALONES', deliveryDate: '01-12-2027', zone: 'Playo del Torres' },
  'N9233': { developer: 'TOSCANY GROUP', development: 'ALONES', deliveryDate: '01-12-2027', zone: 'Playo del Torres' },
  'N9228': { developer: 'TOSCANY GROUP', development: 'ALONES', deliveryDate: '01-12-2027', zone: 'Playo del Torres' },
  'N9229': { developer: 'TOSCANY GROUP', development: 'ALONES', deliveryDate: '01-12-2027', zone: 'Playo del Torres' },

  // ==========================================
  // MFC - NATURE VIEWS 2 (Torrevieja, Lago Jardin II)
  // ==========================================
  'N9245': { developer: 'MFC', development: 'NATURE VIEWS 2', deliveryDate: '01-01-2027', zone: 'Lago Jardin II' },
  'N9246': { developer: 'MFC', development: 'NATURE VIEWS 2', deliveryDate: '01-01-2027', zone: 'Lago Jardin II' },

  // ==========================================
  // GRUPO VERMELL - GOLDEN GREEN (Los Alcazares, Serena Golf)
  // ==========================================
  'N9251': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-08-2027', zone: 'Serena Golf' },
  'N9252': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-03-2027', zone: 'Serena Golf' },
  'N9253': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-03-2027', zone: 'Serena Golf' },
  'N9247': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-03-2027', zone: 'Serena Golf' },
  'N9248': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-03-2027', zone: 'Serena Golf' },
  'N9249': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-03-2027', zone: 'Serena Golf' },
  'N9250': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-03-2027', zone: 'Serena Golf' },
  'N9251B': { developer: 'GRUPO VERMELL', development: 'GOLDEN GREEN', deliveryDate: '01-03-2027', zone: 'Serena Golf' },

  // ==========================================
  // ASA - NATURA PINET M7 (La Marina, El Pinet)
  // ==========================================
  'N9258': { developer: 'ASA', development: 'NATURA PINET M7', deliveryDate: '01-04-2027', zone: 'El Pinet' },

  // ==========================================
  // ORAMARGIA - PLAYA PRINCIPE (La Manga del Mar Menor)
  // ==========================================
  'N9254': { developer: 'ORAMARGIA', development: 'PLAYA PRINCIPE', deliveryDate: '01-10-2027', zone: 'La Manga del Mar Menor' },
  'N9255': { developer: 'ORAMARGIA', development: 'PLAYA PRINCIPE', deliveryDate: '01-10-2027', zone: 'La Manga del Mar Menor' },

  // ==========================================
  // MLD LUXURY PROPERTIES - CASTELUM (Dolores, Sector 2)
  // ==========================================
  'N9259': { developer: 'MLD LUXURY PROPERTIES', development: 'CASTELUM', deliveryDate: '01-12-2026', zone: 'Sector 2' },

  // ==========================================
  // SPAIN MEDITERRANEAN EXPERIENCE - VILLAS DUO ROMA PINOSO (Pinoso, Rodrigullo)
  // ==========================================
  'N9206': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA PINOSO', deliveryDate: '01-10-2026', zone: 'Rodrigullo' },
  'N9257': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA PINOSO', deliveryDate: '01-10-2026', zone: 'Rodrigullo' },
  'N9258B': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA PINOSO', deliveryDate: '01-10-2026', zone: 'Rodrigullo' },
  'N9210': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA PINOSO', deliveryDate: '01-10-2026', zone: 'Rodrigullo' },
  'N9354': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA PINOSO', deliveryDate: '01-10-2026', zone: 'Rodrigullo' },
  'N9205': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA PINOSO', deliveryDate: '01-10-2026', zone: 'Rodrigullo' },

  // ==========================================
  // THE PALM GROUP SPAIN - VILLAS ORQUIDEA (Algorfa)
  // ==========================================
  'N9352': { developer: 'THE PALM GROUP SPAIN', development: 'VILLAS ORQUIDEA', deliveryDate: '01-10-2025', zone: 'Algorfa' },

  // ==========================================
  // THE PALM GROUP SPAIN - NISIA4 (Ciudad Quesada)
  // ==========================================
  'M9201': { developer: 'THE PALM GROUP SPAIN', development: 'NISIA4', deliveryDate: '01-12-2026', zone: 'Ciudad Quesada' },

  // ==========================================
  // AGA - BAHIA DEAN ALCANTADOSADOS FASE 2 (Gran Alacant)
  // ==========================================
  'M9357': { developer: 'AGA', development: 'BAHIA DEAN ALCANTADOSADOS FASE 2', deliveryDate: '01-12-2026', zone: 'Gran Alacant' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - IL VAGO (San Juan de los Terreros, Mar De Pulpi)
  // ==========================================
  'N1022': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'IL VAGO', deliveryDate: '01-12-2028', zone: 'Mar De Pulpi' },
  'N1023': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'IL VAGO', deliveryDate: '01-12-2028', zone: 'Mar De Pulpi' },
  'N1024': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'IL VAGO', deliveryDate: '01-12-2028', zone: 'Mar De Pulpi' },

  // ==========================================
  // MERCIERS - RESIDENCIAL 3 PALMERAS (Puerto de Mazarron, El Alamillo)
  // ==========================================
  'N1014': { developer: 'MERCIERS', development: 'RESIDENCIAL 3 PALMERAS', deliveryDate: '01-08-2026', zone: 'El Alamillo' },

  // ==========================================
  // AEGUS HOMES - HOLINESS (Almerimar)
  // ==========================================
  'SP1347': { developer: 'AEGUS HOMES', development: 'HOLINESS', deliveryDate: '01-04-2027', zone: 'Almerimar' },

  // ==========================================
  // AVILES VICENTE - VILLAMAR VILLAS FASE XI (San Pedro del Pinatar, Fishpackita)
  // ==========================================
  'N1035': { developer: 'AVILES VICENTE', development: 'VILLAMAR VILLAS FASE XI', deliveryDate: '01-09-2026', zone: 'Fishpackita' },

  // ==========================================
  // PLAYAS DEL ALMANZORA - SWEET WATER ISLAND DRIVE (Cuevas Del Almanzora, Desert Springs Golf Club)
  // ==========================================
  'SP1328': { developer: 'PLAYAS DEL ALMANZORA', development: 'SWEET WATER ISLAND DRIVE', deliveryDate: '01-12-2026', zone: 'Desert Springs Golf Club' },
  'SP1329': { developer: 'PLAYAS DEL ALMANZORA', development: 'SWEET WATER ISLAND DRIVE', deliveryDate: '01-12-2026', zone: 'Desert Springs Golf Club' },

  // ==========================================
  // RODA REAL ESTATE - VILLAS VISTA 12 (San Javier, Roda Golf)
  // ==========================================
  'N1029': { developer: 'RODA REAL ESTATE', development: 'VILLAS VISTA 12', deliveryDate: '01-09-2027', zone: 'Roda Golf' },

  // ==========================================
  // AURUM - AURUM VILLAGE SAN JUAN (San Juan Alicante, Losea)
  // ==========================================
  'SP1417B': { developer: 'AURUM', development: 'AURUM VILLAGE SAN JUAN', deliveryDate: '01-07-2025', zone: 'Losea' },

  // ==========================================
  // AMAVI - MONTE CARMELO (Vera, Vera Playa)
  // ==========================================
  'N9198': { developer: 'AMAVI', development: 'MONTE CARMELO', deliveryDate: '01-09-2026', zone: 'Vera Playa' },

  // ==========================================
  // SONKEL - ALFAZ ESSENCE (Alfaz del Pi)
  // ==========================================
  'SP1205': { developer: 'SONKEL', development: 'ALFAZ ESSENCE', deliveryDate: '01-12-2027', zone: 'Alfaz del Pi' },
  'SP1206': { developer: 'SONKEL', development: 'ALFAZ ESSENCE', deliveryDate: '01-12-2027', zone: 'Alfaz del Pi' },
  'SP1207': { developer: 'SONKEL', development: 'ALFAZ ESSENCE', deliveryDate: '01-12-2027', zone: 'Alfaz del Pi' },
  'SP1223': { developer: 'SONKEL', development: 'ALFAZ ESSENCE', deliveryDate: '01-12-2027', zone: 'Alfaz del Pi' },
  'SP1204': { developer: 'SONKEL', development: 'ALFAZ ESSENCE', deliveryDate: '01-12-2027', zone: 'Alfaz del Pi' },

  // ==========================================
  // GROUP UNO - ALMA BUNGALOWS (San Pedro del Pinatar, Lo Pagan)
  // ==========================================
  'N9153': { developer: 'GROUP UNO', development: 'ALMA BUNGALOWS', deliveryDate: '01-09-2027', zone: 'Lo Pagan' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - LEVASSUR HOME 08HH (Vera, Pueblo Salinas)
  // ==========================================
  'M9188': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME 08HH', deliveryDate: '01-01-2028', zone: 'Pueblo Salinas' },

  // ==========================================
  // AMAL - LOS RIQUDONES (Los Alcazares, Serena Golf)
  // ==========================================
  'M991': { developer: 'AMAL', development: 'LOS RIQUDONES', deliveryDate: '01-11-2026', zone: 'Serena Golf' },

  // ==========================================
  // PRIME HOME ALICANTE - LAVANDA 2 (Orihuela, Los Castillos Golf)
  // ==========================================
  'M992': { developer: 'PRIME HOME ALICANTE', development: 'LAVANDA 2', deliveryDate: '01-09-2027', zone: 'Los Castillos Golf' },

  // ==========================================
  // AEGUS HOMES - INSUADA (Almerimar)
  // ==========================================
  'SP1216': { developer: 'AEGUS HOMES', development: 'INSUADA', deliveryDate: '01-04-2027', zone: 'Almerimar' },

  // ==========================================
  // AVILES VICENTE - VILLAMAR TOURISTIC APARTMENTS VII (San Javier, Santiago De Lo Ribero)
  // ==========================================
  'N9208': { developer: 'AVILES VICENTE', development: 'VILLAMAR TOURISTIC APARTMENTS VII', deliveryDate: '01-06-2027', zone: 'Santiago De Lo Ribero' },
  'N9207': { developer: 'AVILES VICENTE', development: 'VILLAMAR TOURISTIC APARTMENTS VII', deliveryDate: '01-06-2027', zone: 'Santiago De Lo Ribero' },

  // ==========================================
  // MODERN HOUSES - VISTA CALA 52 (Villajoyosa, Cola de Finestrat)
  // ==========================================
  'N9218': { developer: 'MODERN HOUSES', development: 'VISTA CALA 52', deliveryDate: '01-05-2027', zone: 'Cola de Finestrat' },
  'N9204': { developer: 'MODERN HOUSES', development: 'VISTA CALA 52', deliveryDate: '01-05-2027', zone: 'Cola de Finestrat' },
  'N9295B': { developer: 'MODERN HOUSES', development: 'VISTA CALA 52', deliveryDate: '01-05-2027', zone: 'Cola de Finestrat' },

  // ==========================================
  // AEGUS HOMES - PALMA (Benicassim, Almazora)
  // ==========================================
  'SP1275': { developer: 'AEGUS HOMES', development: 'PALMA', deliveryDate: '01-03-2027', zone: 'Almazora' },

  // ==========================================
  // CBH HOMES - EDIFICIO RODAS PLAYA (Torrevieja, Playa de El Cura)
  // ==========================================
  'N9200': { developer: 'CBH HOMES', development: 'EDIFICIO RODAS PLAYA', deliveryDate: '01-03-2027', zone: 'Playa de El Cura' },
  'N9201': { developer: 'CBH HOMES', development: 'EDIFICIO RODAS PLAYA', deliveryDate: '01-03-2027', zone: 'Playa de El Cura' },
  'N9193': { developer: 'CBH HOMES', development: 'EDIFICIO RODAS PLAYA', deliveryDate: '01-03-2027', zone: 'Playa de El Cura' },

  // ==========================================
  // AEGUS HOMES - IDEMA (Denia, Playa de La Almadrava)
  // ==========================================
  'SP1067': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1078': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1053': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1054': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1055': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1056': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },

  // ==========================================
  // AMBAR INMO GROUP - ALMURIA HILLS (El Rebuti D'almunial, Urbanizacion La Almunias)
  // ==========================================
  'N8008': { developer: 'AMBAR INMO GROUP', development: 'ALMURIA HILLS', deliveryDate: '01-12-2026', zone: 'Urbanizacion La Almunias' },
  'N8028': { developer: 'AMBAR INMO GROUP', development: 'ALMURIA HILLS', deliveryDate: '01-12-2026', zone: 'Urbanizacion La Almunias' },
  'N8036': { developer: 'AMBAR INMO GROUP', development: 'ALMURIA HILLS', deliveryDate: '01-12-2026', zone: 'Urbanizacion La Almunias' },
  'N8026': { developer: 'AMBAR INMO GROUP', development: 'ALMURIA HILLS', deliveryDate: '01-12-2026', zone: 'Urbanizacion La Almunias' },

  // ==========================================
  // AMBAR INMO GROUP - NOA GARDEN (La Nucia, Cotisanca)
  // ==========================================
  'N8993': { developer: 'AMBAR INMO GROUP', development: 'NOA GARDEN', deliveryDate: '01-01-2026', zone: 'Cotisanca' },

  // ==========================================
  // LARCOSTA - VENECIA V (Pedip, Urbanizaciones)
  // ==========================================
  'N8998': { developer: 'LARCOSTA', development: 'VENECIA V', deliveryDate: '01-12-2026', zone: 'Urbanizaciones' },
  'N8996': { developer: 'LARCOSTA', development: 'VENECIA V', deliveryDate: '01-12-2026', zone: 'Urbanizaciones' },

  // ==========================================
  // EVOKE RESORTS - FRONTLINE VILLAS (Los Alcazares)
  // ==========================================
  'N8997': { developer: 'EVOKE RESORTS', development: 'FRONTLINE VILLAS', deliveryDate: '01-01-2027', zone: 'Los Alcazares' },

  // ==========================================
  // ABALA - OMALA RESIDENCES (Fuente Alamo, Hacienda del Alamo)
  // ==========================================
  'N8986': { developer: 'ABALA', development: 'OMALA RESIDENCES', deliveryDate: '01-09-2026', zone: 'Hacienda del Alamo' },
  'N8987': { developer: 'ABALA', development: 'OMALA RESIDENCES', deliveryDate: '01-08-2026', zone: 'Hacienda del Alamo' },
  'N8988': { developer: 'ABALA', development: 'OMALA RESIDENCES', deliveryDate: '01-08-2026', zone: 'Hacienda del Alamo' },
  'N8985': { developer: 'ABALA', development: 'OMALA RESIDENCES', deliveryDate: '01-08-2026', zone: 'Hacienda del Alamo' },
  'N6058': { developer: 'ABALA', development: 'OMALA RESIDENCES', deliveryDate: '01-08-2026', zone: 'Hacienda del Alamo' },

  // ==========================================
  // KDF - PERLA PLAYA 3 (Puerto de Mazarron, Playa Negra)
  // ==========================================
  'N8989': { developer: 'KDF', development: 'PERLA PLAYA 3', deliveryDate: '01-12-2026', zone: 'Playa Negra' },
  'N8990': { developer: 'KDF', development: 'PERLA PLAYA 3', deliveryDate: '01-12-2026', zone: 'Playa Negra' },

  // ==========================================
  // ARISOL - ANDREA VILLAS (Daya Nueva, Pueblo)
  // ==========================================
  'N8975': { developer: 'ARISOL', development: 'ANDREA VILLAS', deliveryDate: '01-12-2026', zone: 'Pueblo' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - LEVASSUR HOME 08HH (Vera, Pueblo Salinas)
  // ==========================================
  'N8976': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME 08HH', deliveryDate: '01-09-2027', zone: 'Pueblo Salinas' },
  'N8984': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME 08HH', deliveryDate: '01-09-2027', zone: 'Pueblo Salinas' },

  // ==========================================
  // CONVASA - EL LAGO PA4 (Cartagena, Mar De Cristal)
  // ==========================================
  'N6037': { developer: 'CONVASA', development: 'EL LAGO PA4', deliveryDate: '01-07-2028', zone: 'Mar De Cristal' },
  'N6038': { developer: 'CONVASA', development: 'EL LAGO PA4', deliveryDate: '01-07-2028', zone: 'Mar De Cristal' },
  'N6039': { developer: 'CONVASA', development: 'EL LAGO PA4', deliveryDate: '01-07-2028', zone: 'Mar De Cristal' },
  'N6940': { developer: 'CONVASA', development: 'EL LAGO PA4', deliveryDate: '01-07-2028', zone: 'Mar De Cristal' },
  'N6036': { developer: 'CONVASA', development: 'EL LAGO PA4', deliveryDate: '01-07-2028', zone: 'Mar De Cristal' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - LEVASSUR HOME EIGHT (Vera, Pueblo Salinas)
  // ==========================================
  'N6033': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME EIGHT', deliveryDate: '01-07-2026', zone: 'Pueblo Salinas' },

  // ==========================================
  // WOODMARK GROUP - EDIFICIO VICTORIA I (Torrevieja, Playa Del Cura)
  // ==========================================
  'N6019': { developer: 'WOODMARK GROUP', development: 'EDIFICIO VICTORIA I', deliveryDate: '01-08-2026', zone: 'Playa Del Cura' },

  // ==========================================
  // CARLA VILLAS - CARLA VILLAS PARK (San Fulgencio, Polledepullan)
  // ==========================================
  'N6053': { developer: 'CARLA VILLAS', development: 'CARLA VILLAS PARK', deliveryDate: '01-12-2026', zone: 'Polledepullan' },

  // ==========================================
  // COSTA BLANCA A BOLUS - VILLAS OLIVO 2 (Petrer, Novapolop)
  // ==========================================
  'N6023': { developer: 'COSTA BLANCA A BOLUS', development: 'VILLAS OLIVO 2', deliveryDate: '01-08-2026', zone: 'Novapolop' },

  // ==========================================
  // RIGEL KENTAURUS - NATURA IV (San Fulgencio, Oasis Lo Moliño)
  // ==========================================
  'N6018': { developer: 'RIGEL KENTAURUS', development: 'NATURA IV', deliveryDate: '01-07-2026', zone: 'Oasis Lo Moliño' },
  'N6019B': { developer: 'RIGEL KENTAURUS', development: 'NATURA IV', deliveryDate: '01-07-2026', zone: 'Oasis Lo Moliño' },

  // ==========================================
  // MORASMAR - VILLA CAPRICHOSA (Orihuela Costa, La Zenia)
  // ==========================================
  'N6025': { developer: 'MORASMAR', development: 'VILLA CAPRICHOSA', deliveryDate: '01-08-2026', zone: 'La Zenia' },

  // ==========================================
  // IMMO ALTEA - SOLER VILLAS (Finestrat)
  // ==========================================
  'N680': { developer: 'IMMO ALTEA', development: 'SOLER VILLAS', deliveryDate: '01-02-2027', zone: 'Finestrat' },

  // ==========================================
  // SONKEL - LA NUCIA PINES (La Nucia, Ciudad Deportiva) - Additional
  // ==========================================
  'SP810': { developer: 'SONKEL', development: 'LA NUCIA PINES', deliveryDate: '01-12-2027', zone: 'Ciudad Deportiva' },

  // ==========================================
  // EVOKE RESORTS - VILLAS FORMENTERA (Torre Pacheco, Santa Rosalia Lake And Life Resort)
  // ==========================================
  'N6060': { developer: 'EVOKE RESORTS', development: 'VILLAS FORMENTERA', deliveryDate: '01-12-2026', zone: 'Santa Rosalia Lake And Life Resort' },

  // ==========================================
  // ASA - TOSSAL GROSS F4 (Denia)
  // ==========================================
  'N9106': { developer: 'ASA', development: 'TOSSAL GROSS F4', deliveryDate: '01-01-2025', zone: 'Denia' },

  // ==========================================
  // AE LIVRO - BALEARIC RESIDENCES (Alfaz del Pi, El Alet)
  // ==========================================
  'N6059': { developer: 'AE LIVRO', development: 'BALEARIC RESIDENCES', deliveryDate: '01-07-2026', zone: 'El Alet' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - RESIDENCIAL ROSA MORADA (Santiago de la Ribera)
  // ==========================================
  'N6095': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'RESIDENCIAL ROSA MORADA', deliveryDate: '01-12-2027', zone: 'Santiago De Lo Ribero' },
  'N6096': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'RESIDENCIAL ROSA MORADA', deliveryDate: '01-12-2027', zone: 'Santiago De Lo Ribero' },

  // ==========================================
  // AEGUS HOMES - IDEMA (Denia) - Additional
  // ==========================================
  'SP1057': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1069': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1063': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1054B': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1065': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },
  'SP1066': { developer: 'AEGUS HOMES', development: 'IDEMA', deliveryDate: '01-12-2027', zone: 'Playa de La Almadrava' },

  // ==========================================
  // LARCOSTA - PARIS VIII (Dolores, Sector 3) - More properties
  // ==========================================
  'N9082C': { developer: 'LARCOSTA', development: 'PARIS VIII', deliveryDate: '01-12-2026', zone: 'Sector 3' },

  // ==========================================
  // RAKO BLUESTONE - INFINITY VILLAS (Alfea, Sierra de Alfea)
  // ==========================================
  'N8827': { developer: 'RAKO BLUESTONE', development: 'INFINITY VILLAS', deliveryDate: '01-12-2025', zone: 'Sierra de Alfea' },

  // ==========================================
  // COSTA BLANCA BOLUV - VILLAS OLIVO 2 (Petrer, Novapolop)
  // ==========================================
  'N8842': { developer: 'COSTA BLANCA BOLUV', development: 'VILLAS OLIVO 2', deliveryDate: '01-09-2026', zone: 'Novapolop' },
  'N8845': { developer: 'COSTA BLANCA BOLUV', development: 'VILLAS OLIVO 2', deliveryDate: '01-01-2027', zone: 'Novapolop' },

  // ==========================================
  // AEGUS HOMES - HOLINESS (Almerimar) - Additional
  // ==========================================
  'SP1088': { developer: 'AEGUS HOMES', development: 'HOLINESS', deliveryDate: '01-04-2027', zone: 'Almerimar' },
  'SP1089': { developer: 'AEGUS HOMES', development: 'HOLINESS', deliveryDate: '01-04-2027', zone: 'Almerimar' },

  // ==========================================
  // TURIS PROMOCIONES - SERENITY VILLAS (Benissa, Costa Advocat)
  // ==========================================
  'SP1085': { developer: 'TURIS PROMOCIONES', development: 'SERENITY VILLAS', deliveryDate: '01-12-2026', zone: 'Costa Advocat' },

  // ==========================================
  // CREATIVITY BUILD - AURA4 (Pilar de La Horadada, pueblo)
  // ==========================================
  'N8833': { developer: 'CREATIVITY BUILD', development: 'AURA4', deliveryDate: '01-09-2026', zone: 'pueblo' },
  'N8834': { developer: 'CREATIVITY BUILD', development: 'AURA4', deliveryDate: '01-09-2026', zone: 'pueblo' },
  'N8832': { developer: 'CREATIVITY BUILD', development: 'AURA4', deliveryDate: '01-09-2026', zone: 'pueblo' },

  // ==========================================
  // ALTECO INVEST - BOTIRA STAR (Guardamar del Segura, Pueblo)
  // ==========================================
  'N8818': { developer: 'ALTECO INVEST', development: 'BOTIRA STAR', deliveryDate: '01-04-2026', zone: 'Pueblo' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - OLIVO DEL MAR II (Los Alcazares, Lo Conicha)
  // ==========================================
  'N8861': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'OLIVO DEL MAR II', deliveryDate: '01-07-2026', zone: 'Lo Conicha' },

  // ==========================================
  // OREESOL - MIRADOR HILLS (Fuente Alamo, Hacienda del Alamo)
  // ==========================================
  'N8862': { developer: 'OREESOL', development: 'MIRADOR HILLS', deliveryDate: '01-12-2026', zone: 'Hacienda del Alamo' },
  'N8863': { developer: 'OREESOL', development: 'MIRADOR HILLS', deliveryDate: '01-12-2026', zone: 'Hacienda del Alamo' },

  // ==========================================
  // CBM HOMES - BRISANAR (Torrevieja, Playa del Acoqui)
  // ==========================================
  'N8856': { developer: 'CBM HOMES', development: 'BRISANAR', deliveryDate: '01-12-2026', zone: 'Playa del Acoqui' },
  'N8857': { developer: 'CBM HOMES', development: 'BRISANAR', deliveryDate: '01-12-2026', zone: 'Playa del Acoqui' },

  // ==========================================
  // ALDAS HOMES - LUSTORIA (San Juan Alicante, Costa de los Huertos)
  // ==========================================
  'SP2085': { developer: 'ALDAS HOMES', development: 'LUSTORIA', deliveryDate: '01-12-2026', zone: 'Costa de los Huertos' },

  // ==========================================
  // ALDAS HOMES - OROTOAKE (Villajoyosa, Playo del Torres)
  // ==========================================
  'SP2095': { developer: 'ALDAS HOMES', development: 'OROTOAKE', deliveryDate: '01-12-2026', zone: 'Playo del Torres' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - VILLAS JUBILAN 2 (San Pedro del Pinatar, Los Antolinos)
  // ==========================================
  'N8848': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'VILLAS JUBILAN 2', deliveryDate: '01-12-2028', zone: 'Los Antolinos' },
  'N8849': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'VILLAS JUBILAN 2', deliveryDate: '01-12-2028', zone: 'Los Antolinos' },
  'N8851': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'VILLAS JUBILAN 2', deliveryDate: '01-12-2026', zone: 'Los Antolinos' },

  // ==========================================
  // ROYAL PARK - ROYAL PARK RIVER (Guardamar del Segura, Avenida del Puerto)
  // ==========================================
  'N8892': { developer: 'ROYAL PARK', development: 'ROYAL PARK RIVER', deliveryDate: '01-08-2026', zone: 'Avenida del Puerto' },
  'N8891': { developer: 'ROYAL PARK', development: 'ROYAL PARK RIVER', deliveryDate: '01-09-2026', zone: 'Avenida del Puerto' },
  'N8890': { developer: 'ROYAL PARK', development: 'ROYAL PARK RIVER', deliveryDate: '01-09-2026', zone: 'Avenida del Puerto' },

  // ==========================================
  // MAROQUE - SAMIRA BEACH IV (Pilar de La Horadada, pueblo)
  // ==========================================
  'N8874': { developer: 'MAROQUE', development: 'SAMIRA BEACH IV', deliveryDate: '01-04-2027', zone: 'pueblo' },
  'N8872': { developer: 'MAROQUE', development: 'SAMIRA BEACH IV', deliveryDate: '01-04-2027', zone: 'pueblo' },

  // ==========================================
  // SANTAMAR - HORIZON (San Miguel de Salinas)
  // ==========================================
  'N8868': { developer: 'SANTAMAR', development: 'HORIZON', deliveryDate: '01-09-2026', zone: 'San Miguel de Salinas' },
  'N8867': { developer: 'SANTAMAR', development: 'HORIZON', deliveryDate: '01-09-2026', zone: 'San Miguel de Salinas' },

  // ==========================================
  // OREESOL - VILLAS MARTINA (Fuente Alamo, Hacienda del Alamo)
  // ==========================================
  'N8865': { developer: 'OREESOL', development: 'VILLAS MARTINA', deliveryDate: '01-09-2026', zone: 'Hacienda del Alamo' },

  // ==========================================
  // OREESOL - MIRAGOLF HILLS (Fuente Alamo, Hacienda del Alamo)
  // ==========================================
  'N8864': { developer: 'OREESOL', development: 'MIRAGOLF HILLS', deliveryDate: '01-12-2026', zone: 'Hacienda del Alamo' },

  // ==========================================
  // ALICANTE NEW VILLAS - LU24 (Hondon de los Nieves, La Cardalissa)
  // ==========================================
  'N8915': { developer: 'ALICANTE NEW VILLAS', development: 'LU24', deliveryDate: '01-09-2026', zone: 'La Cardalissa' },

  // ==========================================
  // URBAGOLF PROMOCIONES - TERRAZAS GOLF FASE IV (Rojales, Golf La Marquesa)
  // ==========================================
  'N8323': { developer: 'URBAGOLF PROMOCIONES', development: 'TERRAZAS GOLF FASE IV', deliveryDate: '01-12-2026', zone: 'Golf La Marquesa' },

  // ==========================================
  // ROYAL PARK - CUSTOM HOMES 2 (Orihuela Costa, La Zenia)
  // ==========================================
  'N8897': { developer: 'ROYAL PARK', development: 'CUSTOM HOMES 2', deliveryDate: '01-12-2025', zone: 'La Zenia' },

  // ==========================================
  // PERALIA GOLF - PERALIA ORIGENES (Sucina, Peraleja Golf)
  // ==========================================
  'N8895': { developer: 'PERALIA GOLF', development: 'PERALIA ORIGENES', deliveryDate: '01-02-2026', zone: 'Peraleja Golf' },
  'N8894': { developer: 'PERALIA GOLF', development: 'PERALIA ORIGENES', deliveryDate: '01-02-2026', zone: 'Peraleja Golf' },
  'N8896': { developer: 'PERALIA GOLF', development: 'PERALIA ORIGENES', deliveryDate: '01-02-2026', zone: 'Peraleja Golf' },
  'N8897B': { developer: 'PERALIA GOLF', development: 'PERALIA ORIGENES', deliveryDate: '01-02-2026', zone: 'Peraleja Golf' },
  'N8898': { developer: 'PERALIA GOLF', development: 'PERALIA ORIGENES', deliveryDate: '01-02-2026', zone: 'Peraleja Golf' },
  'N8899': { developer: 'PERALIA GOLF', development: 'PERALIA ORIGENES', deliveryDate: '01-02-2026', zone: 'Peraleja Golf' },

  // ==========================================
  // RODIRGO - CARIS (Torre Pacheco, Santa Rosalia Lake And Life Resort)
  // ==========================================
  'N8890B': { developer: 'RODIRGO', development: 'CARIS', deliveryDate: '01-07-2027', zone: 'Santa Rosalia Lake And Life Resort' },

  // ==========================================
  // GRUPO ESMERALDA - JADE 2 (Calpe, Playa Arenal)
  // ==========================================
  'N8922': { developer: 'GRUPO ESMERALDA', development: 'JADE 2', deliveryDate: '01-03-2028', zone: 'Playa Arenal' },
  'N8923': { developer: 'GRUPO ESMERALDA', development: 'JADE 2', deliveryDate: '01-03-2028', zone: 'Playa Arenal' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - LEVASSUR HOME EIGHT (Vera, Pueblo Salinas) - Additional
  // ==========================================
  'N897': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME EIGHT', deliveryDate: '01-09-2027', zone: 'Pueblo Salinas' },
  'N8919': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME EIGHT', deliveryDate: '01-09-2027', zone: 'Pueblo Salinas' },
  'N8920': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME EIGHT', deliveryDate: '01-09-2027', zone: 'Pueblo Salinas' },
  'N8921': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVASSUR HOME EIGHT', deliveryDate: '01-09-2027', zone: 'Pueblo Salinas' },

  // ==========================================
  // SZUMAR - ALBA SALINA 3 MONTESINOS (Los Montesinos, La Herrada)
  // ==========================================
  'N8976B': { developer: 'SZUMAR', development: 'ALBA SALINA 3 MONTESINOS', deliveryDate: '01-10-2026', zone: 'La Herrada' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - EVO VILLAS (Pilar de La Horadada, Lo Monte)
  // ==========================================
  'N8913': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'EVO VILLAS', deliveryDate: '01-04-2028', zone: 'Lo Monte' },

  // ==========================================
  // GROUP UNO - SUNTERRRA LUX II (Torre Pacheco, Roldan)
  // ==========================================
  'N892': { developer: 'GROUP UNO', development: 'SUNTERRRA LUX II', deliveryDate: '01-07-2026', zone: 'Roldan' },

  // ==========================================
  // GROUP UNO - SUNTERRRA BEACH VILLAS ROLDAN (Torre Pacheco)
  // ==========================================
  'N8914': { developer: 'GROUP UNO', development: 'SUNTERRRA BEACH VILLAS ROLDAN', deliveryDate: '01-07-2026', zone: 'Roldan' },

  // ==========================================
  // SPAIN MEDITERRANEAN EXPERIENCE - VILLAS DUO ROMA ASPE (Aspe, Poligono 19)
  // ==========================================
  'N8931': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA ASPE', deliveryDate: '01-10-2026', zone: 'Poligono 19' },
  'N8932': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA ASPE', deliveryDate: '01-10-2026', zone: 'Poligono 19' },
  'N8933': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA ASPE', deliveryDate: '01-10-2026', zone: 'Poligono 19' },
  'N8934': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA ASPE', deliveryDate: '01-10-2026', zone: 'Poligono 19' },
  'N8935': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA ASPE', deliveryDate: '01-10-2026', zone: 'Poligono 19' },
  'N8936': { developer: 'SPAIN MEDITERRANEAN EXPERIENCE', development: 'VILLAS DUO ROMA ASPE', deliveryDate: '01-10-2026', zone: 'Poligono 19' },

  // ==========================================
  // KRUBDI - EDLU BEACH (San Pedro del Pinatar, Los Pinos)
  // ==========================================
  'SP012': { developer: 'KRUBDI', development: 'EDLU BEACH', deliveryDate: '01-04-2027', zone: 'Los Pinos' },
  'SP013': { developer: 'KRUBDI', development: 'EDLU BEACH', deliveryDate: '01-04-2027', zone: 'Los Pinos' },
  'SP014': { developer: 'KRUBDI', development: 'EDLU BEACH', deliveryDate: '01-04-2027', zone: 'Los Pinos' },
  'SP015': { developer: 'KRUBDI', development: 'EDLU BEACH', deliveryDate: '01-04-2027', zone: 'Los Pinos' },

  // ==========================================
  // MIVIOTICS - MY WHITE RESORT (Finestrat, Balcon De Finestrat)
  // ==========================================
  'N9530B': { developer: 'MIVIOTICS', development: 'MY WHITE RESORT', deliveryDate: '01-01-2027', zone: 'Balcon De Finestrat' },

  // ==========================================
  // ALTER STYLE URBANA - MEDITERRANEA LUXURY HOMES (San Pedro del Pinatar)
  // ==========================================
  'N9525B': { developer: 'ALTER STYLE URBANA', development: 'MEDITERRANEA LUXURY HOMES', deliveryDate: '01-04-2028', zone: 'San Pedro del Pinatar' },

  // ==========================================
  // BEST MEDITERRANEO - BEST MEDITERRANEO I (Los Alcazares, Serena Golf)
  // ==========================================
  'N8958': { developer: 'BEST MEDITERRANEO', development: 'BEST MEDITERRANEO I', deliveryDate: '01-01-2027', zone: 'Serena Golf' },
  'N8965': { developer: 'BEST MEDITERRANEO', development: 'BEST MEDITERRANEO I', deliveryDate: '01-01-2027', zone: 'Serena Golf' },
  'N8970': { developer: 'BEST MEDITERRANEO', development: 'BEST MEDITERRANEO I', deliveryDate: '01-01-2027', zone: 'Serena Golf' },
  'N8971': { developer: 'BEST MEDITERRANEO', development: 'BEST MEDITERRANEO I', deliveryDate: '01-01-2027', zone: 'Serena Golf' },
  'N8967': { developer: 'BEST MEDITERRANEO', development: 'BEST MEDITERRANEO I', deliveryDate: '01-01-2027', zone: 'Serena Golf' },
  'N8968': { developer: 'BEST MEDITERRANEO', development: 'BEST MEDITERRANEO I', deliveryDate: '01-01-2027', zone: 'Serena Golf' },

  // ==========================================
  // BEST OF SPAIN - PURA VIDA V (Pilar de La Horadada, paraque de Andromeda)
  // ==========================================
  'N8955': { developer: 'BEST OF SPAIN', development: 'PURA VIDA V', deliveryDate: '01-01-2028', zone: 'paraque de Andromeda' },

  // ==========================================
  // AIDAS HOMES - URUGUAY (Villajoyosa)
  // ==========================================
  'SP1032': { developer: 'AIDAS HOMES', development: 'URUGUAY', deliveryDate: '01-01-2026', zone: 'Villajoyosa' },

  // ==========================================
  // RAHO HOME SPAIN - ESTRELLA DE LA RIBERA (San Javier, Santiago De Lo Ribero)
  // ==========================================
  'N8946': { developer: 'RAHO HOME SPAIN', development: 'ESTRELLA DE LA RIBERA', deliveryDate: '01-12-2026', zone: 'Santiago De Lo Ribero' },

  // ==========================================
  // QUADRATIA - BEA CALATA (Aguilas, Rio Del Fralle)
  // ==========================================
  'N8942': { developer: 'QUADRATIA', development: 'BEA CALATA', deliveryDate: '01-03-2027', zone: 'Rio Del Fralle' },

  // ==========================================
  // BYPASES - SAINGO GOLF (Pulpi, Aguilon Golf)
  // ==========================================
  'SP1020': { developer: 'BYPASES', development: 'SAINGO GOLF', deliveryDate: '01-05-2028', zone: 'Aguilon Golf' },
  'SP1021': { developer: 'BYPASES', development: 'SAINGO GOLF', deliveryDate: '01-05-2028', zone: 'Aguilon Golf' },
  'SP1022': { developer: 'BYPASES', development: 'SAINGO GOLF', deliveryDate: '01-05-2028', zone: 'Aguilon Golf' },
  'SP1023': { developer: 'BYPASES', development: 'SAINGO GOLF', deliveryDate: '01-05-2028', zone: 'Aguilon Golf' },

  // ==========================================
  // VILLAS METAPALMERAS SUNPLACE (Pilar de La Horadada, Barra las Segundas)
  // ==========================================
  'N8964': { developer: 'VILLAS METAPALMERAS', development: 'SUNPLACE', deliveryDate: '01-07-2026', zone: 'Barra las Segundas' },

  // ==========================================
  // BAHIA HOMES - BAHIA HOMES HORADADA 3 (Pilar de la Horadada, paraque Andromeda)
  // ==========================================
  'N8960': { developer: 'BAHIA HOMES', development: 'BAHIA HOMES HORADADA 3', deliveryDate: '01-07-2026', zone: 'paraque Andromeda' },
  'N8978': { developer: 'BAHIA HOMES', development: 'BAHIA HOMES HORADADA 3', deliveryDate: '01-07-2026', zone: 'paraque Andromeda' },

  // ==========================================
  // SCUMAR - ALBA SAINA 4 (Orihuela, Vistabella Golf)
  // ==========================================
  'N8973': { developer: 'SCUMAR', development: 'ALBA SAINA 4', deliveryDate: '01-12-2026', zone: 'Vistabella Golf' },

  // ==========================================
  // LAMAR HOUSE - HIGUERICLAS BEACH (Pilar de La Horadada, Playa de los Higuericlas)
  // ==========================================
  'N8826': { developer: 'LAMAR HOUSE', development: 'HIGUERICLAS BEACH', deliveryDate: '01-09-2026', zone: 'Playa de los Higuericlas' },
  'N8809': { developer: 'LAMAR HOUSE', development: 'HIGUERICLAS BEACH', deliveryDate: '01-09-2026', zone: 'Playa de los Higuericlas' },

  // ==========================================
  // MAMOSOL - ARENA GOLF (Algorfa, La Finca Golf)
  // ==========================================
  'N8837': { developer: 'MAMOSOL', development: 'ARENA GOLF', deliveryDate: '01-09-2026', zone: 'La Finca Golf' },
  'N8836': { developer: 'MAMOSOL', development: 'ARENA GOLF', deliveryDate: '01-03-2026', zone: 'La Finca Golf' },

  // ==========================================
  // PLOOP HILLS - PLOOP HILLS (Pedip, Urbanizaciones)
  // ==========================================
  'N8835': { developer: 'PLOOP HILLS', development: 'PLOOP HILLS', deliveryDate: '01-12-2026', zone: 'Urbanizaciones' },

  // ==========================================
  // MEDHOUSES - RESIDENCIAL SATO (San Fulgencio, Pueblo)
  // ==========================================
  'N8791': { developer: 'MEDHOUSES', development: 'RESIDENCIAL SATO', deliveryDate: '01-12-2026', zone: 'Pueblo' },
  'N8792': { developer: 'MEDHOUSES', development: 'RESIDENCIAL SATO', deliveryDate: '01-12-2025', zone: 'Pueblo' },
  'N8793': { developer: 'MEDHOUSES', development: 'RESIDENCIAL SATO', deliveryDate: '01-12-2026', zone: 'Pueblo' },
  'N8794': { developer: 'MEDHOUSES', development: 'RESIDENCIAL SATO', deliveryDate: '01-12-2026', zone: 'Pueblo' },

  // ==========================================
  // COSTA BLANCA BOLUS - ALBA VERDE (Jacarilla, pueblo)
  // ==========================================
  'N8787': { developer: 'COSTA BLANCA BOLUS', development: 'ALBA VERDE', deliveryDate: '01-12-2025', zone: 'pueblo' },
  'N8788': { developer: 'COSTA BLANCA BOLUS', development: 'ALBA VERDE', deliveryDate: '01-12-2025', zone: 'pueblo' },
  'N8769': { developer: 'COSTA BLANCA BOLUS', development: 'ALBA VERDE', deliveryDate: '01-12-2026', zone: 'Jacarillo' },

  // ==========================================
  // TRIVEE - GRECIA II (Algorfa, La Finca Golf)
  // ==========================================
  'N872': { developer: 'TRIVEE', development: 'GRECIA II', deliveryDate: '01-01-2026', zone: 'La Finca Golf' },
  'N8733': { developer: 'TRIVEE', development: 'GRECIA II', deliveryDate: '01-04-2026', zone: 'La Finca Golf' },
  'N8731': { developer: 'TRIVEE', development: 'GRECIA II', deliveryDate: '01-04-2026', zone: 'La Finca Golf' },

  // ==========================================
  // TINDRA HOMES - COSTA SIRENA (Los Alcazares, Serena Golf)
  // ==========================================
  'N8718': { developer: 'TINDRA HOMES', development: 'COSTA SIRENA', deliveryDate: '01-06-2027', zone: 'Serena Golf' },
  'N8719': { developer: 'TINDRA HOMES', development: 'COSTA SIRENA', deliveryDate: '01-06-2027', zone: 'Serena Golf' },
  'N8720': { developer: 'TINDRA HOMES', development: 'COSTA SIRENA', deliveryDate: '01-06-2027', zone: 'Serena Golf' },
  'N8721': { developer: 'TINDRA HOMES', development: 'COSTA SIRENA', deliveryDate: '01-06-2027', zone: 'Serena Golf' },
  'N8717': { developer: 'TINDRA HOMES', development: 'COSTA SIRENA', deliveryDate: '01-06-2027', zone: 'Serena Golf' },

  // ==========================================
  // VITANA HOME - LOS BALCONES DE CALPE (Calpe, Arenal Bol)
  // ==========================================
  'N8703': { developer: 'VITANA HOME', development: 'LOS BALCONES DE CALPE', deliveryDate: '01-12-2027', zone: 'Arenal Bol' },
  'N8704': { developer: 'VITANA HOME', development: 'LOS BALCONES DE CALPE', deliveryDate: '01-12-2027', zone: 'Arenal Bol' },
  'N8705': { developer: 'VITANA HOME', development: 'LOS BALCONES DE CALPE', deliveryDate: '01-12-2027', zone: 'Arenal Bol' },
  'N8706': { developer: 'VITANA HOME', development: 'LOS BALCONES DE CALPE', deliveryDate: '01-12-2027', zone: 'Arenal Bol' },

  // ==========================================
  // NAVASAI2 - VISTA AZUL XXKM LO MONTE (Pilar de La Horadada, Lo Monte)
  // ==========================================
  'N8710': { developer: 'NAVASAI2', development: 'VISTA AZUL XXKM LO MONTE', deliveryDate: '01-10-2026', zone: 'Lo Monte' },

  // ==========================================
  // SOL DE SALINAS - SOL DE SALINAS (San Miguel de Salinas, Pueblo)
  // ==========================================
  'N8747': { developer: 'SOL DE SALINAS', development: 'SOL DE SALINAS', deliveryDate: '01-10-2026', zone: 'Pueblo' },
  'N8748': { developer: 'SOL DE SALINAS', development: 'SOL DE SALINAS', deliveryDate: '01-10-2026', zone: 'Pueblo' },
  'N8743': { developer: 'SOL DE SALINAS', development: 'SOL DE SALINAS', deliveryDate: '01-10-2026', zone: 'Pueblo' },
  'N8744': { developer: 'SOL DE SALINAS', development: 'SOL DE SALINAS', deliveryDate: '01-10-2026', zone: 'Pueblo' },
  'N8745': { developer: 'SOL DE SALINAS', development: 'SOL DE SALINAS', deliveryDate: '01-10-2026', zone: 'Pueblo' },
  'N8746': { developer: 'SOL DE SALINAS', development: 'SOL DE SALINAS', deliveryDate: '01-10-2026', zone: 'Pueblo' },

  // ==========================================
  // AEGUS HOMES - VIOLANTA (Alicante, San Agustin)
  // ==========================================
  'SP1263': { developer: 'AEGUS HOMES', development: 'VIOLANTA', deliveryDate: '01-12-2026', zone: 'San Agustin' },
  'SP1637': { developer: 'AEGUS HOMES', development: 'VIOLANTA', deliveryDate: '01-12-2026', zone: 'San Agustin' },

  // ==========================================
  // URMOSA - EDIFICIO CIRENA (Hondon de los Nieves, Pueblo)
  // ==========================================
  'N8770': { developer: 'URMOSA', development: 'EDIFICIO CIRENA', deliveryDate: '01-05-2026', zone: 'Pueblo' },
  'N8771': { developer: 'URMOSA', development: 'EDIFICIO CIRENA', deliveryDate: '01-05-2026', zone: 'Pueblo' },
  'N8772': { developer: 'URMOSA', development: 'EDIFICIO CIRENA', deliveryDate: '01-05-2026', zone: 'Pueblo' },

  // ==========================================
  // URMOSA - VINEYARD VIEWS (Hondon de los Nieves, Pueblo)
  // ==========================================
  'N8778': { developer: 'URMOSA', development: 'VINEYARD VIEWS', deliveryDate: '01-12-2026', zone: 'Pueblo' },
  'N8773': { developer: 'URMOSA', development: 'VINEYARD VIEWS', deliveryDate: '01-12-2026', zone: 'Pueblo' },
  'N8774': { developer: 'URMOSA', development: 'VINEYARD VIEWS', deliveryDate: '01-01-2026', zone: 'Pueblo' },
  'N8775': { developer: 'URMOSA', development: 'VINEYARD VIEWS', deliveryDate: '01-01-2026', zone: 'Pueblo' },
  'N8776': { developer: 'URMOSA', development: 'VINEYARD VIEWS', deliveryDate: '01-01-2026', zone: 'Pueblo' },
  'N8777': { developer: 'URMOSA', development: 'VINEYARD VIEWS', deliveryDate: '01-12-2025', zone: 'Pueblo' },

  // ==========================================
  // NARANJA SPAIN - MOONLIGHT DAYLIGHT (Ciudad Quesada, Rojales)
  // ==========================================
  'N8709': { developer: 'NARANJA SPAIN', development: 'MOONLIGHT DAYLIGHT', deliveryDate: '01-04-2028', zone: 'Rojales' },
  'N8758': { developer: 'NARANJA SPAIN', development: 'MOONLIGHT DAYLIGHT', deliveryDate: '01-04-2028', zone: 'Rojales' },

  // ==========================================
  // URMOSA - SEA ESSENCE (Santa Pola, Estacion de ciudadouero)
  // ==========================================
  'N8713': { developer: 'URMOSA', development: 'SEA ESSENCE', deliveryDate: '01-01-2026', zone: 'Estacion de ciudadouero' },

  // ==========================================
  // SONERA HOMES - COSTABELLA RESIDENCES F3 (Finestrat, Sierra Cortina)
  // ==========================================
  'N8751': { developer: 'SONERA HOMES', development: 'COSTABELLA RESIDENCES F3', deliveryDate: '01-07-2026', zone: 'Sierra Cortina' },
  'N8752': { developer: 'SONERA HOMES', development: 'COSTABELLA RESIDENCES F3', deliveryDate: '01-07-2026', zone: 'Sierra Cortina' },
  'N8748B': { developer: 'SONERA HOMES', development: 'COSTABELLA RESIDENCES F3', deliveryDate: '01-07-2026', zone: 'Sierra Cortina' },

  // ==========================================
  // AREA PROMOTORA - AREA BEACH V LO MARABU (Ciudad Quesada, Lo Marabu)
  // ==========================================
  'N8783': { developer: 'AREA PROMOTORA', development: 'AREA BEACH V LO MARABU', deliveryDate: '01-08-2026', zone: 'Lo Marabu' },
  'N8784': { developer: 'AREA PROMOTORA', development: 'AREA BEACH V LO MARABU', deliveryDate: '01-08-2026', zone: 'Lo Marabu' },
  'N8785': { developer: 'AREA PROMOTORA', development: 'AREA BEACH V LO MARABU', deliveryDate: '01-08-2026', zone: 'Lo Marabu' },
  'N8782': { developer: 'AREA PROMOTORA', development: 'AREA BEACH V LO MARABU', deliveryDate: '01-08-2026', zone: 'Lo Marabu' },

  // ==========================================
  // OKEY VIVIENDAS - PLAYAMAR XIII (Pilar de La Horadada, pueblo)
  // ==========================================
  'N8803': { developer: 'OKEY VIVIENDAS', development: 'PLAYAMAR XIII', deliveryDate: '01-12-2027', zone: 'pueblo' },
  'N8851B': { developer: 'OKEY VIVIENDAS', development: 'PLAYAMAR XIII', deliveryDate: '01-12-2027', zone: 'pueblo' },

  // ==========================================
  // DULY - DULY SAN MIGUEL (San Miguel de Salinas, Pueblo)
  // ==========================================
  'N8809B': { developer: 'DULY', development: 'DULY SAN MIGUEL', deliveryDate: '01-12-2028', zone: 'Pueblo' },
  'N8810': { developer: 'DULY', development: 'DULY SAN MIGUEL', deliveryDate: '01-12-2028', zone: 'Pueblo' },

  // ==========================================
  // ALTECO INVEST - ROYAL STAR (Guardamar del Segura, Pueblo)
  // ==========================================
  'N8816': { developer: 'ALTECO INVEST', development: 'ROYAL STAR', deliveryDate: '01-04-2026', zone: 'Pueblo' },
  'N8817': { developer: 'ALTECO INVEST', development: 'ROYAL STAR', deliveryDate: '01-04-2026', zone: 'Pueblo' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - GREEN GARDEN V (Pilar de La Horadada, pueblo)
  // ==========================================
  'N8812': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'GREEN GARDEN V', deliveryDate: '01-12-2026', zone: 'pueblo' },

  // ==========================================
  // PERALIA GOLF - PERALIA ORIGENES (Sucina, Peraleja Golf)
  // ==========================================
  'N8811': { developer: 'PERALIA GOLF', development: 'PERALIA ORIGENES', deliveryDate: '01-04-2026', zone: 'Peraleja Golf' },

  // ==========================================
  // ARISOL - ANDREA VILLAS (Daya Nueva, Pueblo) - Additional
  // ==========================================
  'N8376B': { developer: 'ARISOL', development: 'ANDREA VILLAS', deliveryDate: '01-09-2026', zone: 'Pueblo' },

  // ==========================================
  // AIDAS HOMES - HALAR (Alicante, San Agustin-PAU 2)
  // Note: Some entries moved to avoid duplicates
  // ==========================================

  // ==========================================
  // RODENKO - ALTOS DE SAN PEDRO F2 (San Pedro del Pinatar, Los Antolinos)
  // ==========================================
  'N8125': { developer: 'RODENKO', development: 'ALTOS DE SAN PEDRO F2', deliveryDate: '01-09-2026', zone: 'Los Antolinos' },

  // ==========================================
  // ZAPATA PROJECTS - NOVA II (Pilar de la Horadada, Torre De La Horadada)
  // ==========================================
  'N8123': { developer: 'ZAPATA PROJECTS', development: 'NOVA II', deliveryDate: '01-01-2026', zone: 'Torre De La Horadada' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - RESIDENCIAL EL FARO (Torre Pacheco)
  // ==========================================
  'N8185': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'RESIDENCIAL EL FARO', deliveryDate: '01-09-2028', zone: 'Torre Pacheco' },
  'N8051': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'RESIDENCIAL EL FARO', deliveryDate: '01-12-2026', zone: 'Torre Pacheco' },

  // ==========================================
  // PROMOCIONES JOG - BENIARO (Monton_Naulato, El Tesoro)
  // ==========================================
  'N8099': { developer: 'PROMOCIONES JOG', development: 'BENIARO', deliveryDate: '01-11-2026', zone: 'El Tesoro' },

  // ==========================================
  // ATTIC - TERRAZAS DE LEVANTE (Aguilas, Playa de Levante)
  // ==========================================
  'N8012': { developer: 'ATTIC', development: 'TERRAZAS DE LEVANTE', deliveryDate: '01-12-2027', zone: 'Playa de Levante' },
  'N8010': { developer: 'ATTIC', development: 'TERRAZAS DE LEVANTE', deliveryDate: '01-12-2027', zone: 'Playa de Levante' },

  // ==========================================
  // ALEGRIA - ALEGRIA XXII (Torrevieja, Centro)
  // ==========================================
  'N8248': { developer: 'ALEGRIA', development: 'ALEGRIA XXII', deliveryDate: '01-02-2026', zone: 'Centro' },

  // ==========================================
  // VICTORIA PLAYA - RESIDENCIAL VICTORIA IV (Denia, Los Marinas km 2,5)
  // ==========================================
  'N8251': { developer: 'VICTORIA PLAYA', development: 'RESIDENCIAL VICTORIA IV', deliveryDate: '01-07-2025', zone: 'Los Marinas km 2,5' },
  'N8317': { developer: 'VICTORIA PLAYA', development: 'VILLAS VICTORIA IV', deliveryDate: '01-12-2025', zone: 'Partida Blarinquetas' },
  'N8318': { developer: 'VICTORIA PLAYA', development: 'VILLAS VICTORIA IV', deliveryDate: '01-12-2025', zone: 'Partida Blarinquetas' },

  // ==========================================
  // GRUPO ZARAGOZA_RICARDO PEREZ - HERATE RESIDENCIAL (San Juan Alicante, Nou Nazareth)
  // ==========================================
  'N8136': { developer: 'GRUPO ZARAGOZA_RICARDO PEREZ', development: 'HERATE RESIDENCIAL', deliveryDate: '01-04-2026', zone: 'Nou Nazareth' },

  // ==========================================
  // SOLIMAR - ALMADRABA 2 FASE III (Rojales, Pueblo)
  // ==========================================
  'N8133': { developer: 'SOLIMAR', development: 'ALMADRABA 2 FASE III', deliveryDate: '01-07-2026', zone: 'Pueblo' },

  // ==========================================
  // TEVAS - MAR EDEO (Algorfa, Lo Pinca Golf)
  // ==========================================
  'N8195': { developer: 'TEVAS', development: 'MAR EDEO', deliveryDate: '01-07-2025', zone: 'Lo Pinca Golf' },

  // ==========================================
  // CONSTRUFUTUR - VILLA PERLA (Benijofar, Pueblo)
  // ==========================================
  'N8223': { developer: 'CONSTRUFUTUR', development: 'VILLA PERLA', deliveryDate: '01-12-2026', zone: 'Pueblo' },

  // ==========================================
  // TRUVE - MASTOLEX (Algorfa, Lo Pinca Golf)
  // ==========================================
  'N8212': { developer: 'TRUVE', development: 'MASTOLEX', deliveryDate: '01-04-2026', zone: 'Lo Pinca Golf' },

  // ==========================================
  // MARCOS - MARQUES GOLF RESORT (Finestrat, Puig Campana Golf)
  // ==========================================
  'N8215': { developer: 'MARCOS', development: 'MARQUES GOLF RESORT', deliveryDate: '01-12-2026', zone: 'Puig Campana Golf' },

  // ==========================================
  // NAVASAEZ - VISTA AZUL XXXV (Pilar de la Horadada, Lo Romero Golf)
  // ==========================================
  'N8219': { developer: 'NAVASAEZ', development: 'VISTA AZUL XXXV', deliveryDate: '01-03-2026', zone: 'Lo Romero Golf' },

  // ==========================================
  // CORMINSA - OASIS LAGUNA 2 (Guardamar del Segura, El Raso)
  // ==========================================
  'N8208': { developer: 'CORMINSA', development: 'OASIS LAGUNA 2', deliveryDate: '01-06-2026', zone: 'El Raso' },
  'N8209': { developer: 'CORMINSA', development: 'OASIS LAGUNA 2', deliveryDate: '01-10-2026', zone: 'El Raso' },

  // ==========================================
  // VAPI - Various developments (Benitachell, Cumbres Del Sol)
  // ==========================================
  'SP0694': { developer: 'VAPI', development: 'LIRIOS SUNRISE', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0695': { developer: 'VAPI', development: 'MAGNOLIAS DESIGN', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0696': { developer: 'VAPI', development: 'MAGNOLIAS SUNRISE', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0693': { developer: 'VAPI', development: 'RESIDENCIAL PLUS JAZMINES', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0685': { developer: 'VAPI', development: 'AZURI ALTEA HOMES II', deliveryDate: '01-08-2024', zone: 'Sierra de Altea' },
  'SP0731': { developer: 'VAPI', development: 'RESIDENCIAL PLUS JAZMINES', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0732': { developer: 'VAPI', development: 'RESIDENCIAL PLUS JAZMINES', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0736': { developer: 'VAPI', development: 'RESIDENCIAL PLUS JAZMINES', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0737': { developer: 'VAPI', development: 'RESIDENCIAL PLUS JAZMINES', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0690': { developer: 'VAPI', development: 'ORIOS DESIGN', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0698': { developer: 'VAPI', development: 'IBRIS DESIGN', deliveryDate: '01-12-2025', zone: 'Cumbres Del Sol' },
  'SP0156': { developer: 'VAPI', development: 'RESIDENCIAL PLUS JAZMINES', deliveryDate: '01-12-2028', zone: 'Cumbres Del Sol' },

  // ==========================================
  // ORBESOL - MIRADOR SANTA ROSALIA VILLAS (Los Alcazares)
  // ==========================================
  'N8269': { developer: 'ORBESOL', development: 'MIRADOR SANTA ROSALIA VILLAS', deliveryDate: '01-11-2025', zone: 'Los Alcazares' },

  // ==========================================
  // BEREN - BEREN HILLS VILLAS II (Finestrat, Sierra Cortina)
  // ==========================================
  'N8229': { developer: 'BEREN', development: 'BEREN HILLS VILLAS II', deliveryDate: '01-12-2024', zone: 'Sierra Cortina' },

  // ==========================================
  // GIBAX - VELAPI GOLF (Los Alcazares, Lo Sereno Golf)
  // ==========================================
  'N8262': { developer: 'GIBAX', development: 'VELAPI GOLF', deliveryDate: '01-01-2027', zone: 'Lo Sereno Golf' },
  'N8401': { developer: 'GIBAX', development: 'VELAPI GOLF', deliveryDate: '01-01-2027', zone: 'Lo Sereno Golf' },

  // ==========================================
  // NAYA - ZENIA VICTORY (Orihuela Costa, La Zenia)
  // ==========================================
  'N8245': { developer: 'NAYA', development: 'ZENIA VICTORY', deliveryDate: '01-04-2026', zone: 'La Zenia' },

  // ==========================================
  // GRUPO COSTA CALIDA - PORTO MARINA PLAZA (Pilar de La Horadada)
  // ==========================================
  'N8275': { developer: 'GRUPO COSTA CALIDA', development: 'PORTO MARINA PLAZA', deliveryDate: '01-12-2024', zone: 'Torre De La Horadada' },
  'N8274': { developer: 'GRUPO COSTA CALIDA', development: 'PORTO MARINA PLAZA', deliveryDate: '01-06-2026', zone: 'Torre De La Horadada' },
  'N8574': { developer: 'GRUPO COSTA CALIDA', development: 'PORTO MARINA PLAZA', deliveryDate: '01-09-2026', zone: 'Torre De La Horadada' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - ATAMARIA PARADISE (Mazarron, Campo de San Juan)
  // ==========================================
  'N8277': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'ATAMARIA PARADISE', deliveryDate: '01-08-2028', zone: 'Campo de San Juan' },

  // ==========================================
  // TAYLOR WIMPEY ESPAÑA - ALCUSAT (Monforte del Cid, Avenida Golf)
  // ==========================================
  'N8279': { developer: 'TAYLOR WIMPEY ESPAÑA', development: 'ALCUSAT', deliveryDate: '01-09-2027', zone: 'Avenida Golf' },

  // ==========================================
  // AMAV - BUNGALOWS BELLAVISTA (San Miguel de Salinas, Vistabella Golf)
  // ==========================================
  'N8258': { developer: 'AMAV', development: 'BUNGALOWS BELLAVISTA', deliveryDate: '01-03-2026', zone: 'Vistabella Golf' },

  // ==========================================
  // VILLAS MIL PALMERAS_SUNPLACE - FLAMENCA SUN (Orihuela Costa, Playa Flamenca)
  // ==========================================
  'N8181': { developer: 'VILLAS MIL PALMERAS_SUNPLACE', development: 'FLAMENCA SUN', deliveryDate: '01-12-2024', zone: 'Playa Flamenca' },
  'N8182': { developer: 'VILLAS MIL PALMERAS_SUNPLACE', development: 'FLAMENCA SUN', deliveryDate: '01-12-2024', zone: 'Playa Flamenca' },
  'N8039': { developer: 'VILLAS MIL PALMERAS_SUNPLACE', development: 'FLAMENCA SUN', deliveryDate: '01-12-2025', zone: 'Playa Flamenca' },
  'N6418': { developer: 'VILLAS MIL PALMERAS_SUNPLACE', development: 'FLAMENCA SUN', deliveryDate: '01-12-2024', zone: 'Playa Flamenca' },
  'N6504': { developer: 'VILLAS MIL PALMERAS_SUNPLACE', development: 'FLAMENCA SUN', deliveryDate: '01-12-2025', zone: 'Playa Flamenca' },

  // ==========================================
  // TAOUS - OASIS ATACINA (Banos y Mendigo, Altorreal Golf)
  // ==========================================
  'N8305': { developer: 'TAOUS', development: 'OASIS ATACINA', deliveryDate: '01-12-2025', zone: 'Altorreal Golf' },
  'N8306': { developer: 'TAOUS', development: 'OASIS ATACINA', deliveryDate: '01-12-2025', zone: 'Altorreal Golf' },
  'N8300': { developer: 'TAOUS', development: 'LAS VISTAS ATACINA', deliveryDate: '01-12-2024', zone: 'Altorreal Golf' },

  // ==========================================
  // QUADRATIA - SEA CALMA (Aguilas, Isla Del Fraile)
  // ==========================================
  'N8493B': { developer: 'QUADRATIA', development: 'SEA CALMA', deliveryDate: '01-04-2027', zone: 'Sierra Cortina' },

  // ==========================================
  // JIJUMA - AZIRE BEACH (San Pedro del Pinatar, Playa Villananitos)
  // ==========================================
  'N8375': { developer: 'JIJUMA', development: 'AZIRE BEACH', deliveryDate: '01-04-2027', zone: 'Playa Villananitos' },
  'N8377': { developer: 'JIJUMA', development: 'AZIRE BEACH', deliveryDate: '01-04-2027', zone: 'Playa Villananitos' },
  'N8378': { developer: 'JIJUMA', development: 'AZIRE BEACH', deliveryDate: '01-04-2027', zone: 'Playa Villananitos' },
  'N8381': { developer: 'JIJUMA', development: 'AZIRE BEACH', deliveryDate: '01-04-2027', zone: 'Playa Villananitos' },
  'N8380': { developer: 'JIJUMA', development: 'AZIRE BEACH', deliveryDate: '01-04-2027', zone: 'Playa Villananitos' },
  'N8385B': { developer: 'JIJUMA', development: 'AZIRE BEACH', deliveryDate: '01-04-2027', zone: 'Playa Villananitos' },

  // ==========================================
  // RODA REAL ESTATE - RODA RESIDENCES (San Javier, Roda Golf)
  // ==========================================
  'N8372': { developer: 'RODA REAL ESTATE', development: 'RODA RESIDENCES', deliveryDate: '01-03-2027', zone: 'Roda Golf' },
  'N8374': { developer: 'RODA REAL ESTATE', development: 'RODA RESIDENCES', deliveryDate: '01-03-2027', zone: 'Roda Golf' },

  // ==========================================
  // VISTABELLA GOLF - CAPRI III (Orihuela, Vistabella Golf)
  // ==========================================
  'SP0789': { developer: 'VISTABELLA GOLF', development: 'CAPRI III', deliveryDate: '01-09-2026', zone: 'Vistabella Golf' },
  'SP0780': { developer: 'VISTABELLA GOLF', development: 'CAPRI III', deliveryDate: '01-09-2026', zone: 'Vistabella Golf' },
  'SP0782': { developer: 'VISTABELLA GOLF', development: 'CAPRI III', deliveryDate: '01-09-2026', zone: 'Vistabella Golf' },
  'SP0779': { developer: 'VISTABELLA GOLF', development: 'CAPRI III', deliveryDate: '01-09-2026', zone: 'Vistabella Golf' },

  // ==========================================
  // ORMANDA - PLAYA PRINCIPE (La Manga del Mar Menor)
  // ==========================================
  'N8369': { developer: 'ORMANDA', development: 'PLAYA PRINCIPE', deliveryDate: '01-06-2026', zone: 'La Manga' },
  'N8370': { developer: 'ORMANDA', development: 'PLAYA PRINCIPE', deliveryDate: '01-06-2026', zone: 'La Manga' },
  'N8368': { developer: 'ORMANDA', development: 'PLAYA PRINCIPE', deliveryDate: '01-06-2026', zone: 'La Manga' },

  // ==========================================
  // JIJUMA - MAGNA GOLF (Los Alcazares, Serena Golf)
  // ==========================================
  'N8393': { developer: 'JIJUMA', development: 'MAGNA GOLF', deliveryDate: '01-04-2028', zone: 'Serena Golf' },
  'N8392': { developer: 'JIJUMA', development: 'MAGNA GOLF', deliveryDate: '01-04-2028', zone: 'Serena Golf' },

  // ==========================================
  // AMAY - BARCONES DE VKN (Torrevieja, Los Balcones)
  // ==========================================
  'N8477': { developer: 'AMAY', development: 'BARCONES DE VKN', deliveryDate: '01-12-2025', zone: 'Los Balcones' },

  // ==========================================
  // SONEIRA HOMES - NADIA VILLAGE (la Nucia, Nou Espol)
  // ==========================================
  'N8389': { developer: 'SONEIRA HOMES', development: 'NADIA VILLAGE', deliveryDate: '01-10-2025', zone: 'Nou Espol' },

  // ==========================================
  // PROPERTY Y CONSULTING OFFICE - LEVANMAR HOME V (Torre Pacheco)
  // ==========================================
  'N8738': { developer: 'PROPERTY Y CONSULTING OFFICE', development: 'LEVANMAR HOME V', deliveryDate: '01-03-2026', zone: 'Torre Pacheco' },

  // ==========================================
  // DONESA - ALORE BREEZE (Los Alcazares, Torre del Morro)
  // ==========================================
  'N8403': { developer: 'DONESA', development: 'ALORE BREEZE', deliveryDate: '01-12-2025', zone: 'Torre del Morro' },

  // ==========================================
  // HANSEL LOKAL - VEGABOL HOMES I (Cox, San Fernando)
  // ==========================================
  'N8413': { developer: 'HANSEL LOKAL', development: 'VEGABOL HOMES I', deliveryDate: '01-06-2026', zone: 'San Fernando' },
  'N8414': { developer: 'HANSEL LOKAL', development: 'VEGABOL HOMES I', deliveryDate: '01-06-2026', zone: 'San Fernando' },

  // ==========================================
  // OKEY VIVIENDAS - PLAYAMAR XII (Pilar de La Horadada, pueblo)
  // ==========================================
  'N8405': { developer: 'OKEY VIVIENDAS', development: 'PLAYAMAR XII', deliveryDate: '01-04-2026', zone: 'pueblo' },
  'N8407': { developer: 'OKEY VIVIENDAS', development: 'PLAYAMAR XII', deliveryDate: '01-04-2026', zone: 'pueblo' },

  // ==========================================
  // FEO HOME SPAIN - BENJOTAR VILLAS M20 (Benijofar, Pueblo)
  // ==========================================
  'N8420': { developer: 'FEO HOME SPAIN', development: 'BENJOTAR VILLAS M20', deliveryDate: '01-04-2026', zone: 'Pueblo' },

  // ==========================================
  // TAI WIND SPAIN - BALCON DE PONCHO VILLAS (Palop, FAU)
  // ==========================================
  'N8419': { developer: 'TAI WIND SPAIN', development: 'BALCON DE PONCHO VILLAS', deliveryDate: '01-06-2024', zone: 'FAU' },

  // ==========================================
  // AMAL - SERENA BREEZE (Los Alcazares, Serena Golf)
  // ==========================================
  'N8385': { developer: 'AMAL', development: 'SERENA BREEZE', deliveryDate: '01-10-2025', zone: 'Serena Golf' },

  // ==========================================
  // CORESA - BELLA SALINA APARTMENTS F2 (Pilar de la Horadada, pueblo)
  // ==========================================
  'N8421': { developer: 'CORESA', development: 'BELLA SALINA APARTMENTS F2', deliveryDate: '01-01-2026', zone: 'pueblo' },

  // ==========================================
  // HABITABLE SPANISH HOUSE - RESIDENCIAL AZAHAR II (Ciudad Quesada, Lo Marabu Golf)
  // ==========================================
  'N8438': { developer: 'HABITABLE SPANISH HOUSE', development: 'RESIDENCIAL AZAHAR II', deliveryDate: '01-03-2028', zone: 'Lo Marabu Golf' },

  // ==========================================
  // RIVESTURISMO - THE REFERENCE (Torrevieja, Centro)
  // ==========================================
  'N8450': { developer: 'RIVESTURISMO', development: 'THE REFERENCE', deliveryDate: '01-07-2028', zone: 'Centro' },
  'N8451': { developer: 'RIVESTURISMO', development: 'THE REFERENCE', deliveryDate: '01-07-2028', zone: 'Centro' },
  'N8452': { developer: 'RIVESTURISMO', development: 'THE REFERENCE', deliveryDate: '01-07-2028', zone: 'Centro' },
  'N8453': { developer: 'RIVESTURISMO', development: 'THE REFERENCE', deliveryDate: '01-07-2028', zone: 'Centro' },

  // ==========================================
  // VIP INVEST - ALMA DE LAS SALINAS (San Pedro del Pinatar, Lo Pagan)
  // ==========================================
  'N8447': { developer: 'VIP INVEST', development: 'ALMA DE LAS SALINAS', deliveryDate: '01-03-2025', zone: 'Lo Pagan' },

  // ==========================================
  // NOTE: N8432-N8435 removed from EDIFICIO SONATA - these refs were showing
  // wrong photos (La Mata properties). Need to verify correct development assignment.
  // ==========================================

  // ==========================================
  // FEROLEVANTE A Y M - ANDREU VILLAS (Dolores, urbanizacion)
  // ==========================================
  'N8457': { developer: 'FEROLEVANTE A Y M', development: 'ANDREU VILLAS', deliveryDate: '01-10-2025', zone: 'urbanizacion' },
  'N8456': { developer: 'FEROLEVANTE A Y M', development: 'ANDREU VILLAS', deliveryDate: '01-10-2025', zone: 'urbanizacion' },
  'N8458': { developer: 'FEROLEVANTE A Y M', development: 'MY DREAM II', deliveryDate: '01-10-2026', zone: 'urbanizacion' },

  // ==========================================
  // LEVANTE HOMES - VILA NATURA (la Nucia, Esquironovia)
  // ==========================================
  'N8455': { developer: 'LEVANTE HOMES', development: 'VILA NATURA', deliveryDate: '01-12-2028', zone: 'Esquironovia' },

  // ==========================================
  // KRASOI - EDIFICIO COLO (Torrevieja, Playa de El Cura)
  // ==========================================
  'SP0958': { developer: 'KRASOI', development: 'EDIFICIO COLO', deliveryDate: '01-06-2026', zone: 'Playa de El Cura' },

  // ==========================================
  // MI CASA AS CONSTRUCIONES - MI CASA QUESADA (Rojales, Ciudad Quesada)
  // ==========================================
  'N8363': { developer: 'MI CASA AS CONSTRUCIONES', development: 'MI CASA QUESADA', deliveryDate: '01-10-2025', zone: 'Ciudad Quesada' },

  // ==========================================
  // INSUR GRUPO - LAS TERRAZAS DE MACIENAS (Mojacar, Playa Macenas)
  // ==========================================
  'SP0775': { developer: 'INSUR GRUPO', development: 'LAS TERRAZAS DE MACIENAS', deliveryDate: '01-04-2028', zone: 'Playa Macenas' },
  'SP0776': { developer: 'INSUR GRUPO', development: 'LAS TERRAZAS DE MACIENAS', deliveryDate: '01-04-2028', zone: 'Playa Macenas' },

  // ==========================================
  // NATUR VILLAS LEVANTE - VILLAS NATURE (San Juan de los Tereros)
  // ==========================================
  'N8346': { developer: 'NATUR VILLAS LEVANTE', development: 'VILLAS NATURE', deliveryDate: '01-09-2025', zone: 'San Juan de los Tereros' },
  'N8347': { developer: 'NATUR VILLAS LEVANTE', development: 'VILLAS NATURE', deliveryDate: '01-09-2025', zone: 'San Juan de los Tereros' },
  'N8343': { developer: 'NATUR VILLAS LEVANTE', development: 'VILLAS NATURE', deliveryDate: '01-09-2025', zone: 'San Juan de los Tereros' },
  'N8344': { developer: 'NATUR VILLAS LEVANTE', development: 'VILLAS NATURE', deliveryDate: '01-09-2025', zone: 'San Juan de los Tereros' },
  'N8345': { developer: 'NATUR VILLAS LEVANTE', development: 'VILLAS NATURE', deliveryDate: '01-09-2025', zone: 'San Juan de los Tereros' },

  // ==========================================
  // ALPHA INVEST - BLUE LAGOON VILLAS (Torre Pacheco)
  // ==========================================
  'N8337': { developer: 'ALPHA INVEST', development: 'BLUE LAGOON VILLAS', deliveryDate: '01-09-2026', zone: 'Torre Pacheco' },

  // ==========================================
  // EVOKE RESORTS - VILLAS ALTEA (Torre Pacheco, Santa Rosalia Lake And Life Resort)
  // ==========================================
  'N8338': { developer: 'EVOKE RESORTS', development: 'VILLAS ALTEA', deliveryDate: '01-12-2026', zone: 'Santa Rosalia Lake And Life Resort' },

  // ==========================================
  // BIOMAX WORLD - ISLA BARBADOS (Alfaz, Sierra Altea)
  // ==========================================
  'SP0548': { developer: 'BIOMAX WORLD', development: 'ISLA BARBADOS', deliveryDate: '01-09-2026', zone: 'Sierra Altea' },

  // ==========================================
  // FINLANDIA - AZULIA F4 (Pilar de la Horadada, Lo Romero Golf)
  // ==========================================
  'SP0767': { developer: 'FINLANDIA', development: 'AZULIA F4', deliveryDate: '01-12-2024', zone: 'Lo Romero Golf' },

  // ==========================================
  // ALIDRIA - PUIG CAMPANA VILLAS (Finestrat, Sea Hills)
  // ==========================================
  'N8323B': { developer: 'ALIDRIA', development: 'PUIG CAMPANA VILLAS', deliveryDate: '01-12-2027', zone: 'Sea Hills' },

  // ==========================================
  // GH COSTABLANCA - EMPORTALA CALPE (Calpe, Empedario)
  // ==========================================
  'SP0051': { developer: 'GH COSTABLANCA', development: 'EMPORTALA CALPE', deliveryDate: '01-12-2028', zone: 'Empedario' },

  // ==========================================
  // AGROBUBIANA LEVANTE - INFINITY BEACH VILLAS (Los Alcazares, Nuevo Ribera)
  // ==========================================
  'N6430': { developer: 'AGROBUBIANA LEVANTE', development: 'INFINITY BEACH VILLAS', deliveryDate: '01-09-2026', zone: 'Nuevo Ribera' },

  // ==========================================
  // INTERCOSTA VILLAS - INTERCOSTA SUNRISE (Torrevieja, Playa de El Cura)
  // ==========================================
  'N6498': { developer: 'INTERCOSTA VILLAS', development: 'INTERCOSTA SUNRISE', deliveryDate: '01-09-2026', zone: 'Playa de El Cura' },
  'N6500': { developer: 'INTERCOSTA VILLAS', development: 'INTERCOSTA SUNRISE', deliveryDate: '01-09-2026', zone: 'Playa de El Cura' },

  // ==========================================
  // ZONA PARADISE - DOÑA PATRIA IX (Benijofar, Pueblo)
  // ==========================================
  'N6598': { developer: 'ZONA PARADISE', development: 'DOÑA PATRIA IX', deliveryDate: '01-03-2025', zone: 'Pueblo' },

  // ==========================================
  // DK TILL SPANIEN - VILLA TEGI (Torrevieja, El Chaparral)
  // ==========================================
  'N8495': { developer: 'DK TILL SPANIEN', development: 'VILLA TEGI', deliveryDate: '01-11-2026', zone: 'El Chaparral' },

  // ==========================================
  // CONTRIMAR - OASIS GOLF LA FINCA (Algorfa, La Finca Golf)
  // ==========================================
  'N8490': { developer: 'CONTRIMAR', development: 'OASIS GOLF LA FINCA', deliveryDate: '01-12-2025', zone: 'La Finca Golf' },
  'N8492': { developer: 'CONTRIMAR', development: 'OASIS GOLF LA FINCA', deliveryDate: '01-07-2026', zone: 'La Finca Golf' },

  // ==========================================
  // ABUEV - VILLAS DEL MAR_MAR MENOR (Cartagena, Playa Honda)
  // ==========================================
  'N5805': { developer: 'ABUEV', development: 'VILLAS DEL MAR_MAR MENOR', deliveryDate: '01-07-2026', zone: 'Playa Honda' },

  // ==========================================
  // EDIFIVIVES - SEA VIEW 6 (Finestrat, Sierra Cortina)
  // ==========================================
  'N8493C': { developer: 'EDIFIVIVES', development: 'SEA VIEW 6', deliveryDate: '01-04-2027', zone: 'Sierra Cortina' },

  // ==========================================
  // FATIMA - GIANE VILLAS (Algorfa, La Finca Golf)
  // ==========================================
  'N8485': { developer: 'FATIMA', development: 'GIANE VILLAS', deliveryDate: '01-11-2025', zone: 'La Finca Golf' },

  // ==========================================
  // GRUPO VERMELL - MYKONOS APARTMENTS (Dolores, Sector 3)
  // ==========================================
  'N8486': { developer: 'GRUPO VERMELL', development: 'MYKONOS APARTMENTS', deliveryDate: '01-09-2026', zone: 'Sector 3' },
  'N8487': { developer: 'GRUPO VERMELL', development: 'MYKONOS APARTMENTS', deliveryDate: '01-09-2026', zone: 'Sector 3' },

  // ==========================================
  // SONEIRA HOMES - COSTABELLA RESIDENCES (Finestrat, Sierra Cortina)
  // ==========================================
  'N8476': { developer: 'SONEIRA HOMES', development: 'COSTABELLA RESIDENCES', deliveryDate: '01-10-2025', zone: 'Sierra Cortina' },

  // ==========================================
  // VARUDI - LA ISLA III (Torrevieja, Alba del Sol)
  // ==========================================
  'N8498': { developer: 'VARUDI', development: 'LA ISLA III', deliveryDate: '01-12-2026', zone: 'Alba del Sol' },
  'N8463': { developer: 'VARUDI', development: 'LA ISLA III', deliveryDate: '01-12-2025', zone: 'Alba del Sol' },

  // ==========================================
  // GH COSTABLANCA - Arola La Marina 3D V+H400B5 (Benisa, Playa de Los Fusteros)
  // ==========================================
  'SP0456': { developer: 'GH COSTABLANCA', development: 'Arola La Marina 3D V+H400B5', deliveryDate: '01-09-2025', zone: 'Playa de Los Fusteros' },
};

/**
 * Get development info for a property reference
 */
export function getPropertyDevelopmentInfo(reference: string): PropertyDevelopmentInfo | null {
  // Try exact match first
  if (propertyMapping[reference]) {
    return propertyMapping[reference];
  }

  // Try uppercase
  const upperRef = reference.toUpperCase();
  if (propertyMapping[upperRef]) {
    return propertyMapping[upperRef];
  }

  return null;
}

/**
 * Get all unique developments from the mapping
 */
export function getAllMappedDevelopments(): { name: string; developer: string; count: number }[] {
  const devMap = new Map<string, { developer: string; count: number }>();

  for (const info of Object.values(propertyMapping)) {
    const key = info.development;
    if (!devMap.has(key)) {
      devMap.set(key, { developer: info.developer, count: 0 });
    }
    devMap.get(key)!.count++;
  }

  return Array.from(devMap.entries()).map(([name, data]) => ({
    name,
    developer: data.developer,
    count: data.count,
  })).sort((a, b) => b.count - a.count);
}

/**
 * Get all unique developers from the mapping
 */
export function getAllMappedDevelopers(): { name: string; developmentCount: number; propertyCount: number }[] {
  const devMap = new Map<string, { developments: Set<string>; propertyCount: number }>();

  for (const info of Object.values(propertyMapping)) {
    if (!devMap.has(info.developer)) {
      devMap.set(info.developer, { developments: new Set(), propertyCount: 0 });
    }
    devMap.get(info.developer)!.developments.add(info.development);
    devMap.get(info.developer)!.propertyCount++;
  }

  return Array.from(devMap.entries()).map(([name, data]) => ({
    name,
    developmentCount: data.developments.size,
    propertyCount: data.propertyCount,
  })).sort((a, b) => b.propertyCount - a.propertyCount);
}

// Stats
console.log(`Property mapping loaded: ${Object.keys(propertyMapping).length} properties mapped`);
