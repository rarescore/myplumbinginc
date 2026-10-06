import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { company, services } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-ink text-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="inline-flex rounded-lg bg-bone p-2">
            <BrandLogo height={72} className="h-[4.5rem]" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/70">
            Trade-first general contractor. ADUs, remodels, and plumbing-connected
            construction from North Hills across Los Angeles.
          </p>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            Visit
          </h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/process" className="hover:text-copper">
              Process
            </Link>
            <Link to="/projects" className="hover:text-copper">
              Projects
            </Link>
            <Link to="/articles" className="hover:text-copper">
              Articles
            </Link>
            <Link to="/about" className="hover:text-copper">
              About
            </Link>
            <Link to="/quote" className="hover:text-copper">
              Book a visit
            </Link>
            <Link to="/contact" className="hover:text-copper">
              Contact
            </Link>
            <Link to="/reviews" className="hover:text-copper">
              Reviews
            </Link>
            <Link to="/service-areas" className="hover:text-copper">
              Areas
            </Link>
            <Link to="/financing" className="hover:text-copper">
              Financing
            </Link>
            <Link to="/privacy" className="hover:text-copper">
              Privacy
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            Work
          </h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {services.slice(0, 5).map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="hover:text-copper"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            Edgar G.
          </h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a
              href={company.phoneHref}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = company.phoneHref;
              }}
            >
              Call {company.phone}
            </a>
            <a href={company.smsHref}>Text the office</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a
              href={company.licenseUrl}
              target="_blank"
              rel="noreferrer"
              className="text-bone/70 hover:text-copper"
            >
              Verify {company.license}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-bone/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-bone/50">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>
            {company.classification} · {company.license}
          </span>
          <Link to="/privacy" className="hover:text-bone">
            Privacy
          </Link>
        </div>
      </div>
      <div className="border-t border-bone/15">
        <div className="mx-auto max-w-6xl px-5 pt-4 pb-[4.5rem] text-center text-xs text-bone/50 md:pb-4">
          Website by{" "}
          <a
            href="mailto:usscallisterllc@gmail.com?subject=My%20Plumbing%20Inc%20website"
            className="font-semibold text-bone/80 underline underline-offset-2 hover:text-copper"
          >
            USSCALLISTER LLC
          </a>
        </div>
      </div>
    </footer>
  );
}
