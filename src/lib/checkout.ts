import { getStripe } from "@/lib/stripe";

export async function isPaidCheckoutSession(sessionId: string | undefined): Promise<boolean> {
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return false;
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    if (session.payment_status === "paid") {
      return true;
    }

    const subscription = session.subscription;
    if (subscription && typeof subscription !== "string") {
      return subscription.status === "active" || subscription.status === "trialing";
    }

    return false;
  } catch {
    return false;
  }
}
