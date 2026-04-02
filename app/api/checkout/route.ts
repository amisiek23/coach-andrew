import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json() as { plan: "consultation" | "quiz" };
    const origin = req.nextUrl.origin;
    const successUrl = `${origin}/self-mastery-profile?access=${plan}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl  = `${origin}/self-mastery-profile`;

    const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";

    // Placeholder mode — no real Stripe key yet
    if (!stripeKey || stripeKey === "sk_test_placeholder") {
      return NextResponse.json({
        url: `${origin}/self-mastery-profile?access=${plan}&session_id=dev_mock`,
      });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });

    const priceId = plan === "consultation"
      ? process.env.STRIPE_PRICE_ID_75
      : process.env.STRIPE_PRICE_ID_25;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId!, quantity: 1 }],
      success_url: successUrl,
      cancel_url:  cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
