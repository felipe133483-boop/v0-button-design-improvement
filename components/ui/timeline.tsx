"use client"
import type { ReactNode } from "react"

interface TimelineContainerProps {
  children: ReactNode
}

export function TimelineContainer({ children }: TimelineContainerProps) {
  return <div className="mx-auto flex max-w-4xl flex-col justify-center gap-3">{children}</div>
}

interface TimelineEventProps {
  label: string
  message: string
  isLast?: boolean
}

export function TimelineEvent({ label, message, isLast = false }: TimelineEventProps) {
  return (
    <div className="group relative -m-2 flex gap-4 border border-transparent p-2">
      <div className="relative">
        <div className="rounded-full border border-[#22C55E]/50 bg-black/20 p-2 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-[#22C55E]" />
        </div>
        {!isLast ? <div className="absolute inset-x-0 mx-auto h-12 w-[2px] bg-[#22C55E]/30 top-full" /> : null}
      </div>
      <div className="mt-1 flex flex-1 flex-col gap-1 pb-4">
        <p className="text-base md:text-lg font-semibold text-[#22C55E]">{label}</p>
        <p className="text-sm md:text-base text-[#CCCCCC] text-foreground">{message}</p>
      </div>
    </div>
  )
}

interface TimelineProps {
  events: TimelineEventProps[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="w-full">
      <TimelineContainer>
        {events.map((event, i) => (
          <TimelineEvent key={i} isLast={i === events.length - 1} {...event} />
        ))}
      </TimelineContainer>
    </div>
  )
}
