import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Euro,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";
import { ServiceImageCarousel } from "@/components/vitrine/service-image-carousel";
import { ServiceCard } from "@/components/vitrine/service-card";
import { CalEmbed } from "@/components/booking/cal-embed";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/stripe";
import { modalityLabel } from "@/lib/utils";

const services = [
  {
    name: "Massage prénatal",
    slug: "massage-prenatal",
    durationMinutes: 60,
    priceCents: 8000,
    modality: "domicile",
    description:
      "Un massage doux et enveloppant adapté à la grossesse pour soulager les tensions, favoriser la détente et accompagner les transformations du corps.",
    longDescription:
      "Le massage prénatal est un soin tout en douceur, spécialement conçu pour répondre aux besoins des femmes enceintes. Il permet de soulager les tensions musculaires liées aux changements posturaux, de réduire les sensations de jambes lourdes et de favoriser un profond relâchement. Réalisé avec des huiles adaptées à la grossesse, ce massage est un véritable moment de connexion avec votre corps et votre bébé. Il peut être pratiqué à partir du deuxième trimestre de grossesse.",
    benefits: [
      "Soulagement des douleurs dorsales et lombaires",
      "Réduction du stress et de l'anxiété",
      "Amélioration de la circulation sanguine",
      "Moment de connexion avec bébé",
      "Préparation douce du corps à l'accouchement",
    ],
    gallery: [
      {
        src: "/images/massage-prenatal.avif",
        alt: "Femme enceinte sereine recevant un massage prénatal doux",
      },
    ],
    forWhom: "Femmes enceintes à partir du 2e trimestre",
    contraindications:
      "Grossesse à risque, contractions prématurées, fièvre. En cas de doute, demandez l'avis de votre sage-femme ou médecin.",
  },
  {
    name: "Massage post-partum",
    slug: "massage-post-partum",
    durationMinutes: 60,
    priceCents: 8000,
    modality: "domicile",
    description:
      "Un moment de bien-être après l'accouchement pour aider le corps à récupérer, relâcher les tensions et se reconnecter à soi.",
    longDescription:
      "Après l'accouchement, le corps a besoin de temps pour se remettre. Le massage post-partum vous offre un moment rien que pour vous, dans le confort de votre domicile. Ce soin aide à relâcher les tensions accumulées pendant la grossesse et l'accouchement, favorise la récupération musculaire et vous permet de vous reconnecter à votre corps. C'est aussi un moment précieux pour prendre soin de soi en tant que jeune parent.",
    benefits: [
      "Récupération physique après l'accouchement",
      "Relâchement des tensions musculaires",
      "Soutien émotionnel et bien-être",
      "Amélioration du sommeil",
      "Moment de détente pour la jeune maman",
    ],
    gallery: [
      {
        src: "/images/massage-post-partum.avif",
        alt: "Jeune maman paisible se reposant après l'accouchement",
      },
    ],
    forWhom: "Jeunes mamans dès la sortie de maternité",
    contraindications:
      "Césarienne récente non cicatrisée, complications post-partum. Consultez votre médecin si besoin.",
  },
  {
    name: "Bain enveloppé bébé",
    slug: "bain-enveloppe-bebe",
    durationMinutes: 45,
    priceCents: 6500,
    modality: "domicile",
    description:
      "Un bain sensoriel inspiré du bain thalasso, offrant à bébé un moment de détente en douceur qui rappelle la vie intra-utérine.",
    longDescription:
      "Le bain enveloppé est un soin inspiré du bain thalasso pour bébé. Enveloppé dans un lange doux, votre bébé est immergé dans une eau à température corporelle, recréant les sensations rassurantes de la vie in utero. Ce bain favorise la détente, le relâchement musculaire et l'apaisement. C'est un moment d'une grande douceur, idéal dès les premières semaines de vie et jusqu'aux premiers mois.",
    benefits: [
      "Apaisement profond pour bébé",
      "Rappel sécurisant de la vie intra-utérine",
      "Renforcement du lien parent-enfant",
      "Aide à la régulation du sommeil",
      "Détente musculaire et sensorielle",
    ],
    gallery: [
      {
        src: "/images/bain-bebe.avif",
        alt: "Bébé apaisé dans un bain enveloppé inspiré du bain thalasso",
      },
    ],
    forWhom: "Bébés dès la naissance et jusqu'à 6 mois",
    contraindications:
      "Fièvre, infection cutanée, cordon ombilical non cicatrisé. Demandez conseil à votre pédiatre.",
  },
  {
    name: "Soutien allaitement",
    slug: "soutien-allaitement",
    durationMinutes: 60,
    priceCents: 7000,
    modality: "les_deux",
    description:
      "Un accompagnement personnalisé pour vous guider dans votre allaitement : mise au sein, positions, difficultés, sevrage en douceur.",
    longDescription:
      "L'allaitement est une aventure magnifique mais qui peut aussi être source de questionnements et de difficultés. Que ce soit pour la mise en route, la gestion des douleurs, un frein restrictif, un manque de lait ressenti ou un sevrage en douceur, je vous accompagne avec bienveillance et expertise. Les consultations peuvent se faire à domicile ou en visio selon vos besoins et votre situation.",
    benefits: [
      "Accompagnement personnalisé dès la naissance",
      "Aide à la mise au sein et aux positions",
      "Gestion des douleurs et crevasses",
      "Soutien en cas de difficulté (frein, engorgement...)",
      "Accompagnement au sevrage en douceur",
    ],
    gallery: [
      {
        src: "/images/soutient-allaitement.avif",
        alt: "Maman allaitant son nouveau-né avec tendresse et sérénité",
      },
    ],
    forWhom: "Mamans allaitantes, du prénatal au sevrage",
    contraindications:
      "Aucune contre-indication. Ce soin s'adapte à toutes les situations d'allaitement.",
  },
];

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} — Néalma`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug);

  // Fetch Cal.com config from DB if available
  const supabase = await createClient();
  const { data: dbService } = await supabase
    .from("services")
    .select("cal_event_type_id")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME || "nealma";
  const calLink =
    dbService?.cal_event_type_id || `${calUsername}/${slug}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-nealma-bg-warm px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-nealma-text-light transition-colors hover:text-nealma-400"
          >
            <ArrowLeft className="size-4" />
            Tous les soins
          </Link>
        </div>
      </div>

      {/* Hero — gallery + service info */}
      <section className="relative overflow-hidden bg-nealma-bg-warm pb-16 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* Gallery */}
            <ServiceImageCarousel images={service.gallery} />

            {/* Info card — sticky on scroll */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-nealma-green-100/60 text-nealma-green-400"
                >
                  {modalityLabel(service.modality)}
                </Badge>

                <h1 className="text-3xl font-heading text-nealma-text sm:text-4xl lg:text-5xl">
                  {service.name}
                </h1>

                <p className="text-lg leading-relaxed text-nealma-text-light">
                  {service.description}
                </p>
              </div>

              {/* Price & duration */}
              <div className="flex flex-wrap items-center gap-6 rounded-xl border border-nealma-border bg-white p-5">
                <div className="flex items-center gap-2">
                  <Euro className="size-5 text-nealma-300" />
                  <span className="text-2xl font-semibold text-nealma-text">
                    {formatPrice(service.priceCents)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-nealma-text-light">
                  <Clock className="size-5 text-nealma-300" />
                  <span>{formatDuration(service.durationMinutes)}</span>
                </div>
                <div className="flex items-center gap-2 text-nealma-text-light">
                  <MapPin className="size-5 text-nealma-300" />
                  <span>{modalityLabel(service.modality)}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="flex-1">
                  <a href="#reservation">Réserver ce soin</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <Link href="/contact">Poser une question</Link>
                </Button>
              </div>

              {/* For whom */}
              <div className="rounded-xl bg-nealma-100/40 p-4">
                <p className="text-sm font-medium text-nealma-text">
                  <Sparkles className="mr-1.5 inline size-4 text-nealma-400" />
                  Pour qui ?
                </p>
                <p className="mt-1 text-sm text-nealma-text-light">
                  {service.forWhom}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed content */}
      <section className="bg-nealma-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Long description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading text-nealma-text sm:text-3xl">
                  En quoi consiste ce soin ?
                </h2>
                <p className="mt-4 leading-7 text-nealma-text-light">
                  {service.longDescription}
                </p>
              </div>

              {/* Contraindications */}
              {service.contraindications && (
                <div className="rounded-xl border border-nealma-border bg-nealma-50/50 p-6">
                  <h3 className="text-base font-semibold text-nealma-text">
                    Bon à savoir
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-nealma-text-light">
                    {service.contraindications}
                  </p>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-heading text-nealma-text sm:text-3xl">
                Les bienfaits
              </h2>
              <ul className="mt-6 space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-nealma-green-300" />
                    <span className="text-nealma-text-light">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking calendar */}
      <section
        id="reservation"
        className="bg-nealma-bg-warm py-16 px-4 sm:px-6 lg:px-8 scroll-mt-8"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-heading text-nealma-text sm:text-3xl">
            Choisir un créneau
          </h2>

          <div className="rounded-xl border border-nealma-border bg-white overflow-hidden min-h-[600px]">
            <CalEmbed calLink={calLink} />
          </div>

          <p className="mt-4 text-sm text-nealma-text-light text-center">
            Après avoir choisi votre créneau, vous serez redirigé vers le
            paiement sécurisé.
          </p>
        </div>
      </section>

      {/* Other services */}
      <section className="relative isolate overflow-hidden bg-nealma-bg py-16 px-4 sm:px-6 lg:px-8">
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-heading text-nealma-text sm:text-3xl">
            Découvrir les autres soins
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <ServiceCard
                key={s.slug}
                name={s.name}
                description={s.description}
                durationMinutes={s.durationMinutes}
                priceCents={s.priceCents}
                slug={s.slug}
                modality={s.modality}
                imageUrl={s.gallery[0]?.src}
                imageAlt={s.gallery[0]?.alt}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
