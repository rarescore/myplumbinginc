import { createFileRoute, Link } from "@tanstack/react-router";
import { company, reviews } from "@/lib/site";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [{ title: "Reviews | My Plumbing Inc" }],
    links: [canonicalLink("/reviews")],
  }),
});

function Stars({ n }: { n: number }) {
  return (
    <span className="text-copper" aria-label={`${n} out of 5`}>
      {"★".repeat(n)}
      <span className="text-line">{"★".repeat(5 - n)}</span>
    </span>
  );
}

function ReviewsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Proof
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-medium">
        Neighbors, not a wall of unnamed stars.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Recent notes from Valley jobs — service calls and permitted remodels.
        Verify the license, then ask for a comparable walk-through.
      </p>
      <p className="mt-3 text-sm">
        <a
          className="underline"
          href={company.licenseUrl}
          target="_blank"
          rel="noreferrer"
        >
          {company.license} on CSLB
        </a>
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <article key={r.name + r.date} className="rounded-xl border border-line bg-cream p-6">
            <Stars n={r.stars} />
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink">“{r.quote}”</p>
            <p className="mt-5 text-sm font-medium text-ink">
              {r.name} · {r.place}
            </p>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">
              {r.job} · {r.date}
            </p>
          </article>
        ))}
      </div>
      <Link
        to="/quote"
        className="mt-12 inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
      >
        Request a visit
      </Link>
    </main>
  );
}
