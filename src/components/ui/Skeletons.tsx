import React from 'react';

export const ProductSkeleton = () => (
  <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100/80 animate-pulse">
    <div className="aspect-square bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-gray-200 rounded-full w-20 mx-auto" />
      <div className="h-5 bg-gray-200 rounded-full w-40 mx-auto" />
    </div>
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-50 flex flex-col h-full animate-pulse">
    <div className="flex gap-1 mb-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
      ))}
    </div>
    <div className="flex-grow space-y-3 mb-8">
      <div className="h-4 bg-gray-200 rounded-full w-full" />
      <div className="h-4 bg-gray-200 rounded-full w-[90%]" />
      <div className="h-4 bg-gray-200 rounded-full w-[80%]" />
    </div>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 bg-gray-200 rounded-full" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded-full w-24" />
        <div className="h-3 bg-gray-200 rounded-full w-16" />
      </div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative w-full h-[80vh] md:h-screen bg-gray-100 animate-pulse overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6 text-center">
        <div className="h-12 md:h-20 bg-gray-300 rounded-3xl w-3/4 mx-auto" />
        <div className="h-6 md:h-10 bg-gray-200 rounded-3xl w-1/2 mx-auto" />
      </div>
    </div>
  </div>
);
