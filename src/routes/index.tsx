import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CallLink } from "@/components/call-link";
import { HomeCinematic } from "@/components/home-cinematic";
import { MansionBuildHero } from "@/components/mansion-build-hero";
import { articles } from "@/lib/articles";
import { company, processSteps, projects, reviews, services } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "My Plumbing Inc | Los Angeles General Contractor | CSLB #1120118",
      },
    ],
  }),
});

function Home() {
  return (
    <HomeCinematic>
      <main className="pb-20 md:pb-0">
        <MansionBuildHero />

        <section className="border-y border-line bg-paper" data-reveal>
          <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
            {[
              [company.classification, "Licensed construction"],
              [company.license, "Verify on CSLB"],
              [`${company.years} years`, "Trade-level walls"],
              [company.city, company.region],
            ].map(([a, b]) => (
              <div
                key={a}
                className="border-line px-5 py-6 odd:border-r md:border-r md:last:border-r-0"
              >
                <p className="font-display text-lg font-medium text-ink">{a}</p>
                <p className="mt-1 text-sm text-muted">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
          <img
            data-reveal
            src="/photos/open-wall.jpg"
            alt="Open wall with copper plumbing during a remodel"
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
              Why the name
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
              Plumbing is the origin story, not the product.
            </h2>
            <p className="mt-5 text-muted">
              Construction problems begin behind the walls. Edgar G. still prices and
              sequences jobs as a tradesman who has seen what a missed slope costs in
              year three. The B license lets us finish the house. The C36 years keep
              us from finishing it wrong.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center font-semibold text-ink"
            >
              Meet Edgar
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </section>

        <section className="bg-paper py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div data-reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                  Flagship work
                </p>
                <h2 className="mt-3 font-display text-4xl font-medium">
                  Neighborhood, scope, year.
                </h2>
              </div>
              <Link to="/projects" className="hidden font-semibold text-ink md:inline">
                All projects
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3" data-reveal-stagger>
              {projects.slice(0, 3).map((p) => (
                <article key={p.slug} className="overflow-hidden rounded-xl bg-bone">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">
                      {p.place} · {p.year}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-medium">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-4" data-reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                Articles
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium">
                What people actually search before they call.
              </h2>
            </div>
            <Link to="/articles" className="hidden font-semibold text-ink md:inline">
              All articles
              <ArrowRight className="ml-2 inline size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3" data-reveal-stagger>
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="overflow-hidden rounded-xl border border-line bg-cream"
              >
                <img src={a.image} alt={a.alt} className="aspect-[16/9] w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">
                    {a.category} · {a.read}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
              Services
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium">
              Complete construction, sequenced from the wet walls out.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {services.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative min-h-52 overflow-hidden rounded-lg"
              >
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-copper">
                    {s.kicker}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-medium text-bone">
                    {s.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-cream py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                Process
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium">
                Consult, measure, permit, build, punch.
              </h2>
            </div>
            <ol className="mt-10 grid gap-6 md:grid-cols-5" data-reveal-stagger>
              {processSteps.map((s) => (
                <li key={s.n}>
                  <p className="font-display text-2xl text-copper">{s.n}</p>
                  <h3 className="mt-2 font-display text-xl font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.copy}</p>
                </li>
              ))}
            </ol>
            <Link
              to="/process"
              className="mt-10 inline-flex font-semibold text-ink"
              data-reveal
            >
              Full process
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </section>

        <section className="border-y border-line bg-paper py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                Reviews
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium">
                From the Valley, with a name attached.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3" data-reveal-stagger>
              {reviews.slice(0, 6).map((r) => (
                <article
                  key={r.name + r.date}
                  className="rounded-xl border border-line bg-bone p-6"
                >
                  <p className="text-copper" aria-label={`${r.stars} of 5`}>
                    {"★".repeat(r.stars)}
                    <span className="text-line">{"★".repeat(5 - r.stars)}</span>
                  </p>
                  <p className="mt-4 text-ink">“{r.quote}”</p>
                  <p className="mt-5 text-sm font-medium">
                    {r.name} · {r.place}
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">
                    {r.job} · {r.date}
                  </p>
                </article>
              ))}
            </div>
            <Link
              to="/reviews"
              className="mt-10 inline-flex font-semibold text-ink"
              data-reveal
            >
              All reviews
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </section>

        <section
          className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center"
          data-reveal
        >
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            <img
              src="/photos/edgar.webp"
              alt="Edgar G., project contact"
              className="mx-auto max-h-[420px] w-auto object-contain object-top"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
              Project contact
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium">Edgar G.</h2>
            <p className="mt-4 text-muted">
              The person you call. Scope is written, visits are scheduled, and the
              job is walked before punch. Based near {company.city}.
            </p>
            <p className="mt-3 font-medium text-ink">
              <CallLink>{company.phone}</CallLink>
            </p>
            <Link
              to="/quote"
              className="mt-6 inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
            >
              Book a visit with Edgar
            </Link>
          </div>
        </section>
      </main>
    </HomeCinematic>
  );
}
