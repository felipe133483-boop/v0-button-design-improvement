"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Clock, Gift } from "lucide-react"

const FIFTEEN_MINUTES_IN_SECONDS = 15 * 60

export function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(FIFTEEN_MINUTES_IN_SECONDS)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // Check if there's a saved start time in sessionStorage
    const savedStartTime = sessionStorage.getItem("countdownStartTime")
    
    if (savedStartTime) {
      startTimeRef.current = parseInt(savedStartTime, 10)
    } else {
      startTimeRef.current = Date.now()
      sessionStorage.setItem("countdownStartTime", startTimeRef.current.toString())
    }

    const updateCountdown = () => {
      if (startTimeRef.current === null) return
      
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const remaining = Math.max(0, FIFTEEN_MINUTES_IN_SECONDS - elapsed)
      setSecondsLeft(remaining)
      
      // Reset timer when it reaches 0
      if (remaining === 0) {
        startTimeRef.current = Date.now()
        sessionStorage.setItem("countdownStartTime", startTimeRef.current.toString())
        setSecondsLeft(FIFTEEN_MINUTES_IN_SECONDS)
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    }
  }, [secondsLeft])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#C1272D] py-2.5 px-4 border-b-4 border-[#C1272D]">
      <div className="flex items-center justify-center gap-2 text-white">
        <Clock className="w-5 h-5" />
        
        <span className="md:text-base font-semibold text-center leading-5 tracking-wide text-xs">
          OFERTA TERMINA EM: 
        </span>
        <span className="text-sm md:text-base font-bold ml-2 tabular-nums">
          00:{formattedTime.minutes}:{formattedTime.seconds}
        </span>
      </div>
    </div>
  )
}
