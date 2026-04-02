import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id") ?? "";

  // Placeholder / dev mode
  if (sessionId === "dev_mock") {
    return NextResponse.json({ valid: true });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";
  if (!stripeKey || stripeKey === "sk_test_placeholder") {
    return NextResponse.json({ valid: false, error: "Stripe not configured" });
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({ valid: session.payment_status === "paid" });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
