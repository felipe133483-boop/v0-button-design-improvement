"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Check,
  Heart,
  Shield,
  Award,
  Clock,
  Zap,
  Target,
  TrendingUp,
  Flame,
  Play,
  Lock,
  HelpCircle,
  RefreshCw,
  Users,
  CreditCard,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import { CountdownTimer } from "@/components/countdown-timer"
import { AgeGate } from "@/components/age-gate"
// REMOVED: import { UTMLink } from "@/components/utm-link" // Removed UTMLink import
import { WhatsAppButton } from "@/components/whatsapp-button"
import { EditMode } from "@/components/edit-mode"
import { useState, useEffect, useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import { HoverButton } from "@/components/ui/hover-button"
import { ScrollToPriceButton } from "@/components/scroll-to-price-button"

// Dynamic imports for below-the-fold components to reduce initial JS bundle
const AutoPlayCarousel = dynamic(
  () => import("@/components/ui/auto-play-carousel").then((mod) => ({ default: mod.AutoPlayCarousel })),
  { ssr: false, loading: () => <div style={{ height: "350px" }} /> }
)

const MembersAreaSection = dynamic(
  () => import("@/components/members-area-section").then((mod) => ({ default: mod.MembersAreaSection })),
  { ssr: false, loading: () => <div style={{ height: "400px" }} /> }
)

const Timeline = dynamic(
  () => import("@/components/ui/timeline").then((mod) => ({ default: mod.Timeline })),
  { ssr: false, loading: () => <div style={{ height: "600px" }} /> }
)

const AnimatedGlowingBorder = dynamic(
  () => import("@/components/ui/animated-glowing-border").then((mod) => ({ default: mod.AnimatedGlowingBorder })),
  { ssr: false }
)

const MovingBorderButton = dynamic(
  () => import("@/components/ui/moving-border").then((mod) => ({ default: mod.Button })),
  { ssr: false }
)

export default function FelicidadeDelasLanding() {
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false)
  const [secondVideoLoaded, setSecondVideoLoaded] = useState(false)
  const [bonusVideoLoaded, setBonusVideoLoaded] = useState(false)
  const [heroVideoPreloaded, setHeroVideoPreloaded] = useState(false)
  const [heroThumbError, setHeroThumbError] = useState(false)
  const [secondThumbError, setSecondThumbError] = useState(false)
  const heroVideoRef = useRef<HTMLDivElement>(null)

  // Preload Vimeo iframe on hover/touch for faster video start
  const preloadHeroVideo = useCallback(() => {
    if (heroVideoPreloaded) return
    setHeroVideoPreloaded(true)
    // Warm up Vimeo connection by prefetching the player
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = 'https://player.vimeo.com/video/1083222594?h=607c4f0317&badge=0&autopause=0&player_id=0&app_id=58479'
    link.as = 'document'
    document.head.appendChild(link)
  }, [heroVideoPreloaded])

  // Preload hero video after initial page load for faster playback
  useEffect(() => {
    // Use requestIdleCallback to preload during browser idle time
    const preloadVideo = () => {
      if (heroVideoPreloaded || heroVideoLoaded) return
      
      // Prefetch the Vimeo player iframe
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = 'https://player.vimeo.com/video/1083222594?h=607c4f0317&badge=0&autopause=0&player_id=0&app_id=58479'
      link.as = 'document'
      document.head.appendChild(link)
      
      setHeroVideoPreloaded(true)
    }

    // Delay preloading to not block initial render
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(preloadVideo, { timeout: 3000 })
      return () => cancelIdleCallback(idleCallbackId)
    } else {
      const timeoutId = setTimeout(preloadVideo, 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [heroVideoPreloaded, heroVideoLoaded])

  const students = [
    {
      id: 1,
      name: "Carlos",
      designation: "Aluno a 3 meses",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    },
    {
      id: 2,
      name: "Bruno",
      designation: "Aluno a 7 meses",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    },
    {
      id: 3,
      name: "Pedro",
      designation: "Aluno a 5 meses",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    },
    {
      id: 4,
      name: "Rafael",
      designation: "Aluno a 10 meses",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917f42ef?w=100&h=100&fit=crop&crop=faces",
    },
    {
      id: 5,
      name: "Felipe",
      designation: "Aluno a 2 meses",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    },
    {
      id: 6,
      name: "Lucas",
      designation: "Aluno a 8 meses",
      image: "https://images.unsplash.com/photo-107003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    },
  ]

  useEffect(() => {
    // Only handle clicks on buttons that have specific scroll actions
    const handleButtonClicks = (e: Event) => {
      const target = e.target as HTMLElement
      const button = target.closest("button")

      if (!button) return

      // Get button text
      const buttonText = button.textContent || ""

      // Acesso Básico
      if (buttonText.includes("QUERO O ACESSO BÁSICO")) {
        window.location.href = "https://www.ggcheckout.com/checkout/v2/VjHdYHPKZSFMGWIdU1GD"
        return
      }

      // Acesso Completo
      if (buttonText.includes("QUERO O ACESSO COMPLETO")) {
        window.location.href = "https://www.ggcheckout.com/checkout/v2/SYwxhjBa0TXYiKrVUilz"
        return
      }

      // Skip accordion buttons and other special buttons
      if (
        button.hasAttribute("data-state") ||
        buttonText.includes("ASSISTIR AGORA") ||
        button.closest('[role="dialog"]') ||
        button.querySelector("svg.lucide-play")
      ) {
        return
      }
    }

    // Only add listener to document for non-interactive buttons
    document.addEventListener("click", handleButtonClicks, true)

    return () => {
      document.removeEventListener("click", handleButtonClicks, true)
    }
  }, [])

  

  return (
    <div className="min-h-screen bg-background pt-10">
      <EditMode />
      <AgeGate />

      <div id="main-content">
        <CountdownTimer />

        {/* Hero Section */}
        <section className="relative space-y-3 p-6 md:p-8 md:col-span-2 border-t border-[rgba(0,0,0,1)] overflow-hidden bg-[rgba(0,0,0,1)]">
          {/* Background Image - LCP Element */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/design-mode/hero-background.webp"
              alt="Background"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
              quality={75}
              decoding="sync"
              loading="eager"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content - positioned above background */}
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* FELICIDADE DELAS Logo */}
            <div className="mb-8 md:mb-12 flex justify-center"></div>

            <h1 className="text-balance mt-0 text-white text-center md:text-base font-bold tracking-tighter text-2xl leading-8">
              O PROBLEMA NÃO É DURAR POUCO <span className="text-[#FF4A4A] text-center">{"É NÃO FAZER ELA GOZAR ANTES DE VOCÊ!"}</span>
            </h1>

            <p className="text-white text-center md:text-base mt-4 mb-6 opacity-90 text-xs font-semibold tracking-normal leading-5">
              Assista ao vídeo abaixo e veja como fazer ela alcançar MÚLTIPLOS ORGASMOS!                                          
            </p>

            <div 
              ref={heroVideoRef}
              className="w-full max-w-2xl mx-auto aspect-video relative" 
              style={{ marginBottom: "var(--space-lg)" }}
            >
              {!heroVideoLoaded ? (
                <button
                  onClick={() => setHeroVideoLoaded(true)}
                  onMouseEnter={preloadHeroVideo}
                  onTouchStart={preloadHeroVideo}
                  onFocus={preloadHeroVideo}
                  className="w-full h-full relative group cursor-pointer"
                  aria-label="Reproduzir vídeo"
                >
                  <Image
                    src={heroThumbError ? "/thumb-fallback.jpg" : "/images/hero-video-thumb.webp"}
                    alt="Curso Felicidade Delas - Clique para assistir"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="rounded-lg shadow-2xl object-cover"
                    quality={80}
                    unoptimized
                    onError={() => setHeroThumbError(true)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors rounded-lg">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>
              ) : (
                <iframe
                  src="https://player.vimeo.com/video/1083222594?h=607c4f0317&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                  className="w-full h-full rounded-lg shadow-2xl border-0 aspect-video"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  title="Curso Felicidade Delas - Video Explicativo"
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>

<div
                              className="flex flex-col md:flex-row items-center justify-center w-full"
                              style={{ gap: "var(--space-lg)" }}
                            >
                              <ScrollToPriceButton className="w-full md:w-auto">QUERO ACESSO AGORA</ScrollToPriceButton>
              </div>
                        </div>
                      </section>

        {/* Success Testimonials Carousel */}
        <section
          className="section-spacing-mobile bg-[#1A1A1A] bg-[rgba(0,0,0,1)]"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          <div className="container mx-auto px-4 bg-[rgba(0,0,0,1)]">
            <div className="text-center" style={{ marginBottom: "var(--space-xl)" }}>
              <h2
                className="text-white tracking-tight leading-6 text-base font-semibold md:text-2xl"
                style={{ marginBottom: 0 }}
              >
                {"ESSES FEEDBACKS NÃO VÊM POR ACASO!"}
              </h2>
            </div>

            <div className="w-full max-w-6xl mx-auto">
              <AutoPlayCarousel
                images={[
                  {
                    src: "/images/captura-20de-20tela-202025-07-06-20125548.png",
                    alt: "Conversa com aluna mostrando resultado positivo",
                  },
                  {
                    src: "/images/captura-20de-20tela-202025-07-07-20000536.png",
                    alt: "Depoimento de aluna satisfeita",
                  },
                  {
                    src: "/images/captura-20de-20tela-202025-07-06-20125527.png",
                    alt: "Feedback positivo de aluna",
                  },
                  {
                    src: "/images/captura-20de-20tela-202025-07-06-20125604.png",
                    alt: "Aluno compartilhando sucesso após o curso",
                  },
                ]}
                itemWidth={350}
                gap={16}
              />
            </div>

            <div className="flex justify-center mt-8">
              <ScrollToPriceButton>QUERO ESSES RESULTADOS</ScrollToPriceButton>
            </div>
            </div>
        </section>

        <section
          id="choque-realidade"
          className="relative container mx-auto px-4 section-spacing-mobile overflow-hidden bg-black"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-balance text-white text-lg leading-6 tracking-tight md:text-2xl text-center">
              ASSISTA O VÍDEO ABAIXO E VEJA COMO É NOSSA PLATAFORMA!              
            </h2>

            <div className="w-full max-w-3xl mx-auto aspect-video relative" style={{ marginBottom: "var(--space-xl)" }}>
              {!secondVideoLoaded ? (
                <button
                  onClick={() => setSecondVideoLoaded(true)}
                  onMouseEnter={() => {
                    // Prefetch this video on hover
                    const link = document.createElement('link')
                    link.rel = 'prefetch'
                    link.href = 'https://player.vimeo.com/video/1115011868?badge=0&autopause=0&player_id=0&app_id=58479'
                    link.as = 'document'
                    if (!document.querySelector(`link[href="${link.href}"]`)) {
                      document.head.appendChild(link)
                    }
                  }}
                  className="w-full h-full relative group cursor-pointer"
                  aria-label="Reproduzir vídeo de acesso"
                >
                  <Image
                    src={secondThumbError ? "/thumb-fallback.jpg" : "/images/access-video-thumb.webp"}
                    alt="Como acessar o conteudo - Clique para assistir"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="rounded-lg shadow-2xl object-cover"
                    quality={80}
                    unoptimized
                    onError={() => setSecondThumbError(true)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors rounded-lg">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>
              ) : (
                <iframe
                  src="https://player.vimeo.com/video/1115011868?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                  className="w-full h-full rounded-lg shadow-2xl border-0 aspect-video"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  title="Como acessar o conteudo"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <ScrollToPriceButton>QUERO MUDAR AGORA</ScrollToPriceButton>
            </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-4 bg-black">
          {/* <MembersAreaSection /> -- Replaced with dynamic import */}
          <MembersAreaSection />
        </section>

        {/* Premium Benefits */}
        <section
          className="section-spacing-mobile bg-[#1A1A1A] bg-[rgba(0,0,0,1)]"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          <div className="container mx-auto px-4 bg-[rgba(0,0,0,1)]">
            <div id="pra-quem-e" className="text-center" style={{ marginBottom: "var(--space-xl)" }}>
              <h2
                className="font-bold text-white text-xl tracking-tight leading-6 md:text-2xl"
                style={{ marginBottom: 0 }}
              >
                ESSE CONTEUDO É PRA QUEM QUER...
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto" style={{ gap: "var(--space-xl)" }}>
              <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-0 flex flex-col items-center text-center" style={{ gap: "var(--space-md)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white">
                    <Clock className="w-8 h-8 text-[rgba(255,0,0,1)]" />
                  </div>
                  <p className="text-base font-medium leading-relaxed text-card" style={{ marginBottom: 0 }}>
                    Parar de gozar antes da hora, mesmo achando que “sempre foi assim” ou que isso não tem solução.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-0 flex flex-col items-center text-center" style={{ gap: "var(--space-md)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-foreground">
                    <Target className="w-8 h-8 text-[rgba(255,0,0,1)]" />
                  </div>
                  <p className="text-base font-medium leading-relaxed text-card" style={{ marginBottom: 0 }}>
                    Ter controle sem precisar de remédio, bebida ou truque estranho, usando método e condução de verdade.    
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-0 flex flex-col items-center text-center" style={{ gap: "var(--space-md)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-foreground">
                    <Flame className="w-8 h-8 text-[rgba(255,0,0,1)]" />
                  </div>
                  <p className="text-base font-medium leading-relaxed text-card" style={{ marginBottom: 0 }}>
                    Se tornar magnético na cama, parando de depender de tamanho, idade ou “talento” e passando a gerar desejo pela forma como conduz e se impõe.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-0 flex flex-col items-center text-center" style={{ gap: "var(--space-md)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-foreground">
                    <Zap className="w-8 h-8 text-[rgba(255,0,0,1)]" />
                  </div>
                  <p className="text-base font-medium leading-relaxed text-card" style={{ marginBottom: 0 }}>
                    Parar de ficar ansioso na hora decisiva, deixando de pensar demais e se autojulgar e passar a transmitir presença, calma e domínio que ela sente na pele, sem você precisar provar nada.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-10">
              <ScrollToPriceButton>QUERO COMEÇAR HOJE</ScrollToPriceButton>
            </div>
</div>
        </section>

        {/* Bonus Section */}
        <section
          className="container mx-auto px-4 section-spacing-mobile bg-[rgba(0,0,0,1)]"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="font-bold text-balance text-white text-center leading-6 tracking-tight text-xl"
              style={{ marginBottom: "var(--space-md)" }}
            >
              NO CARNAVAL A GENTE TÁ DANDO BRINDE TAMBÉM!
            </h2>
            <p
              className="text-base md:text-lg text-pretty leading-relaxed text-[#CCCCCC] text-foreground"
              style={{ marginBottom: "var(--space-2xl)" }}
            >
              TUDO ISSO INCLUÍDO SÓ NESSA PROMOÇÃO DE CARNAVAL!
            </p>

            <div className="max-w-3xl mx-auto" style={{ marginBottom: "var(--space-2xl)" }}>
              <Image
                src="/images/bonus-768x512.webp"
                alt="Bônus exclusivos do programa"
                width={768}
                height={512}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full rounded-lg shadow-lg h-auto"
              />
            </div>

            <div className="max-w-3xl mx-auto space-y-6" style={{ marginBottom: "var(--space-2xl)" }}>
              <Card className="p-6 bg-white text-left">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">🎁</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-background">Técnicas de Dirty Talk</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      Fala suja sem ser ridículo - aprenda a falar na hora certa e deixar ela louca só com palavras.
                    </p>
                    <p className="font-semibold text-[#18a800]">
                      De <span className="line-through text-red-600 uppercase font-bold">R$67</span> por{" "}
                      <span className="text-xl">GRÁTIS </span> no ACESSO COMPLETO!
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white text-left">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">🎁</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-background">Como deixar ela viciada em você</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      Técnicas avançadas para fazer ela não conseguir parar de pensar em você depois da transa.
                    </p>
                    <p className="font-semibold text-[#18a800]">
                      De <span className="line-through text-red-600 uppercase font-bold">R$87</span> por{" "}
                      <span className="text-xl">GRÁTIS </span> no ACESSO COMPLETO!
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white text-left">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">🎁</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-background">Manual do Pós-Gozo</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-3">
                      Fidelização garantida - o que fazer depois do ato para ela sempre querer mais.
                    </p>
                    <p className="font-semibold text-[#18a800]">
                      De <span className="line-through text-red-600 uppercase font-bold">R$107</span> por{" "}
                      <span className="text-xl">GRÁTIS </span> no ACESSO COMPLETO!
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <ScrollToPriceButton>QUERO OS BÔNUS GRÁTIS</ScrollToPriceButton>
            </div>
</div>
        </section>

        {/* Student Testimonials Section */}

        {/* Security and Privacy Section */}
        <section
          className="container mx-auto px-4 section-spacing-mobile bg-[rgba(0,0,0,1)]"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-balance text-white text-lg leading-6 tracking-tight md:text-2xl text-center">
              GARANTIA CARNAVALESCA DE PRAZER OU SEU DINHEIRO DE VOLTA
            </h2>

            <AnimatedGlowingBorder className="rounded-lg shadow-2xl">
              <div className="rounded-lg shadow-xl p-6 md:p-8 bg-[#1A1A1A]">
                <div className="flex justify-center mb-8"></div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center mt-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="md:text-lg leading-relaxed text-[#CCCCCC] text-left text-sm text-foreground">
                      Se tu aplicar a técnica e ela não pedir bis, devolvemos seu dinheiro.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center mt-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="md:text-lg leading-relaxed text-[#CCCCCC] text-sm text-left text-foreground">
                      SEM FRESCURA. SEM BLÁ BLÁ BLÁ.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF4A4A] flex items-center justify-center mt-1">
                      <span className="text-white text-base">🎁</span>
                    </div>
                    <p className="md:text-lg leading-relaxed text-[#CCCCCC] text-sm text-left bg-secondary text-foreground">
                      Compra 100% sigilosa - ninguém vai saber.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center mt-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="md:text-lg leading-relaxed text-[#CCCCCC] text-sm text-left text-foreground">
                      Garantia de 7 dias: se não gostar, devolvemos seu dinheiro sem burocracia.
                    </p>
                  </div>
                </div>

                {/* How it Works Timeline */}
                <div className="mt-12 pt-8 border-t border-[#22C55E]/20">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-8 text-center">COMO FUNCIONA?</h3>
                  <Timeline
                    events={[
                      {
                        label: "1. Realiza seu Pagamento",
                        message:
                          "Efectue o pagamento de forma segura em nossa plataforma com múltiplas opções de pagamento.",
                      },
                      {
                        label: "2. Recebe seus Dados",
                        message:
                          "Você receberá imediatamente seu email com login e senha para acessar a área exclusiva.",
                      },
                      {
                        label: "3. Acessa o Conteúdo",
                        message: "Entre na área exclusiva e comece a assistir todas as aulas e conteúdos disponíveis.",
                      },
                      {
                        label: "4. Aproveita a Garantia",
                        message:
                          "Se não ficar satisfeito, solicite seu reembolso em até 7 dias sem nenhuma burocracia.",
                        isLast: true,
                      },
                    ]}
                  />
                </div>
              </div>
            </AnimatedGlowingBorder>

            <div className="flex justify-center mt-10">
              <ScrollToPriceButton>GARANTIR MEU ACESSO</ScrollToPriceButton>
            </div>
</div>
        </section>

        {/* MEGA BÔNUS FINAL — PRA VOCÊ NÃO TER MAIS NENHUMA DÚVIDA! */}

        {/* Black Friday Offers Section */}
        <section
          id="escolha-seu-acesso"
          className="bg-[#0C0C0C] text-white py-16 md:py-24 bg-[rgba(0,0,0,1)]"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          <div className="container mx-auto px-4 bg-[rgba(0,0,0,1)]">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="md:text-3xl font-bold text-white tracking-tight leading-6 text-lg">
                GARANTA SEU COM DESCONTO AGORA!  
              </h2>
            </div>

            {/* Pricing Cards */}
            <div className="flex justify-center max-w-5xl mx-auto">
              <div id="pricing-anchor" className="absolute -mt-24" aria-hidden="true"></div>

              {/* Complete Access Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-xl border-4 border-[#22C55E] max-w-md w-full">
                <div className="bg-[#22C55E] text-white text-center py-4">
                  <h3 className="text-xl md:text-2xl font-bold">OFERTA DE CARNAVAL DE R$97,90 POR:</h3>
                  <p className="text-sm md:text-base font-semibold mt-1">
                    {""}
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <div id="preco-acesso-completo" className="text-center mb-6">
                    <div className="flex items-start justify-center gap-1">
                      <span className="text-xs md:text-sm text-gray-600 mt-2 font-bold">{""} </span>
                      <span className="text-2xl text-gray-600 mt-2">R$</span>
                      <span className="text-7xl md:text-8xl font-bold text-gray-900">27</span>
                      <span className="text-2xl text-gray-600 mt-2">,90</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{""}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-900">
                        MAIS DE 33 AULAS EM 7 M��DULOS
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-900">AULAS EXPLÍCITAS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-900">ACESSO IMEDIATO</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-900">ÁREA DE MEMBROS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-900">ATUALIZAÇÕES GRATUITAS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-900">GARANTIA EXTRA DE 30 DIAS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF4A4A] flex items-center justify-center bg-foreground">
                        <span className="text-white text-base bg-foreground">🎁</span>
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-900">
                        GANHE E-BOOK DE R$49,90 GRÁTIS
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    {/* <UTMLink href="https://go.perfectpay.com.br/PPU38CQ2FO5"> */}
                    <HoverButton
                      size="lg"
                      className="w-full py-6 text-lg font-bold"
                      as="a"
                      href="https://www.ggcheckout.com/checkout/v2/SYwxhjBa0TXYiKrVUilz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      QUERO O ACESSO COMPLETO
                    </HoverButton>
                    {/* </UTMLink> */}
                  </div>

                  <p className="text-xs text-center text-gray-500 mt-4">{""}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="text-gray-900 section-spacing-mobile bg-[rgba(0,0,0,1)]"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          <div className="container mx-auto px-4 bg-[rgba(0,0,0,1)]">
            <div className="max-w-6xl mx-auto bg-[rgba(0,0,0,1)]">
              <h2
                className="text-3xl md:text-4xl font-bold text-center text-foreground bg-[rgba(0,0,0,1)]"
                style={{ marginBottom: "var(--space-xl)" }}
              >
                DÚVIDAS FREQUENTES! 
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Card 1 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Quando recebo meu acesso?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Imediatamente após o pagamento! Assim que o PIX for confirmado, você recebe todos os acessos no
                        seu email.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <Lock className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Preciso pagar todo mês?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Não! É pagamento único. Você paga UMA VEZ e tem acesso PARA SEMPRE. Sem mensalidades, sem
                        renovação.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">E se eu não gostar?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        15 dias de garantia total. Não gostou? Só avisar e devolvemos 100% do seu dinheiro. Sem
                        burocracia.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <RefreshCw className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">As ferramentas funcionam mesmo?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Sim! Atualizamos diariamente. Se alguma conta parar, trocamos na hora. Você sempre terá acesso.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Funciona no celular?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Perfeitamente! Discord, WhatsApp e todas as ferramentas funcionam tanto no celular quanto no
                        computador.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 6 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Posso dividir com alguém?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        NÃO. Cada acesso é pessoal e intransferível. Compartilhar = Banimento permanente sem reembolso.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 7 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <CreditCard className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Como faço o pagamento?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Apenas PIX e CARTÃO! O sistema é 100% automatizado e seguro. Fez o PIX, recebeu o acesso na
                        hora.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 8 */}
                <div className="border-l-4 border-gray-300 bg-gray-50 p-6 rounded-sm">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">Tem suporte se precisar?</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Sim! Suporte direto via WhatsApp para qualquer dúvida ou problema. Estamos aqui pra te ajudar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-10">
                <ScrollToPriceButton>VER OFERTA ESPECIAL</ScrollToPriceButton>
              </div>
            </div>
          </div>
        </section>
      </div>

      <WhatsAppButton />
    </div>
  )
}
