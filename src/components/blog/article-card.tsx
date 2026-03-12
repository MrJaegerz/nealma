import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  coverImageUrl,
  publishedAt,
}: ArticleCardProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(publishedAt))
    : null;

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg h-full">
        {coverImageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {!coverImageUrl && (
          <div className="aspect-[16/9] bg-gradient-to-br from-nealma-50 to-nealma-100" />
        )}
        <CardContent className="pt-4">
          <h3 className="text-lg font-heading font-semibold text-nealma-text group-hover:text-nealma-400 transition-colors line-clamp-2">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-sm text-nealma-text-light line-clamp-3">
              {excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          {formattedDate && (
            <Badge variant="secondary" className="text-xs">
              {formattedDate}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
