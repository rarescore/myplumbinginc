import { createFileRoute, Link } from "@tanstack/react-router";
import { ValleyMap } from "@/components/valley-map";
import { company } from "@/lib/site";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/service-areas")({
  component: AreasPage,
  head: () => ({
    meta: [
      { title: "Service Areas Across the San Fernando Valley & Los Angeles | My Plumbing Inc" },
      { name: "description", content: "Based in North Hills and building across the San Fernando Valley and Greater Los Angeles — Northridge, Sherman Oaks, Encino, Studio City, Burbank, Glendale, and nearby L.A. cities." },
    ],
    links: [canonicalLink("/service-areas")],
  }),
});

function AreasPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Territory
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-medium">
        Based in North Hills. Built across the Valley.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Primary work is the San Fernando Valley. The right permitted jobs go
        citywide. {company.area}.
      </p>
      <div className="mt-10">
        <ValleyMap />
      </div>
      <Link
        to="/quote"
        className="mt-10 inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
      >
        Book a visit in your city
      </Link>
    </main>
  );
}
