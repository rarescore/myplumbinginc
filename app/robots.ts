import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tests", "/are-you-rare", "/iq-test", "/morality-test", "/faq", "/contact", "/privacy", "/terms"],
        disallow: ["/quiz/", "/results", "/certificate", "/success"],
      },
    ],
    sitemap: "https://myrarescore.com/sitemap.xml",
  };
}
