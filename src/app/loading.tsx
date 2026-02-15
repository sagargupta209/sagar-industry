export default function Loading() {
  return (
    <div className="fixed inset-0 z-[var(--z-overlay)] bg-white flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-6">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Center Logo Placeholder/Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-[#1a237e] rounded-full flex items-center justify-center shadow-lg">
             <span className="text-white font-bold text-xl">S</span>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-black text-[#1a237e] animate-pulse">
        Sagar Industry
      </h2>
      <p className="text-gray-500 mt-2 font-medium tracking-widest uppercase text-xs">
        Loading the crunch...
      </p>

      {/* Progress Bar (Visual Only) */}
      <div className="w-48 h-1 bg-gray-100 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-yellow-400 animate-loading-bar"></div>
      </div>
    </div>
  );
}
