import type React from "react"

interface AnimatedGlowingBorderProps {
  children: React.ReactNode
  className?: string
}

export const AnimatedGlowingBorder: React.FC<AnimatedGlowingBorderProps> = ({ children, className = "" }) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative flex items-center justify-center group w-full">
        {/* Outer glow layers with conic gradients */}
        <div
          className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[60deg]
                        before:bg-[conic-gradient(#000,#FF4A4A_5%,#000_38%,#000_50%,#22C55E_60%,#000_87%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-120deg]"
        ></div>

        <div
          className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#C1272D,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#16A34A,rgba(0,0,0,0)_60%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-98deg]"
        ></div>

        <div
          className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#C1272D,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#16A34A,rgba(0,0,0,0)_60%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-98deg]"
        ></div>

        <div
          className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#C1272D,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#16A34A,rgba(0,0,0,0)_60%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-98deg]"
        ></div>

        {/* Mid-layer glow with lighter colors */}
        <div
          className="absolute z-[-1] overflow-hidden h-full w-full rounded-lg blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#FF6B6B,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#4ADE80,rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-97deg]"
        ></div>

        {/* Inner border layer */}
        <div
          className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[70deg]
                        before:bg-[conic-gradient(#1c191c,#FF4A4A_5%,#1c191c_14%,#1c191c_50%,#22C55E_60%,#1c191c_64%)] before:brightness-130
                        before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-110deg]"
        ></div>

        {/* Content wrapper */}
        <div className={`relative w-full ${className}`}>{children}</div>
      </div>
    </div>
  )
}

export default AnimatedGlowingBorder
