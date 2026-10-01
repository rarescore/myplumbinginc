import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/lib/site";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "About | My Plumbing Inc" }],
    links: [canonicalLink("/about")],
  }),
});

function AboutPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-16 pb-24 md:grid-cols-[0.9fr_1.1fr] md:items-start">
      <div className="overflow-hidden rounded-xl border border-line bg-paper">
        <img
          src="/photos/edgar.webp"
          alt="Edgar G., project contact"
          className="w-full bg-paper object-contain object-top"
        />
        <div className="p-5">
          <h2 className="font-display text-2xl font-medium">{company.owner}</h2>
          <p className="text-sm text-muted">{company.ownerRole}</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          About
        </p>
        <h1 className="mt-3 font-display text-5xl font-medium">
          A construction company built on plumbing.
        </h1>
        <p className="mt-5 text-muted">
          The name is not a leftover. Years of C36 work taught us that most remodel
          failures start in the slope, the stack, and the unsealed penetration. The B
          license — {company.license} — is how we take responsibility for the rest of
          the house.
        </p>
        <p className="mt-4 text-muted">
          Edgar G. is the person you call. Scope is written. Changes are priced.
          Inspections are sequenced. The shop address stays private; the service area
          does not.
        </p>
        <div className="mt-8 rounded-lg border border-line bg-cream p-5 text-sm">
          <p className="font-semibold text-ink">{company.classification}</p>
          <a
            href={company.licenseUrl}
            className="mt-1 inline-block text-copper"
            target="_blank"
            rel="noreferrer"
          >
            Verify {company.license} on CSLB
          </a>
        </div>
        <Link
          to="/quote"
          className="mt-8 inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
        >
          Book a visit
        </Link>
      </div>
    </main>
  );
}
