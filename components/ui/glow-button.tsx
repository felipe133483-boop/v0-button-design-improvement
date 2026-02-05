"use client"

import type React from "react"
import { cn } from "@/lib/utils"

type GlowButtonBaseProps = {
  children: React.ReactNode
  className?: string
}

type GlowButtonAsButton = GlowButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof GlowButtonBaseProps> & {
    as?: "button"
    href?: never
  }

type GlowButtonAsAnchor = GlowButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof GlowButtonBaseProps> & {
    as: "a"
    href: string
  }

type GlowButtonProps = GlowButtonAsButton | GlowButtonAsAnchor

export function GlowButton({ children, className, as, ...props }: GlowButtonProps) {
  // Use CSS media query instead of JS for reduced motion - better performance
  // The motion:hover:scale-105 class handles prefers-reduced-motion via CSS
  const sharedClassName = cn(
    "relative px-8 py-3 rounded-full font-bold text-white md:text-lg tracking-tighter leading-6 text-sm",
    "bg-gradient-to-r from-green-500 via-green-400 to-emerald-500",
    "hover:scale-105 motion-reduce:hover:scale-100",
    "transition-all duration-300 motion-reduce:duration-75",
    "ease-out",
    "inline-block text-center",
    className,
  )

  if (as === "a") {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <div className="relative inline-block">
        <a
          className={sharedClassName}
          {...anchorProps}
        >
          {children}
        </a>
      </div>
    )
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <div className="relative inline-block">
      <button
        className={sharedClassName}
        {...buttonProps}
      >
        {children}
      </button>
    </div>
  )
}
