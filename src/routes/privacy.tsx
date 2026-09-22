import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({ meta: [{ title: "Privacy | My Plumbing Inc" }] }),
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Legal
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted">Effective September 2026</p>
      <div className="mt-8 space-y-6 text-muted">
        <p>
          My Plumbing Inc (“we”) uses this site to schedule visits for licensed
          construction in Los Angeles. This policy describes what we collect and
          why.
        </p>
        <h2 className="font-display text-2xl font-medium text-ink">What we collect</h2>
        <p>
          If you send a quote or contact form, we receive the name, phone, email,
          city, project type, and notes you type. Drafts may also be stored in your
          browser (local storage) so you can finish the form on this device.
        </p>
        <h2 className="font-display text-2xl font-medium text-ink">How we use it</h2>
        <p>
          Contact details are used to schedule a site visit, talk about scope, and
          follow up on work you asked about. We do not sell personal information. We
          do not use the form to run ads.
        </p>
        <h2 className="font-display text-2xl font-medium text-ink">Sharing</h2>
        <p>
          We may share information with the trades, inspectors, or a financing
          partner only as needed to perform the job you requested. CSLB and other
          agencies may require records of permitted work.
        </p>
        <h2 className="font-display text-2xl font-medium text-ink">California</h2>
        <p>
          We do not sell or share personal information as those terms are used in
          the CCPA/CPRA. To ask what we have on file, or to request deletion of a
          form submission, email {company.email} or call {company.phone}.
        </p>
        <h2 className="font-display text-2xl font-medium text-ink">Cookies</h2>
        <p>
          This site uses only what the host needs to serve the page. Quote drafts
          live in local storage on your device. You can clear them in the browser.
        </p>
        <h2 className="font-display text-2xl font-medium text-ink">Contact</h2>
        <p>
          {company.name} · {company.license} · {company.email} · {company.phone}
        </p>
        <p>
          <Link to="/contact" className="text-ink underline">
            Contact page
          </Link>
        </p>
      </div>
    </main>
  );
}
