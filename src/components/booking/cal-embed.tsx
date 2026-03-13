"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalEmbedProps {
  calLink: string;
}

export function CalEmbed({ calLink }: CalEmbedProps) {
  const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME;

  useEffect(() => {
    if (!calUsername) return;

    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#ED5829",
            "cal-text": "#333333",
            "cal-text-emphasis": "#333333",
          },
          dark: {
            "cal-brand": "#ED5829",
            "cal-text": "#ffffff",
            "cal-text-emphasis": "#ffffff",
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, [calUsername]);

  if (!calUsername) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
        <CalendarDays className="size-12 text-nealma-300" />
        <h3 className="text-lg font-heading text-nealma-text">
          Réservation en ligne bientôt disponible
        </h3>
        <p className="max-w-md text-sm text-nealma-text-light">
          Le système de réservation en ligne est en cours de mise en place.
          En attendant, contactez-nous directement pour prendre rendez-vous.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="tel:+33600000000">Appeler</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
