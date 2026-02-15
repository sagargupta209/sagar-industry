'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { ITestimonial } from '@/types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MotionImage = motion(Image);

import { useSettings } from '@/context/SettingsContext';

import HeroSection from '@/components/home/HeroSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import DistributorCTA from '@/components/home/DistributorCTA';
import TechSection from '@/components/home/TechSection';
import ContactSection from '@/components/home/ContactSection';
import TrustBadges from '@/components/home/TrustBadges';
import { ProductSkeleton, TestimonialSkeleton } from '@/components/ui/Skeletons';
import confetti from 'canvas-confetti';

export default function Home() {
  const { settings } = useSettings();
  const features = [
    { icon: <Leaf className="text-green-500" />, title: '100% Natural', desc: 'No artificial preservatives, just pure taste.' },
    { icon: <ShieldCheck className="text-blue-500" />, title: 'Quality Assured', desc: 'Hygiene standards that exceed expectations.' },
    { icon: <Truck className="text-yellow-500" />, title: 'Fresh Delivery', desc: 'From our factory to your home in record time.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeroSection />

      {/* ── Features Bar ── */}
      <section className="bg-[#1a237e] text-white py-8 md:py-16 relative overflow-hidden -mt-2 z-[var(--z-content)] rounded-b-[2rem] shadow-xl">
         <div className="container mx-auto px-2 md:px-6 grid grid-cols-3 gap-2 md:gap-8 text-center relative z-10">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center gap-2 p-1 md:p-4 rounded-xl hover:bg-white/5 transition-colors relative"
              >
                 <div className="bg-white p-2 md:p-3 rounded-full shadow-lg scale-75 md:scale-100">{f.icon}</div>
                 <h3 className="font-bold text-[10px] md:text-xl leading-tight">{f.title}</h3>
                 <p className="text-blue-100 text-[8px] md:text-base opacity-80 md:opacity-100 line-clamp-2 md:line-clamp-none">{f.desc}</p>
              </motion.div>
            ))}
         </div>
         {/* Decor */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* ── Best Sellers (Enhanced) ── */}
      <section className="py-8 md:py-24 bg-gray-50">

         <CategoryCarousel />
      </section>

      {/* ── Brand Story (Redesigned) ── */}
      <section className="py-4 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 rounded-l-[5rem] -z-10 hidden lg:block"></div>
        
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-0 md:gap-16">
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:w-1/2 relative flex justify-center py-0 md:py-12"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full max-w-md px-8 md:px-0"
            >
              {/* Main Image (Top) */}
              <Image 
                src="/images/new/image11.png" 
                alt="Chaat Papdi" 
                width={500}
                height={500}
                className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] relative z-[var(--z-hero-nav)]"
              />
              
              {/* Background Image Left */}
              <MotionImage 
                src="/images/new/image2.png" 
                alt="Decorative Snack"
                width={400}
                height={400}
                className="absolute top-4 left-0 md:-left-12 w-[35%] md:w-[85%] h-auto opacity-60 blur-[1px] -rotate-12 z-[var(--z-content)]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.4 }}
              />

              {/* Background Image Right */}
              <MotionImage 
                src="/images/new/image3.png" 
                alt="Decorative Snack"
                width={400}
                height={400}
                className="absolute top-4 right-0 md:-right-12 w-[35%] md:w-[85%] h-auto opacity-60 blur-[1px] rotate-12 z-[var(--z-elevated)]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow hidden md:flex z-[var(--z-floating)]">
               <div className="bg-yellow-400 p-3 rounded-full text-[#1a237e] font-bold text-xl">{settings?.statsExperience || '25+'}</div>
               <div className="text-sm font-bold text-gray-600">Years of<br/>Excellence</div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:w-1/2"
          >
            <h4 className="text-[#1a237e] font-bold uppercase tracking-widest mb-2 text-sm md:text-base">Our Heritage</h4>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Quality is our <br className="md:hidden" /> <span className="text-orange-500">Cornerstone</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              Established in <span className="font-bold text-gray-900">2005</span>, <span className="font-bold text-[#1a237e]">Sagar Industry & Sai Food Product</span> has a legacy of over two decades in manufacturing snacks and delicious bakery items. What started in Rajkot is now expanding footprints across the entire country.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              From <span className="italic font-medium">Crunchy Snacks</span> to a premium range of <span className="font-bold">Biscuits, Rusks, Cookies, and Cream Rolls</span>, we ensure every bite is a burst of flavor, prepared under the most hygienic conditions and international standards.
            </p>
            
            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a237e] text-white font-bold rounded-full shadow-lg hover:bg-[#151b60] hover:shadow-xl transition-all group">
              Read Our Story <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Quality Trust Badges ── */}
      <TrustBadges />

      <DistributorCTA />
      
      {/* ── Testimonials (Dynamic) ── */}
      <TestimonialsSection />

      <TechSection />

      <ContactSection />
    </div>
  );
}

const TestimonialsSection = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/testimonials', fetcher);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: ITestimonial[] = data?.success && data.data && data.data.length > 0 
    ? data.data 
    : [
        { _id: '1', name: 'Happy Customer', review: 'Absolutely love the flavors! The Tomato Twist chips are my go-to snack for movie nights.', role: 'Verified Buyer', rating: 5 },
        { _id: '2', name: 'Snack Lover', review: 'Great quality and hygiene. My kids love the namkeens.', role: 'Regular Customer', rating: 5 },
        { _id: '3', name: 'Distributor', review: 'Best products in the market with amazing margins. Highly recommended.', role: 'Partner', rating: 5 }
      ];

  // Auto-slide effect for mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
               {[...Array(3)].map((_, i) => (
                 <TestimonialSkeleton key={i} />
               ))}
            </div>
         </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-6">
           <p className="text-red-500 font-bold mb-4">Unable to load testimonials at this moment.</p>
           <button 
             onClick={() => mutate()}
             className="px-6 py-2 bg-yellow-400 text-[#1a237e] font-bold rounded-full hover:bg-yellow-500 transition-all"
           >
             Try Again
           </button>
        </div>
      </section>
    );
  }

  return (
      <section className="py-16 md:py-24 bg-[#FFF8E1] overflow-hidden">
         <div className="container mx-auto px-6 text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">What Snack <br className="md:hidden" /> Lovers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Don't just take our word for it. Here is what our customers have to say about the crunch.</p>
         </div>
         
         <div className="container mx-auto px-4 md:px-6">
            {/* ── Mobile Carousel ── */}
            <div className="md:hidden relative px-2">
              <div className="overflow-visible">
                <motion.div 
                  className="flex cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ right: 0, left: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipeThreshold = 50;
                    if (offset.x < -swipeThreshold && currentIndex < testimonials.length - 1) {
                      setCurrentIndex(currentIndex + 1);
                    } else if (offset.x > swipeThreshold && currentIndex > 0) {
                      setCurrentIndex(currentIndex - 1);
                    }
                  }}
                  animate={{ x: `${-currentIndex * 100}%` }}
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                >
                  {testimonials.map((t: ITestimonial, i: number) => (
                    <div 
                      key={t._id || i}
                      className="min-w-full px-2"
                    >
                      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent border-yellow-100 transition-colors h-full flex flex-col">
                        <div className="text-yellow-400 flex gap-1 mb-4">
                          {[...Array(t.rating || 5)].map((_, idx) => <Star key={idx} fill="currentColor" size={18} />)}
                        </div>
                        <p className="text-gray-700 italic mb-6 text-sm flex-1">"{t.review}"</p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 uppercase text-sm">{t.name.charAt(0)}</div>
                          <div className="text-left">
                            <h5 className="font-bold text-gray-900 text-sm">{t.name}</h5>
                            <p className="text-[10px] text-gray-500">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Dots (Mobile Only) */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-orange-500' : 'w-2 bg-orange-200'}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Desktop Grid (Existing) ── */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
               {testimonials.map((t: ITestimonial, i: number) => (
                 <motion.div 
                   key={t._id || i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-yellow-400 transition-all duration-300 relative"
                 >
                    <div className="text-yellow-400 flex gap-1 mb-4">
                       {[...Array(t.rating || 5)].map((_, idx) => <Star key={idx} fill="currentColor" size={20} />)}
                    </div>
                    <p className="text-gray-700 italic mb-6">"{t.review}"</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                       <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 uppercase">{t.name.charAt(0)}</div>
                       <div className="text-left">
                          <h5 className="font-bold text-gray-900">{t.name}</h5>
                          <p className="text-xs text-gray-500">{t.role}</p>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>
  );
};
