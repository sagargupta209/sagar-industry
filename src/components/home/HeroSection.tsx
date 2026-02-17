'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { HeroSkeleton } from '@/components/ui/Skeletons';
import useSWR from 'swr';
import { IHeroSlide } from '@/types';

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data, error, isLoading, mutate } = useSWR('/api/hero', fetcher);
  
  const slides = data?.success ? data.data : [];
  
  useEffect(() => {
    // Preload next image to avoid flicker
    if (slides.length > 0) {
      slides.forEach((s: any) => {
        const img = new (window as any).Image();
        img.src = s.image;
        if (s.imageMobile) {
          const imgMobile = new (window as any).Image();
          imgMobile.src = s.imageMobile;
        }
      });
    }

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides.length > 0 && slides[current] ? slides[current] : null;

  if (error) {
    return (
        <div className="relative h-[50vh] md:h-[70vh] w-full flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100 max-w-md">
              <h3 className="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-600 mb-6">We couldn't load the latest highlights. Please try again.</p>
              <button 
                onClick={() => mutate()}
                className="bg-[#1a237e] text-white px-8 py-3 rounded-full font-bold hover:bg-[#151b60] transition-all active:scale-95"
              >
                Retry Loading
              </button>
            </div>
        </div>
    );
  }

  if (isLoading || !slide) {
    return <HeroSkeleton />; 
  }

  return (
    <div className="relative w-full h-[80vh] md:h-screen bg-white overflow-hidden">

      <AnimatePresence mode="popLayout">
        <motion.div
          key={slide._id || slide.id || current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
             <motion.div
               className="hidden md:block absolute inset-0 w-full h-full"
               initial={{ scale: 1.15 }}
               animate={{ scale: 1 }}
               transition={{ duration: 10, ease: "easeOut" }}
             >
                <Image 
                  src={slide.image} 
                  alt="Hero Background" 
                  fill
                  priority
                  quality={90}
                  sizes="100vw"
                  className="object-cover lg:object-fill"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  onLoad={() => setImageLoaded(true)}
                />
             </motion.div>

          {/* Mobile Image */}
          {(slide.imageMobile || slide.image) && (
             <motion.div 
               className="block md:hidden relative w-full h-full"
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 8, ease: "easeOut" }}
             >
                <Image 
                  src={slide.imageMobile || slide.image} 
                  alt="Hero Background Mobile" 
                  fill
                  priority
                  quality={80}
                  sizes="100vw"
                  className="object-cover object-center"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  onLoad={() => setImageLoaded(true)}
                />
             </motion.div>
          )}

          {/* Content Overlay */}
          {(slide.title || slide.description) && (
             <div className="absolute inset-0 bg-black/20 md:bg-black/10 flex items-center justify-center text-center px-4">
               <div className="max-w-4xl pt-20 md:pt-0"> {/* Added padding top for mobile content */}
                 {slide.title && (
                   <motion.h1 
                     initial={{ y: 30, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2, duration: 0.8 }}
                     className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl uppercase tracking-tighter"
                   >
                     {slide.title}
                   </motion.h1>
                 )}
                 {slide.description && (
                   <motion.p 
                     initial={{ y: 30, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.4, duration: 0.8 }}
                     className="text-base md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg max-w-2xl mx-auto"
                   >
                     {slide.description}
                   </motion.p>
                 )}
               </div>
             </div>
          )}
          
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[var(--z-hero-nav)] p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition focus:outline-none flex items-center justify-center"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
       <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[var(--z-hero-nav)] p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition focus:outline-none flex items-center justify-center"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[var(--z-hero-nav)] flex space-x-2">
      {/* indicators */}
        {slides.map((s: IHeroSlide, index: number) => (
          <button
            key={s._id || s.id || index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === current ? 'bg-orange-500 w-6 md:w-8' : 'bg-black/20'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
