import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-nealma-bg-warm">
      {/* Decorative blurred shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-nealma-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-0 h-[320px] w-[320px] rounded-full bg-nealma-green-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-nealma-200/30 blur-2xl"
      />

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
