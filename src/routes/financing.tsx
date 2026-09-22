import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/lib/site";

export const Route = createFileRoute("/financing")({
  component: FinancingPage,
  head: () => ({ meta: [{ title: "Financing | My Plumbing Inc" }] }),
});

function FinancingPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-16 pb-24 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          Financing
        </p>
        <h1 className="mt-3 font-display text-5xl font-medium">
          Ask us about funding a permitted project.
        </h1>
        <p className="mt-4 text-muted">
          ADUs and whole-room remodels are capital jobs. For qualified customers we
          can point to third-party financing. Approval, rates, and terms belong to
          the lender — not to My Plumbing Inc.
        </p>
        <ul className="mt-8 space-y-4 text-muted">
          <li className="border-t border-line pt-4">
            Write a clear scope first. Lenders price a job, not a mood board.
          </li>
          <li className="border-t border-line pt-4">
            Cash jobs are welcome. There is no pressure to finance.
          </li>
          <li className="border-t border-line pt-4">
            Questions go to {company.owner} at{" "}
            <a
              className="text-ink underline"
              href={company.phoneHref}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = company.phoneHref;
              }}
            >
              {company.phone}
            </a>
            .
          </li>
        </ul>
        <p className="mt-8 text-sm text-muted">
          Prefer a full visit packet?{" "}
          <Link to="/quote" className="underline">
            Book a site visit
          </Link>
          .
        </p>
      </div>
      <ContactForm intent="financing" />
    </main>
  );
}
