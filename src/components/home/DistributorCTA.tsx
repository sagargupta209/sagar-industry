'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const DistributorCTA = () => {
  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Main Badge Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#FFC107] rounded-[30px] md:rounded-[50px] shadow-2xl p-8 pb-2 md:p-14 md:min-h-[500px] flex flex-col md:flex-row items-center border-[6px] md:border-[8px] border-white outline outline-[6px] md:outline-[8px] outline-[#FFC107] max-w-5xl mx-auto"
        >
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-12 md:w-24 h-12 md:h-24 bg-[#FFC107] rounded-br-[30px] md:rounded-br-[50px] z-10 -mt-2 -ml-2"></div>
          <div className="absolute top-0 right-0 w-12 md:w-24 h-12 md:h-24 bg-[#FFC107] rounded-bl-[30px] md:rounded-bl-[50px] z-10 -mt-2 -mr-2"></div>
          <div className="absolute bottom-0 left-0 w-12 md:w-24 h-12 md:h-24 bg-[#FFC107] rounded-tr-[30px] md:rounded-tr-[50px] z-10 -mb-2 -ml-2"></div>
          <div className="absolute bottom-0 right-0 w-12 md:w-24 h-12 md:h-24 bg-[#FFC107] rounded-tl-[30px] md:rounded-tl-[50px] z-10 -mb-2 -mr-2"></div>

          {/* Text Content */}
          <div className="relative z-20 w-full md:w-1/2 flex flex-col items-center md:items-start mb-10 md:mb-0">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col items-center md:items-start text-center md:text-left"
             >
                <span className="text-3xl md:text-4xl absolute -top-10 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 animate-bounce">✨</span>
                
                <h2 className="text-3xl md:text-6xl font-black text-[#1a0505] mb-4 md:mb-6 leading-tight drop-shadow-sm">
                  Become our <br className="hidden md:block" />
                  distributor
                </h2>
                
                <p className="text-base md:text-xl font-medium text-[#1a0505]/90 mb-6 md:mb-10 max-w-xs md:max-w-md leading-relaxed">
                  Join the Sagar Industries network and together, let's bring masaledar snacks to every household in India!
                </p>

                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-[#00A651] text-white font-bold text-base md:text-lg px-8 py-3 md:py-4 rounded-full shadow-lg hover:bg-[#008f45] hover:shadow-xl transition transform hover:-translate-y-1 active:scale-95 z-30 relative"
                >
                  Connect With Us
                </Link>
             </motion.div>
          </div>

          {/* Visuals Container */}
          <div className="relative z-20 w-full md:w-1/2 flex flex-col items-center justify-center md:block h-auto">
             
             {/* Hanging Pack */}
             <motion.div
               initial={{ y: -20, rotate: 5 }}
               whileInView={{ y: 0, rotate: -5 }}
               animate={{ rotate: [5, -5, 5] }}
               // @ts-ignore
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="relative md:absolute md:top-[-40px] md:right-[15%] w-auto z-20 mb-2 md:mb-0"
             >
                 <div className="relative flex flex-col items-center">
                    <div className="w-0.5 h-12 md:h-32 bg-gray-600/30 -mt-12 md:-mt-32"></div>
                    <img 
                      src="/images/new/image9.png" 
                      alt="Hanging Snack Pack"
                      className="w-42 md:w-60 drop-shadow-2xl rounded-lg" 
                    />
                 </div>
             </motion.div>

             {/* Packs Cluster */}
             <div className="relative md:absolute md:bottom-[-60px] md:right-[-20px] flex items-center justify-center w-full md:w-auto z-30 md:pr-4 mt-0 md:mt-0 px-4">
                <motion.img 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  src="/images/new/image8.png" 
                  className="w-32 md:w-56 -mr-16 md:-mr-12 mb-0 md:mb-4 drop-shadow-xl z-20 transform -rotate-12"
                />
                <motion.img 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  src="/images/new/image10.png" 
                  className="w-40 md:w-64 mb-0 drop-shadow-2xl z-40 relative md:top-0"
                />
                <motion.img 
                   initial={{ x: -20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.7 }}
                   src="/images/new/image5.png" 
                   className="w-32 md:w-56 -ml-16 md:-ml-12 mb-0 md:mb-6 drop-shadow-xl z-20 transform rotate-12"
                />
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default DistributorCTA;
