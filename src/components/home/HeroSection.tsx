'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';



const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
        try {
            const res = await fetch('/api/hero');
            if (!res.ok) {
                console.warn(`Failed to fetch slides: ${res.status} ${res.statusText}`);
                setLoading(false);
                return;
            }
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn("Received non-JSON response from /api/hero");
                setLoading(false);
                return;
            }
            const data = await res.json();
            if(data.success && data.data && data.data.length > 0) {
                setSlides(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch hero slides", error);
        } finally {
            setLoading(false);
        }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Safety check: if slides is empty or current is out of bounds
  const slide = slides.length > 0 && slides[current] ? slides[current] : null;

  if (loading) {
    return (
        <div className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
  }

  if (!slide) {
    return null; // Or some fallback UI if no slides exist at all
  }

  return (
    <div className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide._id || slide.id || current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          {slide.image && (
             <img 
               src={slide.image} 
               alt="Hero Background" 
               className="hidden md:block w-full h-full object-cover lg:object-fill"
             />
          )}

          {/* Mobile Image */}
          {(slide.imageMobile || slide.image) && (
             <img 
               src={slide.imageMobile || slide.image} 
               alt="Hero Background Mobile" 
               className="block md:hidden w-full h-full object-cover"
             />
          )}

          {/* Content Overlay */}
          {(slide.title || slide.description) && (
             <div className="absolute inset-0 bg-black/20 md:bg-black/10 flex items-center justify-center text-center px-4">
               <div className="max-w-4xl">
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

      {/* Navigation Buttons (Optional, keep if wanted, but user said "sirf image", might want arrows though) */}
      <button 
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition focus:outline-none"
      >
        <ChevronLeft size={32} />
      </button>
       <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition focus:outline-none"
      >
        <ChevronRight size={32} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((s, index) => (
          <button
            key={s._id || s.id || index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === current ? 'bg-orange-500 w-6 md:w-8' : 'bg-black/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
