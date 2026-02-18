'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let fallbackTimeout: NodeJS.Timeout;

    const finishLoading = () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      
      setPercent(100);
      // Exit precisely when the data is ready
      setLoading(false);
    };

    const startLoading = () => {
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += Math.random() * 20;
        if (currentProgress >= 95) {
          clearInterval(interval);
          setPercent(95);
        } else {
          setPercent(Math.floor(currentProgress));
        }
      }, 10);
    };

    startLoading();

    // Kill preloader delay entirely for better LCP.
    // If we're already interactive, we've achieved meaningful paint.
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        finishLoading();
    } else {
      const handleInteractive = () => {
        if (document.readyState === 'interactive') {
          finishLoading();
          document.removeEventListener('readystatechange', handleInteractive);
        }
      };
      document.addEventListener('readystatechange', handleInteractive);
    }

    // Absolute fallback reduced to 1s for better UX/LCP
    fallbackTimeout = setTimeout(finishLoading, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.4, ease: [0.45, 0, 0.55, 1] }
          }}
          className="fixed inset-0 z-[var(--z-preloader)] bg-[#1a237e] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <Image 
                  src="/logo.png" 
                  alt="Sagar Industry Logo" 
                  fill
                  className="object-contain drop-shadow-2xl brightness-110"
                  priority
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-[0.2em] uppercase">
                Sagar <span className="text-yellow-400">Industry</span>
              </h2>
              <p className="text-blue-200/60 text-xs font-bold tracking-widest mt-2 uppercase">Authentic Taste of Rajnandgaon</p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 md:w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-yellow-400"
                style={{ width: `${percent}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <div className="mt-4 text-yellow-400/80 font-mono text-sm font-bold antialiased w-20 text-center tabular-nums">
                {percent}%
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-[10%] left-[5%] text-8xl">🍿</div>
             <div className="absolute bottom-[10%] right-[10%] text-8xl">🥨</div>
             <div className="absolute top-[40%] right-[5%] text-8xl">🧇</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

