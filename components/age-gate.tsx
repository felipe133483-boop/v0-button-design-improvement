"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon } from "lucide-react"

export function AgeGate() {
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const handleContinue = useCallback(() => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.style.filter = ""
      mainContent.style.pointerEvents = ""
      mainContent.style.transition = prefersReducedMotion ? "none" : "filter 0.15s ease-out"
    }

    setIsClosing(true)
    document.body.style.overflow = ""

    setTimeout(
      () => {
        setIsVisible(false)
      },
      prefersReducedMotion ? 0 : 300,
    )
  }, [prefersReducedMotion])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      const isMobile = window.innerWidth < 768
      mainContent.style.filter = isMobile ? "" : "blur(6px)"
      mainContent.style.pointerEvents = "none"
      mainContent.style.transition = prefersReducedMotion ? "none" : "filter 0.15s ease-out"
    }

    return () => {
      document.body.style.overflow = ""
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.style.filter = ""
        mainContent.style.pointerEvents = ""
        mainContent.style.transition = ""
      }
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isVisible) return

    const focusableElements = document.querySelectorAll(
      '#age-gate-card button, #age-gate-card [href], #age-gate-card input, #age-gate-card select, #age-gate-card textarea, #age-gate-card [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const continueButton = document.getElementById("age-continue")
    if (continueButton) {
      continueButton.focus()
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    document.addEventListener("keydown", handleTabKey)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleTabKey)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      id="age-gate-overlay"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-none transition-opacity ${prefersReducedMotion ? "duration-75" : "duration-300"} ${isClosing ? "opacity-0" : "opacity-100"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div
        id="age-gate-card"
        className={`bg-white rounded-2xl shadow-2xl w-[90vw] max-w-[520px] p-6 md:p-8 relative z-[10000] transition-all ${prefersReducedMotion ? "duration-75" : "duration-300"} ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
        style={{ filter: "none" }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#00BB1A] flex items-center justify-center">
            <AlertTriangleIcon className="w-9 h-9 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 id="age-gate-title" className="text-2xl md:text-3xl font-bold text-[#121212] text-center mb-4">
          Você tem mais de 18 anos?
        </h1>

        <p className="text-sm md:text-base text-[#4B5563] text-center mb-8">
          Clique no botão abaixo se você é maior e quer assistir a apresentação completa.
        </p>

        <div className="flex justify-center mb-6">
          <Button
            id="age-continue"
            onClick={handleContinue}
            className="bg-[#00BB1A] hover:bg-[#00a017] text-white font-bold text-base md:text-lg h-12 md:h-14 px-8 rounded-lg w-full md:w-[260px] transition-colors"
          >
            ASSISTIR AGORA →
          </Button>
        </div>

        <p className="text-xs text-center text-[#6B7280]">Copyright 2026 – Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
