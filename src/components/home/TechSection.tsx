'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const TechSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F9F9F9] border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          
          {/* Left: Headline */}
          <div className="w-full md:w-1/2 text-center md:text-left">
             <motion.h2 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="text-4xl md:text-6xl font-black text-[#1a0505] leading-[1.1] tracking-tight"
             >
               The tech <br/>
               behind <br/>
               the taste
             </motion.h2>
          </div>

          {/* Right: Content & CTA */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
             >
               <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                 “Dil se banaya, blockbuster ban gaya” - some say that’s our secret. We agree. But it’s all backed by our fully automated factories. With hi-tech and relentless R&D, our snacks are tasty bhi, healthy bhi!
               </p>

               <Link 
                 href="/about#technology" 
                 className="inline-block bg-[#00A651] text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-[#008f45] transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1 w-full md:w-auto"
               >
                 Explore Processes
               </Link>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechSection;
