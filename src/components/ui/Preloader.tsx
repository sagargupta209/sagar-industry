'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let fallbackTimeout: NodeJS.Timeout;
    let checkImagesTimeout: NodeJS.Timeout;

    const finishLoading = () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      clearTimeout(checkImagesTimeout);
      
      setPercent(100);
      setTimeout(() => setLoading(false), 800);
    };

    const startLoading = () => {
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += Math.random() * 5;
        if (currentProgress >= 90) {
          clearInterval(interval);
          setPercent(90);
        } else {
          setPercent(Math.floor(currentProgress));
        }
      }, 50);
    };

    startLoading();

    // Actual Image Preloading Check
    const checkImages = () => {
      const imgs = document.querySelectorAll('img');
      const totalImages = imgs.length;
      
      if (totalImages === 0) {
        finishLoading();
        return;
      }

      let loadedCount = 0;
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount >= totalImages) finishLoading();
      };

      imgs.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener('load', onImageLoad);
          img.addEventListener('error', onImageLoad);
        }
      });
    };

    // Wait for initial JS execution then check images
    checkImagesTimeout = setTimeout(checkImages, 500);

    // Absolute fallback - ensure it closes after 3.5s max no matter what
    fallbackTimeout = setTimeout(finishLoading, 3500);

    // Browser load event fallback
    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      clearTimeout(checkImagesTimeout);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
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
              <img 
                src="/logo.png" 
                alt="Sagar Industry Logo" 
                className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl brightness-110"
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-10"
            >
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-[0.2em] uppercase">
                Sagar <span className="text-yellow-400">Industry</span>
              </h2>
              <p className="text-blue-200/60 text-xs font-bold tracking-widest mt-2 uppercase">Authentic Taste of Gujarat</p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 md:w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-yellow-400"
                style={{ width: `${percent}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <div className="mt-4 text-yellow-400/80 font-mono text-sm font-bold antialiased">
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
