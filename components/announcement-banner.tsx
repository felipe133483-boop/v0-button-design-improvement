"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface AnnouncementBannerProps {
  text: string
  couponCode?: string
  discount?: string
}

export function AnnouncementBanner({
  text = 'Só no mês de novembro: Finalize sua compra com o cupom "blackfriday" e ganhe R$50 de desconto.',
  couponCode,
  discount,
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const parts = text.split("R$47,90")

  return (
    <div className="w-full bg-[#ff4a4a] py-3 px-4 flex items-center justify-center relative">
      <div className="flex items-center justify-center gap-2 max-w-6xl mx-auto text-center">
        <span className="text-white text-sm md:text-base font-medium">
          {parts[0]}
          <span className="font-bold mx-1 bg-white px-2 py-1 rounded inline-block text-[#ff4a4a]">R$27,90</span>
          {parts[1]}
          {couponCode && (
            <span className="font-bold mx-1 bg-opacity-30 px-2 py-1 rounded inline-block bg-[rgba(224,224,224,1)] text-[rgba(77,77,77,1)]">
              "{couponCode}"
            </span>
          )}
          {discount && <span className="font-bold ml-1">{discount}</span>}
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 text-white hover:opacity-80 transition-opacity"
        aria-label="Fechar banner"
      >
        
      </button>
    </div>
  )
}
