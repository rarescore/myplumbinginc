import { company } from "@/lib/site";

const TO = "+18188133277";
const MAX = 1400;

export function smsHref(body?: string) {
  if (!body) return company.smsHref;
  const encoded = encodeURIComponent(body.slice(0, MAX));
  const ios =
    typeof navigator !== "undefined" && /iPad|iPhone|iPod/i.test(navigator.userAgent);
  return ios ? `sms:${TO}&body=${encoded}` : `sms:${TO}?body=${encoded}`;
}

export function openSms(body: string) {
  window.location.href = smsHref(body);
}

export function quoteSmsBody(d: {
  name: string;
  phone: string;
  email: string;
  city: string;
  type: string;
  timeline: string;
  permit: string;
  finance: string;
  notes: string;
}) {
  return [
    "MPI site visit request",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `City: ${d.city}`,
    `Job: ${d.type}`,
    d.timeline ? `Timeline: ${d.timeline}` : "",
    d.permit ? `Permit: ${d.permit}` : "",
    d.finance ? `Financing: ${d.finance}` : "",
    d.notes ? `Notes: ${d.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function contactSmsBody(d: {
  name: string;
  phone: string;
  email: string;
  city: string;
  topic: string;
  message: string;
}) {
  return [
    `MPI ${d.topic}`.trim(),
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `City: ${d.city}`,
    d.message ? `Message: ${d.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
