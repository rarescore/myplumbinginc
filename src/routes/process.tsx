import { createFileRoute, Link } from "@tanstack/react-router";
import { processSteps } from "@/lib/site";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({ meta: [{ title: "Process | My Plumbing Inc" }] }),
});

function ProcessPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Process
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium">
        How a job actually moves.
      </h1>
      <p className="mt-4 text-muted">
        No disappearing superintendent. One contact, a written scope, and walls that
        open once.
      </p>
      <ol className="mt-12 space-y-10">
        {processSteps.map((s) => (
          <li key={s.n} className="border-t border-line pt-8">
            <p className="font-display text-copper">{s.n}</p>
            <h2 className="mt-2 font-display text-3xl font-medium">{s.title}</h2>
            <p className="mt-3 text-muted">{s.copy}</p>
          </li>
        ))}
      </ol>
      <Link
        to="/quote"
        className="mt-12 inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
      >
        Start with a visit
      </Link>
    </main>
  );
}
