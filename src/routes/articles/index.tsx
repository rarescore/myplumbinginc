import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/lib/articles";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/articles/")({
  component: ArticlesIndex,
  head: () => ({
    meta: [
      { title: "Articles | My Plumbing Inc" },
      {
        name: "description",
        content:
          "Notes on ADUs, permits, kitchens, and Valley construction from a plumber-founded general contractor in North Hills.",
      },
    ],
    links: [canonicalLink("/articles")],
  }),
});

function ArticlesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Articles
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-medium">
        Notes from the wall, not the brochure.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        High-level pieces on ADUs, permits, and remodels in Los Angeles — written
        the way we talk on a site visit.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to="/articles/$slug"
            params={{ slug: a.slug }}
            className="group overflow-hidden rounded-xl border border-line bg-cream"
          >
            <img
              src={a.image}
              alt={a.alt}
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="p-5 md:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">
                {a.category} · {a.read}
              </p>
              <h2 className="mt-2 font-display text-2xl font-medium text-ink group-hover:text-copper">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{a.dek}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
