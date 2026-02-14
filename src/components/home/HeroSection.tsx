'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const defaultSlides = [
  {
    _id: '1',
    title: 'Taste the Crunch',
    description: 'Spicy & Tangy Premier Potato Chips',
    image: '/images/new/image1.jpg', // Spicy Chips
  },
  {
    _id: '2',
    title: 'Golden Bakery Goodness',
    description: 'Crunchy Rusk & Buttered Toast',
    image: '/images/new/image7.jpg', // Rusk/Toast/Bakery Vibe
  },
  {
    _id: '3',
    title: 'Authentic Indian Namkeen',
    description: 'Traditional Flavors for Every Mood',
    image: '/images/new/image6.jpg', // Mix Snacks/Namkeen
  },
  {
    _id: '4',
    title: 'Premium Toast & Breads',
    description: 'Baked to Perfection Daily',
    image: '/images/new/image4.jpg', // Bakery/Breads
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
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide._id || slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl font-light mb-8 drop-shadow-md"
            >
              {slide.description}
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Link href="/products" className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full shadow-xl hover:bg-orange-700 transition transform hover:scale-105 inline-block">
                Explore Products
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button 
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition focus:outline-none"
      >
        <ChevronLeft size={32} />
      </button>
       <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition focus:outline-none"
      >
        <ChevronRight size={32} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((s, index) => (
          <button
            key={s._id || s.id}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-orange-500 w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
