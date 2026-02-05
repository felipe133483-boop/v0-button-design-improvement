"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface AutoCarouselProps {
  children: ReactNode
  className?: string
  itemWidth?: number
  interval?: number
}

export function AutoCarousel({ children, className = "", itemWidth = 300, interval = 3000 }: AutoCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const autoScroll = setInterval(() => {
      requestAnimationFrame(() => {
        const maxScroll = container.scrollWidth - container.clientWidth
        const currentScroll = container.scrollLeft

        if (currentScroll >= maxScroll - 10) {
          container.scrollLeft = 0
        } else {
          container.scrollLeft = currentScroll + itemWidth + 16
        }
      })
    }, interval)

    return () => {
      clearInterval(autoScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [itemWidth, interval])

  const combinedClassName = ["flex", "gap-4", "overflow-x-auto", "pb-4", "scroll-smooth", className]
    .filter(Boolean)
    .join(" ")

  return (
    <div ref={scrollContainerRef} className={combinedClassName}>
      {children}
    </div>
  )
}
