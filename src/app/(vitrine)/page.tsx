import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/vitrine/hero";
import { TrustStrip } from "@/components/vitrine/trust-strip";
import { ServiceCard } from "@/components/vitrine/service-card";
import { Testimonial } from "@/components/vitrine/testimonial";
import { Button } from "@/components/ui/button";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";

export const metadata: Metadata = {
  title: "Accompagnement périnatal à domicile en Île-de-France",
  description:
    "Néalma propose des soins périnataux à domicile en Île-de-France : massage prénatal, massage post-partum, bain enveloppé bébé et soutien à l'allaitement. Infirmière diplômée, approche bienveillante.",
};

const services = [
  {
    name: "Massage prénatal",
    description:
      "Un massage doux et enveloppant adapté à la grossesse pour soulager les tensions, favoriser la détente et accompagner les transformations du corps.",
    durationMinutes: 60,
    priceCents: 8000,
    modality: "domicile",
    slug: "massage-prenatal",
  },
  {
    name: "Massage post-partum",
    description:
      "Un moment de bien-être après l'accouchement pour aider le corps à récupérer, relâcher les tensions et se reconnecter à soi.",
    durationMinutes: 60,
    priceCents: 8000,
    modality: "domicile",
    slug: "massage-post-partum",
  },
  {
    name: "Bain enveloppé bébé",
    description:
      "Un bain sensoriel inspiré du bain thalasso, offrant à bébé un moment de détente en douceur qui rappelle la vie intra-utérine.",
    durationMinutes: 45,
    priceCents: 6500,
    modality: "domicile",
    slug: "bain-enveloppe-bebe",
  },
  {
    name: "Soutien allaitement",
    description:
      "Un accompagnement personnalisé pour vous guider dans votre allaitement : mise au sein, positions, difficultés, sevrage en douceur.",
    durationMinutes: 60,
    priceCents: 7000,
    modality: "les_deux",
    slug: "soutien-allaitement",
  },
];

const testimonials = [
  {
    author: "Sophie M.",
    quote:
      "Un moment de pure détente pendant ma grossesse. Le massage prénatal m'a vraiment aidée à soulager mes douleurs de dos. Je recommande les yeux fermés !",
    service: "Massage prénatal",
  },
  {
    author: "Camille D.",
    quote:
      "Le bain enveloppé a été un moment magique pour notre bébé. Il était tellement apaisé, c'était émouvant à regarder. Merci pour cette belle expérience.",
    service: "Bain enveloppé bébé",
  },
  {
    author: "Aurélie T.",
    quote:
      "Grâce à l'accompagnement en allaitement, j'ai pu surmonter mes difficultés et vivre cette expérience sereinement. Un soutien précieux et bienveillant.",
    service: "Soutien allaitement",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Néalma",
  description:
    "Accompagnement périnatal à domicile en Île-de-France : massages, bain enveloppé bébé, soutien à l'allaitement par une infirmière diplômée.",
  url: "https://nealma.fr",
  telephone: "+33600000000",
  email: "contact@nealma.fr",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 48.8566,
      longitude: 2.3522,
    },
    geoRadius: "50000",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  priceRange: "€€",
  image: "https://nealma.fr/og-image.jpg",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Soins périnataux",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
      price: (service.priceCents / 100).toFixed(2),
      priceCurrency: "EUR",
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <TrustStrip />

      {/* Services */}
      <section
        id="services"
        className="relative isolate overflow-hidden bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8"
      >
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-heading text-nealma-text sm:text-4xl">
              Nos soins
            </h2>
            <p className="mt-4 text-lg text-nealma-text-light">
              Des soins personnalisés à domicile, en Île-de-France, pour vous
              accompagner avec douceur dans votre parcours périnatal.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-label="Témoignages" className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-heading text-nealma-text sm:text-4xl">
              Témoignages
            </h2>
            <p className="mt-4 text-lg text-nealma-text-light">
              Ce que disent les familles accompagnées par Néalma.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.author} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-heading text-white sm:text-4xl">
            Prête à prendre soin de vous ?
          </h2>
          <p className="mt-4 text-lg text-nealma-green-100">
            Réservez votre soin à domicile en quelques clics. Je me déplace dans
            toute l&apos;Île-de-France.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-secondary hover:bg-white/90"
            >
              <Link href="/reservation">Réserver un soin</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="border border-white text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
