import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez le parcours et la philosophie de soins de Néalma. Infirmière diplômée spécialisée en accompagnement périnatal à domicile en Île-de-France.",
};

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-heading text-nealma-text sm:text-5xl">
            À propos de Néalma
          </h1>
          <p className="mt-6 text-lg leading-8 text-nealma-text-light">
            Une infirmière passionnée par l&apos;accompagnement périnatal, au
            service des familles d&apos;Île-de-France.
          </p>
        </div>
      </section>

      {/* Presentation */}
      <section className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="flex-shrink-0">
              <Image
                src="/images/presentation.png"
                alt="Infirmière accompagnant un nouveau-né"
                width={288}
                height={320}
                className="mx-auto h-80 w-72 rounded-2xl object-cover lg:mx-0"
                priority
              />
            </div>

            {/* Bio */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-heading text-nealma-text">
                Qui suis-je ?
              </h2>
              <p className="text-nealma-text-light leading-7">
                Je suis infirmière diplômée d&apos;État, passionnée par le monde
                de la périnatalité et du bien-être maternel. Après plusieurs
                années d&apos;expérience en milieu hospitalier, notamment en
                maternité et en néonatologie, j&apos;ai choisi de me consacrer à
                l&apos;accompagnement périnatal à domicile.
              </p>
              <p className="text-nealma-text-light leading-7">
                Néalma est né de la conviction que chaque parent mérite un
                accompagnement doux, respectueux et personnalisé pendant cette
                période si particulière de la vie. Mon objectif est de vous
                offrir un espace de confiance et de bienveillance, dans le
                confort de votre foyer.
              </p>
              <p className="text-nealma-text-light leading-7">
                Je me déplace dans toute l&apos;Île-de-France pour vous proposer
                des soins adaptés à vos besoins : massages de bien-être, bain
                enveloppé pour bébé et accompagnement à l&apos;allaitement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parcours & Certifications */}
      <section className="bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-heading text-nealma-text sm:text-4xl">
            Parcours et formations
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-nealma-border bg-white p-8">
              <h3 className="mb-4 text-xl font-semibold text-nealma-text">
                Formation initiale
              </h3>
              <ul className="space-y-3 text-nealma-text-light">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-400" />
                  Diplôme d&apos;État d&apos;Infirmière
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-400" />
                  Expérience en service de maternité
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-400" />
                  Expérience en néonatologie
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-nealma-border bg-white p-8">
              <h3 className="mb-4 text-xl font-semibold text-nealma-text">
                Spécialisations
              </h3>
              <ul className="space-y-3 text-nealma-text-light">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-green-300" />
                  Certification en massage prénatal et post-partum
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-green-300" />
                  Formation au bain enveloppé (bain thalasso bébé)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-green-300" />
                  Accompagnement à l&apos;allaitement maternel
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nealma-green-300" />
                  Formation continue en périnatalité
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-heading text-nealma-text sm:text-4xl">
            Ma philosophie de soin
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-nealma-bg-warm">
                <span className="text-2xl text-nealma-400">&#10084;</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-nealma-text">
                Bienveillance
              </h3>
              <p className="text-sm leading-6 text-nealma-text-light">
                Chaque accompagnement se fait dans un cadre chaleureux, sans
                jugement, où vous vous sentez écoutée et respectée dans vos
                choix.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-nealma-green-100">
                <span className="text-2xl text-nealma-green-400">&#9202;</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-nealma-text">
                Respect du rythme
              </h3>
              <p className="text-sm leading-6 text-nealma-text-light">
                Je m&apos;adapte à votre rythme et à celui de votre bébé. Chaque
                famille est unique et mérite un accompagnement sur mesure.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-nealma-bg-warm">
                <span className="text-2xl text-nealma-400">&#9733;</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-nealma-text">
                Expertise
              </h3>
              <p className="text-sm leading-6 text-nealma-text-light">
                En tant qu&apos;infirmière diplômée, je m&apos;appuie sur des
                connaissances solides et une formation continue pour vous offrir
                des soins de qualité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-heading text-white">
            Envie d&apos;en savoir plus ?
          </h2>
          <p className="mt-4 text-lg text-nealma-green-100">
            N&apos;hésitez pas à me contacter pour toute question ou pour
            réserver votre premier soin.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-secondary hover:bg-white/90"
            >
              <Link href="/contact">Me contacter</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/services">Voir les soins</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
