"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/site";
import { contactSmsBody, openSms, smsHref } from "@/lib/sms";

type Props = {
  intent?: "general" | "financing";
};

const KEY = "mpi-contact-draft";

export function ContactForm({ intent = "general" }: Props) {
  const [done, setDone] = useState(false);
  const [body, setBody] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    topic: intent === "financing" ? "Financing" : "Site visit",
    message: "",
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    const text = contactSmsBody(form);
    try {
      const prior = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown[];
      localStorage.setItem(
        KEY,
        JSON.stringify([{ ...form, at: new Date().toISOString() }, ...prior]),
      );
    } catch {
      /* ignore */
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
        <p className="mt-4 text-muted">
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
    <form
      onSubmit={submit}
      className="grid gap-4 rounded-xl border border-line bg-cream p-6 md:p-8"
    >
      <label className="grid gap-2 text-sm font-medium">
        Name
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Phone
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        City
        <input
          required
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          placeholder="North Hills, Sherman Oaks…"
          className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Topic
        <select
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="min-h-12 rounded-md border border-line bg-bone px-3 font-normal"
        >
          <option>Site visit</option>
          <option>Financing</option>
          <option>Existing job</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="rounded-md border border-line bg-bone px-3 py-3 font-normal"
          placeholder={
            intent === "financing"
              ? "Project type, rough budget, and whether you want lender options with the visit."
              : "What are we walking?"
          }
        />
      </label>
      <p className="text-sm text-muted">Opens a text to {company.phone}.</p>
      <button
        type="submit"
        className="mt-2 inline-flex min-h-12 items-center justify-center rounded-md bg-cta px-5 font-semibold text-cta-fg"
      >
        Text to {company.phone}
      </button>
    </form>
  );
}
