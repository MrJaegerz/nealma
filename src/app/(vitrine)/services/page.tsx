import type { Metadata } from "next";
import { Home, MapPin, Heart } from "lucide-react";
import { ServiceCard } from "@/components/vitrine/service-card";
import { Button } from "@/components/ui/button";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos soins périnataux",
  description:
    "Découvrez nos soins périnataux à domicile en Île-de-France : massage prénatal, massage post-partum, bain enveloppé bébé et soutien à l'allaitement. Tarifs et détails.",
};

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
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-heading text-nealma-text sm:text-5xl">
            Nos soins périnataux
          </h1>
          <p className="mt-6 text-lg leading-8 text-nealma-text-light">
            Des soins doux et personnalisés pour accompagner chaque étape de
            votre parcours périnatal, de la grossesse aux premiers mois de bébé.
          </p>
        </div>
      </section>

      {/* Services detailed */}
      <section className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-24">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className={`flex flex-col gap-10 lg:flex-row lg:items-start ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Card */}
              <div className="w-full lg:w-1/3">
                <ServiceCard
                  name={service.name}
                  description={service.description}
                  durationMinutes={service.durationMinutes}
                  priceCents={service.priceCents}
                  modality={service.modality}
                  slug={service.slug}
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-6">
                <h2 className="text-2xl font-heading text-nealma-text sm:text-3xl">
                  {service.name}
                </h2>
                <p className="text-nealma-text-light leading-7">
                  {service.longDescription}
                </p>
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-nealma-text">
                    Les bienfaits
                  </h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-nealma-text-light"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-green-300" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="mt-4">
                  <Link href={`/reservation/${service.slug}`}>Réserver ce soin</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="relative isolate overflow-hidden bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-heading text-nealma-text sm:text-4xl">
              Mon approche
            </h2>
            <p className="mt-6 text-lg leading-8 text-nealma-text-light">
              Je me déplace à votre domicile dans toute l&apos;Île-de-France
              pour vous offrir un accompagnement dans votre environnement
              familier, là où vous vous sentez le plus en confiance.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-nealma-border bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-nealma-100" aria-hidden="true">
                <Home className="size-6 text-nealma-400" />
              </div>
              <h3 className="text-lg font-semibold text-nealma-text">
                À domicile
              </h3>
              <p className="mt-2 text-sm text-nealma-text-light">
                Tous les soins sont réalisés chez vous, dans le confort et
                l&apos;intimité de votre foyer.
              </p>
            </div>
            <div className="rounded-xl border border-nealma-border bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-nealma-green-100" aria-hidden="true">
                <MapPin className="size-6 text-nealma-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-nealma-text">
                Île-de-France
              </h3>
              <p className="mt-2 text-sm text-nealma-text-light">
                Je me déplace dans toute la région parisienne : Paris et
                l&apos;ensemble des départements franciliens.
              </p>
            </div>
            <div className="rounded-xl border border-nealma-border bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-nealma-100" aria-hidden="true">
                <Heart className="size-6 text-nealma-400" />
              </div>
              <h3 className="text-lg font-semibold text-nealma-text">
                Bienveillance
              </h3>
              <p className="mt-2 text-sm text-nealma-text-light">
                Chaque soin est adapté à vos besoins, sans jugement, dans le
                respect de votre rythme.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
