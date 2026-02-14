'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const defaultSlides = [
  {
    _id: '1',
    image: '/images/new/image1.jpg',
  },
  {
    _id: '2',
    image: '/images/new/image7.jpg',
  },
  {
    _id: '3',
    image: '/images/new/image6.jpg',
  },
  {
    _id: '4',
    image: '/images/new/image4.jpg',
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<any[]>(defaultSlides);

  useEffect(() => {
    const fetchSlides = async () => {
        try {
            const res = await fetch('/api/hero');
            if (!res.ok) {
                console.warn(`Failed to fetch slides: ${res.status} ${res.statusText}`);
                // Fallback is already set in initial state
                return;
            }
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn("Received non-JSON response from /api/hero");
                return;
            }
            const data = await res.json();
            if(data.success && data.data && data.data.length > 0) {
                setSlides(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch hero slides", error);
        }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide._id || slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          <img 
            src={slide.image} 
            alt="Hero Background" 
            className="hidden md:block w-full h-full object-cover lg:object-fill"
          />
          {/* Mobile Image */}
          <img 
            src={slide.imageMobile || slide.image} 
            alt="Hero Background Mobile" 
            className="block md:hidden w-full h-full object-cover"
          />
          
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
            key={s._id || s.id}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === current ? 'bg-orange-500 w-6 md:w-8' : 'bg-black/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
