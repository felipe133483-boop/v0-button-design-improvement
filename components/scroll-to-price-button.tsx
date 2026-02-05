"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowDown } from "lucide-react"

interface ScrollToPriceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant?: "primary" | "outline" | "glow"
}

const ScrollToPriceButton = React.forwardRef<HTMLButtonElement, ScrollToPriceButtonProps>(
  ({ className, children, variant = "glow", ...props }, ref) => {
    const handleClick = () => {
      const element = document.getElementById("preco-acesso-completo")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 cursor-pointer",
          // Glow variant - default solid green
          variant === "glow" && [
            "px-8 py-4 text-sm md:text-base",
            "bg-[#18a800]",
            "text-white shadow-lg shadow-green-500/30",
            "hover:bg-[#15940a] hover:shadow-xl hover:shadow-green-500/40 hover:scale-105",
            "active:scale-95",
          ],
          // Primary variant - solid green
          variant === "primary" && [
            "px-8 py-4 text-sm md:text-base",
            "bg-[#18a800] text-white",
            "hover:bg-[#15940a] hover:scale-105",
            "shadow-lg shadow-green-500/25",
            "active:scale-95",
          ],
          // Outline variant
          variant === "outline" && [
            "px-8 py-4 text-sm md:text-base",
            "border-2 border-[#18a800] text-[#18a800]",
            "hover:bg-[#18a800] hover:text-white hover:scale-105",
            "bg-transparent",
            "active:scale-95",
          ],
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 tracking-wide">
          {children || "QUERO POR R$27,90"}
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </span>
      </button>
    )
  }
)

ScrollToPriceButton.displayName = "ScrollToPriceButton"

export { ScrollToPriceButton }
