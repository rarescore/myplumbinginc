import phonePoster from "@/assets/build/phone-poster.jpg";
import deskPoster from "@/assets/build/desk-poster.jpg";

export type MediaTier = "mobile" | "desktop";

export function mediaTier(width = typeof window === "undefined" ? 1440 : window.innerWidth): MediaTier {
  return width < 768 ? "mobile" : "desktop";
}

export const BUILD_POSTERS = {
  mobile: phonePoster,
  desktop: deskPoster,
} as const;

export const BUILD_SHEETS = {
  mobile: () => import("@/assets/build/phone-sheet.jpg"),
  desktop: () => import("@/assets/build/desk-sheet.jpg"),
} as const;

export const BUILD_POSTER_PRELOAD_DESK = deskPoster;
export const BUILD_POSTER_PRELOAD_PHONE = phonePoster;
