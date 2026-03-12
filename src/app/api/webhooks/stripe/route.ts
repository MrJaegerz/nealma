import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { sendBookingConfirmation } from "@/lib/email";
import Stripe from "stripe";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  const supabase = getSupabase();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const { data: booking } = await supabase
        .from("bookings")
        .update({
          payment_status: "paid",
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .eq("id", bookingId)
        .select("*, services(*)")
        .single();

      if (booking) {
        const date = new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "full",
          timeStyle: "short",
        }).format(new Date(booking.booking_date));

        const price = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format((booking.services?.price_cents || 0) / 100);

        await sendBookingConfirmation({
          clientEmail: booking.client_email,
          clientName: booking.client_name,
          serviceName: booking.services?.name || "Soin",
          date,
          price,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
