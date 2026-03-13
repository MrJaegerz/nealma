import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CalEmbed } from "@/components/booking/cal-embed";
import { formatPrice } from "@/lib/stripe";

const DEFAULT_SERVICES: Record<
  string,
  {
    name: string;
    slug: string;
    description: string;
    duration_minutes: number;
    price_cents: number;
    modality: string;
    cal_event_type_id: string | null;
  }
> = {
  "massage-prenatal": {
    name: "Massage prénatal",
    slug: "massage-prenatal",
    description:
      "Un moment de détente et de bien-être pendant votre grossesse. Soulage les tensions, améliore la circulation et favorise la connexion avec bébé.",
    duration_minutes: 60,
    price_cents: 8000,
    modality: "domicile",
    cal_event_type_id: null,
  },
  "massage-post-partum": {
    name: "Massage post-partum",
    slug: "massage-post-partum",
    description:
      "Retrouvez bien-être et sérénité après l'accouchement. Aide à la récupération physique et au relâchement des tensions.",
    duration_minutes: 60,
    price_cents: 8000,
    modality: "domicile",
    cal_event_type_id: null,
  },
  "bain-enveloppe-bebe": {
    name: "Bain enveloppé bébé",
    slug: "bain-enveloppe-bebe",
    description:
      "Une expérience douce et sensorielle pour votre nouveau-né, inspirée du bain Thalasso. Favorise l'apaisement et le lien parent-enfant.",
    duration_minutes: 45,
    price_cents: 6500,
    modality: "domicile",
    cal_event_type_id: null,
  },
  "soutien-allaitement": {
    name: "Soutien allaitement",
    slug: "soutien-allaitement",
    description:
      "Accompagnement personnalisé pour un allaitement serein. Conseils pratiques, positions, gestion des difficultés.",
    duration_minutes: 60,
    price_cents: 7000,
    modality: "les_deux",
    cal_event_type_id: null,
  },
};

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const supabase = await createClient();

  const { data: dbService } = await supabase
    .from("services")
    .select("name")
    .eq("slug", serviceSlug)
    .eq("is_active", true)
    .single();

  const name = dbService?.name ?? DEFAULT_SERVICES[serviceSlug]?.name;

  return {
    title: name ? `Réserver - ${name}` : "Réserver",
  };
}

export default async function ServiceBookingPage({ params }: Props) {
  const { serviceSlug } = await params;
  const supabase = await createClient();

  const { data: dbService } = await supabase
    .from("services")
    .select("*")
    .eq("slug", serviceSlug)
    .eq("is_active", true)
    .single();

  const service = dbService ?? DEFAULT_SERVICES[serviceSlug];

  if (!service) {
    notFound();
  }

  const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME || "nealma";
  const calLink = service.cal_event_type_id || `${calUsername}/${serviceSlug}`;

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
          <h1 className="text-3xl font-heading text-nealma-text">
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
