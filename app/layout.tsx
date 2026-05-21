import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://myrarescore.com"),
  title: {
    default: "RareScore | IQ Test, Morality Test, and Rarity Test",
    template: "%s | RareScore",
  },
  description:
    "Take the free RareScore IQ Test, Morality Test, or Rarity Test. Get your score instantly and unlock an optional Official RareScore Certificate as a PDF and PNG.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RareScore",
    description: "Take a quick self-discovery test and reveal your score instantly.",
    url: "https://myrarescore.com",
    siteName: "RareScore",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "RareScore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RareScore",
    description: "Take a quick test and reveal your score instantly.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RareScore",
    url: "https://myrarescore.com",
    email: "hello.myrarescore@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello.myrarescore@gmail.com",
      contactType: "customer support",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RareScore",
    url: "https://myrarescore.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://myrarescore.com/tests",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
