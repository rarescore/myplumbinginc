/** Canonical production origin (bare domain 308-redirects here on Vercel). */
export const SITE_ORIGIN = "https://www.myplumbinginc.com";

/** Self-referencing canonical `<link>` for a route `head()`. */
export function canonicalLink(path: string) {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "");
  return { rel: "canonical", href: `${SITE_ORIGIN}${clean}` };
}
