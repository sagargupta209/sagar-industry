'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, X, SearchX } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  category: Category;
  createdAt?: string;
}

interface ProductGridProps {
  products: Product[];
  categories: Category[];
}

const PRODUCTS_PER_PAGE = 12;

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const ProductGrid = ({ products, categories }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState('');

  // Sync URL param with state
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      const match = categories.find((c) => c.name.toLowerCase() === categoryParam.toLowerCase());
      if (match) {
        setSelectedCategory(match.name);
      }
    } else {
      setSelectedCategory('All');
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams, categories]);

  const updateCategory = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PRODUCTS_PER_PAGE);
    
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    // Keep search param if exists, or maybe clear it? 
    // Usually changing category might keep search or clear it. Let's keep it for now.
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filter
  const filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category?.name === selectedCategory;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;



  const gridClass = gridCols === 4
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── Category Tabs & Layout Controls ── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        
        {/* Scrollable Categories */}
        <div className="w-full md:w-auto overflow-x-auto py-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-1">
          <div className="flex items-center gap-3">
            {[{ _id: 'all', name: 'All' }, ...categories].map((cat) => {
              const isActive = selectedCategory === (cat.name === 'All' ? 'All' : cat.name);
              const label = cat.name === 'All' ? 'All Products' : cat.name;
              
              return (
                <button
                  key={cat._id}
                  onClick={() => updateCategory(cat.name === 'All' ? 'All' : cat.name)}
                  className={`
                    whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden group
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105 ring-2 ring-orange-200 ring-offset-2' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-600 hover:shadow-md'
                    }
                  `}
                >
                  <span className="relative z-10">{label}</span>
                  {!isActive && (
                     <span className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Product Count + Grid Toggles */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
            Showing {filtered.length} products
          </span>

          {/* Grid Toggles */}
          <div className="hidden lg:flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 rounded-full transition-all duration-200 ${
                gridCols === 3
                  ? 'bg-[#1a237e] text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="3 columns"
              aria-label="3 columns grid"
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 rounded-full transition-all duration-200 ${
                gridCols === 4
                  ? 'bg-[#1a237e] text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="4 columns"
              aria-label="4 columns grid"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <motion.div layout className={`grid ${gridClass} gap-6 lg:gap-8`}>
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              key={product._id}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100/80"
            >
              <Link href={`/products/${product._id}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Product Info */}
                <div className="p-5 text-center">
                  {product.category?.name && (
                    <span className="inline-block text-xs font-semibold text-[#1a237e]/70 uppercase tracking-widest mb-2">
                      {product.category.name}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#1a237e] transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 md:py-32 px-6 bg-white rounded-[3rem] shadow-sm border border-gray-100 max-w-4xl mx-auto"
        >
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center animate-bounce-slow">
              <SearchX size={48} className="text-orange-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-lg">
               <span className="text-xl">🍿</span>
            </div>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Aww, no snacks found!
          </h3>
          <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
            We couldn't find any products matching your current filters or search query. Don't worry, the perfect crunch is just a click away!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => updateCategory('All')}
              className="px-10 py-4 bg-[#1a237e] text-white rounded-full font-bold hover:bg-[#151b60] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl active:scale-95"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => router.back()}
              className="px-10 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all border border-gray-200"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Load More ── */}
      {hasMore && (
        <div className="flex justify-center mt-14 mb-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)}
            className="group relative px-10 py-3.5 rounded-full font-bold text-[#1a237e] border-2 border-[#1a237e] bg-transparent hover:bg-[#1a237e] hover:text-white transition-all duration-300 tracking-wide text-lg overflow-hidden"
          >
            <span className="relative z-10">Load more</span>
            <span className="absolute inset-0 bg-[#1a237e] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
