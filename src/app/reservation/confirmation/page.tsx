import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Confirmation de réservation",
};

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-lg mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-nealma-green-300 mx-auto mb-6" />

        <h1 className="text-3xl font-heading font-bold text-nealma-text">
          Rendez-vous confirmé !
        </h1>

        <p className="mt-4 text-lg text-nealma-text-light">
          Merci pour votre réservation. Vous allez recevoir un email de
          confirmation avec tous les détails de votre rendez-vous.
        </p>

        <div className="mt-8 p-6 bg-nealma-bg-warm rounded-xl">
          <h2 className="font-heading font-semibold text-nealma-text mb-2">
            Prochaines étapes
          </h2>
          <ul className="text-left text-nealma-text-light space-y-2 text-sm">
            <li>
              Vérifiez votre boîte mail pour l&apos;email de confirmation
            </li>
            <li>
              Préparez un espace calme et confortable pour le soin à domicile
            </li>
            <li>
              N&apos;hésitez pas à nous contacter si vous avez des questions
            </li>
          </ul>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
