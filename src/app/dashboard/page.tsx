import { Calendar, Euro, FileText, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/dashboard/layout-components";
import { BookingsChart } from "./_charts/bookings-chart";
import { RevenueChart } from "./_charts/revenue-chart";
import { ServicesChart } from "./_charts/services-chart";

const MONTH_LABELS = [
  "Janv",
  "F\u00e9vr",
  "Mars",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Ao\u00fbt",
  "Sept",
  "Oct",
  "Nov",
  "D\u00e9c",
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).toISOString();

  // Previous month for trends
  const startOfPrevMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  ).toISOString();
  const endOfPrevMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
  ).toISOString();

  // 6 months ago for charts
  const sixMonthsAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 5,
    1,
  ).toISOString();

  const [
    bookingsRes,
    revenueRes,
    postsRes,
    messagesRes,
    prevBookingsRes,
    prevRevenueRes,
    chartBookingsRes,
    servicesRes,
  ] = await Promise.all([
    // Current month stats
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .gte("booking_date", startOfMonth)
      .lte("booking_date", endOfMonth)
      .eq("status", "confirmed"),
    supabase
      .from("bookings")
      .select("services(price_cents)")
      .gte("booking_date", startOfMonth)
      .lte("booking_date", endOfMonth)
      .eq("payment_status", "paid"),
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
    // Previous month stats for trends
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .gte("booking_date", startOfPrevMonth)
      .lte("booking_date", endOfPrevMonth)
      .eq("status", "confirmed"),
    supabase
      .from("bookings")
      .select("services(price_cents)")
      .gte("booking_date", startOfPrevMonth)
      .lte("booking_date", endOfPrevMonth)
      .eq("payment_status", "paid"),
    // Chart data: bookings for last 6 months
    supabase
      .from("bookings")
      .select("booking_date, services(name, price_cents)")
      .gte("booking_date", sixMonthsAgo)
      .eq("status", "confirmed"),
    // Services distribution
    supabase
      .from("bookings")
      .select("services(name)")
      .gte("booking_date", sixMonthsAgo)
      .eq("status", "confirmed"),
  ]);

  // Current month stats
  const bookingsCount = bookingsRes.count ?? 0;
  const totalRevenue = (revenueRes.data ?? []).reduce((acc, b) => {
    const service = b.services as unknown as { price_cents: number } | null;
    return acc + (service?.price_cents ?? 0);
  }, 0);
  const postsCount = postsRes.count ?? 0;
  const unreadMessages = messagesRes.count ?? 0;

  // Previous month stats
  const prevBookingsCount = prevBookingsRes.count ?? 0;
  const prevRevenue = (prevRevenueRes.data ?? []).reduce((acc, b) => {
    const service = b.services as unknown as { price_cents: number } | null;
    return acc + (service?.price_cents ?? 0);
  }, 0);

  // Trends
  const bookingsTrend =
    prevBookingsCount > 0
      ? Math.round(
          ((bookingsCount - prevBookingsCount) / prevBookingsCount) * 100,
        )
      : 0;
  const revenueTrend =
    prevRevenue > 0
      ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100)
      : 0;

  // Build chart data: group bookings by month
  const bookingsByMonth = new Map<string, { count: number; revenue: number }>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = MONTH_LABELS[d.getMonth()];
    bookingsByMonth.set(key, { count: 0, revenue: 0 });
  }

  for (const b of chartBookingsRes.data ?? []) {
    const d = new Date(b.booking_date);
    const key = MONTH_LABELS[d.getMonth()];
    const entry = bookingsByMonth.get(key);
    if (entry) {
      entry.count++;
      const service = b.services as unknown as {
        price_cents: number;
      } | null;
      entry.revenue += (service?.price_cents ?? 0) / 100;
    }
  }

  const bookingsChartData = Array.from(bookingsByMonth.entries()).map(
    ([month, data]) => ({
      month,
      count: data.count,
    }),
  );

  const revenueChartData = Array.from(bookingsByMonth.entries()).map(
    ([month, data]) => ({
      month,
      revenue: data.revenue,
    }),
  );

  // Services distribution
  const servicesCounts = new Map<string, number>();
  for (const b of servicesRes.data ?? []) {
    const name =
      (b.services as unknown as { name: string } | null)?.name ?? "Autre";
    servicesCounts.set(name, (servicesCounts.get(name) ?? 0) + 1);
  }
  const servicesChartData = Array.from(servicesCounts.entries()).map(
    ([name, count]) => ({ name, count }),
  );

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Vue d&apos;ensemble</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="RDV ce mois"
            value={String(bookingsCount)}
            description="Rendez-vous confirm\u00e9s"
            icon={Calendar}
            trend={
              bookingsTrend !== 0
                ? {
                    value: Math.abs(bookingsTrend),
                    positive: bookingsTrend > 0,
                  }
                : undefined
            }
          />
          <StatsCard
            title="Revenus"
            value={new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(totalRevenue / 100)}
            description="Ce mois-ci"
            icon={Euro}
            trend={
              revenueTrend !== 0
                ? {
                    value: Math.abs(revenueTrend),
                    positive: revenueTrend > 0,
                  }
                : undefined
            }
          />
          <StatsCard
            title="Articles publi\u00e9s"
            value={String(postsCount)}
            description="Total"
            icon={FileText}
          />
          <StatsCard
            title="Messages"
            value={String(unreadMessages)}
            description="Non lus"
            icon={Users}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <BookingsChart data={bookingsChartData} />
          <RevenueChart data={revenueChartData} />
        </div>
        <ServicesChart data={servicesChartData} />
      </LayoutContent>
    </Layout>
  );
}
