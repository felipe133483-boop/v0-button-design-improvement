"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface UpsellPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpsellPopup({ open, onOpenChange }: UpsellPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white border-0 shadow-2xl">
        {/* Blue Header */}
        <div className="bg-[#006eff] text-white text-center py-4 px-6 rounded-t-lg">
          <h2 className="text-xl font-bold">ACESSO COMPLETO:</h2>
          <p className="text-sm font-semibold mt-1">De R$97 POR APENAS R$21,99</p>
        </div>

        {/* White Body */}
        <div className="bg-white p-6 rounded-b-lg">
          {/* Price Display */}
          <div className="text-center mb-6">
            <div className="flex items-start justify-center gap-1">
              <span className="text-lg text-gray-600 mt-2">R$</span>
              <span className="text-6xl font-bold text-gray-900">21</span>
              <span className="text-lg text-gray-600 mt-2">,99</span>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            {[
              "Mais de 33 aulas em 7 módulos",
              "Aulas explícitas",
              "Acesso imediato",
              "Área de membros",
              "Atualizações gratuitas",
              "Garantia extra de 30 dias",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#18a800] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 uppercase">{benefit}</span>
              </div>
            ))}

            {/* Bonus Item */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
              <span className="text-xl">🎁</span>
              <span className="text-sm font-bold text-gray-900 uppercase">GANHE E-BOOK DE R$49,90 GRÁTIS</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {/* Green Button - Complete Access */}
            <a
              href="https://www.ggcheckout.com/checkout/v5/SYwxhjBa0TXYiKrVUilz"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-gradient-to-r from-[#18a800] to-[#1ac000] hover:from-[#1ac000] hover:to-[#18a800] text-white font-bold py-6 rounded-lg text-sm shadow-[0_4px_14px_0_rgba(24,168,0,0.39)] hover:shadow-[0_6px_20px_rgba(24,168,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#20d000]/30">
                👉 QUERO O ACESSO COMPLETO
              </Button>
            </a>

            {/* Red Button - Basic Access */}
            <a
              href="https://www.ggcheckout.com/checkout/v2/VjHdYHPKZSFMGWIdU1GD"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#dc2626] text-white font-bold py-6 rounded-lg text-sm shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#ef4444]/30">
                ❌ Prefiro o acesso básico por R$17,90
              </Button>
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-center text-gray-400 mt-4">
            Atenção: este é o acesso completo com preço promocional.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
