import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Euro } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";
import { BookingStepper } from "@/components/vitrine/booking-stepper";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/stripe";
import { modalityLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Réserver un rendez-vous",
  description:
    "Réservez votre séance d'accompagnement périnatal avec Néalma. Massage prénatal, post-partum, bain bébé ou soutien allaitement.",
};

const DEFAULT_SERVICES = [
  {
    id: "1",
    name: "Massage prénatal",
    slug: "massage-prenatal",
    description:
      "Un moment de détente et de bien-être pendant votre grossesse. Soulage les tensions, améliore la circulation et favorise la connexion avec bébé.",
    duration_minutes: 60,
    price_cents: 8000,
    modality: "domicile",
  },
  {
    id: "2",
    name: "Massage post-partum",
    slug: "massage-post-partum",
    description:
      "Retrouvez bien-être et sérénité après l'accouchement. Aide à la récupération physique et au relâchement des tensions.",
    duration_minutes: 60,
    price_cents: 8000,
    modality: "domicile",
  },
  {
    id: "3",
    name: "Bain enveloppé bébé",
    slug: "bain-enveloppe-bebe",
    description:
      "Une expérience douce et sensorielle pour votre nouveau-né, inspirée du bain Thalasso. Favorise l'apaisement et le lien parent-enfant.",
    duration_minutes: 45,
    price_cents: 6500,
    modality: "domicile",
  },
  {
    id: "4",
    name: "Soutien allaitement",
    slug: "soutien-allaitement",
    description:
      "Accompagnement personnalisé pour un allaitement serein. Conseils pratiques, positions, gestion des difficultés.",
    duration_minutes: 60,
    price_cents: 7000,
    modality: "les_deux",
  },
];

export default async function ReservationPage() {
  const supabase = await createClient();
  const { data: dbServices } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const services = dbServices && dbServices.length > 0 ? dbServices : DEFAULT_SERVICES;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-heading text-nealma-text sm:text-5xl">
            Réserver un rendez-vous
          </h1>
          <p className="mt-6 text-lg leading-8 text-nealma-text-light">
            Choisissez le soin qui vous correspond et réservez votre créneau en
            ligne.
          </p>
        </div>
      </section>

      <section className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <BookingStepper currentStep={1} />

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-nealma-text">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-nealma-text-light text-sm">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <div className="flex items-center gap-1.5 text-sm text-nealma-text-light">
                      <Clock className="h-4 w-4" />
                      {service.duration_minutes} min
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-nealma-text-light">
                      <Euro className="h-4 w-4" />
                      {formatPrice(service.price_cents)}
                    </div>
                    <Badge variant="secondary">
                      <MapPin className="h-3 w-3 mr-1" />
                      {modalityLabel(service.modality)}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/services/${service.slug}`}>
                      Réserver ce soin
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
