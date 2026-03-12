const CAL_API_BASE = "https://api.cal.com/v2";

async function calFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${CAL_API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CAL_API_KEY}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Cal.com API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getEventTypes() {
  return calFetch("/event-types");
}

export async function getBookings(params?: { status?: string }) {
  const query = params?.status ? `?status=${params.status}` : "";
  return calFetch(`/bookings${query}`);
}

export async function cancelBooking(bookingId: string) {
  return calFetch(`/bookings/${bookingId}/cancel`, { method: "DELETE" });
}
