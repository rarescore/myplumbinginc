import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return NextResponse.json({ error: "Payment configuration missing." }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2024-06-20" as any,
    });

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Invalid session ID." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      paid: session.payment_status === "paid",
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email || session.customer_email,
      metadata: session.metadata || {},
    });
  } catch {
    return NextResponse.json({ error: "Could not verify session." }, { status: 500 });
  }
}
