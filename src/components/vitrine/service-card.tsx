import Image from "next/image";
import Link from "next/link";
import { Clock, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { modalityLabel } from "@/lib/utils";

interface ServiceCardProps {
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
  slug: string;
  modality: string;
  imageUrl?: string;
  imageAlt?: string;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

export function ServiceCard({
  name,
  description,
  durationMinutes,
  priceCents,
  slug,
  modality,
  imageUrl,
  imageAlt,
}: ServiceCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {/* Photo or decorative color band */}
      {imageUrl ? (
        <div className="relative h-48 w-full shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt || name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-2 w-full bg-gradient-to-r from-nealma-200 via-nealma-300 to-nealma-400" />
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-heading text-lg text-nealma-text">
            {name}
          </CardTitle>
          <Badge
            variant="secondary"
            className="shrink-0 bg-nealma-green-100/60 text-nealma-green-400"
          >
            {modalityLabel(modality)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-3 text-nealma-text-light">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center gap-4 text-sm text-nealma-text-light">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4 text-nealma-300" />
          {formatDuration(durationMinutes)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Euro className="size-4 text-nealma-300" />
          {formatPrice(priceCents)}
        </span>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/services/${slug}`}>Réserver</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
