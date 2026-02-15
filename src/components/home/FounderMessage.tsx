'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const FounderMessage = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#051C2C] rounded-[40px] md:rounded-[60px] p-8 md:p-16 max-w-5xl mx-auto shadow-2xl overflow-hidden"
        >
          {/* Decorative Quote Icon (Low Opacity) */}
          <div className="absolute top-0 left-4 md:top-8 md:left-8 opacity-10 text-white pointer-events-none">
             <Quote className="w-24 h-24 md:w-40 md:h-40" fill="currentColor" strokeWidth={0} />
          </div>

          <div className="relative z-10 flex flex-col items-start pt-16 md:pt-12 md:pl-28">
             {/* Main Testimonial Text */}
             <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-10 md:mb-12 font-serif tracking-wide text-left">
               “The foundation of Sagar Industry and Sai Food Product was laid in 2005 with a vision to deliver the highest quality packaged food. We honor quality in every aspect of our profession, ensuring that our manufacturing is done in environmentally friendly premises under the most hygienic conditions.”
             </p>
 
             {/* Founder Details */}
             <div className="flex flex-col text-left">
               <span className="text-[#FFC107] text-2xl md:text-3xl font-black mb-1 letter-tracking-wider uppercase">
                 Late Shri Gurmuk Das Motlani ji
               </span>
               <span className="text-gray-400 text-sm md:text-base font-medium uppercase tracking-widest">
                 Founder, Sagar Industry & Sai Food Product
               </span>
             </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default FounderMessage;
