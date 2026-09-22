import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/quote-form";
import { company } from "@/lib/site";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () => ({ meta: [{ title: "Book a visit | My Plumbing Inc" }] }),
});

function QuotePage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-16 pb-24 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          Intake
        </p>
        <h1 className="mt-3 font-display text-5xl font-medium">
          Book a free site visit.
        </h1>
        <p className="mt-4 text-muted">
          Three short steps. Submit opens a text to{" "}
          <a className="text-ink underline" href={company.smsHref}>
            {company.phone}
          </a>
          . Edgar writes back with a visit window — not a same-hour bid.
        </p>
      </div>
      <QuoteForm />
    </main>
  );
}
