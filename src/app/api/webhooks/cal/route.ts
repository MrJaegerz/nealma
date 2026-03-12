import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function verifyCalSignature(payload: string, signature: string): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET!;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-cal-signature-256");

  if (signature && !verifyCalSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  const supabase = getSupabase();

  switch (event.triggerEvent) {
    case "BOOKING_CREATED": {
      const booking = event.payload;

      await supabase.from("bookings").insert({
        client_name: booking.attendees?.[0]?.name || "Client",
        client_email: booking.attendees?.[0]?.email || "",
        client_phone: booking.attendees?.[0]?.phone || null,
        booking_date: booking.startTime,
        cal_booking_id: String(booking.bookingId),
        status: "confirmed",
        payment_status: "pending",
      });
      break;
    }

    case "BOOKING_CANCELLED": {
      const booking = event.payload;

      await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("cal_booking_id", String(booking.bookingId));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
