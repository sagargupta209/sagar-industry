'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial status
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-overlay)]"
        >
          <div className="bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-red-500/50 backdrop-blur-md">
            <WifiOff size={20} className="animate-pulse" />
            <span className="font-bold text-sm tracking-wide">
              You are currently offline. Check your connection.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
