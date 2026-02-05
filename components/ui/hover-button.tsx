"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(({ className, children, ...props }, ref) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [isListening, setIsListening] = React.useState(false)
  const [circles, setCircles] = React.useState<
    Array<{
      id: number
      x: number
      y: number
      color: string
      fadeState: "in" | "out" | null
    }>
  >([])
  const lastAddedRef = React.useRef(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const createCircle = React.useCallback((x: number, y: number) => {
    const buttonWidth = buttonRef.current?.offsetWidth || 0
    const xPos = x / buttonWidth
    const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${xPos * 100}%)`

    setCircles((prev) => [...prev, { id: Date.now(), x, y, color, fadeState: null }])
  }, [])

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!isListening || prefersReducedMotion) return

      const currentTime = Date.now()
      if (currentTime - lastAddedRef.current > 100) {
        lastAddedRef.current = currentTime
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        createCircle(x, y)
      }
    },
    [isListening, createCircle, prefersReducedMotion],
  )

  const handlePointerEnter = React.useCallback(() => {
    setIsListening(true)
  }, [])

  const handlePointerLeave = React.useCallback(() => {
    setIsListening(false)
  }, [])

  React.useEffect(() => {
    circles.forEach((circle) => {
      if (!circle.fadeState) {
        requestAnimationFrame(() => {
          setCircles((prev) => prev.map((c) => (c.id === circle.id ? { ...c, fadeState: "in" } : c)))
        })

        const fadeOutTimer = setTimeout(
          () => {
            setCircles((prev) => prev.map((c) => (c.id === circle.id ? { ...c, fadeState: "out" } : c)))
          },
          prefersReducedMotion ? 0 : 1000,
        )

        const removeTimer = setTimeout(
          () => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id))
          },
          prefersReducedMotion ? 1 : 2200,
        )

        return () => {
          clearTimeout(fadeOutTimer)
          clearTimeout(removeTimer)
        }
      }
    })
  }, [circles, prefersReducedMotion])

  return (
    <button
      ref={buttonRef || ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative overflow-hidden rounded-lg font-bold text-white transition-all duration-200 bg-[#22C55E] hover:bg-[#16A34A] text-sm tracking-widest leading-4 text-center",
        className,
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center text-center flex-row gap-0 mx-3.5 tracking-normal leading-3 text-sm">
        {children}
      </div>

      {!prefersReducedMotion &&
        circles.map((circle) => (
          <div
            key={circle.id}
            className={cn(
              "absolute rounded-full pointer-events-none",
              circle.fadeState === "in" && "animate-in fade-in",
              circle.fadeState === "out" && "animate-out fade-out",
            )}
            style={{
              left: circle.x,
              top: circle.y,
              width: "40px",
              height: "40px",
              transform: "translate(-50%, -50%)",
              background: circle.color,
              opacity: circle.fadeState === "out" ? 0 : 0.6,
              transition: circle.fadeState ? "opacity 1.2s ease-out" : "none",
            }}
          />
        ))}
    </button>
  )
})

HoverButton.displayName = "HoverButton"

export { HoverButton }
