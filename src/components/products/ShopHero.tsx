'use client';

import Link from 'next/link';

export default function ShopHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#22c55e]">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#16a34a] rounded-full opacity-40" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#4ade80] rounded-full opacity-50" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-orange-400/15 rounded-full blur-xl" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-12 pb-12 sm:pb-16 md:pb-16">
        {/* Breadcrumb - Modern Styled */}
        <nav className="flex items-center justify-center lg:justify-start gap-3 text-white/70 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-10">
          <Link href="/" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5 group">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-yellow-300 transition-colors"></span>
            Home
          </Link>
          <span className="text-white/30 font-light text-lg">/</span>
          <span className="text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-sm shadow-yellow-400/50"></span>
            Shop
          </span>
        </nav>

        {/* Hero Content — two column on desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">
          {/* Left Text */}
          <div className="w-full lg:w-1/2 mx-auto lg:mx-0 text-center lg:text-left relative z-20 flex flex-col items-center lg:items-start">
            {/* Subtle Brand Badge */}
            <div className="hidden lg:inline-flex items-center gap-2 mb-6 justify-start">
              <div className="bg-[#1a237e] text-yellow-400 px-3 py-1.5 rounded-lg border-2 border-yellow-500/80 shadow-lg">
                <span className="text-lg font-black tracking-wider uppercase">SAGAR</span>
              </div>
              <span className="text-white/90 font-bold text-sm uppercase tracking-widest">Industries</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 drop-shadow-lg max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              Taste the
              <span className="block text-yellow-300">Crunch!</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Explore our premium range of chips, namkeens, fryums & more — made with the authentic flavours of Gujarat.
            </p>
          </div>

          {/* Right Visual — Decorative snack composition */}
          <div className="w-full lg:w-1/2 max-w-md lg:max-w-lg relative mt-12 lg:mt-0 z-10 mx-auto">
            <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-none mx-auto">
              {/* Central product showcase circle */}
              <div className="absolute inset-4 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/20 flex items-center justify-center shadow-2xl overflow-hidden ring-8 ring-white/5">
                 <img 
                   src="https://images.unsplash.com/photo-1613919113640-25732ec5e61f?q=80&w=1000&auto=format&fit=crop" 
                   alt="Premium Snacks" 
                   className="w-full h-full object-cover brightness-110 group-hover:scale-110 transition-transform duration-700"
                 />
              </div>

              {/* Orbit decorations */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#1a237e] px-5 py-2 rounded-full font-black text-xs sm:text-sm shadow-xl border-2 border-white animate-bounce z-20">
                NEW!
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ff3d00] text-white px-5 py-2 rounded-full font-black text-[10px] sm:text-xs shadow-xl uppercase tracking-tighter border-2 border-white z-20">
                100% QUALITY
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="#f9fafb"
          />
        </svg>
      </div>
    </section>
  );
}
