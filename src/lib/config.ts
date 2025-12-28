export const siteConfig = {
  name: "New Build Homes Costa Blanca",
  domain: "newbuildhomescostablanca.com",
  tagline: "Your Key to New Build Living in Spain",
  description: "Specialist agency for new build properties across Costa Blanca. Off-plan apartments, villas, and key-ready homes from trusted developers.",
  
  contact: {
    phone: "+34 634 044 970",
    phoneClean: "+34634044970",
    phoneDisplay: "+34 634 044 970",
    whatsapp: "https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0",
    email: "info@newbuildhomescostablanca.com",
  },
  
  partners: {
    habeno: "https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e",
  },
  
  xmlFeeds: [
    {
      name: "REDSP",
      url: "https://xml.redsp.net/file/450/23a140q0551/general-zone-1.xml",
      format: "redsp" as const,
      enabled: true,
    },
    {
      name: "Miralbo",
      url: "http://feeds.transporter.janeladigital.com/423E0F5F-30FC-4E01-8FE1-99BD7E14B021/0500015622.xml",
      format: "kyero" as const,
      enabled: true,
    },
  ],
  revalidateSeconds: 3600,
  
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  
  seo: {
    titleTemplate: "%s | New Build Homes Costa Blanca",
    defaultTitle: "New Build Homes Costa Blanca | Key-Ready & Off-Plan Properties",
    defaultDescription: "Find your dream new build property in Costa Blanca, Spain. Browse key-ready apartments, off-plan villas, and investment properties from €150,000. Expert guidance for international buyers.",
    keywords: [
      "new build costa blanca",
      "new build spain",
      "off plan apartments costa blanca",
      "key ready properties spain",
      "costa blanca property",
      "buy property spain",
    ],
  },
  
  navigation: {
    main: [
      { name: "Developments", href: "/developments" },
      { name: "Builders", href: "/builders" },
      { name: "Areas", href: "/areas" },
      { name: "Golf Properties", href: "/golf-properties" },
      { name: "Finance", href: "/finance" },
      { name: "Buying Guide", href: "/buying-guide" },
    ],
    footer: {
      developments: [
        { name: "Key-Ready Homes", href: "/developments?status=key-ready" },
        { name: "Under Construction", href: "/developments?status=construction" },
        { name: "Off-Plan", href: "/developments?status=off-plan" },
        { name: "Golf Properties", href: "/golf-properties" },
      ],
      areas: [
        { name: "Torrevieja", href: "/areas/torrevieja" },
        { name: "Orihuela Costa", href: "/areas/orihuela-costa" },
        { name: "Guardamar", href: "/areas/guardamar" },
        { name: "Algorfa", href: "/areas/algorfa" },
        { name: "Finestrat", href: "/areas/finestrat" },
      ],
      resources: [
        { name: "Buying Guide", href: "/buying-guide" },
        { name: "Finance & Mortgages", href: "/finance" },
        { name: "NIE Guide", href: "/guides/nie-number" },
        { name: "Taxes & Costs", href: "/guides/buying-costs" },
      ],
    },
  },
  
  featuredBuilders: ["contrimar", "aedas-homes", "taylor-wimpey"],
  
  golfResorts: [
    { name: "La Finca Golf", location: "Algorfa", slug: "la-finca-golf" },
    { name: "Vistabella Golf", location: "Orihuela Costa", slug: "vistabella-golf" },
    { name: "Villamartin Golf", location: "Orihuela Costa", slug: "villamartin-golf" },
    { name: "Las Colinas Golf", location: "Campoamor", slug: "las-colinas-golf" },
    { name: "La Marquesa Golf", location: "Ciudad Quesada", slug: "la-marquesa-golf" },
    { name: "Lo Romero Golf", location: "Pilar de la Horadada", slug: "lo-romero-golf" },
    { name: "Alenda Golf", location: "Monforte del Cid", slug: "alenda-golf" },
    { name: "Font del Llop", location: "Alicante", slug: "font-del-llop" },
  ],
  
  statusLabels: {
    "key-ready": { label: "Key Ready", class: "badge-key-ready", priority: 1 },
    "completion-3-months": { label: "Completion Soon", class: "badge-key-ready", priority: 2 },
    "under-construction": { label: "Under Construction", class: "badge-construction", priority: 3 },
    "off-plan": { label: "Off Plan", class: "badge-offplan", priority: 4 },
  },
} as const;

export type SiteConfig = typeof siteConfig;
