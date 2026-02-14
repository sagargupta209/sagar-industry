import { Suspense } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import ShopHero from '@/components/products/ShopHero';
import FAQSection from '@/components/products/FAQSection';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Shop | Sagar Industry — Premium Snacks & Namkeens',
  description:
    'Browse our masaledar lineup of chips, namkeens, fryums and more. Authentic flavours of Gujarat delivered to your door.',
};

async function getProducts() {
  await dbConnect();
  const products = await Product.find({}).populate('category').lean();
  return JSON.parse(JSON.stringify(products));
}

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({}).lean();
  return JSON.parse(JSON.stringify(categories));
}

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Banner ── */}
      <ShopHero />

      {/* ── Intro Section ── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500">
              masaledar
            </span>{' '}
            lineup
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto">
            Endless choices of crunchy snacks. Find your favourite flavours and keep munching!
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="w-12 h-1 bg-orange-400 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-12 h-1 bg-green-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Product Grid with Utility Bar ── */}
      <section className="pb-20 md:pb-28 bg-gray-50">
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center text-gray-500">Loading products...</div>}>
          <ProductGrid products={products} categories={categories} />
        </Suspense>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection />
    </div>
  );
}
