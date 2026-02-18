'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import useSWR from 'swr';
import { ITestimonial } from '@/types';
import { TestimonialSkeleton } from '@/components/ui/Skeletons';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TestimonialsSectionProps {
  initialData?: ITestimonial[];
}

const TestimonialsSection = ({ initialData }: TestimonialsSectionProps) => {
  const { data, error, isLoading, mutate } = useSWR('/api/testimonials', fetcher, {
    fallbackData: initialData ? { success: true, data: initialData } : undefined
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: ITestimonial[] = data?.success && data.data && data.data.length > 0 
    ? data.data 
    : (initialData || [
        { _id: '1', name: 'Happy Customer', review: 'Absolutely love the flavors! The Tomato Twist chips are my go-to snack for movie nights.', role: 'Verified Buyer', rating: 5 },
        { _id: '2', name: 'Snack Lover', review: 'Great quality and hygiene. My kids love the namkeens.', role: 'Regular Customer', rating: 5 },
        { _id: '3', name: 'Distributor', review: 'Best products in the market with amazing margins. Highly recommended.', role: 'Partner', rating: 5 }
      ]);

  // Auto-slide effect for mobile
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (isLoading && !testimonials.length) {
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

  if (error && !testimonials.length) {
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
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-orange-500' : 'w-2 bg-orange-200'}`}
                    />
                  ))}
                </div>
              )}
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

export default TestimonialsSection;
