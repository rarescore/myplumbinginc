import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CallLink } from "@/components/call-link";
import { articles, getArticle } from "@/lib/articles";
import { company } from "@/lib/site";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticlePage,
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article | My Plumbing Inc" }] };
    return {
      meta: [
        { title: `${a.title} | My Plumbing Inc` },
        { name: "description", content: a.dek },
      ],
      links: [canonicalLink(`/articles/${a.slug}`)],
    };
  },
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="pb-24">
      <header className="bg-ink text-bone">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            {article.category} · {article.date} · {article.read}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-bone/75">{article.dek}</p>
        </div>
        <img
          src={article.image}
          alt={article.alt}
          className="mx-auto max-h-[520px] w-full max-w-6xl object-cover md:rounded-t-xl"
        />
      </header>

      <article className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[1.2fr_0.7fr]">
        <div className="max-w-2xl">
          {article.sections.map((s, i) => (
            <section key={s.heading ?? i} className={i === 0 ? "" : "mt-10"}>
              {s.heading ? (
                <h2 className="font-display text-2xl font-medium text-ink">{s.heading}</h2>
              ) : null}
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className={`text-muted ${s.heading ? "mt-3" : "mt-4 first:mt-0"}`}>
                  {p}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-12 text-sm text-muted">
            Written for homeowners in {company.region}. {company.license}.
          </p>
        </div>
        <aside className="h-fit rounded-xl bg-ink p-6 text-bone">
          <p className="font-display text-2xl">Walk this with Edgar</p>
          <p className="mt-2 text-sm text-bone/70">
            Site visit in the Valley. Scope in writing. No same-hour bid.
          </p>
          <Link
            to="/quote"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-cta font-semibold text-cta-fg"
          >
            Book a visit
          </Link>
          <CallLink className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-bone/20 font-medium">
            Call {company.phone}
          </CallLink>
          <Link
            to="/services/$slug"
            params={{ slug: article.related }}
            className="mt-4 block text-center text-sm text-copper"
          >
            Related service
          </Link>
        </aside>
      </article>

      <section className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-2xl font-medium">Keep reading</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {more.map((a) => (
            <Link
              key={a.slug}
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="overflow-hidden rounded-xl border border-line bg-cream"
            >
              <img src={a.image} alt="" className="aspect-[16/9] w-full object-cover" />
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-copper">{a.category}</p>
                <h3 className="mt-1 font-display text-lg font-medium">{a.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
