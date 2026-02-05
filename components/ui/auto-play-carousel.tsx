"use client"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface AutoPlayCarouselProps {
  images: Array<{ src: string; alt: string; title?: string }>
  itemWidth?: number
  gap?: number
}

export function AutoPlayCarousel({ images, itemWidth = 350 }: AutoPlayCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {images.map((item, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="relative w-full overflow-hidden rounded-lg" style={{ minWidth: `${itemWidth}px` }}>
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                width={itemWidth}
                height={itemWidth}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                quality={75}
              />
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
