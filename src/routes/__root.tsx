import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/lib/auth/provider";
import {
  GoogleAnalyticsClickEvents,
  GoogleAnalyticsTag,
} from "@/components/google-analytics";
import { NotFound } from "@/components/not-found";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCall } from "@/components/sticky-call";
import { company } from "@/lib/site";
import appCss from "../styles.css?url";

const APP_NAME = company.name;

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Licensed Los Angeles general contractor. ADUs, remodels, and plumbing-connected construction. CSLB #1120118. North Hills and the San Fernando Valley.",
      },
      { name: "theme-color", content: "#0E1210" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap",
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <GoogleAnalyticsTag />
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-bone font-sans text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHeader />
          <Outlet />
          <SiteFooter />
          <StickyCall />
        </AuthProvider>
        <Analytics />
        <GoogleAnalyticsClickEvents />
        <Scripts />
      </body>
    </html>
  );
}
