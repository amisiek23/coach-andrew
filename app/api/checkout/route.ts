import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { plan, product = "hpp" } = await req.json() as {
      plan: "consultation" | "quiz";
      product?: "hpp" | "tsdp";
    };
    const origin = req.nextUrl.origin;
    const quizPath   = product === "tsdp" ? "/true-self-discovery-profile/quiz" : "/self-mastery-profile/quiz";
    const cancelPath = product === "tsdp" ? "/true-self-discovery-profile/checkout" : "/self-mastery-profile/checkout";
    const successUrl = `${origin}${quizPath}?access=${plan}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl  = `${origin}${cancelPath}`;

    const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";

    // Placeholder mode — no real Stripe key yet
    if (!stripeKey || stripeKey === "sk_test_placeholder") {
      return NextResponse.json({
        url: `${origin}${quizPath}?access=${plan}&session_id=dev_mock`,
      });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });

    const priceId = product === "tsdp"
      ? (plan === "consultation" ? process.env.STRIPE_PRICE_ID_TSDP_CONSULTATION : process.env.STRIPE_PRICE_ID_TSDP_QUIZ)
      : (plan === "consultation" ? process.env.STRIPE_PRICE_ID_100 : process.env.STRIPE_PRICE_ID_25);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId!, quantity: 1 }],
      success_url: successUrl,
      cancel_url:  cancelUrl,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
