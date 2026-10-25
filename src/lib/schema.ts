import { areas, company, services } from "@/lib/site";

const SITE = "https://www.myplumbinginc.com";

// Sitewide GeneralContractor JSON-LD. Only facts already shown on the site.
// Street address is intentionally omitted ("Shop address stays private").
// License number omitted until the owner confirms CSLB status.
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE}/#business`,
  name: company.name,
  url: `${SITE}/`,
  image: `${SITE}/photos/adu-dusk.webp`,
  telephone: "+1-818-813-3277",
  email: company.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: company.city,
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: areas.map((a) => ({ "@type": "City", name: `${a.name}, CA` })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        url: `${SITE}/services/${s.slug}`,
      },
    })),
  },
} as const;
