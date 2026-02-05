"use client"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.link/18w956"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 group"
      aria-label="Fale conosco no WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>

        {/* Main button - 60px diameter with WhatsApp green */}
        
      </div>
    </a>
  )
}
