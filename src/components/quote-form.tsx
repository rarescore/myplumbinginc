"use client";

import { useState } from "react";
import { company, projectTypes } from "@/lib/site";
import { openSms, quoteSmsBody, smsHref } from "@/lib/sms";
import { cn } from "@/lib/utils";

type Draft = {
  type: string;
  timeline: string;
  permit: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  finance: string;
};

const empty: Draft = {
  type: "",
  timeline: "",
  permit: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  finance: "not-sure",
};

const KEY = "mpi-quote-draft";

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(empty);
  const [done, setDone] = useState(false);
  const [body, setBody] = useState("");

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function submit() {
    const text = quoteSmsBody(draft);
    try {
      const prior = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown[];
      localStorage.setItem(
        KEY,
        JSON.stringify([{ ...draft, at: new Date().toISOString() }, ...prior]),
      );
    } catch {
      /* ignore quota */
    }
    setBody(text);
    openSms(text);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-line bg-cream p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          Text Edgar
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium">
          This opens a text to {company.phone}.
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Hit Send in your messages app. If it didn’t open, tap below.
        </p>
        <a
          href={smsHref(body)}
          className="mt-6 inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
        >
          Text this request
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-cream p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Step {step} of 3
      </p>
      {step === 1 ? (
        <div className="mt-5">
          <h2 className="font-display text-3xl font-medium">What are we looking at?</h2>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {projectTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("type", t)}
                className={cn(
                  "min-h-12 rounded-md border px-4 text-left text-sm font-medium transition-colors duration-150",
                  draft.type === t
                    ? "border-ink bg-ink text-bone"
                    : "border-line bg-bone text-ink hover:border-ink",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!draft.type}
            onClick={() => setStep(2)}
            className="mt-6 inline-flex min-h-12 items-center rounded-md bg-cta px-5 font-semibold text-cta-fg disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="mt-5 grid gap-5">
          <h2 className="font-display text-3xl font-medium">Scope notes</h2>
          <label className="grid gap-2 text-sm font-medium">
            Timeline
            <select
              value={draft.timeline}
              onChange={(e) => set("timeline", e.target.value)}
              className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
            >
              <option value="">Select</option>
              <option>As soon as permitted</option>
              <option>This quarter</option>
              <option>Planning for later</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Permit needed?
            <select
              value={draft.permit}
              onChange={(e) => set("permit", e.target.value)}
              className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No / not sure</option>
              <option>Already in plan check</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Financing
            <select
              value={draft.finance}
              onChange={(e) => set("finance", e.target.value)}
              className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
            >
              <option value="not-sure">Not sure yet</option>
              <option value="cash">Paying cash</option>
              <option value="want">Want financing options</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            What should we know?
            <textarea
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={4}
              className="rounded-md border border-line bg-bone px-3 py-3 font-normal"
              placeholder="Rooms, square footage, photos you can text, anything behind the walls."
            />
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-h-12 rounded-md border border-line px-5 font-medium"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="min-h-12 rounded-md bg-cta px-5 font-semibold text-cta-fg"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
      {step === 3 ? (
        <form
          className="mt-5 grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <h2 className="font-display text-3xl font-medium">How do we reach you?</h2>
          <label className="grid gap-2 text-sm font-medium">
            Name
            <input
              required
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Phone
            <input
              required
              type="tel"
              value={draft.phone}
              onChange={(e) => set("phone", e.target.value)}
              className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={draft.email}
              onChange={(e) => set("email", e.target.value)}
              className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            City
            <input
              required
              value={draft.city}
              onChange={(e) => set("city", e.target.value)}
              className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
              placeholder="North Hills, Sherman Oaks…"
            />
          </label>
          <p className="text-sm text-muted">
            Submit opens a text to {company.phone}. Send it from your phone.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="min-h-12 rounded-md border border-line px-5 font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              className="min-h-12 rounded-md bg-cta px-5 font-semibold text-cta-fg"
            >
              Text to {company.phone}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
