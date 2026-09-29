import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CallLink } from "@/components/call-link";
import { HomeCinematic } from "@/components/home-cinematic";
import { MansionBuildHero } from "@/components/mansion-build-hero";
import { articles } from "@/lib/articles";
import { BUILD_POSTER_PRELOAD_DESK, BUILD_POSTER_PRELOAD_PHONE } from "@/lib/premium-media";
import { company, processSteps, projects, reviews, services } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "My Plumbing Inc | Los Angeles General Contractor | CSLB #1120118",
      },
    ],
    links: [
      { rel: "preload", as: "image", href: BUILD_POSTER_PRELOAD_PHONE, media: "(max-width: 767px)" },
      { rel: "preload", as: "image", href: BUILD_POSTER_PRELOAD_DESK, media: "(min-width: 768px)" },
    ],
  }),
});
