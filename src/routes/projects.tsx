import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/site";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [{ title: "Projects | My Plumbing Inc" }],
    links: [canonicalLink("/projects")],
  }),
});

function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Projects
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-medium">
        Neighborhood, scope, and the wall we opened.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Flagship work across the Valley. Photography here is representative of the
        finish and construction language we specify — real job photos replace these
        as each project is released.
      </p>
      <div className="mt-12 grid gap-10">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="grid overflow-hidden rounded-xl border border-line bg-cream md:grid-cols-2"
          >
            <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover" />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">
                {p.place} · {p.year}
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium">{p.title}</h2>
              <p className="mt-2 text-sm font-medium text-ink">{p.scope}</p>
              <p className="mt-4 text-muted">{p.note}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
