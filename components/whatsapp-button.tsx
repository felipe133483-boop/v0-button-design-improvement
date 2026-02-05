"use client"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.link/k2wcfj"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 md:bottom-6 md:right-6 z-[9999] group"
      aria-label="Fale conosco no WhatsApp"
    >
      <div className="relative">
        {/* Subtle pulse animation ring */}
        <div 
          className="absolute inset-0 bg-[#25D366] rounded-full opacity-40"
          style={{
            animation: "subtlePulse 2.5s ease-in-out infinite"
          }}
        />

        {/* Main button with official WhatsApp icon */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110">
          {/* Official WhatsApp SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 175.216 175.552"
            className="w-8 h-8"
          >
            <defs>
              <linearGradient
                id="whatsapp-gradient"
                x1="85.915"
                x2="86.535"
                y1="32.567"
                y2="137.092"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#57d163" />
                <stop offset="1" stopColor="#23b33a" />
              </linearGradient>
            </defs>
            <path
              fill="#fff"
              d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324a60.95 60.95 0 0 0 31.08 8.531h.028c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.909-43.251 60.75 60.75 0 0 0-43.18-17.936z"
            />
            <path
              fill="#fff"
              d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324a60.95 60.95 0 0 0 31.08 8.531h.028c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.909-43.251 60.75 60.75 0 0 0-43.18-17.936z"
            />
            <path
              fill="#fff"
              d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647z"
            />
          </svg>
        </div>
      </div>

      {/* CSS for subtle pulse animation */}
      <style jsx>{`
        @keyframes subtlePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.2;
          }
        }
      `}</style>
    </a>
  )
}
