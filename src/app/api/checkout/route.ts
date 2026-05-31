import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const allowedPriceEnvNames = new Set([
  "STRIPE_PRICE_STARTER",
  "STRIPE_PRICE_BUILDER",
  "STRIPE_PRICE_STUDIO",
]);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const priceIdEnv = String(formData.get("priceIdEnv") ?? "");

  if (!allowedPriceEnvNames.has(priceIdEnv)) {
    return NextResponse.json({ error: "Unknown subscription plan." }, { status: 400 });
  }

  const priceId = process.env[priceIdEnv];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;

  if (!priceId) {
    return NextResponse.json(
      {
        error: `Missing ${priceIdEnv}. Add your Stripe price ID before accepting subscriptions.`,
      },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/submit?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cancel`,
    allow_promotion_codes: true,
  });

  redirect(session.url!);
}
