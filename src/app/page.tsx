'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowRight, Truck, ShieldCheck, Leaf } from 'lucide-react';

import HeroSection from '@/components/home/HeroSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import DistributorCTA from '@/components/home/DistributorCTA';
import TechSection from '@/components/home/TechSection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  const features = [
    { icon: <Leaf className="text-green-500" />, title: '100% Natural', desc: 'No artificial preservatives, just pure taste.' },
    { icon: <ShieldCheck className="text-blue-500" />, title: 'Quality Assured', desc: 'Hygiene standards that exceed expectations.' },
    { icon: <Truck className="text-yellow-500" />, title: 'Fresh Delivery', desc: 'From our factory to your home in record time.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeroSection />

      {/* ── Features Bar ── */}
      <section className="hidden md:block bg-[#1a237e] text-white py-12 md:py-16 relative overflow-hidden -mt-2 z-20 rounded-b-[2rem] shadow-xl">
         <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center relative z-10">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                 <div className="bg-white p-3 rounded-full shadow-lg">{f.icon}</div>
                 <h3 className="font-bold text-xl">{f.title}</h3>
                 <p className="text-blue-100 text-sm md:text-base">{f.desc}</p>
              </motion.div>
            ))}
         </div>
         {/* Decor */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* ── Best Sellers (Enhanced) ── */}
      <section className="bg-gray-50">
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
              className="relative w-full max-w-md"
            >
              {/* Main Image (Top) */}
              <img 
                src="/images/new/image11.jpg" 
                alt="Chaat Papdi" 
                className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] relative z-30"
              />
              
              {/* Background Image Left */}
              <motion.img 
                src="/images/new/22.jpeg" 
                className="absolute top-4 -left-12 w-[85%] h-auto opacity-60 blur-[1px] -rotate-12 z-20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.4 }}
              />

              {/* Background Image Right */}
              <motion.img 
                src="/images/new/3.jpeg" 
                className="absolute top-4 -right-12 w-[85%] h-auto opacity-60 blur-[1px] rotate-12 z-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow hidden md:flex z-40">
               <div className="bg-yellow-400 p-3 rounded-full text-[#1a237e] font-bold text-xl">25+</div>
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
              The Taste of <span className="text-orange-500">Tradition</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              At Sagar Industry, we believe that great snacks start with great ingredients. Our journey began with a simple mission: to bring authentic Indian flavors to every household. 
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Using state-of-the-art technology and traditional recipes, we ensure that every packet of chips or namkeen delivers the perfect crunch and taste.
            </p>
            
            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a237e] text-white font-bold rounded-full shadow-lg hover:bg-[#151b60] hover:shadow-xl transition-all group">
              Read Our Story <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <DistributorCTA />
      
      {/* ── Testimonials (Dynamic) ── */}
      <TestimonialsSection />

      <TechSection />

      <ContactSection />
    </div>
  );
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const useFallback = () => {
        setTestimonials([
          { _id: '1', name: 'Happy Customer', review: 'Absolutely love the flavors! The Tomato Twist chips are my go-to snack for movie nights.', role: 'Verified Buyer', rating: 5 },
          { _id: '2', name: 'Snack Lover', review: 'Great quality and hygiene. My kids love the namkeens.', role: 'Regular Customer', rating: 5 },
          { _id: '3', name: 'Distributor', review: 'Best products in the market with amazing margins. Highly recommended.', role: 'Partner', rating: 5 }
        ]);
      };

      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) {
          console.warn(`Failed to fetch testimonials: ${res.status} ${res.statusText}`);
          useFallback();
          return;
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
           console.warn("Received non-JSON response from /api/testimonials");
           useFallback();
           return;
        }
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setTestimonials(data.data);
        } else {
          useFallback();
        }
      } catch (error) {
         console.warn("Failed to fetch testimonials", error);
         useFallback();
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
      <section className="py-16 md:py-24 bg-[#FFF8E1]">
         <div className="container mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">What Snack Lovers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Don't just take our word for it. Here is what our customers have to say about the crunch.</p>
         </div>
         
         <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-yellow-400 transition-colors relative"
              >
                 <div className="text-yellow-400 flex gap-1 mb-4">
                    {[...Array(t.rating || 5)].map((_, idx) => <Star key={idx} fill="currentColor" size={20} />)}
                 </div>
                 <p className="text-gray-700 italic mb-6">"{t.review}"</p>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 uppercase">{t.name.charAt(0)}</div>
                    <div className="text-left">
                       <h5 className="font-bold text-gray-900">{t.name}</h5>
                       <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>
  );
};
