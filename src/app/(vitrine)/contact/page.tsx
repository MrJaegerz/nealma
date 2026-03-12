import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Néalma pour toute question ou réservation. Accompagnement périnatal à domicile en Île-de-France : massage, bain bébé, allaitement.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-heading text-nealma-text sm:text-5xl">
            Contact
          </h1>
          <p className="mt-6 text-lg leading-8 text-nealma-text-light">
            Une question, une demande de renseignement ou envie de réserver un
            soin ? N&apos;hésitez pas à me contacter.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="mb-6 text-2xl font-heading text-nealma-text">
                Envoyer un message
              </h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-heading text-nealma-text">
                Coordonnées
              </h2>
              <div className="space-y-6 rounded-xl border border-nealma-border bg-nealma-bg-warm p-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-nealma-text">
                    Email
                  </h3>
                  <a
                    href="mailto:contact@nealma.fr"
                    className="mt-1 block text-nealma-400 hover:underline"
                  >
                    contact@nealma.fr
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-nealma-text">
                    Téléphone
                  </h3>
                  <a
                    href="tel:+33600000000"
                    className="mt-1 block text-nealma-400 hover:underline"
                  >
                    06 00 00 00 00
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-nealma-text">
                    Zone d&apos;intervention
                  </h3>
                  <p className="mt-1 text-nealma-text-light">
                    Île-de-France (Paris et tous les départements franciliens)
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-nealma-text">
                    Horaires
                  </h3>
                  <p className="mt-1 text-nealma-text-light">
                    Du lundi au samedi
                    <br />
                    9h00 - 19h00
                  </p>
                </div>

                {/* Zone map placeholder */}
                <div className="mt-4 flex h-40 items-center justify-center rounded-lg border border-nealma-border bg-gradient-to-br from-nealma-50 to-nealma-100">
                  <div className="flex flex-col items-center gap-2 text-nealma-text-light">
                    <MapPin className="size-6 text-nealma-300" />
                    <span className="text-sm">Zone : Île-de-France</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
