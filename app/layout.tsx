import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Metodo Felicidade Delas",
  description: "Created with v0",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0c0c0c",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        
        {/* Critical preconnects - establish connections early */}
        <link rel="preconnect" href="https://cdn.utmify.com.br" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Vimeo DNS prefetch - lazy connect since video is user-triggered */}
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://f.vimeocdn.com" />
        
        {/* Preload LCP candidate - hero background image with highest priority */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/design-mode/Site-de-Lan%C3%A7amento-de-Beleza-Fotogr%C3%A1fico-Creme-e-Marrom.webp" 
          fetchPriority="high"
          type="image/webp"
        />
        
        {/* Preload hero video thumbnail - second priority for above-fold content */}
        <link rel="preload" as="image" href="/images/hero-video-thumb.webp" type="image/webp" />

        {/* UTMify tracking - strategy afterInteractive to not block FCP */}
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "69780008a73ed2bed0c0752d";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
