import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CalEmbed } from "@/components/booking/cal-embed";
import { formatPrice } from "@/lib/stripe";

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("name")
    .eq("slug", serviceSlug)
    .eq("is_active", true)
    .single();

  return {
    title: service ? `Réserver - ${service.name}` : "Réserver",
  };
}

export default async function ServiceBookingPage({ params }: Props) {
  const { serviceSlug } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", serviceSlug)
    .eq("is_active", true)
    .single();

  if (!service) {
    notFound();
  }

  const calLink = service.cal_event_type_id || `nealma/${serviceSlug}`;

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/reservation"
        className="inline-flex items-center gap-2 text-nealma-400 hover:text-nealma-500 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux services
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-nealma-text">
            {service.name}
          </h1>
          <p className="mt-2 text-nealma-text-light">
            {service.duration_minutes} minutes &middot;{" "}
            {formatPrice(service.price_cents)}
          </p>
          {service.description && (
            <p className="mt-3 text-nealma-text-light">{service.description}</p>
          )}
        </div>

        <div className="rounded-xl border border-nealma-border overflow-hidden min-h-[600px]">
          <CalEmbed calLink={calLink} />
        </div>

        <p className="mt-4 text-sm text-nealma-text-light text-center">
          Après avoir choisi votre créneau, vous serez redirigé vers le paiement
          sécurisé.
        </p>
      </div>
    </div>
  );
}
