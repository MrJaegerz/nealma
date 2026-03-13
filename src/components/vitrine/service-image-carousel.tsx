"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ServiceImageCarouselProps {
  images: { src: string; alt: string }[];
}

export function ServiceImageCarousel({ images }: ServiceImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main carousel */}
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="group relative overflow-hidden rounded-2xl"
      >
        <CarouselContent className="-ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-3 top-1/2 opacity-0 transition-opacity group-hover:opacity-100 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:bg-white" />
            <CarouselNext className="right-3 top-1/2 opacity-0 transition-opacity group-hover:opacity-100 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:bg-white" />

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </Carousel>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 sm:h-20 sm:w-24",
                current === index
                  ? "ring-2 ring-nealma-400 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
