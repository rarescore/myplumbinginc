import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact | My Plumbing Inc" }] }),
});

function ContactPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-16 pb-24 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          Contact
        </p>
        <h1 className="mt-3 font-display text-5xl font-medium">
          Talk to {company.owner}.
        </h1>
        <p className="mt-4 text-muted">
          Project contact for My Plumbing Inc. Based near {company.city}. Serving{" "}
          {company.area}. {company.hours}. After hours, leave a message or text.
        </p>
        <div className="mt-8 space-y-3 text-lg">
          <p>
            <a className="underline" href={company.smsHref}>
              Text {company.phone}
            </a>
          </p>
          <p>
            <a
              className="underline"
              href={company.phoneHref}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = company.phoneHref;
              }}
            >
              Call {company.phone}
            </a>
          </p>
          <p>
            <a className="underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
          <p className="text-sm text-muted">{company.license}</p>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
