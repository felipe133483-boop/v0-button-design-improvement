"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import Image from "next/image"

export function MembersAreaSection() {
  return (
    <div className="flex flex-col overflow-hidden bg-[rgba(0,0,0,1)]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="h-full w-full overflow-hidden rounded-2xl dark:bg-zinc-900 md:rounded-2xl md:p-4 bg-foreground-2xl md:p-4 tracking-normal text-2xl font-extrabold bg-[rgba(0,0,0,1)]">
              ÁREA DE MEMBROS FELICIDADE DELAS
            </h1>
            <p className="text-base md:text-lg text-[#CCCCCC] text-balance leading-relaxed max-w-2xl mx-auto">
              Área de membros exclusiva com mais de 15.000 membros ativos compartilhando conhecimento
            </p>
          </>
        }
      >
        <Image
          src="/images/design-mode/imagem_2025-11-05_120120511.webp"
          alt="Área de membros exclusiva"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
          priority={false}
        />
      </ContainerScroll>
    </div>
  )
}
