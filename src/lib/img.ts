/**
 * Responsive variants for /photos images (generated WebP, see public/photos/*-640.webp
 * and *-1200.webp). Lets the browser pick a file close to the displayed size instead of
 * downloading the full-resolution photo for a small card.
 */
const WITH_1200 = new Set([
  "addition-wing", "adu-dusk", "bath-spa", "garage-studio", "kitchen-luxury", "open-wall",
  "articles/addition-frame", "articles/adu-dusk-valley", "articles/bath-open", "articles/garage-glass",
  "articles/kitchen-island", "articles/license-table", "articles/valley-ranch", "articles/wet-wall",
]);
const ONLY_640 = new Set(["remodel", "management", "addition", "adu", "bathroom", "garage", "kitchen", "plumbing"]);

export function photoSrcSet(src: string): string | undefined {
  const m = /^\/photos\/(.+)\.webp$/.exec(src);
  if (!m) return undefined;
  const base = m[1];
  if (WITH_1200.has(base)) return `/photos/${base}-640.webp 640w, /photos/${base}-1200.webp 1200w`;
  if (ONLY_640.has(base)) return `/photos/${base}-640.webp 640w, /photos/${base}.webp 1200w`;
  return undefined;
}

/** Props for a below-the-fold photo: responsive srcset + native lazy loading. */
export function lazyPhoto(src: string, sizes: string) {
  return { src, srcSet: photoSrcSet(src), sizes, loading: "lazy" as const, decoding: "async" as const };
}
