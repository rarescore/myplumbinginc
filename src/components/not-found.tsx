import { Link } from "@tanstack/react-router";
import { company } from "@/lib/site";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-20 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        404
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium">
        That page isn’t on this job.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The link is missing or the work moved. Start from the home page, or call{" "}
        {company.owner} at {company.phone}.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
        >
          Back home
        </Link>
        <Link
          to="/contact"
          className="inline-flex min-h-12 items-center rounded-md border border-line px-5 font-semibold"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}
