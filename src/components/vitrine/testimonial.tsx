import { Quote, Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  service: string;
  rating?: number;
}

export function Testimonial({ quote, author, service, rating = 5 }: TestimonialProps) {
  return (
    <figure className="rounded-2xl bg-nealma-bg-warm p-6 shadow-sm sm:p-8">
      <Quote className="size-8 text-nealma-200" aria-hidden="true" />
      <blockquote className="mt-4">
        <p className="text-base leading-relaxed text-nealma-text">{quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-nealma-border/40 pt-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-nealma-100 font-heading text-sm text-nealma-500">
          {author.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-nealma-text">{author}</p>
          <p className="text-xs text-nealma-text-light">{service}</p>
        </div>
        <div className="ml-auto flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-nealma-300 text-nealma-300" />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
