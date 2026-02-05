"use client"
import type React from "react"

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  // Simplified component - static content without framer-motion
  // to reduce JS bundle size (~60KB) and improve mobile performance
  return (
    <div className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto text-center mb-6">{titleComponent}</div>
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-full w-full overflow-hidden rounded-2xl dark:bg-zinc-900 md:rounded-2xl md:p-4 bg-background border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}

// Header and Card components removed - not used and were importing framer-motion
