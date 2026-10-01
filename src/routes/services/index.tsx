import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/site";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [{ title: "Services | My Plumbing Inc" }],
    links: [canonicalLink("/services")],
  }),
});

function ServicesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Services
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-medium">
        Work that starts behind the walls.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Each service is a different permit path and a different wet-wall problem.
        Choose the job you actually have — not a package name.
      </p>
      <div className="mt-12 grid gap-8">
        {services.map((s) => (
          <Link
            key={s.slug}
            to="/services/$slug"
            params={{ slug: s.slug }}
            className="grid overflow-hidden rounded-xl border border-line bg-cream md:grid-cols-2"
          >
            <img src={s.image} alt="" className="aspect-[16/10] h-full w-full object-cover" />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">
                {s.kicker}
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium">{s.title}</h2>
              <p className="mt-3 text-muted">{s.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
