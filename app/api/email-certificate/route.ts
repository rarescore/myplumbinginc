import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

function clean(value: unknown, max = 120) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 180;
}

function validBase64File(value: unknown, maxBytes: number) {
  const text = String(value || "");
  if (!/^[A-Za-z0-9+/=]+$/.test(text)) return false;
  return Math.floor((text.length * 3) / 4) <= maxBytes;
}

export async function POST(req: Request) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!resendKey || !stripeSecret) {
      return NextResponse.json({ error: "Email or payment configuration missing." }, { status: 500 });
    }

    const body = await req.json();
    const required = ["sessionId", "name", "email", "certificateId", "testTitle", "score", "resultTitle", "pdfBase64", "pngBase64"];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json({ error: `Missing ${key}.` }, { status: 400 });
      }
    }

    const sessionId = clean(body.sessionId, 120);
    if (!sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Invalid checkout session." }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" as any });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not confirmed." }, { status: 402 });
    }

    const paidEmail = String(session.customer_details?.email || session.customer_email || session.metadata?.email || "").toLowerCase();
    const requestedEmail = clean(body.email, 180).toLowerCase();

    if (!validEmail(requestedEmail) || requestedEmail !== paidEmail) {
      return NextResponse.json({ error: "Certificate email does not match checkout email." }, { status: 403 });
    }

    if (!validBase64File(body.pdfBase64, 5_000_000) || !validBase64File(body.pngBase64, 7_500_000)) {
      return NextResponse.json({ error: "Invalid certificate file." }, { status: 400 });
    }

    const metadata = session.metadata || {};
    const name = clean(metadata.name || body.name, 120);
    const testTitle = clean(metadata.testTitle || body.testTitle, 120);
    const score = clean(metadata.score || body.score, 20);
    const resultTitle = clean(metadata.resultTitle || body.resultTitle, 120);
    const certificateId = clean(metadata.certificateId || body.certificateId, 80);
    const scoreLabel = clean(metadata.scoreLabel || body.scoreLabel || "Score", 40);
    const purchaseType = clean(metadata.purchaseType || body.purchaseType || "certificate", 40);

    const resend = new Resend(resendKey);
    const fromEmail = process.env.CERTIFICATE_FROM_EMAIL || "hello@myrarescore.com";
    const replyTo = process.env.CERTIFICATE_REPLY_TO_EMAIL || "hello.myrarescore@gmail.com";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myrarescore.com";
    const physicalNote = purchaseType === "printedCertificate" || purchaseType === "framedCertificate"
      ? "<p>Your physical certificate order includes free shipping. Estimated delivery: 3–5 business days after fulfillment.</p>"
      : "";

    await resend.emails.send({
      from: `RareScore <${fromEmail}>`,
      to: [requestedEmail],
      replyTo,
      subject: "Your Official RareScore Certificate is ready",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>Your Official RareScore Certificate is ready</h2>
          <p>Hi ${name},</p>
          <p>Your Official RareScore Certificate is ready.</p>
          <p>
            <strong>Test:</strong> ${testTitle}<br/>
            <strong>${scoreLabel}:</strong> ${score}<br/>
            <strong>Result:</strong> ${resultTitle}<br/>
            <strong>Certificate ID:</strong> ${certificateId}
          </p>
          <p>Your certificate PDF and PNG are attached to this email.</p>${physicalNote}
          <p>Thank you,<br/>Score Verification Department<br/>RareScore<br/>${siteUrl.replace("https://", "")}</p>
        </div>
      `,
      attachments: [
        {
          filename: "Official-RareScore-Certificate.pdf",
          content: body.pdfBase64,
        },
        {
          filename: "Official-RareScore-Certificate.png",
          content: body.pngBase64,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Email could not be sent." }, { status: 500 });
  }
}
