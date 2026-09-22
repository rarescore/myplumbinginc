import { Link } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { company } from "@/lib/site";

const FALLBACK_MESSAGE = "Something on this page failed. Try again, or call the office.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-20 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Error
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium">
        The page didn’t finish.
      </h1>
      <p className="mt-4 max-w-lg text-muted">{errorMessage(error)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
        >
          Reload
        </button>
        <a
          href={company.phoneHref}
          className="inline-flex min-h-12 items-center rounded-md border border-line px-5 font-semibold"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = company.phoneHref;
          }}
        >
          Call {company.phone}
        </a>
        <Link to="/" className="inline-flex min-h-12 items-center px-2 font-medium">
          Home
        </Link>
      </div>
    </main>
  );
}
