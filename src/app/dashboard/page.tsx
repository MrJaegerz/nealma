import { Calendar, Euro, FileText, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/dashboard/stats-card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

  const [bookingsRes, revenueRes, postsRes, messagesRes] = await Promise.all([
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
  ]);

  const bookingsCount = bookingsRes.count || 0;

  const totalRevenue = (revenueRes.data || []).reduce((acc, b) => {
    const service = b.services as unknown as { price_cents: number } | null;
    return acc + (service?.price_cents || 0);
  }, 0);

  const postsCount = postsRes.count || 0;
  const unreadMessages = messagesRes.count || 0;

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-nealma-text mb-8">
        Vue d&apos;ensemble
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="RDV ce mois"
          value={String(bookingsCount)}
          description="Rendez-vous confirmés"
          icon={Calendar}
        />
        <StatsCard
          title="Revenus"
          value={new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(totalRevenue / 100)}
          description="Ce mois-ci"
          icon={Euro}
        />
        <StatsCard
          title="Articles publiés"
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
    </div>
  );
}
