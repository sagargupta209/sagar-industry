'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl"
      >
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-red-600">
           <AlertCircle size={48} />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-outfit">
           Something snapped!
        </h1>
        <p className="text-xl text-gray-500 mb-10 leading-relaxed">
          We've encountered an unexpected issue while loading this page. 
          Don't worry, our team has been notified. Let's try to fix it right now.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-[#1a237e] text-white rounded-full font-black text-lg hover:bg-[#151b60] transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95 group"
          >
            <RefreshCcw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
          <a
            href="/"
            className="flex items-center justify-center gap-3 px-10 py-5 bg-gray-50 text-gray-700 rounded-full font-bold hover:bg-gray-100 transition-all border border-gray-200"
          >
            Back to Home
          </a>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 p-6 bg-gray-50 rounded-3xl text-left border border-gray-100 overflow-auto max-h-40">
            <p className="text-xs font-mono text-red-500">{error.message}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
