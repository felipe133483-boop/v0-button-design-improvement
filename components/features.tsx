"use client"

import { Zap, Smile, Target, Crown, Heart } from "lucide-react"

export default function Features() {
  return (
    <div className="w-full py-12 md:py-16 bg-[rgba(0,0,0,1)]">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">Por que escolher FELICIDADE DELAS?</h3>
        </div>

        <div className="grid gap-0 md:grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
          <div className="space-y-3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-300">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-[#E63946] flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg font-medium text-foreground">
                Fazer qualquer mulher gozar várias vezes seguidas...
              </p>
            </div>
          </div>

          <div className="space-y-3 p-6 md:p-8 border-b md:border-b border-gray-300">
            <div className="flex items-start gap-3">
              <Smile className="h-6 w-6 text-[#E63946] flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg font-medium text-foreground">
                Transformar insegurança em confiança total...
              </p>
            </div>
          </div>

          <div className="space-y-3 p-6 md:p-8 border-b border-gray-300 md:border-b-0 md:border-r">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-[#E63946] flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg font-medium text-foreground">
                Ser o único capaz de satisfazer ela de verdade...
              </p>
            </div>
          </div>

          <div className="space-y-3 p-6 md:p-8 border-b md:border-b-0 border-gray-300">
            <div className="flex items-start gap-3">
              <Crown className="h-6 w-6 text-[#E63946] flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg font-medium text-foreground">
                Ter domínio completo na hora H, sem falhar...
              </p>
            </div>
          </div>

          <div className="space-y-3 p-6 md:p-8 md:col-span-2 border-t border-gray-300">
            <div className="flex items-start gap-3">
              <Heart className="h-6 w-6 text-[#E63946] flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg font-medium text-foreground">
                Virar o homem que toda mulher deseja repetir
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
