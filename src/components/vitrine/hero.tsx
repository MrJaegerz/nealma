import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-nealma-bg-warm">
      <AnimatedBlobs />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-4xl leading-tight tracking-tight text-nealma-text sm:text-5xl lg:text-6xl">
            Accompagnement périnatal bienveillant
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-nealma-text-light sm:text-xl">
            Massages prénatal et post-partum, bain enveloppé bébé, soutien à
            l&apos;allaitement&nbsp;&mdash; des soins doux et personnalisés à
            domicile en Île-de-France, par une infirmière diplômée.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/services">Découvrir nos services</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/reservation">Prendre rendez-vous</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
