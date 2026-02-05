"use client"

import { useState, useEffect } from "react"

export function DigitalCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 45,
    seconds: 12,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  return (
    <div className="flex items-center justify-center gap-1 text-[#FF0000] font-mono text-5xl md:text-7xl font-bold tracking-wider">
      <span className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">{formatNumber(timeLeft.hours)}</span>
      <span className="animate-pulse">:</span>
      <span className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">{formatNumber(timeLeft.minutes)}</span>
      <span className="animate-pulse">:</span>
      <span className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">{formatNumber(timeLeft.seconds)}</span>
    </div>
  )
}
