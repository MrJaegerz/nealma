import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-nealma-bg-warm px-4">
      <div className="text-center">
        <p className="text-7xl font-heading text-nealma-400">404</p>
        <h1 className="mt-4 text-3xl font-heading text-nealma-text sm:text-4xl">
          Page introuvable
        </h1>
        <p className="mt-4 text-lg text-nealma-text-light max-w-md mx-auto">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
