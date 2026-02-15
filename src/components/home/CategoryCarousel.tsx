'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const defaultStyles = [
  { 
    bg: 'bg-gradient-to-br from-red-500 to-red-700', 
    decor: 'https://images.unsplash.com/photo-1621447504864-284aa8778bf6?q=80&w=1974'
  },
  { 
    bg: 'bg-gradient-to-br from-orange-400 to-orange-600', 
    decor: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?q=80&w=2070' 
  },
  { 
    bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600', 
    decor: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070' 
  },
  { 
    bg: 'bg-gradient-to-br from-indigo-500 to-purple-700', 
    decor: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1968' 
  },
  { 
    bg: 'bg-gradient-to-br from-pink-500 to-pink-700', 
    decor: 'https://images.unsplash.com/photo-1614726365723-49faaa5bf3c6?q=80&w=1974' 
  },
];

const CategoryCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [categories]);

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const res = await fetch('/api/categories');
              if (!res.ok) {
                  console.warn(`Failed to fetch categories: ${res.status} ${res.statusText}`);
                  useFallback();
                  return;
              }
              const contentType = res.headers.get("content-type");
              if (!contentType || !contentType.includes("application/json")) {
                  console.warn("Received non-JSON response from /api/categories");
                  useFallback();
                  return;
              }
              const data = await res.json();
              if(data.success && data.data && data.data.length > 0) {
                  const formatted = data.data.map((cat: any, i: number) => ({
                      ...cat,
                      id: cat._id,
                      desc: 'Premium Quality Snacks', 
                      ...defaultStyles[i % defaultStyles.length]
                  }));
                  setCategories(formatted);
              } else {
                  useFallback();
              }
          } catch (e) {
              console.warn("Failed to fetch categories", e);
              useFallback();
          }
      };

      const useFallback = () => {
          setCategories([
            { 
              id: 1, 
              name: 'Wafers', 
              desc: 'Simply Salted & Masala Masti',
              bg: 'bg-gradient-to-br from-red-500 to-red-700', 
              image: 'https://images.unsplash.com/photo-1566478919030-26d9e54179d6?q=80&w=1974', 
              decor: 'https://images.unsplash.com/photo-1621447504864-284aa8778bf6?q=80&w=1974'
            },
            { 
              id: 2, 
              name: 'Namkeen', 
              desc: 'Bhel Mix & Sev Mamra',
              bg: 'bg-gradient-to-br from-orange-400 to-orange-600', 
              image: 'https://images.unsplash.com/photo-1599488615731-7e5128160cc3?q=80&w=1974', 
              decor: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?q=80&w=2070' 
            }
         ]);
      };

      fetchCategories();
  }, []);

  return (
    <section className="pt-4 pb-2 md:py-20 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8">
           <div className="w-full md:w-1/2 relative">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-[#1a0505] leading-tight text-center md:text-left"
              >
                Binge on our <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 relative inline-block">
                    bestsellers!
                    {/* Decorative accent marks */}
                    <svg className="absolute -top-7 -right-6 md:-right-8 w-10 h-10 md:w-12 md:h-12 text-green-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
                        <path d="M20 80 L40 40 L60 70" />
                        <path d="M50 30 L60 10" />
                        <path d="M70 40 L90 20" />
                    </svg>
                </span>
              </motion.h2>
           </div>
           
           <div className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right">
              <motion.p 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 text-lg md:text-xl max-w-lg mb-6 leading-relaxed"
              >
                From desi delights to pardesi bites and fusion twists, yaha sab cravings hai covered. Ek chakh lo, ya sab rakh lo!
              </motion.p>
              <Link href="/products" className="inline-flex items-center bg-[#00A651] text-white font-bold px-8 py-3 rounded-full hover:bg-[#008f45] transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                 Shop All <ArrowRight size={20} className="ml-2" />
              </Link>
           </div>
        </div>

        {/* Carousel Section */}
        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-visible">
            <motion.div 
               drag="x" 
               dragConstraints={{ right: 0, left: -width }} 
               className="flex space-x-6 md:space-x-10 px-2 pb-12"
            >
                {categories.map((cat, index) => (
                    <motion.div 
                        key={cat.id || index}
                        className={`relative min-w-[280px] md:min-w-[360px] h-[400px] md:h-[480px] rounded-[30px] ${cat.bg} shadow-2xl overflow-hidden group`}
                        whileHover={{ scale: 1.02, rotate: 1, y: -10 }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        style={{ transformOrigin: 'bottom center' }}
                    >
                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500" />
                        
                        {/* Decorative Background Elements */}
                         <Image 
                            src={cat.decor} 
                            width={300}
                            height={300}
                            className="absolute -top-10 -right-10 w-40 opacity-30 group-hover:opacity-50 group-hover:scale-110 transition duration-700 blur-sm mix-blend-overlay object-cover"
                             alt="decoration"
                         />

                        {/* Main Product Image (Floating) */}
                        <motion.div 
                           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 z-10"
                           whileHover={{ scale: 1.15, rotate: -5 }}
                           transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Image 
                              src={cat.image} 
                              width={400}
                              height={400}
                              className="w-full drop-shadow-2xl object-contain" 
                              alt={cat.name} 
                            />
                        </motion.div>
                        
                        {/* Card Footer Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black/60 to-transparent z-20 flex justify-between items-end">
                            <div>
                                <h3 className="text-white text-3xl font-black mb-1 tracking-wide shadow-black drop-shadow-md">{cat.name}</h3>
                                <p className="text-white/90 font-medium text-sm">{cat.desc}</p>
                            </div>
                            <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition transform hover:rotate-45">
                                <ArrowUpRight size={20} strokeWidth={3} />
                            </button>
                        </div>


                    </motion.div>
                ))}
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default CategoryCarousel;
