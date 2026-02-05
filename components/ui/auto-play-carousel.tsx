"use client"
import Image from "next/image"
import { useState, useCallback } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface AutoPlayCarouselProps {
  images: Array<{ src: string; alt: string; title?: string }>
  itemWidth?: number
  gap?: number
}

function CarouselImage({ src, alt, width, title }: { src: string; alt: string; width: number; title?: string }) {
  const [imgSrc, setImgSrc] = useState(src || "/thumb-fallback.jpg")
  
  const handleError = useCallback(() => {
    setImgSrc("/thumb-fallback.jpg")
  }, [])
  
  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ minWidth: `${width}px` }}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={width}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        quality={75}
        onError={handleError}
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="font-bold text-white text-sm">{title}</h3>
        </div>
      )}
    </div>
  )
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
            <CarouselImage 
              src={item.src} 
              alt={item.alt} 
              width={itemWidth} 
              title={item.title} 
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
