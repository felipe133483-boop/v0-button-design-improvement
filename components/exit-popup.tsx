"use client"

import { useCallback } from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

export function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Detect when mouse leaves from the top of the page (exit intent)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem("exitPopupShown", "true")
      }
    },
    [hasShown],
  )

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    // Check if popup has already been shown in this session
    const popupShown = sessionStorage.getItem("exitPopupShown")
    if (popupShown) {
      setHasShown(true)
      return
    }

    // Add event listener for mouse movement
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasShown])

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 z-50 animate-in fade-in duration-300" onClick={handleClose} />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors z-10"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Content */}
          <div className="p-6 md:p-8 bg-[rgba(20,20,20,1)] border-[rgba(255,255,255,1)]">
            {/* Headline */}
            <h2 className="md:text-3xl font-bold text-center text-white mb-4 text-lg">
              <span className="text-[#FF0000] font-black text-[rgba(255,33,33,1)]">ÚLTIMA CHANCE!</span> Pegue AGORA o
              acesso completo + todos os bônus por apenas <span className="text-[#00BB1A]">R$12,99!</span>
            </h2>

            {/* Subheadline */}
            <p className="md:text-lg text-center mb-6 text-xs text-white">
              Oferta única de último minuto: curso <strong>FELICIDADE DELAS</strong> + TODOS os bônus e super-bônus.{" "}
              <span className="line-through text-red-400">Valor real R$594</span>{" "}
              <span className="text-[#00BB1A] font-bold text-xl">AGORA por R$12,99!</span>
            </p>

            {/* Bullets */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00BB1A] flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm md:text-base text-gray-200 font-medium">Acesso completo imediato</p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🎁</span>
                <p className="md:text-base font-medium text-xs text-white">
                  Bônus: Curso Adeus Ejaculação Precoce (R$497) TOTALMENTE GRÁTIS!
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🔒</span>
                <p className="md:text-base font-medium text-xs text-card">
                  Pagamento seguro e discreto sem exposição no trabalho
                </p>
              </div>
            </div>

            {/* Urgency Line */}
            <div className="bg-[#FF0000] text-white text-center py-3 px-4 rounded-lg mb-6">
              <p className="text-sm md:text-base font-bold">⚠️ Promoção válida apenas para quem COMPRAR AGORA!</p>
            </div>

            {/* CTA Button */}
            <a
              href="https://www.ggcheckout.com/checkout/v2/gANnaS4XqYgPAvGfWYxb"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4"
            >
              <Button className="w-full bg-[#00BB1A] hover:bg-[#009914] text-white font-bold py-6 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
                QUERO ESSA OFERTA — R$12,99
              </Button>
            </a>

            {/* Guarantee */}
            <p className="text-xs md:text-sm text-center text-primary-foreground">
              🛡️ 15 DIAS DE GARANTIA, se não for o que esperava, suporte disponível.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
