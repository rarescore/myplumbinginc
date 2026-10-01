import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CallLink } from "@/components/call-link";
import { articles } from "@/lib/articles";
import { company, services } from "@/lib/site";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  component: ServicePage,
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.service.title ?? "Service"} | My Plumbing Inc` }],
    links: loaderData ? [canonicalLink(`/services/${loaderData.service.slug}`)] : [],
  }),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = articles.filter((a) => a.related === service.slug);
  return (
    <main className="pb-24">
      <section className="relative min-h-[48vh] overflow-hidden bg-ink">
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-5 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            {service.kicker}
          </p>
          <h1 className="mt-3 font-display text-5xl font-medium text-bone">
            {service.title}
          </h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg text-muted">{service.body}</p>
          <p className="mt-6 text-fg">
            <span className="font-semibold text-ink">Who it is for. </span>
            {service.forWho}
          </p>
          {service.faqs.length ? (
            <div className="mt-10 space-y-6">
              {service.faqs.map((f) => (
                <div key={f.q} className="border-t border-line pt-6">
                  <h2 className="font-display text-2xl font-medium">{f.q}</h2>
                  <p className="mt-2 text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <aside className="h-fit rounded-xl bg-ink p-6 text-bone">
          <p className="font-display text-2xl">Talk through this job</p>
          <p className="mt-2 text-sm text-bone/70">
            {company.license}. Site visit in {company.region}.
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
        </aside>
      </section>
      {related.length ? (
        <section className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-2xl font-medium">Articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((a) => (
              <Link
                key={a.slug}
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="overflow-hidden rounded-xl border border-line bg-cream"
              >
                <img src={a.image} alt={a.alt} className="aspect-[16/9] w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-copper">{a.category}</p>
                  <h3 className="mt-1 font-display text-xl font-medium">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
