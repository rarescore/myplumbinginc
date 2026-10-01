import { useEffect } from "react";

/** GA4 web stream for www.myplumbinginc.com (property 557085451). */
export const GA_MEASUREMENT_ID = "G-N5BJRCMTSR";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * gtag.js bootstrap, rendered once in the root document <head> (SSR).
 *
 * Page views: `config` sends the landing page_view, and the stream's Enhanced
 * Measurement "page changes based on browser history events" sends a
 * page_view for every client-side (TanStack Router) navigation. Do NOT add a
 * manual page_view on route change — it would double count. If that Enhanced
 * Measurement toggle is ever turned off in GA4, SPA navigations stop counting.
 */
export function GoogleAnalyticsTag() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
        }}
      />
    </>
  );
}

function linkSection(a: Element): string {
  if (a.closest("header")) return "header";
  if (a.closest("footer")) return "footer";
  for (
    let el: Element | null = a;
    el && el !== document.body;
    el = el.parentElement
  ) {
    if (getComputedStyle(el).position === "fixed") return "sticky_bar";
  }
  if (a.closest("main")) return "main";
  return "other";
}

function linkText(a: Element): string {
  const text = (a.textContent ?? "").replace(/\s+/g, " ").trim();
  return (text || a.getAttribute("aria-label") || "").slice(0, 100);
}

/**
 * One delegated (capture-phase) click listener for every tel: / mailto: link.
 * It only reports to GA4 — never calls preventDefault/stopPropagation — so the
 * links' own behavior (dialer, mail client) is unchanged.
 */
export function GoogleAnalyticsClickEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const a = target.closest('a[href^="tel:" i], a[href^="mailto:" i]');
      if (!a || typeof window.gtag !== "function") return;
      const href = a.getAttribute("href") ?? "";
      const common = {
        page_location: window.location.href,
        link_section: linkSection(a),
      };
      if (/^tel:/i.test(href)) {
        window.gtag("event", "click_to_call", {
          ...common,
          link_url: href,
          phone_number: decodeURIComponent(href.slice(4)),
          link_text: linkText(a),
        });
      } else {
        // The address itself is left out: GA4 forbids email addresses in event data.
        window.gtag("event", "click_email", {
          ...common,
          link_domain: href.slice(7).split("?")[0]?.split("@")[1] ?? "",
        });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
