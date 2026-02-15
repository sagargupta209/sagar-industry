'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative inline-block mb-8">
          <h1 className="text-[12rem] md:text-[15rem] font-black text-gray-100 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-4xl md:text-5xl font-black text-[#1a237e] transform -rotate-12 bg-yellow-400 px-6 py-2 rounded-2xl shadow-xl">
               Lost your snack?
             </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Oops! This page went missing.
        </h2>
        <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed">
          The page you're looking for might have been moved, deleted, or perhaps it never existed. Let's get you back to the crunch!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-10 py-4 bg-[#1a237e] text-white rounded-full font-bold hover:bg-[#151b60] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl active:scale-95"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-10 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all border border-gray-200"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 opacity-10 hidden lg:block">
         <span className="text-8xl">🍿</span>
      </div>
      <div className="absolute bottom-20 right-20 opacity-10 hidden lg:block">
         <span className="text-8xl">🥨</span>
      </div>
    </div>
  );
}
