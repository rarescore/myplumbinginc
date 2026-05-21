import { NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_PRICE_IDS, PurchaseType, isPhysicalPurchase } from "../../lib/stripePrices";

const ALLOWED_PURCHASE_TYPES = new Set([
  "certificate",
  "freshRetake",
  "bundle",
  "printedCertificate",
  "framedCertificate",
]);

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

export async function POST(req: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return NextResponse.json({ error: "Payment configuration missing." }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2024-06-20" as any,
    });

    const body = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myrarescore.com";
    const requestedType = clean(body.purchaseType || "certificate", 40) as PurchaseType;
    const purchaseType = ALLOWED_PURCHASE_TYPES.has(requestedType) ? requestedType : "certificate";
    const priceId = STRIPE_PRICE_IDS[purchaseType] || STRIPE_PRICE_IDS.certificate;

    if (!priceId) {
      return NextResponse.json({ error: "Stripe price ID is missing." }, { status: 500 });
    }

    const required = ["name", "email", "certificateId", "testTitle", "score", "resultTitle", "testRoute"];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json({ error: `Missing ${key}.` }, { status: 400 });
      }
    }

    const email = clean(body.email, 180).toLowerCase();
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/certificate`,
      shipping_address_collection: isPhysicalPurchase(purchaseType)
        ? { allowed_countries: ["US"] }
        : undefined,
      shipping_options: isPhysicalPurchase(purchaseType)
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "usd" },
                display_name: "Free shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 3 },
                  maximum: { unit: "business_day", value: 5 },
                },
              },
            },
          ]
        : undefined,
      metadata: {
        name: clean(body.name, 120),
        email,
        certificateId: clean(body.certificateId, 80),
        testTitle: clean(body.testTitle, 120),
        score: clean(body.score, 20),
        resultTitle: clean(body.resultTitle, 120),
        testRoute: clean(body.testRoute, 40),
        scoreLabel: clean(body.scoreLabel || "Score", 40),
        purchaseType: clean(purchaseType, 40),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Could not create checkout session." }, { status: 500 });
  }
}
