import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedArticleProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
}

export function FeaturedArticle({
  title,
  slug,
  excerpt,
  coverImageUrl,
  publishedAt,
}: FeaturedArticleProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(publishedAt))
    : null;

  const readingTime = excerpt
    ? `${Math.max(3, Math.ceil(excerpt.length / 200))} min de lecture`
    : "5 min de lecture";

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="grid overflow-hidden rounded-xl border border-nealma-border/60 bg-white transition-shadow group-hover:shadow-lg md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[280px]">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-nealma-50 to-nealma-100" />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col justify-center gap-3 p-6 md:border-l md:border-nealma-border/40 md:p-8">
          <Badge
            variant="secondary"
            className="w-fit text-xs"
          >
            Article &agrave; la une
          </Badge>
          <h3 className="text-xl font-heading font-bold leading-tight text-nealma-text group-hover:text-nealma-400 transition-colors sm:text-2xl">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm leading-relaxed text-nealma-text-light line-clamp-3">
              {excerpt}
            </p>
          )}
          <p className="text-xs text-nealma-text-light/70">
            {formattedDate && <>{formattedDate} &middot; </>}
            {readingTime}
          </p>
          <div className="pt-1">
            <Button size="sm" className="pointer-events-none">
              Lire l&apos;article &rarr;
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
